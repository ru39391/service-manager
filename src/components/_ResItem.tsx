import { FC, Fragment, useEffect } from 'react';
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  FormControlLabel,
  GroupHeader,
  GroupItems,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';

import { Done } from '@mui/icons-material';

import useForm from '../hooks/useForm';
import useResLinks from '../hooks/useResLinks';

import { useSelector } from '../services/hooks';

import {
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  ITEM_KEY,
  ID_KEY,
  NAME_KEY,
  TYPES,
} from '../utils/constants';

const ResItem: FC = () => {
  const {
    form: { formValues, currSubdeptsList, currGroupsList },
    pricelist: { depts, subdepts, groups, pricelist }
  } = useSelector(state => ({
    form: state.form,
    pricelist: state.pricelist
  }));

  const { selecterFields } = useForm();
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

  /*
  useEffect(() => {
    console.log(existableDepts);
  }, [
    existableDepts
  ]);
  */

  return (
    <>
      {linkedDepts.length > 0
        && <Box
          sx={{
            mb: 2,
            gap: 1,
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {linkedDepts.map(
            (item) => <Chip
              key={item[ID_KEY].toString()}
              label={item[NAME_KEY]}
              variant="outlined"
              onClick={() => resLinkHandlers[TYPES[DEPT_KEY]](item)}
              {...( isLinkedItemActive(existableDepts, item) && { color: 'primary', icon: <Done /> } )}
            />
          )}
        </Box>}

      {linkedSubdepts.length > 0
        && <Autocomplete
        multiple
        id={SUBDEPT_KEY}
        options={linkedSubdepts.map(item => ({ ...item, label: `${item.category} - ${item[NAME_KEY]}` }))}
        getOptionLabel={(option) => option[NAME_KEY]}
        groupBy={(option) => option.category}
        filterSelectedOptions
        renderInput={(params) => <TextField {...params} label="Специализация" />}
        renderGroup={(params) => (
          <li key={params.key}>
            <GroupHeader>{params.group}</GroupHeader>
            <GroupItems>{params.children}</GroupItems>
          </li>
        )}
      />}

        {linkedSubdepts.length > 100000
          && <Card variant="outlined"
            sx={{
              p: 2,
              mb: 2,
              gap: 1,
              display: 'flex',
              flexWrap: 'wrap',
            }}
        >
          {linkedSubdepts.map(
            (item) => <Chip
              key={item[ID_KEY].toString()}
              label={item[NAME_KEY]}
              variant="outlined"
              onClick={() => resLinkHandlers[TYPES[SUBDEPT_KEY]](item)}
              {...( isLinkedItemActive(existableSubdepts, item) && { color: 'primary', icon: <Done /> } )}
            />
          )}
        </Card>}

        {/*existableSubdepts.length > 0
          && <Box
          sx={{
            mb: 2,
            gap: 1,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {existableSubdepts.map(
            (item) => <Card key={item[ID_KEY].toString()} variant="outlined">
              <CardContent>
                <Typography variant="h6" component="div" sx={{ mb: .25 }}>{item[NAME_KEY]} - {item[ID_KEY].toString()}</Typography>
                  <FormControlLabel
                    label="Выбрать все услуги"
                    sx={{ mb: .25 }}
                    control={
                      <Checkbox
                        checked={false}
                        onChange={({ target }) => console.log({ value: target.checked })}
                      />
                    }
                  />
                  {item[TYPES[GROUP_KEY]].length > 0 && <>
                    <FormControlLabel
                      label="Выбрать услуги вне групп"
                      sx={{ mb: .25 }}
                      control={
                        <Checkbox
                          checked={false}
                          onChange={({ target }) => console.log({ value: target.checked })}
                        />
                      }
                    />
                    <FormControlLabel
                      label="Выбрать услуги в группах"
                      sx={{ mb: .25 }}
                      control={
                        <Checkbox
                          checked={false}
                          onChange={({ target }) => console.log({ value: target.checked })}
                        />
                      }
                    />
                  </>}
                  {item[TYPES[ITEM_KEY]].length > 0
                    && <Box
                      sx={{
                        mb: 0,
                        gap: 1,
                        display: 'flex',
                        flexWrap: 'wrap',
                      }}
                    >
                    {item[TYPES[ITEM_KEY]].map(
                      (data) => <Chip
                        key={data[ID_KEY].toString()}
                        label={data[NAME_KEY]}
                        variant="outlined"
                        onClick={() => {
                          //console.log(data);
                          resLinkHandlers[TYPES[ITEM_KEY]](data);
                        }}
                        {...( isLinkedItemActive(existableItems, data) && { color: 'primary', icon: <Done /> } )}
                      />
                    )}
                  </Box>}
                  {item[TYPES[GROUP_KEY]].length > 0
                    && <><Typography component="div" sx={{ color: 'text.secondary', mt: 3, mb: 1 }}>Группы</Typography><Box
                      sx={{
                        mb: 0,
                        gap: 1,
                        display: 'flex',
                        flexWrap: 'wrap',
                      }}
                    >
                    {item[TYPES[GROUP_KEY]].map(
                      (data) => <Chip
                        key={data[ID_KEY].toString()}
                        label={data[NAME_KEY]}
                        variant="outlined"
                        onClick={() => {
                          //console.log(data);
                          resLinkHandlers[TYPES[GROUP_KEY]](data);
                        }}
                        {...( isLinkedItemActive(existableGroups, data) && { color: 'primary', icon: <Done /> } )}
                      />
                    )}
                  </Box></>}
                  {/// item[TYPES[GROUP_KEY]].map(
                    (data) => <Fragment key={data[ID_KEY].toString()}>
                        <Typography component="div" sx={{ color: 'text.secondary', mt: 3, mb: 0 }} onClick={() => console.log(data)}>{data[NAME_KEY]}</Typography>
                        <FormControlLabel
                          label="Выбрать все услуги группы"
                          sx={{ mb: .5 }}
                          control={
                            <Checkbox
                              checked={false}
                              onChange={({ target }) => console.log({ value: target.checked })}
                            />
                          }
                        />
                      {data[TYPES[ITEM_KEY]].length > 0
                        && <Box
                          sx={{
                            mb: 0,
                            gap: 1,
                            display: 'flex',
                            flexWrap: 'wrap',
                          }}
                        >
                        {data[TYPES[ITEM_KEY]].map(
                          (itemData) => <Chip
                            key={itemData[ID_KEY].toString()}
                            label={itemData[NAME_KEY]}
                            variant="outlined"
                            onClick={() => resLinkHandlers[TYPES[ITEM_KEY]](itemData)}
                            {...( isLinkedItemActive(existableItems, itemData) && { color: 'primary', icon: <Done /> } )}
                          />
                        )}
                      </Box>}
                    </Fragment>
                  ) ///}
              </CardContent>
            </Card>
          )}
        </Box>}
        {existableGroups.length > 0
          && <Box
          sx={{
            mb: 2,
            gap: 1,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {existableGroups.map(
            (item) => <Card key={item[ID_KEY].toString()} variant="outlined">
              <CardContent>
                <Typography variant="h6" component="div" sx={{ color: 'text.secondary', mb: .25 }}>{item[NAME_KEY]} - {item[ID_KEY].toString()}</Typography>
                  <FormControlLabel
                    label="Выбрать все услуги"
                    sx={{ mb: .25 }}
                    control={
                      <Checkbox
                        checked={false}
                        onChange={({ target }) => console.log({ value: target.checked })}
                      />
                    }
                  />
                  {item[TYPES[ITEM_KEY]].length > 0
                    && <Box
                      sx={{
                        mb: 0,
                        gap: 1,
                        display: 'flex',
                        flexWrap: 'wrap',
                      }}
                    >
                    {item[TYPES[ITEM_KEY]].map(
                      (data) => <Chip
                        key={data[ID_KEY].toString()}
                        label={data[NAME_KEY]}
                        variant="outlined"
                        onClick={() => {
                          //console.log(data);
                          resLinkHandlers[TYPES[ITEM_KEY]](data);
                        }}
                        {...( isLinkedItemActive(existableItems, data) && { color: 'primary', icon: <Done /> } )}
                      />
                    )}
                  </Box>}
              </CardContent>
            </Card>
          )}
        </Box>*/}

        {existableSubdepts.length > 0
          && <Box
            sx={{
              mb: 2,
              gap: 1,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {existableSubdepts.map(
              (item) => <Card key={item[ID_KEY].toString()} variant="outlined">
                <CardContent sx={{ paddingBottom: '16px !important' }}>
                  <Typography variant="h6" component="div" sx={{ mb: 1 }}>{item[NAME_KEY]} - {item[ID_KEY].toString()}</Typography>
                  {item[TYPES[ITEM_KEY]].length > 0
                    && <Box
                      sx={{
                        mb: 2,
                        gap: 1,
                        display: 'flex',
                        flexWrap: 'wrap',
                      }}
                    >
                    {item[TYPES[ITEM_KEY]].map(
                      (data) => <Chip
                        key={data[ID_KEY].toString()}
                        label={data[NAME_KEY]}
                        variant="outlined"
                        onClick={() => {
                          console.log(data);
                          resLinkHandlers[TYPES[ITEM_KEY]](data);
                        }}
                        {...( isLinkedItemActive(existableItems, data) && { color: 'primary', icon: <Done /> } )}
                      />
                    )}
                  </Box>}
                  {item[TYPES[GROUP_KEY]].map(
                    (data) => <Fragment key={data[ID_KEY].toString()}>
                      <Typography sx={{ color: 'text.secondary', mb: 1.5 }} onClick={() => console.log(data)}>{data[NAME_KEY]}</Typography>
                      {data[TYPES[ITEM_KEY]].length > 0
                        && <Box
                          sx={{
                            mb: 2,
                            gap: 1,
                            display: 'flex',
                            flexWrap: 'wrap',
                          }}
                        >
                        {data[TYPES[ITEM_KEY]].map(
                          (itemData) => <Chip
                            key={itemData[ID_KEY].toString()}
                            label={itemData[NAME_KEY]}
                            variant="outlined"
                            onClick={() => resLinkHandlers[TYPES[ITEM_KEY]](itemData)}
                            {...( isLinkedItemActive(existableItems, itemData) && { color: 'primary', icon: <Done /> } )}
                          />
                        )}
                      </Box>}
                    </Fragment>
                  )}
                </CardContent>
              </Card>
            )}
          </Box>}
    </>
  )
};

export default ResItem;

/*
  Чекбоксы:
    - игнорировать отделения;
    - игнорировать специализации;
    - игнорировать группы;

  Радио:
    - выбрать услуги;
    - выбрать группы;
    - выбрать специализации;

  Сортировка по INDEX_KEY

  {
    res_id: 7,
    data: [{
      item_id: 7917,
      name: 'Лазерное удаление  невусов СО2 лазером',
      index: 0,
      parent: {
        dept: {
          item_id: 4,
          name: 'Медицина',
          index: 0,
          isVisible: 0,
        },
        subdept: {
          item_id: 41,
          name: 'Cпециализация',
          index: 0,
          isVisible: 1,
        },
        group: {
          item_id: 100,
          name: 'Группа',
          index: 0,
          isVisible: 0,
        }
      }
    }]
  }
*/
