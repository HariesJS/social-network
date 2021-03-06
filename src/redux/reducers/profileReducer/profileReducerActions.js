import { GET_PROFILE } from "./profileReducer";
import { profileAPI } from '../../../api/api';

export const getProfileThunk = () => async (dispatch, getState) => {
    try {
        const response = await profileAPI.getProfile(getState().authAPI.authData.id);
        dispatch({ type: GET_PROFILE, profile: response.data });
    } catch (e) {
        console.log(1, e);
    }
}

export const putAvatarThunk = img => async dispatch => {
    try {
        await profileAPI.putAvatar(img);
        dispatch(getProfileThunk());
    } catch (e) {
        console.log(e.response);
    }
}