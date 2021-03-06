import {
    I18nManager,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from '../translations/i18n';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { Preloader } from './Preloader';
  
  export const InputMessage = ({
    chooseImages,
    setMessage,
    message,
    onSend,
    messageIsLoading
  }) => {
    return (
      <View style={styles.inputBlock}>
        <TouchableOpacity
          style={{paddingTop: 4, paddingRight: 5}}
          onPress={chooseImages}>
          <MaterialCommunityIcons name="paperclip" size={32} color="#3969ab" />
        </TouchableOpacity>
        <TextInput
          multiline={true}
          value={message}
          onChangeText={setMessage}
          placeholder={I18n.t('typeMessage')}
          placeholderTextColor="gray"
          style={styles.input}
        />
          <TouchableOpacity
            onPress={onSend}
            disabled={!message.trim() && message.length < 1}>
            <View
              style={{
                paddingLeft: 11.5,
                paddingRight: 7,
                paddingTop: 4,
              }}>
              {!messageIsLoading ? (
                <Ionicons
                name="md-send"
                size={30}
                color={
                  (message.trim() && message.length >= 1)
                    ? '#f28e26'
                    : '#ccc'
                }
              />
              ) : (
                <Preloader size="small" color="#f28e26" />
              )}
            </View>
          </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    inputBlock: {
      backgroundColor: 'white',
      zIndex: 10,
      elevation: 10,
      paddingHorizontal: 5,
      paddingVertical: 15,
      maxHeight: 200,
      minHeight: 50,
      flexDirection: 'row',
      paddingBottom: 40,
    },
    input: {
      // backgroundColor: '#ccc',
      justifyContent: 'center',
      textAlign: !I18nManager.isRTL ? 'left' : 'right',
      backgroundColor: '#eff7fe',
      borderRadius: 18,
      paddingHorizontal: 10,
      paddingTop: 12,
      paddingVertical: 12,
      flex: 1,
    },
  });
  