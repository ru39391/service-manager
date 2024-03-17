import { useState, useEffect } from 'react';
import useUrlHandler from './useUrlHandler';

import type { TCustomData } from '../types';

import {
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  ITEM_KEY,
  TITLES,
  TYPES
} from '../utils/constants';

interface ICategoryItems {
  currSubcategory: string;
  subCategoryItems: TCustomData<string>[];
  categoryTypes: TCustomData<string> | null;
  categoryParams: TCustomData<number | null> | null;
  setCurrSubcategory: (value: string) => void
}

const useCategoryItems = (): ICategoryItems => {
  const [currSubcategory, setCurrSubcategory] = useState<string>(TYPES[ITEM_KEY]);
  const [categoryTypes, setCategoryTypes] = useState<TCustomData<string> | null>(null);
  const [categoryParams, setCategoryParams] = useState<TCustomData<number | null> | null>(null);
  const [subCategoryItems, setSubCategoryItems] = useState<TCustomData<string>[]>([]);

  const { currUrlData } = useUrlHandler();

  const keysData: TCustomData<string> = Object.values(TYPES).reduce((acc, key, index) => ({ ...acc, [key]: Object.keys(TYPES)[index] }), {});
  const categoryData = {
    [TYPES[DEPT_KEY]]: [TYPES[SUBDEPT_KEY], TYPES[GROUP_KEY], TYPES[ITEM_KEY]],
    [TYPES[SUBDEPT_KEY]]: [TYPES[GROUP_KEY], TYPES[ITEM_KEY]],
    [TYPES[GROUP_KEY]]: [TYPES[ITEM_KEY]],
  };

  const handleCategoryItems = () => {
    const { type, id } = currUrlData;
    const subCategoryArr = type ? categoryData[type] : [TYPES[ITEM_KEY]];
    const subCategoryTypes = Object.values(keysData).reduce((acc: TCustomData<string>, item: string) => ({...acc, [TYPES[item]]: TITLES[item]}), {});
    const subCategoryData = subCategoryArr.map((item) => ({ [item]: Object.values(TITLES)[Object.values(TYPES).indexOf(item)] }));

    setCategoryTypes(subCategoryTypes);
    setSubCategoryItems(subCategoryData);
    setCategoryParams(type ? { [keysData[type]]: id || null } : null);
  }

  useEffect(() => {
    handleCategoryItems();
    setCurrSubcategory(TYPES[ITEM_KEY]);
  }, [
    currUrlData
  ]);

  return {
    currSubcategory,
    subCategoryItems,
    categoryTypes,
    categoryParams,
    setCurrSubcategory,
  }
}

export default useCategoryItems;
