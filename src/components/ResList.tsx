import { FC, useState, useEffect, ChangeEvent } from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Grid,
  Pagination,
  TextField,
  Typography
} from '@mui/material';
import { Edit, RemoveRedEye, Settings } from '@mui/icons-material';

import useFilter from '../hooks/useFilter';
import usePagination from '../hooks/usePagination';

import { useSelector } from '../services/hooks';
import {
  CAPTIONS,
  NAME_KEY,
  RES_ID_KEY,
  RES_KEY,
  SITE_URL,
  PAGE_COUNTER
} from '../utils/constants';

import type { TResourceData } from '../types';

const ResList: FC = () => {
  const { res } = useSelector(state => state.pricelist);
  const {
    currentPage,
    currentPageCounter,
    currentPageItems,
    setCurrentPage,
    handlePageItems
  } = usePagination();
  const {
    filterData,
    parentsList,
    templatesList,
    filterResultList,
    handleFilterData
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

  useEffect(() => {
    //console.log(templatesList);
  }, [
    //templatesList
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
          {currentPageCounter && currentPageCounter > PAGE_COUNTER ? `Страница: ${currentPage}` : 'Главная'}
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
        <TextField
          id={`${RES_KEY}_${NAME_KEY}`}
          name={`${RES_KEY}_${NAME_KEY}`}
          label=""
          sx={{ mb: 1, backgroundColor: '#fff' }}
          fullWidth
          variant="outlined"
          margin="dense"
          type="text"
          placeholder="Искать по названию"
          onChange={({ target }) => handleFilterData(target.value.length ? { value: target.value } : null)}
        />
      </Box>

      {Boolean(currentPageItems.length) && <Grid container spacing={2} sx={{ mb: 3 }}>
        {currentPageItems.map(item => (<Grid item key={item[RES_ID_KEY].toString()} xs={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>{item.parent[NAME_KEY]}</Typography>
              <Typography variant="h5" component="div">{res.indexOf(item).toString()}. {item[NAME_KEY]}</Typography>
              <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{item.template[NAME_KEY]}</Typography>
              <Typography variant="body2">
                Категория: <Typography variant="body2" sx={{ color: 'text.secondary' }} component="span">{item.isParent ? 'Да' : 'Нет'}</Typography><br />
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
      {currentPageCounter && currentPageCounter > PAGE_COUNTER
        ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              size="large"
              color="primary"
              count={currentPageCounter}
              onChange={(event: ChangeEvent<unknown>, value: number) => setCurrentPage(value)}
            />
          </Box>
        : ''
      }
    </>
  )
};

export default ResList;
