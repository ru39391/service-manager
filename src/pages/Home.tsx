import { FC, Suspense, lazy } from 'react';

//import ResList from '../components/ResList';
import Wrapper from '../components/Wrapper';

const ResList = lazy(() => import('../components/ResList'));

const Home: FC = () => {
  return (
    <Wrapper>
      <Suspense><ResList /></Suspense>
    </Wrapper>
  )
};

export default Home;
