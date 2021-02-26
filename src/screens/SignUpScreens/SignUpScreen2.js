// Importing react utilities
import React, { useContext, useState, useRef, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, SafeAreaView, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// Importing icons
import Icon from 'react-native-vector-icons/AntDesign';

// Importing components
import * as Colors from '../../styles/colors';
import Button from '../../components/atoms/Button';
import FormInput from '../../components/atoms/FormInput';
import Loading from '../../components/atoms/Loading';
import { AuthContext } from '../../navigation/AuthProvider';
import { State } from 'react-native-gesture-handler';


export default function SignupScreen({ navigation }) {
  const [gender, setGender] = useState('');
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [focus, setFocus] = useState(false);


  const { register, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  const checkTextInput = () => {
    //Check for the Current Location TextInput
    if (!currentLocation.trim()) {
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
    }
    //Checked Successfully
    //navigation.navigate('Signup2')
  };


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={{ backgroundColor: Colors.GRAY_LIGHT }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
        keyboardShouldPersistTaps='always'
      >
        <ImageBackground source={require('../../assets/images/background/SignUpBackground.jpg')} style={styles.background}>
          <Icon
            name='arrowleft'
            color={Colors.WHITE}
            style={styles.icon_left}
            size={30}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.sing_up_container}>
            <Text style={styles.titleText}>Let's get started!</Text>
            <GooglePlacesAutocomplete
              styles={focus ? googleInputStyle : googleInputStyle2}
              //disableScroll={true}
              isRowScrollable={false}
              currentLocation={true}
              currentLocationLabel='Current location'
              //minLength={3}
              keyboardShouldPersistTaps='always'
              placeholder='Search'
              fetchDetails = {true}
              onFail={(error) => console.error(error)}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
              }}
              textInputProps={{
                onFocus: () => {
                  // Changing input style border bottom radius
                  setFocus(true)
                },
                onBlur: () => {
                  setFocus(false)
                },
                onChangeText: (location) => setCurrentLocation(location)
              }}
              query={{
                key: 'AIzaSyC_iGZnODFXnCUCOF_gRwja3-kmHnF-PAY',
                language: 'en',
              }} 
              renderDescription={(row) => row.description || row.vicinity}
              enablePoweredByContainer={false}
              autoFocus={true}
            />
            <View>
            <FormInput
              labelName="Gender"
              value={gender}
              onChangeText={(userGender) => setGender(userGender)}
              autoCompleteType='name'
              keyboardType='default'
              style={styles.input_form}
              showLabel={true}
            />
            <FormInput
              labelName="Date of birth"
              value={date}
              autoCapitalize="none"
              onChangeText={(userDate) => setDate(userDate)}
              autoCompleteType='email'
              keyboardType='email-address'
              style={styles.input_form}
              showLabel={true}
            />
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

const googleInputStyle = StyleSheet.create({
  container: {
    flex: 0,
    width: '82%',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    marginBottom: 30,
  },
  textInputContainer: {
    flexDirection: 'row',
    marginBottom: -10,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 44,
    //borderRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius:30,
    borderBottomRightRadius:0,
    borderBottomLeftRadius:0,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
    width: '135%'
  },
  poweredContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: '#c8c7cc',
    borderTopWidth: 0.5,
  },
  powered: {},
  listView: {
  },
  row: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    height: 44,
    flexDirection: 'row',
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

const googleInputStyle2 = StyleSheet.create({
  container: {
    flex: 0,
    width: '82%',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    marginBottom: 30,
  },
  textInputContainer: {
    flexDirection: 'row',
    marginBottom: -10,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 44,
    //borderRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius:30,
    borderBottomRightRadius:30,
    borderBottomLeftRadius:30,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
    width: '135%'
  },
  poweredContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: '#c8c7cc',
    borderTopWidth: 0.5,
  },
  powered: {},
  listView: {
  },
  row: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    height: 44,
    flexDirection: 'row',
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
  },
  titleText: {
    fontSize: 24,
    marginBottom: 40,
    marginTop: 40,
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
    marginTop: 20,
  }
});