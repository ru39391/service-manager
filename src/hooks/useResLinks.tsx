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

interface IResLinks {
  existableDepts: TItemsArr,
  existableSubdepts: TItemsArr,
  existableGroups: TItemsArr,
  existableItems: TItemsArr,

  linkedDepts: TItemsArr,
  linkedSubdepts: TItemsArr,
  linkedGroups: TItemsArr,
  linkedItems: TItemsArr,

  resLinkHandlers: TCustomData<(data: TItemData) => void>,
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

  const pricelist: TCustomData<TItemsArr>  = useSelector(({ pricelist }) => ({
    [TYPES[DEPT_KEY]]: pricelist[TYPES[DEPT_KEY]],
    [TYPES[SUBDEPT_KEY]]: pricelist[TYPES[SUBDEPT_KEY]],
    [TYPES[GROUP_KEY]]: pricelist[TYPES[GROUP_KEY]],
    [TYPES[ITEM_KEY]]: pricelist[TYPES[ITEM_KEY]]
  }));

  const isLinkedItemActive = (arr: TItemsArr, data: TItemData): boolean => arr.indexOf(data) >= 0;

  const handleLinkedItems = (arr: TItemsArr, data: TItemData): TItemsArr => isLinkedItemActive(arr, data)
    ? [...arr].filter(item => item !== data)
    : [...arr, data];

  /*
  const filterItems = (
    { arr, items, type }: { arr: TItemsArr; items: TItemsArr; type: string; }
  ): TItemsArr => sortStrArray(items.filter(item => arr.map(data => data[ID_KEY]).includes(item[type])), NAME_KEY);
  */
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

  const resLinkHandlers = {
    [TYPES[DEPT_KEY]]: (data: TItemData) => setLinkedDepts(handleLinkedItems(linkedDepts, data)),
    [TYPES[SUBDEPT_KEY]]: (data: TItemData) => setLinkedSubdepts(handleLinkedItems(linkedSubdepts, data)),
    [TYPES[GROUP_KEY]]: (data: TItemData) => setLinkedGroups(handleLinkedItems(linkedGroups, data)),
    [TYPES[ITEM_KEY]]: (data: TItemData) => setLinkedItems(handleLinkedItems(linkedItems, data)),
  };

  const filterItems = (
    arr: TItemsArr,
    categoryKey: string,
    currentKey: string,
    extendedKey: string = ''
  ): TItemsArr => {
    const subCategoryItems: TItemsArr = sortStrArray(
      pricelist[TYPES[currentKey]].filter(item => arr.map(data => data[ID_KEY]).includes(item[categoryKey])),
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

    //const items =

    return sortStrArray(
      extendedKey
        ? subCategoryItems.filter(item => item[extendedKey] === 0)
        : subCategoryItems,
      CATEGORY_KEY
    );
  }

  // init(depts, DEPT_KEY, SUBDEPT_KEY);
  // init(subdepts, SUBDEPT_KEY, GROUP_KEY);
  // init(subdepts, SUBDEPT_KEY, ITEM_KEY, GROUP_KEY);
  // init(groups, GROUP_KEY, ITEM_KEY);

  useEffect(() => {
    setExistableGroups(
      filterItems(linkedDepts, SUBDEPT_KEY, GROUP_KEY)
    );
    setExistableItems(
      filterItems(linkedDepts, SUBDEPT_KEY, ITEM_KEY, GROUP_KEY)
    );
  }, [
    linkedDepts
  ]);

  useEffect(() => {
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
