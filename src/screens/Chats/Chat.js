import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, Platform, KeyboardAvoidingView, FlatList, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MenuBack } from '../../ui/MenuBack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Preloader } from '../../ui/Preloader';
import { InputMessage } from '../../ui/InputMessage';
import I18n from '../../translations/i18n';
import { getCurrentChatThunk, loadMoreChatThunk, sendMessageThunk, setChatPageCreator } from '../../redux/reducers/chatsReducer.js/chatsReducerActions';

export const Chat = ({ navigation, route }) => {
    const offset = Platform.OS === 'android' ? -200 : 80;

    const dispatch = useDispatch();

    const profile = useSelector(state => state.profileAPI.profile);
    const currentChat = useSelector(state => state.chatsAPI.currentChat);
    const chatPage = useSelector(state => state.chatsAPI.chatPage);

    const chatNewData = useRef(true);
    
    const [message, setMessage] = useState('');

    const user = route.params.user;

    const Wrapper = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

    navigation.setOptions({
        headerLeft: () => <MenuBack nav={navigation} />,
        headerTitle: () => (
            <View style={{
                alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start'
            }}>
                <Text style={{
                    color: '#fff',
                    fontSize: 16
                }}>{user.userName}</Text>
                <Text style={{ color: '#ccc' }}>
                    <>{
                        user.lastUserActivityDate
                        ? new Date(user.lastUserActivityDate).toLocaleString()
                        : I18n.t('activeNotFound')
                    }</>
                </Text>
            </View>
        ),
        headerRight: () => (
            <Wrapper onPress={() => navigation.push('OtherProfile', { id: user.id, name: user.userName })}>
                <Image
                    source={user.photos.large ? {uri: user.photos.large} : {uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png'}}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 100,
                        right: '20%',
                        bottom: Platform.OS === 'ios' ? 5 : 0
                    }}
                />
            </Wrapper>
        )
    })

    useEffect(() => {
        dispatch(getCurrentChatThunk(user.id));
        return () => dispatch(setChatPageCreator(1));
    }, []);

    const loadOldMessages = async () => {
        if (chatNewData.current) {
            if (currentChat) {
                if (currentChat.length / 10 === chatPage) {
                    chatNewData.current = false;
                    let pages = chatPage;
                    pages = pages += 1;
                    await dispatch(loadMoreChatThunk(user.id, pages));
                    await dispatch(setChatPageCreator(pages));
                    chatNewData.current = true;
                }
            }
            
        }
    };

    return (
        <KeyboardAvoidingView
            style={{flex: 1, backgroundColor: '#fff'}}
            keyboardVerticalOffset={offset}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
      {true ? (
        <FlatList
          contentContainerStyle={{
            paddingVertical: 5,
            backgroundColor: '#fff',
          }}
          data={currentChat}
          ListEmptyComponent={
            <View style={styles.nullDialog}>
                <MaterialCommunityIcons
                    name="message-text"
                    size={100}
                    color="#ccc"
                />
                <Text style={styles.messageHistory}>
                    {I18n.t('messageHistoryIsEmpty')}
                </Text>
            </View>
          }
          inverted
          ListFooterComponent={() => (
            <>
              <View style={styles.dialogAdaptive} />
              <Text style={styles.dateTitle}>
                {I18n.t('messagesInThisChat')}
              </Text>
            </>
          )}
          ListFooterComponentStyle={{flex: 1, paddingHorizontal: 10}}
          onEndReachedThreshold={1}
          onEndReached={loadOldMessages}
          renderItem={({ item }) => {
            const otherUser = item.senderId === user.id;
            return (
                <TouchableOpacity
                    onLongPress={() => {}}
                    activeOpacity={1}
                >
                <View
                  style={{
                    ...styles.dialog,
                    alignItems: otherUser ? 'flex-start' : 'flex-end',
                  }}
                  key={item.id}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: '1%',
                    }}>
                    <>
                      {otherUser && (
                        <TouchableOpacity
                          onPress={() => {}}
                        >
                          <Image
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 100,
                            }}
                            source={user.photos.large ? {uri: user.photos.large} : {uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png'}}
                          />
                        </TouchableOpacity>
                      )}
                    </>
                    <View
                      style={{
                        ...styles.message,
                        backgroundColor: !otherUser ? 'rgba(57, 89, 171, 0.9);' : '#eff7fe',
                        [otherUser ? 'marginRight' : 'marginLeft']:
                          Dimensions.get('window').width / 5,
                      }}>
                      <Text
                        style={{
                          ...styles.msgText,
                          color: !otherUser ? '#fff' : '#223645',
                        }}>
                        {item.body}
                      </Text>
                      <View style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center'
                      }}>
                        <Text style={{
                            fontSize: 11,
                            color: !otherUser ? '#fff' : '#647589',
                            textAlign: 'right',
                            marginRight: 2.5,
                            top: 1
                        }}>{new Date(item.addedAt).toLocaleDateString()}</Text>
                        {item.loading
                        ? <Ionicons size={15} color='#fff' name='ellipsis-horizontal' />
                        : !otherUser && <Ionicons size={15} color='#fff' name={item.viewed ? 'checkmark-done-outline' : 'checkmark'} />}
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View style={styles.nullDialog}>
          <MaterialCommunityIcons name="message-text" size={100} color="#ccc" />
          <Text style={styles.messageHistory}>
          messageHistoryIsEmpty
          </Text>
        </View>
      )}
      <InputMessage
        messageIsLoading={false}
        chooseImages={() => {}}
        setMessage={setMessage}
        message={message}
        onSend={() => {
            console.log(currentChat)
            dispatch(sendMessageThunk(user.id, {
                body: message,
                addedAt: new Date().toISOString(),
                id: Date.now(),
                senderId: profile.userId,
                viewed: false,
                loading: true
            }));
            setMessage('');
        }}
      />
    </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    message: {
      padding: '1.5%',
      marginHorizontal: '2%',
      marginVertical: '1%',
      borderRadius: 10,
    },
    msgText: {
      fontSize: 17,
    },
    input: {
      flex: 1,
    },
    dialogAdaptive: {
      paddingTop: 40,
    },
    dateTitle: {
      textAlign: 'center',
      fontSize: 15,
      color: 'grey',
      marginBottom: 10,
      top: -20,
    },
    nullDialog: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    messageHistory: {
      textAlign: 'center',
      fontSize: 18,
      color: 'grey',
    },
  });
  