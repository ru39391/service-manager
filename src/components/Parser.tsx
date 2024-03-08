import { FC, useState, useEffect, SyntheticEvent } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Tab, Tabs, Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CloudUpload } from '@mui/icons-material';

import TabPanel from './TabPanel';
import Popup from './Popup';

import useTableData from '../hooks/useTableData';
import useFileUploader from '../hooks/useFileUploader';

import { useSelector, useDispatch } from '../services/hooks';
import { createPricelistData } from '../services/actions/pricelist';

import { TITLES, TYPES, ITEM_KEY } from '../utils/constants';

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
  const [tabValue, setTabValue] = useState(0);

  const { depts, subdepts, groups, items, rowData } = useSelector(state => state.file);
  const dispatch = useDispatch();

  const {
    deptsTableData,
    subdeptsTableData,
    groupsTableData,
    itemsTableData
  } = useTableData();
  const {
    uploadFile,
    getRowData
  } = useFileUploader();

  //@ts-expect-error
  const handleTab = (event: SyntheticEvent, value: number) => {
    setTabValue(value);
  };

  const createDepts = () => {
    dispatch(createPricelistData({
      depts,
      subdepts,
      groups,
      [TYPES[ITEM_KEY]]: items
    }));
  };

  useEffect(() => {
    //console.log(rowData);
  }, [
    rowData
  ]);

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Button component="label" variant="contained" startIcon={<CloudUpload />}>
          Загрузить файл
          <InvisibleInput type="file" accept=".xlsx, .xls" onChange={uploadFile} />
        </Button>
      </Box>

      <Grid container>
        <Grid item xs={2}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tabValue}
            onChange={handleTab}
          >
            {[
              deptsTableData,
              subdeptsTableData,
              groupsTableData,
              itemsTableData
            ].map((_, index) => Object.values(TITLES)[index]).map((item, index) => Boolean(item) && <Tab
              key={index}
              label={item}
              id={`vertical-tab-${index}`}
              aria-controls={`vertical-tabpanel-${index}`}
              sx={{ alignItems: 'flex-start' }} />)}
          </Tabs>
          {Boolean(deptsTableData) && <Button component="label" variant="contained" onClick={createDepts}>Сохранить</Button>}
        </Grid>
        <Grid item xs={10}>
          {[
            deptsTableData,
            subdeptsTableData,
            groupsTableData,
            itemsTableData
          ].map((data, index) => Boolean(data) && <TabPanel key={index} value={tabValue} index={index}>
            <DataGrid
              sx={{
                border: 0,
                flexGrow: 1,
                boxShadow: '0 2px 10px 0 rgba(0,0,0,.045)',
                bgcolor: 'background.default',
              }}
              columns={data ? data.cols : []}
              rows={data ? data.rows : []}
              onRowClick={({ columns, row }) => getRowData({
                key: columns.length < 10 ? `${columns.length - 1}` : `${columns.length}`,
                id: row.item_id
              })}
            />
          </TabPanel>)}
        </Grid>
      </Grid>

      {Boolean(rowData) && <Popup data={rowData} close={() => getRowData(null)} />}

      {/*
        slots={{ noRowsOverlay: NoRowsOverlay }}
      */}
    </>
  );
}

export default Parser;
