import { FC, Fragment } from 'react';
import {
  Card,
  CardContent,
  Typography,
} from '@mui/material';

import ListRow from './ListRow';

import type {
  TLinkedItem,
  TLinkedGroup,
  TLinkedSubdept,
  TLinkedDept
} from '../types';

import {
  ID_KEY,
  NAME_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  ITEM_KEY,
  TYPES
} from '../utils/constants';

interface IResLinkedItems {
  isLinkedListExist: boolean,
  linkedItems: TLinkedDept[];
}

const ResLinkedItems: FC<IResLinkedItems> = ({ isLinkedListExist, linkedItems }) => {
  if(!isLinkedListExist) {
    return (
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" color="textPrimary" component="div">Выбранные категории не содержат услуг</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
    {linkedItems.map(
      (dept) => <Card key={dept[ID_KEY].toString()} variant="outlined">
        <CardContent>
          <Typography variant="h6" color="textPrimary" component="div" sx={{ mb: .5 }}>{dept[NAME_KEY]}</Typography>
          {dept[TYPES[SUBDEPT_KEY]].map(
            (subdept: TLinkedSubdept) => <Fragment key={subdept[ID_KEY].toString()}>
              {[
                ...subdept[TYPES[ITEM_KEY]],
                ...subdept[TYPES[GROUP_KEY]].reduce((acc: TLinkedItem[], data: TLinkedGroup) => [...acc, ...data[TYPES[ITEM_KEY]]], [])
              ].length > 0
                && <Typography variant="subtitle1" color="textSecondary" component="div" sx={{ mb: .5 }}>{subdept[NAME_KEY]}</Typography>
              }
              <ListRow items={subdept[TYPES[ITEM_KEY]]} />

              {subdept[TYPES[GROUP_KEY]].length > 0 && subdept[TYPES[GROUP_KEY]].map(
                (group: TLinkedGroup) => <ListRow key={group[ID_KEY].toString()} caption={group[NAME_KEY]} items={group[TYPES[ITEM_KEY]]} />
              )}
            </Fragment>
          )}
        </CardContent>
      </Card>
    )}
    </>
  )
}

export default ResLinkedItems;
