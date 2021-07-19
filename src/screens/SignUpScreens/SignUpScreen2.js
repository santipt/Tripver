// Importing react utilities
import React, { useContext, useState, useRef, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, SafeAreaView, Text, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Importing icons
import Icon from 'react-native-vector-icons/AntDesign';

// Importing components
import * as Colors from '../../styles/colors';
import GlobalStyles from '../../styles/GlobalStyles';
import Button from '../../components/atoms/Button';
import FormInput from '../../components/atoms/FormInput';
import Loading from '../../components/atoms/Loading';
import GoogleInput from '../../components/atoms/Google/GoogleInput';
import DatePicker from '../../components/atoms/DatePicker';
import { AuthContext } from '../../navigation/AuthProvider';

// Importing image paths
import { images } from '../../utils/images'

const { width, height } = Dimensions.get('screen');

export default function SignupScreen2({ route, navigation }) {
  const [currentLocation, setCurrentLocation] = useState('');
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');

  const { loading } = useContext(AuthContext);
  const [focus, setFocus] = useState(false);

  // Getting the data from the other screens
  var data = route.params;

  if (loading) {
    return <Loading />;
  }


  const checkTextInput = () => {
    //Check for the Current Location TextInput
    if (!currentLocation.trim()) {
      alert('Please enter your home location');
      return;
    }
    //Check for the Date of birth
    if (!date.trim()) {
      alert('Please enter a date of birth');
      return;
    }

    //Check for the Date TextInput
    if (!date.trim() && date.includes('/')) {
      alert('Please enter the date in the correct format');
      return;
    }
    //Checked Successfully

    // Adding data to the json
    data.current_location = currentLocation;
    data.birth_date = date;
    data.phone = phone;

    navigation.navigate('LocalOrTripverScreen', data)
  };


  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <KeyboardAwareScrollView
        style={{ backgroundColor: Colors.GRAY_LIGHT }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
        keyboardShouldPersistTaps='handled'
      >
        <ImageBackground source={images.signUpBackground.uri} style={styles.background}>
          <Icon
            name='arrowleft'
            color={Colors.WHITE}
            style={styles.icon_left}
            size={30}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.sing_up_container}>
            <Text style={styles.titleText}>Let's get started!</Text>
            <GoogleInput
              style={googleInputStyle}
              focus={focus}
              showLabel={true}
              labelName="Home location"
              onPress={(data, details = null) => {
                setCurrentLocation(data.description)
              }}
              textInputProps={{
                onFocus: () => {
                },
                onBlur: () => {
                  setFocus(false)
                },
                onChangeText: (location) => {
                  // Styling the input
                  if (location.length > 0) {
                    // Changing input style border bottom radius
                    setFocus(true)
                  } else {
                    setFocus(false)
                  }
                },
              }}

            ></GoogleInput>
            <View>
              <DatePicker
                value={date} // Initial date from state
                labelName='Date of birth'
                showLabel={true}
                onChangeText={(date) => {
                  setDate(date);
                }}></DatePicker>
              <FormInput
                labelName="Phone"
                value={phone}
                onChangeText={(userPhone) => setPhone(userPhone)}
                textContentType='telephoneNumber'
                autoCompleteType='tel'
                keyboardType='phone-pad'
                style={styles.input_form}
                showLabel={true}
                secureTextEntry={false}
              />
              <Button
                title="Next"
                labelStyle={styles.loginButtonLabel}
                style={styles.next_button}
                //onPress={() => register(displayName, email, password)}
                onPress={() => checkTextInput()}
                showIcon={true}
              />
            </View>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
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
    flex: 1,
  },
  sing_up_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 30,
    marginBottom: 60,
    marginTop: -10,
  },
  icon_left: {
    marginLeft: 15,
    marginTop: 10,
  },
  input_form: {
    marginBottom: 30,
  },
  location_input: {
    marginTop: 100,
  },
  next_button: {
    marginTop: 30,
    alignSelf: 'center',
  }
});

const googleInputStyle = StyleSheet.create({
  container: {
    flex: 0,
    width: '83%',
    borderRadius: 30,
  },
  textInputContainer: {
    flexDirection: 'row',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 44,
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
    width: width / 1.2,
    marginBottom: 30,
  },
  listView: {
  },
  row: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    height: 44,
    flexDirection: 'row',
    borderRadius: 30,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#c8c7cc',
  },
  description: {},
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 30,
  },
});