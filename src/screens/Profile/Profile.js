import { ActionSheet } from 'native-base';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfileTheme } from '../../redux/reducers/appReducer/appReducerActions';
import { getProfileThunk, putAvatarThunk } from '../../redux/reducers/profileReducer/profileReducerActions';
import { UserProfile } from '../../ui/UserProfile';
import I18n from '../../translations/i18n';
import ImagePicker from 'react-native-image-crop-picker';
import Permissions from "react-native-permissions";
import { getPermissionLibrary } from '../../../assets/Permissions';

export const Profile = ({ navigation }) => {
    const dispatch = useDispatch();

    const profile = useSelector(state => state.profileAPI.profile);

    useEffect(() => {
        navigation.addListener('focus', async () => {
            dispatch(getProfileThunk());
            dispatch(changeProfileTheme(true));
        });

        navigation.addListener('blur', async () => {
            dispatch(changeProfileTheme(false));
        });

    }, [navigation]);

    const pushAvatar = () => {
        ActionSheet.show(
          {
            options: [
              I18n.t('takePhotoFromGallery'),
              I18n.t('openCamera'),
              I18n.t('cancel'),
            ],
            cancelButtonIndex: 2,
          },
            async buttonIndex => {
            switch (buttonIndex) {
              case 0:
                const typePermission = 'ios.permission.PHOTO_LIBRARY';
                await getPermissionLibrary(typePermission);
                await Permissions.request(typePermission, {
                  type: 'always',
                }).then(response => {
                  if (response !== 'blocked') {
                    ImagePicker.openPicker({
                        multiple: true,
                        maxFiles: 1,
                    }).then(async image => {
                        console.log([image]);
                        dispatch(putAvatarThunk(image));
                    }).catch(async (e) => {
                        await getPermissionLibrary('android.permission.READ_EXTERNAL_STORAGE');
                        console.warn(228, e)
                    });;
                }})
                break;
              case 1:
                const typePermissionCamera = 'ios.permission.CAMERA';
                await getPermissionLibrary(typePermissionCamera);
                await Permissions.request(typePermissionCamera, {
                  type: 'always',
                }).then(response => {
                    if (response !== 'blocked') {
                    ImagePicker.openCamera({
                        width: 300,
                        height: 400,
                        cropping: true,
                      }).then(image => {
                        dispatch(putAvatarThunk([image]))
                        console.log(image);
                      }).catch(async () => {
                        await getPermissionLibrary('android.permission.CAMERA');
                      });
                }})
                break;
              default:
                break;
            }
          },
        );
      };

    return (
        <UserProfile
            navigation={navigation}
            profile={profile}
            owner={true}
            getUserProfile={() => dispatch(getProfileThunk())}
            pushAvatar={pushAvatar}
        />
    )
}