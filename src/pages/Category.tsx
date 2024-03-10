import { FC } from 'react';
import { useParams } from 'react-router-dom';

import Wrapper from '../components/Wrapper';
import Selector from '../components/Selector';

const Category: FC = () => {
  const { id } = useParams();

  return (
    <Wrapper><Selector />{id}</Wrapper>
  )
};

export default Category;
