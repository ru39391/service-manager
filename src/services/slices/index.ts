import { fileReducer, fileActions } from './file-slice';
import { pricelistReducer, pricelistActions } from './pricelist-slice';
import { formReducer, formActions } from './form-slice';

const reducer = {
  file: fileReducer,
  pricelist: pricelistReducer,
  form: formReducer,
};

export type TAppActions = typeof fileActions | typeof pricelistActions | typeof formActions;
export default reducer;
