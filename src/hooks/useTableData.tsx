import { useState } from 'react';
import { sortArray } from '../utils';
import { GridValidRowModel, GridColDef } from '@mui/x-data-grid';
import {
  INDEX_KEY,
  ITEM_KEY,
  ID_KEY,
  NAME_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  IS_COMPLEX_ITEM_KEY,
  IS_COMPLEX_KEY,
  COMPLEX_KEY,
  IS_VISIBLE_KEY,
  CAPTIONS,
  TYPES
} from '../utils/constants';

import type { TCustomData } from '../types';

export type TTableData = {
  cols: GridColDef<GridValidRowModel>[];
  rows: GridValidRowModel[];
} | null;

interface ITableData {
  deptsTableData: TTableData | null;
  subdeptsTableData: TTableData | null;
  groupsTableData: TTableData | null;
  itemsTableData: TTableData | null;
  setTableData: (data: TCustomData<TCustomData<string | number>[]>) => void;
}

const useTableData = (): ITableData => {
  const [deptsTableData, setDeptsTableData] = useState<TTableData>(null);
  const [subdeptsTableData, setSubeptsTableData] = useState<TTableData>(null);
  const [groupsTableData, setGroupsTableData] = useState<TTableData>(null);
  const [itemsTableData, setItemsTableData] = useState<TTableData>(null);

  const setBooleanCaption =(item: TCustomData<string | number>, key: string): TCustomData<string> => ({ [key]: item[key] ? 'Да' : 'Нет' });

  const isValueExist = (value: string | number | undefined): boolean => ['string', 'number'].includes(typeof value);

  const getCategoryName = (arr: TCustomData<string | number>[], item: TCustomData<string | number>, key: string): string => {
    const data = arr.find(row => row[ID_KEY] === item[key]);

    return data ? data[NAME_KEY] as string : '';
  }

  const getItemsName = (arr: TCustomData<number>[], items: TCustomData<string | number>[]): string => arr.length
   ? arr
      .map(item => ({ id: Number(Object.keys(item)[0]), quantity: Object.values(item)[0] }))
      .reduce((acc: string[], row: TCustomData<number>) => {
    const data: TCustomData<string | number> | undefined = items.find(item => item[ID_KEY] === row.id);

    return data ? [...acc, `${data[NAME_KEY]} - ${row.quantity} шт.`] : acc;
   }, []).join(', ')
   : '';

  const handleArr = (data: TCustomData<TCustomData<string | number>[]>, key: string): TTableData => {
    if(!data[key].length) {
      return null;
    }

    const {depts, subdepts, groups, items} = data;
    const rows: GridValidRowModel[] = sortArray(data[key], NAME_KEY)
      .map(item => {
        const data = {...item};

        delete data[INDEX_KEY];
        return data;
      })
      .reduce((acc: GridValidRowModel[], item: GridValidRowModel, index) => [...acc, {
        id: index,
        [INDEX_KEY]: index + 1,
        ...item,
        ...(isValueExist(item[DEPT_KEY]) && { [DEPT_KEY]: getCategoryName(depts, item, DEPT_KEY) }),
        ...(isValueExist(item[SUBDEPT_KEY]) && { [SUBDEPT_KEY]: getCategoryName(subdepts, item, SUBDEPT_KEY) }),
        ...(isValueExist(item[GROUP_KEY]) && { [GROUP_KEY]: getCategoryName(groups, item, GROUP_KEY) }),
        ...(isValueExist(item[IS_COMPLEX_ITEM_KEY]) && setBooleanCaption(item, IS_COMPLEX_ITEM_KEY)),
        ...(isValueExist(item[IS_COMPLEX_KEY]) && setBooleanCaption(item, IS_COMPLEX_KEY)),
        ...(isValueExist(item[COMPLEX_KEY]) && { [COMPLEX_KEY]: getItemsName(JSON.parse(item[COMPLEX_KEY]), items) }),
        ...(isValueExist(item[IS_VISIBLE_KEY]) && setBooleanCaption(item, IS_VISIBLE_KEY))
      }], []);
    const cols: GridColDef<GridValidRowModel>[] = Object.keys(rows[0])
      .filter(key => key !== 'id')
      .map(item => ({
        field: item,
        //@ts-expect-error
        headerName: CAPTIONS[item],
        //@ts-expect-error
        flex: CAPTIONS[item].length > 4 ? 1 : 0,
        //@ts-expect-error
        width: CAPTIONS[item].length > 4 ? 'auto' : 100,
      } as GridColDef<GridValidRowModel>));

    return {
      rows,
      cols
    };
  }

  const setTableData = (data: TCustomData<TCustomData<string | number>[]>): void => {
    setDeptsTableData(handleArr(data, TYPES[DEPT_KEY]));
    setSubeptsTableData(handleArr(data, TYPES[SUBDEPT_KEY]));
    setGroupsTableData(handleArr(data, TYPES[GROUP_KEY]));
    setItemsTableData(handleArr(data, ITEM_KEY));
  }

  return {
    deptsTableData,
    subdeptsTableData,
    groupsTableData,
    itemsTableData,
    setTableData
  }
}

export default useTableData;
