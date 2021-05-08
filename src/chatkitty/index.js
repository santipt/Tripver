import ChatKitty from 'chatkitty';

export const kitty = ChatKitty.getInstance('9bf331de-fc02-4f97-bbba-0a329051841a');

export function getChannelDisplayName(channel, user) {
    if (channel.type === 'DIRECT') {
        if (channel.members[0].displayName == user.displayName) {
            return channel.members[1].displayName;
        }else{
            return channel.members[0].displayName;
        }
    } else {
        return channel.name;
    }
}