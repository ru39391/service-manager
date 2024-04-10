import {
  useState,
  useEffect,
} from 'react';

import { useSelector, useDispatch } from '../services/hooks';

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

// TODO: настроить isDisabled для формы создания ресурса
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
    [TYPES[GROUP_KEY]]: [DEPT_KEY, SUBDEPT_KEY],
    [TYPES[ITEM_KEY]]: [DEPT_KEY, SUBDEPT_KEY, GROUP_KEY]
  };
  const requiredFormFields = [NAME_KEY, PRICE_KEY];

  const handleFormValues = () => {
    const [keys, values] = [Object.keys(formValues), Object.values(formValues)];
    const editedValuesArr: (string | number | null)[] = keys
      .map((key) => formData && formData.data[key])
      .reduce(
        (
          acc: (string | number | null)[],
          item: string | number | null,
          index
        ) => item !== values[index] && item !== undefined
          ? ({ ...acc, [keys[index]]: values[index] })
          : acc,
        {}
      );
    const requiredFieldValues: (string | number)[] = requiredFormFields
      .map((key) => editedValuesArr[key])
      .filter((item: string | number | undefined) => item !== undefined && !item);

    /*
    console.log(
      'requiredFieldValues: ',
      requiredFormFields
        .map((key) => editedValuesArr[key])
    );
    console.log('values: ', values);
    console.log('formData: ', formData);
    console.log('editedValuesArr: ', editedValuesArr);
    */
    setDisabled(!Object.values(editedValuesArr).length || Boolean(requiredFieldValues.length));
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
