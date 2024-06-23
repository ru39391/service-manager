import {
  useState,
  useEffect
} from 'react';

import { useSelector, useDispatch } from '../services/hooks';
import { setFormValues } from '../services/slices/form-slice';

import type { TCustomData, TItemData } from '../types';

import {
  ID_KEY,
  NAME_KEY,
  PRICE_KEY,
  COMPLEX_KEY,
  IS_COMPLEX_ITEM_KEY,
  QUANTITY_KEY,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY,
  ITEM_KEY,
  TYPES
} from '../utils/constants';
import { sortStrArray } from '../utils';

type TComplexData = {
  itemId: number;
  complex: string;
  isListVisible: number;
};

interface IComplex {
  complexItems: TItemData[];
  currComplexItems: TItemData[];
  handleComplexData: (data: TComplexData) => void;
  hadnleComplexItem: (data: TCustomData<string | number>) => void;
}

const useComplex = (): IComplex => {
  const [complexItems, setComplexItems] = useState<TItemData[]>([]);
  const [currComplexItems, setCurrComplexItems] = useState<TItemData[]>([]);

  const dispatch = useDispatch();
  const {
    pricelist,
    formValues
  } = useSelector(state => ({
    pricelist: state.pricelist,
    formValues: state.form.formValues
  }));

  const fetchComplexItems = () => {
    const complexItemsArr: TItemData[] = pricelist[TYPES[ITEM_KEY]].filter((item: TItemData) => item[IS_COMPLEX_ITEM_KEY] === 1);

    setComplexItems(sortStrArray(complexItemsArr, NAME_KEY));
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
        const itemData: TItemData | undefined = pricelist[TYPES[ITEM_KEY]].find((item: TItemData) => item[ID_KEY] === data[ID_KEY]);

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

    setCurrComplexItems(sortStrArray(currComplexItemsArr, NAME_KEY));
  }

  const updateComplex = (arr: TItemData[], id: number) => {
    const summ = arr
      .reduce(
        (acc, item) => {
          const data = {
            [PRICE_KEY]: item[PRICE_KEY] as number,
            [QUANTITY_KEY]: item[QUANTITY_KEY] as number
          };

          return acc + data[QUANTITY_KEY] * data[PRICE_KEY]
        }, 0
      );
    const complexData: TCustomData<number>[] = arr
      .reduce(
        (acc: TCustomData<number>[], item: TItemData) => {
          const data = {
            [ID_KEY]: item[ID_KEY] as number,
            [QUANTITY_KEY]: item[QUANTITY_KEY] as number
          };

          return [...acc, {[data[ID_KEY].toString()]: data[QUANTITY_KEY]}];
        }, []
      );

    dispatch(
      setFormValues({
        values: {
          ...formValues,
          [PRICE_KEY]: summ,
          [COMPLEX_KEY]: JSON.stringify(complexData)
        }
      })
    );
    setCurrComplexItems(sortStrArray(arr, NAME_KEY));
  }

  const removeComplexItem = (data: TCustomData<number>) => {
    const complexItemsArr = [...currComplexItems].filter(item => item[ID_KEY] !== data[ID_KEY]);

    updateComplex(complexItemsArr, data[COMPLEX_KEY]);
  }

  const editComplexItem = (data: TCustomData<number>) => {
    const complexItemsArr = [...currComplexItems].filter(item => item[ID_KEY] !== data[ID_KEY]);
    const complexItemData: TItemData | undefined = complexItems.find((item: TItemData) => item[ID_KEY] === data.value);

    updateComplex(
      complexItemData ? [...complexItemsArr, {...complexItemData, [QUANTITY_KEY]: data[QUANTITY_KEY]}] : complexItemsArr,
      data[COMPLEX_KEY]
    );
  }

  const hadnleComplexItem = (data: TCustomData<string | number>) => {
    console.log(data);

    switch(data.action) {
      case `${REMOVE_ACTION_KEY}`:
        removeComplexItem({
          [ID_KEY]: data[ID_KEY] as number,
          [COMPLEX_KEY]: data[COMPLEX_KEY] as number
        });
        break;

      case `${EDIT_ACTION_KEY}`:
        editComplexItem({
          value: data.value as number,
          [ID_KEY]: data[ID_KEY] as number,
          [COMPLEX_KEY]: data[COMPLEX_KEY] as number,
          [QUANTITY_KEY]: data[QUANTITY_KEY] as number
        });
        break;

      default:
        console.log(data[ID_KEY]);
        break;
    }
  }

  useEffect(() => {
    fetchComplexItems();
  }, []);

  return {
    complexItems,
    currComplexItems,
    handleComplexData,
    hadnleComplexItem
  };
}

export default useComplex;
