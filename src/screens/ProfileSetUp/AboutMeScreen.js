// Importing react utilities
import React, { useContext, useState } from 'react';
import { StyleSheet, View, ImageBackground, SafeAreaView, Text, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Importing icons
import Icon from 'react-native-vector-icons/AntDesign';

// Importing components
import * as Colors from '../../styles/colors';
import Button from '../../components/atoms/Button';
import Loading from '../../components/atoms/Loading';
import { AuthContext } from '../../navigation/AuthProvider';

// Importing images paths
import { images } from '../../utils/images'

export default function AboutMeScreen({ route, navigation }) {

  const [description, onChangeText] = React.useState('');

  const { loading } = useContext(AuthContext);

  const textPlaceholder = "I am an outgoing person. I love playing guitar and going for a run in my spare time. I enjoy many sports such as snowboarding, skateboarding and surfing. I am also on the college volleyball team. \n\nI love learning from others and traveling. I consider myself an empathetic person with a gift for people and who works well as a team."

  // Getting the data from the other screens
  var data = route.params;

  console.log(data)

  if (loading) {
    return <Loading />;
  }

  const checkTextInput = () => {
    if (description != '') {
      //Checked Successfully
      navigation.navigate('HobbiesScreen', data)
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
          <View style={styles.content}>
            <Text style={styles.title_text}>Tell us something {'\n'} about you!</Text>
            <View style={styles.about_me_container}>
              <Text style={styles.about_me_title}>
                About me
            </Text>
              <TextInput
                style={styles.text_input}
                multiline
                editable
                maxLength={200}
                onChangeText={description => onChangeText(description)}
                value={description}
                blurOnSubmit={false}
                placeholder={textPlaceholder}
              />
            </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title_text: {
    fontSize: 30,
    position: 'absolute',
    top: 60,
    textAlign:'center',
  },
  icon_left: {
    marginLeft: 15,
    marginTop: 10,
  },

  about_me_container: {
    borderRadius: 14,
    padding: 12,
    backgroundColor: Colors.WHITE,
    color: Colors.WHITE,
    width: '90%',
    height: '38%',
  },

  about_me_title: {
    fontWeight: 'normal',
    fontSize: 16,
  },

  next_button: {
    marginTop: 20,
    position: 'absolute',
    bottom: 60,
  }
});