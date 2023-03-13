import { useState, useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import useDepts from '../store/DeptsStore';
import {
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from '@mui/material';
import { DEPT_TYPE_NAME, SUBDEPT_TYPE_NAME, GROUP_TYPE_NAME } from '../utils/config';

function Selecter({ dept, subdept, group }) {
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

  const getParamName = (arr, value) => {
    console.log(arr, value, arr.find(({ id }) => id === value));
    return arr.find(({ id }) => id === value).name;
  };
  const filterArr = (arr, param, value) => {
    //console.log(arr, param, value);
    return arr.filter(item => item[param] === value);
  }
  const getActionProps = (value, actionMeta) => {
    const { value: id, name: label } = actionMeta.props;
    return { id, label };
  }

  const [currDept, setCurrDept] = useState({ id: dept, label: getParamName(depts, dept) });
  const [currSubDept, setCurrSubDept] = useState({ id: subdept, label: getParamName(subdepts, subdept) });
  const [currGroup, setCurrGroup] = useState({ id: group, label: getParamName(groups, group) });

  const listsArr = [
    {
      items: depts,
      state: currDept,
      handleChange: (value, actionMeta) => {
        setCurrDept(getActionProps(value, actionMeta))
      },
    },
    {
      items: filterArr(subdepts, DEPT_TYPE_NAME, currDept.id),
      state: currSubDept,
      handleChange: (value, actionMeta) => {
        setCurrSubDept(getActionProps(value, actionMeta))
      },
    },
    {
      items: filterArr(groups, SUBDEPT_TYPE_NAME, currSubDept.id),
      state: currGroup,
      handleChange: (value, actionMeta) => {
        setCurrGroup(getActionProps(value, actionMeta));
      },
    },
  ]

  /*
  useEffect(() => {
    const arr = listsArr[1].items;
    setCurrSubDept({ id: arr[0].id, label: getParamName(arr, arr[0].id) });
  }, [currDept]);

  useEffect(() => {
    const arr = listsArr[2].items;
    setCurrGroup({ id: arr[0].id, label: getParamName(arr, arr[0].id) });
  }, [currSubDept]);*/

  return (
    <>
      {listsArr.map(
        ({ items, state, handleChange }) =>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{state.label}</InputLabel>
          <Select
            id="demo-simple-select"
            labelId="demo-simple-select-label"
            value={state.id}
            label="Age"
            onChange={handleChange}
          >
            {items.map(({ id, name }) => <MenuItem key={id.toString()} value={id} name={name}>{id} - {name}</MenuItem>)}
          </Select>
        </FormControl>
      )}
    </>
  )
};

export default Selecter;
