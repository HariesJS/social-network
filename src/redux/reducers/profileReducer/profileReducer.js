export const GET_PROFILE = 'NewApp/profileReducer/GET-PROFILE';

const initialState = {
    profile: null
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE: return {
            ...state,
            profile: action.profile
        }
        default:
            return state;
    }
}

