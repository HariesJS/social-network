import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { appReducer } from '../reducers/appReducer/appReducer';
import { authReducer } from '../reducers/authReducer/authReducer';
import { chatsReducer } from '../reducers/chatsReducer.js/chatsReducer';
import { languagesReducer } from '../reducers/languagesReducer.js/languagesReducer';
import { profileReducer } from '../reducers/profileReducer/profileReducer';
import { usersReducer } from '../reducers/usersReducer/usersReducer';

const reducers = combineReducers({
    profileAPI: profileReducer,
    languagesAPI: languagesReducer,
    authAPI: authReducer,
    appAPI: appReducer,
    usersAPI: usersReducer,
    chatsAPI: chatsReducer
})

export default createStore(reducers, applyMiddleware(thunk));