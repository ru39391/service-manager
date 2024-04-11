import { useState, useEffect } from 'react';
import { useSelector } from '../services/hooks';

import useForm from './useForm';
import useUrlHandler from './useUrlHandler';

import type { TCustomData, TItemData } from '../types';

import {
  ID_KEY,
  NAME_KEY,
  TYPES,
  TITLES
} from '../utils/constants';

interface ICurrentData {
  pageTitle: string;
  currentItem: TItemData;
  currentData: TCustomData<string | number | null | TItemData>;
  handleSubCategory: (value: string | null) => void;
}

const useCurrentData = (): ICurrentData => {
  const [pageTitle, setPageTitle] = useState<string>('');
  const [currentItem, setCurrentItem] = useState<TItemData>({});
  const [currentData, setCurrentData] = useState<TCustomData<string | number | null | TItemData>>({});
  const [currSubcategory, setCurrSubcategory] = useState<string | null>(null);

  const pricelist = useSelector(state => state.pricelist);
  const { currUrlData } = useUrlHandler();
  const { formFields, selecterFields } = useForm();

  const handleSubCategory = (value: string | null): void => {
    setCurrSubcategory(value);
  }

  const handleItemData = (): void => {
    const { type, id } = currUrlData;
    const isItemExist = id !== null && Boolean(type) && Boolean(pricelist[type].length);
    // const key - для получения ключа объекта item по type
    const itemData: TItemData = isItemExist ? pricelist[type].find((item: TItemData) => item[ID_KEY] === id) : {};
    // pricelist[currSubcategory || type].find((item: TItemData) => currSubcategory ? item[key] === id : item[ID_KEY] === id)

    console.log('type: ', type);
    console.log('currSubcategory: ', currSubcategory);
    setPageTitle(isItemExist ? itemData[NAME_KEY] as string : '');
    setCurrentData({
      ...currUrlData,
      caption: Object.values(TITLES)[Object.values(TYPES).indexOf(type)],
      values: isItemExist
        ? {
          ...formFields[type].reduce((acc, item) => ({ ...acc, [item]: '' }), {}),
          ...selecterFields[type].reduce((acc, item) => ({ ...acc, [item]: itemData[item] }), {})
        }
        : {}
    });
    setCurrentItem(itemData);
  };

  useEffect(() => {
    handleItemData();
  }, [
    //currSubcategory,
    currUrlData,
    pricelist
  ]);

  return {
    pageTitle,
    currentItem,
    currentData,
    handleSubCategory
  }
}

export default useCurrentData;
