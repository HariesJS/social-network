import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Platform, RefreshControl, StyleSheet, Text, TouchableHighlight, TouchableNativeFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getChatsThunk } from '../../redux/reducers/chatsReducer.js/chatsReducerActions';
import { getProfileThunk } from '../../redux/reducers/profileReducer/profileReducerActions';
import I18n from '../../translations/i18n';
import { Preloader } from '../../ui/Preloader';

export const Chats = ({ navigation }) => {
    const dispatch = useDispatch();

    const chats = useSelector(state => state.chatsAPI.chats);

    const loadNewData = useRef(true);

    const [refresh, setRefresh] = useState(false);

    navigation.setOptions({
        headerTitle: I18n.t('chats')
    })

    useEffect(() => {
        navigation.addListener('focus', async () => {
            dispatch(getProfileThunk());
            dispatch(getChatsThunk());
        });
    }, [navigation]);

    if (!chats) {
        return <Preloader color='#3969ab' size='small' />
    }

    const onRefresh = async () => {
        setRefresh(true);
        await dispatch(getChatsThunk());
        setRefresh(false);
    }

    const Wrapper = ({ children, onPress }) => {
        if (Platform.OS === 'ios') {
            return (
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor="rgba(0,0,0,0.2)"
                    onPress={onPress}
                >{children}</TouchableHighlight>
            )
        } else {
            return (
                <TouchableNativeFeedback onPress={onPress}>
                    {children}
                </TouchableNativeFeedback>
            )
        }
    }

    return (
        <FlatList
            refreshControl={
                <RefreshControl
                    refreshing={refresh}
                    onRefresh={onRefresh}
                    colors={['#3959ab']}
                    tintColor='#3959ab'
                />
            }
            keyExtractor={item => item.id.toString()}
            data={chats}
            renderItem={({ item }) => (
                <Fragment>
                    <View style={styles.hr} />
                    <Wrapper onPress={() => navigation.navigate('Chat', { user: item })}>
                        <View style={styles.chat}>
                            <Image
                                style={styles.avatar}
                                source={item.photos.large ? {uri: item.photos.large} : {uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png'}}
                            />
                            <View style={styles.topBlock}>
                                <Text style={styles.userName}>{item.userName}</Text>
                                <Text style={styles.time}>{new Date(item.lastDialogActivityDate).toLocaleDateString()}</Text>
                            </View>
                        </View>
                    </Wrapper>
                </Fragment>
            )}
        />
    )
}

const styles = StyleSheet.create({
    chat: {
        flexDirection: 'row',
        padding: '1%',
    },
    hr: {
        borderTopWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.5)',
        left: Dimensions.get('window').width / 5.2
    },
    userName: {
        fontSize: 16
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 100,
        marginRight: 5
    },
    topBlock: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    time: {
        color: 'rgba(0,0,0,0.3)',
    }
})