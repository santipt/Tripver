import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState, useContext } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity, SafeAreaView, Alert, Text, Image } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { Avatar, Badge } from 'react-native-elements';
import Swipeable from 'react-native-swipeable';

import { getChannelDisplayPicture, getChannelDisplayName, deleteChat, kitty } from '../../chatkitty';
import Loading from '../../components/atoms/Loading';
import GlobalStyles from '../../styles/GlobalStyles';
import { AuthContext } from '../../navigation/AuthProvider';
import * as Colors from '../../styles/colors';

// Importing image paths
import { images } from '../../utils/images'

import Base64 from '../../utils/Base64'

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

  // ----- Swipe to delete -----
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

            // var myHeaders = new Headers();
            // myHeaders.append("Authorization", "Basic OWJmMzMxZGUtZmMwMi00Zjk3LWJiYmEtMGEzMjkwNTE4NDFhOmU4NmQ3M2NmLWQyYTQtNDBhMi1iNGRlLTA0YjU5Y2RiNmIwNw==");
            // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            // myHeaders.append("Cookie", "SESSION=7406c8b9-4e13-4969-8250-86da494523d9");

            // var urlencoded = new URLSearchParams();
            // urlencoded.append("grant_type", "client_credentials");
            // urlencoded.append("client_id", "9bf331de-fc02-4f97-bbba-0a329051841a");
            // urlencoded.append("client_secret", "e86d73cf-d2a4-40a2-b4de-04b59cdb6b07");

            // var requestOptions = {
            //   method: 'POST',
            //   headers: myHeaders,
            //   body: urlencoded,
            //   redirect: 'follow',
            //   crossdomain: true,
            // };

            // fetch("https://authorization.chatkitty.com/oauth/token", requestOptions)
            //   .then(response => response.text())
            //   .then(result => console.log(result))
            //   .catch(error => console.log('error', error));

            // Try to get the access_token everytime, it won't work next time
            deleteChat(channelId)

          }
        }
      ],
      { cancelable: false }
    );
    setIsFetching(false)

  }

  useEffect(() => {

    let isCancelled = false;

    // Get list of channels of the current user
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
  //console.log(channels.length)
  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea}>
      <View style={styles.container}>
        {channels.length > 1 ?
          <FlatList
            data={channels}
            refreshing={isFetching}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <Divider />}
            scrollEnabled={!isSwiping}
            renderItem={({ item }) => (
              // ----- Swipe delete chat ----s-
              <Swipeable
                onSwipeStart={() => setIsSwiping(true)}
                onSwipeRelease={() => setIsSwiping(false)}
                rightButtons={[
                  <TouchableOpacity style={styles.swipe_container} onPress={() => deleteChatUser(item)}>
                    <Icon
                      name='trash-2'
                      style={styles.swipe_icon}
                      color={Colors.WHITE}
                      size={30}
                    />
                  </TouchableOpacity>,
                ]}
              >
                <UserComponent item={item} navigation={navigation}></UserComponent>
              </Swipeable>
            )}
          />
          : <View style={styles.container_empty_lisg}>
            <Image source={images.people_empty_list.uri} resizeMode="contain" style={styles.sad_face}></Image>
            <Text style={styles.text_empty_list}>There are no chats</Text>
          </View>}
      </View>
    </SafeAreaView>
  );
}

// TO DO: get last message and show it in description of user component
// TO DO: show the name of messages the user didn't red
function UserComponent({ item, navigation, ...props }) {
  const { user, userId } = useContext(AuthContext);

  const [unRead, setUnread] = useState(false);
  const [unReadMessages, setUnreadMessages] = useState(false);
  const [lastMessage, setLastMessage] = useState('');
  const [messageDate, setMessageDate] = useState('');

  const isFocused = useIsFocused();

  if (isFocused) {

    // Getting if the channel is unread or not
    kitty.getChannelUnread({
      channel: item,
    }).then((result) => {
      if (result.succeeded) {
        const unread = result.unread; // Handle if unread 
        setUnread(unread);
      }
    });

    // Getting the number of unread messages
    kitty
      .getUnreadMessagesCount({
        channel: item,
      })
      .then((result) => {
        if (result.succeeded) {
          setUnreadMessages(result.count)
        }
      });

    // Getting all the message and only showing the last one
    kitty
      .getMessages({
        channel: item,
      })
      .then((result) => {
        if (result.succeeded) {
          var messages = result.paginator.items;
          var lastMessage = messages[0].body;
          setLastMessage(lastMessage)

          // Formating date to show: 'Tue May 25 2021'
          var date = new Date(messages[0].createdTime)
          var dateArray = date.toString().split(":");
          var dateFormatted = dateArray[0].slice(0, -7); // -2 if I want to show the year
          setMessageDate(dateFormatted);
        }
      });

  }

  return (
    <TouchableOpacity style={styles.user_container}
      onPress={() => {
        // console.log(item)
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
        // TO DO: If it's an event load a default image
        source={{ uri: getChannelDisplayPicture(item, user) }}
        imageProps={{ resizeMode: 'cover' }} // Rescaling the image
      />
      <List.Item
        // If it's a group (public channel) it will show the name of the channel
        title={getChannelDisplayName(item, user)}
        description={'✓ ' + lastMessage + ' • ' + messageDate}
        descriptionStyle={unReadMessages ? styles.description : styles.description_unread}
        titleNumberOfLines={1}
        titleStyle={styles.list_title}
        descriptionStyle={styles.list_description}
        descriptionNumberOfLines={1}
        style={styles.list_style}
      />
      {unRead ? <Badge badgeStyle={styles.badge} containerStyle={styles.badge_container} value={unReadMessages} textStyle={styles.badge_text} /> : null}
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
  description: {
    fontWeight: 'bold'
  },
  description_unread: {
    fontWeight: 'bold',
  },
  swipe_container: {
    backgroundColor: '#ec4646',
    flex: 1,
    justifyContent: 'center',
  },
  swipe_icon: {
    marginLeft: 22,
  },
  badge_container: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 10,
  },
  badge: {
    backgroundColor: Colors.SECONDARY,
    fontSize: 20,
    width: 20,
    height: 20,
    borderRadius: 30,
  },
  badge_text: {
    fontSize: 13
  },

  // Empty list style
  container_empty_lisg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sad_face: {
    width: '55%',
    height: '55%',
    marginTop: 80,
  },
  text_empty_list: {
    fontSize: 20,
    color: Colors.GRAY_MEDIUM
  },
});