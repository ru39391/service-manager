import { useState } from 'react';

import {
  ID_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  ITEM_KEY,
  TYPES,
  NAME_KEY,
  PRICE_KEY,
  RES_KEY,
  IS_GROUP_IGNORED_KEY,
  IS_GROUP_USED_KEY,
  IS_COMPLEX_DATA_KEY
} from '../utils/constants';

import { useSelector } from '../services/hooks';

import type {
  TCustomData,
  TItemData,
  TItemsArr,
  TPricelistData,
  TLinkedDept,
  TLinkedSubdept,
  TLinkedGroup,
  TLinkedItem
} from '../types';

import { fetchArray, getMatchedItems } from '../utils';

type TResLinkedData = {
  [RES_KEY]: number;
  arr: TLinkedSubdept[];
  config: TCustomData<boolean> | null;
}

interface IResLinkedItems {
  resLinkedItems: TLinkedDept[];
  isLinkedListExist: boolean;
  renderLinkedItems: (payload: TPricelistData, config: TCustomData<boolean> | null) => void;
  updateLinkedItems: (data: TResLinkedData) => void;
  resetLinkedItems: () => void;
}

const useResLinkedItems = (): IResLinkedItems => {
  const [resLinkedItems, setResLinkedItems] = useState<TLinkedDept[]>([]);
  const [isLinkedListExist, setisLinkedListExist] = useState<boolean>(false);

  const pricelist: TCustomData<TItemsArr>  = useSelector(
    ({ pricelist }) => Object.values(TYPES).reduce((acc, key) => ({ ...acc, [key]: pricelist[key] }), {}
  ));

  const renderLinkedItems = (
    payload: TPricelistData,
    config: TCustomData<boolean> | null
  ) => {
    // console.log(payload);
    const updatItemsArr = (arr: TItemsArr): TLinkedItem[] => arr.map((item: TItemData) => ({
      [ID_KEY]: item[ID_KEY] as number,
      [NAME_KEY]: item[NAME_KEY] as string,
      [PRICE_KEY]: item[PRICE_KEY] as number,
      [DEPT_KEY]: item[DEPT_KEY] as number,
      [SUBDEPT_KEY]: item[SUBDEPT_KEY] as number,
      [GROUP_KEY]: item[GROUP_KEY] as number
    }));

    const updatGroupsArr = (arr: TItemsArr, items: TLinkedItem[]): TLinkedGroup[] => arr.map((item: TItemData) => ({
      [ID_KEY]: item[ID_KEY] as number,
      [NAME_KEY]: item[NAME_KEY] as string,
      [DEPT_KEY]: item[DEPT_KEY] as number,
      [SUBDEPT_KEY]: item[SUBDEPT_KEY] as number,
      pricelist: items.filter(data => data[GROUP_KEY] === item[ID_KEY])
    }));

    const params = config
      ? {
        [IS_GROUP_IGNORED_KEY]: Boolean(config[IS_GROUP_IGNORED_KEY]),
        [IS_GROUP_USED_KEY]: Boolean(config[IS_GROUP_USED_KEY])
      }
      : {
        [IS_GROUP_IGNORED_KEY]: false,
        [IS_GROUP_USED_KEY]: false
      };

    const groupedItems = updatItemsArr(
      getMatchedItems(
        payload[TYPES[GROUP_KEY]],
        pricelist[TYPES[ITEM_KEY]],
        GROUP_KEY
      )
    );

    const items = updatItemsArr(
      getMatchedItems(
        payload[TYPES[SUBDEPT_KEY]],
        payload[TYPES[ITEM_KEY]],
        SUBDEPT_KEY
      )
    );

    const groups: TLinkedGroup[] = params[IS_GROUP_USED_KEY]
      ? updatGroupsArr(
          pricelist[TYPES[GROUP_KEY]].filter(
            item => fetchArray(payload[TYPES[ITEM_KEY]], GROUP_KEY).map(data => data[GROUP_KEY]).includes(item[ID_KEY])
          ),
          items
        )
      : updatGroupsArr(payload[TYPES[GROUP_KEY]], groupedItems)

    const subdepts: TLinkedSubdept[] = payload[TYPES[SUBDEPT_KEY]].map(item => ({
      [ID_KEY]: item[ID_KEY] as number,
      [NAME_KEY]: item[NAME_KEY] as string,
      [DEPT_KEY]: item[DEPT_KEY] as number,
      groups: groups.filter(data => data[SUBDEPT_KEY] === item[ID_KEY]),
      pricelist: params[IS_GROUP_USED_KEY]
        ? items.filter(data => data[SUBDEPT_KEY] === item[ID_KEY] && data[GROUP_KEY] === 0)
        : items.filter(
            data => params[IS_GROUP_IGNORED_KEY] ? data[SUBDEPT_KEY] === item[ID_KEY] : data[SUBDEPT_KEY] === item[ID_KEY] && data[GROUP_KEY] === 0
          )
    }));

    const depts: TLinkedDept[] = payload[TYPES[DEPT_KEY]].map(item => ({
      [ID_KEY]: item[ID_KEY] as number,
      [NAME_KEY]: item[NAME_KEY] as string,
      subdepts: subdepts.filter(data => data[DEPT_KEY] === item[ID_KEY])
    }));

    // console.log({ config, depts });
    setResLinkedItems(depts);
    setisLinkedListExist([...groupedItems, ...items].length > 0);
  };

  const updateLinkedItems = (payload: TResLinkedData) => {
    const { arr, config } = payload;
    const data = {
      [TYPES[GROUP_KEY]]: arr.reduce(
        (acc: TLinkedGroup[], item) => [
          ...acc,
          ...item[TYPES[GROUP_KEY]].filter((group: TLinkedGroup) => group[TYPES[ITEM_KEY]].length > 0)
        ], []
      ),
      [TYPES[ITEM_KEY]]: arr.reduce((acc: TLinkedItem[], item) => [...acc, ...item[TYPES[ITEM_KEY]]], [])
    };
    const params = config === null
      ? {
        [IS_COMPLEX_DATA_KEY]: false,
        [IS_GROUP_IGNORED_KEY]: false,
        [IS_GROUP_USED_KEY]: false,
      }
      : {
        [IS_COMPLEX_DATA_KEY]: Boolean(config[IS_COMPLEX_DATA_KEY]),
        [IS_GROUP_IGNORED_KEY]: Boolean(config[IS_GROUP_IGNORED_KEY]),
        [IS_GROUP_USED_KEY]: Boolean(config[IS_GROUP_USED_KEY]),
      };

    const handleLinkedItems = (arr: TLinkedItem[] | TLinkedGroup[] | TLinkedSubdept[] | TItemsArr) => JSON.stringify(arr.map(item => item[ID_KEY]));

    console.log({
      [RES_KEY]: payload[RES_KEY],
      [TYPES[DEPT_KEY]]: handleLinkedItems(
        fetchArray(
          arr.map(item => ({ [ID_KEY]: item[DEPT_KEY] })),
          ID_KEY
        )
      ),
      [TYPES[SUBDEPT_KEY]]: handleLinkedItems(arr),
      [TYPES[GROUP_KEY]]: handleLinkedItems(data[TYPES[GROUP_KEY]]),
      [TYPES[ITEM_KEY]]: handleLinkedItems(
        [
          ...data[TYPES[ITEM_KEY]],
          ...data[TYPES[GROUP_KEY]].reduce((acc: TLinkedItem[], item) => [...acc, ...item[TYPES[ITEM_KEY]]], [])
        ]
      ),
      config: JSON.stringify(params)
    });
  };

  const resetLinkedItems = () => {
    setResLinkedItems([]);
  };

  return {
    resLinkedItems,
    isLinkedListExist,
    renderLinkedItems,
    updateLinkedItems,
    resetLinkedItems
  }
}

export default useResLinkedItems;
