import { FC, useEffect } from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Button,
  IconButton
} from '@mui/material';
import {
  Add,
  DeleteOutlined
} from '@mui/icons-material';

import useComplex from '../hooks/useComplex';

import type { TItemData } from '../types';

import {
  ID_KEY,
  NAME_KEY,
  COMPLEX_KEY,
  QUANTITY_KEY,
  CAPTIONS,
  ADD_TITLE,
  REMOVE_TITLE,
  ADD_ACTION_KEY,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY
} from '../utils/constants';

type TQuantityInput = {
  input: EventTarget & (HTMLInputElement | HTMLTextAreaElement);
  [COMPLEX_KEY]: number;
  [ID_KEY]: number;
}

interface IComplexItemsList {
  itemId: number;
}

const ComplexItemsList: FC<IComplexItemsList> = ({ itemId }) => {
  const {
    complexItems,
    currComplexItems,
    handleComplexItem
  } = useComplex();

  const handleInput = (data: TQuantityInput) => {
    const { input } = data;

    input.value = input.value.replace(/\D/g, '');

    handleComplexItem({
      action: EDIT_ACTION_KEY,
      value: data[ID_KEY],
      [COMPLEX_KEY]: data[COMPLEX_KEY],
      [ID_KEY]: data[ID_KEY],
      [QUANTITY_KEY]: Number(input.value)
    });
  };

  return (
    <>
    {currComplexItems.map((complexItem, index, arr) =>
      <Grid key={complexItem[ID_KEY] && complexItem[ID_KEY].toString()} container spacing={2}>
        <Grid item xs={8}>
          <FormControl sx={{ my: 1 }} fullWidth>
            <InputLabel id={`${COMPLEX_KEY}-id-${index.toString()}`}>{CAPTIONS[NAME_KEY]}</InputLabel>
            <Select
              labelId={`${COMPLEX_KEY}-id-${index.toString()}`}
              id={`${COMPLEX_KEY}-select-${index.toString()}`}
              name={`${COMPLEX_KEY}-${NAME_KEY}-${index.toString()}`}
              value={complexItem[ID_KEY]}
              label={CAPTIONS[NAME_KEY]}
              onChange={({ target }) => handleComplexItem({
                action: EDIT_ACTION_KEY,
                value: target.value as number,
                [COMPLEX_KEY]: itemId,
                [ID_KEY]: complexItem[ID_KEY] as number,
                [QUANTITY_KEY]: 1
              })}
            >
              {complexItems.map(
                (item: TItemData) =>
                  <MenuItem
                    key={item[ID_KEY] && item[ID_KEY].toString()}
                    value={item[ID_KEY]}
                    disabled={arr.map(data => data[ID_KEY]).includes(item[ID_KEY])}
                  >
                    {item[NAME_KEY]} - {item[ID_KEY] && item[ID_KEY].toString()}
                  </MenuItem>
                )
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            id={`${COMPLEX_KEY}-input-${index.toString()}`}
            name={`${COMPLEX_KEY}-${QUANTITY_KEY}-${index.toString()}`}
            label={CAPTIONS[QUANTITY_KEY]}
            defaultValue={complexItem[QUANTITY_KEY]}
            fullWidth
            variant="outlined"
            type="text"
            sx={{ my: 1 }}
            onChange={({ target }) => handleInput({
              input: target,
              [COMPLEX_KEY]: itemId,
              [ID_KEY]: complexItem[ID_KEY] as number
            })}
          />
          <Tooltip
            placement="top"
            title={REMOVE_TITLE}
          >
            <IconButton
              sx={{ p: 1, color: 'text.secondary' }}
              onClick={() => handleComplexItem({
                action: REMOVE_ACTION_KEY,
                [COMPLEX_KEY]: itemId,
                [ID_KEY]: complexItem[ID_KEY] as number
              })}
            >
              <DeleteOutlined fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    )}
    <Button
      color="inherit"
      variant="outlined"
      startIcon={<Add />}
      disabled={complexItems.length === currComplexItems.length}
      onClick={() => handleComplexItem({
        action: ADD_ACTION_KEY,
        [COMPLEX_KEY]: itemId,
        [QUANTITY_KEY]: 1
      })}
    >
      {ADD_TITLE}
    </Button>
    </>
  )
};

export default ComplexItemsList;
