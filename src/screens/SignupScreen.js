// Importing react utilities
import React, { useContext, useState } from 'react';
import { StyleSheet, View, ImageBackground, SafeAreaView, Text } from 'react-native';

// Importing icons
import Icon from 'react-native-vector-icons/AntDesign';

// Importing components
import * as Colors from '../styles/colors';
import LongButton from '../components/atoms/LongButton';
import FormInput from '../components/atoms/FormInput';
import Loading from '../components/atoms/Loading';
import { AuthContext } from '../navigation/AuthProvider';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/images/background/SignUpBackground.jpg')} style={styles.background}>
        <Icon
          name='arrowleft'
          color={Colors.WHITE}
          style={styles.icon_left}
          size={30}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.sing_up_container}>
        <Text style={styles.titleText}>Let's get started!</Text>
         <FormInput
            labelName="Name"
            value={name}
            onChangeText={(userName) => setDisplayName(setName)}
            autoCompleteType='email'
            keyboardType='email-address'
            placeholder='Name'
          />
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
          <FormInput
            labelName="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(userPassword) => setPassword(userPassword)}
            textContentType='password'
            placeholder='Repeat password'
          />
        <LongButton
          title="Signup"
          labelStyle={styles.loginButtonLabel}
          onPress={() => register(displayName, email, password)}
        />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'orange'
  },
  sing_up_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  icon_left:{
    marginLeft: 15,
    marginTop: 10,
  }
});