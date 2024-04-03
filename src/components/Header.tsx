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
import useHeader from '../hooks/useHeader';

import { useDispatch } from '../services/hooks';
import { setFormData } from '../services/slices/modal-slice';

import {
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
  const { pageTitle, categoryData } = useHeader();
  const title = pageTitle || categoryData.category;

  const dispatchFormData = (action: string) => {
    const { alias, id, key } = categoryData;

    dispatch(setFormData({
      data: {
        action,
        type: alias as string,
        data: {
          [key as string]: id as number
        }
      }
    }));
  }

  const addCategory = () => {
    toggleModal({ title: `${categoryData.category}, ${ADD_CATEGORY_TITLE.toLocaleLowerCase()}` });
    dispatchFormData(ADD_ACTION_KEY);
  }

  const editCategory = () => {
    toggleModal({ title: `${EDIT_TITLE} ${pageTitle && (`«${pageTitle}»`)}` });
    dispatchFormData(EDIT_ACTION_KEY);
  }

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
        {categoryData.id && <Tooltip
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
        <Tooltip
          placement="top"
          title={ADD_CATEGORY_TITLE}
        >
          <IconButton
            sx={{ p: 0, color: 'text.secondary' }}
            onClick={addCategory}
          >
            <Add fontSize="large" />
          </IconButton>
        </Tooltip>
        {categoryData.id && <Tooltip
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
        <Link
          href={`/${categoryData.alias}`}
          color="inherit"
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {categoryData.category}
        </Link>
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
