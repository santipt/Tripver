// Importing react utilities
import React, { useRef, Component } from 'react';
import { StyleSheet, View, FlatList, Text, RefreshControl, Image, Animated } from 'react-native';
import { Avatar } from 'react-native-elements';

// Importing components
import PlaceCard from '../atoms/PlaceCard';
import { getListOfPlaces, getPlacePicture, getCurrentLocation } from '../../firebase/Logic';

import { AuthContext } from '../../navigation/AuthProvider';
import Loading from '../../components/atoms/Loading';

// Importing icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Importing components
import * as Colors from '../../styles/colors';

// Importing image paths
import { images } from '../../utils/images'

export default class ListOfPlaces extends Component {

    constructor(props) {
        super(props);
        this.onRefresh = this.onRefresh.bind(this);
        this.state = {
            isFetching: true,
            listOfPlaces: [],
            emptyList: false,
            type: 'tourist_attraction',
        }
        this.getPlaces('tourist_attraction')
    }

    onRefresh() {
        this.setState({ isFetching: true }, async () => {
            await this.getPlaces(this.state.type);
        });
    }

    async getPlaces(type) {
        console.log("Getting users from Google places api")

        this.setState({ isFetching: true })
        // Getting current location
        var currentLocation = await getCurrentLocation();
        // Getting all the places nearby from the current location
        var places = await getListOfPlaces(currentLocation, type);
        this.setState({ isFetching: false, listOfPlaces: places, type: type, emptyList: false })
    }

    filter(type) {
        switch (type) {
            case 'tourist_attraction':
                console.log(type)
                this.getPlaces(type)
                break;
            case 'museum':
                console.log(type)
                this.getPlaces(type)
                break;
            case 'restaurant':
                console.log(type)
                this.getPlaces(type)
                break;
            case 'night_club':
                console.log(type)
                this.getPlaces(type)
                break;
            default:
                console.log(type)
                break;
        }
    }

    render() {

        if (this.state.isFetching == false) {
            return (
                <View>
                    <View style={styles.filter_container}>
                        <Avatar
                            size="medium"
                            width={30}
                            height={30}
                            rounded
                            icon={this.state.type == 'tourist_attraction' ? { name: 'archway', type: 'font-awesome-5', color: Colors.WHITE, size: 17, } : { name: 'archway', type: 'font-awesome-5', color: Colors.SECONDARY, size: 17, }}
                            imageProps={{ resizeMode: 'cover' }} // Rescaling the image
                            containerStyle={this.state.type == 'tourist_attraction' ? styles.filter_selected : styles.filter}
                            onPress={() => this.filter('tourist_attraction')}
                        ></Avatar>
                        <Avatar
                            size="medium"
                            width={30}
                            height={30}
                            rounded
                            icon={this.state.type == 'museum' ? { name: 'university', type: 'font-awesome-5', color: Colors.WHITE, size: 20, } : { name: 'university', type: 'font-awesome-5', color: Colors.SECONDARY, size: 20, }}
                            imageProps={{ resizeMode: 'cover' }} // Rescaling the image
                            containerStyle={this.state.type == 'museum' ? styles.filter_selected : styles.filter}
                            onPress={() => this.filter('museum')}
                        ></Avatar>
                        <Avatar
                            size="medium"
                            width={30}
                            height={30}
                            rounded
                            icon={this.state.type == 'restaurant' ? { name: 'hamburger', type: 'font-awesome-5', color: Colors.WHITE, size: 20, } : { name: 'hamburger', type: 'font-awesome-5', color: Colors.SECONDARY, size: 20, }}
                            imageProps={{ resizeMode: 'cover' }} // Rescaling the image
                            containerStyle={this.state.type == 'restaurant' ? styles.filter_selected : styles.filter}
                            onPress={() => this.filter('restaurant')}
                        ></Avatar>
                        <Avatar
                            size="medium"
                            width={30}
                            height={30}
                            rounded
                            icon={this.state.type == 'night_club' ? { name: 'glass-cheers', type: 'font-awesome-5', color: Colors.WHITE, size: 20, } : { name: 'glass-cheers', type: 'font-awesome-5', color: Colors.SECONDARY, size: 20, }}
                            imageProps={{ resizeMode: 'cover' }} // Rescaling the image
                            containerStyle={this.state.type == 'night_club' ? styles.filter_selected : styles.filter}
                            onPress={() => this.filter('night_club')}
                        ></Avatar>
                    </View>
                    <FlatList
                        data={this.state.listOfPlaces}
                        ref={this.state.ref}
                        contentContainerStyle={styles.scrollview_bottom}
                        keyExtractor={(item) => item.place_id}
                        ListEmptyComponent={<View style={styles.container}>
                            <Image style={styles.image} source={{ uri: 'https://lh3.googleusercontent.com/p/AF1QipO2NQde6GrUUUiCG8AUWlPH8PbMRyO5nBtsdgE0=s1600-w400' }} />
                            <Text style={styles.text}>There aren't any places near you</Text>
                        </View>}
                        renderItem={({ item }) =>
                            <PlaceCard
                                title={item.name}
                                rating={item.rating}
                                picture={getPlacePicture(item)}
                                location={item.geometry.location}
                                id={item.place_id}
                            >
                            </PlaceCard>}
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
                </View>
            );
        } else {
            return (
                <Loading></Loading>
                // <View style={styles.container}>
                //     <Image style={styles.image} source={{ uri: 'https://lh3.googleusercontent.com/p/AF1QipO2NQde6GrUUUiCG8AUWlPH8PbMRyO5nBtsdgE0=s1600-w400' }} />
                //     <Text style={styles.text}>There aren't any places near you</Text>
                // </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    filter_container: {
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    filter: {
        alignSelf: 'flex-end',
        width: 50,
        height: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        backgroundColor: Colors.WHITE,
        margin: 15,
    },
    filter_selected: {
        alignSelf: 'flex-end',
        width: 50,
        height: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        backgroundColor: Colors.SECONDARY,
        margin: 15,
    },
    sad_face: {
        width: '55%',
        height: '55%',
        marginTop: 80,
    },
    text: {
        fontSize: 20,
        color: Colors.GRAY_MEDIUM
    },
    scrollview_bottom: {
        paddingBottom: 90
    },
})