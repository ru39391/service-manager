import PriceList from './PriceList';
import GroupsList from './GroupsList';
import { Container } from '@mui/material';

function Wrapper() {
  return (
    <Container
      sx={{
        py: 5,
        height: '100vh',
      }}
      maxWidth="lg"
    >
      <GroupsList />
      {/*
      <GroupsList />
      <PriceList />
      */}
    </Container>
  )
}

export default Wrapper;
