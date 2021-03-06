import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Text, View, ImageBackground, StyleSheet, Dimensions, TextInput, Platform, TouchableOpacity, StatusBar } from 'react-native';
import I18n from '../../translations/i18n';
import { Formik } from 'formik';
import { loginMeThunk } from '../../redux/reducers/authReducer/authReducerActions';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Preloader } from '../../ui/Preloader';

export const Login = () => {
    const dispatch = useDispatch();

    const [rememberMe, setRememberMe] = useState(null);
    const [autoLogin, setAutoLogin] = useState(false);

    useEffect(() => {
        (async function() {
            const saveProfile = await AsyncStorage.getItem('@saveProfile');
            const profile = JSON.parse(saveProfile);
            if (profile.email && profile.password) {
                setAutoLogin(true);
                dispatch(loginMeThunk(JSON.parse(saveProfile)));
            }
        })();
    }, []);

    if (autoLogin) {
        return <Preloader color='#3959ab' />
    }

    const BText = ({ children, onPress, disabled = false, style }) => (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
        >
            <Text style={{ ...styles.button, ...style}}>{children}</Text>
        </TouchableOpacity>
    )

    return (
        <ImageBackground
            style={styles.background}
            source={require('../../../assets/backgroundCity.png')}
        >
            <StatusBar barStyle='light-content' />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                extraScrollHeight={10}
                behavior={Platform.OS === "ios" ? "padding" : null}
            >
                <View style={styles.topBlock}>
                <Formik
                    initialValues={{
                        email: null,
                        password: null,
                        rememberMe: false
                    }}
                    onSubmit={async values => {
                        dispatch(loginMeThunk(values));
                    }}>
                    {({handleSubmit, values, handleChange}) => {
                        const disabled = !values.email || !values.password;
                        return (
                            <View style={styles.formBlock}>
                                <Text style={styles.title}>Haries Network 2.0</Text>
                                <TextInput
                                    keyboardType='email-address'
                                    placeholderTextColor='#fff'
                                    style={styles.input}
                                    placeholder={I18n.t('email')}
                                    onChangeText={handleChange('email')}
                                />
                                <TextInput
                                    secureTextEntry={true}
                                    placeholderTextColor='#fff'
                                    style={styles.input}
                                    placeholder={I18n.t('password')}
                                    onChangeText={handleChange('password')}
                                />
                                <View style={styles.buttons}>
                                    <BText
                                        disabled={disabled}
                                        onPress={handleSubmit}
                                        style={{ color: disabled ? 'rgba(255,255,255,0.7)' : '#fff' }}
                                    >{I18n.t('login')}</BText>
                                    <BText
                                        onPress={() => {
                                            setRememberMe(!rememberMe);
                                            values.rememberMe = !values.rememberMe;
                                        }}
                                        style={{
                                            color: rememberMe ? '#3959ab' : '#fff'
                                        }}
                                    >{I18n.t('rememberMe')}</BText>
                                    <BText>{I18n.t('forgotPassword')}</BText>
                                    <BText>{I18n.t('signUp')}</BText>
                                </View>
                            </View>
                        )}}
                    </Formik>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
    },
    topBlock: {
        marginTop: Dimensions.get('window').height / 15,
        flex: 1,
        justifyContent: 'center',
    },
    formBlock: {
        backgroundColor: 'rgba(0,0,0,0.65)',
        paddingVertical: '5%',
        shadowOffset: {},
        shadowOpacity: 1,
        shadowRadius: 100,
        elevation: 8
    },
    title: {
        color: '#fff',
        fontSize: 25,
        textTransform: 'uppercase',
        textShadowColor: '#fff',
        textShadowOffset: {},
        textShadowRadius: 7,
        textAlign: 'center'
    },
    input: {
        height: 40,
        borderColor: "#3959ab",
        borderBottomWidth: 3,
        margin: 10,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginHorizontal: Dimensions.get('window').width / 10,
        padding: 10,
        color: '#fff',
        borderTopRightRadius: 15,
    },
    buttons: {
        alignItems: 'center',
    },
    button: {
        color: '#fff',
        margin: 5,
        textTransform: 'uppercase',
        textAlign: 'center'
    }
})