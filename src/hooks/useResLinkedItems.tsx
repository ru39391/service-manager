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
} from '../utils/constants';

import { useSelector } from '../services/hooks';

import type {
  TCustomData,
  TItemData,
  TItemsArr,
  TPricelistData
} from '../types';

import { getMatchedItems } from '../utils';

type TLinkedData = {
  [ID_KEY]: number;
  [NAME_KEY]: string;
};

type TLinkedItemData = {
  [DEPT_KEY]: number;
  [SUBDEPT_KEY]: number;
};

type TLinkedItem = TLinkedData & TLinkedItemData & {
  [PRICE_KEY]: number;
  [GROUP_KEY]: number;
};

type TLinkedGroup = TLinkedData & TLinkedItemData & {
  pricelist: TLinkedItem[];
};

type TLinkedSubdept = TLinkedData & {
  [DEPT_KEY]: number;
  groups: TLinkedGroup[];
  pricelist: TLinkedItem[];
};

type TLinkedDept = TLinkedData & {
  subdepts: TLinkedSubdept[];
};

interface IResLinkedItems {
  resLinkedItems: TLinkedDept[];
  renderLinkedItems: (payload: TPricelistData, config: TCustomData<boolean> | null) => void;
}

const useResLinkedItems = (): IResLinkedItems => {
  const [resLinkedItems, setResLinkedItems] = useState<TLinkedDept[]>([]);

  const pricelist: TCustomData<TItemsArr>  = useSelector(
    ({ pricelist }) => Object.values(TYPES).reduce((acc, key) => ({ ...acc, [key]: pricelist[key] }), {}
  ));

  const renderLinkedItems = (
    payload: TPricelistData,
    config: TCustomData<boolean> | null
  ) => {
    const updatItemsArr = (arr: TItemsArr): TLinkedItem[] => arr.map((item: TItemData) => ({
      [ID_KEY]: item[ID_KEY] as number,
      [NAME_KEY]: item[NAME_KEY] as string,
      [PRICE_KEY]: item[PRICE_KEY] as number,
      [DEPT_KEY]: item[DEPT_KEY] as number,
      [SUBDEPT_KEY]: item[SUBDEPT_KEY] as number,
      [GROUP_KEY]: item[GROUP_KEY] as number
    }));

    // TODO: настроить выборку, если группы проигнорированы
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

    const groups: TLinkedGroup[] = payload[TYPES[GROUP_KEY]].map(item => ({
      [ID_KEY]: item[ID_KEY] as number,
      [NAME_KEY]: item[NAME_KEY] as string,
      [DEPT_KEY]: item[DEPT_KEY] as number,
      [SUBDEPT_KEY]: item[SUBDEPT_KEY] as number,
      pricelist: groupedItems.filter(data => data[GROUP_KEY] === item[ID_KEY])
    }));

    const subdepts: TLinkedSubdept[] = payload[TYPES[SUBDEPT_KEY]].map(item => ({
      [ID_KEY]: item[ID_KEY] as number,
      [NAME_KEY]: item[NAME_KEY] as string,
      [DEPT_KEY]: item[DEPT_KEY] as number,
      groups: groups.filter(data => data[SUBDEPT_KEY] === item[ID_KEY]),
      pricelist: items.filter(data => data[SUBDEPT_KEY] === item[ID_KEY] && data[GROUP_KEY] === 0)
    }));

    const depts: TLinkedDept[] = payload[TYPES[DEPT_KEY]].map(item => ({
      [ID_KEY]: item[ID_KEY] as number,
      [NAME_KEY]: item[NAME_KEY] as string,
      subdepts: subdepts.filter(data => data[DEPT_KEY] === item[ID_KEY])
    }));

    console.log(depts);
    console.log({ config });
    setResLinkedItems(depts);
  };

  return {
    resLinkedItems,
    renderLinkedItems
  }
}

export default useResLinkedItems;
