import { FC, useCallback, useEffect } from 'react';
import {
  Box,
  TextField,
  FormGroup,
  FormControlLabel,
  Grid,
  Checkbox
} from '@mui/material';
import { Delete } from '@mui/icons-material';

import Selecter from './Selecter';
import ModalFooter from './ModalFooter';
import ComplexItemsList from './ComplexItemsList';

import useForm from '../hooks/useForm';
import useCategoryCounter from '../hooks/useCategoryCounter';

import { useSelector, useDispatch } from '../services/hooks';
import { setFormValues } from '../services/slices/form-slice';

import { removePricelistData } from '../services/actions/pricelist';

import type { TCustomData, TItemData } from '../types';

import {
  ID_KEY,
  ITEM_KEY,
  NAME_KEY,
  INDEX_KEY,
  IS_VISIBLE_KEY,
  ADD_ACTION_KEY,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY,
  IS_COMPLEX_KEY,
  IS_COMPLEX_ITEM_KEY,
  SORT_CAPTION,
  CAPTIONS,
  REMOVE_TITLE,
  SAVE_TITLE,
  NOT_EMPTY_CATEGORY,
  TYPES
} from '../utils/constants';

/*
item_id - нельзя редактировать

name - поле
price - поле
index - поле

dept - список
subdept - список
group - список

// TODO: настроить установку значения для параметра "Входит в комплекс" (сейчас везде 0, см. услуги для комлекса id = 19829)
// TODO: настроить обработку списка услуг, входящих в компекс
isComplexItem - входит в комплекс, радио (если отмечено, показывать список доступных комплексов и поле ввода количества)
isComplex - комплекс услуг, радио (если отмечено, показывать услуги в комплексе complex), настроить пересчёт цены при парсинге
*/
const DataForm: FC = () => {
  const dispatch = useDispatch();
  const { formData, formValues } = useSelector(state => state.form);
  const { subCategoryCounter, setSubCategories } = useCategoryCounter();
  const {
    isDisabled,
    formFields,
    selecterFields,
    requiredFormFields
  } = useForm();

  const complexKeys: string[] = [IS_COMPLEX_KEY, IS_COMPLEX_ITEM_KEY];
  const handlersData = {
    [ADD_ACTION_KEY]: useCallback(() => {
      console.log({
        alias: formData ? formData.type as string : null,
        data: formData ? [{...formData.data as TItemData, ...formValues}] : [],
      });
    }, [
      dispatch,
      formData,
      formValues
    ]),
    [EDIT_ACTION_KEY]: useCallback(() => {
      console.log({
        alias: formData ? formData.type as string : null,
        data: formData ? [{[ID_KEY]: formData.data[ID_KEY], ...formValues}] : [],
      });
    }, [
      dispatch,
      formData,
      formValues
    ]),
    [REMOVE_ACTION_KEY]: useCallback(() => {
      dispatch(removePricelistData({
        alias: formData ? formData.type as string : null,
        ids: formData ? [formData.data[ID_KEY]] : [],
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
  };

  const changeVisibility = (value: number) => {
    if(!formData || formData.action === REMOVE_ACTION_KEY || formData.type !== TYPES[ITEM_KEY]) {
      return;
    }

    dispatch(
      setFormValues({
        values: {
          ...formValues,
          [IS_VISIBLE_KEY]: value
        }
      })
    )
  };

  const handleComplexData = ({key, value}: {key: string, value: number}) => {
    if(!formData || formData.action === REMOVE_ACTION_KEY || formData.type !== TYPES[ITEM_KEY]) {
      return;
    }

    dispatch(
      setFormValues({
        values: {
          ...formValues,
          [key]: value,
          ...(key === IS_COMPLEX_ITEM_KEY && value === 1 && {[IS_COMPLEX_KEY]: 0}),
          ...(key === IS_COMPLEX_KEY && value === 1 && {[IS_COMPLEX_ITEM_KEY]: 0}),
        }
      })
    )
  };

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
    console.log('formValues: ', formValues);

    if(formData && formValues[IS_VISIBLE_KEY] === undefined) {
      changeVisibility(formData.action === EDIT_ACTION_KEY ? formData.data[IS_VISIBLE_KEY] : 1);
    }

    if(formData && complexKeys.every(key => formValues[key] === undefined)) {
      complexKeys.forEach(key => handleComplexData({
        key,
        value: formData.action === EDIT_ACTION_KEY ? formData.data[key] : 0
      }));
    }
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
            {formData.type === TYPES[ITEM_KEY] && (
              <>
                <FormGroup>
                  <FormControlLabel
                    label={CAPTIONS[IS_VISIBLE_KEY]}
                    control={
                      <Checkbox
                        checked={Boolean(formValues[IS_VISIBLE_KEY])}
                        onChange={() => changeVisibility(Number(!formValues[IS_VISIBLE_KEY]))}
                      />
                    }
                  />
                  {complexKeys.map(
                    (key) =>
                      <FormControlLabel
                        key={key}
                        label={CAPTIONS[key]}
                        control={
                          <Checkbox
                            checked={Boolean(formValues[key])}
                            onChange={() => handleComplexData({
                              key,
                              value: Number(!formValues[key])
                            })}
                          />
                        }
                      />
                    )
                  }
                </FormGroup>
                <ComplexItemsList complexItemId={formData.data[ID_KEY]} />
                <Grid container spacing={2}>
                  <Grid item xs={9}>
                    <TextField
                      id="outlined-value"
                      label="value"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      type="text"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="outlined-number"
                      label="Number"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      type="text"
                    />
                  </Grid>
                </Grid>
              </>
            )}
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
