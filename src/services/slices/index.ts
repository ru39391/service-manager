import { fileReducer, fileActions } from './file-slice';

const reducer = {
  file: fileReducer,
};

export type TAppActions = typeof fileActions;
export default reducer;
