import {
  useState,
  useEffect,
  createElement,
  ReactNode,
  FunctionComponent
} from 'react';

import { useDispatch } from '../services/hooks';
import { setFormVisible, setFormHidden } from '../services/slices/form-slice';

import type { TCustomData } from '../types';

type TModalData = {
  fc: FunctionComponent | undefined;
  payload?: TCustomData<null> | undefined;
};

interface IModal {
  modalContent: ReactNode | null;
  toggleModal: (data: TCustomData<string> | null) => void;
}

const useModal = ({ fc, payload }:TModalData = { fc: undefined, payload: { data: null } }): IModal => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const dispatch = useDispatch();

  const toggleModal = (data: TCustomData<string> | null): void => {
    data ? dispatch(setFormVisible({ title: data.title, desc: data.desc })) : dispatch(setFormHidden());
  }

  const handleComponent = ({ el, props }: { el: FunctionComponent | undefined; props: TCustomData<null>; }): void => {
    const component = el ? createElement(el, {...props}) : null;

    setModalContent(component);
  }

  useEffect(() => {
    handleComponent({
      el: fc,
      props: payload ? {...payload} : {}
    });
  }, []);

  return {
    modalContent,
    toggleModal
  };
}

export default useModal;
