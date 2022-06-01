import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, Text, Image, TextInput, Alert } from 'react-native';
import { HCIcon } from '../../../assets/images';
import { HCButton } from '../../layout';
import { userActions } from '../../../redux/actions';

export const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const [usernameInput, setUsernameInput] = useState('');
  const [ageInput, setAgeInput] = useState(0);

  const onLoginHandler = async () => {
    if (usernameInput.length === 0 || ageInput.length === 0) {
      Alert.alert('Warning', 'Please input your username', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
      return;
    }

    try {
      dispatch(userActions.setUsername(usernameInput));
      dispatch(userActions.setAge(ageInput));
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Image style={styles.logo} source={HCIcon.hc_icon_redux} />
        <Text style={styles.text}>Async storage</Text>
        <View style={styles.viewCredentialForm}>
          <TextInput
            style={styles.viewCredentialForm.textInput}
            placeholder="Your username"
            onChangeText={(value) => setUsernameInput(value)}
          />
          <TextInput
            style={styles.viewCredentialForm.textInput}
            placeholder="Your age"
            secureTextEntry
            onChangeText={(value) => setAgeInput(value)}
          />
          <HCButton
            title="Login"
            color="#20BF55"
            style={styles.viewCredentialForm.button}
            onPress={onLoginHandler}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#256EFF',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  text: {
    fontSize: 30,
    color: '#fff',
  },
  viewCredentialForm: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '30%',

    textInput: {
      backgroundColor: '#fff',
      width: 300,
      height: 50,
      padding: 5,
      marginTop: 20,
      borderRadius: 10,
      borderWidth: 1,
    },

    button: {
      marginTop: 20,
    },
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
});
