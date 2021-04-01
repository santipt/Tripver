// Importing react utilities
import React, { useContext, useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, Button, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';

// Importing icons
import Icon from 'react-native-vector-icons/AntDesign';

// Importing components
import * as Colors from '../styles/colors';
import FormInput from '../components/atoms/FormInput'
import FormButton from '../components/atoms/FormButton';
import { AuthContext } from '../navigation/AuthProvider';



export default function EditProfileScreen({ navigation }) {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const { user, logout } = useContext(AuthContext);

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
          <FormInput
            labelName="Email"
            value={email}
            autoCapitalize="none"
            onChangeText={(userEmail) => setEmail(userEmail)}
          />
          <FormButton
            modeValue="contained"
            title="Logout"
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
});