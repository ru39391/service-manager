import { FC, Fragment, useCallback, useEffect } from 'react';
import { Alert, Box, Typography } from '@mui/material';
import { Check, Delete } from '@mui/icons-material';

import ModalFooter from './ModalFooter';

import useForm from '../hooks/useForm';
import useTableData from '../hooks/useTableData';

import { useSelector, useDispatch } from '../services/hooks';
import { TFormData } from '../services/slices/form-slice';

import { handlePricelistData } from '../services/actions/pricelist';

import type { TCustomData, TItemData } from '../types';

import {
  ID_KEY,
  ITEM_KEY,
  COMPLEX_KEY,
  IS_VISIBLE_KEY,
  IS_COMPLEX_ITEM_KEY,
  IS_COMPLEX_KEY,
  ADD_ACTION_KEY,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY,
  SAVE_TITLE,
  EDIT_TITLE,
  REMOVE_TITLE,
  CAPTIONS,
  CONFIRM_MSG,
  TYPES
} from '../utils/constants';

const DataCard: FC = () => {
  const dispatch = useDispatch();
  const {
    form: { formDesc, formData },
    pricelist
  } = useSelector(state => ({
    form: state.form,
    pricelist: state.pricelist
  }));

  const { formFields, selecterFields } = useForm();
  const { tableData, handleTableData } = useTableData();

  const complexKeys: string[] = [IS_VISIBLE_KEY, IS_COMPLEX_ITEM_KEY, IS_COMPLEX_KEY];
  const complexData: TCustomData<string> = {
    [COMPLEX_KEY]: formData && formData.values ? formData.values[COMPLEX_KEY] as string : ''
  };
  const formHandlerData = {
    type: formData ? formData.type : null,
    items: formData && formData.items
      ? formData.items
      : formData && formData.data ? [{...formData.data}] : []
  };
  const handlersData = {
    [ADD_ACTION_KEY]: useCallback(() => {
      if(!formData) {
        return;
      }

      dispatch(handlePricelistData({
        ...formHandlerData,
        action: ADD_ACTION_KEY,
      }));
    }, [
      dispatch,
      formData
    ]),
    [EDIT_ACTION_KEY]: useCallback(() => {
      if(!formData) {
        return;
      }

      dispatch(handlePricelistData({
        ...formHandlerData,
        action: EDIT_ACTION_KEY
      }));
    }, [
      dispatch,
      formData
    ]),
    [REMOVE_ACTION_KEY]: useCallback(() => {
      if(!formData) {
        return;
      }

      dispatch(handlePricelistData({
        ...formHandlerData,
        action: REMOVE_ACTION_KEY
      }));
    }, [
      dispatch,
      formData
    ]),
  };

  const handleCurrFormData = (formData: TFormData | null) => {
    const {
      action,
      type,
      data
    } = {
      action: formData ? formData.action : '',
      type: formData ? formData.type : '',
      data: formData ? formData.data : null
    };
    const isDataExist = formData
      ? Boolean(data)
      : Boolean(formData);

    if(!isDataExist || action !== EDIT_ACTION_KEY) {
      return;
    }

    handleTableData(
      {
        data: {
          ...Object.values(TYPES).reduce((acc, type) => ({...acc, [type]: pricelist[type]}), {}),
          [type]: data ? [pricelist[type].find((item: TItemData) => item[ID_KEY] === data[ID_KEY])] : []
        },
        category: type,
        params: null
      },
      null
    );
  }

  useEffect(() => {
    handleCurrFormData(formData);
    //console.log('formData', formData);
    //console.log('formFields', formFields);
    //console.log('selecterFields', selecterFields);
  }, [
    formData
  ]);

  if(formData && formData.values && formData.action !== REMOVE_ACTION_KEY) {
    return (
      <>
        <Box sx={{ mb: 4 }}>
          {formFields[formData.type].map(
            (key) =>
              <Fragment key={key}>
                <Typography gutterBottom variant="body1" component="div" sx={{ mb: .25 }}>{CAPTIONS[key]}</Typography>
                <Typography variant="body2" component="div" sx={{ mb: 1.5, color: 'text.secondary' }}>
                  {formData.data[key]}
                  {tableData && formData.data[key] !== tableData.rows[0][key]
                    && <Alert icon={<Check fontSize="inherit" />} severity="success">Текущее значение: {tableData.rows[0][key]}</Alert>}
                </Typography>
              </Fragment>
            )
          }
          {selecterFields[formData.type].map(
            (key) =>
              <Fragment key={key}>
                <Typography gutterBottom variant="body1" component="div" sx={{ mb: .25 }}>{CAPTIONS[key]}</Typography>
                <Typography variant="body2" sx={{ mb: 1.5, color: 'text.secondary' }}>
                  {formData.values && formData.values[key] ? `${formData.values[key]}, id: ${formData.data[key]}` : 'Не указано'}
                  {tableData && formData.values && formData.values[key] !== tableData.rows[0][key]
                    && <Alert icon={<Check fontSize="inherit" />} severity="success">Текущее значение: {tableData.rows[0][key] || 'Не указано'}</Alert>}
                </Typography>
              </Fragment>
            )
          }
          {formData.type === TYPES[ITEM_KEY] && complexKeys.map(
            (key) =>
              <Fragment key={key}>
                <Typography gutterBottom variant="body1" component="div" sx={{ mb: .25 }}>{CAPTIONS[key]}</Typography>
                <Typography variant="body2" sx={{ mb: 1.5, color: 'text.secondary' }}>
                  {formData.values && formData.values[key]}
                  {tableData && formData.values && formData.values[key] !== tableData.rows[0][key]
                    && <Alert icon={<Check fontSize="inherit" />} severity="success">Текущее значение: {tableData.rows[0][key]}</Alert>}
                </Typography>
              </Fragment>
            )
          }
          {formData.data && formData.data[IS_COMPLEX_KEY]
            ? <>
                <Typography gutterBottom variant="body1" component="div" sx={{ mb: .25 }}>{CAPTIONS[COMPLEX_KEY]}</Typography>
                {complexData[COMPLEX_KEY].split(', ').map(
                  (item, index) => <Typography key={index} variant="body2" sx={{ mb: .05, color: 'text.secondary' }}>{item}</Typography>
                )}
                {tableData && complexData[COMPLEX_KEY] !== tableData.rows[0][COMPLEX_KEY] && tableData.rows[0][COMPLEX_KEY].split(', ').map(
                  (item: string, index: number) => <Alert key={index} icon={<Check fontSize="inherit" />} severity="success">{item}</Alert>
                )}
              </>
            : ''
          }
        </Box>
        <ModalFooter
          icon={<Check />}
          color='success'
          actionBtnCaption={formData && formData.action === ADD_ACTION_KEY ? SAVE_TITLE : EDIT_TITLE}
          actionHandler={handlersData[formData.action as string]}
        />
      </>
    );
  }

  return (
    <ModalFooter
      icon={formData && formData.action === REMOVE_ACTION_KEY ? <Delete /> : <Check />}
      color={formData && formData.action === REMOVE_ACTION_KEY ? 'error' : 'success'}
      actionBtnCaption={
        formData && formData.action === REMOVE_ACTION_KEY
          ? REMOVE_TITLE
          : formData && formData.action === ADD_ACTION_KEY ? SAVE_TITLE : EDIT_TITLE
      }
      introText={
        formDesc ? CONFIRM_MSG : `Вы собираетесь ${REMOVE_TITLE.toLowerCase()} позиции прайс-листа. Общее количество удаляемых записей: ${formData && 1}. ${CONFIRM_MSG}`
      }
      actionHandler={formData && handlersData[formData.action as string]}
    />
  )
}

export default DataCard;
