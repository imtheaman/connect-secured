import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../../apollo/types";

type ReduxMessages = {[chatId:string]: Message[]}
const messagesSlice = createSlice({
    name: 'messages',
    initialState: {} as ReduxMessages,
    reducers : {
        pushMessage: (state: ReduxMessages, action: PayloadAction<{chatId: string, content: Message}>) => {
            state[action.payload.chatId].push(action.payload.content)
        }
    }
})

const {actions, reducer: MessagesReducer} = messagesSlice;
export const {pushMessage} = actions
export default MessagesReducer;