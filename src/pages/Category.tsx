import { FC } from 'react';
import { useParams } from 'react-router-dom';

import ItemsList from '../components/ItemsList';
import Wrapper from '../components/Wrapper';

const Category: FC = () => {
  // const { id } = useParams();

  return (
    <Wrapper><ItemsList /></Wrapper>
  )
};

export default Category;
