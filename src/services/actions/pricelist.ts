import axios from 'axios';
/*
import {

} from '../slices/pricelist-slice';
*/
import type { TCustomData } from '../../types';
import type { TAppThunk, TAppDispatch } from '../../services/store';

/*
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

const [acct, perm] = await Promise.all([getUserAccount(), getUserPermissions()]);
*/

const fetchPricelistData = (): TAppThunk<void> => async (dispatch: TAppDispatch) => {

  // dispatch(); // isLoading = true

  try {
    const response = await axios.get('/api/pricelist');
    console.log(response);
  } catch(error) {
    console.error(error);
  }
};

export {
  fetchPricelistData
}
