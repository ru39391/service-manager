import { useState, useEffect } from 'react';

import { useSelector } from '../services/hooks';

import type { TItemData, TResParent, TResTemplate, TResourceData } from '../types';

import { fetchArray, sortStrArray } from '../utils';
import {
  NAME_KEY,
  RES_ID_KEY,
  PARENT_KEY,
  TEMPLATE_KEY,
  IS_PARENT_KEY,
  UPDATED_KEY
} from '../utils/constants';

interface IFilter {
  filterData: TItemData | null;
  isFilterVisible: boolean;
  filterResultList: TResourceData[];
  parentsList: TResParent[];
  templatesList: TResTemplate[];
  handleFilterData: (data: TItemData | null) => void;
  setFilterVisibility: (value: boolean) => void;
}

// TODO: настроить сохранение параметров фильтра в sessionStorage - ПЛАТНО
// TODO: возможная доработка - порядок сортировки и выделение цветом совпадающего текста - ПЛАТНО
const useFilter = (): IFilter => {
  const [filterData, setFilterData] = useState<TItemData | null>(null);
  const [isFilterVisible, setFilterVisibility] = useState<boolean>(false);
  const [filterResultList, setFilterResultList] = useState<TResourceData[]>([]);
  const [parentsList, setParentsList] = useState<TResParent[]>([]);
  const [templatesList, setTemplatesList] = useState<TResTemplate[]>([]);

  const { res } = useSelector(state => state.pricelist);

  const handleParamsList = (key: string): void => {
    const paramKey = `${key}_${RES_ID_KEY}`;
    const resParamsArr = res.map(item => item[key]);
    const paramsArr = fetchArray(resParamsArr, paramKey);

    if(key === TEMPLATE_KEY) {
      setTemplatesList(sortStrArray(paramsArr, NAME_KEY) as TResTemplate[]);
    } else{
      setParentsList(sortStrArray(paramsArr, NAME_KEY) as TResParent[]);
    }
  }

  const handleFilterData = (data: TItemData | null): void => {
    if(data && [
      Object.values(data).length === 1,
      data[NAME_KEY] !== undefined,
      data[NAME_KEY] === ''
    ].reduce((acc, value) => acc && value, true)) {
      setFilterData(null);
    } else {
      setFilterData(
        filterData && data
          ? data[UPDATED_KEY] && Boolean(data[UPDATED_KEY]) ? { [NAME_KEY]: data[NAME_KEY] } : { ...filterData, ...data }
          : data
      );
    }
  }

  const filterList = (): void => {
    if(!filterData) {
      setFilterResultList(res);
      return;
    }

    const keys = Object.keys(filterData);

    setFilterResultList(res.filter((item) => {
      const filterKeysData = keys.reduce(
        (acc, key) => ({
          ...acc,
          ...( key === NAME_KEY && { [key]: item[key].toLowerCase().includes(filterData[key].toString().toLowerCase()) }),
          ...( [PARENT_KEY, TEMPLATE_KEY].includes(key) && { [key]: item[key][`${key}_${RES_ID_KEY}`] === filterData[key] }),
          ...( key === IS_PARENT_KEY && { [key]: item[key] === Boolean(filterData[key]) }),
        }), {}
      )

      return Object.values(filterKeysData).every(value => value);
    }));
  }

  useEffect(() => {
    filterList();
    console.log(filterData);
  }, [
    filterData
  ]);

  useEffect(() => {
    handleParamsList(TEMPLATE_KEY);
    handleParamsList(PARENT_KEY);
    setFilterResultList(res);
  }, [
    res
  ]);

  return {
    filterData,
    isFilterVisible,
    filterResultList,
    parentsList,
    templatesList,
    handleFilterData,
    setFilterVisibility
  };
}

export default useFilter;
