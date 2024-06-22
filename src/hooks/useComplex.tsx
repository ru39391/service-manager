import {
  useState,
  useEffect
} from 'react';

import { useSelector } from '../services/hooks';

import type { TCustomData, TItemData } from '../types';

import {
  ID_KEY,
  COMPLEX_KEY,
  IS_COMPLEX_ITEM_KEY,
  QUANTITY_KEY
} from '../utils/constants';

type TComplexData = {
  itemId: number;
  complex: string;
  isListVisible: number;
};

interface IComplex {
  complexItems: TItemData[],
  currComplexItems: TItemData[],
  handleComplexData: (data: TComplexData) => void;
}

const useComplex = (): IComplex => {
  const [complexItems, setComplexItems] = useState<TItemData[]>([]);
  const [currComplexItems, setCurrComplexItems] = useState<TItemData[]>([]);

  const { pricelist } = useSelector(state => state.pricelist);

  const handleComplexItems = () => {
    const complexItemsArr = pricelist.filter(item => item[IS_COMPLEX_ITEM_KEY] === 1);

    setComplexItems(complexItemsArr);
  }

  const handleComplexData = ({itemId, complex, isListVisible}: TComplexData) => {
    if(!isListVisible) {
      return;
    }

    const complexDataArr: TCustomData<number>[] = JSON.parse(complex)
      .map((data: TCustomData<number>) => ({
        [ID_KEY]: Number(Object.keys(data)[0]),
        [QUANTITY_KEY]: Object.values(data)[0]
      }));
    const currComplexItemsArr: TItemData[] = complexDataArr.reduce(
      (acc: TItemData[], data: TCustomData<number>, index, arr) => {
        const itemData: TItemData | undefined = pricelist.find(item => item[ID_KEY] === data[ID_KEY]);

        return itemData
          ? [
            ...acc,
            {
              ...itemData,
              [QUANTITY_KEY]: arr[index][QUANTITY_KEY]
            }
          ]
          : acc
      }, []
    );

    setCurrComplexItems(currComplexItemsArr);
  }

  useEffect(() => {
    handleComplexItems();
  }, []);

  return {
    complexItems,
    currComplexItems,
    handleComplexData
  };
}

export default useComplex;
