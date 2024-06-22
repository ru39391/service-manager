import { FC, useEffect } from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

import useComplex from '../hooks/useComplex';

import type { TItemData, TCustomData } from '../types';

import {
  ID_KEY,
  NAME_KEY,
  COMPLEX_KEY,
  QUANTITY_KEY,
  CAPTIONS
} from '../utils/constants';

interface IComplexItemsList {
  itemId: number;
  complex: string;
  isComplexListVisible: number;
}

const ComplexItemsList: FC<IComplexItemsList> = ({ itemId, complex, isComplexListVisible }) => {
  const {
    complexItems,
    currComplexItems,
    handleComplexData
  } = useComplex();

  useEffect(() => {
    console.log(complexItems);
    handleComplexData({itemId, complex, isListVisible: isComplexListVisible});
  }, [
    isComplexListVisible
  ]);

  return (
    // TODO: настроить удаление/добавление элементов списка комплексных услуг
    isComplexListVisible
    ? currComplexItems.map(
      (complexItem, index) =>
        <Grid key={complexItem.item_id?.toString()} container spacing={2}>
          <Grid item xs={9}>
            <FormControl sx={{ my: 1 }} fullWidth>
              <InputLabel id={`id-${complexItem.item_id?.toString()}`}>{CAPTIONS[NAME_KEY]}</InputLabel>
              {/* // TODO: настроить изменение значения списка при выборе нового значения */}
              <Select
                labelId={`id-${complexItem.item_id?.toString()}`}
                id={`select-${complexItem.item_id?.toString()}`}
                name={`${NAME_KEY}-${complexItem.item_id?.toString()}`}
                value={complexItem.item_id}
                label={CAPTIONS[NAME_KEY]}
                onChange={({ target }) => console.log({
                  [ID_KEY]: target.value as number
                })}
              >
                {complexItems.map(
                  (item: TItemData) =>
                    <MenuItem
                      key={item[ID_KEY] && item[ID_KEY].toString()}
                      value={item[ID_KEY] as number}
                    >
                      {item[NAME_KEY]} - {item[ID_KEY]}
                    </MenuItem>
                  )
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            {/* // TODO: настроить валидацию вводимого значения */}
            <TextField
              id={`input-${complexItem.item_id?.toString()}`}
              name={`${QUANTITY_KEY}-${complexItem.item_id?.toString()}`}
              label={CAPTIONS[QUANTITY_KEY]}
              defaultValue={complexItem[QUANTITY_KEY]}
              fullWidth
              variant="outlined"
              type="text"
              sx={{ my: 1 }}
              onChange={({ target }) => console.log(target)}
            />
          </Grid>
        </Grid>
      )
    : ''
  )
};

export default ComplexItemsList;
