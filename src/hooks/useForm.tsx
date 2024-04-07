import {
  useState,
  useEffect,
} from 'react';

import { useSelector, useDispatch } from '../services/hooks';

import type { TCustomData } from '../types';

interface IForm {
  isDisabled: boolean;
}

// TODO: настроить зависимость isDisabled и заполнения обязательных полей
// TODO: настроить валидацию полей по содержимому
// TODO: настроить isDisabled для формы создания ресурса
const useForm = (): IForm => {
  const [isDisabled, setDisabled] = useState<boolean>(true);

  const { formData, formValues } = useSelector(state => state.form);

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

    console.log(editedValuesArr);
    setDisabled(!Object.keys(editedValuesArr).length);
  }

  useEffect(() => {
    handleFormValues();
  }, [
    formValues
  ]);

  return {
    isDisabled,
  };
}

export default useForm;
