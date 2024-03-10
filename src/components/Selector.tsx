import { FC, useState } from 'react';
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';

import useCategoryItems from '../hooks/useCategoryItems';

import {
  CATEGORY_TITLE,
  ITEM_KEY,
  TITLES,
  TYPES
} from '../utils/constants';

const Selector: FC = () => {

  const {
    currSubcategory,
    subCategoryItems,
    categoryParams,
    setCurrSubcategory
  } = useCategoryItems();

  const setCurrKey = (value: string): string => value === TYPES[ITEM_KEY] ? ITEM_KEY : value;

  return (
    <FormControl sx={{ mb: 3, minWidth: 200, backgroundColor: '#fff' }} size="small">
      <InputLabel id="demo-select-small-label">{CATEGORY_TITLE}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={currSubcategory}
        label={CATEGORY_TITLE}
        onChange={({ target }) => setCurrSubcategory(target.value)}
      >
        {subCategoryItems.map((item) => <MenuItem key={item} value={item}>{TITLES[setCurrKey(item)]}</MenuItem>)}
      </Select>
    </FormControl>
  )
};

export default Selector;
