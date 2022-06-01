import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, Text, TextInput, Alert } from 'react-native';
import { HCButton } from '../../layout';
import { userActions } from '../../../redux/actions';

export const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { username, age } = useSelector((state) => state.user);
  const [usernameInput, setUsernameInput] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      
    } catch (error) {
      console.log(error);
    }
  };

  const onPressHandler = () => {
    navigation.navigate('Login');
  };

  const onUpdateHandler = async () => {
    dispatch(userActions.setUsername(usernameInput));

    Alert.alert('Success', 'Your username has been updated', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };

  const onDeleteHandler = () => {
    Alert.alert('Success', 'Your username has been deleted', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome Home {username}</Text>
      <HCButton title="Go to Login" color="#373F47" onPress={onPressHandler} />
      <View style={styles.viewCredentialForm}>
        <TextInput
          style={styles.viewCredentialForm.textInput}
          placeholder="Update your username"
          onChangeText={(value) => setUsernameInput(value)}
        />
        <HCButton
          title="Update"
          color="#2E5EAA"
          style={styles.viewCredentialForm.button}
          onPress={onUpdateHandler}
        />
        <HCButton
          title="Delete"
          color="#DB5461"
          style={styles.viewCredentialForm.button}
          onPress={onDeleteHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    backgroundColor: '#D5F2E3',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 10,
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
      borderRadius: 10,
      borderWidth: 1,
    },

    button: {
      marginTop: 20,
    },
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#F37748',
  },
});
