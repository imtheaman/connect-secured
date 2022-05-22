import { combineReducers } from "@reduxjs/toolkit";
import sessionReducer from "./sessionSlice";
import uiReducer from "./uiSlice";
const rootReducer = combineReducers({
    session: sessionReducer,
    ui: uiReducer,
})
export default rootReducer