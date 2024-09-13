import { useState, useEffect } from 'react';

import {
  ID_KEY,
  NAME_KEY,
  IS_VISIBLE_KEY,
  CATEGORY_KEY,
  LABEL_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  ITEM_KEY,
  TYPES,
} from '../utils/constants';

import { useSelector } from '../services/hooks';

import type {
  TCustomData,
  TItemsArr,
  TItemData
} from '../types';

import { sortStrArray, fetchArray } from '../utils';

type TLinkedResData = {
  data?: TItemData;
  items?: TItemsArr;
};

interface IResLinks {
  existableDepts: TItemsArr,
  existableSubdepts: TItemsArr,
  existableGroups: TItemsArr,
  existableItems: TItemsArr,

  linkedDepts: TItemsArr,
  linkedSubdepts: TItemsArr,
  linkedGroups: TItemsArr,
  linkedItems: TItemsArr,

  resLinkHandlers: TCustomData<(payload: TLinkedResData) => void>,
  isLinkedItemActive: (arr: TItemsArr, data: TItemData) => boolean,
}

// TODO: не использовать ли useCallback
const useResLinks = (): IResLinks => {
  const [existableDepts, setExistableDepts] = useState<TItemsArr>([]);
  const [existableSubdepts, setExistableSubdepts] = useState<TItemsArr>([]);
  const [existableGroups, setExistableGroups] = useState<TItemsArr>([]);
  const [existableItems, setExistableItems] = useState<TItemsArr>([]);

  const [linkedDepts, setLinkedDepts] = useState<TItemsArr>([]);
  const [linkedSubdepts, setLinkedSubdepts] = useState<TItemsArr>([]);
  const [linkedGroups, setLinkedGroups] = useState<TItemsArr>([]);
  const [linkedItems, setLinkedItems] = useState<TItemsArr>([]);

  const pricelist: TCustomData<TItemsArr>  = useSelector(
    ({ pricelist }) => Object.values(TYPES).reduce((acc, key) => ({ ...acc, [key]: pricelist[key] }), {}
  ));

  /**/
  const isLinkedItemActive = (arr: TItemsArr, data: TItemData): boolean => arr.indexOf(data) >= 0;

  /**/
  const handleLinkedItems = (arr: TItemsArr, { data, items }: TLinkedResData): TItemsArr => {
    if(!data) {
      return items && Array.isArray(items) ? [...items] : [];
    }

    return isLinkedItemActive(arr, data)
      ? [...arr].filter(item => item !== data)
      : [...arr, data];
  };

  /*
  const filterItems = (
    { arr, items, type }: { arr: TItemsArr; items: TItemsArr; type: string; }
  ): TItemsArr => sortStrArray(items.filter(item => arr.map(data => data[ID_KEY]).includes(item[type])), NAME_KEY);
  const filterItemsTest = (
    { arr, type }: { arr: TItemsArr; type: string; }
  ): TItemsArr => {
    const currItems = sortStrArray(
      pricelist.filter(item => arr.map(data => data[ID_KEY]).includes(item[DEPT_KEY])),
      NAME_KEY
    ).filter(
      item => Boolean(item[IS_VISIBLE_KEY])
    );
    const currSubdepts = sortStrArray(
      fetchArray(
        subdepts.filter(item => currItems.map(data => data[SUBDEPT_KEY]).includes(item[ID_KEY])),
        ID_KEY
      ).map(item => ({
        ...item,
        category: arr.find(data => data[ID_KEY] === item[DEPT_KEY])[NAME_KEY]
      })),
      'category'
    );
    const currGroups = sortStrArray(
      fetchArray(groups.filter(item => currItems.map(data => data[GROUP_KEY]).includes(item[ID_KEY])), ID_KEY),
      NAME_KEY
    );

    const groupsList = currGroups.map(data => (
      {
        ...data,
        [TYPES[ITEM_KEY]]: currItems.filter(item => item[GROUP_KEY] === data[ID_KEY])
      }
    ));
    const subdeptsList = currSubdepts.map(data => (
      {
        ...data,
        [TYPES[GROUP_KEY]]: groupsList.filter(item => item[SUBDEPT_KEY] === data[ID_KEY]),
        [TYPES[ITEM_KEY]]: currItems.filter(item => item[GROUP_KEY] === 0 && item[SUBDEPT_KEY] === data[ID_KEY])
      }
    ));

    setLinkedItems(currItems);
    setLinkedGroups(groupsList);
    setLinkedSubdepts(subdeptsList);
    // return subdeptsList;
  };
  */

  const resLinkData = [
    linkedDepts,
    linkedSubdepts,
    linkedGroups,
    linkedItems
  ].reduce((acc, state, index) => ({ ...acc, [Object.keys(TYPES)[index]]: state }), {});

  const resLinkHandlers = [
    (payload: TLinkedResData) => setLinkedDepts(handleLinkedItems(resLinkData[DEPT_KEY], payload)),
    (payload: TLinkedResData) => setLinkedSubdepts(handleLinkedItems(resLinkData[SUBDEPT_KEY], payload)),
    (payload: TLinkedResData) => setLinkedGroups(handleLinkedItems(resLinkData[GROUP_KEY], payload)),
    (payload: TLinkedResData) => setLinkedItems(handleLinkedItems(resLinkData[ITEM_KEY], payload)),
  ].reduce((acc, handler, index) => ({ ...acc, [Object.keys(TYPES)[index]]: handler }), {});

  /**/
  const getMatchedItems = (
    categoryArr: TItemsArr,
    currentArr: TItemsArr,
    key: string
  ): TItemsArr => currentArr.filter(item => categoryArr.map(data => data[ID_KEY]).includes(item[key]));

  /**/
  const filterItems = (
    arr: TItemsArr,
    categoryKey: string,
    currentKey: string,
    extendedKey: string = ''
  ): TItemsArr => {
    if(!arr.length) {
      resLinkHandlers[currentKey]({ items: [] });

      return [];
    }

    const subCategoryItems: TItemsArr = sortStrArray(
      getMatchedItems(arr, pricelist[TYPES[currentKey]], categoryKey),
      NAME_KEY
    ).map(
      (item) => {
        const category = arr.find(data => item[categoryKey] === data[ID_KEY]);

        return {
          ...item,
          [LABEL_KEY]: item[NAME_KEY],
          [CATEGORY_KEY]: category ? category[NAME_KEY] : ''
        };
      }
    );

    resLinkHandlers[currentKey]({
      items: getMatchedItems(arr, resLinkData[currentKey], categoryKey)
    });

    // TODO: настроить исключение из subCategoryItems выбранных позиций
    // subCategoryItems.filter(item => !resLinkData[currentKey].map(data => data[ID_KEY]).includes(item[ID_KEY]))
    // при такой конструкции есть баг при удалении специализации - она возвращается в список
    return sortStrArray(
      extendedKey
        ? subCategoryItems.filter(item => item[extendedKey] === 0)
        : subCategoryItems,
      CATEGORY_KEY
    );
  }

  // filterItems(groups, GROUP_KEY, ITEM_KEY);

  useEffect(() => {
    setExistableGroups(
      filterItems(linkedSubdepts, SUBDEPT_KEY, GROUP_KEY)
    );
    setExistableItems(
      filterItems(linkedSubdepts, SUBDEPT_KEY, ITEM_KEY, GROUP_KEY)
    );
  }, [
    linkedSubdepts
  ]);

  useEffect(() => {
    //console.log('filterItems', filterItems(linkedDepts, SUBDEPT_KEY, GROUP_KEY));
    setExistableSubdepts(
      filterItems(linkedDepts, DEPT_KEY, SUBDEPT_KEY)
    );
  }, [
    linkedDepts
  ]);

  useEffect(() => {
    setExistableDepts(pricelist[TYPES[DEPT_KEY]]);
  }, [
    pricelist[TYPES[DEPT_KEY]]
  ]);

  return {
    existableDepts,
    existableSubdepts,
    existableGroups,
    existableItems,

    linkedDepts,
    linkedSubdepts,
    linkedGroups,
    linkedItems,

    resLinkHandlers,
    isLinkedItemActive
  }
}

export default useResLinks;
