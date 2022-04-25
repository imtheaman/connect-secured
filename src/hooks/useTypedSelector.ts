import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../local-states/store";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export default useTypedSelector;
