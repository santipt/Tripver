// Importing react utilities
import React, { useContext, useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput } from 'react-native';
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


export default function SettingsScreen({ navigation, route }) {

  var user = route.params;

  var d = user.birth_date;

  var date = convertTimestampToDate(d.seconds);

  const { logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
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
            onPress={() => { navigation.navigate('EditGender',user) }}
          ></EditButton>
          <EditButton
            labelName='Gender'
            data={user.gender}
            icon='gender'
            iconSize={20}
            onPress={() => { navigation.navigate('EditGender',user) }}
          ></EditButton>
          <LongButton
            title="Logout"
            style={styles.long_button}
            onPress={() => logout()}
          />
          <LongButton
            title="Delete account"
            style={styles.long_button}
            onPress={() => logout()}
          />
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

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