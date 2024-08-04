import { FC, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CloudUpload } from '@mui/icons-material';

import Layout from '../components/Layout';

import useTableData from '../hooks/useTableData';
import useFileUploader from '../hooks/useFileUploader';

import { useSelector } from '../services/hooks';

import type { TCustomData } from '../types';

import {
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
