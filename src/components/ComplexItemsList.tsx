import { FC, useEffect } from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  IconButton
} from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';

import useComplex from '../hooks/useComplex';

import type { TItemData, TCustomData } from '../types';

import {
  ID_KEY,
  NAME_KEY,
  COMPLEX_KEY,
  QUANTITY_KEY,
  CAPTIONS,
  REMOVE_TITLE,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY
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
    handleComplexData,
    hadnleComplexItem
  } = useComplex();

  useEffect(() => {
    handleComplexData({itemId, complex, isListVisible: isComplexListVisible});
  }, [
    isComplexListVisible
  ]);

  return (
    // TODO: настроить удаление/добавление элементов списка комплексных услуг
    isComplexListVisible
    ? currComplexItems.map(
      (complexItem, index, arr) =>
        <Grid key={complexItem[ID_KEY] && complexItem[ID_KEY].toString()} container spacing={2}>
          <Grid item xs={8}>
            <FormControl sx={{ my: 1 }} fullWidth>
              <InputLabel id={`${COMPLEX_KEY}-id-${index.toString()}`}>{CAPTIONS[NAME_KEY]}</InputLabel>
              {/* // TODO: настроить изменение значения списка при выборе нового значения */}
              <Select
                labelId={`${COMPLEX_KEY}-id-${index.toString()}`}
                id={`${COMPLEX_KEY}-select-${index.toString()}`}
                name={`${COMPLEX_KEY}-${NAME_KEY}-${index.toString()}`}
                value={complexItem[ID_KEY]}
                label={CAPTIONS[NAME_KEY]}
                onChange={({ target }) => hadnleComplexItem({
                  ...target,
                  action: EDIT_ACTION_KEY,
                  [ID_KEY]: complexItem[ID_KEY],
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
            {/* // TODO: настроить валидацию вводимого значения */}
            <TextField
              id={`${COMPLEX_KEY}-input-${index.toString()}`}
              name={`${COMPLEX_KEY}-${QUANTITY_KEY}-${index.toString()}`}
              label={CAPTIONS[QUANTITY_KEY]}
              defaultValue={complexItem[QUANTITY_KEY]}
              fullWidth
              variant="outlined"
              type="text"
              sx={{ my: 1 }}
              onChange={({ target }) => console.log({
                value: target.value,
                [ID_KEY]: complexItem[ID_KEY]
              })}
            />
            <Tooltip
              placement="top"
              title={REMOVE_TITLE}
            >
              <IconButton
                sx={{ p: 1, color: 'text.secondary' }}
                onClick={() => hadnleComplexItem({
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
      )
    : ''
  )
};

export default ComplexItemsList;
