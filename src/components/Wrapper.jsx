import { shallow } from 'zustand/shallow';
import useDepts from '../store/DeptsStore';
import Pricelist from './Pricelist';
import { Container } from '@mui/material';

function Wrapper() {
  const {
    depts,
    groups,
    currChapter,
  } = useDepts(
    (state) => ({
      depts: state.depts,
      groups: state.groups,
      currChapter: state.currChapter,
    }),
    shallow
  );

  return (
    <Container
      sx={{
        py: 5,
        height: '100vh',
      }}
      maxWidth="lg"
    >
      <Pricelist
        depts={depts}
        currChapter={currChapter}
      />
    </Container>
  )
}

export default Wrapper;
