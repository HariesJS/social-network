import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import I18n from '../../../translations/i18n';
import RNPickerSelect from 'react-native-picker-select';
import { MenuBack } from '../../../ui/MenuBack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcons } from '../../../ui/AppHeaderIcons';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguageCreator } from '../../../redux/reducers/languagesReducer.js/languagesReducerActions';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Languages = ({ navigation }) => {
    const dispatch = useDispatch();

    const langs = useSelector(state => state.languagesAPI.langs);

    const [selectLang, setSelectLang] = useState(null);

    navigation.setOptions({
        headerTitle: I18n.t('languages'),
        headerLeft: () => <MenuBack nav={navigation} />,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcons}>
                {selectLang && selectLang !== langs && <Item
                    title={I18n.t('save')}
                    onPress={async () => {
                        await dispatch(setLanguageCreator(selectLang));
                        await AsyncStorage.setItem('@language', selectLang);
                        RNRestart.Restart();
                    }}
                />}
            </HeaderButtons>
        )
    })

    return (
        <View style={styles.langs}>
            <RNPickerSelect
                placeholder={{
                    label: I18n.t('changeLanguage')
                }}
                textInputProps={{
                    backgroundColor: '#d2dadd',
                }}
                style={styles.langsPicker}
                items={[
                    {
                        label: 'English',
                        value: 'en'
                    },
                    {
                        label: 'Русский',
                        value: 'ru'
                    }
                ]}
                onDonePress={() => {}}
                onValueChange={value => {
                    // logic(value);
                    // if (Platform.OS === 'android' && onDonePress) {
                    //     onDonePress(value);
                    // }
                    setSelectLang(value);
                }}
                style={styles}
                useNativeAndroidPickerStyle={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    langs: {
        flex: 1,
        justifyContent: 'center',
    },
    inputIOS: {
      height: 40,
      fontSize: 15,
      marginHorizontal: '5%',
      borderRadius: 12,
      textAlign: 'center',
    },
    inputAndroid: {
        height: 40,
        fontSize: 15,
        marginHorizontal: '5%',
        borderRadius: 12,
        textAlign: 'center',
        color: 'black',
    },
    placeholder: {
        color: '#3959ab'
    }
});