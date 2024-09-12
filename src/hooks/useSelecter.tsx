import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from '../services/hooks';
import { setFormValues, setSelectedItems } from '../services/slices/form-slice';

import type { TCustomData, TItemData, TItemsArr } from '../types';

import { sortStrArray } from '../utils';
import {
  ID_KEY,
  NAME_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  TYPES
} from '../utils/constants';

interface ISelecter {
  deptsList: TItemsArr;
  subdeptsList: TItemsArr;
  groupsList: TItemsArr;
  selectedDept: TItemData;
  selectedSubdept: TItemData;
  selectedGroup: TItemData;
  selectOption: (data: TItemData) => void;
}

const useSelecter = (): ISelecter => {
  const [deptsList, setDeptsList] = useState<TItemsArr>([]);
  const [subdeptsList, setSubdeptsList] = useState<TItemsArr>([]);
  const [groupsList, setGroupsList] = useState<TItemsArr>([]);

  const [selectedDept, setSelectedDept] = useState<TItemData>({});
  const [selectedSubdept, setSelectedSubdept] = useState<TItemData>({});
  const [selectedGroup, setSelectedGroup] = useState<TItemData>({});

  const [selectedData, setSelectedData] = useState<TCustomData<TItemData | null>>({});

  const dispatch = useDispatch();
  const {
    pricelist,
    form: { formData, formValues }
  } = useSelector(state => ({
    pricelist: state.pricelist,
    form: state.form,
  }));

  const handleSelectedItem = (
    data: TItemData
  ): TItemData => pricelist[TYPES[data.type]].find((item: TItemsArr) => item[ID_KEY] === data[ID_KEY]);

  const handleItemsList = (
    arr: TItemsArr,
    key: string,
    id: number
  ): TItemsArr => sortStrArray([...arr.filter((item) => item[key] === id)], NAME_KEY);

  const handleFormData = (type: string): TItemData | null => formData
    ? handleSelectedItem({ type, [ID_KEY]: formData.data[type] as number })
    : null;

  const handleDeptsList = () => {
    const arr = sortStrArray([...pricelist[TYPES[DEPT_KEY]]], NAME_KEY);

    setDeptsList(arr);
    dispatch(
      setSelectedItems({ items: { [DEPT_KEY]: arr } })
    );
  }

  const handleSubeptsList = () => {
    const arr = handleItemsList(
      pricelist[TYPES[SUBDEPT_KEY]],
      DEPT_KEY,
      selectedDept && selectedDept[ID_KEY] as number
    );

    setSubdeptsList(arr);
    dispatch(
      setSelectedItems({ items: { [SUBDEPT_KEY]: arr } })
    );
    dispatch(
      setFormValues({
        values: {
          ...formValues,
          [DEPT_KEY]: selectedDept ? selectedDept[ID_KEY] as number : 0
        }
      })
    );
  }

  const handleGroupsList = () => {
    const arr = handleItemsList(
      pricelist[TYPES[GROUP_KEY]],
      SUBDEPT_KEY,
      selectedSubdept && selectedSubdept[ID_KEY] as number
    );

    setGroupsList(arr);
    dispatch(
      setSelectedItems({ items: { [GROUP_KEY]: arr } })
    );
    dispatch(
      setFormValues({
        values: {
          ...formValues,
          [SUBDEPT_KEY]: selectedSubdept ? selectedSubdept[ID_KEY] as number : 0
        }
      })
    );
  }

  const selectOption = (data: TItemData) => {
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
  }, [
    pricelist
  ]);

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

  useEffect(() => {
    dispatch(
      setFormValues({
        values: {
          ...formValues,
          [GROUP_KEY]: selectedGroup ? selectedGroup[ID_KEY] as number : 0
        }
      })
    );
  }, [
    selectedGroup
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
