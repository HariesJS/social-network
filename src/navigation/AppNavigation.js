import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from '../screens/Home/Home';
import { Profile } from '../screens/Profile/Profile';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CustomDrawerComponent } from '../ui/CustomDrawerComponent';
import { Login } from '../screens/Authorization/Login';
import { useDispatch, useSelector } from 'react-redux';
import I18n from '../translations/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLanguageCreator } from '../redux/reducers/languagesReducer.js/languagesReducerActions';
import { Settings } from '../screens/Settings/Settings';
import { Root } from 'native-base';
import { Languages } from '../screens/Settings/Languages/Languages';
import LinearGradient from 'react-native-linear-gradient';
import { Chats } from '../screens/Chats/Chats';
import { OtherProfile } from '../screens/OtherProfile/OtherProfile';
import { Chat } from '../screens/Chats/Chat';

const defaultOptions = {
    headerStyle: {
      backgroundColor: '#3969ab',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: undefined,
    },
    headerBackground: () => (
        <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          style={[StyleSheet.absoluteFill, {height: Header.HEIGHT}]}
          colors={['#3959ab', '#3989ab']}
        />
      ),
  };

const tabOptions = (Component, label, iconName) => ({
    tabBarLabel: Platform.OS === 'android' ? label : label,
    tabBarIcon: ({color}) => (
        <Component
            name={iconName}
            color={color}
            size={24}
        />
    ),
});

const HomeStack = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={Home}
                options={{
                    ...defaultOptions
                }}
            />
        </Stack.Navigator>
    )
}

export function showBottomNavigation(route) {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : 'Chats';
    switch (routeName) {
      case 'Chat':
        return false;
      default:
        return true;
    }
  }

const ChatsStack = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Chats'
                component={Chats}
                options={{
                    ...defaultOptions
                }}
            />
        </Stack.Navigator>
    )
}

const ProfileStack = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Profile'
                component={Profile}
                options={{
                    headerStyle: {
                        shadowOffset: {
                            width: 0,
                            height: 0
                        },
                        elevation: 0,
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                }}
            />
        </Stack.Navigator>
    )
}

const Tab = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialBottomTabNavigator();
const BottomNavigation = () => {
    const profileDarkTheme = useSelector(state => state.appAPI.profileDarkTheme);
    return (
        <Tab.Navigator
            sceneAnimationEnabled={true}
            initialRouteName='Home'
            activeColor={profileDarkTheme ? '#fff' : "#3989ab"}
            barStyle={{
                backgroundColor: profileDarkTheme ? '#000' : '#fff',
            }}
            tabBarOptions={{
                activeTintColor: profileDarkTheme ? '#fff' : '#3989ab',
                showLabel: true,
                style: {
                    backgroundColor: profileDarkTheme ? '#000' : '#fff',
                    borderTopWidth: 0,
                }
            }}
        >
            <Tab.Screen
                name='Home'
                component={HomeStack}
                options={tabOptions(SimpleLineIcons, I18n.t('home'), 'home')}
            />
            <Tab.Screen
                name='Chats'
                component={ChatsStack}
                options={tabOptions(Ionicons, I18n.t('chats'), 'chatbox-ellipses-outline')}
            />
            <Tab.Screen
                name='Profile'
                component={ProfileStack}
                options={tabOptions(SimpleLineIcons, I18n.t('profile'), 'user')}
            />
        </Tab.Navigator>
    );
}

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
        drawerContentOptions={{
            activeBackgroundColor: '#fa6f44',
            activeTintColor: '#fff',
        }}
        drawerType="slide"
        drawerPosition={'right'}
        drawerContent={CustomDrawerComponent}
        edgeWidth={0}
    >
      <Drawer.Screen name="Home" component={BottomNavigation} />
    </Drawer.Navigator>
  );
}

const AllNavigators = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={DrawerNavigation}
                options={{
                    ...defaultOptions,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='Settings'
                component={Settings}
                options={{
                    ...defaultOptions
                }}
            />
            <Stack.Screen
                name='Languages'
                component={Languages}
                options={{
                    ...defaultOptions
                }}
            />
            <Stack.Screen
                name='OtherProfile'
                component={OtherProfile}
                options={{
                    headerStyle: {
                        shadowOffset: {
                            width: 0,
                            height: 0
                        },
                        elevation: 0,
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name='Chat'
                component={Chat}
                options={{
                    ...defaultOptions,
                }}
            />
        </Stack.Navigator>
    )
}

export const AppNavigation = () => {
    const dispatch = useDispatch();

    const langs = useSelector(state => state.languagesAPI.langs);
    const isAuth = useSelector(state => state.authAPI.isAuth);

    (async function() {
        const language = await AsyncStorage.getItem('@language');
        if (language) {
            dispatch(setLanguageCreator(language));
        } else {
            dispatch(setLanguageCreator(getLocaleToI18n()));
        }
    })();

    I18n.locale = langs;

    return (
        <Root>
            <NavigationContainer>
                {isAuth ? <AllNavigators /> : <Login />}
            </NavigationContainer>
        </Root>
    )
}