import { useState, useEffect } from 'react';
import { useSelector } from '../services/hooks';

import type {
  TPricelistData,
  TCustomData,
  TItemsArr,
  TItemData
} from '../types';
import type { TPricelistState } from '../services/slices/pricelist-slice';

import {
  CREATED_KEY,
  UPDATED_KEY,
  REMOVED_KEY,
  ADD_ACTION_KEY,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY,
  ID_KEY
} from '../utils/constants';

type TFileHandlerData = {
  keys: string[];
  items: TItemsArr[];
}

interface IDataComparer {
  comparedFileData: TCustomData<TPricelistData> | null;
  compareFileData: (data: TPricelistData | null) => void;
}

const useDataComparer = (): IDataComparer => {
  const [comparedFileData, setComparedFileData] = useState<TCustomData<TPricelistData> | null>(null);

  const pricelist = useSelector(state => state.pricelist);
  const { response } = pricelist;

  const setItemIds = (
    {
      key,
      arr
    }: {
      key: string;
      arr: TItemsArr;
    }
  ): TCustomData<{ ids: number[]; arr: TItemsArr; }> => {
    const currItems: TItemsArr = pricelist[key];
    const ids = arr.map(item => item[ID_KEY] as number);
    const currIds = currItems.map((item: TItemData) => item[ID_KEY] as number);

    return {
      [CREATED_KEY]: {
        ids: currIds,
        arr
      },
      [UPDATED_KEY]: {
        ids: ids.filter(id => currIds.includes(id as number)),
        arr: currItems
      },
      [REMOVED_KEY]: {
        ids,
        arr: currItems
      }
    };
  };

  const handleUpdatedItems = ({
    ids,
    items,
    currItems
  }: {
    ids: number[];
    items: TItemsArr;
    currItems: TItemsArr;
  }) => {
    const fileItems = items.filter(item => ids.includes(item[ID_KEY] as number));

    return fileItems.reduce((acc: TItemsArr, item) => {
      const currItem = currItems.find(data => {
        const {
          itemId,
          currItemId,
        } = {
          itemId: item[ID_KEY] as number,
          currItemId: data[ID_KEY] as number
        };

        return itemId === currItemId;
      });

      const isEqual = currItem
        ? Object.keys(item).every(key => {
          // TODO: вычислять все изменённые параметры
          /*
          if(item[key] !== currItem[key]) {
            console.log({
              [ID_KEY]: item[ID_KEY],
              key,
              item,
              currItem
            });
          }
          */

          return item[key] === currItem[key];
        })
        : true;

      return isEqual
        ? acc
        : [...acc, item];
    }, []);
  };

  const handleItems = (
    {
      key,
      keys,
      items
    }: {
      key: string;
      keys: string[];
      items: TItemsArr[];
    }
  ): TPricelistData => keys.reduce((acc, item, index) => {
    const { ids, arr } = setItemIds({ key: item, arr: items[index] })[key];

    return {
      ...acc,
      [item]: key === UPDATED_KEY
        ? handleUpdatedItems({ ids, items: items[index], currItems: arr })
        : arr.filter(data => !ids.includes(data[ID_KEY] as number))
    };
  }, {});

  const handlers = {
    [CREATED_KEY]: ({keys, items}: TFileHandlerData) => handleItems({key: CREATED_KEY, keys, items}),
    [UPDATED_KEY]: ({keys, items}: TFileHandlerData) => handleItems({key: UPDATED_KEY, keys, items}),
    [REMOVED_KEY]: ({keys, items}: TFileHandlerData) => handleItems({key: REMOVED_KEY, keys, items})
  };

  const compareFileData = (data: TPricelistData | null): void => {
    if(!data) {
      return;
    }

    const [keys, items] = [Object.keys(data), Object.values(data)];

    setComparedFileData(
      Object.keys(handlers).reduce((acc, key, index) => (
        { ...acc, [key]: Object.values(handlers)[index]({keys, items}) }
      ), {})
    );
  };

  const updateComparedFileData = (data: TPricelistState['response']) => {
    if(!data || !comparedFileData) {
      return;
    }

    const { action, type, ids } = {
      action: data.action as string,
      type: data.type as string,
      ids: data.ids as number[]
    };
    const keys = {
      [ADD_ACTION_KEY]: CREATED_KEY,
      [EDIT_ACTION_KEY]: UPDATED_KEY,
      [REMOVE_ACTION_KEY]: REMOVED_KEY
    };
    const itemsData = comparedFileData[keys[action]];
    const items = itemsData[type].filter(item => !ids.includes(item[ID_KEY] as number));

    setComparedFileData({
      ...comparedFileData,
      [keys[action]]: {
        ...itemsData,
        [type]: [...items]
      }
    });
  }

  useEffect(() => {
    updateComparedFileData(response);
  }, [
    response
  ]);

  return {
    comparedFileData,
    compareFileData
  }
}

export default useDataComparer;
