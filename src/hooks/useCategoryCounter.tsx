import { useState, useEffect } from 'react';

import { useSelector } from '../services/hooks';

import type { TCustomData } from '../types';

import {
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  ITEM_KEY,
  TITLES,
  TYPES
} from '../utils/constants';

type TCategoryData = {
  type: string | null;
  data: TCustomData<number> | null;
};

interface ICategoryCounter {
  subCategoryCounter: string;
  setSubCategories: ({type, data}: TCategoryData) => void;
}

const useCategoryCounter = (): ICategoryCounter => {
  const [categoryList, setCategoryList] = useState<string[] | null>(null);
  const [subCategoryCounter, setSubCategoryCounter] = useState<string>('');
  const [sortedParams, setSortedParams] = useState<TCustomData<number> | null>(null);

  const pricelistData = useSelector(state => state.pricelist);

  const subCategories = {
    [TYPES[DEPT_KEY]]: [TYPES[SUBDEPT_KEY], TYPES[GROUP_KEY], TYPES[ITEM_KEY]],
    [TYPES[SUBDEPT_KEY]]: [TYPES[GROUP_KEY], TYPES[ITEM_KEY]],
    [TYPES[GROUP_KEY]]: [TYPES[GROUP_KEY], TYPES[ITEM_KEY]],
    [TYPES[ITEM_KEY]]: []
  };

  const filterData = (arr: TCustomData<number | string>[]): TCustomData<number | string>[] => {
    if(!sortedParams) {
      return [];
    }

    const [key, value] = [Object.keys(sortedParams)[0], Object.values(sortedParams)[0]];

    return arr.filter((data: TCustomData<number | string>) => data[key] === value);
  }

  const countSubCategoryItems = () => {
    const typesData: TCustomData<string> = Object.values(TYPES).reduce((acc, item, index) => ({ ...acc, [item]: Object.keys(TYPES)[index] }), {})

    if(categoryList && categoryList.length) {
      const countedData: TCustomData<number> = categoryList.reduce((acc, item) => (
        {
          ...acc,
          [item]: filterData(pricelistData[item]).length
        }
      ), {});
      const str = Object.keys(countedData)
        .reduce((str, item, index) => `${str}${index === 0 ? '' : ', '}${TITLES[typesData[item]]} - ${Object.values(countedData)[index]}`, '');

      setSubCategoryCounter(str.toLowerCase());
    } else {
      setSubCategoryCounter('');
    }
  }

  const setSubCategories = ({type, data}: TCategoryData) => {
    setSortedParams(data);
    setCategoryList(type ? subCategories[type] : null);
  }

  useEffect(() => {
    countSubCategoryItems();
  }, [
    sortedParams,
    categoryList
  ]);

  return {
    subCategoryCounter,
    setSubCategories
  }
}

export default useCategoryCounter;
