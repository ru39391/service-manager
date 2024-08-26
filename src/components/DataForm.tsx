import { FC, useCallback, useEffect } from 'react';
import {
  Box,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { Check, Delete } from '@mui/icons-material';

import Selecter from './Selecter';
import ModalFooter from './ModalFooter';
import ComplexItemsList from './ComplexItemsList';

import useForm from '../hooks/useForm';
import useComplex from '../hooks/useComplex';
import useCategoryCounter from '../hooks/useCategoryCounter';

import { useSelector, useDispatch } from '../services/hooks';
import { setFormValues } from '../services/slices/form-slice';

import { handlePricelistData } from '../services/actions/pricelist';

import type { TCustomData, TItemData, TItemsArr } from '../types';

import {
  ID_KEY,
  ITEM_KEY,
  NAME_KEY,
  PRICE_KEY,
  INDEX_KEY,
  IS_VISIBLE_KEY,
  ADD_ACTION_KEY,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY,
  REMOVED_KEY,
  COMPLEX_KEY,
  IS_COMPLEX_KEY,
  IS_COMPLEX_ITEM_KEY,
  SORT_CAPTION,
  CAPTIONS,
  REMOVE_TITLE,
  SAVE_TITLE,
  NOT_EMPTY_CATEGORY,
  TYPES
} from '../utils/constants';

interface IDataForm {
  confirmationData?: TCustomData<string> | null;
  isFileParcing?: boolean;
  actionHandler?: () => void
}

/*
item_id - нельзя редактировать

name - поле
price - поле
index - поле

dept - список
subdept - список
group - список

// TODO: настроить установку значения для параметра "Входит в комплекс" (сейчас везде 0, см. услуги для комлекса id = 19829)
*/
const DataForm: FC<IDataForm> = ({
  confirmationData,
  isFileParcing,
  actionHandler
}) => {
  const dispatch = useDispatch();
  const { formData, formValues } = useSelector(state => state.form);
  const { subCategoryCounter, setSubCategories } = useCategoryCounter();
  const { currComplexSumm, setItemId } = useComplex();
  const {
    isDisabled,
    formFields,
    selecterFields,
    requiredFormFields,
    textFieldValues,
    handleTextFields
  } = useForm();

  const complexKeys: string[] = [IS_COMPLEX_ITEM_KEY, IS_COMPLEX_KEY];
  const handlersData = {
    [ADD_ACTION_KEY]: useCallback(() => {
      dispatch(handlePricelistData({
        action: ADD_ACTION_KEY,
        type: formData ? formData.type as string : null,
        items: formData ? [{...formData.data as TItemData, ...formValues, ...( !formData.data[ID_KEY] && { ...setItemId() })}] : []
      }));
    }, [
      dispatch,
      formData,
      formValues,
      setItemId
    ]),
    [EDIT_ACTION_KEY]: useCallback(() => {
      dispatch(handlePricelistData({
        action: EDIT_ACTION_KEY,
        type: formData ? formData.type as string : null,
        items: formData ? [{[ID_KEY]: formData.data[ID_KEY], ...formValues}] : []
      }));
    }, [
      dispatch,
      formData,
      formValues
    ]),
    [REMOVE_ACTION_KEY]: useCallback(() => {
      dispatch(handlePricelistData({
        action: REMOVE_ACTION_KEY,
        type: formData ? formData.type as string : null,
        items: formData ? [{[ID_KEY]: formData.data[ID_KEY]}] : [],
      }));
    }, [
      dispatch,
      formData
    ]),
  };

  const handlePriceValue = (data: { [PRICE_KEY]: number; [COMPLEX_KEY]: string }): number => {
    if(data[COMPLEX_KEY] === undefined) {
      return currComplexSumm;
    }

    const arr = data[COMPLEX_KEY] ? JSON.parse(data[COMPLEX_KEY]) : [];

    return arr.length === 0 ? data[PRICE_KEY] : data[PRICE_KEY] || currComplexSumm;
  }

  const handleInput = (input: EventTarget & (HTMLInputElement | HTMLTextAreaElement), key: string) => {
    input.value = key === NAME_KEY ? input.value : input.value.replace(/\D/g, '');

    dispatch(
      setFormValues({
        values: {
          ...formValues,
          [key]: key === NAME_KEY ? input.value : Number(input.value)
        }
      })
    );

    if(key == PRICE_KEY) {
      handleTextFields({ [PRICE_KEY]: Number(input.value) });
    }
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

  const changeComplexData = ({key, value}: {key: string, value: number | string}) => {
    if(!formData || formData.action === REMOVE_ACTION_KEY || formData.type !== TYPES[ITEM_KEY]) {
      return;
    }

    const data = {
      [COMPLEX_KEY]: formData ? formData.data[COMPLEX_KEY] : '[]',
      [PRICE_KEY]: formData ? formData.data[PRICE_KEY] : 0
    };
    const isComplexItemsExist = data[COMPLEX_KEY] === undefined
      ? data[COMPLEX_KEY]
      : JSON.parse(data[COMPLEX_KEY]).length > 0;


    dispatch(
      setFormValues({
        values: {
          ...formValues,
          [key]: value,
          ...(key === IS_COMPLEX_ITEM_KEY && value === 1 && {
            [IS_COMPLEX_KEY]: 0,
            [COMPLEX_KEY]: '[]',
            [PRICE_KEY]: formData && formData.action === ADD_ACTION_KEY ? formValues[PRICE_KEY] : data[PRICE_KEY]
          }),
          ...(key === IS_COMPLEX_KEY && {
            ...( value === 1
                ? {
                  [IS_COMPLEX_ITEM_KEY]: 0,
                  [PRICE_KEY]: isComplexItemsExist ? data[PRICE_KEY] : 0,
                  ...(isComplexItemsExist && { [COMPLEX_KEY]: data[COMPLEX_KEY] })
                }
                : {
                  ...data,
                  [COMPLEX_KEY]: '[]',
                }
              )
          }),
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

    handleTextFields({ [PRICE_KEY]: formData ? formData.data[PRICE_KEY] : 0 });
  }, [
    formData
  ]);

  useEffect(() => {
    console.log('formValues: ', formValues);

    handleTextFields({
      [PRICE_KEY]: formData && formValues[PRICE_KEY] === undefined
        ? formData.data[PRICE_KEY]
        : handlePriceValue({
          [PRICE_KEY]: formValues[PRICE_KEY] as number,
          [COMPLEX_KEY]: formValues[COMPLEX_KEY] as string
        })
    });

    if(formData && formValues[IS_VISIBLE_KEY] === undefined) {
      changeVisibility(formData.action === EDIT_ACTION_KEY ? formData.data[IS_VISIBLE_KEY] : 1);
    }

    [...complexKeys].forEach(key => {
      if(formData && formValues[key] === undefined) {
        changeComplexData({
          key,
          value: formData.action === EDIT_ACTION_KEY ? formData.data[key] : 0
        });
      }
    });
  }, [
    formValues
  ]);

  if(formData && formData.action === REMOVE_ACTION_KEY) {
    return <ModalFooter
      icon={<Delete />}
      color='error'
      disabled={false}
      actionBtnCaption={REMOVE_TITLE}
      introText={
        isFileParcing
          ? `Вы собираетесь ${REMOVE_TITLE.toLowerCase()} позиции прайс-листа. Общее количество обновляемых записей: ${formData && 1}. Подтвердите выполнение действия`
          : `${NOT_EMPTY_CATEGORY}${subCategoryCounter}`
      }
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
            sx={{ mb: 1 }}
            fullWidth
            variant="outlined"
            margin="dense"
            type="text"
            required={requiredFormFields.includes(key)}
            disabled={key === PRICE_KEY && Boolean(formValues[IS_COMPLEX_KEY]) || isFileParcing}
            onChange={({ target }) => handleInput(target, key)}
            {...(
              key === PRICE_KEY
                ? { value: textFieldValues ? textFieldValues[key] : '0' }
                : { defaultValue: formData.data[key] ? formData.data[key].toString() : '' }
            )}
          />
        )
      }
      {formData && formData.action !== REMOVE_ACTION_KEY
        ? (<>
          <Box sx={{ mb: 4 }}>
            <Selecter
              disabled={Boolean(isFileParcing)}
              keys={selecterFields[formData.type as string]}
            />
            {formData.type === TYPES[ITEM_KEY] && (
              <>
                <FormGroup>
                  <FormControlLabel
                    label={CAPTIONS[IS_VISIBLE_KEY]}
                    control={
                      <Checkbox
                        disabled={isFileParcing}
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
                            disabled={isFileParcing}
                            checked={Boolean(formValues[key])}
                            onChange={() => changeComplexData({
                              key,
                              value: Number(!formValues[key])
                            })}
                          />
                        }
                      />
                    )
                  }
                </FormGroup>
                {formValues[IS_COMPLEX_KEY]
                  ? <ComplexItemsList itemId={formData.data[ID_KEY]} disabled={Boolean(isFileParcing)} />
                  : ''
                }
              </>
            )}
          </Box>
          <ModalFooter
            disabled={isFileParcing ? !isFileParcing : isDisabled}
            actionBtnCaption={SAVE_TITLE}
            actionHandler={handlersData[formData.action as string]}
          />
        </>)
        : <ModalFooter
            icon={confirmationData && confirmationData.key === REMOVED_KEY ? <Delete /> : <Check />}
            color={confirmationData && confirmationData.key === REMOVED_KEY ? 'error' : 'success'}
            actionBtnCaption={confirmationData ? confirmationData.btnCaption : SAVE_TITLE}
            introText={confirmationData ? confirmationData.intro : ''}
            {...( actionHandler && { actionHandler } )}
        />
      }
    </>
  )
}

export default DataForm;
