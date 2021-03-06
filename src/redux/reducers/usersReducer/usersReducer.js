export const GET_USERS = 'NewApp/usersReducer/GET-USERS';
export const LOAD_MORE_USERS = 'NewApp/usersReducer/LOAD-MORE-USERS';
export const SET_CURRENT_PAGE = 'NewApp/usersReducer/SET-CURRENT-PAGE';
export const GET_OTHER_USER = 'NewApp/usersReducer/GET-OTHER-USER';
export const GET_FOLLOW = 'NewApp/usersReducer/GET-FOLLOW';
export const SET_LOADER = 'NewApp/usersReducer/SET-LOADER';

const initialState = {
    users: null,
    currentPage: 1,
    otherUser: null,
    setLoader: {
        buttonLoader: false,
        pageLoader: false
    }
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS: return {
            ...state,
            users: action.users
        }
        case LOAD_MORE_USERS: return {
            ...state,
            users: {
                items: [...state.users.items, ...action.users],
            }
        }
        case SET_CURRENT_PAGE: return {
            ...state,
            currentPage: action.currentPage
        }
        case GET_OTHER_USER: return {
            ...state,
            otherUser: action.otherUser
        }
        case GET_FOLLOW: return {
            ...state,
            otherUser: {
                ...state.otherUser,
                followed: action.followed
            }
        }
        case SET_LOADER: return {
            ...state,
            setLoader: {
                buttonLoader: action.buttonLoader,
                pageLoader: action.pageLoader
            }
        }
        default:
            return state;
    }
}