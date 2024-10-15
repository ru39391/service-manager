import { useState, useEffect } from 'react';

import {
  ID_KEY,
  NAME_KEY,
  IS_VISIBLE_KEY,
  CATEGORY_KEY,
  CHILDREN_KEY,
  LABEL_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  ITEM_KEY,
  TYPES,
  IS_COMPLEX_DATA_KEY,
  IS_GROUPS_IGNORED_KEY
} from '../utils/constants';

import { useSelector } from '../services/hooks';

import type {
  TCustomData,
  TItemsArr,
  TItemData,
  TPricelistData
} from '../types';

import { sortStrArray, fetchArray } from '../utils';

type TLinkedResData = {
  action?: string;
  data?: TItemData;
  items?: TItemsArr;
  key?: string;
};

interface IResLinks {
  existableDepts: TItemsArr,
  existableSubdepts: TItemsArr,
  existableGroups: TItemsArr,
  existableItems: TItemsArr,

  linkedDepts: TItemsArr,
  linkedSubdepts: TItemsArr,
  linkedGroups: TItemsArr,
  linkedItems: TItemsArr,

  linkedDataConfig: TCustomData<boolean> | null,

  resLinkHandlers: TCustomData<(payload: TLinkedResData) => void>,
  isLinkedItemActive: (arr: TItemsArr, data: TItemData) => boolean,
  handleDataConfig: (data: TCustomData<boolean>) => void,
  updateLinkedItems: (data: TPricelistData) => void,
  renderLinkedItems: (data: TPricelistData) => void,

  list: TItemsArr
}

