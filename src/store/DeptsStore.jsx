import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import api from '../utils/Api';
import { DEPTS_PATH } from '../utils/config';
import { DEPTS_ERROR_MSG } from '../utils/constants';

const useDepts = create(devtools((set, get) => ({
  depts: [],
  navExpanders: [],
  currChapter: {},
  isLoading: true,
  error: null,
  setNavExpanders: (arr) => {
    return arr.map(({ id }) => ({ id, isExpanded: false }));
  },
  setCurrChapter: ({ id, type }) => set({ currChapter: { id, type } }),
  expandChildren: (id) => set({
    navExpanders: get().navExpanders.map((item) => {
      if(item.id === id) item.isExpanded = !item.isExpanded;
      return item;
    }),
  }),
  fetchDepts: api.fetchData(DEPTS_PATH)
    .then(({ data }) => {
      set({
        depts: data,
        navExpanders: get().setNavExpanders(data),
        isLoading: false,
        error: null,
      });
    })
    .catch((err) => set({
      isLoading: false,
      error: DEPTS_ERROR_MSG,
    })),
})));

export default useDepts;
