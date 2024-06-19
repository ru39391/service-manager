import {
  useState,
  useEffect
} from 'react';

import { useSelector } from '../services/hooks';

import type { TCustomData, TItemData } from '../types';

import {
  ID_KEY,
  COMPLEX_KEY
} from '../utils/constants';

interface IComplex {
  complexList: TItemData[],
  currComplexList: TItemData[],
  complexItems: TCustomData<number | TCustomData<number>>[],
  handleCurrComplexList: (data: TCustomData<number>) => void;
}

const useComplex = (): IComplex => {
  const [complexList, setComplexList] = useState<TItemData[]>([]);
  const [currComplexList, setCurrComplexList] = useState<TItemData[]>([]);
  const [complexItems, setComplexItems] = useState<TCustomData<number | TCustomData<number>>[]>([]);

  const { pricelist } = useSelector(state => state.pricelist);

  const handleComplexList = () => {
    const mainComplexlist = pricelist.filter(({ isComplex }) => isComplex === 1);

    setComplexList(mainComplexlist);
  }

  const handleCurrComplexList = ({complexItemId, isListVisible}: TCustomData<number>) => {
    if(!isListVisible) {
      return;
    }

    const complexArr: TItemData[] = complexList
      .reduce((
        acc: TItemData[],
        item: TItemData
      ) => {
        const complexIdsArr: number[] = JSON.parse(item[COMPLEX_KEY] as string)
          .map((data: TCustomData<number>) => Number(Object.keys(data)[0]));

        return complexIdsArr.includes(complexItemId) ? [...acc, item] : acc;
      }, []);

    const complexItemsArr: TCustomData<number | TCustomData<number>>[] = complexArr
      .map((item) => ({
        [ID_KEY]: item[ID_KEY] as number,
        [COMPLEX_KEY]: JSON.parse(item[COMPLEX_KEY] as string).find((data: TCustomData<number>) => Number(Object.keys(data)[0]) === complexItemId),
        complexItemId
      }));

    setCurrComplexList(complexArr);
    setComplexItems(complexItemsArr);
  }

  useEffect(() => {
    handleComplexList();
  }, []);

  return {
    complexList,
    currComplexList,
    complexItems,
    handleCurrComplexList
  };
}

export default useComplex;
