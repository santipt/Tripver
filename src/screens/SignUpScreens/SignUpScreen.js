// Importing react utilities
import React, { useContext, useState } from 'react';
import { StyleSheet, View, ImageBackground, SafeAreaView, Text } from 'react-native';

// Importing icons
import Icon from 'react-native-vector-icons/AntDesign';

// Importing components
import * as Colors from '../../styles/colors';
import Button  from '../../components/atoms/Button';
import FormInput from '../../components/atoms/FormInput';
import Loading from '../../components/atoms/Loading';
import { AuthContext } from '../../navigation/AuthProvider';

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
      <ImageBackground source={require('../../assets/images/background/SignUpBackground.jpg')} style={styles.background}>
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
            autoCompleteType='name'
            keyboardType='default'
            style={styles.input_form}
          />
         <FormInput
            labelName="Email"
            value={email}
            autoCapitalize="none"
            onChangeText={(userEmail) => setEmail(userEmail)}
            autoCompleteType='email'
            keyboardType='email-address'
            style={styles.input_form}
          />
        <FormInput
            labelName="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(userPassword) => setPassword(userPassword)}
            textContentType='password'
            autoCompleteType='password'
            style={styles.input_form}
          />
          <FormInput
            labelName="Repeat password"
            value={password}
            secureTextEntry={true}
            onChangeText={(userPassword) => setPassword(userPassword)}
            textContentType='password'
            autoCompleteType='password'
            style={styles.input_form}
          />
        <Button
          title="Next"
          labelStyle={styles.loginButtonLabel}
          style={styles.next_button}
          //onPress={() => register(displayName, email, password)}
          onPress={() => navigation.navigate('Signup2')}
          showIcon={true}
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
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    marginBottom: 40,
    marginTop:40,
  },
  icon_left:{
    marginLeft: 15,
    marginTop: 10,
  },
  input_form:{
    marginBottom:30,
  },
  next_button:{
    marginTop:20,
  }
});