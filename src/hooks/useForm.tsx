import {
  useState,
  useEffect,
} from 'react';

import { useSelector } from '../services/hooks';

import type { TCustomData } from '../types';

import {
  NAME_KEY,
  PRICE_KEY,
  INDEX_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  ITEM_KEY,
  TYPES,
} from '../utils/constants';

interface IForm {
  isDisabled: boolean;
  formFields: TCustomData<string[]>;
  selecterFields: TCustomData<string[]>;
  requiredFormFields: string[];
}

const useForm = (): IForm => {
  const [isDisabled, setDisabled] = useState<boolean>(true);

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
  const requiredFormFields = [NAME_KEY, PRICE_KEY];

  const handleFormValues = () => {
    if(!formData) {
      setDisabled(true);
      return;
    }

    const {data: currValues} = formData; // action, type,
    const [keys, values] = [Object.keys(formValues), Object.values(formValues)];
    const editedValues: TCustomData<string | number | null> = keys
      .reduce(
        (
          acc: TCustomData<string | number | null>,
          key: string,
          index: number
        ) => currValues[key] === values[index] ? acc : {...acc, [key]: values[index]}, {}
      );
    const isValuesEdited: boolean = !Object.values(editedValues).length;
    const undefinedRequiredValues: string[] = requiredFormFields
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

    /*
    console.log(editedValues);
    console.log({undefinedRequiredValues});
    console.log({invalidRequiredValues});
    */
    setDisabled(undefinedRequiredValues.length === 0 ? isValuesEdited : isValuesEdited || Boolean(invalidRequiredValues.length));
  }

  useEffect(() => {
    handleFormValues();
  }, [
    formValues
  ]);

  return {
    isDisabled,
    formFields,
    selecterFields,
    requiredFormFields
  };
}

export default useForm;
