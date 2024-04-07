import { useState, useEffect } from 'react';

import { useSelector } from '../services/hooks';

import type { TCustomData } from '../types';

import {
  ID_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  TYPES
} from '../utils/constants';

interface ISelecter {
  deptsList: TCustomData<string | number | null>[];
  subdeptsList: TCustomData<string | number | null>[];
  groupsList: TCustomData<string | number | null>[];
  selectedDept: TCustomData<string | number | null>;
  selectedSubdept: TCustomData<string | number | null>;
  selectedGroup: TCustomData<string | number | null>;
  selectOption: (data: TCustomData<string | number>) => void;
}

const useSelecter = (): ISelecter => {
  const [deptsList, setDeptsList] = useState<TCustomData<string | number | null>[]>([]);
  const [subdeptsList, setSubdeptsList] = useState<TCustomData<string | number | null>[]>([]);
  const [groupsList, setGroupsList] = useState<TCustomData<string | number | null>[]>([]);

  const [selectedDept, setSelectedDept] = useState<TCustomData<string | number | null>>({});
  const [selectedSubdept, setSelectedSubdept] = useState<TCustomData<string | number | null>>({});
  const [selectedGroup, setSelectedGroup] = useState<TCustomData<string | number | null>>({});

  const [selectedData, setSelectedData] = useState<TCustomData<TCustomData<string | number | null> | null>>({});

  const {
    pricelist,
    formData
  } = useSelector(state => ({
    pricelist: state.pricelist,
    formData: state.form.formData
  }));

  const handleSelectedItem = (
    data: TCustomData<string | number>
  ): TCustomData<string | number | null> => pricelist[TYPES[data.type]].find((item: TCustomData<string | number | null>[]) => item[ID_KEY] === data[ID_KEY]);

  const handleItemsList = (
    arr: TCustomData<string | number | null>[],
    key: string,
    id: number
  ): TCustomData<string | number | null>[] => arr.filter((item) => item[key] === id);

  const handleFormData = (type: string): TCustomData<string | number | null> | null => formData
    ? handleSelectedItem({ type, [ID_KEY]: formData.data[type] as number })
    : null;

  const handleDeptsList = () => {
    setDeptsList(pricelist[TYPES[DEPT_KEY]]);
  }

  const handleSubeptsList = () => {
    setSubdeptsList(
      handleItemsList(
        pricelist[TYPES[SUBDEPT_KEY]],
        DEPT_KEY,
        selectedDept && selectedDept[ID_KEY] as number
      )
    );
  }

  const handleGroupsList = () => {
    setGroupsList(
      handleItemsList(
        pricelist[TYPES[GROUP_KEY]],
        SUBDEPT_KEY,
        selectedSubdept && selectedSubdept[ID_KEY] as number
      )
    );
  }

  const selectOption = (data: TCustomData<string | number>) => {
    const optionData = handleSelectedItem(data);

    setSelectedData({});

    switch(data.type) {
      case `${SUBDEPT_KEY}`:
        setSelectedSubdept(optionData);
        break;

      case `${GROUP_KEY}`:
        setSelectedGroup(optionData);
        break;

      default:
        setSelectedDept(optionData);
        break;
    }
  }

  useEffect(() => {
    setSelectedData({
      [DEPT_KEY]: handleFormData(DEPT_KEY),
      [SUBDEPT_KEY]: handleFormData(SUBDEPT_KEY),
      [GROUP_KEY]: handleFormData(GROUP_KEY),
    });
  }, [
    formData
  ]);

  useEffect(() => {
    handleDeptsList();
  }, []);

  useEffect(() => {
    setSelectedDept(
      selectedData[DEPT_KEY] || deptsList[0]
    );
  }, [
    deptsList,
    formData
  ]);

  /**/
  useEffect(() => {
    handleSubeptsList();
  }, [
    selectedDept
  ]);

  useEffect(() => {
    setSelectedSubdept(
      selectedData[SUBDEPT_KEY] || subdeptsList[0]
    );
  }, [
    subdeptsList,
    formData
  ]);

  /**/
  useEffect(() => {
    handleGroupsList();
  }, [
    selectedSubdept
  ]);

  useEffect(() => {
    setSelectedGroup(
      selectedData[GROUP_KEY] || groupsList[0]
    );
  }, [
    groupsList
  ]);


  return {
    deptsList,
    subdeptsList,
    groupsList,
    selectedDept,
    selectedSubdept,
    selectedGroup,
    selectOption
  };
}

export default useSelecter;
