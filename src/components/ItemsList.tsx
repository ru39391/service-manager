import { FC, useEffect } from 'react';
import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import useTableData from '../hooks/useTableData';
import useCategoryItems from '../hooks/useCategoryItems';

import { CATEGORY_TITLE, NO_ITEMS_TITLE } from '../utils/constants';

import { useSelector } from '../services/hooks';

const ItemsList: FC = () => {
  const {
    depts,
    subdepts,
    groups,
    pricelist
  } = useSelector(state => state.pricelist);
  const {
    tableData,
    handleTableData
  } = useTableData();
  const {
    currSubcategory,
    subCategoryItems,
    categoryParams,
    setCurrSubcategory
  } = useCategoryItems();

  useEffect(() => {
    handleTableData({
      data: {
        depts,
        subdepts,
        groups,
        pricelist
      },
      category: currSubcategory,
      params: categoryParams
    });
  }, [
    depts,
    subdepts,
    groups,
    pricelist,
    currSubcategory,
    categoryParams
  ]);

  return (
    <>
      <Box sx={{ mb: 3 }}>
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
          onRowClick={({ columns, row }) => console.log(row/*{
            key: columns.length < 10 ? `${columns.length - 1}` : `${columns.length}`,
            id: row.item_id
          }*/)}
        />
        : <Typography sx={{ mb: 1, typography: 'body1' }}>{NO_ITEMS_TITLE}</Typography>
      }
    </>
  )
};

export default ItemsList;
