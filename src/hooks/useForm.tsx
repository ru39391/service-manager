import {
  useState,
  useEffect,
} from 'react';

import { useSelector } from '../services/hooks';

import type { TCustomData, TItemData } from '../types';

import {
  ADD_ACTION_KEY,
  NAME_KEY,
  PRICE_KEY,
  INDEX_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  IS_VISIBLE_KEY,
  IS_COMPLEX_ITEM_KEY,
  IS_COMPLEX_KEY,
  ITEM_KEY,
  TYPES,
} from '../utils/constants';

interface IForm {
  isDisabled: boolean;
  formFields: TCustomData<string[]>;
  selecterFields: TCustomData<string[]>;
  requiredFormFields: string[];
  textFieldValues: TCustomData<string> | null;
  handleTextFields: (data: TCustomData<number | undefined>) => void;
}

const useForm = (): IForm => {
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const [textFieldValues, setTextFieldValues] = useState<TCustomData<string> | null>(null);

  const { formData, formValues } = useSelector(state => state.form);

  const formFields = {
    [TYPES[DEPT_KEY]]: [NAME_KEY],
    [TYPES[SUBDEPT_KEY]]: [NAME_KEY],
    [TYPES[GROUP_KEY]]: [NAME_KEY],
    [TYPES[ITEM_KEY]]: [NAME_KEY, PRICE_KEY, INDEX_KEY]
  };
  const selecterFields = {
    [TYPES[DEPT_KEY]]: [],
    [TYPES[SUBDEPT_KEY]]: [DEPT_KEY],
    [TYPES[GROUP_KEY]]: [DEPT_KEY, SUBDEPT_KEY, GROUP_KEY],
    [TYPES[ITEM_KEY]]: [DEPT_KEY, SUBDEPT_KEY, GROUP_KEY]
  };
  const togglerFields = {
    [TYPES[DEPT_KEY]]: [],
    [TYPES[SUBDEPT_KEY]]: [],
    [TYPES[GROUP_KEY]]: [],
    [TYPES[ITEM_KEY]]: [IS_VISIBLE_KEY, IS_COMPLEX_ITEM_KEY, IS_COMPLEX_KEY]
  };
  const requiredFormFields = [NAME_KEY, PRICE_KEY];

  const handleFormValues = () => {
    if(!formData) {
      setDisabled(true);
      return;
    }

    const {action, type, data: currValues} = formData;
    const currKeys = Object.keys(formValues)
      .filter(
        key => [
          ...formFields[type as string],
          ...selecterFields[type as string],
          ...togglerFields[type as string]
        ].includes(key)
      );
    const currRequiredFields = requiredFormFields
      .filter(
        key => [...formFields[type as string]].includes(key)
      );
      // TODO:
    const editedValues: TItemData = currKeys
      .reduce(
        (acc: TItemData, key: string) => currValues[key] === formValues[key] ? acc : {...acc, [key]: formValues[key]},
        {}
      );
    const isValuesEdited: boolean = !Object.values(editedValues).length;
    const undefinedRequiredValues: string[] = currRequiredFields
      .reduce(
        (
          acc: string[],
          item: string
        ) => editedValues[item] === undefined ? [...acc, item] : acc, []
      );
    const invalidRequiredValues: string[] = requiredFormFields
      .reduce(
        (
          acc: string[],
          item: string
        ) => editedValues[item] !== undefined && !editedValues[item] ? [...acc, item] : acc, []
      );
    const isActionAdd: boolean = action === ADD_ACTION_KEY && Boolean(undefinedRequiredValues.length);

    /*
    console.log({editedValues});
    console.log({undefinedRequiredValues, isActionAdd});
    console.log({invalidRequiredValues});
    */
    setDisabled(isValuesEdited || Boolean(invalidRequiredValues.length) || isActionAdd);
  }

  const handleTextFields = (data: TCustomData<number | undefined>) => {
    setTextFieldValues(
      data[PRICE_KEY] === undefined
        ? null
        : {[PRICE_KEY]: data[PRICE_KEY] ? data[PRICE_KEY].toString() : '0'}
    );
  }

  useEffect(() => {
    handleFormValues();
    //console.log(formValues);
  }, [
    formValues
  ]);

  return {
    isDisabled,
    formFields,
    selecterFields,
    requiredFormFields,
    textFieldValues,
    handleTextFields
  };
}

export default useForm;
