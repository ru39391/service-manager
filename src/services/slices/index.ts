import { fileReducer, fileActions } from './file-slice';
import { pricelistReducer, pricelistActions } from './pricelist-slice';
import { modalReducer, modalActions } from './modal-slice';

const reducer = {
  file: fileReducer,
  pricelist: pricelistReducer,
  modal: modalReducer,
};

export type TAppActions = typeof fileActions | typeof pricelistActions | typeof modalActions;
export default reducer;
