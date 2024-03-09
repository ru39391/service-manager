import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useSelector } from '../services/hooks';

import type { TCustomData } from '../types';

import { NAME_KEY, TYPES, TITLES } from '../utils/constants';

interface IHeader {
  pageTitle: string;
  categoryData: TCustomData<string>;
  handlePageTitle: () => void;
}

const useHeader = (): IHeader => {
  const [pageTitle, setPageTitle] = useState<string>('');
  const [categoryData, setCategoryData] = useState<TCustomData<string>>({});

  const { pathname } = useLocation();
  const pricelist = useSelector(state => state.pricelist);

  const handlePageTitle = (): void => {
    const urlArr = pathname.split('/');
    const type = urlArr[1];
    const id = urlArr[urlArr.length - 1] === type
      ? null
      : Number(urlArr[urlArr.length - 1]);
    const category = Object.values(TITLES)[Object.values(TYPES).indexOf(type)];
    const pagetitle = id !== null && pricelist[type].length
      ? pricelist[type].find(({ item_id }) => item_id === id)[NAME_KEY]
      : '';

    setPageTitle(pagetitle);
    setCategoryData({
      category,
      alias: type
    });
  }

  useEffect(() => {
    handlePageTitle();
  }, [
    pathname,
    pricelist
  ]);

  return {
    pageTitle,
    categoryData,
    handlePageTitle
  }
}

export default useHeader;
