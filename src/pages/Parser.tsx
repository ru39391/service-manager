import {
  FC,
  Fragment,
  useState,
  useEffect,
  useCallback
} from 'react';
import { styled } from '@mui/material/styles';
import {
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Collapse,
  Grid,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CloudUpload, FolderOpen, Sync } from '@mui/icons-material';

import Layout from '../components/Layout';
import Modal from '../components/Modal';
import FileDataForm from '../components/FileDataForm';

import useModal from '../hooks/useModal';
import useTableData from '../hooks/useTableData';
import useCategoryItems from '../hooks/useCategoryItems';
import useFileUploader from '../hooks/useFileUploader';
import useDataComparer from '../hooks/useDataComparer';
import useFileDataNav from '../hooks/useFileDataNav';

import { useSelector, useDispatch } from '../services/hooks';

import { handlePricelistData } from '../services/actions/pricelist';

import type { TCustomData, TPricelistData, TItemData } from '../types';

import {
  ADD_ACTION_KEY,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY,
  CREATED_KEY,
  UPDATED_KEY,
  REMOVED_KEY,
  HANDLED_ITEMS_CAPTIONS,
  DEFAULT_DOC_TITLE,
  NO_FILE_ITEMS_TITLE,
  FILE_ITEMS_TITLE,
  APPLY_TITLE,
  ADD_TITLE,
  EDIT_TITLE,
  REMOVE_TITLE,
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

// TODO: настроить обновление массива данных файла после успешной операции
const Parser: FC = () => {
  const [currCategory, setCurrCategory] = useState<string>(CREATED_KEY);

  const {
    file,
    form: { isVisible: isModalVisible }
  } = useSelector(state => ({
    file: state.file,
    form: state.form
  }));

  const dispatch = useDispatch();
  const { toggleModal } = useModal();
  const { uploadFile } = useFileUploader();
  const { comparedFileData, compareFileData } = useDataComparer();
  const { currSubCategory, categoryTypes, setCurrSubCategory } = useCategoryItems();
  const { fileDataNav, updateFileDataNav } = useFileDataNav();
  const { tableData, handleTableData } = useTableData();

  const setDataItems = (isEmpty: boolean = true): TPricelistData => Object.values(TYPES).reduce((acc, key) => ({...acc, [key]: isEmpty ? [] : file[key]}), {});

  const handleComparedData = useCallback(() => {
    const keys = {
      [CREATED_KEY]: ADD_ACTION_KEY,
      [UPDATED_KEY]: EDIT_ACTION_KEY,
      [REMOVED_KEY]: REMOVE_ACTION_KEY
    };

    dispatch(handlePricelistData({
      action: keys[currCategory],
      alias: currSubCategory,
      items: comparedFileData
        ? comparedFileData[currCategory][currSubCategory]
        : setDataItems()[currSubCategory],
    }));
  }, [
    dispatch,
    currCategory,
    currSubCategory,
    comparedFileData
  ]);

  const selectFileCategory = ({ category, subCategory }: TCustomData<string>): void => {
    setCurrCategory(category);
    setCurrSubCategory(subCategory);
    handleTableData(
      {
        data: comparedFileData
          ? comparedFileData[category]
          : setDataItems(),
        category: subCategory,
        params: null
      },
      setDataItems(false)
    );
  };

  const setConfirmModalVisible = ({currCategory, currSubCategory}: TCustomData<string>): void => {
    const keys = {
      [CREATED_KEY]: ADD_TITLE,
      [UPDATED_KEY]: EDIT_TITLE,
      [REMOVED_KEY]: REMOVE_TITLE
    };

    toggleModal({ title: `${keys[currCategory]} ${categoryTypes && categoryTypes[currSubCategory].toLowerCase()}` })
  }

  useEffect(() => {
    compareFileData(setDataItems(false));
  }, [
    file
  ]);

  useEffect(() => {
    updateFileDataNav(comparedFileData);
  }, [
    comparedFileData
  ]);

  useEffect(() => {
    selectFileCategory({
      category: currCategory,
      subCategory: currSubCategory
    });
  }, [
    fileDataNav
  ]);

  /*
  const updateComparedFileData = ({ action, key, ids }) => {
    const keys = {
      [ADD_ACTION_KEY]: CREATED_KEY,
      [EDIT_ACTION_KEY]: UPDATED_KEY,
      [REMOVE_ACTION_KEY]: REMOVED_KEY
    };

    handleComparedFileData({ key: keys[action], type: key, ids });
  }

  useEffect(() => {
    updateComparedFileData(payload);
  }, [
    payload
  ]);
  */

  return (
    <>
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
                        onClick={() => selectFileCategory({ category: key, subCategory: item.key as string })}
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
          <Typography variant="h5" sx={{ mb: 1 }}>{DEFAULT_DOC_TITLE}</Typography>
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
              {HANDLED_ITEMS_CAPTIONS[currCategory]}, {categoryTypes && categoryTypes[currSubCategory].toLowerCase()}
            </Typography>
          </Breadcrumbs>

          <Box
            sx={{
              mb: 2,
              gap: '0 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography sx={{ typography: 'body1' }}>{tableData !== null ? `${FILE_ITEMS_TITLE} ${tableData.rows.length}` : NO_FILE_ITEMS_TITLE}</Typography>
            {tableData && tableData.rows.length > 0
              ? <Button
                variant="outlined"
                startIcon={<Sync />}
                onClick={() => setConfirmModalVisible({currCategory, currSubCategory})}
              >
                {APPLY_TITLE}
              </Button>
              : ''
            }
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
              // TODO: настроить отображение подробных данных (нужна ли форма для обновления?), возможность удалять лишние записи
              onRowClick={({ row }: { row: TItemData }) => console.log(row)}
            />
            : ''
          }
        </Grid>
      </Layout>
      {isModalVisible
        ? <Modal
            fc={FileDataForm}
            payload={{
              action: currCategory,
              counter: tableData ? tableData.rows.length : 0,
              actionHandler: handleComparedData
            }}
          />
        : ''
      }
    </>
  )
};

export default Parser;
