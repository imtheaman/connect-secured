import { combineReducers } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import MessagesReducer from "./messagesSlice";
import uiReducer from "./uiSlice";
const rootReducer = combineReducers({
    chat: chatReducer,
    ui: uiReducer,
    messages: MessagesReducer
})
export default rootReducer