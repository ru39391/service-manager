import type { TCustomData } from '../types';

const fetchArray = (arr: TCustomData<string | number>[], param: string): TCustomData<string | number>[] => {
  return arr.reduce((acc: TCustomData<string | number>[], item: TCustomData<string | number>) => {
    if(acc.find(data => data[param] === item[param])) {
      return acc;
    } else {
      return [...acc, item];
    }
  }, []);
};

const sortArray = (arr: TCustomData<string | number>[], key: string): TCustomData<string | number>[] => {
  return arr.sort((a, b) => {
    const nameA = a[key].toString().toLowerCase();
    const nameB = b[key].toString().toLowerCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
};

export {
  fetchArray,
  sortArray
};