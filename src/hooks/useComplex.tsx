import {
  useState,
  useEffect,
  createElement,
  ReactNode,
  FunctionComponent
} from 'react';

import { useSelector } from '../services/hooks';

import type { TCustomData, TItemData } from '../types';

interface IComplex {
  currComplexList: TItemData[],
  handleCurrComplexList: (data: TCustomData<number>) => void;
}

const useComplex = (): IComplex => {
  const [complexList, setComplexList] = useState<TItemData[]>([]);
  const [currComplexList, setCurrComplexList] = useState<TItemData[]>([]);

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
        const complexIdsArr: number[] = JSON.parse(item.complex as string)
          .map((data: TCustomData<number>) => Number(Object.keys(data)[0]));

          console.log(complexItemId);
        return complexIdsArr.includes(complexItemId) ? [...acc, item] : acc;
      }, []);

    console.log(complexArr);

    setCurrComplexList(complexArr);
  }

  useEffect(() => {
    handleComplexList();
  }, []);

  return {
    currComplexList,
    handleCurrComplexList
  };
}

export default useComplex;
