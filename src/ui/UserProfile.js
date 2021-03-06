import React, { Fragment, useState } from 'react';
import { ScrollView, StyleSheet, Image, Text, View, RefreshControl, Dimensions, StatusBar, Linking, TouchableOpacity } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import I18n from '../translations/i18n';
import AnimatedLinearGradient, { presetColors } from './AnimatedLinearGradient';
import { AnimatedView } from './AnimatedView';
import { AppHeaderIcons } from './AppHeaderIcons';
import { Preloader } from './Preloader';
import { HRLine } from './HRLine';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { MenuBack } from './MenuBack';
import { followUserThunk } from '../redux/reducers/usersReducer/usersReducerActions';
import { useDispatch, useSelector } from 'react-redux';

export const UserProfile = ({ navigation, profile, name, getUserProfile, owner, pushAvatar }) => {
    const dispatch = useDispatch();

    const setLoader = useSelector(state => state.usersAPI.setLoader);
    
    const [refresh, setRefresh] = useState(false);

    navigation.setOptions({
        headerLeft: () => !owner && <MenuBack nav={navigation} />,
        headerTitle: owner ? I18n.t('profile') : `${name || profile.fullName}`,
        headerRight: () => {
            if (owner) {
                return (
                    <HeaderButtons HeaderButtonComponent={AppHeaderIcons}>
                        <Item
                            iconSize={30}
                            title='menu'
                            iconName='ios-menu'
                            onPress={() => navigation.openDrawer()}
                        />
                    </HeaderButtons>
                )
            }
        },
        headerTitleStyle: {
            fontSize: 20
        }
    })

    if (!profile || setLoader.pageLoader) {
        return (
            <Preloader
                style={{ backgroundColor: '#000' }}
                size='small'
                color='#fff'
            />
        )
    }

    const onRefresh = async () => {
        setRefresh(true);
        await getUserProfile();
        setRefresh(false);
    }

    const openUrl = url => {
        if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
            Linking.openURL(url);
        } else {
            Linking.openURL('http://' + url);
        }
    }

    const PButton = ({ title, onPress, style }) => (
        <TouchableOpacity onPress={onPress}>
            <Text style={{ ...styles.buttons, ...style }}>{title}</Text>
        </TouchableOpacity>
    )

    return (
        <ScrollView
            contentContainerStyle={{
                margin: '10%',
                paddingBottom: '10%'
            }}
            style={styles.screen}
            refreshControl={
                <RefreshControl
                    refreshing={refresh}
                    onRefresh={onRefresh}
                    colors={['#3959ab']}
                    tintColor='#fff'
                />
            }
        >
            <StatusBar barStyle='light-content' />
            <View style={styles.center}>
                <AnimatedView onPress={pushAvatar}>
                    <AnimatedLinearGradient
                        customColors={presetColors.hnetwork}
                        speed={1500}
                        style={{
                            borderRadius: 200,
                            width: 265,
                            height: 265,
                        }}>
                        <Image
                            style={styles.avatar}
                            source={
                                profile.photos.large
                                ? {uri: profile.photos.large}
                                : {uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png'}
                            }
                        />
                    </AnimatedLinearGradient>
                </AnimatedView>
                <View style={styles.content}>
                    <Text style={styles.fullName}>{profile.fullName}</Text>
                </View>
            </View>
            {!owner && <View style={styles.buttonsWrapper}>
                {setLoader.buttonLoader ? <Preloader size='small' color='#fff' /> : <PButton
                    title={I18n.t(profile.followed ? 'unfollow' : 'follow')}
                    style={profile.followed ? {} : { backgroundColor: '#fff', color: '#000' }}
                    onPress={() => dispatch(followUserThunk(profile.userId, profile.followed))}
                />}
                <PButton
                    title={I18n.t('message')}
                    onPress={() => navigation.push('Chat', { user: { userName: profile.fullName, id: profile.userId, photos: { large: profile.photos.large } } })}
                />
            </View>}
            <HRLine />
            <View style={styles.aboutProfile}>
                {profile.aboutMe && <View style={styles.flexBox}>
                    <Text style={styles.textExample}>
                        <Feather name='user' color='#fff' size={17} /> {I18n.t('aboutMe')}
                    </Text>
                    <Text style={styles.text}>{profile.aboutMe}</Text>
                </View>}
                <View style={styles.flexBox}>
                    <Text style={styles.textExample}>
                        <Ionicons name='ios-code-slash' color='#fff' size={17} /> {I18n.t('needForWork')}
                    </Text>
                    <Text style={styles.text}>{profile.lookingForAJob ? I18n.t('yes') : I18n.t('no')}</Text>
                </View>
                {profile.lookingForAJobDescription && <View style={styles.flexBox}>
                    <Text style={styles.textExample}>
                        <AntDesign name='message1' color='#fff' size={17} /> {I18n.t('mySkills')}
                    </Text>
                    <Text onPress={() => {
                        alert(profile.lookingForAJobDescription)
                    }} style={styles.button}>{I18n.t('read')}</Text>
                </View>}
                <Fragment>
                    {Object.keys(profile.contacts).map(e => (
                        <View key={e}>{profile.contacts[e] ? (
                            <View style={styles.flexBox}>
                                <Text style={styles.textExample}>{e + ':'}</Text>
                                <Text
                                    onPress={() => openUrl(profile.contacts[e])}
                                    style={{ ...styles.text, textDecorationLine: 'underline', color: 'gray' }}>
                                        {profile.contacts[e]}
                                </Text>
                            </View>
                        ) : <></>}</View>
                    ))}
                </Fragment>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#000',
    },
    avatar: {
        width: 250,
        height: 250,
        borderRadius: 200,
        margin: 8
    },
    center: {
        alignItems: 'center'
    },
    fullName: {
        color: '#fff',
        fontSize: 25,
        shadowOffset: {},
        shadowColor: '#fff',
        shadowOpacity: 1,
        elevation: 8,
        marginVertical: '10%'
    },
    textExample: {
        color: '#fff',
        textTransform: 'uppercase',
        fontSize: 16
    },
    text: {
        color: '#fff',
        fontSize: 16,
        maxWidth: Dimensions.get('window').width / 3
    },
    flexBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    aboutProfile: {
        margin: '5%'
    },
    button: {
        color: '#3969ab',
        textDecorationLine: 'underline'
    },
    buttonsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: '5%'
    },
    buttons: {
        color: '#fff',
        borderWidth: 1,
        borderColor: '#fff',
        padding: '2.5%',
        paddingHorizontal: Dimensions.get('window').width / 20
    }
})