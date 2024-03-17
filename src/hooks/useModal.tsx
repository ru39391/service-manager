import {
  useState,
  useEffect,
  createElement,
  ReactNode
} from 'react';

import DataForm from '../components/DataForm';

import { useDispatch } from '../services/hooks';
import { setModalOpen, setModalClose } from '../services/slices/modal-slice';

import type { TCustomData } from '../types';

import { NAME_KEY, TYPES, TITLES } from '../utils/constants';

interface IModal {
  modalContent: ReactNode | null;
  toggleModal: (data: TCustomData<string> | null) => void;
}

const useModal = (): IModal => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const dispatch = useDispatch();

  const toggleModal = (data: TCustomData<string> | null): void => {
    data ? dispatch(setModalOpen({ title: data.title, desc: data.desc })) : dispatch(setModalClose());
  }

  const handleComponent = ({ el, props }): void => {
    const component = createElement(el, {...props});

    setModalContent(component);
  }

  useEffect(() => {
    handleComponent({
      el: DataForm,
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
