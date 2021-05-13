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
  const [isFetching, setIsFetching] = useState(false);

  // Swiping
  const [isSwiping, setIsSwiping] = useState(false);
  const [leftActionActivated, setLeftActionActivated] = useState(false);
  const [toggle, setToggle] = useState(false);

  const isFocused = useIsFocused();

  // ----- Option 1 -----
  // if (leftActionActivated && toggle == false) {
  //   Alert.alert(
  //     "Are you sure to delete this chat?",
  //     "You can find deleted chats in settings",
  //     [
  //       {
  //         text: "Cancel",
  //         onPress: () => console.log("Cancel Pressed"),
  //         style: "cancel"
  //       },
  //       { text: "OK", onPress: () => console.log("OK Pressed") }
  //     ],
  //     { cancelable: false }
  //   );
  // }

  // ----- Option 2 -----
  const deleteChatUser = (channelId) => {
    Alert.alert(
      "Are you sure to delete this chat?",
      "You can find deleted chats in settings",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: () => {
            setLoading(true);

            var requestOptions = {
              method: 'DELETE',
              redirect: 'follow'
            };

            // Try to get the access_token everytime, it won't work next time
            // Create a method called delete chat user
            fetch("https://api.chatkitty.com/v1/applications/2552/channels/" + channelId + "\n?access_token=9fc8c189-7ee8-4174-9e72-d2f9ed3af562", requestOptions)
              .then(response => response.text())
              .then(result => {
                //console.log(result)
                setLoading(false);
                setIsFetching(true)
              })
              .catch(error => console.log('error', error));
          }
        }
      ],
      { cancelable: false }
    );
    setIsFetching(false)

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
          refreshing={isFetching}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <Divider />}
          scrollEnabled={!isSwiping}
          renderItem={({ item }) => (
            // ----- Option 1 -----
            // <Swipeable
            //   onSwipeStart={() => setIsSwiping(true)}
            //   onSwipeRelease={() => setIsSwiping(false)}
            //   rightContent={
            //     <View style={styles.swipe_container}>
            //       <Icon
            //         name='trash-2'
            //         style={styles.swipe_icon}
            //         color={Colors.WHITE}
            //         size={30}
            //       />
            //     </View>
            //   }
            //   rightActionActivationDistance={180}
            //   onRightActionActivate={() => setLeftActionActivated(true)}
            //   onRightActionDeactivate={() => setLeftActionActivated(false)}
            //   onRightActionComplete={() => setToggle(!toggle)}
            // >

            // ----- Option 2 -----
            // <Swipeable
            //   onSwipeStart={() => setIsSwiping(true)}
            //   onSwipeRelease={() => setIsSwiping(false)}
            //   rightButtons={[
            //     <TouchableOpacity style={styles.swipe_container} onPress={() => deleteChatUser(item.id)}>
            //       <Icon
            //         name='trash-2'
            //         style={styles.swipe_icon}
            //         color={Colors.WHITE}
            //         size={30}
            //       />
            //     </TouchableOpacity>,
            //   ]}
            // >
              <UserComponent item={item} navigation={navigation}></UserComponent>
            // </Swipeable>
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
    justifyContent: 'center',
  },
  swipe_icon: {
    marginLeft:22,
  },
});