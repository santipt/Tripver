import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState, useContext } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity, SafeAreaView, Text, Alert } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { Card, Avatar } from 'react-native-elements';
import Swipeable from 'react-native-swipeable';

import { getChannelDisplayName, kitty } from '../../chatkitty';
import Loading from '../../components/atoms/Loading';
import GlobalStyles from '../../styles/GlobalStyles';
import { AuthContext } from '../../navigation/AuthProvider';
import * as Colors from '../../styles/colors';

// Importing icons
import Icon from 'react-native-vector-icons/Feather';

export default function HomeChatScreen({ navigation, route }) {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Swiping
  const [isSwiping, setIsSwiping] = useState(false);
  const [leftActionActivated, setLeftActionActivated] = useState(false);
  const [toggle, setToggle] = useState(false);

  const isFocused = useIsFocused();

  if (leftActionActivated && toggle == false) {
    Alert.alert(
      "Are you sure to delete this chat?",
      "You can find deleted chats in settings",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    let isCancelled = false;

    kitty.getChannels().then((result) => {
      if (!isCancelled) {
        setChannels(result.paginator.items);
        if (loading) {
          setLoading(false);
        }
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [isFocused, loading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <View style={styles.container}>
        <FlatList
          data={channels}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <Divider />}
          scrollEnabled={!isSwiping}
          renderItem={({ item }) => (
            <Swipeable
              onSwipeStart={() => setIsSwiping(true)}
              onSwipeRelease={() => setIsSwiping(false)}
              rightContent={
                <View style={styles.swipe_container}>
                  <Icon
                    name='trash-2'
                    style={styles.swipe_icon}
                    color={Colors.WHITE}
                    size={30}
                  />
                </View>
              }
              rightActionActivationDistance={180}
              onRightActionActivate={() => setLeftActionActivated(true)}
              onRightActionDeactivate={() => setLeftActionActivated(false)}
              onRightActionComplete={() => setToggle(!toggle)}
            >
              <UserComponent item={item} navigation={navigation}></UserComponent>
            </Swipeable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

function UserComponent({ item, navigation, ...props }) {
  const { user, userId } = useContext(AuthContext);

  return (
    <TouchableOpacity style={styles.user_container}
      onPress={async () => {

        // console.log(item)
        // Leave channel
        // var result = await kitty.clearChannelHistory({channel: item});

        // if (result.succeeded) {
        //   const channel = result.channel; // Handle channel
        //   console.log('Success leaving channel', channel)
        // }

        // if (result.failed) {
        //   const error = result.error; // Handle error
        //   console.log('Error leaving channel: ',error)
        // }

        navigation.navigate('Chat', {
          channel: item,
        })
      }}>
      <Avatar
        size="xlarge"
        style={styles.profile_picture}
        width={styles.profile_picture.width}
        height={styles.profile_picture.height}
        rounded
        // If it's an event load a default image
        source={{ uri: 'https://lh3.googleusercontent.com/a-/AOh14Gj32recPlk45teYg20KnAt3WZX8i8kql9LcUJiSdcg=s400-c' }}
        imageProps={{ resizeMode: 'cover' }} // Rescaling the image
      />
      <List.Item
        // If it's a group (public channel) it will show the name of the channel
        title={getChannelDisplayName(item, user)}
        description={'Tripver'}
        titleNumberOfLines={1}
        titleStyle={styles.list_title}
        descriptionStyle={styles.list_description}
        descriptionNumberOfLines={1}
        style={styles.list_style}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  list_style: {
    flex: 1,
  },
  list_title: {
    fontSize: 16,
  },
  list_description: {
    fontSize: 16,
  },
  user_container: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 10,
  },
  profile_picture: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginLeft: 10,
  },
  swipe_container: {
    backgroundColor: '#ec4646',
    flex: 1,
    justifyContent:'center',
  },
  swipe_icon: {
    marginLeft:20,
  },
});