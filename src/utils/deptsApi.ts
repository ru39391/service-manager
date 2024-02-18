import BaseApi from './baseApi';
import { DEPT_KEY, TYPES } from './constants';
import { TCustomData } from '../types';

class DeptsApi extends BaseApi {
  public create(arr: TCustomData<string | number>[]): Promise<any> {
    console.log(arr);
    return fetch(this._path, {
      method: 'POST',
      headers: this._setHeaders(),
      body: JSON.stringify(arr)
    })
      .then((res: Response) => console.log(res));
  }
}

const deptsApi: DeptsApi = new DeptsApi(TYPES[DEPT_KEY]);

export default deptsApi;
