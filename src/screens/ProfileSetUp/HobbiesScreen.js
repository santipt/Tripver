// Importing react utilities
import React, { useContext, useState, useRef } from 'react';
import { StyleSheet, View, ImageBackground, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Importing icons
import Icon from 'react-native-vector-icons/AntDesign';

// Importing components
import * as Colors from '../../styles/colors';
import Button from '../../components/atoms/Button';
import Selector from '../../components/molecules/Selector'
import Loading from '../../components/atoms/Loading';
import { AuthContext } from '../../navigation/AuthProvider';

// Lists
import listOfHobbies from '../../utils/hobbies'

// Importing images paths
import { images } from '../../utils/images'

export default function HobbiesScreen({ route, navigation }) {

  const [selectedHobbies, onChangeHobbies] = React.useState([])
  const [maxNumberOfItems, setMaxNumberOfItems] = React.useState(0)

  const { loading } = useContext(AuthContext);

  // Getting the data from the other screens
  var data = route.params;

  if (loading) {
    return <Loading />;
  }

  const checkTextInput = () => {

    if (selectedHobbies.length >= 0) {
      data.hobbies = selectedHobbies;

      //Checked Successfully
      navigation.navigate('LanguagesScreen', data)
    }

  };

  const mm = () => {
    return 2;
  }

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: Colors.GRAY_LIGHT }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      <SafeAreaView style={styles.container}>
        <ImageBackground source={images.signUpBackground.uri} style={styles.background}>
          <Icon
            name='arrowleft'
            color={Colors.WHITE}
            style={styles.icon_left}
            size={30}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.content}>
            <Text style={styles.title_text}>Select at least 5 hobbies</Text>
            <TouchableOpacity style={maxNumberOfItems > 8 ? styles.selector_container_max : styles.selector_container}>
              <ImageBackground source={images.hobbies.uri} style={maxNumberOfItems > 8 ? styles.hobbies_background_max : styles.hobbies_background} imageStyle={maxNumberOfItems > 8 ? styles.image_style_max : styles.image_style}>
                <Selector
                  listName="hobbies"
                  list={listOfHobbies}
                  onSelectedItemObjectsChange={(selectedItems) => {
                    setMaxNumberOfItems(selectedItems.length)
                    onChangeHobbies(selectedItems)
                  }}
                ></Selector>
              </ImageBackground>
            </TouchableOpacity>

            <Button
              title="Next"
              labelStyle={styles.loginButtonLabel}
              style={styles.next_button}
              onPress={() => checkTextInput()}
              showIcon={true}
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
  hobbies_background: {
    width: '100%',
    height: '100%',
  },
  hobbies_background_max: {
  },

  image_style: {
    width: '40%',
    height: '60%',
    marginLeft: 90,
    marginTop: 50,
  },

  image_style_max: {
    display: 'none',
  },

  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title_text: {
    fontSize: 30,
    position: 'absolute',
    top: 60,
    textAlign: 'center',
  },
  icon_left: {
    marginLeft: 15,
    marginTop: 10,
  },

  selector_container: {
    borderRadius: 14,
    padding: 10,
    backgroundColor: Colors.WHITE,
    color: Colors.WHITE,
    width: '90%',
    //height: '55%',
    maxHeight: '40%',
  },

  selector_container_max: {
    borderRadius: 14,
    padding: 10,
    backgroundColor: Colors.WHITE,
    color: Colors.WHITE,
    width: '90%',
  },

  next_button: {
    marginTop: 20,
    position: 'absolute',
    bottom: 60,
  }
});