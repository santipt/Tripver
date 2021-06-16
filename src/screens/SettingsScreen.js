// Importing react utilities
import React, { useContext, useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, SafeAreaView, Text, ImageBackground, Modal, Pressable } from 'react-native';
import { Card } from 'react-native-elements';

// Importing icons
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';

// Importing components
import * as Colors from '../styles/colors';
import FormInput from '../components/atoms/FormInput'
import EditButton from '../components/atoms/EditButton'
import LongButton from '../components/atoms/LongButton';
import { AuthContext } from '../navigation/AuthProvider';
import { convertTimestampToDate, reauthenticate } from '../firebase/Logic'
import GlobalStyles from '../styles/GlobalStyles';

// Importing images paths
import { images } from '../utils/images'

// Getting screen dimensions
const { width, height } = Dimensions.get('screen');

export default function SettingsScreen({ navigation, route }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { logout } = useContext(AuthContext);

  var user = route.params;

  // Converting date to string
  // var d = user.birth_date;
  // var date = convertTimestampToDate(d.seconds);

  useEffect(() => {
    if (route.params.gender != '' && route.params.gender != undefined) {
      setGender(route.params.gender);
    }
    if (route.params.email != '' && route.params.email != undefined) {
      setEmail(route.params.email);
    }
  });

  const verifyPassword = async () => {

    try {
      
      await reauthenticate(user.email, password);

      // Hidding modal
      setModalVisible(false);

      // Going to the edit email screen
      navigation.navigate('EditEmail', { user: user, password: password })

    } catch (err) {
      console.log(err)
      alert('Error the password is incorrect')
    }

    // Reset password parameter for security
    setPassword('');

  }


  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <ImageBackground source={images.signUpBackground.uri} style={styles.background}>
        <View style={styles.header}>
          <Icon
            name='left'
            color={Colors.WHITE}
            size={30}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.title}>Settings</Text>
        </View>
        <View style={styles.card_container}>
          <Card containerStyle={styles.card}>
            <EditButton
              labelName='Email'
              data={user.email}
              icon='email'
              emailIcon={true}
              showIcon={true}
              iconSize={20}
              onPress={() => { setModalVisible(true) }}
            ></EditButton>
            <EditButton
              labelName='Password'
              data='•••••••••••••••••'
              style={styles.password_text}
              icon='ios-lock-closed'
              showIcon={true}
              iconSize={20}
              onPress={() => { navigation.navigate('ChangePassword', user) }}
            ></EditButton>
            <EditButton
              labelName='Date of birth'
              data={user.birth_date}
              icon='calendar'
              showIcon={true}
              iconSize={20}
              onPress={() => { navigation.navigate('EditBirthDate', user) }}
            ></EditButton>
            <EditButton
              labelName='Gender'
              data={user.gender}
              iconSize={20}
              onPress={() => { navigation.navigate('EditGender', user) }}
            ></EditButton>
            <LongButton
              title="Logout"
              style={styles.long_button}
              onPress={() => logout()}
            />
            <Text 
            style={styles.text_delete_account} 
            onPress={() => setModalVisible(true)}>Delete account</Text>
          </Card>

          {/* MODAL VERIFY PASSWORD */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centered_view}>
              <View style={styles.modal_view}>
                <View style={styles.close_icon}>
                  <Icon2
                    name='close'
                    color='black'
                    size={30}
                    onPress={() => setModalVisible(false)}
                  />
                </View>
                <View style={styles.modal_content}>
                  <Text style={styles.modal_title}>Verify your password</Text>
                  <Text style={styles.modal_text}>Re-enter your Tripver password  to continue.</Text>
                  <FormInput
                    style={styles.modal_password_input}
                    labelName="Password"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                    textContentType='password'
                    autoCompleteType='password'
                    showLabel={false}
                  ></FormInput>
                </View>
                <LongButton
                  title="Next"
                  style={styles.long_button_modal}
                  onPress={() => verifyPassword()}
                />
              </View>
            </View>
          </Modal>
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
    backgroundColor: Colors.PRIMARY,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-around',
    margin: 20,
  },
  title: {
    fontSize: 25,
    color: Colors.WHITE,
    marginLeft: '30%'
  },
  card_container: {
    position: 'relative'
  },
  card: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    margin: 0,
    width: '100%',
    height: '100%',
    alignSelf: 'center'
  },
  password_text: {
    fontSize: 18,
  },
  long_button: {
    alignSelf: 'center',
    marginTop: 20,
  },
  text_delete_account:{
    color:'#E63E15',
    alignSelf:'center',
    marginTop:30,
  },

  // ---- MODAL STYLE ----
  centered_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  close_icon: {
    marginLeft: -20,
    marginTop: -20,
  },
  modal_view: {
    height: '60%',
    width: '80%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modal_content: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -30,
  },
  modal_password_input: {
    borderColor: Colors.GRAY_MEDIUM,
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 10,
    height: 44,
    width: width / 1.4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
    fontSize: 15,
    alignSelf: 'center',
  },
  modal_title: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 25,
  },
  modal_text: {
    marginBottom: 15,
    textAlign: "center",
  },
  long_button_modal: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 30,
  },

});