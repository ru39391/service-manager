import { FC } from 'react';
import { useParams } from 'react-router-dom';

import Wrapper from '../components/Wrapper';

const Category: FC = () => {
  const { id } = useParams();

  return (
    <Wrapper>{id}</Wrapper>
  )
};

export default Category;
