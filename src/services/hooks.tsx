import {
  useSelector as selectorHook,
  useDispatch as dispatchHook,
  TypedUseSelectorHook
} from 'react-redux';
import type { TRootState, TThunkDispatch } from '../services/store';

const useDispatch = () => dispatchHook<TThunkDispatch>();
const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;

export {
  useDispatch,
  useSelector
};
