import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import api from '../utils/Api';
import { DEPTS_PATH } from '../utils/config';
import { DEPTS_ERROR_MSG } from '../utils/constants';

const useDepts = create(devtools((set, get) => ({
  depts: [],
  isLoading: true,
  error: null,
  fetchDepts: api.fetchData(DEPTS_PATH)
    .then((res) => {
      set({ depts: res.data, isLoading: false, error: null })
    })
    .catch((err) => {
      set({ depts: [], isLoading: false, error: DEPTS_ERROR_MSG })
    }),
})));

export default useDepts;
