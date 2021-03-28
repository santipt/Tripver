// Importing react utilities
import React, { useContext, useState, useRef, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, SafeAreaView, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Importing icons
import Icon from 'react-native-vector-icons/AntDesign';

// Importing components
import * as Colors from '../../styles/colors';
import Button from '../../components/atoms/Button';
import FormInput from '../../components/atoms/FormInput';
import Loading from '../../components/atoms/Loading';
import GoogleInput from '../../components/atoms/Google/GoogleInput';
import DatePicker from '../../components/atoms/DatePicker';
import { AuthContext } from '../../navigation/AuthProvider';

// Importing image paths
import { images } from '../../utils/images'

export default function SignupScreen2({ route, navigation }) {
  const [currentLocation, setCurrentLocation] = useState('');
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');

  const { loading } = useContext(AuthContext);
  const [focus, setFocus] = useState(false);
  const [lengthLocationForm, setLengthLocationForm] = useState(0);

  // Getting the data from the other screens
  var data = route.params;

  if (loading) {
    return <Loading />;
  }

  const checkTextInput = () => {
    //Check for the Current Location TextInput
    /*if (!currentLocation.trim()) {
      alert('Please enter repeat password');
      return;
    }
    //Check for the Gender TextInput
    if (!gender.trim()) {
      alert('Please enter Gender');
      return;
    }
    //Check for the Date TextInput
    if (!date.trim()) {
      alert('Please enter Email');
      return;
    }
    //Check for the Phone TextInput
    if (!phone.trim()) {
      alert('Please enter password');
      return;
    }*/
    //Checked Successfully

    // Adding data to the json
    data.current_location = currentLocation;
    data.birth_date = date;
    data.phone = phone;

    navigation.navigate('LocalOrTripverScreen', data)
  };


  return (
    <SafeAreaView style={styles.container}>
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
              focus={focus}
              showLabel={true}
              labelName="Location"
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
                date={date} // Initial date from state
                labelName='Date of birth'
                showLabel={true}
                onDateChange={(date) => {
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
    justifyContent:'center'
  },
  titleText: {
    fontSize: 30,
    marginBottom: 60,
    marginTop:-10,
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