import {
  FC,
  Fragment,
  useState,
  useEffect
} from 'react';
import { styled } from '@mui/material/styles';
import {
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Collapse,
  FormControl,
  Grid,
  InputLabel,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CloudUpload, FolderOpen } from '@mui/icons-material';

import Layout from '../components/Layout';

import useTableData from '../hooks/useTableData';
import useCategoryItems from '../hooks/useCategoryItems';
import useFileUploader from '../hooks/useFileUploader';
import useDataComparer from '../hooks/useDataComparer';
import useFileDataNav from '../hooks/useFileDataNav';

import { useSelector } from '../services/hooks';

import type { TCustomData } from '../types';
import type { TCategoryData } from '../hooks/useTableData';

import {
  DEFAULT_DOC_TITLE,
  NO_ITEMS_TITLE,
  CREATED_KEY,
  TYPES
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
  const [currCategory, setCurrCategory] = useState(CREATED_KEY);

  const file = useSelector(state => state.file);

  const { uploadFile } = useFileUploader();
  const { comparedFileData, compareFileData } = useDataComparer();
  const { currSubCategory, categoryTypes, setCurrSubCategory } = useCategoryItems();
  const { fileDataNav, updateFileDataNav } = useFileDataNav();
  const { tableData, handleTableData } = useTableData();

  const selectFileCategory = ({ key, data }: { key: string; data: TCategoryData; }): void => {
    setCurrCategory(key);
    setCurrSubCategory(data.category as string);
    handleTableData(data);
  };

  useEffect(() => {
    compareFileData(Object.values(TYPES).reduce((acc, key) => ({...acc, [key]: file[key]}), {}));
  }, [
    file
  ]);

  useEffect(() => {
    updateFileDataNav(comparedFileData);
  }, [
    comparedFileData
  ]);

  return (
    <Layout>
      <Grid item xs={3} sx={(theme) => ({ ...theme.custom.dFlexColumn })}>
        <Box
          sx={{
            top: 24,
            height: '100%',
            maxHeight: '100vh',
            position: 'sticky',
            overflow: 'hidden',
            boxShadow: '4px 0 16px 0 rgba(0,0,0,.045)',
            bgcolor: 'background.default',
          }}
        >
          <Button
            sx={{
              mb: 2,
              width: '100%',
            }}
            component="label"
            variant="contained"
            startIcon={<CloudUpload />}
          >
            Загрузить файл
            <InvisibleInput type="file" accept=".xlsx, .xls" onChange={uploadFile} />
          </Button>
          {fileDataNav.map(({ key, caption, counter, data }) =>
            (<Fragment key={key}>
              <ListItemButton
                selected={true}
                sx={{ py: 0.5 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ListItemIcon><FolderOpen fontSize="small" sx={{ color: 'info.light' }} /></ListItemIcon>
                  <ListItemText
                    primary={caption}
                    sx={{ mr: 3 }}
                  />
                  <Badge badgeContent={counter} color="primary" />
                </Box>
              </ListItemButton>
              {categoryTypes && counter > 0 && <Collapse in={true} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {data.map(
                    (item) =>
                    <ListItemButton
                      key={categoryTypes[item.key as string]}
                      selected={currCategory === key && currSubCategory === item.key as string}
                      sx={{
                        pl: 6,
                        color: 'grey.600',
                        fontSize: 14,
                      }}
                      onClick={() => selectFileCategory({
                        key,
                        data: {
                          data: comparedFileData
                            ? comparedFileData[key]
                            : Object.values(TYPES).reduce((acc, key) => ({...acc, [key]: []}), {}),
                          category: item.key as string,
                          params: null
                        }
                      })}
                    >
                      <ListItemText
                        disableTypography
                        primary={categoryTypes[item.key as string]}
                        sx={{ m: 0, mr: 2, flexGrow: 0 }}
                      />
                      <Badge badgeContent={item.counter as number} color="default" showZero />
                    </ListItemButton>
                  )}
                </List>
              </Collapse>}
            </Fragment>)
          )}
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
