export type TCustomData<T> = {
  [key: string]: T;
};

export type TResponseDefault = {
  success: boolean;
  data?: TCustomData<boolean | TCustomData<string | number>>;
  errors?: TCustomData<string | boolean | TCustomData<string | number>>;
  meta: TCustomData<string | number>;
};

export type TResponseData = {
  success: boolean[];
  data: TCustomData<TCustomData<string | number>[]>;
};
