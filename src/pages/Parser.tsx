import { FC, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Breadcrumbs,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CloudUpload } from '@mui/icons-material';

import Layout from '../components/Layout';

import useTableData from '../hooks/useTableData';
import useCategoryItems from '../hooks/useCategoryItems';
import useFileUploader from '../hooks/useFileUploader';

import { useSelector } from '../services/hooks';

import type { TCustomData } from '../types';

import {
  CATEGORY_TITLE,
  DEFAULT_DOC_TITLE,
  NO_ITEMS_TITLE,
  TYPES,
  ITEM_KEY
} from '../utils/constants';

const InvisibleInput = styled('input')({
  overflow: 'hidden',
  position: 'absolute',
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  opacity: 0
});

const Parser: FC = () => {
  const {
    file,
    pricelist
  } = useSelector(state => ({
    file: state.file,
    pricelist: state.pricelist
  }));
  const { uploadFile } = useFileUploader();
  const { categoryTypes } = useCategoryItems();
  const { tableData, handleTableData } = useTableData();

  useEffect(() => {
    handleTableData({
      data: Object.values(TYPES).reduce((acc, key) => ({...acc, [key]: file[key]}), {}),
      category: TYPES[ITEM_KEY],
      params: null
    });
  }, [
    file
  ]);

  return (
    <Layout>
      <Grid item xs={3} sx={(theme) => ({ ...theme.custom.dFlexColumn })}>
        <Button component="label" variant="contained" startIcon={<CloudUpload />}>
          Загрузить файл
          <InvisibleInput type="file" accept=".xlsx, .xls" onChange={uploadFile} />
        </Button>
        <Box
          sx={{
            top: 24,
            height: '100vh',
            position: 'sticky',
            overflow: 'hidden',
            boxShadow: '4px 0 16px 0 rgba(0,0,0,.045)',
            bgcolor: 'background.default',
          }}
        >
        </Box>
      </Grid>
      <Grid
        item
        xs={9}
        sx={{
          pl: 3,
          pr: 2,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            mb: 1,
            gap: '0 8px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography variant="h5">{DEFAULT_DOC_TITLE}</Typography>
        </Box>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ mb: 4, typography: 'subtitle2' }}
        >
          <Link
            href="/"
            color="inherit"
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            Главная
          </Link>
          <Typography
            variant="subtitle2"
            color="text.primary"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            {DEFAULT_DOC_TITLE}
          </Typography>
        </Breadcrumbs>
        <Box
          sx={{
            mb: 3,
            gap: '0 8px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {/*
            {
              created: {
                depts: [],
                subdepts: [],
                groups: [],
                pricelist: []
              },
              updated: {
                depts: [],
                ...
              },
              removed: {
                ...
              }
            }
          */}
          {categoryTypes && <FormControl sx={{ minWidth: 200, backgroundColor: '#fff' }} size="small">
            <InputLabel id="demo-select-small-label">{CATEGORY_TITLE}</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={Object.values(categoryTypes)[Object.values(categoryTypes).length - 1]}
              label={CATEGORY_TITLE}
              onChange={({ target }) => console.log(target.value)}
            >
              {Object.values(categoryTypes).map(
                (item, index) => <MenuItem key={Object.keys(categoryTypes)[index]} value={item}>{item}</MenuItem>
              )}
            </Select>
          </FormControl>}
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
            onRowClick={({ row }: { row: TCustomData<string | number> }) => console.log(row)}
          />
          : <Typography sx={{ mb: 1, typography: 'body1' }}>{NO_ITEMS_TITLE}</Typography>
        }
      </Grid>
    </Layout>
  )
};

export default Parser;
