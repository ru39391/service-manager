import { FC, Fragment, useEffect } from 'react';
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  FormControlLabel,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { styled, lighten, darken } from '@mui/system';
import { Done } from '@mui/icons-material';


import useForm from '../hooks/useForm';
import useResLinks from '../hooks/useResLinks';

import { useSelector } from '../services/hooks';

import {
  ID_KEY,
  NAME_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  ITEM_KEY,
  TYPES,
  TITLES,
  CATEGORY_TITLE,
  CATEGORY_KEY,
} from '../utils/constants';
import { TItemData } from '../types';

const GroupHeader = styled('div')(({ theme }) => ({
  zIndex: 1,
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor: lighten(theme.palette.primary.light, 0.85),
  ...theme.applyStyles('dark', { backgroundColor: darken(theme.palette.primary.main, 0.8) }),
}));

const GroupList = styled('ul')({ padding: 0, zIndex: 1 });

const ResItem: FC = () => {
  const {
    linkedDepts,
    linkedSubdepts,
    linkedGroups,

    existableDepts,
    existableSubdepts,
    existableGroups,
    existableItems,

    resLinkHandlers,
    isLinkedItemActive
  } = useResLinks();

  useEffect(() => {
    //console.log(linkedDepts);
  }, [
    linkedDepts
  ]);

  return (
    <>
    {existableDepts.length > 0
      && <Box
        sx={{
          mb: 2,
          gap: 1,
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {existableDepts.map(
          (data) => <Chip
            key={data[ID_KEY].toString()}
            label={data[NAME_KEY]}
            variant="outlined"
            onClick={() => resLinkHandlers[TYPES[DEPT_KEY]]({ data })}
            {...( isLinkedItemActive(linkedDepts, data) && { color: 'primary', icon: <Done />, sx: { backgroundColor: '#fff' } } )}
          />
        )}
      </Box>}

      {existableSubdepts.length > 0 && <Autocomplete
        multiple
        filterSelectedOptions
        id={`${SUBDEPT_KEY}-selecter`}
        sx={{ backgroundColor: '#fff' }}
        value={linkedSubdepts}
        options={existableSubdepts}
        getOptionLabel={(option) => option[NAME_KEY] as string}
        groupBy={(option) => option[CATEGORY_KEY] as string}
        renderInput={(props) => <TextField {...props} label={[TITLES[SUBDEPT_KEY]]} />}
        renderOption={(props, option) => <ListItem {...props}>{option[NAME_KEY]}</ListItem>}
        renderGroup={(props) => (
          <li key={props.key}>
            <GroupHeader>{props.group}</GroupHeader>
            <GroupList>{props.children}</GroupList>
          </li>
        )}
        getOptionKey={(option) => option[ID_KEY]}
        onChange={(event, value, reason ) => resLinkHandlers[TYPES[SUBDEPT_KEY]]({ items: reason === 'clear' ? [] : value })}
      />}

      {/*existableSubdepts.length > 0


        renderTags={
          (value, getTagProps) => (value.map(
            (item, index) => <Chip
              {...getTagProps({ index })}
              key={item[ID_KEY].toString()}
              label={item[NAME_KEY]}
              onDelete={() => resLinkHandlers[TYPES[SUBDEPT_KEY]](item)}
            />
          ))
        }

      <Chip {...getTagProps(index)} label={value[NAME_KEY]} data-item={JSON.stringify(item)} onDelete={() => console.log(getTagProps(index))} />
        && <Box
          sx={{
            mb: 2,
            gap: 1,
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {existableSubdepts.map(
            (item) => <Chip
              key={item[ID_KEY].toString()}
              label={item[NAME_KEY]}
              variant="outlined"
              onClick={() => {resLinkHandlers[TYPES[SUBDEPT_KEY]](item); console.log(item);}}
              {...( isLinkedItemActive(linkedSubdepts, item) && { color: 'primary', icon: <Done /> } )}
            />
          )}
        </Box>*/}
    </>
  )
};

export default ResItem;
