import {
  ID_KEY,
  NAME_KEY,
  PRICE_KEY,
  DEPT_KEY,
  SUBDEPT_KEY,
  GROUP_KEY
} from '../utils/constants';

export type TCustomData<T> = {
  [key: string]: T;
};

export type TItemData = TCustomData<string | number>;

export type TItemsArr = TItemData[];

export type TPricelistData = TCustomData<TItemsArr>;

export type TResponseList = TItemsArr | TCustomData<TItemData>;

export type TResponseItems = {
  success: boolean;
  message?: string;
  counter: TCustomData<number>;
  succeed?: TResponseList;
  failed?: TResponseList;
  inValid: TResponseList;
};

export type TResponseDefault = {
  success: boolean;
  data?: TResponseItems;
  errors?: TResponseItems;
  meta: TCustomData<string | number>;
};

export type TResponseData = {
  success: boolean[];
  data: TCustomData<TItemsArr>;
};

export type TResParent = {
  parent_id: number,
  name: string,
  uri: string,
};

export type TResTemplate = {
  template_id: number,
  name: string,
};

type TResDate = {
  value: number,
  date: string,
};

export type TResourceData = {
  id: number,
  isParent: boolean,
  name: string,
  uri: string,
  parent: TResParent,
  template: TResTemplate,
  publishedon: TResDate,
  editedon: TResDate,
};

export type TLinkedData = {
  [ID_KEY]: number;
  [NAME_KEY]: string;
};

export type TLinkedItemData = {
  [DEPT_KEY]: number;
  [SUBDEPT_KEY]: number;
};

export type TLinkedItem = TLinkedData & TLinkedItemData & {
  [PRICE_KEY]: number;
  [GROUP_KEY]: number;
};

export type TLinkedGroup = TLinkedData & TLinkedItemData & {
  pricelist: TLinkedItem[];
};

export type TLinkedSubdept = TLinkedData & {
  [DEPT_KEY]: number;
  groups: TLinkedGroup[];
  pricelist: TLinkedItem[];
};

export type TLinkedDept = TLinkedData & {
  subdepts: TLinkedSubdept[];
};

export type TResLinkedAction = {
  action: string;
  data: TItemData;
};
