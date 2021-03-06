export const SET_LANGUAGE = 'NewApp/languagesReducer/SET-LANGUAGE';

const initialState = {
    langs: null
}

export const languagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LANGUAGE: return {
            ...state,
            langs: action.langs
        }
        default:
            return state;
    }
}