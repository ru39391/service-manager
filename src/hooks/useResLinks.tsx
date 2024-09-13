import { useState, useEffect } from 'react';

import {
  ID_KEY,
  NAME_KEY,
  IS_VISIBLE_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  ITEM_KEY,
  TYPES,
} from '../utils/constants';

import { useSelector } from '../services/hooks';

import type { TCustomData, TItemsArr, TItemData } from '../types';

import { sortStrArray, fetchArray } from '../utils';

interface IResLinks {
  linkedDeptItems: TItemsArr,
  linkedSubdeptItems: TItemsArr,
  linkedGroupItems: TItemsArr,
  linkedPricelistItems: TItemsArr,

  currLinkedDepts: TItemsArr,
  currLinkedSubdepts: TItemsArr,
  currLinkedGroups: TItemsArr,
  currLinkedPricelist: TItemsArr,

  resLinkHandlers: TCustomData<(data: TItemData) => void>,
  isLinkedItemActive: (arr: TItemsArr, data: TItemData) => boolean,
}

// TODO: не использовать ли useCallback
const useResLinks = (): IResLinks => {
  const [linkedDeptItems, setLinkedDeptItems] = useState<TItemsArr>([]);
  const [linkedSubdeptItems, setLinkedSubdeptItems] = useState<TItemsArr>([]);
  const [linkedGroupItems, setLinkedGroupItems] = useState<TItemsArr>([]);
  const [linkedPricelistItems, setLinkedPricelistItems] = useState<TItemsArr>([]);

  const [currLinkedDepts, setCurrLinkedDepts] = useState<TItemsArr>([]);
  const [currLinkedSubdepts, setCurrLinkedSubdepts] = useState<TItemsArr>([]);
  const [currLinkedGroups, setCurrLinkedGroups] = useState<TItemsArr>([]);
  const [currLinkedPricelist, setCurrLinkedPricelist] = useState<TItemsArr>([]);

  const { depts, subdepts, groups, pricelist } = useSelector(state => state.pricelist);

  const isLinkedItemActive = (arr: TItemsArr, data: TItemData): boolean => arr.indexOf(data) >= 0;

  const handleLinkedItems = (arr: TItemsArr, data: TItemData): TItemsArr => isLinkedItemActive(arr, data)
    ? [...arr].filter(item => item !== data)
    : [...arr, data];

  /*
  const filterItems = (
    { arr, items, type }: { arr: TItemsArr; items: TItemsArr; type: string; }
  ): TItemsArr => sortStrArray(items.filter(item => arr.map(data => data[ID_KEY]).includes(item[type])), NAME_KEY);
  */
  const filterItems = (
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

    setLinkedPricelistItems(currItems);
    setLinkedGroupItems(groupsList);
    setLinkedSubdeptItems(subdeptsList);
    // return subdeptsList;
  };

  const resLinkHandlers= {
    [TYPES[DEPT_KEY]]: (data: TItemData) => setCurrLinkedDepts(handleLinkedItems(currLinkedDepts, data)),
    [TYPES[SUBDEPT_KEY]]: (data: TItemData) => setCurrLinkedSubdepts(handleLinkedItems(currLinkedSubdepts, data)),
    [TYPES[GROUP_KEY]]: (data: TItemData) => setCurrLinkedGroups(handleLinkedItems(currLinkedGroups, data)),
    [TYPES[ITEM_KEY]]: (data: TItemData) => setCurrLinkedPricelist(handleLinkedItems(currLinkedPricelist, data)),
  };

  /*
  useEffect(() => {
    setLinkedGroupItems(
      filterItems({
        arr: linkedSubdeptItems,
        items: groups,
        type: SUBDEPT_KEY
      })
    );
    setLinkedPricelistItems(
      filterItems({
        arr: linkedSubdeptItems,
        items: pricelist,
        type: SUBDEPT_KEY
      })
    );
  }, [
    linkedSubdeptItems
  ]);
  */

  useEffect(() => {
    /*
    setLinkedSubdeptItems(
      filterItems({
        arr: currLinkedDepts,
        //items: subdepts,
        type: DEPT_KEY
      })
    );
    */
    filterItems({
      arr: currLinkedDepts,
      //items: subdepts,
      type: DEPT_KEY
    });
  }, [
    currLinkedDepts
  ]);

  useEffect(() => {
    setLinkedDeptItems(depts);
  }, [
    depts
  ]);

  return {
    linkedDeptItems,
    linkedSubdeptItems,
    linkedGroupItems,
    linkedPricelistItems,

    currLinkedDepts,
    currLinkedSubdepts,
    currLinkedGroups,
    currLinkedPricelist,

    resLinkHandlers,
    isLinkedItemActive
  }
}

export default useResLinks;
