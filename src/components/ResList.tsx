import { FC, useState, useEffect, ChangeEvent } from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
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
  Typography
} from '@mui/material';
import {
  Edit,
  FilterAlt,
  RemoveRedEye,
  RestartAlt,
  Settings
} from '@mui/icons-material';

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
  UPDATED_KEY,
  SITE_URL,
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
    //console.log(filterData);
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
        // TODO: настроить тултипы иконкам
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
        <IconButton
          color="primary"
          aria-label="Показать фильтр"
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

      {/* // TODO: перенести шаблон карточки ресурса в отдельный компонент */}
      {Boolean(currentPageItems.length) && <Grid container spacing={2} sx={{ mb: 3 }}>
        {currentPageItems.map(item => (<Grid item key={item[RES_ID_KEY].toString()} xs={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>{item[PARENT_KEY][NAME_KEY]}, id: {item[PARENT_KEY][`${PARENT_KEY}_${RES_ID_KEY}`].toString()}</Typography>
              <Typography variant="h5" component="div">{item[NAME_KEY]}</Typography>
              <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{item[TEMPLATE_KEY][NAME_KEY]}</Typography>
              <Typography variant="body2">
                {TITLES[IS_PARENT_KEY]}: <Typography variant="body2" sx={{ color: 'text.secondary' }} component="span">{item[IS_PARENT_KEY] ? 'Да' : 'Нет'}</Typography><br />
                Опубликовано: <Typography variant="body2" sx={{ color: 'text.secondary' }} component="span">{item.publishedon.date}</Typography><br />
                Изменено: <Typography variant="body2" sx={{ color: 'text.secondary' }} component="span">{item.editedon.date}</Typography>
              </Typography>
            </CardContent>
            <CardActions>
            <ButtonGroup aria-label="outlined primary button group">
              <IconButton href={`${'http://stomistok.local/'}${item.uri}`} target="_blank"><RemoveRedEye /></IconButton>
              <IconButton href={`/${RES_KEY}/${item[RES_ID_KEY].toString()}`}><Settings /></IconButton>
              <IconButton href={`${'http://stomistok.local/'}manager/?a=resource/update&id=${item[RES_ID_KEY].toString()}`} target="_blank"><Edit /></IconButton>
            </ButtonGroup>
            </CardActions>
          </Card>
        </Grid>))}
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
