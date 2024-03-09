import { useState } from 'react';
import { sortArray } from '../utils';
import { NAME_KEY } from '../utils/constants';

import type { TCustomData, TSubMenuData } from '../types';

interface ISubNav {
  currCategory: number | null;
  categoryData: TCustomData<string | number>[];
  setSubNav: (data: TSubMenuData) => void;
}

const useSubNav = (arr: TCustomData<string | number>[]): ISubNav => {
  const [currCategory, setCurrCategory] = useState<number | null>(null);
  const [categoryData, setCategoryData] = useState<TCustomData<string | number>[]>([]);

  const setSubNav = ({ parentId, childrenIds }: TSubMenuData): void => {
    setCurrCategory(parentId === currCategory ? null : parentId);
    setCategoryData(
      parentId === currCategory
        ? []
        : sortArray(arr.reduce((acc: TCustomData<string | number>[], { item_id, name }: TCustomData<string | number>) =>
          childrenIds.includes(item_id as number)
            ? [...acc, { item_id, name } ]
            : acc,
          []
        ), NAME_KEY)
    );
  };

  return {
    currCategory,
    categoryData,
    setSubNav
  }
}

export default useSubNav;
