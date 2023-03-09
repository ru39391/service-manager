import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useNav = create(devtools((set, get) => ({
  expanders: [],
  currExpander: {},
  setExpanders: (arr) => set({
    expanders: arr.map((item) => {
      return {
        id: item.id,
        isExpanded: false,
      }
    })
  }),
  expandChildren: (id) => set({
    expanders: get().expanders.map((item) => {
      if(item.id === id) item.isExpanded = !item.isExpanded;
      return item;
    }),
    currExpander: get().expanders.find(item => item.id === id)
  }),
})));

export default useNav;
