import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  TouchableHighlight,
  Text
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import I18n from '../translations/i18n';

const Title = ({
  name,
  prop = false,
  onPress,
  iconName,
  color,
  IconComponent = MaterialIcons,
  ...props
}) => (
  <TouchableHighlight onPress={onPress} underlayColor="rgba(255, 255, 255, 0.2)">
    <View
      style={{
        padding: 10,
        flexDirection: 'row',
      }}>
      <View style={{width: 30, alignItems: 'center'}}>
        <IconComponent name={iconName} size={24} color="#3959ab" />
      </View>
      <Text
        style={{
          fontSize: 20,
          color: '#fff',
          marginHorizontal: 10,
        }}>
        {name}
      </Text>
    </View>
  </TouchableHighlight>
);

export const CustomDrawerComponent = ({navigation}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <View style={styles.viewAlign}>
            <Text
              style={{
                fontSize: 25,
                marginTop: Dimensions.get('window').height / 15,
                color: '#fff',
                fontFamily: 'Arial',
                textTransform: 'uppercase',
                textDecorationLine: 'underline'
              }}>
              {' Haries Network '}
            </Text>
          </View>
          <Title
            prop={true}
            name={I18n.t('profile')}
            iconName="account-circle"
            onPress={() => navigation.navigate('Profile')}
          />
        </View>
        <View style={styles.exitWrap}>
          <Title
            name={I18n.t('settings')}
            iconName="settings"
            onPress={() => {
              navigation.navigate('Settings');
              navigation.closeDrawer();
            }}
          />
          <Text style={styles.beta}>Haries Network 2.0.0</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imgWrap: {
    width: '100%',
    height: '100%',
  },
  beta: {
    textAlign: 'center',
    paddingTop: '5%',
    paddingBottom: '5%',
    color: '#fff'
  },
  buttonStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderRadius: 0,
  },
  viewAlign: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: Dimensions.get('window').height / 15,
  },
});
