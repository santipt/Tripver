// Importing react utilities
import React, { useContext, useState } from 'react';
import { StyleSheet, View, ImageBackground, SafeAreaView, Text, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Card } from 'react-native-elements';

// Importing icons
import Icon from 'react-native-vector-icons/AntDesign';

// Importing components
import * as Colors from '../../styles/colors';
import Button from '../../components/atoms/Button';
import FormInput from '../../components/atoms/FormInput';
import Loading from '../../components/atoms/Loading';
import { AuthContext } from '../../navigation/AuthProvider';
import RadioButton from '../../components/atoms/RadioButton'


// Importing images paths
import { images } from '../../utils/images'

export default function GenderScreen({ route, navigation }) {

  const [checked, setChecked] = React.useState('');
  const [gender, setGender] = React.useState('');

  const { loading } = useContext(AuthContext);

  // Getting the data from the other screens
  var data = route.params;

  console.log(data)

  if (loading) {
    return <Loading />;
  }

  const checkTextInput = () => {
    if (checked != '') {
      if (checked == "Other") {
        data.gender = gender;
      } else {
        data.gender = checked
      }
      //Checked Successfully
      navigation.navigate('PictureScreen', data)
    }
  };


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
          <View>
            <Text style={styles.title_text}>How do you identify?</Text>
            <Card style={styles.card_container} containerStyle={styles.card}>
              <RadioButton value={checked} onValueChange={checked => setChecked(checked)} />
              {checked == 'Other' ? <FormInput style={styles.form_input} value={gender} onChangeText={(text) => setGender(text)} labelName="Enter preferred gender"></FormInput> : null}
            </Card>
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
  container: {
    flex: 1,
  },

  title_text: {
    fontSize: 30,
    marginBottom: 65,
    marginTop: 60,
    alignSelf: 'center'
  },

  icon_left: {
    marginLeft: 15,
    marginTop: 10,
  },

  card: {
    borderRadius: 30,
    alignContent: 'center',
    marginTop: 60,
  },

  form_input: {
    borderColor: Colors.GRAY_MEDIUM,
    borderWidth: 2,
    width: '95%',
    marginLeft: 10,
  },

  next_button: {
    alignSelf: 'center',
    marginTop: 80,
  }
});