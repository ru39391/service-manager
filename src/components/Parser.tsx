import React, { FC, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CloudUpload } from '@mui/icons-material';

import useTableData from '../hooks/useTableData';
import useFileUploader from '../hooks/useFileUploader';

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
    deptsTableData,
    subdeptsTableData,
    groupsTableData,
    itemsTableData,
    setTableData
  } = useTableData();
  const {
    depts,
    subdepts,
    groups,
    items,
    uploadFile
  } = useFileUploader();

  useEffect(() => {
    setTableData({depts, subdepts, groups, items});
  }, [
    depts,
    subdepts,
    groups,
    items
  ]);

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Button component="label" variant="contained" startIcon={<CloudUpload />}>
          Загрузить файл
          <InvisibleInput type="file" accept=".xlsx, .xls" onChange={uploadFile} />
        </Button>
      </Box>

      {[
        //deptsTableData,
        //subdeptsTableData,
        //groupsTableData,
        itemsTableData
      ].map((data, index) => Boolean(data) && <DataGrid
        key={index}
        sx={{
          border: 0,
          flexGrow: 1,
          boxShadow: '0 2px 10px 0 rgba(0,0,0,.045)',
          bgcolor: 'background.default',
        }}
        columns={data ? data.cols : []}
        rows={data ? data.rows : []}
        onRowClick={({ row }) => console.log(row)}
      />)}

      {/*      
        slots={{ noRowsOverlay: NoRowsOverlay }}
      */}
    </>
  );
}

export default Parser;