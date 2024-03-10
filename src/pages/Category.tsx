import { FC } from 'react';
import { useParams } from 'react-router-dom';

import Wrapper from '../components/Wrapper';
import ItemsList from '../components/ItemsList';

const Category: FC = () => {
  const { id } = useParams();

  return (
    <Wrapper><ItemsList /></Wrapper>
  )
};

export default Category;