// TODO: не использовать ли useCallback
const useResLinks = (): IResLinks => {
  const [existableDepts, setExistableDepts] = useState<TItemsArr>([]);
  const [existableSubdepts, setExistableSubdepts] = useState<TItemsArr>([]);
  const [existableGroups, setExistableGroups] = useState<TItemsArr>([]);
  const [existableItems, setExistableItems] = useState<TItemsArr>([]);

  const [linkedDepts, setLinkedDepts] = useState<TItemsArr>([]);
  const [linkedSubdepts, setLinkedSubdepts] = useState<TItemsArr>([]);
  const [linkedGroups, setLinkedGroups] = useState<TItemsArr>([]);
  const [linkedItems, setLinkedItems] = useState<TItemsArr>([]);

  const [linkedDataConfig, setLinkedDataConfig] = useState<TCustomData<boolean> | null>(null);

  const [list, setList] = useState<TItemsArr>([]);

  const pricelist: TCustomData<TItemsArr>  = useSelector(
    ({ pricelist }) => Object.values(TYPES).reduce((acc, key) => ({ ...acc, [key]: pricelist[key] }), {}
  ));

  const setResData = (arr: TItemsArr[]): TCustomData<TItemsArr> => arr.reduce(
    (acc, item, index) => ({ ...acc, [Object.keys(TYPES)[index]]: item }), {}
  );

  const existableData: TCustomData<TItemsArr> = setResData([existableDepts, existableSubdepts, existableGroups, existableItems]);

  const resLinkData: TCustomData<TItemsArr> = setResData([linkedDepts, linkedSubdepts, linkedGroups, linkedItems]);

  const existableDataHandlers = [
    setExistableDepts,
    setExistableSubdepts,
    setExistableGroups,
    setExistableItems
  ].reduce((acc, handler, index) => ({
    ...acc,
    [Object.keys(TYPES)[index]]: (arr: TItemsArr) => handler(sortStrArray(arr, CATEGORY_KEY))
  }), {});

  const resLinkHandlers = [
    setLinkedDepts,
    setLinkedSubdepts,
    setLinkedGroups,
    setLinkedItems
  ].reduce((acc, handler, index) => ({
    ...acc,
    [Object.keys(TYPES)[index]]: (payload: TLinkedResData) => handler(
      handleLinkedItems(
        resLinkData[Object.keys(TYPES)[index]],
        {
          ...payload,
          key: Object.keys(TYPES)[index]
        }
      )
    )
  }), {});

  const handleDataConfig = (data: TCustomData<boolean>) => {
    setLinkedDataConfig(linkedDataConfig ? { ...linkedDataConfig, ...data } : { ...data });
  }

  /**
   * Проверка наличия объекта в массиве привязанных к ресурсу элементов
   * @returns {boolean}
   */
  const isLinkedItemActive = (arr: TItemsArr, data: TItemData): boolean => arr.map(item => item[ID_KEY]).includes(data[ID_KEY]);

  /**
   * Обновляет массив подкатегории при удалении прикреплённого к ресурсу элемента
   * @property {object[]} arr - массив текущих элементов, прикреплённых к ресурсу
   * @property {object[]} items - массив передаваемых элементов
   * @property {string} key - ключ подкатегории
   * @property {string} action - тип действия
   */
  const handleExistableItems = (
    { arr, items }: TCustomData<TItemsArr>,
    { key, action }: TCustomData<string>
  ) => {
    const isOptionRemoved = [
      key,
      key !== DEPT_KEY,
      action === 'removeOption'
    ].reduce((acc, item) => acc && Boolean(item), true);

    if(!isOptionRemoved) {
      return;
    }

    existableDataHandlers[key](
      sortStrArray(
        fetchArray(
          [
            ...existableData[key],
            ...arr.filter(item => !items.map(data => data[ID_KEY]).includes(item[ID_KEY]))
          ],
          ID_KEY
        ),
        NAME_KEY
      )
    );
  };

  /**
   * Возвращает массив элементов для установки нового состояния
   * @returns {object[]} массив подходящих элементов
   * @property {object[]} arr - массив текущих элементов, прикреплённых к ресурсу
   * @property {object[]} items - массив передаваемых элементов
   * @property {object} data
   * @property {string} key - ключ подкатегории
   * @property {string} action - тип действия
   */
  const handleLinkedItems = (arr: TItemsArr, { action, data, items, key }: TLinkedResData): TItemsArr => {
    handleExistableItems(
      { arr, items: items || [] },
      { key: key || '', action: action || '' }
    );

    if(!data) {
      return items && Array.isArray(items) ? [...items] : [];
    }

    return isLinkedItemActive(arr, data)
      ? [...arr].filter(item => item !== data)
      : [...arr, data];
  };

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


  /**
   * Формирует массив дочерних элементов выбранных категорий
   * @returns {object[]} массив подходящих элементов
   * @property {object[]} arr - массив объектов родительской категории
   * @property {string} categoryKey - ключ параметра категории, напр. DEPT_KEY
   * @property {string} currentKey - ключ параметра дочернего элемента, напр. SUBDEPT_KEY
   * @property {string} extendedKey - ключ для выборки услуг, вложенных напрямую в специализацию, напр. GROUP_KEY
   */
  const filterItems = (
    arr: TItemsArr,
    categoryKey: string,
    currentKey: string,
    extendedKey: string = ''
  ): TItemsArr => {
    if(!arr.length) {
      resLinkHandlers[currentKey]({ items: [] });

      return [];
    }

    const subCategoryItems: TItemsArr = sortStrArray(
      getMatchedItems(
        arr,
        [ITEM_KEY, GROUP_KEY].includes(currentKey)
          ? pricelist[TYPES[currentKey]]
          : pricelist[TYPES[currentKey]].filter(
              item => !resLinkData[currentKey].map(data => data[ID_KEY]).includes(item[ID_KEY])
            ),
        categoryKey
      ),
      NAME_KEY
    ).map(
      (item) => {
        const category = arr.find(data => item[categoryKey] === data[ID_KEY]);

        return {
          ...item,
          [LABEL_KEY]: item[NAME_KEY],
          [CATEGORY_KEY]: category ? category[NAME_KEY] : ''
        };
      }
    );

    resLinkHandlers[currentKey]({
      items: getMatchedItems(arr, resLinkData[currentKey], categoryKey)
    });

    return sortStrArray(
      extendedKey
        ? subCategoryItems.filter(item => item[extendedKey] === 0)
        : subCategoryItems,
      CATEGORY_KEY
    );
  };

  const updateLinkedDataConfig = () => {
    if(linkedDataConfig !== null && linkedDataConfig[IS_COMPLEX_DATA_KEY] !== undefined) {
      setLinkedItems([]);
    }

    if(linkedDataConfig !== null && linkedDataConfig[IS_GROUPS_IGNORED_KEY]) {
      setExistableItems(
        filterItems(linkedSubdepts, SUBDEPT_KEY, ITEM_KEY)
      );
    } else {
      setExistableItems(
        filterItems(linkedSubdepts, SUBDEPT_KEY, ITEM_KEY, GROUP_KEY)
      );
    }
  };

  const setChildrenData = (
    payload: TPricelistData,
    categoryKey: string,
    childrenKey: string
  ) => payload[TYPES[categoryKey]].map(item => ({
    ...item,
    [CHILDREN_KEY]: payload[TYPES[childrenKey]].filter(data => data[categoryKey] === item[ID_KEY])
  }));

  const setChildrenItems = (payload: TPricelistData) => {
    // TODO: настроить выборку, если группы проигнорированы
    const items = getMatchedItems(
      payload[TYPES[GROUP_KEY]],
      pricelist[TYPES[ITEM_KEY]],
      GROUP_KEY
    );

    const subdeptItems = getMatchedItems(
      payload[TYPES[SUBDEPT_KEY]],
      payload[TYPES[ITEM_KEY]],
      SUBDEPT_KEY
    );

    const groups = payload[TYPES[GROUP_KEY]].map(item => ({
      ...item,
      [TYPES[ITEM_KEY]]: items.filter(data => data[GROUP_KEY] === item[ID_KEY])
    }));

    const subdepts = payload[TYPES[SUBDEPT_KEY]].map(item => ({
      ...item,
      [TYPES[GROUP_KEY]]: groups.filter(data => data[SUBDEPT_KEY] === item[ID_KEY]),
      [TYPES[ITEM_KEY]]: subdeptItems.filter(data => data[SUBDEPT_KEY] === item[ID_KEY] && data[GROUP_KEY] === 0)
    }));

    const depts = payload[TYPES[DEPT_KEY]].map(item => ({
      ...item,
      [TYPES[SUBDEPT_KEY]]: subdepts.filter(data => data[DEPT_KEY] === item[ID_KEY])
    }));

    return depts;
  };

  const updateLinkedItems = (data: TPricelistData) => {
    console.log(data);
  };

  const renderLinkedItems = (data: TPricelistData) => {
    setList(setChildrenItems(data));
    //console.log(data);
  };

  useEffect(() => {
    updateLinkedDataConfig();
  }, [
    linkedDataConfig
  ]);

  useEffect(() => {
    setExistableGroups(
      filterItems(linkedSubdepts, SUBDEPT_KEY, GROUP_KEY)
    );
    setExistableItems(
      filterItems(linkedSubdepts, SUBDEPT_KEY, ITEM_KEY, GROUP_KEY)
    );
    setLinkedDataConfig(null);
  }, [
    linkedSubdepts
  ]);

  useEffect(() => {
    setExistableSubdepts(
      filterItems(linkedDepts, DEPT_KEY, SUBDEPT_KEY)
    );
    setLinkedDataConfig(null);
  }, [
    linkedDepts
  ]);

  useEffect(() => {
    setExistableDepts(pricelist[TYPES[DEPT_KEY]]);
  }, [
    pricelist[TYPES[DEPT_KEY]]
  ]);

  return {
    existableDepts,
    existableSubdepts,
    existableGroups,
    existableItems,

    linkedDepts,
    linkedSubdepts,
    linkedGroups,
    linkedItems,

    linkedDataConfig,

    resLinkHandlers,
    isLinkedItemActive,
    handleDataConfig,
    updateLinkedItems,
    renderLinkedItems,

    list
  }
}

export default useResLinks;
