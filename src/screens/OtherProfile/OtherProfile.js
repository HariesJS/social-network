import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOtherUserThunk } from '../../redux/reducers/usersReducer/usersReducerActions';
import { UserProfile } from '../../ui/UserProfile';

export const OtherProfile = ({ navigation, route }) => {
    const dispatch = useDispatch();

    const otherUser = useSelector(state => state.usersAPI.otherUser);

    const id = route.params.id;
    const name = route.params.name;

    useEffect(() => {
        if (id) {
            dispatch(getOtherUserThunk(id));
        }
    }, []);

    return (
        <UserProfile
            navigation={navigation}
            profile={otherUser}
            name={name}
            getUserProfile={() => dispatch(getOtherUserThunk(id, null, true))}
        />
    )
}