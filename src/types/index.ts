export type TCustomData<T> = {
  [key: string]: T;
};

export type TItemData = TCustomData<string | number | null>;

export type TItemsArr = TItemData[];

export type TPricelistData = TCustomData<TItemsArr>;

export type TResponseDefault = {
  success: boolean;
  data?: TCustomData<boolean | TItemData>;
  errors?: TCustomData<string | boolean | TItemData>;
  meta: TCustomData<string | number>;
};

export type TResponseData = {
  success: boolean[];
  data: TCustomData<TItemsArr>;
};
