import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import useTypesList from '../store/TypesListStore';
import PriceList from './PriceList';
import GroupsList from './GroupsList';
import ResList from './ResList';
import {
  Box,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { PRICELIST_PATH, GROUPS_PATH, RESOURCES_PATH } from '../utils/config';
import { CATEGORY_TITLE } from '../utils/constants';

function Wrapper() {
  const {
    types,
    currType,
    changeType,
  } = useTypesList(
    (state) => ({
      types: state.types,
      currType: state.currType,
      changeType: state.changeType,
    }),
    shallow
  );

  useEffect(() => {
    document.title = currType.label;
  }, [currType]);

  return (
    <Container
      sx={(theme) => ({
        ...theme.custom.dFlexColumn,
        pt: 4,
        pb: 5,
        height: '100vh',
      })}
      maxWidth="lg"
    >
      <Box
        sx={{
          px: 2,
          py: 1,
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          borderRadius: 1,
          bgcolor: 'background.default',
          boxShadow: '0 2px 10px 0 rgba(0,0,0,.045)',
        }}
      >
        <Typography variant="h5" sx={{ mr: 3 }}>{CATEGORY_TITLE}</Typography>
        <FormControl sx={{ width: '100%', minWidth: 120, maxWidth: 200 }} size="small">
          <InputLabel id="category-select-label">{CATEGORY_TITLE}</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={currType.key}
            label={CATEGORY_TITLE}
            onChange={changeType}
          >
            {types.length && types.map(({ key, label }) => <MenuItem key={key} value={key} name={label}>{label}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>

      {currType.key === PRICELIST_PATH && <PriceList />}
      {currType.key === GROUPS_PATH && <GroupsList />}
      {currType.key === RESOURCES_PATH && <ResList />}
    </Container>
  )
}

export default Wrapper;
