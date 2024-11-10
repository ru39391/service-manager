import { FC, useCallback, useMemo } from 'react';
import { IconButton } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';

import { TFormData } from '../services/slices/form-slice';

import type { TItemData, TUrlData } from '../types';

import { EDIT_ACTION_KEY, PARSER_KEY } from '../utils/constants';

interface IDeleteIconBtn {
  formData: TFormData | null;
  urlData: TUrlData;
  openModal: (payload: { data: TItemData; type: string; isParserData: boolean; }) => Promise<void>;
}

const DeleteIconBtn: FC<IDeleteIconBtn> = ({ formData, urlData, openModal }) => {
  const isParserData = useMemo(() => urlData.type === PARSER_KEY, [urlData]);
  const isIconVisible = useMemo(() => {
    if(!formData) {
      return Boolean(formData);
    }

    const { action, type } = formData;

    return isParserData || (action === EDIT_ACTION_KEY && type !== urlData.type)
  }, [
    isParserData,
    formData,
    urlData
  ]);
  const openConfirmModal = useCallback(() => {
    if(!formData) {
      return;
    }

    const { data, type } = formData;

    openModal({ data, type, isParserData });
  }, [
    isParserData,
    formData
  ]);

  if(!isIconVisible) {
    return '';
  }

  return (
    <IconButton
      sx={{ p: 1, color: 'red' }}
      onClick={openConfirmModal}
    >
      <DeleteOutlined fontSize="medium" />
    </IconButton>
  )
}

export default DeleteIconBtn;
