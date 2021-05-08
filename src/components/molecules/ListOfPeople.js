// Importing react utilities
import React, { useContext, Component } from 'react';
import { StyleSheet, View, FlatList, Text, RefreshControl } from 'react-native';

// Importing components
import ProfileCard from '../../components/atoms/ProfileCard';
import { getListOfLocals, getListOfTripvers, getProfilePicture } from '../../firebase/Logic';

// Importing components
import * as Colors from '../../styles/colors';

export default class ListOfPeople extends Component {

    constructor(props) {
        super(props);
        this.onRefresh = this.onRefresh.bind(this);
        this.state = {
            isFetching: false,
            listOfUsers: [],
            user: props.user,
            userType: props.userType
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
        } else {
            // Passing the current user in order to not show itself in the lsit
            var users = await getListOfTripvers(this.state.user.name);
            this.setState({ isFetching: false, listOfUsers: users })
        }
    }

    render() {
        return (
            <FlatList
                data={this.state.listOfUsers}
                keyExtractor={(item) => item.email}
                renderItem={({ item }) =>
                    <ProfileCard
                        title={item.name}
                        age={item.age}
                        profile_picture={item.profile_picture}
                        location={item.current_location}
                        id={item.chatkitty_id}
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
    }
}