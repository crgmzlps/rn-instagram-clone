import React, {useEffect, useState} from 'react';
import {Control, Controller, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Asset, launchImageLibrary} from 'react-native-image-picker';

import {useMutation, useQuery} from '@apollo/client';
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  User,
} from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import {useAuthContext} from '../../contexts/AuthContext';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {deleteUser, getUser, updateUser} from './queries';
import {useNavigation} from '@react-navigation/native';
import {DEFAULT_USER_IMAGE} from '../../config';
import {Auth} from 'aws-amplify';

type IEditableUserField = 'name' | 'username' | 'website' | 'bio';
type IEditableUser = Pick<User, IEditableUserField>;

interface ICustomInputProps {
  label: string;
  multiline?: boolean;
  control: Control<IEditableUser, object>;
  name: IEditableUserField;
  rules?: object;
}

const URL_REGEX =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const CustomInput = ({
  label,
  multiline = false,
  control,
  name,
  rules = {},
}: ICustomInputProps) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({field: {onChange, value, onBlur}, fieldState: {error}}) => {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{label}</Text>
          <View style={{flex: 1}}>
            <TextInput
              value={value || ''}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={label}
              style={[
                styles.input,
                {borderColor: error ? colors.error : colors.border},
              ]}
              multiline={multiline}
            />
            {error && (
              <Text style={{color: colors.error}}>
                {error.message || `Error on the field ${name}`}
              </Text>
            )}
          </View>
        </View>
      );
    }}
  />
);

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [selectedPhoto, setSelectedPhoto] = useState<Asset | null>();
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<IEditableUser>();
  const {userId, user: authUser} = useAuthContext();
  const {data, error, loading} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {variables: {id: userId}},
  );

  const user = data?.getUser;

  const [
    doUpdateUser,
    {data: _updateData, loading: updateLoading, error: updateError},
  ] = useMutation<UpdateUserMutation, UpdateUserMutationVariables>(updateUser);

  const [doDelete, {loading: deleteLoading, error: deleteError}] = useMutation<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >(deleteUser);

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('username', user.username);
      setValue('bio', user.bio);
      setValue('website', user.website);
    }
  }, [user, setValue]);

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || updateError || deleteError) {
    return (
      <ApiErrorMessage
        title="Error fetching or update or delete the user"
        message={error?.message || updateError?.message || deleteError?.message}
      />
    );
  }

  const onSubmit = async (formData: IEditableUser) => {
    // console.log('on submit: ', JSON.stringify(data, null, 2));
    await doUpdateUser({
      variables: {
        input: {
          id: userId,
          ...formData,
          _version: user?._version,
        },
      },
    });
    navigation.goBack();
  };

  const startDeleteUser = async () => {
    if (!user) {
      return;
    }
    await doDelete({
      variables: {
        input: {
          id: userId,
          _version: user?._version,
        },
      },
    });
    authUser?.deleteUser(err => {
      if (err) {
        console.log(err);
      }
      Auth.signOut();
    });
  };

  const confirmDelete = () => {
    Alert.alert('Are you sure?', 'Deleting your user profile is permanent', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Yes, delete', style: 'destructive', onPress: startDeleteUser},
    ]);
  };

  const onChangePhoto = () => {
    launchImageLibrary(
      {mediaType: 'photo'},
      ({didCancel, errorCode, errorMessage, assets}) => {
        if (!didCancel && !errorCode && assets?.length) {
          const [firstPhoto] = assets;
          setSelectedPhoto(firstPhoto);
          // console.log(assets);
        }
      },
    );
  };
  return (
    <View style={styles.page}>
      <Image
        source={{uri: selectedPhoto?.uri || user?.image || DEFAULT_USER_IMAGE}}
        style={styles.avatar}
      />
      <Text style={styles.textButton} onPress={onChangePhoto}>
        Change profile photo
      </Text>
      <CustomInput
        label="Name"
        name="name"
        control={control}
        rules={{
          required: 'Name is required',
          minLength: {
            value: 3,
            message: 'Name should be more than 3 characters',
          },
        }}
      />
      <CustomInput
        label="Username"
        name="username"
        control={control}
        rules={{required: 'Username is required'}}
      />
      <CustomInput
        label="Website"
        name="website"
        control={control}
        rules={{
          pattern: {value: URL_REGEX, message: 'Must be a valid URI'},
        }}
      />
      <CustomInput
        label="Bio"
        multiline
        name="bio"
        control={control}
        rules={{
          maxLength: {
            value: 200,
            message: 'Bio should be more less than 200 characters',
          },
        }}
      />

      <Text style={styles.textButton} onPress={handleSubmit(onSubmit)}>
        {updateLoading ? 'Submitting...' : 'Submit'}
      </Text>

      <Text style={styles.textButtonDanger} onPress={confirmDelete}>
        {deleteLoading ? 'Deleting...' : 'DELETE USER'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 100,
  },
  textButton: {
    color: colors.primary,
    fontSize: fonts.size.md,
    fontWeight: fonts.weight.semi,
    margin: 10,
  },
  textButtonDanger: {
    color: colors.error,
    fontSize: fonts.size.md,
    fontWeight: fonts.weight.semi,
    margin: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  label: {
    width: 75,
  },
  input: {
    borderBottomWidth: 1,
    minHeight: 50,
  },
});

export default EditProfileScreen;
