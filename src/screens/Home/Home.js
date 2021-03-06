import React, { useEffect, useState, useRef } from 'react';
import { Alert, Dimensions, FlatList, Image, Modal, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { getOtherUserThunk, getUsersThunk, loadMoreUsersThunk, setCurrentPageCreator } from '../../redux/reducers/usersReducer/usersReducerActions';
import I18n from '../../translations/i18n';
import { AnimatedView } from '../../ui/AnimatedView';
import { AppHeaderIcons } from '../../ui/AppHeaderIcons';
import { Preloader } from '../../ui/Preloader';
import { Prompt } from '../../ui/Prompt';

export const Home = ({ navigation }) => {
    const dispatch = useDispatch();

    const users = useSelector(state => state.usersAPI.users);
    const currentPage = useSelector(state => state.usersAPI.currentPage);

    const [showModalInput, setShowModalInput] = useState(false);
    const [value, setValue] = useState('');

    const [refresh, setRefresh] = useState(false);

    const loadNewData = useRef(true);
    const searchUser = useRef(false);

    useEffect(() => {
        dispatch(getUsersThunk(1));
        dispatch(setCurrentPageCreator(1));
    }, []);

    navigation.setOptions({
        headerTitle: I18n.t('home'),
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcons}>
                <Item
                    title='menu'
                    iconName='ios-search'
                    onPress={() => setShowModalInput(true)}
                />
            </HeaderButtons>
        )
    })

    if (!users) {
        return <Preloader size='small' color='#3969ab' />
    }

    const onRefresh = async () => {
        setRefresh(true);
        await dispatch(getUsersThunk(1));
        await dispatch(setCurrentPageCreator(1));
        setRefresh(false);
    }

    const loadMore = async () => {
        if (loadNewData.current) {
            if (users?.items) {
                loadNewData.current = false;
                if (users.items.length / 20 === currentPage) {
                    let pages = currentPage;
                    pages = pages += 1;
                    await dispatch(loadMoreUsersThunk(pages));
                    await dispatch(setCurrentPageCreator(pages));
                    loadNewData.current = true;
                }
            }
        }
    };

    const renderLoader = () => <Preloader size='small' color='#3969ab' />

    return (
        <>
            <Prompt
                value={value}
                setValue={setValue}
                setLogic={async () => {
                    if (value.trim()) {
                        searchUser.current = false;
                        await dispatch(getOtherUserThunk(value, searchUser));
                        if (searchUser.current) {
                            navigation.navigate('OtherProfile', { id: value });
                            setShowModalInput(false);
                        }
                    }
                }}
                navigation={navigation}
                showModalInput={showModalInput}
                setShowModalInput={setShowModalInput}
            />
            <FlatList
                onEndReached={loadMore}
                onEndReachedThreshold={2}
                ListFooterComponent={renderLoader}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={onRefresh}
                        colors={['#3959ab']}
                        tintColor='#3959ab'
                    />
                }
                keyExtractor={item => item.id.toString()}
                data={users.items}
                renderItem={({ item, index }) => {
                    return (
                        <AnimatedView onPress={() => navigation.navigate('OtherProfile', { id: item.id, name: item.name })}>
                            <View style={styles.userBlock}>
                                <Image
                                    style={styles.avatar}
                                    source={
                                        item.photos.large
                                        ? {uri: item.photos.large}
                                        : {uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png'}
                                    }
                                />
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={styles.number}>{index + 1}</Text>
                                </View>
                                <View style={styles.infoBlock}>
                                    <Text style={styles.text}>{item.id}</Text>
                                    <Text style={styles.text}>{item.name}</Text>
                                </View>
                            </View>
                        </AnimatedView>
                    )
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    userBlock: {
        backgroundColor: 'rgba(57, 89, 171, 0.35)',
        borderRadius: 20,
        margin: '2.5%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    infoBlock: {
        justifyContent: 'space-evenly'
    },
    text: {
        maxWidth: Dimensions.get('window').width / 3
    },
    avatar: {
        width: 150,
        height: 150
    },
    number: {
        fontSize: 25
    }
})