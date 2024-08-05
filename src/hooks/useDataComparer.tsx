import { useState } from 'react';
import { useSelector } from '../services/hooks';

import type {
  TCustomData,
  TItemsArr,
  TItemData
} from '../types';

import {
  CREATED_KEY,
  UPDATED_KEY,
  REMOVED_KEY,
  ID_KEY,
  TYPES,
} from '../utils/constants';

type TFileHandlerData = {
  keys: string[];
  items: TItemsArr[];
}

interface IDataComparer {
  handledFileData: TCustomData<TCustomData<TItemsArr>> | null;
  handleFileData: (data: TCustomData<TItemsArr>) => void;
}

const useDataComparer = (): IDataComparer => {
  const [handledFileData, setHandledFileData] = useState<TCustomData<TCustomData<TItemsArr>> | null>(null);

  const pricelist = useSelector(state => state.pricelist);

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
          if(item[key] !== currItem[key]) {
            console.log({
              [ID_KEY]: item[ID_KEY],
              key,
              item,
              currItem
            })
          }

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
  ): TCustomData<TItemsArr> => keys.reduce((acc, item, index) => {
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

  const handleFileData = (data: TCustomData<TItemsArr>): void => {
    const [keys, items] = [Object.keys(data), Object.values(data)];

    setHandledFileData(
      Object.keys(handlers).reduce((acc, key, index) => (
        { ...acc, [key]: Object.values(handlers)[index]({keys, items}) }
      ), {})
    );
  };

  return {
    handledFileData,
    handleFileData
  }
}

export default useDataComparer;
