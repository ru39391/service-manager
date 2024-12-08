import { FC } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

import type { TLinkedItem } from '../types';

import {
  ID_KEY,
  NAME_KEY,
  PRICE_KEY
} from '../utils/constants';

interface IListRow {
  caption: string | undefined;
  items: TLinkedItem[];
}

const ListRow: FC<IListRow> = ({
  caption,
  items
}) => {
  if(items.length === 0) {
    return '';
  }

  return (
    <>
      {caption && <Typography variant="body2" component="div" sx={{ mb: .5 }}>{caption}</Typography>}
      <List sx={{ pt: 0 }}>{items.map(
        (item: TLinkedItem) => <ListItem
          key={item[ID_KEY].toString()}
          sx={{ py: 0 }}
        >
          <ListItemText primary={item[NAME_KEY]} />
          <Typography variant="body2" color="textSecondary" component="div">{item[PRICE_KEY].toString()} руб.</Typography>
        </ListItem>
      )}</List>
    </>
  )
};

export default ListRow;
