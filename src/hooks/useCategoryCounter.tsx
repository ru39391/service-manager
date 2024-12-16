import { useState, useEffect } from 'react';

import { useSelector } from '../services/hooks';

import type {
  TCustomData,
  TItemData,
  TPricelistKeys,
  TPricelistTypes
} from '../types';

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
  type: TPricelistTypes | null;
  data: TCustomData<number> | null;
};

type TSortedParams = {
  type: TPricelistKeys;
  [ID_KEY]: number;
};

interface ICategoryCounter {
  subCategoryCounter: string;
  setSubCategories: ({type, data}: TCategoryData) => void;
}

const useCategoryCounter = (): ICategoryCounter => {
  const [categoryList, setCategoryList] = useState<TPricelistTypes[] | null>(null);
  const [subCategoryCounter, setSubCategoryCounter] = useState<string>('');
  const [sortedParams, setSortedParams] = useState<TSortedParams | null>(null);

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
    const typesData = Object.values(TYPES).reduce(
      (acc, type, index) => ({ ...acc, [type]: Object.keys(TYPES)[index] }), {} as Record<TPricelistTypes, TPricelistKeys>
    );

    if(categoryList && categoryList.length) {
      const countedData = categoryList.reduce((acc, item) => (
        {
          ...acc,
          [item]: filterData(pricelist[item]).length
        }
      ), {} as Record<TPricelistTypes, number>);
      const str = Object.keys(countedData)
        .reduce(
          (str, item, index) => `${str}${index === 0 ? '' : ', '}${TITLES[typesData[item as TPricelistTypes]]} - ${Object.values(countedData)[index]}`.toString(), ''
        );

      setSubCategoryCounter(str.toLowerCase());
    } else {
      setSubCategoryCounter('');
    }
  }

  const setSubCategories = ({type, data}: TCategoryData) => {
    setSortedParams(type && data
      ? {
        type:  Object.values(TYPES).reduce(
          (acc, item, index) => ({...acc, [item]: Object.keys(TYPES)[index]}), {} as Record<TPricelistTypes, TPricelistKeys>
        )[type],
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
