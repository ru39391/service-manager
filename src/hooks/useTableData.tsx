import { useState } from 'react';
import { sortStrArray } from '../utils';
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
  CREATEDON_KEY,
  UPDATEDON_KEY,
  CAPTIONS,
  TYPES,
  ITEM_KEY
} from '../utils/constants';

import type {
  TCustomData,
  TItemData,
  TItemsArr,
  TPricelistData
} from '../types';

type TCategoryData = {
  data: TPricelistData;
  category: string | undefined;
  params: TCustomData<number | null> | null;
};

type TTableData = {
  cols: GridColDef<GridValidRowModel>[];
  rows: GridValidRowModel[];
} | null;

interface ITableData {
  tableData: TTableData | null;
  handleTableData: (data: TCategoryData) => void;
}

const useTableData = (): ITableData => {
  const [tableData, setTableData] = useState<TTableData>(null);

  const setBooleanCaption =(item: TCustomData<string | number>, key: string): TCustomData<string> => ({ [key]: item[key] ? 'Да' : 'Нет' });

  const isValueExist = (value: string | number | undefined): boolean => ['string', 'number'].includes(typeof value);

  const getCategoryName = (arr: TItemsArr, item: GridValidRowModel, key: string): string => {
    const data = arr.find(row => row[ID_KEY] === item[key]);
    // TODO: настроить передачу id категорий при обновлении файла
    // console.log(arr);

    return data ? data[NAME_KEY] as string : '';
  }

  const getItemsName = (arr: TCustomData<number>[], items: TItemsArr): string => arr.length
   ? arr
      .map(item => ({ id: Number(Object.keys(item)[0]), quantity: Object.values(item)[0] }))
      .reduce((acc: string[], row: TCustomData<number>) => {
    const data: TItemData | undefined = items.find(item => item[ID_KEY] === row.id);

    return data ? [...acc, `${data[NAME_KEY]} - ${row.quantity} шт.`] : acc;
   }, []).join(', ')
   : '';

  const handleArr = (arr: TItemsArr, items: TPricelistData): TTableData => {
    if(!(Array.isArray(arr) && arr.length)) {
      return null;
    }

    const rows: GridValidRowModel[] = sortStrArray([...arr], NAME_KEY)
      .map(item => {
        const data = {...item};

        delete data[INDEX_KEY];
        return data;
      })
      .reduce((acc: GridValidRowModel[], item: GridValidRowModel, index) => [...acc, {
        id: index,
        [INDEX_KEY]: index + 1,
        ...item,
        ...(isValueExist(item[DEPT_KEY]) && { [DEPT_KEY]: getCategoryName(items[TYPES[DEPT_KEY]], item, DEPT_KEY) }),
        ...(isValueExist(item[SUBDEPT_KEY]) && { [SUBDEPT_KEY]: getCategoryName(items[TYPES[SUBDEPT_KEY]], item, SUBDEPT_KEY) }),
        ...(isValueExist(item[GROUP_KEY]) && { [GROUP_KEY]: getCategoryName(items[TYPES[GROUP_KEY]], item, GROUP_KEY) }),
        ...(isValueExist(item[IS_COMPLEX_ITEM_KEY]) && setBooleanCaption(item, IS_COMPLEX_ITEM_KEY)),
        ...(isValueExist(item[IS_COMPLEX_KEY]) && setBooleanCaption(item, IS_COMPLEX_KEY)),
        ...(isValueExist(item[COMPLEX_KEY]) && { [COMPLEX_KEY]: getItemsName(JSON.parse(item[COMPLEX_KEY]), items[TYPES[ITEM_KEY]]) }),
        ...(isValueExist(item[IS_VISIBLE_KEY]) && setBooleanCaption(item, IS_VISIBLE_KEY))
      }], []);
    const cols: GridColDef<GridValidRowModel>[] = Object.keys(rows[0])
      .filter((key) => ![CAPTIONS[ID_KEY].toLowerCase(), CREATEDON_KEY, UPDATEDON_KEY].includes(key))
      .map((item) => ({
        field: item,
        headerName: CAPTIONS[item],
        flex: CAPTIONS[item].length > 4 ? 1 : 0,
        width: CAPTIONS[item].length > 4 ? 'auto' : 100,
      } as GridColDef<GridValidRowModel>));

    return {
      rows,
      cols
    };
  }

  const handleTableData = ({data, category, params}: TCategoryData): void => {
    console.log({data, category, params});
    const key = params !== null ? Object.keys(params)[0] : null;
    const id = params !== null && key !== null ? params[key] : null;
    const arr = category ? data[category] : data[TYPES[ITEM_KEY]];
    const filtredArr = key !== null && id !== null
      ? arr.filter((item) => item[key] === id)
      : arr;

    setTableData(
      handleArr(
        filtredArr,
        data
      )
    );
  }

  return {
    tableData,
    handleTableData
  }
}

export default useTableData;
