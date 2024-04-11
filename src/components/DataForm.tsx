import { FC, useCallback, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';

import Selecter from './Selecter';
import ModalFooter from './ModalFooter';

import useForm from '../hooks/useForm';
import useCategoryCounter from '../hooks/useCategoryCounter';

import { useSelector, useDispatch } from '../services/hooks';
import { setFormValues } from '../services/slices/form-slice';

import { removePricelistData } from '../services/actions/pricelist';

import type { TCustomData } from '../types';

import {
  NAME_KEY,
  INDEX_KEY,
  SORT_CAPTION,
  CAPTIONS,
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
// TODO: настроить disabled кнопки submit
const DataForm: FC = () => {
  const dispatch = useDispatch();
  const { formData, formValues } = useSelector(state => state.form);
  // TODO: исправить баг с пересчётом дочерних элементов
  const { subCategoryCounter, setSubCategories } = useCategoryCounter();
  const {
    isDisabled,
    formFields,
    selecterFields,
    requiredFormFields
  } = useForm();

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
        ids: formData ? [Object.values(formData.data)[0] as number] : [],
      }));
    }, [
      dispatch,
      formData
    ]),
  };

  const handleInput = (input: EventTarget & (HTMLInputElement | HTMLTextAreaElement), key: string) => {
    input.value = key === NAME_KEY ? input.value : input.value.replace(/\D/g, '');
    dispatch(
      setFormValues({
        values: {
          ...formValues,
          [key]: key === NAME_KEY ? input.value : Number(input.value)
        }
      })
    )
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

  useEffect(() => {
    //console.log('formValues: ', formValues);
  }, [
    formValues
  ]);

  if(formData && formData.action === REMOVE_ACTION_KEY) {
    return <ModalFooter
      icon={<Delete />}
      color='error'
      disabled={false}
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
            required={requiredFormFields.includes(key)}
            onChange={({ target }) => handleInput(target, key)}
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
            disabled={isDisabled}
            actionBtnCaption={SAVE_TITLE}
            actionHandler={handlersData[formData.action as string]}
          />
        </>
      )}
    </>
  )
}

export default DataForm;
