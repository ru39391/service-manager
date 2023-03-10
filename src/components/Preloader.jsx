import useDepts from '../store/DeptsStore';
import usePricelist from '../store/PlStore';
import { LinearProgress } from '@mui/material';

function Preloader() {
  const isLoadingArr = [
    useDepts(state => state.isLoading),
    usePricelist(state => state.isLoading),
  ];

  return (
    <>{isLoadingArr.every(item => item) && <LinearProgress />}</>
  )
}

export default Preloader;
