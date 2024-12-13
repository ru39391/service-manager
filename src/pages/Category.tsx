import { FC, Suspense, lazy } from 'react';

//import ItemsList from '../components/ItemsList';
import Wrapper from '../components/Wrapper';

const ItemsList = lazy(() => import('../components/ItemsList'));

const Category: FC = () => {
  return (
    <Wrapper>
      <Suspense><ItemsList /></Suspense>
    </Wrapper>
  )
};

export default Category;
