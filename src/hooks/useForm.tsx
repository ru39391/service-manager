import {
  useState,
  useEffect,
} from 'react';

import { useSelector, useDispatch } from '../services/hooks';

import { NAME_KEY, PRICE_KEY } from '../utils/constants';

interface IForm {
  isDisabled: boolean;
  requiredFieldKeys: string[]
}

// TODO: настроить isDisabled для формы создания ресурса
const useForm = (): IForm => {
  const [isDisabled, setDisabled] = useState<boolean>(true);

  const { formData, formValues } = useSelector(state => state.form);

  const requiredFieldKeys = [NAME_KEY, PRICE_KEY];

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
    const requiredFieldValues: (string | number)[] = requiredFieldKeys
      .map((key) => editedValuesArr[key])
      .filter((item: string | number | undefined) => item !== undefined && !item);

    /*
    console.log('keys: ', keys);
    console.log('values: ', values);
    console.log('editedValuesArr: ', editedValuesArr);
    console.log(
      'requiredFieldValues: ',
      requiredFieldKeys
        .map((key) => editedValuesArr[key])
    );
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
    requiredFieldKeys
  };
}

export default useForm;
