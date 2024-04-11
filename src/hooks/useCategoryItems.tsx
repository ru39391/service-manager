import { useState, useEffect } from 'react';
import useUrlHandler from './useUrlHandler';

import type { TCustomData } from '../types';

import {
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  ITEM_KEY,
  TITLES,
  TYPES
} from '../utils/constants';

interface ICategoryItems {
  currSubCategory: string;
  subCategoryItems: TCustomData<string>[];
  categoryTypes: TCustomData<string> | null;
  categoryParams: TCustomData<number | null> | null;
  setCurrSubCategory: (value: string) => void
}

/**
 * Формирование списка переключателей подкатегорий
 * @returns {object} данные текущей подкатегории
 * @property {string} currSubCategory - текущая подкатегория ('depts' | 'subdepts' | 'groups' | 'pricelist') - для передачи в обработчик, по умолчанию 'pricelist'
 * @property {object[]} subCategoryItems - массив объектов с наименованиями подкатегорий [{ subdepts: 'Специализации'}, { pricelist: 'Услуги'}] - для формирования выпадающего списка
 * @property {object|null} categoryTypes - объект с наименованиями категорий { dept: 'Отделения', subdept: 'Специализации', ... } - для формирования заголовков модальных окон
 * @property {object|null} categoryParams - объект идентификаторов категорий вида { dept: 4 } - для формирования таблицы с данными
 * @property {function} setCurrSubCategory - метод установки текущей подкатегории, изменяет состояние currSubCategory при изменении значения выпадающего списка
 */
const useCategoryItems = (): ICategoryItems => {
  const [currSubCategory, setCurrSubCategory] = useState<string>(TYPES[ITEM_KEY]);
  const [categoryTypes, setCategoryTypes] = useState<TCustomData<string> | null>(null);
  const [categoryParams, setCategoryParams] = useState<TCustomData<number | null> | null>(null);
  const [subCategoryItems, setSubCategoryItems] = useState<TCustomData<string>[]>([]);

  const { currUrlData } = useUrlHandler();
  const categoryData = {
    [TYPES[DEPT_KEY]]: [TYPES[SUBDEPT_KEY], TYPES[GROUP_KEY], TYPES[ITEM_KEY]],
    [TYPES[SUBDEPT_KEY]]: [TYPES[GROUP_KEY], TYPES[ITEM_KEY]],
    [TYPES[GROUP_KEY]]: [TYPES[GROUP_KEY], TYPES[ITEM_KEY]],
  };
  const keysData: TCustomData<string> =
    Object.values(TYPES).reduce(
      (acc, key, index) => ({
        ...acc,
        [key]: Object.keys(TYPES)[index]
      }), {}
    );

  const handleCategoryItems = () => {
    const { type, id } = currUrlData;
    const subCategoryArr = type ? categoryData[type] : [TYPES[ITEM_KEY]];
    const subCategoryTypes =
      Object.values(keysData).reduce(
        (acc: TCustomData<string>, item: string) => ({
          ...acc,
          [TYPES[item]]: TITLES[item]
        }), {}
      );
    const subCategoryData = subCategoryArr.map((item) => ({ [item]: Object.values(TITLES)[Object.values(TYPES).indexOf(item)] }));

    setCategoryTypes(subCategoryTypes);
    setSubCategoryItems(subCategoryData);
    setCategoryParams(type ? { [keysData[type]]: id || null } : null);
  }

  useEffect(() => {
    handleCategoryItems();
    setCurrSubCategory(TYPES[ITEM_KEY]);
  }, [
    currUrlData
  ]);

  return {
    currSubCategory,
    subCategoryItems,
    categoryTypes,
    categoryParams,
    setCurrSubCategory,
  }
}

export default useCategoryItems;
