import { FC } from 'react';
import { LinearProgress } from '@mui/material';

import { useSelector } from '../services/hooks';

const Preloader: FC = () => {
  const {
    isFileUploading,
    isPricelistLoading
  } = useSelector(({ file, pricelist }) => ({
    isFileUploading: file.isFileUploading,
    isPricelistLoading: pricelist.isPricelistLoading
  }));
  const isLoading = isFileUploading || isPricelistLoading;


  return isLoading && <LinearProgress />;
}

export default Preloader;
