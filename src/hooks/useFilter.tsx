import { useState, useEffect } from 'react';

import { useSelector } from '../services/hooks';

import type { TItemData, TResParent, TResTemplate, TResourceData } from '../types';

import { fetchArray, sortStrArray } from '../utils';
import { RES_ID_KEY, PARENT_KEY, TEMPLATE_KEY, NAME_KEY } from '../utils/constants';

interface IFilter {
  filterData: TItemData | null;
  parentsList: TResParent[];
  templatesList: TResTemplate[];
  filterResultList: TResourceData[];
  handleFilterData: (data: TItemData) => void;
}

const useFilter = (): IFilter => {
  const [parentsList, setParentsList] = useState<TResParent[]>([]);
  const [templatesList, setTemplatesList] = useState<TResTemplate[]>([]);
  const [filterData, setFilterData] = useState<TItemData | null>(null);
  const [filterResultList, setFilterResultList] = useState<TResourceData[]>([]);

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
    setFilterData(filterData && data ? { ...filterData, ...data } : data);
  }

  useEffect(() => {
    setFilterResultList(filterData ? res.filter(item => item[NAME_KEY].includes(filterData.value as string)) : res);
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
    parentsList,
    templatesList,
    filterResultList,
    handleFilterData
  };
}

export default useFilter;
