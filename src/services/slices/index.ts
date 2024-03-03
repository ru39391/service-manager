import { fileReducer, fileActions } from './file-slice';
import { pricelistReducer, pricelistActions } from './pricelist-slice';

const reducer = {
  file: fileReducer,
  pricelist: pricelistReducer,
};

export type TAppActions = typeof fileActions | typeof pricelistActions;
export default reducer;
