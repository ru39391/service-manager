import { FC, Suspense, lazy } from 'react';

//import ResItem from '../components/ResItem';
import Wrapper from '../components/Wrapper';

const ResItem = lazy(() => import('../components/ResItem'));

const Resource: FC = () => {
  return (
    <Wrapper>
      <Suspense><ResItem /></Suspense>
    </Wrapper>
  )
};

export default Resource;
