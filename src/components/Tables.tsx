import { FC, useState, useEffect, SyntheticEvent } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Tab, Tabs, Box, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CloudUpload } from '@mui/icons-material';

import TabPanel from './TabPanel';

import useTableData from '../hooks/useTableData';
import useFileUploader from '../hooks/useFileUploader';

import { useSelector, useDispatch } from '../services/hooks';
import { handlePricelistData } from '../services/actions/pricelist';

import type { TCustomData, TItemsArr } from '../types';

import {
  NO_ITEMS_TITLE,
  TITLES,
  TYPES,
  ITEM_KEY,
  NAME_KEY,
  ID_KEY
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

const Tables: FC = () => {
  const [tabValue, setTabValue] = useState<number>(0);
  const [createdItems, setCreatedItems] = useState<TItemsArr>([]);
  const [removedItems, setRemovedItems] = useState<TItemsArr>([]);

  const { tableData, handleTableData } = useTableData();

  const {
    file,
    pricelist
  } = useSelector(state => ({
    file: state.file,
    pricelist: state.pricelist
  }));
  // : { pricelist: items }
  const {
    uploadFile,
    getRowData
  } = useFileUploader();

  const handleItems = ({ fileItems, items }: TCustomData<TItemsArr>) => {
    /*
    console.log({ fileItems: fileItems.length, items: items.length });
    const fileItemIds = fileItems.map(item => item[ID_KEY] as number);
    const itemIds = items.map(item => item[ID_KEY] as number);

    setCreatedItems(fileItems.filter(item => !itemIds.includes(item[ID_KEY] as number)));
    setRemovedItems(items.filter(item => !fileItemIds.includes(item[ID_KEY] as number)));
    */
  }

  /*
  const dispatch = useDispatch();

  const {
    deptsTableData,
    subdeptsTableData,
    groupsTableData,
    itemsTableData
  } = useTableData();

  //@ts-expect-error
  const handleTab = (event: SyntheticEvent, value: number) => {
    setTabValue(value);
  };

  const createDepts = () => {
    dispatch(handlePricelistData({
      depts,
      subdepts,
      groups,
      [TYPES[ITEM_KEY]]: items
    }));
  };
  */

  useEffect(() => {
    handleTableData({
      data: Object.values(TYPES).reduce((acc, key) => ({...acc, [key]: file[key]}), {}),
      category: TYPES[ITEM_KEY],
      params: null
    });
  }, [
    file
  ]);

  useEffect(() => {
    //handleItems({ fileItems, items });
  }, [
    //rowData
    //depts, subdepts, groups, items, rowData
    /*
    fileItems,
    items
    */
  ]);

  useEffect(() => {
    console.log({ createdItems: createdItems.length, removedItems: removedItems.length });
  }, [
    createdItems,
    removedItems
  ]);

  return (
    <>
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
        {/*
        {createdItems.length
          ? <>
              <Typography variant="h5">Добавлено:</Typography>
              <ul>{createdItems.map((item, index) => (<li key={item[ID_KEY]}>{index + 1}. <b>{item[NAME_KEY].toString().length}</b>: {JSON.stringify(item)}</li>))}</ul>
            </>
          : ''
        }
        */}
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
            onRowClick={({ row }: { row: TCustomData<string | number> }) => handleItemData(row)}
          />
          : <Typography sx={{ mb: 1, typography: 'body1' }}>{NO_ITEMS_TITLE}</Typography>
        }
      </Grid>
      {/*
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
                height: 'auto',
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
      */}
    </>
  );
}

export default Tables;
