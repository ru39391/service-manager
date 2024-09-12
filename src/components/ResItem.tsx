import { FC, useEffect, useState, ChangeEvent } from 'react';
import {
  Box,
  Checkbox,
  Chip,
  ListItem
} from '@mui/material';
//import Chip from '@mui/joy/Chip';
import {
  Check
} from '@mui/icons-material';

import Selecter from '../components/Selecter';

import useForm from '../hooks/useForm';
import useSelecter from '../hooks/useSelecter';

import { useSelector } from '../services/hooks';

import {
  ITEM_KEY,
  SUBDEPT_KEY,
  ID_KEY,
  NAME_KEY,
  TYPES
} from '../utils/constants';

const ResItem: FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const {
    formValues,
    currSubdeptsList,
  } = useSelector(state => state.form);

  const { selecterFields } = useForm();
  const { deptsList, selectedDept, subdeptsList } = useSelecter();

  useEffect(() => {
    //console.log({formValues});
  }, [
    formValues
  ]);
  useEffect(() => {
    //console.log(selecterFields);
  }, [
    currSubdeptsList
  ]);

  return (
    <>
      <Selecter keys={selecterFields[TYPES[SUBDEPT_KEY]]} />
      <Box
          role="group"
          aria-labelledby="fav-movie"
          sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
        >
          {currSubdeptsList.map(item => <Chip key={item[ID_KEY].toString()} label={item[NAME_KEY].toString()} variant="outlined" color="primary" />)}</Box>

      {/*currSubdeptsList.length > 0
        && currSubdeptsList.map((item, index) => <p key={item[ID_KEY].toString()}>{item[ID_KEY].toString()}. {item[NAME_KEY].toString()}</p>)*/}
      {Object.keys(formValues).map((item, index) => <p key={item}>{item}: {Object.values(formValues)[index]}</p>)}
    </>
  )
};

export default ResItem;
