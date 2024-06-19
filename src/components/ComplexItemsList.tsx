import { FC, useEffect } from 'react';
import { Grid, TextField } from '@mui/material';

import useComplex from '../hooks/useComplex';

import type { TItemData, TCustomData } from '../types';

import {
  ID_KEY,
  NAME_KEY,
  TITLES,
  CAPTIONS
} from '../utils/constants';

interface IComplexItemsList {
  complexItemId: number;
  isComplexItemsVisible: number;
}

const ComplexItemsList: FC<IComplexItemsList> = ({ complexItemId, isComplexItemsVisible }) => {
  const {
    currComplexList,
    handleCurrComplexList
  } = useComplex();

  useEffect(() => {
    handleCurrComplexList({complexItemId, isListVisible: isComplexItemsVisible});
  }, [
    isComplexItemsVisible
  ]);

  return (
    isComplexItemsVisible
    ? currComplexList.map(
      ({ item_id, name }) =>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <TextField
              key={item_id && item_id.toString()}
              id={item_id as string}
              name={NAME_KEY}
              label={CAPTIONS[NAME_KEY]}
              defaultValue={`${name} - ${item_id}`}
              sx={{ mb: 1 }}
              fullWidth
              variant="outlined"
              margin="dense"
              type="text"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-number"
              label="Number"
              fullWidth
              variant="outlined"
              margin="dense"
              type="text"
            />
          </Grid>
        </Grid>
      )
    : ''
  )
};

export default ComplexItemsList;
