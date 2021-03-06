export const POST_LOGIN = 'NewApp/authReducer/POST-LOGIN';
export const GET_AUTH_DATA = 'NewApp/authReducer/GET-AUTH-DATA';

const initialState = {
    isAuth: false,
    authData: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_LOGIN: return {
            ...state,
            isAuth: action.isAuth
        }
        case GET_AUTH_DATA: return {
            ...state,
            authData: action.authData
        }
        default:
            return state;
    }
}