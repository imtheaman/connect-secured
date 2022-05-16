import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../local-states/store";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default useAppSelector;
