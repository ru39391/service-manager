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

export {
  fetchArray
};