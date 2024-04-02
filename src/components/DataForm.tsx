import { FC, useCallback, useEffect } from 'react';
import { TextField } from '@mui/material';

import ModalFooter from './ModalFooter';

import useCategoryCounter from '../hooks/useCategoryCounter';

import { useSelector, useDispatch } from '../services/hooks';

import { removePricelistData } from '../services/actions/pricelist';

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
  TYPES,
  REMOVE_TITLE,
  REMOVE_ACTION_KEY
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
  const dispatch = useDispatch();
  const { formData } = useSelector(state => state.modal);
  const { depts, subdepts, groups, pricelist } = useSelector(state => state.pricelist);
  const { subCategoryCounter, setSubCategories } = useCategoryCounter();
  const formFields = {
    [TYPES[DEPT_KEY]]: [NAME_KEY],
    [TYPES[SUBDEPT_KEY]]: [NAME_KEY],
    [TYPES[GROUP_KEY]]: [NAME_KEY],
    [TYPES[ITEM_KEY]]: [NAME_KEY, PRICE_KEY, INDEX_KEY]
  };

  const removeItem = useCallback(() => {
    dispatch(removePricelistData({
      alias: formData ? formData.type as string : null,
      ids: formData ? [Object.values(formData.data)[0]] : [],
    }));
  }, [
    dispatch,
    formData
  ]);

  useEffect(() => {
    console.log(formData);
    setSubCategories({
      type: formData ? formData.type as string : null,
      data: formData ? formData.data as TCustomData<number> : null
    });
  }, [
    formData
  ]);

  if(formData && formData.action === REMOVE_ACTION_KEY) {
    return <ModalFooter actionBtnCaption={REMOVE_TITLE} introText={subCategoryCounter} actionHandler={removeItem} />;
  }

  return (
    <>
      {formData && formFields[formData.type as string].map(
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
