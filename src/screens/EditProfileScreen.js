// Importing react utilities
import React, { useContext, useState } from 'react';

import { StyleSheet, View, SafeAreaView, Text, TextInput, ScrollView } from 'react-native';
import { Card, Avatar } from 'react-native-elements';

// Importing components
import * as Colors from '../styles/colors';
import Button from '../components/atoms/Button'
import Selector from '../components/molecules/Selector'

// Lists
import listOfHobbies from '../utils/hobbies'
import listOfLanguages from '../utils/languages'
import listOfCountries from '../utils/countries'


export default function EditProfileScreen({ navigation }) {
  const [description, onChangeText] = React.useState('The idea with React Native Elements is more about component structure than actual design.The idea with React Native Elements is more about');

  const [selectedHobbies, onChangeHobbies] = React.useState([])
  const [selectedLanguages, onChangeLanguages] = React.useState([])
  const [selectedCountries, onChangeCountries] = React.useState([])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Avatar
          size="xlarge"
          width={styles.profile_picture.width}
          height={styles.profile_picture.height}
          rounded
          placeholder="hola"
          source={require("../assets/images/profile_picture.jpg")}
          imageProps={{ resizeMode: 'cover' }} // Rescaling the image
        />
      </View>
      <View style={styles.card_container}>
        <Card containerStyle={styles.card}>
          <ScrollView contentContainerStyle={styles.scrollview}>
            <View style={styles.description_container}>
              <Text style={styles.description_title}>
                About me
            </Text>
              <TextInput
                style={styles.text_input}
                multiline
                editable
                maxLength={200}
                onChangeText={description => onChangeText(description)}
                value={description}
                blurOnSubmit={true}
              />
            </View>
            <View style={styles.selector_container}>
              <Selector listName="hobbies" list={listOfHobbies} onSelectedItemObjectsChange={(selectedItems) => onChangeHobbies(selectedItems)}></Selector>
            </View>
            <View style={styles.selector_container}>
              <Selector listName="languages" list={listOfLanguages} onSelectedItemObjectsChange={(selectedItems) => onChangeLanguages(selectedItems)}></Selector>
            </View>
            <View style={styles.selector_container}>
              <Selector listName="countries" list={listOfCountries} onSelectedItemObjectsChange={(selectedItems) => onChangeCountries(selectedItems)}></Selector>
            </View>
            <View style={styles.buttons_container}>
              <Button style={styles.save_button} title="Save"
                onPress={() => { }}></Button>
              <Button style={styles.cancel_button} title="Cancel"
                onPress={() => navigation.goBack()}></Button>
            </View>
            <View style={styles.scrollview_bottom}></View>
          </ScrollView>
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
    alignItems: 'center',
    margin: 20,
  },
  profile_picture: {
    width: 90,
    height: 90
  },

  card_container: {
    position: 'relative',
  },

  card: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    margin: 0,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    padding: 0,
  },

  scrollview: {
    padding: 10,
    flexGrow: 1,
  },

  scrollview_bottom: {
    height: 120,
  },

  description_container: {
    borderRadius: 14,
    padding: 8,
    marginBottom: 10,
    backgroundColor: Colors.GRAY_LIGHT,
    color: Colors.GRAY_DARK,

  },

  description_title: {
    fontWeight: 'normal',
    fontSize: 16,
    marginLeft: 5,
  },

  text_input: {
    padding: 5,
    color: Colors.GRAY_DARK,
  },

  selector_container: {
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
    backgroundColor: Colors.GRAY_LIGHT,
    color: Colors.GRAY_DARK,
  },

  buttons_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  save_button: {
    marginRight: 7,
    position: 'relative',
    bottom: 0,
  },
  cancel_button: {
    marginLeft: 7,
    position: 'relative',
    bottom: 0,
  }
});