import { chatsAPI } from "../../../api/api";
import { GET_CHATS, GET_CURRENT_CHAT, LOAD_MORE_MESSAGES, SEND_MESSAGE, SET_CHAT_PAGE } from "./chatsReducer";

export const getChatsThunk = () => async dispatch => {
    try {
        const response = await chatsAPI.getChats();
        dispatch({ type: GET_CHATS, chats: response.data });
    } catch (e) {
        console.log(e);
    }
}

export const getCurrentChatThunk = (id, page) => async dispatch => {
    try {
        dispatch(setChatPageCreator(1));
        const response = await chatsAPI.getCurrentChat(id, page);
        dispatch({ type: GET_CURRENT_CHAT, currentChat: response.data.items.reverse() });
    } catch (e) {
        console.log(e.response);
    }
}

export const sendMessageThunk = (id, data) => async dispatch => {
    try {
        await chatsAPI.sendMessage(id, data.body);
        dispatch({ type: SEND_MESSAGE, data });
        dispatch(getCurrentChatThunk(id));
    } catch (e) {
        console.log(e);
    }
}

export const loadMoreChatThunk = (id, page) => async dispatch => {
    try {
        const response = await chatsAPI.getCurrentChat(id, page);
        dispatch({ type: LOAD_MORE_MESSAGES, currentChat: response.data.items.reverse() });
    } catch (e) {
        console.log(e);
    }
}

export const setChatPageCreator = chatPage => ({
    type: SET_CHAT_PAGE,
    chatPage
})