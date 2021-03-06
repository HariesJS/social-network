import React, { useState } from 'react';
import { Dimensions, Modal, Text, TextInput, TouchableNativeFeedback, View } from 'react-native';
import I18n from '../translations/i18n';

export const Prompt = ({
    showModalInput,
    setShowModalInput,
    value,
    setValue,
    setLogic,
    keyboardType = 'numeric'
}) => {

    // const setLogic = async () => {
    //     if (value.trim()) {
    //         await changeData(value);
    //         navigation.navigate('OtherProfile', { id: value })
    //         setShowModalInput(false);
    //     }
    // }

    return (
        <Modal
            visible={showModalInput}
            animationType="slide"
            transparent={true}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  margin: Dimensions.get('window').width / 15,
                  padding: '5%',
                }}>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      bottom: 10,
                    }}>
                    {I18n.t('searchUserById')}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      bottom: 10,
                      textAlign: 'center',
                    }}>
                    {I18n.t('enterUserId')}
                  </Text>
                </View>
                <TextInput
                    keyboardType={keyboardType}
                    value={value}
                    onChangeText={setValue}
                    placeholder='ID'
                    style={{
                        borderBottomWidth: 1,
                        borderBottomColor: '#3959ab',
                        marginBottom: '10%',
                    }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableNativeFeedback
                    onPress={() => {
                        setShowModalInput(false);
                        setValue('');
                    }}>
                    <View
                      style={{
                        backgroundColor: '#3959ab',
                        alignItems: 'center',
                        padding: 5,
                        paddingHorizontal: '10%',
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 17,
                        }}>
                        {I18n.t('cancel')}
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                  <TouchableNativeFeedback
                    onPress={() => {
                        setLogic();
                        setValue('');
                    }}>
                    <View
                      style={{
                        backgroundColor: '#3979ab',
                        alignItems: 'center',
                        padding: 5,
                        paddingHorizontal: '10%',
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 17,
                        }}>
                        {I18n.t('search')}
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>
            </View>
          </Modal>
    )
}