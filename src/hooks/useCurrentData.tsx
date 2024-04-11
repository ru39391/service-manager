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
  currentCategory: TItemData;
  currentFormData: TCustomData<string | number | null | TItemData>;
  setCategoryType: (value: string | null) => void;
}

const useCurrentData = (): ICurrentData => {
  const [pageTitle, setPageTitle] = useState<string>('');
  const [currentCategory, setCurrentCategory] = useState<TItemData>({});
  const [currentFormData, setCurrentFormData] = useState<TCustomData<string | number | null | TItemData>>({});
  const [currCategoryType, setCategoryType] = useState<string | null>(null);

  const pricelist = useSelector(state => state.pricelist);
  const { currUrlData } = useUrlHandler();
  const { formFields, selecterFields } = useForm();

  const handleItemData = (): void => {
    const { type, id } = currUrlData;
    const isItemExist = id !== null && Boolean(type) && Boolean(pricelist[type].length);
    // const key - для получения ключа объекта item по type
    const itemData: TItemData = isItemExist ? pricelist[type].find((item: TItemData) => item[ID_KEY] === id) : {};
    // pricelist[currSubCategory || type].find((item: TItemData) => currSubCategory ? item[key] === id : item[ID_KEY] === id)

    console.log('type: ', type);
    console.log('currCategoryType: ', currCategoryType);
    setPageTitle(isItemExist ? itemData[NAME_KEY] as string : '');
    setCurrentFormData({
      ...currUrlData,
      caption: Object.values(TITLES)[Object.values(TYPES).indexOf(type)],
      values: isItemExist
        ? {
          ...formFields[currCategoryType || type].reduce((acc, item) => ({ ...acc, [item]: '' }), {}),
          ...selecterFields[currCategoryType || type].reduce((acc, item) => ({ ...acc, [item]: TYPES[item] === type ? id : itemData[item] }), {})
        }
        : {}
    });
    setCurrentCategory(itemData);
  };

  useEffect(() => {
    handleItemData();
  }, [
    currCategoryType,
    currUrlData,
    pricelist
  ]);

  return {
    pageTitle,
    currentCategory,
    currentFormData,
    setCategoryType
  }
}

export default useCurrentData;
