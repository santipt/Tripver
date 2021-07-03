import ChatKitty from 'chatkitty';
export const kitty = ChatKitty.getInstance('9bf331de-fc02-4f97-bbba-0a329051841a');

const chatkittyToken = '';

// -------------------------------------------
// ----------- Chatkitty functions -----------
// -------------------------------------------

export function getChannelDisplayName(channel, user) {
    if (channel.type === 'DIRECT') {
        if (channel.members[0].displayName == user.displayName) {
            return channel.members[1].displayName;
        } else {
            return channel.members[0].displayName;
        }
    } else {
        return channel.name;
    }
}

export function getChannelDisplayPicture(channel, user) {
    if (channel.type === 'DIRECT') {
        if (channel.members[0].displayName == user.displayName) {
            //console.log(channel.members[1].properties.profile_picture)
            return channel.members[1].properties.profile_picture;
        } else {
            //console.log(channel.members[0].properties.profile_picture)
            return channel.members[0].properties.profile_picture;
        }
    } else {
        // return channel/group image
        return 'https://firebasestorage.googleapis.com/v0/b/tripver-d5fa9.appspot.com/o/IMG_1210.JPG?alt=media&token=a06575d1-c959-4906-9d58-f96df2f20697';
    }
}

export function getChatkittyToken() {

}

export function deleteChat(channel) {
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    return fetch("https://api.chatkitty.com/v1/applications/2552/channels/" + channel.id + "\n?access_token=" + chatkittyToken, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            return;
        })
        .catch((error) => {
            console.log('error', error)
            throw error;
        });
}

export function deleteUserChatkitty(userId) {
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    return fetch("https://api.chatkitty.com/v1/applications/2552/users/" + userId, "\n?access_token=" + chatkittyToken, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            return;
        })
        .catch((error) => {
            console.log('error', error)
            throw error;
        });
}

export function clearChat() {
    // Clear chat
    // var result = await kitty.clearChannelHistory({channel: item});

    // if (result.succeeded) {
    //   const channel = result.channel; // Handle channel
    //   console.log('Success leaving channel', channel)
    // }

    // if (result.failed) {
    //   const error = result.error; // Handle error
    //   console.log('Error leaving channel: ',error)
    // }
}

export async function checkForUnreadChannel() {

    // Get list of channels of the current user
    var channels = await kitty.getChannels();

    for (const channel of channels.paginator.items) {
        // Getting if the channel is unread or not
        var result = await kitty.getChannelUnread({
            channel: channel,
        })

        if (result.succeeded) {
            const unread = result.unread; // Handle if unread 
            if (unread) {
                return true;
            }
        }
    }

    return false;

}
