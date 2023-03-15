import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import { PRICELIST_PATH, GROUPS_PATH, RESOURCES_PATH } from '../utils/config';
import { PRICE_TYPE_TITLE, GROUP_TYPE_TITLE, RES_TYPE_TITLE } from '../utils/constants';

const useTypesList = create(devtools((set, get) => ({
  types: [{
    key: PRICELIST_PATH,
    label: PRICE_TYPE_TITLE,
  },{
    key: GROUPS_PATH,
    label: GROUP_TYPE_TITLE,
  },{
    key: RESOURCES_PATH,
    label: RES_TYPE_TITLE,
  }],
  currType: {
    key: PRICELIST_PATH,
    label: PRICE_TYPE_TITLE,
  },
  changeType: (value, actionMeta) => {
    const { value: key, name: label } = actionMeta.props;
    set({ currType: { key, label } });
  }
})));

export default useTypesList;
