import { useState, useEffect } from 'react';
import { sortArray } from '../utils';
import { GridValidRowModel, GridColDef } from '@mui/x-data-grid';
import {
  INDEX_KEY,
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
  TYPES,
  ITEM_KEY
} from '../utils/constants';

import { useSelector } from '../services/hooks';

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
}

const useTableData = (): ITableData => {
  const [deptsTableData, setDeptsTableData] = useState<TTableData>(null);
  const [subdeptsTableData, setSubeptsTableData] = useState<TTableData>(null);
  const [groupsTableData, setGroupsTableData] = useState<TTableData>(null);
  const [itemsTableData, setItemsTableData] = useState<TTableData>(null);
  const {
    depts,
    subdepts,
    groups,
    items
  } = useSelector(state => state.file);

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

  const handleArr = (arr: TCustomData<string | number>[]): TTableData => {
    if(!(Array.isArray(arr) && arr.length)) {
      return null;
    }

    const rows: GridValidRowModel[] = sortArray([...arr], NAME_KEY)
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

  const setTableData = (): void => {
    setDeptsTableData(handleArr(depts));
    setSubeptsTableData(handleArr(subdepts));
    setGroupsTableData(handleArr(groups));
    setItemsTableData(handleArr(items));
  }
/*
  const setGridData = (arr: TCustomData<string | number>[]) => {

  }
*/
  useEffect(() => {
    setTableData();
  }, [
    depts,
    subdepts,
    groups,
    items
  ]);

  return {
    deptsTableData,
    subdeptsTableData,
    groupsTableData,
    itemsTableData
  }
}

export default useTableData;
