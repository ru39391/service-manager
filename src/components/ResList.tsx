import { FC, useEffect, ChangeEvent } from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { FilterAlt, RestartAlt } from '@mui/icons-material';

import ResCard from './ResCard';

import useFilter from '../hooks/useFilter';
import usePagination from '../hooks/usePagination';

import {
  TITLES,
  NAME_KEY,
  RES_ID_KEY,
  RES_KEY,
  PARENT_KEY,
  TEMPLATE_KEY,
  IS_PARENT_KEY,
  UPDATED_KEY
} from '../utils/constants';

import type { TResParent, TResTemplate } from '../types';

const ResList: FC = () => {
  const {
    currentPage,
    currentPageCounter,
    currentPageItems,
    currentItemsMess,
    setCurrentPage,
    handlePageItems
  } = usePagination();
  const {
    filterData,
    isFilterVisible,
    filterResultList,
    parentsList,
    templatesList,
    handleFilterData,
    setFilterVisibility
  } = useFilter();

  useEffect(() => {
    handlePageItems(filterResultList, currentPage);
  }, [
    filterResultList,
    currentPage
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    filterData
  ]);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 1 }}>Управление ресурсами</Typography>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 4, typography: 'subtitle2' }}
      >
        <Typography
          variant="subtitle2"
          color="text.primary"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          Страница: {currentPage} из {currentPageCounter}
        </Typography>
      </Breadcrumbs>

      {/*
        // TODO: перенести фильтр в отдельный компонент
      */}
      <Box
        sx={{
          mt: 0,
          mb: isFilterVisible ? 1.25 : 3,
          gap: '0 8px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <TextField
          id={`${RES_KEY}_${NAME_KEY}`}
          name={`${RES_KEY}_${NAME_KEY}`}
          label=""
          sx={{ my: 0, backgroundColor: '#fff' }}
          fullWidth
          variant="outlined"
          margin="dense"
          type="text"
          placeholder="Искать по названию"
          value={filterData && filterData[NAME_KEY] ? filterData[NAME_KEY] : ''}
          onChange={({ target }) => handleFilterData({ [NAME_KEY]: target.value })}
        />
        <Tooltip
          placement="top"
          title={`${isFilterVisible ? 'Скрыть' : 'Показать'} фильтр`}
        >
          <IconButton
            color="primary"
            aria-label={`${isFilterVisible ? 'Скрыть' : 'Показать'} фильтр`}
            onClick={() => {
              handleFilterData(
                filterData && filterData[NAME_KEY]
                  ? { [NAME_KEY]: filterData[NAME_KEY], [UPDATED_KEY]: 1 }
                  : null
              );
              setFilterVisibility(!isFilterVisible);
            }}
            size="large"
          >
            <FilterAlt fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Box>
      {isFilterVisible && <Grid
        container
        spacing={2}
        sx={{ mb: 3 }}
      >
        {[{
          key: PARENT_KEY,
          id: `${PARENT_KEY}_${RES_ID_KEY}`,
          items: parentsList
        }, {
          key: TEMPLATE_KEY,
          id: `${TEMPLATE_KEY}_${RES_ID_KEY}`,
          items: templatesList
        }].map(({ key, id, items }) => (<Grid key={key} item xs={4}>
          <FormControl sx={{ my: 0 }} fullWidth>
            <InputLabel id={`${key}-label`}>{TITLES[key]}</InputLabel>
            <Select
              labelId={`${key}-label`}
              id={key}
              name={key}
              value={filterData && filterData[key] ? filterData[key] : ''}
              label={TITLES[key]}
              sx={{ backgroundColor: '#fff' }}
              onChange={({ target }) => handleFilterData({ [key]: target.value })}
            >
              {items.map(
                (item: TResParent | TResTemplate) =>
                  <MenuItem
                    key={item[id].toString()}
                    value={item[id]}
                  >
                    {item[NAME_KEY]} - {item[id].toString()}
                  </MenuItem>
                )
              }
            </Select>
          </FormControl>
        </Grid>))}
        <Grid
          item
          xs={2}
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <FormControlLabel
            label={TITLES[IS_PARENT_KEY]}
            control={
              <Checkbox
                checked={Boolean(filterData && filterData[IS_PARENT_KEY])}
                onChange={({ target }) => handleFilterData({ [IS_PARENT_KEY]: Number(target.checked) })}
              />
            }
          />
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            variant="contained"
            startIcon={<RestartAlt />}
            disabled={!filterData}
            onClick={() => handleFilterData(null)}
            size="large"
          >
            Сбросить
          </Button>
        </Grid>
      </Grid>}

      {Boolean(filterData) && <Typography sx={{ typography: 'body1', mb: 2 }}>{currentItemsMess}</Typography>}
      {currentPageItems.length > 0 && <Grid container spacing={2} sx={{ mb: 3 }}>
        {currentPageItems.map(item => (<Grid item key={item[RES_ID_KEY].toString()} xs={4}><ResCard item={item} /></Grid>))}
      </Grid>}
      {Boolean(currentPageCounter) && currentPageCounter > 1
        && <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              size="large"
              color="primary"
              count={currentPageCounter}
              onChange={(event: ChangeEvent<unknown>, value: number) => setCurrentPage(value)}
            />
          </Box>
      }
    </>
  )
};

export default ResList;
