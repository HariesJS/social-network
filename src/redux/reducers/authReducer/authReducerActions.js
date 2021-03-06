import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI } from "../../../api/api";
import { GET_AUTH_DATA, POST_LOGIN } from "./authReducer";

export const getMyAuthData = () => async dispatch => {
    try {
        const response = await authAPI.authData();
        if (!response?.data?.messages.length) {
            dispatch({ type: GET_AUTH_DATA, authData: response.data.data });
        }
    } catch (e) {
        console.log(e);
    }

}

export const logoutMeThunk = () => async dispatch => {
    try {
        const response = await authAPI.logout();
        if (!response?.data?.messages.length) {
            await AsyncStorage.removeItem('@saveProfile');
            dispatch({ type: POST_LOGIN, isAuth: false });
        }
    } catch (e) {
        console.log(e);
    }
}

export const loginMeThunk = (values) => async dispatch => {
    try {
        const response = await authAPI.login(values);
        if (!response?.data?.messages.length) {
            dispatch({ type: POST_LOGIN, isAuth: true });
            dispatch(getMyAuthData());
            if (values.rememberMe) {
                await AsyncStorage.setItem('@saveProfile', JSON.stringify({
                    email: values.email,
                    password: values.password,
                  }));
            }
        }
    } catch (e) {
        console.log(e);
    }
}