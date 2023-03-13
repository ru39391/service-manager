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

  const getParamName = (arr, value) => arr.find(({ id }) => id === value).name;
  const filterArr = (arr, param, value) => arr.filter(item => item[param] === value);
  const getActionProps = (value, actionMeta) => {
    const { value: id, name: label } = actionMeta.props;
    return { id, label };
  }

  const [currDept, setCurrDept] = useState({ id: dept, label: getParamName(depts, dept) });
  const [currSubDept, setCurrSubDept] = useState({ id: subdept, label: getParamName(subdepts, subdept) });
  const [currGroup, setCurrGroup] = useState({ id: group, label: getParamName(groups, group) });

  const listsArr = [
    {
      type: DEPT_TYPE_NAME,
      items: depts,
      state: currDept,
      handleChange: (value, actionMeta) => {
        const { id, label } = getActionProps(value, actionMeta);
        setCurrDept({ id, label });
        setCurrSubDept({
          id: filterArr(subdepts, DEPT_TYPE_NAME, id)[0].id,
          label: filterArr(subdepts, DEPT_TYPE_NAME, id)[0].name
        });
        setCurrGroup({
          id: filterArr(groups, SUBDEPT_TYPE_NAME, filterArr(subdepts, DEPT_TYPE_NAME, id)[0].id)[0].id,
          label: filterArr(groups, SUBDEPT_TYPE_NAME, filterArr(subdepts, DEPT_TYPE_NAME, id)[0].id)[0].name
        });
      },
    },
    {
      type: SUBDEPT_TYPE_NAME,
      items: filterArr(subdepts, DEPT_TYPE_NAME, currDept.id),
      state: currSubDept,
      handleChange: (value, actionMeta) => {
        const { id, label } = getActionProps(value, actionMeta);
        setCurrSubDept({ id, label });
        setCurrGroup({
          id: filterArr(groups, SUBDEPT_TYPE_NAME, id)[0].id,
          label: filterArr(groups, SUBDEPT_TYPE_NAME, id)[0].name
        });
      },
    },
    {
      type: GROUP_TYPE_NAME,
      items: filterArr(groups, SUBDEPT_TYPE_NAME, currSubDept.id),
      state: currGroup,
      handleChange: (value, actionMeta) => {
        setCurrGroup(getActionProps(value, actionMeta));
      },
    },
  ]

  return (
    <>
      {listsArr.map(
        ({ type, items, state, handleChange }, index) =>
        <FormControl key={`${type}-label`} margin="dense" fullWidth>
          <InputLabel id={`${type}-label`}>{labels[index]}</InputLabel>
          <Select
            id={type}
            labelId={`${type}-label`}
            value={state.id}
            label={labels[index]}
            onChange={handleChange}
          >
            {items.map(({ id, name }) => <MenuItem key={`${type}-${id.toString()}`} value={id} name={name}>{id} - {name}</MenuItem>)}
          </Select>
        </FormControl>
      )}
    </>
  )
};

export default Selecter;
