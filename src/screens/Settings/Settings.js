import React from 'react';
import { Text, View } from 'react-native';
import I18n from '../../translations/i18n';
import {
    Container,
    Separator,
    Content,
    Button,
    ListItem,
    Icon,
    Left,
    Body,
    Right,
    ActionSheet,
  } from 'native-base';
import { MenuBack } from '../../ui/MenuBack';
import { useDispatch } from 'react-redux';
import { logoutMeThunk } from '../../redux/reducers/authReducer/authReducerActions';

export const Settings = ({ navigation }) => {
    const dispatch = useDispatch();

    navigation.setOptions({
        headerTitle: I18n.t('settings'),
        headerLeft: () => <MenuBack nav={navigation} />
    })

    const Title = ({
        children,
        icon,
        color,
        onPress,
        endIcon,
        iconType,
        bolean,
        value,
        changeValue,
        textStyles,
      }) => (
        <ListItem icon onPress={onPress}>
          <Left>
            <Button style={{backgroundColor: color}}>
              <Icon type={iconType} active name={icon} />
            </Button>
          </Left>
          <Body style={{alignItems: 'flex-start'}}>
            <Text style={textStyles}>{children}</Text>
          </Body>
          {!textStyles && <Right>
            {bolean ? (
              <Switch value={value} onValueChange={changeValue} color="#f28e26" />
            ) : (
              <Icon name={endIcon} />
            )}
          </Right>}
        </ListItem>
      );

    const exit = () => {
        ActionSheet.show(
            {
                options: [`${I18n.t('exit')}`, `${I18n.t('cancel')}`],
                cancelButtonIndex: 1,
                destructiveButtonIndex: 0,
                title: `${I18n.t('wantToExit')}`
            },
            buttonIndex => {
                switch (buttonIndex) {
                    case 0:
                        dispatch(logoutMeThunk());
                        break;
                    default:
                        break;
                }
            }
        )
    }

    return (
        <Container>
          <Content>
            <Separator>
              <Text style={{textAlign: 'left'}}>{I18n.t('general')}</Text>
            </Separator>
            <Title
              iconType="AntDesign"
              onPress={() => navigation.navigate('Languages')}
              color="green"
              icon="earth">
              {I18n.t('languages')}
            </Title>
            <Separator>
              <Text style={{textAlign: 'left'}}>{I18n.t('profile')}</Text>
            </Separator>
            <Title
              onPress={exit}
              iconType="Ionicons"
            //   onPress={() => navigation.navigate('')}
              color="red"
              icon="md-exit-outline">
              {I18n.t('exit')}
            </Title>
            </Content>
        </Container>
    )
}