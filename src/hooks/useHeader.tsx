import { useState, useEffect } from 'react';
import { useSelector } from '../services/hooks';
import useUrlHandler from './useUrlHandler';

import type { TItemData } from '../types';

import { NAME_KEY, TYPES, TITLES } from '../utils/constants';

interface IHeader {
  pageTitle: string;
  categoryData: TItemData;
  handlePageTitle: () => void;
}

const useHeader = (): IHeader => {
  const [pageTitle, setPageTitle] = useState<string>('');
  const [categoryData, setCategoryData] = useState<TItemData>({});

  const pricelist = useSelector(state => state.pricelist);
  const { currUrlData } = useUrlHandler();

  const handlePageTitle = (): void => {
    const { type, id } = currUrlData;
    const category = Object.values(TITLES)[Object.values(TYPES).indexOf(type)];
    const key: string = Object.values(TYPES).reduce((acc, item, index) => ({ ...acc, [item]: Object.keys(TYPES)[index] }), {})[type];
    const pagetitle = id !== null && Boolean(type) && pricelist[type].length
      ? pricelist[type].find(({ item_id }) => item_id === id)[NAME_KEY]
      : '';

    setPageTitle(pagetitle);
    setCategoryData({
      category,
      alias: type,
      id,
      key
    });
  };

  useEffect(() => {
    handlePageTitle();
  }, [
    currUrlData,
    pricelist
  ]);

  return {
    pageTitle,
    categoryData,
    handlePageTitle
  }
}

export default useHeader;
