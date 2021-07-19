// Importing react utilities
import React, { useContext, useState } from 'react';
import { StyleSheet, View, ImageBackground, SafeAreaView, Text, Dimensions, Modal } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Avatar } from 'react-native-elements';

// Importing icons
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';

// Importing components
import * as Colors from '../../styles/colors';
import Button from '../../components/atoms/Button';
import CircleButton from '../../components/atoms/CircleButton';
import Loading from '../../components/atoms/Loading';
import { AuthContext } from '../../navigation/AuthProvider';
import GlobalStyles from '../../styles/GlobalStyles';
import ProgressLine from '../../components/atoms/ProgressLine'

// Importing images paths
import { images } from '../../utils/images'

const { width, height } = Dimensions.get('screen');

export default function LocalOrTripverScreen({ route, navigation }) {

  const [userType, setUserType] = React.useState(null)
  const [modalVisible, setModalVisible] = useState(false);

  const { loading } = useContext(AuthContext);

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
      alert('Choose one option')
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
      <SafeAreaView style={GlobalStyles.androidSafeArea}>
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
              icon={{ name: 'info', color: Colors.PRIMARY, size: 30, }}
              containerStyle={styles.info_button}
              onPress={() => setModalVisible(true)}
            ></Avatar>
          </View>
          <View style={styles.content}>
            <Text style={styles.title_text}>Tripver or Local?</Text>
            <View>
              {/* Local */}
              <CircleButton
                showText={true}
                title="Local"
                icon='city-variant-outline'
                style={userType == 0 ? styles.avatar_local_selected : styles.avatar_local}
                iconStyle={userType == 0 ? { color: Colors.WHITE } : { color: Colors.SECONDARY }}
                textStyle={userType == 0 ? { color: Colors.WHITE } : { color: Colors.PRIMARY }}
                onPress={() => onSelected(0)}
                iconSize={60}
              >
              </CircleButton>
            </View>
            <View>
              {/* Tripver */}
              <CircleButton
                showText={true}
                title="Tripver"
                icon='bag-personal-outline'
                style={userType ? styles.avatar_tripver_selected : styles.avatar_tripver}
                iconStyle={userType ? { color: Colors.WHITE } : { color: Colors.SECONDARY }}
                textStyle={userType ? { color: Colors.WHITE } : { color: Colors.PRIMARY }}
                onPress={() => onSelected(1)}
                iconSize={60}
              >
              </CircleButton>
            </View>
            <Button
              title="Next"
              labelStyle={styles.loginButtonLabel}
              style={styles.next_button}
              onPress={() => checkTextInput()}
              showIcon={true}
            />
          </View>
          {/* MODAL INFORMATION */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centered_view}>
              <View style={styles.modal_view}>
                <View style={styles.close_icon}>
                  <Icon2
                    name='close'
                    color='black'
                    size={30}
                    onPress={() => setModalVisible(false)}
                  />
                </View>
                <View style={styles.modal_content}>
                  <View style={styles.local_container}>
                    <Text style={styles.modal_title}>What is to be a Local?</Text>
                    
                  </View>
                  <Text style={styles.modal_text}>Local is the person who wants to meet travellers in their home city.</Text>
                  <Icon3
                      name='city-variant-outline'
                      color={Colors.SECONDARY}
                      size={30}
                      style={styles.user_type_icon}
                    />

                  <View style={styles.tripver_container}>
                    <Text style={styles.modal_title}>What is to be a Tripver?</Text>
                   
                  </View>
                  <Text style={styles.modal_text}>Tripver is the person who is travelling and wants to meet local people.</Text>
                  <Icon3
                      name='bag-personal-outline'
                      color={Colors.SECONDARY}
                      size={30}
                      style={styles.user_type_icon}
                    />

                  <Text style={styles.modal_text2}>You will be able to change this parameter in your profile information.</Text>
                </View>
              </View>
            </View>
          </Modal>
          <ProgressLine value='14%'></ProgressLine>
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
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title_text: {
    fontSize: 30,
    position: 'absolute',
    top: 60,
    textAlign: 'center',
    alignSelf: 'center',
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
  },

  avatar_tripver_selected: {
    backgroundColor: Colors.SECONDARY,
    alignSelf: 'flex-end',
    marginRight: 50,
    borderColor: Colors.WHITE,
    borderWidth: 8,
  },

  info_button: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginRight: 15,
  },

  next_button: {
    marginTop: 20,
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center'
  },
  // ---- MODAL STYLE ----
  centered_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  close_icon: {
    marginLeft: -20,
    marginTop: -20,
  },
  modal_view: {
    height: '60%',
    width: '80%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modal_content: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -30,
  },
  local_container: {
    flexDirection: 'row',
    margin: 5,
    marginTop: 60,
  },
  tripver_container: {
    flexDirection: 'row',
    margin: 5,
    marginTop: 10,
  },
  modal_title: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    marginRight:10,
  },
  modal_text: {
    marginBottom: 15,
    textAlign: "center",
  },
  modal_text2: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 12,
    color: Colors.GRAY_DARK,
    marginTop:10,    
  },
  user_type_icon:{
    alignSelf:'center'
  }
});