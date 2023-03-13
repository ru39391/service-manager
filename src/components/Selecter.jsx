import { useState, useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import useDepts from '../store/DeptsStore';
import {
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from '@mui/material';

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
  const getActionProps = (value, actionMeta) => {
    const { value: id, name: label } = actionMeta.props;
    return { id, label };
  }
  const getParamName = (arr, value) => arr.find(({ id }) => id === value).name;
  const [currDept, setCurrDept] = useState({ id: dept, label: getParamName(depts, dept) });
  const [currSubDept, setCurrSubDept] = useState({ id: subdept, label: getParamName(subdepts, subdept) });
  const [currGroup, setCurrGroup] = useState({ id: group, label: getParamName(groups, group) });

  const listsArr = [
    { items: depts, state: currDept, handleChange: (value, actionMeta) => { setCurrDept(getActionProps(value, actionMeta)) }},
    { items: subdepts, state: currSubDept, handleChange: (value, actionMeta) => { setCurrSubDept(getActionProps(value, actionMeta)) }},
    { items: groups, state: currGroup, handleChange: (value, actionMeta) => { setCurrGroup(getActionProps(value, actionMeta)) }},
  ]
  //console.log(depts);

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
            {items.map(({ id, name }) => <MenuItem key={id.toString()} value={id} name={name}>{name}</MenuItem>)}
          </Select>
        </FormControl>
      )}
      {/*
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{currDept.label}</InputLabel>
        <Select
          id="demo-simple-select"
          labelId="demo-simple-select-label"
          value={currDept.id}
          label="Age"
          onChange={listsArr[0].handleChange}
        >
          {depts.map(({ id, name }) => <MenuItem key={id.toString()} value={id} name={name}>{name}</MenuItem>)}
        </Select>
      </FormControl>
      */}
    </>
  )
};

export default Selecter;
