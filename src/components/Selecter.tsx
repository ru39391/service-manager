import { FC } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

import useSelecter from '../hooks/useSelecter';

import type { TCustomData } from '../types';

import {
  ID_KEY,
  NAME_KEY,
  TITLES
} from '../utils/constants';

interface ISelecter {
  keys: string[];
  //categoryData: TCustomData<number>;
}

const Selecter: FC<ISelecter> = ({
  keys
}) => {
  const {
    deptsList,
    subdeptsList,
    groupsList,
    selectedDept,
    selectedSubdept,
    selectedGroup,
    selectOption
  } = useSelecter();

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
      list.length > 0 && selected && <FormControl sx={{ my: 1 }} fullWidth>
      <InputLabel id={`${keys[index]}-select-label`}>{TITLES[keys[index]]} - {keys[index]}</InputLabel>
      <Select
        labelId={`${keys[index]}-select-label`}
        id={`${keys[index]}-select`}
        value={selected[ID_KEY]}
        label={TITLES[keys[index]]}
        onChange={({ target }) => selectOption({
          type: keys[index],
          [ID_KEY]: target.value as number
        })}
      >
        {list.map(
          (item: TCustomData<string | number | null>) =>
            <MenuItem
              key={item[ID_KEY] && item[ID_KEY].toString()}
              value={item[ID_KEY] as number}
            >
              {item[NAME_KEY]}
            </MenuItem>
          )
        }
      </Select>
    </FormControl>
    )
  )

  /*
  const {
    selectedItem,
    selecterList,
    handleSelectedValue
  } = useSelecter({
    ...Object.keys(categoryData).reduce(
      (acc, item) => ({
        ...acc,
        key: item,
        value: categoryData[item]
      }),
    {}),
    category
  });

  console.log(
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
    ]);
  */
};

export default Selecter;
