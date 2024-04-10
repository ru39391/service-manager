import { useState, useEffect } from 'react';
import { useSelector } from '../services/hooks';

import useForm from './useForm';
import useUrlHandler from './useUrlHandler';

import type { TCustomData, TItemData } from '../types';

import {
  ID_KEY,
  NAME_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  ITEM_KEY,
  TYPES,
  TITLES
} from '../utils/constants';

interface IHeader {
  pageTitle: string;
  currentItem: TItemData;
  categoryData: TCustomData<string | number | null | TItemData>;
  handlePageTitle: () => void;
}

const useHeader = (): IHeader => {
  const [pageTitle, setPageTitle] = useState<string>('');
  const [currentItem, setCurrentItem] = useState<TItemData>({});
  const [categoryData, setCategoryData] = useState<TCustomData<string | number | null | TItemData>>({});

  const pricelist = useSelector(state => state.pricelist);
  const { currUrlData } = useUrlHandler();
  const { formFields, selecterFields } = useForm();

  const handlePageTitle = (): void => {
    const { type, id } = currUrlData;
    const isCategory = id !== null && Boolean(type) && Boolean(pricelist[type].length);
    const itemData: TItemData = isCategory ? pricelist[type].find((item: TItemData) => item[ID_KEY] === id) : {};

    setPageTitle(isCategory ? itemData[NAME_KEY] as string : '');
    setCategoryData({
      ...currUrlData,
      caption: Object.values(TITLES)[Object.values(TYPES).indexOf(type)],
      category: isCategory
        ? {
          ...formFields[type].reduce((acc, item) => ({ ...acc, [item]: '' }), {}),
          ...selecterFields[type].reduce((acc, item) => ({ ...acc, [item]: itemData[item] }), {})
        }
        : {}
    });
    setCurrentItem(itemData);
  };

  useEffect(() => {
    handlePageTitle();
  }, [
    currUrlData,
    pricelist
  ]);

  return {
    pageTitle,
    currentItem,
    categoryData,
    handlePageTitle
  }
}

export default useHeader;
