import { ChangeEvent } from 'react';
import { read, utils } from 'xlsx';
import { fetchArray } from '../utils';
import {
  INDEX_KEY,
  ID_KEY,
  NAME_KEY,
  PRICE_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  IS_COMPLEX_ITEM_KEY,
  IS_COMPLEX_KEY,
  COMPLEX_KEY,
  IS_VISIBLE_KEY,
  TYPES,
  ITEM_KEY
} from '../utils/constants';

import { useSelector, useDispatch } from '../services/hooks';
import { handleFile } from '../services/actions/file';
import { setRowData } from '../services/slices/file-slice';

import type { TPricelistData, TCustomData, TItemData, TItemsArr } from '../types';

interface IFileUploaderHook {
  uploadFile: (event: ChangeEvent<HTMLInputElement>) => void;
  getRowData: (data: TItemData | null) => void;
}

// TODO: проверить код
const useFileUploader = (): IFileUploaderHook => {
  const file = useSelector(state => state.file);
  const dispatch = useDispatch();

  const handleComplexItem = (
    items: TItemsArr,
    arr: TCustomData<number>[],
    itemId: number
  ): { ids: TCustomData<number>[], summ: number } => {
    const complexArr: TCustomData<number>[] = arr.filter(({ parent }) => parent === itemId).map(({ id, quantity }) => ({ [id]: quantity }));
    const summ: number = complexArr
      .map(item => {
        const id = Number(Object.keys(item)[0]);
        const quantity = Object.values(item)[0];
        //@ts-expect-error
        const { SPRICE }: { SPRICE: number } = items.find(({ SCHID }) => SCHID === id);

        return quantity*SPRICE;
      })
      .reduce((acc, item) => acc + item, 0);

    return {
      ids: complexArr,
      summ
    };
  };

  const handleDepts = (arr: TItemsArr): TPricelistData => {
    const deptsdArr = arr
      .map(
        ({ RAZDID, RAZDNAME }) => ({
          [ID_KEY]: Number(RAZDID),
          [NAME_KEY]: RAZDNAME.toString().trim().slice(0, 255)
        })
      );

    return { [TYPES[DEPT_KEY]]: fetchArray(deptsdArr, ID_KEY) };
  };

  const handleSubdepts = (arr: TItemsArr): TPricelistData => {
    const subdeptsArr = arr
      .map(
        ({ SPECID, SPECNAME, RAZDID }) => ({
          [ID_KEY]: Number(SPECID),
          [NAME_KEY]: SPECNAME.toString().trim().slice(0, 255),
          [DEPT_KEY]: Number(RAZDID)
        })
      );

    return { [TYPES[SUBDEPT_KEY]]: fetchArray(subdeptsArr, ID_KEY) };
  };

  const handleGroups = (arr: TItemsArr): TPricelistData => {
    const groupsArr = arr
      .filter(({ ISCAPTION_1 }) => Number(ISCAPTION_1) === 1)
      .map(
        ({ RAZDID, SPECID, ZAGOLOVOK_ID, SCHID, SCHNAME }) => ({
          [ID_KEY]: Number(SCHID),
          [NAME_KEY]: SCHNAME.toString().trim().slice(0, 255),
          [DEPT_KEY]: Number(RAZDID),
          [SUBDEPT_KEY]: Number(SPECID),
          [GROUP_KEY]: Number(ZAGOLOVOK_ID)
        })
      );

    return { [TYPES[GROUP_KEY]]: fetchArray(groupsArr, ID_KEY) };
  };

  const handleItems = (arr: TItemsArr): TPricelistData => {
    //@ts-expect-error
    const complexItemsArr: TCustomData<number>[] = arr
      .filter(({ ISCOMPLEX }) => Number(ISCOMPLEX) === 1)
      .map(({
        SCHID: parent,
        ID_SCHEMA_IN_COMPLEX: id,
        KOLVO_IN_COMPLEX: quantity
      }) => ({ parent, id, quantity }));
    const itemsArr = arr
      .filter(({ ISCAPTION_1 }) => Number(ISCAPTION_1) === 0)
      .map(
        ({
          RAZDID,
          SPECID,
          ZAGOLOVOK_ID,
          SCHID,
          SCHNAME,
          SPRICE,
          VIEWINCOMPLEX_ONLY,
          ISCOMPLEX,
          VIEWINWEB,
          SORTIROVKA_SPEC
        }, _, array) => {
          const { ids, summ } = handleComplexItem(array, complexItemsArr, SCHID as number);

          return {
            [ID_KEY]: Number(SCHID),
            [NAME_KEY]: SCHNAME.toString().trim().slice(0, 255),
            [PRICE_KEY]: ISCOMPLEX ? summ : Number(SPRICE),
            [DEPT_KEY]: Number(RAZDID),
            [SUBDEPT_KEY]: Number(SPECID),
            [GROUP_KEY]: Number(ZAGOLOVOK_ID),
            [IS_COMPLEX_ITEM_KEY]: Number(VIEWINCOMPLEX_ONLY) || 0,
            [IS_COMPLEX_KEY]: Number(ISCOMPLEX) || 0,
            [COMPLEX_KEY]: JSON.stringify(ids),
            [IS_VISIBLE_KEY]: Number(VIEWINWEB) || 1,
            [INDEX_KEY]: Number(SORTIROVKA_SPEC)
          }
        }
      );

    const data = { [TYPES[ITEM_KEY]]: fetchArray(itemsArr, ID_KEY) };
    console.log(data);

    return data;
  };

  const handleUploadedFile = (event: Event): void => {
    //@ts-expect-error
    const { result } = event.target;

    const wb = read(result, { type: 'binary' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const parsedData: TItemsArr = utils.sheet_to_json((ws), { defval: '' });

    dispatch(handleFile({
      ...handleDepts(parsedData),
      ...handleSubdepts(parsedData),
      ...handleGroups(parsedData),
      ...handleItems(parsedData)
    }));
  };

  const uploadFile = (event: ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target;
    const reader = new FileReader();

    if(!files) {
      return;
    }

    reader.readAsBinaryString(files[0]);
    reader.addEventListener('load', handleUploadedFile);
  };

  const getRowData = (data: TItemData | null = null): void => {
    const parsedData = [
      file[TYPES[DEPT_KEY]],
      file[TYPES[SUBDEPT_KEY]],
      file[TYPES[GROUP_KEY]],
      file[TYPES[ITEM_KEY]]
    ].reduce((acc, item) => ({...acc, [Object.keys(item[0]).length]: item}), {});

    data
      ? dispatch(setRowData({ data: parsedData[data.key].find((item: TItemData) => item[ID_KEY] === data.id) }))
      : dispatch(setRowData({ data }));
  }

  return {
    uploadFile,
    getRowData
  }
}

export default useFileUploader;
