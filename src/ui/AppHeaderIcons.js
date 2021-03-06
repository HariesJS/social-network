import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const AppHeaderIcons = props => (
    <HeaderButton
        IconComponent={Ionicons}
        iconSize={24}
        color='#fff'
        {...props}
    />
)