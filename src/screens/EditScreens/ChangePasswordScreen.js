// Importing react utilities
import React, { useContext, useState } from 'react';
import { StyleSheet, View, ImageBackground, SafeAreaView, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Importing icons
import Icon from 'react-native-vector-icons/AntDesign';

// Importing components
import * as Colors from '../../styles/colors';
import Loading from '../../components/atoms/Loading';
import { AuthContext } from '../../navigation/AuthProvider';
import GlobalStyles from '../../styles/GlobalStyles';
import FormInput from '../../components/atoms/FormInput';
import { changePassword } from '../../firebase/Logic';

// Importing images paths
import { images } from '../../utils/images'

export default function EditGenderScreen({ route, navigation }) {

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { loading, setLoading } = useContext(AuthContext);

  // Getting the data from the other screens
  var user = route.params;

  if (loading) {
    return <Loading />;
  }

  const checkBeforeNavigate = () => {

    if (currentPassword != '') {
      if (newPassword != confirmPassword) {
        alert('The passwords are not the same')
      }
      else if (newPassword.length < 8) {
        alert('The password has to be at least 8 characters')
      } else {
        setLoading(true)
        // Changing password
        changePassword(user.email, currentPassword, newPassword).then(() => {
          setLoading(false);
          navigation.navigate('Settings', user)
        }).catch((err) => {
          setLoading(false);
          alert('The current password is not correct')
        })
      }
    }

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
          <View style={styles.header}>
            <Icon
              name='closecircleo'
              color={Colors.WHITE}
              size={30}
              onPress={() => navigation.goBack()}
            />
            <Icon
              name='checkcircleo'
              color={Colors.WHITE}
              size={30}
              onPress={() => checkBeforeNavigate()}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.title_text}>Change password</Text>
            <FormInput
              labelName="Current password"
              value={currentPassword}
              secureTextEntry={true}
              onChangeText={(password) => setCurrentPassword(password)}
              textContentType='password'
              autoCompleteType='password'
              style={styles.input_form}
              showLabel={true}
            />
            <FormInput
              labelName="New password"
              placeholder='At least 8 characters'
              value={newPassword}
              secureTextEntry={true}
              onChangeText={(password) => setNewPassword(password)}
              textContentType='password'
              autoCompleteType='password'
              style={styles.input_form}
              showLabel={true}
            />
            <FormInput
              labelName="Confirm password"
              placeholder='At least 8 characters'
              value={confirmPassword}
              secureTextEntry={true}
              onChangeText={(password) => setConfirmPassword(password)}
              textContentType='password'
              autoCompleteType='password'
              style={styles.input_form}
              showLabel={true}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  title_text: {
    fontSize: 30,
    position: 'relative',
    textAlign: 'center',
    marginBottom: 60,
    marginTop: -80,
  },

  icon_left: {
    marginLeft: 15,
    marginTop: 10,
  },

  card: {
    borderRadius: 30,
    width: '90%',
  },

  input_form: {
    marginBottom: 30,
  },

  next_button: {
    marginTop: 100,
    marginBottom: -20,
    position: 'relative',
  }
});