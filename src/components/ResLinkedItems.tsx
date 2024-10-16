import { FC } from 'react';

import { useSelector } from '../services/hooks';

const ResLinkedItems: FC = () => {
  const { isPricelistLoading } = useSelector(state => state.pricelist);

  return (
    <>
      ResLinkedItems
    </>
  )
}

export default ResLinkedItems;
