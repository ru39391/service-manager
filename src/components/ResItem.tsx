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
import { styled, lighten, darken, display } from '@mui/system';
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
  IS_COMPLEX_DATA,
  IS_GROUPS_IGNORED,
  IS_GROUPS_USED
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

    linkedDataConfig,

    resLinkHandlers,
    isLinkedItemActive,
    handleDataConfig
  } = useResLinks();

  const isLinkedDataExist = (param: string): boolean => Boolean(linkedDataConfig && linkedDataConfig[param]);

  useEffect(() => {
    //console.log({ existableSubdepts });
  }, [
    existableSubdepts
  ]);

  useEffect(() => {
    //console.log({ linkedGroups });
  }, [
    linkedGroups
  ]);

  return (
    <>
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

      {linkedSubdepts.map(
        (subdept) => <Box
          key={subdept[ID_KEY].toString()}
          sx={{
            mb: 1.5,
            gap: 1,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div" sx={{ mb: .25 }}>{subdept[NAME_KEY]}</Typography>
              {isLinkedDataExist(IS_GROUPS_IGNORED)
                ? (existableGroups.filter((group) => group[SUBDEPT_KEY] === subdept[ID_KEY])
                    && existableGroups.filter((group) => group[SUBDEPT_KEY] === subdept[ID_KEY]).map(
                    (options) => <Fragment key={options[ID_KEY].toString()}>
                      <Typography variant="subtitle1" color="textPrimary" component="div" sx={{ mb: 1 }}>{options[NAME_KEY]}</Typography>
                      {existableItems.filter((item) => item[GROUP_KEY] === options[ID_KEY]).length > 0
                        ? <Box
                          sx={{
                            mb: 2,
                            gap: 1,
                            display: 'flex',
                            flexWrap: 'wrap',
                          }}
                        >
                          {existableItems.filter((item) => item[GROUP_KEY] === options[ID_KEY]).map(
                            (data) => <Chip
                              key={data[ID_KEY].toString()}
                              label={data[NAME_KEY]}
                              onClick={() => resLinkHandlers[ITEM_KEY]({ data })}
                              {...( isLinkedItemActive(linkedItems, data) && { color: 'primary', icon: <Done /> } )}
                            />
                          )}
                        </Box>
                        : <Typography variant="body2" color="textSecondary" component="div" sx={{ mb: 2 }}>Группа не содержит услуг</Typography>
                      }
                    </Fragment>)
                  )
                : (existableGroups.filter((group) => group[SUBDEPT_KEY] === subdept[ID_KEY]).length > 0
                    ? <Box
                        sx={{
                          mb: 0,
                          gap: 1,
                          display: 'flex',
                          flexWrap: 'wrap',
                        }}
                      >
                        {existableGroups.filter((group) => group[SUBDEPT_KEY] === subdept[ID_KEY]).map(
                          (data) => <Chip
                            key={data[ID_KEY].toString()}
                            label={data[NAME_KEY]}
                            variant="outlined"
                            onClick={() => resLinkHandlers[GROUP_KEY]({ data })}
                            {...( isLinkedItemActive(linkedGroups, data) && { color: 'primary', icon: <Done />, sx: { backgroundColor: '#fff' } } )}
                          />
                        )}
                      </Box>
                    : <Typography variant="body2" color="textSecondary" component="div">Специализация не содержит групп</Typography>
                  )
              }

              {(isLinkedDataExist(IS_COMPLEX_DATA) || isLinkedDataExist(IS_GROUPS_IGNORED))
                && existableItems.filter((item) => item[SUBDEPT_KEY] === subdept[ID_KEY] && item[GROUP_KEY] === 0).length > 0
                && <>
                  {isLinkedDataExist(IS_GROUPS_IGNORED)
                    && <Typography variant="subtitle1" color="textPrimary" component="div" sx={{ mb: 1 }}>Без группы</Typography>}
                  <Box
                    sx={{
                      ...( !isLinkedDataExist(IS_GROUPS_IGNORED) && { mt: 2 } ),
                      mb: 0,
                      gap: 1,
                      display: 'flex',
                      flexWrap: 'wrap',
                    }}
                  >
                    {existableItems.filter((item) => item[SUBDEPT_KEY] === subdept[ID_KEY] && item[GROUP_KEY] === 0).map(
                      (data) => <Chip
                        key={data[ID_KEY].toString()}
                        label={data[NAME_KEY]}
                        onClick={() => resLinkHandlers[ITEM_KEY]({ data })}
                        {...( isLinkedItemActive(linkedItems, data) && { color: 'primary', icon: <Done /> } )}
                      />
                    )}
                  </Box>
                </>
              }
            </CardContent>
          </Card>
        </Box>
      )}

      {/*
        // TODO: https://skrinshoter.ru/vSCvsUkNAXu
        // TODO: перенести label в переменные
      */}
      {existableGroups.length > 0
        ? (<Box
          sx={{
            mb: 2,
            gap: 1,
            display: 'flex',
            flexWrap: 'wrap',
          }}>
            <FormControlLabel
              label={existableGroups.length === linkedGroups.length ? 'Отменить выбор групп' : 'Выбрать все группы'}
              sx={{ mb: .25 }}
              control={
                <Checkbox
                  checked={existableGroups.length === linkedGroups.length}
                  disabled={isLinkedDataExist(IS_GROUPS_IGNORED)}
                  onChange={() => resLinkHandlers[GROUP_KEY]({ items: existableGroups.length === linkedGroups.length ? [] : existableGroups })}
                />
              }
            />
            <FormControlLabel
              label="Комплексный выбор"
              sx={{ mb: .25 }}
              control={
                <Checkbox
                  id={IS_COMPLEX_DATA}
                  checked={isLinkedDataExist(IS_COMPLEX_DATA)}
                  disabled={isLinkedDataExist(IS_GROUPS_IGNORED)}
                  onChange={({ target }) => handleDataConfig({ [target.id]: !isLinkedDataExist(IS_COMPLEX_DATA) })}
                />
              }
            />
            <FormControlLabel
              label="Игнорировать группы"
              sx={{ mb: .25 }}
              control={
                <Checkbox
                  id={IS_GROUPS_IGNORED}
                  checked={isLinkedDataExist(IS_GROUPS_IGNORED)}
                  disabled={linkedGroups.length !== 0 || isLinkedDataExist(IS_COMPLEX_DATA)}
                  onChange={({ target }) => handleDataConfig({ [target.id]: !isLinkedDataExist(IS_GROUPS_IGNORED) })}
                />
              }
            />
            {isLinkedDataExist(IS_GROUPS_IGNORED)
              && <FormControlLabel
                label="Сохранить группировку"
                sx={{ mb: .25 }}
                control={
                  <Checkbox
                    id={IS_GROUPS_USED}
                    checked={isLinkedDataExist(IS_GROUPS_USED)}
                    disabled={!isLinkedDataExist(IS_GROUPS_IGNORED)}
                    onChange={({ target }) => handleDataConfig({ [target.id]: !isLinkedDataExist(IS_GROUPS_USED) })}
                  />
                }
              />
            }
          </Box>)
        : (existableItems.length > 0
            && <FormControlLabel
              label="Игнорировать группы"
              sx={{ mb: .25 }}
              control={
                <Checkbox
                  id={IS_GROUPS_IGNORED}
                  checked={isLinkedDataExist(IS_GROUPS_IGNORED)}
                  disabled={linkedGroups.length !== 0 || isLinkedDataExist(IS_COMPLEX_DATA)}
                  onChange={({ target }) => handleDataConfig({ [target.id]: !isLinkedDataExist(IS_GROUPS_IGNORED) })}
                />
              }
            />
          )
      }

      {/* // TODO: сделать предпросмотр */}
    </>
  )
};

export default ResItem;
