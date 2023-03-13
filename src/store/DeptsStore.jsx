import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import api from '../utils/Api';
import { DEPTS_PATH, SUBDEPTS_PATH, GROUPS_PATH } from '../utils/config';
import { DEPTS_ERROR_MSG } from '../utils/constants';

const useDepts = create(devtools((set, get) => ({
  depts: [],
  subdepts: [],
  groups: [],
  navExpanders: [],
  currChapter: {},
  isLoading: true,
  error: null,
  getChildren: (arr, param) => arr.map(item => Object.values(item[param])).flat(),
  setNavExpanders: (arr) => arr.map(({ id }) => ({ id, isExpanded: false })),
  setCurrChapter: ({ id, type }) => set({ currChapter: { id, type } }),
  expandChildren: (id) => set({
    navExpanders: get().navExpanders.map((item) => {
      if(item.id === id) item.isExpanded = !item.isExpanded;
      return item;
    }),
  }),
  fetchDepts: Promise.all([DEPTS_PATH, SUBDEPTS_PATH, GROUPS_PATH].map(item => api.fetchData(item)))
    .then(([...res]) => {
      const [depts, subdepts, groups] = res.map(({ data }) => data);
      set({
        depts,
        subdepts,
        groups,
        navExpanders: get().setNavExpanders(depts),
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
