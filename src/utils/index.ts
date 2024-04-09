import type { TItemData, TItemsArr } from '../types';

const fetchArray = (arr: TItemsArr, param: string): TItemsArr => {
  return arr.reduce((acc: TItemsArr, item: TItemData) => {
    if(acc.find(data => data[param] === item[param])) {
      return acc;
    } else {
      return [...acc, item];
    }
  }, []);
};

const sortStrArray = (arr: TItemsArr, key: string): TItemsArr => {
  const handleValue = (value: string): string => value !== null ? value.toString().toLowerCase() : '';

  return arr.sort((a, b) => {
    const nameA = handleValue(a[key] as string);
    const nameB = handleValue(b[key] as string);

    if(nameA < nameB) {
      return -1;
    }
    if(nameA > nameB) {
      return 1;
    }
    return 0;
  });
};

export {
  fetchArray,
  sortStrArray
};
