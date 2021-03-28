// Importing react utilities
import React, { useContext, useState } from 'react';
import { StyleSheet, View, SafeAreaView, ImageBackground, Image, Text, Linking } from 'react-native';
import { Title } from 'react-native-paper';
import { SocialIcon } from 'react-native-elements'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Importing components
import LongButton from '../../components/atoms/LongButton';
import Link from '../../components/atoms/Link';
import Loading from '../../components/atoms/Loading';
import { AuthContext } from '../../navigation/AuthProvider';
import GoogleButton from '../../components/atoms/Google/GoogleButton';
import * as Colors from '../../styles/colors';

// Importing image paths
import { images } from '../../utils/images'

export default function LoginScreen({ navigation }) {

  const { continueWithGoogle, loading } = useContext(AuthContext);

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
        <ImageBackground source={images.loginBackground.uri} style={styles.background}>
          <Link
            title="Log In"
            onPress={() => navigation.navigate('Login')}
            style={styles.sing_up}
          />
          <Image source={require('../../assets/images/tripverLogov2.png')} style={styles.logo}></Image>
          <Title style={styles.title_text}>Welcome to Tripver</Title>
          <View style={styles.login_container}>
            <LongButton
              title="Create account"
              onPress={() => navigation.navigate('Signup1')}
              style={styles.login_button}
            />
            <GoogleButton
              title="Continue with Google"
              showIcon={true}
              longButton={true}
              onPress={async () => {
                var res = await continueWithGoogle()

                if (res != null) {
                  navigation.navigate('Signup2', { googleData: res })
                }
              }}
              style={styles.google_button}
            />
            <SocialIcon
              title='Sign In With Facebook'
              button
              type='facebook'
              raise={false}
            />
            <Text style={styles.privacy_policy}>
              {"By typing Continue or Create Account, I agree to Tripver's "}
              <Text style={{ textDecorationLine: 'underline' }}
                onPress={() => Linking.openURL('http://google.com')}>
                {"Terms of Service, Privacy Policy and Nondicrimination Policy."}</Text>
            </Text>
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
    alignItems: 'center',
  },
  logo: {
    width: '34%',
    height: '20%',
    marginTop: 0,
    marginBottom: 40,
    marginLeft: 30,
  },
  title_text: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 40,
    marginBottom: 80,
  },
  sing_up: {
    alignSelf: 'flex-end',
    marginRight: 15,
    marginTop: 15,
  },
  google_button: {
    marginTop: 30,
  },
  privacy_policy: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    margin: 20,
    color: Colors.WHITE,
    fontSize: 12,
  }
});