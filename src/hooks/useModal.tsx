import {
  useState,
  useEffect,
  createElement,
  ReactNode,
  FunctionComponent
} from 'react';

import { useDispatch } from '../services/hooks';
import { setModalOpen, setModalClose } from '../services/slices/modal-slice';

import type { TCustomData } from '../types';

interface IModal {
  modalContent: ReactNode | null;
  toggleModal: (data: TCustomData<string> | null) => void;
}

const useModal = (fc: FunctionComponent | undefined = undefined): IModal => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const dispatch = useDispatch();

  const toggleModal = (data: TCustomData<string> | null): void => {
    data ? dispatch(setModalOpen({ title: data.title, desc: data.desc })) : dispatch(setModalClose());
  }

  const handleComponent = ({ el, props }: { el: FunctionComponent | undefined; props: TCustomData<null>; }): void => {
    const component = el ? createElement(el, {...props}) : null;

    setModalContent(component);
  }

  useEffect(() => {
    handleComponent({
      el: fc,
      props: {
        data: null,
      },
    });
  }, []);

  return {
    modalContent,
    toggleModal
  };
}

export default useModal;
