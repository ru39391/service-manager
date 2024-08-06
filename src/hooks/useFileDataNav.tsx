import { useState } from 'react';

import type { TCustomData, TItemsArr } from '../types';

import { HANDLED_ITEMS_CAPTIONS } from '../utils/constants';

type TFileDataNav = {
  key: string;
  caption: string;
  counter: number;
  data: TCustomData<string | number>[]
}[];

interface IFileDataNav {
  fileDataNav: TFileDataNav;
  updateFileDataNav: (data: TCustomData<TCustomData<TItemsArr>> | null) => void;
}

const useFileDataNav = (): IFileDataNav => {
  const [fileDataNav, setFileDataNav] = useState<TFileDataNav>([]);

  const updateFileDataNav = (data: TCustomData<TCustomData<TItemsArr>> | null): void => {
    const [keys, items] = data ? [Object.keys(data), Object.values(data)] : [[], []];

    setFileDataNav(
      keys.reduce(
        (acc: TFileDataNav, key, index) => [
          ...acc,
          {
            key,
            caption: HANDLED_ITEMS_CAPTIONS[key],
            counter: data
              ? Object.values(items[index]).reduce((acc, item) => acc + item.length, 0)
              : 0,
            data: data
              ? Object.keys(items[index]).map(
                (item, idx) => ({ key: item, counter: Object.values(items[index])[idx].length })
              )
              : []
          }
        ], []
      )
    );

  }

  return {
    fileDataNav,
    updateFileDataNav
  }
}

export default useFileDataNav;
