// Importing react utilities
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Text, ImageBackground } from 'react-native';
import { Card } from 'react-native-elements';

// Importing icons
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';

// Importing components
import * as Colors from '../styles/colors';
import EditInput from '../components/atoms/EditInput'
import EditButton from '../components/atoms/EditButton'
import LongButton from '../components/atoms/LongButton';
import { AuthContext } from '../navigation/AuthProvider';
import { convertTimestampToDate } from '../firebase/Logic'

// Importing images paths
import { images } from '../utils/images'

export default function SettingsScreen({ navigation, route }) {

  const [gender, setGender] = useState('');
  const { logout } = useContext(AuthContext);

  var user = route.params;

  // Converting date to string
  var d = user.birth_date;
  var date = convertTimestampToDate(d.seconds);

  useEffect(() => {
    if (route.params.gender != '' && route.params.gender != undefined) {
      setGender(route.params.gender);
    }
  })

  return (
    <SafeAreaView style={styles.container}>
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
            <EditInput labelName='Email' editText={user.email} icon='email'></EditInput>
            <EditButton
              labelName='Date of birth'
              data={date}
              icon='calendar'
              showIcon={true}
              iconSize={20}
              onPress={() => { navigation.navigate('EditGender', user) }}
            ></EditButton>
            <EditButton
              labelName='Gender'
              data={user.gender}
              icon='gender'
              iconSize={20}
              onPress={() => { navigation.navigate('EditGender', user) }}
            ></EditButton>
            <LongButton
              title="Logout"
              style={styles.long_button}
              onPress={() => logout()}
            />
            <LongButton
              title="Delete account"
              style={styles.long_button}
              // onPress={() => logout()}
              onPress={() => navigation.navigate('ChatApp') }
            />
          </Card>
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

  long_button: {
    alignSelf: 'center',
    marginTop: 20,
  }
});