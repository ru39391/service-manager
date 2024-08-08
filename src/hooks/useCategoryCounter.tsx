import { useState, useEffect } from 'react';

import { useSelector } from '../services/hooks';

import type { TCustomData, TItemData } from '../types';

import {
  ID_KEY,
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
  const [sortedParams, setSortedParams] = useState<TItemData | null>(null);

  const pricelist = useSelector(state => state.pricelist);

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

    return arr.filter((data: TItemData) => data[sortedParams.type] === sortedParams[ID_KEY]);
  }

  const countSubCategoryItems = () => {
    const typesData: TCustomData<string> = Object.values(TYPES).reduce((acc, item, index) => ({ ...acc, [item]: Object.keys(TYPES)[index] }), {})

    if(categoryList && categoryList.length) {
      const countedData: TCustomData<number> = categoryList.reduce((acc, item) => (
        {
          ...acc,
          [item]: filterData(pricelist[item]).length
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
    setSortedParams(type && data
      ? {
        type:  Object.values(TYPES).reduce((acc, item, index) => ({...acc, [item]: Object.keys(TYPES)[index]}), {})[type],
        [ID_KEY]: data && data[ID_KEY]
      }
      : null
    );
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
