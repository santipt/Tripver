// Importing react utilities
import React, { useContext, useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, SafeAreaView, Text, ImageBackground, Modal, Switch } from 'react-native';
import { Card } from 'react-native-elements';

// Importing icons
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';

// Importing components
import * as Colors from '../styles/colors';
import FormInput from '../components/atoms/FormInput'
import EditButton from '../components/atoms/EditButton'
import LongButton from '../components/atoms/LongButton';
import ModalVerifyPassword from '../components/atoms/ModalVerifyPassword';
import { AuthContext } from '../navigation/AuthProvider';
import Loading from '../components/atoms/Loading';
import { convertTimestampToDate, deleteUser, reauthenticate } from '../firebase/Logic'
import GlobalStyles from '../styles/GlobalStyles';

// Importing images paths
import { images } from '../utils/images'

// Getting screen dimensions
const { width, height } = Dimensions.get('screen');

export default function SettingsScreen({ navigation, route }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const { setLoading, loading, logout } = useContext(AuthContext);
  const [action, setAction] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

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

  // For the state of the switch
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const verifyPasswordForDeletingUser = async () => {

    // VerifyPassword for deleting account
    setLoading(true);
    await deleteUser(user.email, password).then(() => {
      setModalVisible(false);
      setLoading(false);
      logout()
    }).catch((err) => {
      console.log(err);
      setLoading(false);
      setModalVisible(false);
      // Reset password parameter for security
      setPassword('');
      alert('Error deleting user')
    });
  }

  const verifyPasswordForEmail = async () => {

    // VerifyPassword for changing email
    try {
      setLoading(true);

      await reauthenticate(user.email, password);

      // Hidding modal
      setModalVisible(false);

      setLoading(false);

      // Going to the edit email screen
      navigation.navigate('EditEmail', { user: user, password: password })

    } catch (err) {
      setLoading(false);
      console.log(err)
      alert('Error the password is incorrect')
    }

    // Reset password parameter for security
    setPassword('');

  }

  if (loading) {
    return <Loading />;
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
              onPress={() => {
                //setShowModal(true)
                setAction('changeEmail')
                setModalVisible(true);
              }}
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
            <View style={styles.notifications_container}>
              <Text style={styles.title_notifications}>Notifications</Text>
              <Switch
                trackColor={{ false: Colors.WHITE, true: Colors.SECONDARY }}
                thumbColor={isEnabled ? Colors.WHITE : Colors.WHITE}
                ios_backgroundColor={Colors.WHITE}
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={styles.switch_notifications}
              />
            </View>
            <LongButton
              title="Logout"
              style={styles.long_button}
              onPress={() => logout()}
            />
            <Text
              style={styles.text_delete_account}
              onPress={() => {
                setAction('deleteUser')
                setModalVisible(true);
              }}>Delete account</Text>
          </Card>
          {/* <ModalVerifyPassword
            action={action}
            onModalClose={(res) => {
              console.log(res)
              setShowModal(false)
            }}
          ></ModalVerifyPassword> */}
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
                  onPress={() => {
                    if (action == 'changeEmail') {
                      verifyPasswordForEmail()
                    }
                    if (action == 'deleteUser') {
                      verifyPasswordForDeletingUser()
                    }
                  }}
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
  text_delete_account: {
    color: '#E63E15',
    alignSelf: 'center',
    marginTop: 30,
  },
  notifications_container: {
    borderRadius: 15,
    borderColor: Colors.GRAY_MEDIUM,
    borderWidth: 2,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center'
  },
  title_notifications: {
    fontSize: 15,
  },
  switch_notifications: {
    marginLeft: 10,
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