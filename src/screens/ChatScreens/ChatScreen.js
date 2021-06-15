import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Bubble, GiftedChat } from 'react-native-gifted-chat';

import { kitty } from '../../chatkitty';
import Loading from '../../components/atoms/Loading';
import { AuthContext } from '../../navigation/AuthProvider';
import * as Colors from '../../styles/colors';

export default function ChatScreen({ route, navigation }) {

  const { user } = useContext(AuthContext);
  const { channel } = route.params;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadEarlier, setLoadEarlier] = useState(false);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
  const [messagePaginator, setMessagePaginator] = useState(null);
  const [typing, setTyping] = useState(null);

  useEffect(() => {
    
    const startChatSessionResult = kitty.startChatSession({
      channel: channel,
      onReceivedMessage: (message) => {
        setMessages((currentMessages) =>
          GiftedChat.append(currentMessages, [mapMessage(message)])
        );
      },
      onTypingStarted: (typingUser) => { /* Add this */
        if (typingUser.id !== user.id) {
          setTyping(typingUser);
        }
      },
      onTypingStopped: (typingUser) => { /* Add this */
        if (typingUser.id !== user.id) {
          setTyping(null);
        }
      },
    });

    // Getting the messages of the channel
    kitty
      .getMessages({
        channel: channel,
      })
      .then((result) => {
        setMessages(result.paginator.items.map(mapMessage));

        setMessagePaginator(result.paginator);
        setLoadEarlier(result.paginator.hasNextPage);

        setLoading(false);
      });
    
    // Setting that the cannel is readed
    kitty.readChannel({
      channel: channel,
    }).then((result) => {
      if (result.succeeded) {
        const channel = result.channel; // Handle channel
      }

      if (result.failed) {
        const error = result.error; // Handle error
      }
    });

    return startChatSessionResult.session.end;
  }, [user, channel]);

  async function handleSend(pendingMessages) {
    await kitty.sendMessage({
      channel: channel,
      body: pendingMessages[0].text,
    });
  }

  async function handleLoadEarlier() {
    if (!messagePaginator.hasNextPage) {
      setLoadEarlier(false);

      return;
    }

    setIsLoadingEarlier(true);

    const nextPaginator = await messagePaginator.nextPage();

    setMessagePaginator(nextPaginator);

    setMessages((currentMessages) =>
      GiftedChat.prepend(currentMessages, nextPaginator.items.map(mapMessage))
    );

    setIsLoadingEarlier(false);
  }

  async function handleInputTextChanged(text) {
    await kitty.sendKeystrokes({
      channel: channel,
      keys: text,
    });
  }

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: Colors.WHITE,
          },
          right: {
            backgroundColor: Colors.PRIMARY,
          },
        }}
      />
    );
  }

  function renderAvatar(props) {
    return (
      <Avatar
        {...props}
      // onPressAvatar={(clickedUser) => {
      //   kitty
      //     .createChannel({
      //       type: 'DIRECT',
      //       members: [{ id: clickedUser._id }],
      //     })
      //     .then((result) => {
      //       // console.log(result.channel)
      //       // var displayName = result.channel.members[0].displayName;
      //       // if(displayName == user.displayName){
      //       //   displayName = result.channel.members[1].displayName;
      //       // }
      //       // navigation.navigate('Chat', { channel: result.channel, title: displayName });
      //     });
      // }}
      />
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={mapUser(user)}
      loadEarlier={loadEarlier}
      isLoadingEarlier={isLoadingEarlier}
      onLoadEarlier={handleLoadEarlier}
      renderBubble={renderBubble}
      renderAvatar={renderAvatar}
      onInputTextChanged={handleInputTextChanged}
      isTyping={typing != null}
    />
  );
}

function mapMessage(message) {
  return {
    _id: message.id,
    text: message.body,
    createdAt: new Date(message.createdTime),
    user: mapUser(message.user),
  };
}

function mapUser(user) {
  return {
    _id: user.id,
    name: user.name,
    avatar: user.properties.profile_picture,
  };
}