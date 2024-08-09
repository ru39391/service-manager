import { FILE_UPLOADING_ERROR_MSG } from '../../utils/constants';
import {
  getFileUploading,
  getFileUploadingSucceed,
  getFileUploadingFailed
} from '../slices/file-slice';
import type { TPricelistData, TItemsArr } from '../../types';
import type { TAppThunk, TAppDispatch } from '../../services/store';

const validateData = (data: TPricelistData): Promise<{ isSucceed: boolean; }> => {
  const isSucceed = Object.values(data).map((item: TItemsArr) => Boolean(item)).every((item: boolean) => item);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ isSucceed });
    }, 200);
  });
}

const handleFile = (data: TPricelistData): TAppThunk<void> => async (dispatch: TAppDispatch) => {
  dispatch(getFileUploading());

  try {
    const { isSucceed } = await validateData(data);

    if(isSucceed) {
      dispatch(getFileUploadingSucceed(data));
    } else {
      dispatch(getFileUploadingFailed({ errorMsg: FILE_UPLOADING_ERROR_MSG }));
    }
  } catch(error) {
    dispatch(getFileUploadingFailed({ errorMsg: FILE_UPLOADING_ERROR_MSG }));
  }
};

export {
  handleFile
}
