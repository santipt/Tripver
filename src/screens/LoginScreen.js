// Importing react utilities
import React, { useContext, useState } from 'react';
import { StyleSheet, View, SafeAreaView, ImageBackground, Image } from 'react-native';
import { Title } from 'react-native-paper';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Importing components
import LongButton from '../components/atoms/LongButton';
import Link from '../components/atoms/Link';
import FormInput from '../components/atoms/FormInput';
import Loading from '../components/atoms/Loading';
import { AuthContext } from '../navigation/AuthProvider';
import * as Colors from '../styles/colors';


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: Colors.GRAY_LIGHT }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/images/background/loginBackground.jpg')} style={styles.background}>
        <Link
          title="Sign up"
          onPress={() => navigation.navigate('Signup')}
          style={styles.sing_up}
        />
        <View style={styles.login_container}>
        <Image source={require('../assets/images/tripverLogov2.png')} style={styles.logo}></Image>
          <Title style={styles.title_text}>Log In</Title>
          <FormInput
            labelName="Email"
            value={email}
            autoCapitalize="none"
            onChangeText={(userEmail) => setEmail(userEmail)}
            autoCompleteType='email'
            keyboardType='email-address'
            placeholder='Email'
          />
          <FormInput
            labelName="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(userPassword) => setPassword(userPassword)}
            textContentType='password'
            placeholder='Password'
          />
          <LongButton
            title="Log In"
            onPress={() => login(email, password)}
            style={styles.login_button}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  container: {
    flex: 1,
  },
  login_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '32%',
    height: '20%',
    marginTop: -40,
    marginBottom:100,
  },
  title_text: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight:'bold'
  },
  sing_up: {
    alignSelf: 'flex-end',
    marginRight: 15,
    marginTop: 15,
  },
  login_button: {
    marginTop: 30,
  },

});