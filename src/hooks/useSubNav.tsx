import { useEffect, useState } from 'react';
import { fetchArray, sortArray } from '../utils';
import { NAME_KEY, DEPT_KEY } from '../utils/constants';

import type { TCustomData, TSubMenuData } from '../types';

interface ISubNav {
  categoryIds: number[];
  currCategory: number | null;
  categoryData: TCustomData<string | number>[];
  setSubNav: (parentId: number) => void;
}

const useSubNav = (arr: TCustomData<string | number>[]): ISubNav => {
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [currCategory, setCurrCategory] = useState<number | null>(null);
  const [categoryData, setCategoryData] = useState<TCustomData<string | number>[]>([]);

  const handleCategoryIds = (): void => {
    const fetchedArr: number[] = fetchArray(arr, DEPT_KEY).map(({ dept }) => dept as number);

    setCategoryIds(fetchedArr);
  }

  const setSubNav = (parentId: number): void => {
    setCurrCategory(parentId === currCategory ? null : parentId);
    setCategoryData(
      parentId === currCategory
        ? []
        : sortArray(arr.filter(({ dept }) => dept === parentId), NAME_KEY)
    );
  };

  useEffect(() => {
    handleCategoryIds();
  }, [
    arr
  ]);

  return {
    categoryIds,
    currCategory,
    categoryData,
    setSubNav
  }
}

export default useSubNav;
