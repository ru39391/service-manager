import type {
  TItemData,
  TItemsArr,
  TResponseList
} from '../types';
import { ID_KEY, NAME_KEY } from './constants';

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

const handleRespData = (data: TResponseList | undefined) => {
  if(!data) {
    return [];
  }

  return Array.isArray(data) ? [...data] : Object.values(data);
};

const setRespMessage = (
  {
    failedValue,
    inValidValue,
    failedItemsArr,
    inValidItemsArr
  }: {
    failedValue: number;
    inValidValue: number;
    failedItemsArr: TItemsArr;
    inValidItemsArr: TItemsArr;
  }
) => {
  return `
    ${failedValue + inValidValue > 0 ? `Число недоступных для обработки элементов: ${failedValue + inValidValue}. ` : ''}
    ${failedValue > 0 ? `Не удалось завершить операцию для: ${failedItemsArr.map((item, index, arr) => `"${item[NAME_KEY]}" c id ${item[ID_KEY]}${index === arr.length - 1 ? '.': ', '}`)}, общее количество - ${failedValue}. ` : ''}
    ${inValidValue > 0 ? `Переданы объекты  в неправильном формате: ${inValidItemsArr.map((item, index, arr) => `"${item[NAME_KEY]}" c id ${item[ID_KEY]}${index === arr.length - 1 ? '.': ', '}`)}, общее количество - ${inValidValue}. ` : ''}
    `
};

const fetchItemsArr = (arr: TItemsArr | undefined): TItemsArr => arr?.map(data => ({ ...data, ...( data[NAME_KEY] && typeof data[NAME_KEY] === 'string' && { [NAME_KEY]: data[NAME_KEY].trim() } ) })) || [];

/**
 * Возвращает выборку дочерних элементов установленных категорий
 * @returns {object[]} массив подходящих элементов
 * @property {object[]} categoryArr - массив объектов родительских категорий
 * @property {object[]} currentArr - массив объектов дочерних элементов
 * @property {string} key - ключ категории для поиска среди параметров объекта дочернего элемента
 */
const getMatchedItems = (
  categoryArr: TItemsArr,
  currentArr: TItemsArr,
  key: string
): TItemsArr => currentArr.filter(item => categoryArr.map(data => data[ID_KEY]).includes(item[key]));

export {
  fetchArray,
  sortStrArray,
  handleRespData,
  setRespMessage,
  fetchItemsArr,
  getMatchedItems
};
