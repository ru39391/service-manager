const DEFAULT_DOC_TITLE = 'Управление услугами';

const CATEGORY_TITLE = 'Категория';

const DEPTS_ERROR_MSG = 'Ошибка при получении списка отделений';
const PRICELIST_ERROR_MSG = 'Ошибка при получении списка услуг';
const RESOURCES_ERROR_MSG = 'Ошибка при получении списка ресурсов';
const FILE_UPLOADING_ERROR_MSG = 'Ошибка при обработке файла';

const POPUP_TITLE = 'Изменить данные';

const INDEX_KEY = 'index';
const ID_KEY = 'item_id';
const NAME_KEY = 'name';
const PRICE_KEY = 'price';
const DEPT_KEY = 'dept';
const SUBDEPT_KEY = 'subdept';
const GROUP_KEY = 'group';

const IS_COMPLEX_ITEM_KEY = 'isComplexItem';
const IS_COMPLEX_KEY = 'isComplex';
const COMPLEX_KEY = 'complex';
const IS_VISIBLE_KEY = 'isVisible';

const ITEM_KEY = 'items';
const RES_KEY = 'res';

const TITLES = {
  [DEPT_KEY]: 'Отделения',
  [SUBDEPT_KEY]: 'Специализации',
  [GROUP_KEY]: 'Группы услуг',
  [ITEM_KEY]: 'Услуги',
  [RES_KEY]: 'Ресурсы'
};

const SORT_CAPTION = 'Порядок сортировки';

const CAPTIONS = {
  [INDEX_KEY]: '№',
  [ID_KEY]: 'ID',
  [NAME_KEY]: 'Название',
  [PRICE_KEY]: 'Цена, руб.',
  [DEPT_KEY]: 'Отделение',
  [SUBDEPT_KEY]: 'Специализация',
  [GROUP_KEY]: 'Группа',
  [IS_COMPLEX_ITEM_KEY]: 'Входит в комплекс',
  [IS_COMPLEX_KEY]: 'Комплекс услуг',
  [COMPLEX_KEY]: 'Услуги в комплексе',
  [IS_VISIBLE_KEY]: 'Показывать на сайте',
};

const TYPES = {
  [DEPT_KEY]: `${DEPT_KEY}s`,
  [SUBDEPT_KEY]: `${SUBDEPT_KEY}s`,
  [GROUP_KEY]: `${GROUP_KEY}s`,
  [ITEM_KEY]: 'pricelist'
};

const API_URL = 'http://stomistok.local/api/';

export {
  DEFAULT_DOC_TITLE,
  DEPTS_ERROR_MSG,
  PRICELIST_ERROR_MSG,
  RESOURCES_ERROR_MSG,
  FILE_UPLOADING_ERROR_MSG,
  POPUP_TITLE,
  CATEGORY_TITLE,
  INDEX_KEY,
  ITEM_KEY,
  ID_KEY,
  NAME_KEY,
  PRICE_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY,
  IS_COMPLEX_ITEM_KEY,
  IS_COMPLEX_KEY,
  COMPLEX_KEY,
  IS_VISIBLE_KEY,
  SORT_CAPTION,
  CAPTIONS,
  TITLES,
  TYPES,
  API_URL
};
