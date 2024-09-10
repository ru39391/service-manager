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

type TResParent = {
  parent_id: number,
  name: string,
  uri: string,
};

type TResTemplate = {
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
