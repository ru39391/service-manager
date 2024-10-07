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
  TextField,
  Typography,
} from '@mui/material';
import { styled, lighten, darken } from '@mui/system';
import { Done } from '@mui/icons-material';

import useResLinks from '../hooks/useResLinks';

import {
  ID_KEY,
  NAME_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  ITEM_KEY,
  TITLES,
  CATEGORY_KEY,
} from '../utils/constants';

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
    linkedItems,

    existableDepts,
    existableSubdepts,
    existableGroups,
    existableItems,

    resLinkHandlers,
    isLinkedItemActive
  } = useResLinks();

  useEffect(() => {
    console.log({ existableSubdepts });
  }, [
    existableSubdepts
  ]);

  useEffect(() => {
    console.log({ linkedSubdepts });
  }, [
    linkedSubdepts
  ]);

  return (
    <>
    {/*existableDepts.length > 0
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
            onClick={() => resLinkHandlers[DEPT_KEY]({ data })}
            {...( isLinkedItemActive(linkedDepts, data) && { color: 'primary', icon: <Done />, sx: { backgroundColor: '#fff' } } )}
          />
        )}
      </Box>*/}

      {existableDepts.length > 0 && <Autocomplete
        multiple
        filterSelectedOptions
        id={`${DEPT_KEY}-selecter`}
        sx={{ mb: 3, backgroundColor: '#fff' }}
        value={linkedDepts}
        options={existableDepts}
        getOptionLabel={(option) => option[NAME_KEY] as string}
        renderInput={(props) => <TextField {...props} label={[TITLES[DEPT_KEY]]} />}
        renderOption={(props, option) => <ListItem {...props}>{option[NAME_KEY]}</ListItem>}
        getOptionKey={(option) => option[ID_KEY]}
        onChange={(event, value, reason ) => resLinkHandlers[DEPT_KEY]({
          action: reason,
          items: reason === 'clear' ? [] : value
        })}
      />}

      {existableSubdepts.length > 0 && <Autocomplete
        multiple
        filterSelectedOptions
        id={`${SUBDEPT_KEY}-selecter`}
        sx={{ mb: 3, backgroundColor: '#fff' }}
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
        onChange={(event, value, reason ) => {
          console.log({value});
          resLinkHandlers[SUBDEPT_KEY]({
            action: reason,
            items: reason === 'clear' ? [] : value
          })
        }}
      />}

      {existableGroups.length > 0 && <Autocomplete
        multiple
        filterSelectedOptions
        id={`${GROUP_KEY}-selecter`}
        sx={{ mb: 3, backgroundColor: '#fff' }}
        value={linkedGroups}
        options={existableGroups}
        getOptionLabel={(option) => option[NAME_KEY] as string}
        groupBy={(option) => option[CATEGORY_KEY] as string}
        renderInput={(props) => <TextField {...props} label={[TITLES[GROUP_KEY]]} />}
        renderOption={(props, option) => <ListItem {...props}>{option[NAME_KEY]}</ListItem>}
        renderGroup={(props) => (
          <li key={props.key}>
            <GroupHeader>{props.group}</GroupHeader>
            <GroupList>{props.children}</GroupList>
          </li>
        )}
        getOptionKey={(option) => option[ID_KEY]}
        onChange={(event, value, reason ) => resLinkHandlers[GROUP_KEY]({
          action: reason,
          items: reason === 'clear' ? [] : value
        })}
      />}

      {existableGroups.length > 0 && <FormControlLabel
        label={existableGroups.length === linkedGroups.length ? 'Отменить выбор групп' : 'Выбрать все группы'}
        sx={{ mb: .25 }}
        control={
          <Checkbox
            checked={existableGroups.length === linkedGroups.length}
            onChange={() => resLinkHandlers[GROUP_KEY]({ items: existableGroups.length === linkedGroups.length ? [] : existableGroups })}
          />
        }
      />}

      {/*
        // TODO:
          -> для случая активного списка групп чекбокс "выбрать все группы"
          -> "Комплексный выбор" - отображает услуги непосредственно вложенные в категорию специализации (для этого случая чекбокс "выбрать все услуги") и выпадающий список групп


          -> чекбокс (остальные снимаются) "Игнорировать группы" - выпадающий список, входящих в специализацию услуг (для этого случая чекбокс "выбрать все услуги"), их category: "Название специализации"
          -> "Сохранить группировку" - для выборочной отметки услуг как внутри групп, так и внутри специализаций: ещё один выпадающий список, услуги без группы под заголовком '-' (для этого случая чекбокс "выбрать все") - список услуг, их category: "Название группы"
      */}

      {existableItems.length > 0
        ? <Box
          sx={{
            mb: 2,
            gap: 1,
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {existableItems.map(
            (data) => <Chip
              key={data[ID_KEY].toString()}
              label={data[NAME_KEY]}
              variant="outlined"
              onClick={() => resLinkHandlers[ITEM_KEY]({ data })}
              {...( isLinkedItemActive(linkedItems, data) && { color: 'primary', icon: <Done />, sx: { backgroundColor: '#fff' } } )}
            />
          )}
        </Box> :  (linkedSubdepts.length > 0 && 'нет записей') }

      {/* // TODO: сделать предпросмотр */}
      {/*
        renderTags={
          (value, getTagProps) => (value.map(
            (item, index) => <Chip
              {...getTagProps({ index })}
              key={item[ID_KEY].toString()}
              label={item[NAME_KEY]}
              onDelete={() => resLinkHandlers[TYPES[SUBDEPT_KEY]](item)}
            />
          ))
        }*/}
    </>
  )
};

export default ResItem;
