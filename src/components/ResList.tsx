import { FC, useState, useEffect } from 'react';
import {
  Breadcrumbs,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Grid,
  Typography
} from '@mui/material';
import { Edit, RemoveRedEye, Settings } from '@mui/icons-material';

import { useSelector } from '../services/hooks';
import { NAME_KEY, RES_ID_KEY, RES_KEY, SITE_URL } from '../utils/constants';

import type { TResourceData } from '../types';

const ResList: FC = () => {
  const [resList, setResList] = useState<TResourceData[]>([]);
  const { res } = useSelector(state => state.pricelist);

  useEffect(() => {
    setResList(res.filter((_, index) => index < 16));
  }, [
    res
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
          Главная
        </Typography>
      </Breadcrumbs>

      {Boolean(resList.length) && <Grid container spacing={2}>
        {resList.map(item => (<Grid item key={item[RES_ID_KEY].toString()} xs={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>{item.parent[NAME_KEY]}</Typography>
              <Typography variant="h5" component="div">{item[NAME_KEY]}</Typography>
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
    </>
  )
};

export default ResList;
