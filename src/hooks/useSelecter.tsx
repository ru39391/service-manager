import { useState, useEffect } from 'react';

import { useSelector } from '../services/hooks';

import type { TCustomData } from '../types';

import {
  ID_KEY,
  NAME_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  TYPES,
  TITLES
} from '../utils/constants';

interface ISelecter {
  selectedItem: TCustomData<string | number>;
  selecterList: TCustomData<string | number | null>[];
  handleSelectedValue: (options: TCustomData<string | number>) => void;
}

const useSelecter = (data: TCustomData<string | number>): ISelecter => {
  const [selectedItem, setSelectedItem] = useState<TCustomData<string | number>>({});
  const [selecterList, setSelecterList] = useState<TCustomData<string | number | null>[]>([]);

  const pricelist = useSelector(state => state.pricelist);

  const handleSelecterList = ({ key, value, category }: TCustomData<string | number>) => {
    const currSubdepts = pricelist[TYPES[SUBDEPT_KEY]].filter(
      (item: TCustomData<string | number | null>) => item[key] === value
    );

    switch(category) {
      case `${SUBDEPT_KEY}`:
        console.log(1);
        setSelecterList(currSubdepts);
        break;

      case `${GROUP_KEY}`:
        console.log(2);
        setSelecterList(pricelist[TYPES[category]].filter(
          (item: TCustomData<string | number | null>) => item[key] === value && item[SUBDEPT_KEY] === currSubdepts[0][ID_KEY])
        );
        break;

      default:
        console.log(3);
        setSelecterList(pricelist[TYPES[category]]);
        break;
    }

    console.log({ key, value, category });
  }

  const handleSelectedValue = ({ key, value, category }: TCustomData<string | number>) => {
    setSelectedItem(selecterList.find((item: TCustomData<string | number>) => item[ID_KEY] === value));
    //handleSelecterList({ key, value, category });
  }

  useEffect(() => {
    handleSelecterList(data);
  }, []);

  useEffect(() => {
    setSelectedItem(
      selecterList.length
        ? selecterList[0] as TCustomData<string | number>
        : { [ID_KEY]: 0, [NAME_KEY]: '' }
    );
  }, [
    selecterList
  ]);

  return {
    selectedItem,
    selecterList,
    handleSelectedValue
  };
}

export default useSelecter;
