import { useState } from 'react';
import { shallow } from 'zustand/shallow';
import useDepts from '../store/DeptsStore';
import {
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from '@mui/material';
import { DEPT_TYPE_NAME, SUBDEPT_TYPE_NAME, GROUP_TYPE_NAME } from '../utils/config';

function Selecter({ dept, subdept, group, labels }) {
  const {
    depts,
    subdepts,
    groups,
  } = useDepts(
    (state) => ({
      depts: state.depts,
      subdepts: state.subdepts,
      groups: state.groups,
    }),
    shallow
  );

  const getParamValue = (arr, value, param = 'name') => {
    const data = arr.find(({ id }) => id === value);
    return data ? data[param] : data;
  };
  const filterArr = (arr, param, value) => arr.filter(item => item[param] === value);

  function handleState({ arr, setData, setList }) {
    const { id, name: label } = arr[0];
    setList(arr);
    setData({ id, label });
  }

  function handleActionProps(value, actionMeta, type = DEPT_TYPE_NAME) {
    const { value: id, name: label } = actionMeta.props;
    switch(type) {
      case DEPT_TYPE_NAME:
        const currSubdeptList = filterArr(subdepts, DEPT_TYPE_NAME, id);
        setCurrDept({ id, label });
        [{
          arr: currSubdeptList,
          setData: (data) => {
            setCurrSubdept(data);
          },
          setList: (arr) => {
            setSupdeptList(arr);
          },
        },{
          arr: filterArr(groups, SUBDEPT_TYPE_NAME, currSubdeptList[0].id),
          setData: (data) => {
            setCurrGroup(data);
          },
          setList: (arr) => {
            setGroupList(arr);
          },
        }].map(item => handleState(item));
        break;

      case SUBDEPT_TYPE_NAME:
        setCurrSubdept({ id, label });
        [{
          arr: filterArr(groups, SUBDEPT_TYPE_NAME, id),
          setData: (data) => {
            setCurrGroup(data);
          },
          setList: (arr) => {
            setGroupList(arr);
          },
        }].map(item => handleState(item));
        break;

      case GROUP_TYPE_NAME:
        setCurrGroup({ id, label });
        break;
    }
  }

  const [currDept, setCurrDept] = useState({
    id: dept,
    label: getParamValue(depts, dept)
  });
  const [currSubdept, setCurrSubdept] = useState({
    id: subdept,
    label: getParamValue(subdepts, subdept),
  });
  const [currGroup, setCurrGroup] = useState({
    id: group,
    label: getParamValue(groups, group),
  });

  const [supdeptList, setSupdeptList] = useState(filterArr(subdepts, DEPT_TYPE_NAME, dept));
  const [groupList, setGroupList] = useState(filterArr(groups, SUBDEPT_TYPE_NAME, subdept));

  const listsArr = [
    {
      type: DEPT_TYPE_NAME,
      item: currDept,
      list: depts,
      handleChange: (value, actionMeta) => {
        handleActionProps(value, actionMeta);
      },
    },
    {
      type: SUBDEPT_TYPE_NAME,
      item: currSubdept,
      list: supdeptList,
      handleChange: (value, actionMeta) => {
        handleActionProps(value, actionMeta, SUBDEPT_TYPE_NAME);
      },
    },
    {
      type: GROUP_TYPE_NAME,
      item: currGroup,
      list: groupList,
      handleChange: (value, actionMeta) => {
        handleActionProps(value, actionMeta, GROUP_TYPE_NAME);
      },
    },
  ];

  if(!group) listsArr.pop();

  return (
    <>
      {listsArr.map(
        ({ type, item, list, handleChange }, index) =>
        <FormControl key={`${type}-label`} margin="dense" fullWidth>
          <InputLabel id={`${type}-label`}>{labels[index]}</InputLabel>
          <Select
            id={type}
            labelId={`${type}-label`}
            value={item.id}
            label={labels[index]}
            onChange={handleChange}
          >
            {list.map(({ id, name }) => <MenuItem key={`${type}-${id.toString()}`} value={id} name={name}>{name}</MenuItem>)}
          </Select>
        </FormControl>
      )}
    </>
  )
};

export default Selecter;
