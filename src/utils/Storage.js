import { Component } from 'react';

class Storage extends Component {
  constructor() {
    super();
    this._storage = localStorage;
  }

  _getItem(param) {
    return JSON.parse(this._storage.getItem(param));
  }

  _setItem(param, arr) {
    this._storage.setItem(param, JSON.stringify(arr));
    return this._getItem(param);
  }

  _isParamExist(param) {
    return Boolean(this._getItem(param));
  }

  handleData(param, arr) {
    return this._isParamExist(param) ? this._getItem(param) : this._setItem(param, arr);
  }
}

const storage = new Storage();

export default storage;
