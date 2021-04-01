// Importing react utilities
import React, { useContext, Component } from 'react';
import { StyleSheet, View, FlatList, Text, RefreshControl } from 'react-native';

// Importing components
import ProfileCard from '../../components/atoms/ProfileCard';
import { getListOfUsers } from '../../firebase/Logic';
import { AuthContext } from '../../navigation/AuthProvider';

// Importing components
import * as Colors from '../../styles/colors';

export default class ListOfPeople extends Component {

    constructor(props) {
        super(props);
        this.onRefresh = this.onRefresh.bind(this);
        this.state = {
            isFetching: false,
            listOfUsers: [],
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
        var users = await getListOfUsers();
        //console.log(users)
        this.setState({ isFetching: false, listOfUsers: users })
    }

    render() {
        return (
            <FlatList
                data={this.state.listOfUsers}
                renderItem={({ item }) =>
                    <ProfileCard
                        title={item.name}
                        age={item.age}
                        profile_picture={item.profile_picture}
                        location={item.current_location}>
                    </ProfileCard>}
                keyExtractor={(item) => item.email}
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