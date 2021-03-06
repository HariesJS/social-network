import Permissions, { openSettings } from 'react-native-permissions';
import {Alert, Linking, NativeModules, Platform} from 'react-native';
import I18n from '../src/translations/i18n';
const {RNAndroidOpenSettings} = NativeModules;

export const getPermissionLibrary = async typePermission => {
  let description = '';
  switch (typePermission) {
    case 'ios.permission.CAMERA':
      description = I18n.t('iosPermissionCAMERA');
      break;
    case 'android.permission.CAMERA':
      description = I18n.t('iosPermissionCAMERA');
      break;
    case 'ios.permission.PHOTO_LIBRARY':
      description = I18n.t('iosPermissionPHOTO_LIBRARY');
      break;
    case 'android.permission.READ_EXTERNAL_STORAGE':
      description = I18n.t('iosPermissionPHOTO_LIBRARY');
      break;
    default:
      return '';
  }

  await Permissions.request(typePermission, {
    type: 'always',
  }).then(response => {
    if (response === 'blocked' || response === 'denied') {
      Alert.alert(
        I18n.t('permission'),
        description,
        [
          {text: I18n.t('cancel'), style: 'cancel'},
          {
            text: I18n.t('settings'),
            style: 'destructive',
            onPress: () => {
              openSettings();
            },
          },
        ],
        {cancelable: false},
      );
    }
  });
};
