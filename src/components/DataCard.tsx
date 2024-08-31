import { FC, Fragment, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Check, Delete } from '@mui/icons-material';

import ModalFooter from './ModalFooter';

import useForm from '../hooks/useForm';

import { useSelector } from '../services/hooks';

import type { TCustomData } from '../types';

import {
  CAPTIONS,
  CONFIRM_MSG,
  ITEM_KEY,
  COMPLEX_KEY,
  IS_VISIBLE_KEY,
  IS_COMPLEX_ITEM_KEY,
  IS_COMPLEX_KEY,
  ADD_ACTION_KEY,
  REMOVE_ACTION_KEY,
  SAVE_TITLE,
  EDIT_TITLE,
  REMOVE_TITLE,
  TYPES
} from '../utils/constants';

const DataCard: FC = () => {
  const { formData } = useSelector(state => state.form);
  const {
    formFields,
    selecterFields
  } = useForm();
  const complexKeys: string[] = [IS_VISIBLE_KEY, IS_COMPLEX_ITEM_KEY, IS_COMPLEX_KEY];
  const complexData: TCustomData<string> = {
    [COMPLEX_KEY]: formData && formData.values ? formData.values[COMPLEX_KEY] as string : ''
  };

  useEffect(() => {
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
                <Typography variant="body2" sx={{ mb: 1.5, color: 'text.secondary' }}>{formData.data[key]}</Typography>
              </Fragment>
            )
          }
          {selecterFields[formData.type].map(
            (key) =>
              <Fragment key={key}>
                <Typography gutterBottom variant="body1" component="div" sx={{ mb: .25 }}>{CAPTIONS[key]}</Typography>
                <Typography variant="body2" sx={{ mb: 1.5, color: 'text.secondary' }}>
                  {formData.values && formData.values[key] ? `${formData.values[key]}, id: ${formData.data[key]}` : 'Не указано'}
                </Typography>
              </Fragment>
            )
          }
          {formData.type === TYPES[ITEM_KEY] && complexKeys.map(
            (key) =>
              <Fragment key={key}>
                <Typography gutterBottom variant="body1" component="div" sx={{ mb: .25 }}>{CAPTIONS[key]}</Typography>
                <Typography variant="body2" sx={{ mb: 1.5, color: 'text.secondary' }}>{formData.values && formData.values[key]}</Typography>
              </Fragment>
            )
          }
          {formData.data && formData.data[IS_COMPLEX_KEY]
            ? <>
                <Typography gutterBottom variant="body1" component="div" sx={{ mb: .25 }}>{CAPTIONS[COMPLEX_KEY]}</Typography>
                {complexData[COMPLEX_KEY].split(', ').map(
                  (item, key) => <Typography key={key} variant="body2" sx={{ mb: .05, color: 'text.secondary' }}>{item}</Typography>
                )}
              </>
            : ''
          }
        </Box>
        <ModalFooter
          icon={<Check />}
          color='success'
          actionBtnCaption={formData && formData.action === ADD_ACTION_KEY ? SAVE_TITLE : EDIT_TITLE}
          actionHandler={() => console.log('actionHandler')}
        />
      </>
    );
  }

  return (
    <ModalFooter
      icon={<Delete />}
      color='error'
      actionBtnCaption={REMOVE_TITLE}
      introText={`Вы собираетесь ${REMOVE_TITLE.toLowerCase()} позиции прайс-листа. Общее количество удаляемых записей: ${formData && 1}. ${CONFIRM_MSG}`}
      actionHandler={() => console.log('actionHandler')}
    />
  )
}

export default DataCard;
