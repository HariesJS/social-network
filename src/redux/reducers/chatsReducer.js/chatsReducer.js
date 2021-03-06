export const GET_CHATS = 'NewApp/chatsReducer/GET-CHATS';
export const GET_CURRENT_CHAT = 'NewApp/chatsReducer/GET-CURRENT-CHAT';
export const SEND_MESSAGE = 'NewApp/chatsReducer/SEND-MESSAGE';
export const LOAD_MORE_MESSAGES = 'NewApp/chatsReducer/LOAD-MORE-MESSAGES';
export const SET_CHAT_PAGE = 'NewApp/chatsReducer/SET-CHAT-PAGE';

const initialState = {
    chats: null,
    currentChat: null,
    chatPage: 1
}

export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CHATS: return {
            ...state,
            chats: action.chats
        }
        case GET_CURRENT_CHAT: return {
            ...state,
            currentChat: action.currentChat
        }
        case SEND_MESSAGE: return {
            ...state,
            currentChat: [action.data, ...state.currentChat]
        }
        case LOAD_MORE_MESSAGES: return {
            ...state,
            currentChat: [...state.currentChat, ...action.currentChat]
        }
        case SET_CHAT_PAGE: return {
            ...state,
            chatPage: action.chatPage
        }
        default:
            return state;
    }
}