import useDepts from '../store/DeptsStore';
import { LinearProgress } from '@mui/material';

function Preloader() {
  const isDeptsLoading = useDepts(state => state.isLoading);

  return (
    <>{isDeptsLoading && <LinearProgress />}</>
  )
}

export default Preloader;
