import useDepts from '../store/DeptsStore';
import usePriceList from '../store/PriceListStore';
import { LinearProgress } from '@mui/material';

function Preloader() {
  const isLoadingArr = [
    useDepts(state => state.isLoading),
    usePriceList(state => state.isLoading),
  ];

  return (
    <>{isLoadingArr.every(item => item) && <LinearProgress />}</>
  )
}

export default Preloader;
