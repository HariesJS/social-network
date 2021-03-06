import { SET_PROFILE_THEME } from "./appReducer"

export const changeProfileTheme = theme => async dispatch => {
    dispatch({ type: SET_PROFILE_THEME, profileDarkTheme: theme });
}