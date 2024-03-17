import { FC, useEffect } from 'react';
import { TextField } from '@mui/material';

import { useSelector, useDispatch } from '../services/hooks';

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

isComplexItem - радио (если отмечено, показывать список доступных комплексов и поле ввода количества)
isComplex - радио (если отмечено, показывать услуги в комплексе complex)
isVisible - радио
*/
const DataForm: FC = () => {
  const { formData } = useSelector(state => state.modal);
  const formFields = {
    [TYPES[DEPT_KEY]]: [NAME_KEY],
    [TYPES[SUBDEPT_KEY]]: [NAME_KEY],
    [TYPES[GROUP_KEY]]: [NAME_KEY],
    [TYPES[ITEM_KEY]]: [NAME_KEY, PRICE_KEY, INDEX_KEY]
  };

  useEffect(() => {
    console.log(formData);
  }, [
    formData
  ]);

  return (
    <>
      {formData && formFields[formData.type].map(
        (key, index) =>
        <TextField
          key={index.toString()}
          id={Object.keys(formData.data)[index]}
          //@ts-expect-error
          label={key === INDEX_KEY ? SORT_CAPTION : CAPTIONS[key]}
          defaultValue={formData.data[key] ? formData.data[key].toString() : ''}
          sx={{ mb: 1 }}
          fullWidth
          variant="outlined"
          margin="dense"
          type="text"
        />
      )}
      {/*isOpen && <Selecter {...selecterProps} />*/}
    </>
  )
}

export default DataForm;
