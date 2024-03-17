import { FC, useEffect } from 'react';
import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

import useModal from '../hooks/useModal';
import useTableData from '../hooks/useTableData';
import useCategoryItems from '../hooks/useCategoryItems';

import {
  ADD_TITLE,
  CATEGORY_TITLE,
  NO_ITEMS_TITLE,
  ID_KEY,
  TYPES
} from '../utils/constants';

import { useSelector } from '../services/hooks';

import type { TCustomData } from '../types';

const ItemsList: FC = () => {
  const keys = Object.values(TYPES);
  const pricelistData = useSelector(state => state.pricelist);
  const {
    tableData,
    handleTableData
  } = useTableData();
  const {
    currSubcategory,
    subCategoryItems,
    categoryTypes,
    categoryParams,
    setCurrSubcategory
  } = useCategoryItems();
  const { toggleModal } = useModal();

  useEffect(() => {
    handleTableData({
      data: keys.reduce((acc, key) => ({...acc, [key]: pricelistData[key]}), {}),
      category: currSubcategory,
      params: categoryParams
    });
  }, [
    pricelistData,
    currSubcategory,
    categoryParams
  ]);

  const handleCurrChapter = () => {
    toggleModal({ title: `${ADD_TITLE} ${categoryTypes && categoryTypes[currSubcategory].toLocaleLowerCase()}`});
    console.log({
      type: currSubcategory,
      data: {...categoryParams}
    });
  }

  return (
    <>
      <Box
        sx={{
          mb: 3,
          gap: '0 8px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <FormControl sx={{ minWidth: 200, backgroundColor: '#fff' }} size="small">
          <InputLabel id="demo-select-small-label">{CATEGORY_TITLE}</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={currSubcategory}
            label={CATEGORY_TITLE}
            onChange={({ target }) => setCurrSubcategory(target.value)}
          >
            {subCategoryItems.map((item) => <MenuItem key={Object.keys(item)[0]} value={Object.keys(item)[0]}>{Object.values(item)[0]}</MenuItem>)}
          </Select>
        </FormControl>
        <Tooltip
          placement="top"
          title={ADD_TITLE}
        >
          <IconButton
            sx={{ p: 0, color: 'text.secondary' }}
            onClick={() => handleCurrChapter()}
          >
            <AddCircleOutline fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>
      {tableData !== null
        ? <DataGrid
          sx={{
            border: 0,
            flexGrow: 1,
            height: 'auto',
            boxShadow: '0 2px 10px 0 rgba(0,0,0,.045)',
            bgcolor: 'background.default',
          }}
          columns={tableData ? tableData.cols : []}
          rows={tableData ? tableData.rows : []}
          onRowClick={({ row }) => console.log({
            type: currSubcategory,
            data: pricelistData[currSubcategory].find((item: TCustomData<string | number>) => item[ID_KEY] === row[ID_KEY])
          })}
        />
        : <Typography sx={{ mb: 1, typography: 'body1' }}>{NO_ITEMS_TITLE}</Typography>
      }
    </>
  )
};

export default ItemsList;
