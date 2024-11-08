import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  RESLINKS_KEY,
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
  IS_GROUP_IGNORED_KEY
} from '../utils/constants';

import { useSelector } from '../services/hooks';

import type {
  TCustomData,
  TItemsArr,
  TItemData,
  TPricelistData
} from '../types';

import { sortStrArray, fetchArray, getMatchedItems } from '../utils';

type TLinkedResData = {
  action?: string;
  data?: TItemData;
  items?: TItemsArr;
  key?: string;
};

interface IResLinks {
  existableDepts: TItemsArr;
  existableSubdepts: TItemsArr;
  existableGroups: TItemsArr;
  existableItems: TItemsArr;
  linkedDepts: TItemsArr;
  linkedSubdepts: TItemsArr;
  linkedGroups: TItemsArr;
  linkedItems: TItemsArr;
  linkedDataConfig: TCustomData<boolean> | null;
  resLinkHandlers: TCustomData<(payload: TLinkedResData) => void>;
  isLinkedItemActive: (arr: TItemsArr, data: TItemData) => boolean;
  handleDataConfig: (data: TCustomData<boolean>) => void;
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

  const { id: resId } = useParams();

  const pricelist: TCustomData<TItemsArr>  = useSelector(
    ({ pricelist }) => [...Object.values(TYPES), RESLINKS_KEY].reduce((acc, key) => ({ ...acc, [key]: pricelist[key] }), {}
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

  const updateComplexDataConfig = () => {
    if(linkedDataConfig !== null && linkedDataConfig[IS_COMPLEX_DATA_KEY]) {
      setLinkedDataConfig({ [IS_COMPLEX_DATA_KEY]: true });
    } else {
      setLinkedDataConfig(null);
    }
  }

  const updateLinkedDataConfig = () => {
    if(linkedDataConfig !== null && linkedDataConfig[IS_COMPLEX_DATA_KEY] !== undefined) {
      setLinkedItems([]);
    }

    if(linkedDataConfig !== null && linkedDataConfig[IS_GROUP_IGNORED_KEY]) {
      setExistableItems(
        filterItems(linkedSubdepts, SUBDEPT_KEY, ITEM_KEY)
      );
    } else {
      setExistableItems(
        filterItems(linkedSubdepts, SUBDEPT_KEY, ITEM_KEY, GROUP_KEY)
      );
    }
  };

  const setResLinks = () => {
    const data = pricelist[RESLINKS_KEY].find(item => item[ID_KEY] === Number(resId));

    if(!data) {
      return;
    }

    setLinkedDataConfig(JSON.parse(data.config as string));

    Object.values(TYPES).forEach((key, index) => {
      //console.log(pricelist[key].filter(item => JSON.parse(data[key]).includes(item[ID_KEY])));
      resLinkHandlers[Object.keys(TYPES)[index]]({
        items: pricelist[key].filter(item => JSON.parse(data[key] as string).includes(item[ID_KEY]))
      })
    });
  }

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
    updateComplexDataConfig();
  }, [
    linkedSubdepts
  ]);

  useEffect(() => {
    setExistableSubdepts(
      filterItems(linkedDepts, DEPT_KEY, SUBDEPT_KEY)
    );
    setLinkedDataConfig(null);
    console.log({linkedDepts, subdepts: filterItems(linkedDepts, DEPT_KEY, SUBDEPT_KEY)});
  }, [
    linkedDepts
  ]);

  useEffect(() => {
    setExistableDepts(pricelist[TYPES[DEPT_KEY]]);
  }, [
    pricelist[TYPES[DEPT_KEY]]
  ]);

  useEffect(() => {
    setResLinks();
  }, [
    pricelist[RESLINKS_KEY]
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
    handleDataConfig
  }
}

export default useResLinks;
