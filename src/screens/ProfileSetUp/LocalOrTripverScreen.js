// Importing react utilities
import React, { useContext, useState } from 'react';
import { StyleSheet, View, ImageBackground, SafeAreaView, Text, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Avatar } from 'react-native-elements';

// Importing icons
import Icon from 'react-native-vector-icons/AntDesign';

// Importing components
import * as Colors from '../../styles/colors';
import Button from '../../components/atoms/Button';
import Loading from '../../components/atoms/Loading';
import { AuthContext } from '../../navigation/AuthProvider';

// Importing images paths
import { images } from '../../utils/images'

export default function LocalOrTripverScreen({ route, navigation }) {

  const [userType, setUserType] = React.useState(null)

  const { register, loading } = useContext(AuthContext);

  // Getting the data from the other screens
  var data = route.params;

  if (loading) {
    return <Loading />;
  }

  const checkTextInput = () => {
    if (userType != null) {
      if (userType == 0) {
        data.user_type = "Local"
      } else {
        data.user_type = "Tripver"
      }
      //Checked Successfully
      navigation.navigate('GenderScreen', data)
    } else {
      // Alert you have to choose one of them

    }
  };

  const onSelected = (n) => {
    // 0 the user is local 
    // 1 the user is tripver
    setUserType(n);
  };


  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: Colors.GRAY_LIGHT }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      <SafeAreaView style={styles.container}>
        <ImageBackground source={images.localOrTripverBackground.uri} style={styles.background}>
          <View style={styles.header}>
          <Icon
            name='arrowleft'
            color={Colors.WHITE}
            style={styles.icon_left}
            size={30}
            onPress={() => navigation.goBack()}
          />
          <Avatar
              size="small"
              rounded
              icon={{ name: 'info', color: Colors.PRIMARY, size: 30,  }}
              containerStyle={styles.info_button}
              onPress={() => console.log("fadsf")}
            ></Avatar>
          </View>
          <View>
            <Text style={styles.title_text}>Tripver or Local?</Text>
            <View>
              {/* Local */}
              <Avatar
                size="xlarge"
                width={styles.profile_picture.width}
                height={styles.profile_picture.height}
                rounded
                icon={userType == 0 ? { name: 'apartment', color: Colors.WHITE, size: 60, } : { name: 'apartment', color: Colors.SECONDARY, size: 60, }}
                imageProps={{ resizeMode: 'cover' }} // Rescaling the image
                containerStyle={userType == 0 ? styles.avatar_local_selected : styles.avatar_local}
                onPress={() => onSelected(0)}
              ></Avatar>
            </View>
            <View>
              {/* Tripver */}
              <Avatar
                size="xlarge"
                width={styles.profile_picture.width}
                height={styles.profile_picture.height}
                rounded
                icon={userType ? { name: 'flight', color: Colors.WHITE, size: 60, } : { name: 'flight', color: Colors.SECONDARY, size: 60, }}
                imageProps={{ resizeMode: 'cover' }} // Rescaling the image
                containerStyle={userType == 1 ? styles.avatar_tripver_selected : styles.avatar_tripver}
                onPress={() => onSelected(1)}
              ></Avatar>
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
  header: {
    flexDirection:'row',
    justifyContent:'space-between'
  },
  title_text: {
    fontSize: 30,
    marginBottom: 65,
    marginTop: 40,
    alignSelf: 'center'
  },
  icon_left: {
    marginLeft: 15,
    marginTop: 10,
  },
  profile_picture: {
    width: 100,
    height: 100
  },

  avatar_local: {
    backgroundColor: Colors.WHITE,
    borderRadius: 120,
    alignSelf: 'flex-start',
    marginLeft: 50,
  },

  avatar_local_selected: {
    backgroundColor: Colors.SECONDARY,
    borderRadius: 120,
    alignSelf: 'flex-start',
    marginLeft: 50,
    borderColor: Colors.WHITE,
    borderWidth: 8,
  },

  avatar_tripver: {
    backgroundColor: Colors.WHITE,
    borderRadius: 120,
    alignSelf: 'flex-end',
    marginRight: 50,
    marginTop: 30,
  },

  avatar_tripver_selected: {
    backgroundColor: Colors.SECONDARY,
    alignSelf: 'flex-end',
    marginRight: 50,
    marginTop: 30,
    borderColor: Colors.WHITE,
    borderWidth: 8,
  },

  info_button: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginRight:15,
  },

  next_button: {
    marginTop: 60,
    alignSelf: 'center'
  }
});