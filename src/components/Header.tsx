import { FC } from 'react';
import { Typography, Breadcrumbs, Link } from '@mui/material';

import useHeader from '../hooks/useHeader';

const Header: FC = () => {
  const { pageTitle, categoryData } = useHeader();
  const title = pageTitle || categoryData.category;

  return (
    title && <>
      <Typography variant="h5" sx={{ mb: 1 }}>{title}</Typography>
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
