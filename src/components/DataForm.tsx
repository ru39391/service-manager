import { FC, useCallback, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';

import Selecter from './Selecter';
import ModalFooter from './ModalFooter';

import useCategoryCounter from '../hooks/useCategoryCounter';

import { useSelector, useDispatch } from '../services/hooks';

import { removePricelistData } from '../services/actions/pricelist';

import type { TCustomData } from '../types';

import {
  ID_KEY,
  NAME_KEY,
  PRICE_KEY,
  INDEX_KEY,
  SORT_CAPTION,
  CAPTIONS,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  ITEM_KEY,
  TYPES,
  REMOVE_TITLE,
  SAVE_TITLE,
  ADD_ACTION_KEY,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY,
  NOT_EMPTY_CATEGORY
} from '../utils/constants';

/*
item_id - нельзя редактировать

name - поле
price - поле
index - поле

dept - список
subdept - список
group - список

// TODO: настроить радиокнопки
isComplexItem - радио (если отмечено, показывать список доступных комплексов и поле ввода количества)
isComplex - радио (если отмечено, показывать услуги в комплексе complex)
isVisible - радио
*/
const DataForm: FC = () => {
  const dispatch = useDispatch();
  const { formData } = useSelector(state => state.form);
  const { subCategoryCounter, setSubCategories } = useCategoryCounter();

  const formFields = {
    [TYPES[DEPT_KEY]]: [NAME_KEY],
    [TYPES[SUBDEPT_KEY]]: [NAME_KEY],
    [TYPES[GROUP_KEY]]: [NAME_KEY],
    [TYPES[ITEM_KEY]]: [NAME_KEY, PRICE_KEY, INDEX_KEY]
  };
  const selecterFields = {
    [TYPES[DEPT_KEY]]: [],
    [TYPES[SUBDEPT_KEY]]: [DEPT_KEY],
    [TYPES[GROUP_KEY]]: [DEPT_KEY, SUBDEPT_KEY],
    [TYPES[ITEM_KEY]]: [DEPT_KEY, SUBDEPT_KEY, GROUP_KEY]
  };

  const handlersData = {
    [ADD_ACTION_KEY]: useCallback(() => {
      console.log(ADD_ACTION_KEY);
    }, [
      dispatch,
      formData
    ]),
    [EDIT_ACTION_KEY]: useCallback(() => {
      console.log(EDIT_ACTION_KEY);
    }, [
      dispatch,
      formData
    ]),
    [REMOVE_ACTION_KEY]: useCallback(() => {
      dispatch(removePricelistData({
        alias: formData ? formData.type as string : null,
        ids: formData ? [Object.values(formData.data)[0]] : [],
      }));
    }, [
      dispatch,
      formData
    ]),
  }

  useEffect(() => {
    console.log(formData);
    setSubCategories({
      type: formData ? formData.type as string : null,
      data: formData ? formData.data as TCustomData<number> : null
    });
  }, [
    formData
  ]);

  if(formData && formData.action === REMOVE_ACTION_KEY) {
    return <ModalFooter
      icon={<Delete />}
      color='error'
      actionBtnCaption={REMOVE_TITLE}
      introText={`${NOT_EMPTY_CATEGORY}${subCategoryCounter}`}
      actionHandler={handlersData[formData.action]}
    />;
  }

  return (
    <>
      {formData && formFields[formData.type as string].map(
        (key, index) =>
          <TextField
            key={index.toString()}
            id={key}
            name={key}
            label={key === INDEX_KEY ? SORT_CAPTION : CAPTIONS[key]}
            defaultValue={formData.data[key] ? formData.data[key].toString() : ''}
            sx={{ mb: 1 }}
            fullWidth
            variant="outlined"
            margin="dense"
            type="text"
            onChange={({ target }) => console.log({
              key,
              name: target.name,
              value: target.value
            })}
          />
        )
      }
      {formData && formData.action !== REMOVE_ACTION_KEY && (
        <>
          <Box sx={{ mb: 4 }}>
            <Selecter
              keys={selecterFields[formData.type as string]}
            />
          </Box>
          <ModalFooter
            actionBtnCaption={SAVE_TITLE}
            actionHandler={handlersData[formData.action as string]}
          />
        </>
      )}
    </>
  )
}

export default DataForm;
