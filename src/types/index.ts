export type TCustomData<T> = {
  [key: string]: T;
};

export type TItemData = TCustomData<string | number | null>;

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
