import { FC } from 'react';
import {
  Box,
  Link,
  Tooltip,
  Typography,
  Breadcrumbs,
  IconButton
} from '@mui/material';
import {
  Add,
  EditOutlined,
  DeleteOutlined
} from '@mui/icons-material';

import useModal from '../hooks/useModal';
import useCurrentData from '../hooks/useCurrentData';

import { useDispatch } from '../services/hooks';
import { setFormData } from '../services/slices/form-slice';

import {
  RES_KEY,
  EDIT_TITLE,
  REMOVE_TITLE,
  EDIT_ITEM_TITLE,
  ADD_CATEGORY_TITLE,
  ADD_ACTION_KEY,
  EDIT_ACTION_KEY,
  REMOVE_ACTION_KEY,
  REMOVE_CONFIRM_MSG
} from '../utils/constants';

const Header: FC = () => {
  const dispatch = useDispatch();
  const { toggleModal } = useModal();
  const {
    pageTitle,
    currentCategory,
    currentFormData,
    setCurrentFormValues
  } = useCurrentData();
  const title = pageTitle || currentFormData.caption as string;

  const dispatchFormData = (action: string) => {
    const { type } = currentFormData;

    dispatch(setFormData({
      data: {
        action,
        type: type as string,
        data: action === ADD_ACTION_KEY ? setCurrentFormValues(type as string) : currentCategory
      }
    }));
  }

  const addCategory = () => {
    toggleModal({ title: `${currentFormData.caption}, ${ADD_CATEGORY_TITLE.toLocaleLowerCase()}` });
    dispatchFormData(ADD_ACTION_KEY);
  }

  const editCategory = () => {
    toggleModal({ title: `${EDIT_TITLE} ${pageTitle && (`«${pageTitle}»`)}` });
    dispatchFormData(EDIT_ACTION_KEY);
  }

  // TODO: отследить баг удаления категории
  // TODO: вынести иконки в навигацию
  const removeCategory = () => {
    toggleModal({
      title: `${REMOVE_TITLE} ${pageTitle && (`«${pageTitle}»`)}`,
      desc: `${REMOVE_CONFIRM_MSG} ${REMOVE_TITLE.toLocaleLowerCase()} ${pageTitle && (`«${pageTitle}»`)}?`
    });
    dispatchFormData(REMOVE_ACTION_KEY);
  }

  return (
    title && <>
      <Box
        sx={{
          mb: 1,
          gap: '0 8px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Typography variant="h5">{title}</Typography>
        {currentFormData.id && currentFormData.type !== RES_KEY && <Tooltip
          placement="top"
          title={EDIT_ITEM_TITLE}
        >
          <IconButton
            sx={{ p: 1, color: 'text.secondary' }}
            onClick={editCategory}
          >
            <EditOutlined fontSize="medium" />
          </IconButton>
        </Tooltip>}
        {currentFormData.type !== RES_KEY && <Tooltip
          placement="top"
          title={ADD_CATEGORY_TITLE}
        >
          <IconButton
            sx={{ p: 0, color: 'text.secondary' }}
            onClick={addCategory}
          >
            <Add fontSize="large" />
          </IconButton>
        </Tooltip>}
        {currentFormData.id && currentFormData.type !== RES_KEY && <Tooltip
          placement="top"
          title={REMOVE_TITLE}
        >
          <IconButton
            sx={{ p: 1, color: 'text.secondary' }}
            onClick={removeCategory}
          >
            <DeleteOutlined fontSize="medium" />
          </IconButton>
        </Tooltip>}
      </Box>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 4, typography: 'subtitle2' }}
      >
        <Link
          href="/"
          color="inherit"
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          Главная
        </Link>
        {currentFormData.type !== RES_KEY && <Link
          href={`/${currentFormData.type}`}
          color="inherit"
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          >
            {currentFormData.caption as string}
        </Link>}
        {pageTitle && <Typography
          variant="subtitle2"
          color="text.primary"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {pageTitle}
        </Typography>}
      </Breadcrumbs>
    </>
  )
};

export default Header;
