import { FC, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

import { useSelector } from '../services/hooks';

import type { TItemData, TCustomData } from '../types';

import {
  ID_KEY,
  NAME_KEY,
  TITLES
} from '../utils/constants';

interface IComplexItemsList {
  complexItemId: number;
}

const ComplexItemsList: FC<IComplexItemsList> = ({ complexItemId }) => {
  const { pricelist } = useSelector(state => state.pricelist);

  const handleComplex = () => {
    const complexData = pricelist
      .filter(({ isComplex }) => isComplex === 1)
      .map(({ name, item_id, complex }) => ({name, item_id, complex: JSON.parse(complex as string)}));

    console.log(complexItemId);
    console.log(complexData.filter(({ complex }) => {
      const arr = complex.reduce((acc: number[], item: TCustomData<number>) => [...acc, Number(Object.keys(item)[0])], []);

      return arr.includes(complexItemId);
    }));
  }

  useEffect(() => {
    handleComplex();
  }, [
    pricelist
  ]);

  return (
    <>{/*pricelist.filter(({ isComplex }) => isComplex === 1).map((item: TItemData) => <p key={item.item_id?.toString()}>{item.name}</p>)*/}</>
  )
};

export default ComplexItemsList;
