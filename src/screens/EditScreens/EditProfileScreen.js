// Importing react utilities
import React, { useContext, useState, useEffect } from 'react';

import { StyleSheet, View, SafeAreaView, Text, TextInput, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';

// Importing components
import * as Colors from '../../styles/colors';
import Button from '../../components/atoms/Button'
import Selector from '../../components/molecules/Selector'
import { editUser } from '../../firebase/Logic'
import ProfileAvatar from '../../components/atoms/ProfileAvatar';
import { AuthContext } from '../../navigation/AuthProvider';
import GlobalStyles from '../../styles/GlobalStyles';

// Importing icons
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

// Importing image paths
import { images } from '../../utils/images'

// Lists
import listOfHobbies from '../../utils/hobbies'
import listOfLanguages from '../../utils/languages'
import listOfCountries from '../../utils/countries'

export default function EditProfileScreen({ navigation, route }) {

  var user = route.params;

  const [name, setName] = useState(user.name);
  // TO DO: cuando selecciono una ciudad la guardo y luego no selecciono ninguna, 
  // no se muestra la última ciudad guardada.
  const [currentLocation, setCurrentLocation] = useState(user.current_location);
  const [profilePicture, setProfilePicture] = useState(user.profile_picture);
  const [description, setDescription] = useState(user.about_me);
  const [userType, setUserType] = useState(user.user_type);

  const [selectedHobbies, onChangeHobbies] = useState(user.hobbies)
  const [selectedLanguages, onChangeLanguages] = useState(user.languages)
  const [selectedCountries, onChangeCountries] = useState(user.countries)

  const { setLoading, userId } = useContext(AuthContext);

  useEffect(() => {
    if (route.params.newLocation != '' && route.params.newLocation != undefined) {
      setCurrentLocation(route.params.newLocation);
    }
  })

  const updateUserData = async () => {

    setLoading(true);

    var userData = {
      name: name,
      profile_picture: profilePicture,
      current_location: currentLocation,
      user_type: userType,
      about_me: description,
      countries: selectedCountries,
      languages: selectedLanguages,
      hobbies: selectedHobbies,
    }

    await editUser(userData, userId)

    setLoading(false);

    navigation.goBack()

  }

  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <ImageBackground source={images.signUpBackground.uri} style={styles.background}>
        <View style={styles.header}>
          <ProfileAvatar
            size="medium"
            width={styles.profile_picture.width}
            height={styles.profile_picture.height}
            selectedImage={profilePicture}
            onImageChange={(img) => {
              setProfilePicture(img)
            }}
            iconStyle={styles.edit_icon}
            containerIconStyle={styles.edit_picture}
            showEditIcon={false}
            showCameraIcon={true}
          ></ProfileAvatar>
          <View>
            <TextInput
              value={name}
              style={styles.text_input_name}
              onChangeText={(txt) => setName(txt)}
              autoCapitalize="words"
              inlineImageLeft='search_icon'
            ></TextInput>
            <Text style={styles.city}>{currentLocation}</Text>
          </View>
        </View>
        <View style={styles.local_or_tripver}>
          <TouchableOpacity
            onPress={() => setUserType("Local")}
            style={userType == "Local" ? styles.local_or_tripver_container_selected : styles.local_or_tripver_container}>
            <Text style={userType == "Local" ? styles.local_or_tripver_text_selected : styles.local_or_tripver_text}>Local</Text>
            <Icon2
              name='city-variant-outline'
              color={userType == "Local" ? Colors.WHITE : Colors.SECONDARY}
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setUserType("Tripver")}
            style={userType == "Tripver" ? styles.local_or_tripver_container_selected : styles.local_or_tripver_container}>
            <Text style={userType == "Tripver" ? styles.local_or_tripver_text_selected : styles.local_or_tripver_text}>Tripver</Text>
            <Icon2
              name='bag-personal-outline'
              color={userType == "Tripver" ? Colors.WHITE : Colors.SECONDARY}
              size={28}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.card_container}>
          <Card containerStyle={styles.card}>
            <ScrollView
              contentContainerStyle={styles.scrollview}
              showsVerticalScrollIndicator={false}>
              <View style={styles.description_container}>
                <Text style={styles.description_title}>
                  Name
                </Text>
                <TextInput
                  style={styles.text_input}
                  multiline
                  editable
                  maxLength={20}
                  onChangeText={txt => setName(txt)}
                  value={name}
                  blurOnSubmit={true}
                />
                <Icon
                  name='ios-person'
                  color={Colors.GRAY_MEDIUM}
                  size={20}
                  style={styles.name_icon}
                />
              </View>
              <TouchableOpacity style={styles.description_container} onPress={() => navigation.navigate('EditLocation')}>
                <Text style={styles.description_title}>
                  Location
                </Text>
                <Text style={styles.text_input}>{route.params.newLocation != null && route.params.newLocation != '' ? route.params.newLocation : currentLocation}</Text>
                <Icon
                  name='location-sharp'
                  color={Colors.GRAY_MEDIUM}
                  size={25}
                  style={styles.location_icon}
                />
              </TouchableOpacity>
              <View style={styles.description_container}>
                <Text style={styles.description_title}>
                  About me
                </Text>
                <TextInput
                  style={styles.text_input}
                  multiline
                  editable
                  maxLength={200}
                  onChangeText={description => setDescription(description)}
                  value={description}
                  blurOnSubmit={true}
                />
              </View>
              <View style={styles.selector_container}>
                <Selector listName="hobbies" list={listOfHobbies} selectedItems={selectedHobbies} onSelectedItemObjectsChange={(selectedItems) => onChangeHobbies(selectedItems)}></Selector>
              </View>
              <View style={styles.selector_container}>
                <Selector listName="languages" list={listOfLanguages} selectedItems={selectedLanguages} onSelectedItemObjectsChange={(selectedItems) => onChangeLanguages(selectedItems)}></Selector>
              </View>
              <View style={styles.selector_container}>
                <Selector listName="countries" list={listOfCountries} selectedItems={selectedCountries} onSelectedItemObjectsChange={(selectedItems) => onChangeCountries(selectedItems)}></Selector>
              </View>
              <View style={styles.buttons_container}>
                <Button
                  style={styles.save_button}
                  title="Save"
                  onPress={() => { updateUserData() }}></Button>
                <Button
                  style={styles.cancel_button}
                  title="Cancel"
                  onPress={() => navigation.goBack()}></Button>
              </View>
              <View style={styles.scrollview_bottom}></View>
            </ScrollView>
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
    marginLeft: 20,
    marginTop: 40,
  },
  profile_picture: {
    width: 90,
    height: 90
  },
  edit_picture: {
    height: '25%',
    width: '25%',
    borderRadius: 30,
    backgroundColor: Colors.SECONDARY,
  },
  edit_icon: {
    fontSize: 15,
  },

  text_input_name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 20,
    marginBottom: 5,
  },
  city: {
    color: 'white',
    fontSize: 15,
    marginLeft: 20,
  },

  local_or_tripver: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: 5,
  },

  local_or_tripver_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.WHITE,
    backgroundColor: Colors.WHITE,
    width: '40%',
    height: '100%',
    padding: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.WHITE
  },

  local_or_tripver_container_selected: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.SECONDARY,
    width: '40%',
    height: '100%',
    padding: 5,
    borderRadius: 10,
    borderColor: Colors.WHITE,
    borderWidth: 2,
  },

  local_or_tripver_text: {
    color: Colors.PRIMARY,
    fontWeight: 'normal',
  },

  local_or_tripver_text_selected: {
    color: Colors.WHITE,
    fontWeight: 'bold',
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
    marginTop: 20,
  },

  scrollview: {
    padding: 10,
    flexGrow: 1,
  },

  scrollview_bottom: {
    height: 250,
  },

  description_container: {
    borderRadius: 14,
    padding: 8,
    marginBottom: 10,
    color: Colors.GRAY_DARK,
    borderColor: Colors.GRAY_MEDIUM,
    borderRadius: 14,
    borderWidth: 2,
  },

  description_title: {
    fontWeight: 'normal',
    fontSize: 15,
    marginLeft: 5,
  },

  text_input: {
    padding: 5,
    color: Colors.PRIMARY,
  },

  name_icon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: '40%',
    right: '3%'
  },

  location_icon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: '36%',
    right: '2%'
  },

  selector_container: {
    padding: 10,
    marginBottom: 10,
    //backgroundColor: Colors.GRAY_LIGHT,
    borderColor: Colors.GRAY_MEDIUM,
    borderRadius: 14,
    borderWidth: 2,
  },

  buttons_container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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