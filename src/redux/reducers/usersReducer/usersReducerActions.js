import { profileAPI, usersAPI } from "../../../api/api"
import { GET_USERS, SET_CURRENT_PAGE, LOAD_MORE_USERS, GET_OTHER_USER, GET_FOLLOW, SET_LOADER } from "./usersReducer";

export const setLoaderUserCreator = (buttonLoader, pageLoader) => ({
    type: SET_LOADER,
    buttonLoader,
    pageLoader
})

export const getUsersThunk = currentPage => async dispatch => {
    try {
        const response = await usersAPI.getUsers(currentPage);
        dispatch({ type: GET_USERS, users: response.data });
        console.log(response.data);
    } catch (e) {
        console.log(e);
    }
}

export const loadMoreUsersThunk = page => async dispatch => {
    try {
        const response = await usersAPI.getUsers(page);
        dispatch({ type: LOAD_MORE_USERS, users: response.data.items });
    } catch (e) {
        console.log(e);
    }
}

export const setCurrentPageCreator = currentPage => ({
    type: SET_CURRENT_PAGE,
    currentPage
})

export const getOtherUserThunk = (id, toggle, withoutLoader) => async dispatch => {
    try {
        !withoutLoader && dispatch(setLoaderUserCreator(false, true));
        const response = await profileAPI.getProfile(id);
        dispatch({ type: GET_OTHER_USER, otherUser: response.data });
        await dispatch(getFollowUser(id));
        toggle.current = true;
    } catch (e) {
        console.log(e);
    } finally {
        !withoutLoader && dispatch(setLoaderUserCreator(false, false));
    }
}

export const followUserThunk = (id, isFollow) => async dispatch => {
    try {
        dispatch(setLoaderUserCreator(true));
        const response = await usersAPI.followUser(id, isFollow);
        console.log(99, response.data);
        dispatch({ type: GET_FOLLOW, followed: !isFollow });
        dispatch(setLoaderUserCreator(false));
    } catch (e) {
        console.log(e.response);
    } finally {
        dispatch(setLoaderUserCreator(false));
    }
}

export const getFollowUser = id => async dispatch => {
    try {
        const response = await usersAPI.getFollow(id);
        dispatch({ type: GET_FOLLOW, followed: response.data });
    } catch (e) {
        console.log(e);
    }
}