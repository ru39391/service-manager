import { useState, useEffect } from 'react';
//import { useSelector } from '../services/hooks';
import useUrlHandler from './useUrlHandler';

import type { TCustomData } from '../types';

import {
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  ITEM_KEY,
  TYPES
} from '../utils/constants';

interface ICategoryItems {
  currSubcategory: string;
  subCategoryItems: string[];
  categoryParams: TCustomData<number | null> | null;
  setCurrSubcategory: (value: string) => void
}

const useCategoryItems = (): ICategoryItems => {
  const [currSubcategory, setCurrSubcategory] = useState<string>(TYPES[ITEM_KEY]);
  const [categoryParams, setCategoryParams] = useState<TCustomData<number | null> | null>(null);
  const [subCategoryItems, setSubCategoryItems] = useState<string[]>([]);

  //const pricelist = useSelector(state => state.pricelist);
  const { currUrlData } = useUrlHandler();

  const keysData = Object.values(TYPES).reduce((acc, key, index) => ({ ...acc, [key]: Object.keys(TYPES)[index] }), {});
  const categoryData = {
    [TYPES[DEPT_KEY]]: [SUBDEPT_KEY, GROUP_KEY, TYPES[ITEM_KEY]],
    [TYPES[SUBDEPT_KEY]]: [GROUP_KEY, TYPES[ITEM_KEY]],
    [TYPES[GROUP_KEY]]: [TYPES[ITEM_KEY]],
  };

  const handleCategoryItems = () => {
    const { type, id } = currUrlData;

    setSubCategoryItems(type ? categoryData[type] : [TYPES[ITEM_KEY]]);
    setCategoryParams(type ? { [keysData[type]]: id || null } : null);
  }

  useEffect(() => {
    handleCategoryItems();
    setCurrSubcategory(TYPES[ITEM_KEY]);
  }, [
    currUrlData,
    //pricelist
  ]);

  return {
    currSubcategory,
    subCategoryItems,
    categoryParams,
    setCurrSubcategory,
  }
}

export default useCategoryItems;
