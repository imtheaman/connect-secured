import {useDispatch} from 'react-redux';
import { AppDispatch } from '../local-states/store';

const useAppDispatch = () => useDispatch<AppDispatch>()
export default useAppDispatch