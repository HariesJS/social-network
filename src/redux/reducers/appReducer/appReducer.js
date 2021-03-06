export const SET_PROFILE_THEME = 'NewAp/appReducer/SET-PROFILE-THEME';

export const initialState = {
    profileDarkTheme: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE_THEME: return {
            ...state,
            profileDarkTheme: action.profileDarkTheme
        }
        default:
            return state;
    }
}