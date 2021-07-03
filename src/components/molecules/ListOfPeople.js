// Importing react utilities
import React, { useContext, Component } from 'react';
import { StyleSheet, View, FlatList, Text, RefreshControl, Image } from 'react-native';

// Importing components
import ProfileCard from '../../components/atoms/ProfileCard';
import { getListOfLocals, getListOfTripvers, getProfilePicture } from '../../firebase/Logic';

// Importing components
import * as Colors from '../../styles/colors';

// Importing image paths
import { images } from '../../utils/images'

export default class ListOfPeople extends Component {

    constructor(props) {
        super(props);
        this.onRefresh = this.onRefresh.bind(this);
        this.state = {
            isFetching: false,
            listOfUsers: [],
            user: props.user,
            userType: props.userType,
            emptyList: false,
        }
        this.getUsers()
    }

    onRefresh() {
        this.setState({ isFetching: true }, async () => {
            await this.getUsers();
        });
    }

    async getUsers() {
        console.log("Getting users from data base")

        if (this.state.userType == 'local') {
            // Passing the current user in order to not show itself in the lsit
            var users = await getListOfLocals(this.state.user.name);
            this.setState({ isFetching: false, listOfUsers: users })
            this.setState({ emptyList: false })
        } else {
            // Passing the current user in order to not show itself in the lsit
            var users = await getListOfTripvers(this.state.user.name);
            this.setState({ isFetching: false, listOfUsers: users })
            this.setState({ emptyList: false })
        }

        // Checking if there are no users on the list
        if (this.state.listOfUsers.length == 0) {
            this.setState({ emptyList: true })
        }
    }

    render() {
        if (this.state.emptyList === false) {
            return (
                <FlatList
                    data={this.state.listOfUsers}
                    keyExtractor={(item) => item.email}
                    renderItem={({ item }) =>
                        <ProfileCard
                            title={item.name}
                            age={item.age}
                            profilePicture={item.profile_picture}
                            location={item.current_location}
                            lastLocation={item.last_location}
                            chatkittyId={item.chatkitty_id}
                            profileUserId={item.id}
                        >
                        </ProfileCard>}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isFetching}
                            onRefresh={this.onRefresh}
                            tintColor={Colors.PRIMARY}
                            colors={[Colors.PRIMARY, Colors.SECONDARY]}
                            size={RefreshControl.SIZE.LARGE}
                        />
                    }
                />
            );
        } else {
            return (
                <View style={styles.container}>
                    <Image source={images.people_empty_list.uri} resizeMode="contain" style={styles.sad_face}></Image>
                    <Text style={styles.text}>There are no {this.state.userType}s near you</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
    },
    sad_face:{
        width: '55%',
        height: '55%',
        marginTop:80,
    },
    text:{
        fontSize:20,
        color:Colors.GRAY_MEDIUM
    },
})