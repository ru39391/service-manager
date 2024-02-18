import { Component } from 'react';
import { API_URL } from './constants';
import { TCustomData } from '../types';

class BaseApi extends Component<{}> {
  public _path: string;

  constructor(path: string) {
    super({});
    this._path = `${API_URL}${path}`;
  }

  public _setHeaders(jwt: string = ''): TCustomData<string> {
    return jwt
      ? {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${jwt}`
      }
      : {
        'Content-Type': 'application/json'
      };
  }

  public _checkResponse(result: Response, resultAlert: string): Promise<any> {
    if (result.ok) {
      return result.json();
    }

    return Promise.reject(`${resultAlert}: ${result.status}`);
  }
}

export default BaseApi;
