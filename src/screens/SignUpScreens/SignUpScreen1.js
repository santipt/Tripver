// Importing react utilities
import React, { useContext, useState } from 'react';
import { StyleSheet, View, ImageBackground, SafeAreaView, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


// Importing icons
import Icon from 'react-native-vector-icons/AntDesign';

// Importing components
import * as Colors from '../../styles/colors';
import Button from '../../components/atoms/Button';
import FormInput from '../../components/atoms/FormInput';
import Loading from '../../components/atoms/Loading';
import { AuthContext } from '../../navigation/AuthProvider';
import GlobalStyles from '../../styles/GlobalStyles';

// Importing image paths
import { images } from '../../utils/images'

export default function SignupScreen1({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  const checkTextInput = () => {
    /*
    //Check for the Name TextInput
    if (!name.trim()) {
      alert('Please enter Name');
      return;
    }
    //Check for the Email TextInput
    if (!email.trim()) {
      alert('Please enter Email');
      return;
    }
    //Check for the Password TextInput
    if (!password.trim()) {
      alert('Please enter password');
      return;
    }
     // Check if the email contains @
     if(!email.includes('@')){
      alert('The email format is not valid');
      return;
    }
    // Check if the passwords match
    if(password != repeatPassword){
      alert('The passwords does not match');
      return;
    }*/

    var data = {
      name: name,
      email: email,
      password: password
    }
    
    //Checked Successfully
    navigation.navigate('Signup2', data)
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: Colors.GRAY_LIGHT }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      <SafeAreaView style={GlobalStyles.androidSafeArea}>
        <ImageBackground source={images.signUpBackground.uri} style={styles.background}>
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
              onChangeText={(name) => setName(name)}
              autoCompleteType='name'
              keyboardType='default'
              style={styles.input_form}
              showLabel={true}
              maxLength = {16}
            />
            <FormInput
              labelName="Email"
              value={email}
              autoCapitalize="none"
              onChangeText={(userEmail) => setEmail(userEmail)}
              autoCompleteType='email'
              keyboardType='email-address'
              style={styles.input_form}
              showLabel={true}
            />
            <FormInput
              labelName="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              textContentType='password'
              autoCompleteType='password'
              style={styles.input_form}
              showLabel={true}
            />
            <Button
              title="Next"
              labelStyle={styles.loginButtonLabel}
              style={styles.next_button}
              //onPress={() => register(displayName, email, password)}
              onPress={() => checkTextInput()}
              showIcon={true}
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
    flex: 1,
  },
  container: {
    flex: 1,
  },
  sing_up_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center'
  },
  titleText: {
    fontSize: 30,
    marginBottom: 60,
    marginTop:-10,
  },
  icon_left: {
    marginLeft: 15,
    marginTop: 10,
  },
  input_form: {
    marginBottom: 30,
  },
  next_button: {
    marginTop: 30,
  }
});