import { FC } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

import useSelecter from '../hooks/useSelecter';

import type { TItemData } from '../types';

import {
  ID_KEY,
  NAME_KEY,
  TITLES
} from '../utils/constants';

interface ISelecter {
  keys: string[];
  disabled: boolean;
}

const Selecter: FC<ISelecter> = ({ keys, disabled }) => {
  const {
    deptsList,
    subdeptsList,
    groupsList,
    selectedDept,
    selectedSubdept,
    selectedGroup,
    selectOption
  } = useSelecter();

  // TODO: настроить возможность выбора нулевого значения для группы услуг
  return (
    [
      {
        list: deptsList,
        selected: selectedDept,
      },
      {
        list: subdeptsList,
        selected: selectedSubdept,
      },
      {
        list: groupsList,
        selected: selectedGroup
      }
    ].map(({ list, selected }, index) =>
      list.length > 0 && keys[index] && <FormControl key={keys[index]} sx={{ my: 1 }} fullWidth disabled={disabled}>
      <InputLabel id={`${keys[index]}-label`}>{TITLES[keys[index]]}</InputLabel>
      {selected && <Select
        labelId={`${keys[index]}-label`}
        id={keys[index]}
        name={keys[index]}
        value={selected[ID_KEY]}
        label={TITLES[keys[index]]}
        onChange={({ target }) => selectOption({
          type: keys[index],
          [ID_KEY]: target.value as number
        })}
      >
        {list.map(
          (item: TItemData) =>
            <MenuItem
              key={item[ID_KEY] && item[ID_KEY].toString()}
              value={item[ID_KEY] as number}
            >
              {item[NAME_KEY]} - {item[ID_KEY]}
            </MenuItem>
          )
        }
      </Select>}
    </FormControl>
    )
  )
};

export default Selecter;
