import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcons } from './AppHeaderIcons';

export const MenuBack = ({nav, size = 24, color = '#fff', type = 'ios-arrow-back'}) => {
    const goBack = () => {
        nav.goBack();
    };

  return (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcons}>
      <Item
        iconSize={size}
        title="menu-back"
        iconName={type}
        onPress={goBack}
        buttonStyle={{
        //   paddingRight: 25,
        //   paddingLeft: 0,
        }}
        color={color}
      />
    </HeaderButtons>
  );
};
