import { useState, useEffect } from 'react';

import { useSelector } from '../services/hooks';

import type { TCustomData } from '../types';

import {
  ID_KEY,
  NAME_KEY,
  TYPES,
  TITLES
} from '../utils/constants';

interface ISelecter {
  categoryList: TCustomData<string | number | null>[];
}

const useSelecter = (data: TCustomData<string | number>): ISelecter => {
  const [categoryList, setCategoryList] = useState<TCustomData<string | number | null>[]>([]);

  const pricelist = useSelector(state => state.pricelist);

  const handleCategoryList = () => {
    const { key, value, category } = data;
    const arr = key === category
      ? pricelist[TYPES[category]]
      : pricelist[TYPES[category]].filter((item: TCustomData<string | number | null>) => item[key] === value);

    setCategoryList(arr);
  }

  useEffect(() => {
    handleCategoryList();
  }, []);

  return {
    categoryList
  };
}

export default useSelecter;
