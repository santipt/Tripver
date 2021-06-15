import { db, firebase, GOOGLE_API_KEY } from './index';
import * as Location from 'expo-location';
import UserPermissions from '../utils/UserPersmissions';

// Calculating age from date of birth
const getAge = (dateString) => {

    // Converting dd/mm/yyyy to mm/dd/yyyy for new Date method
    var datearray = dateString.split("/");
    var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];

    var today = new Date();
    var birthDate = new Date(newdate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// export function convertTimestampToDate(timestamp) {
//     var a = new Date(timestamp * 1000);
//     var year = a.getFullYear();
//     var day = a.getDay();
//     var month = a.getMonth()
//     var date = day + '/' + month + '/' + year ;
//     return date;
// }

async function uploadProfilePicture(uri, name) {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });

    const ref = firebase
        .storage()
        .ref()
        .child(name);
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
}

async function deleteProfilePicture(name) {
    // Create a reference to the file to delete
    const ref = firebase
        .storage()
        .ref()
        .child(name);

    // Delete the image
    ref.delete().then(function () {
        // File deleted successfully
        console.log("Image from firestorage deleted")
        return;
    }).catch(function (error) {
        // Uh-oh, an error occurred!
        console.log("Image from firestorage NOT deleted because it doesn't exists")
        return;
    });
}

export async function createUser(data) {

    console.log("Inserting user data into firestore...")

    var name;
    var email;
    var profile_picture;
    var age = getAge(data.birth_date);//getAge(data.birth_date.replace(/-/g, '/'));
    //var birth_date = new Date(data.birth_date);//new Date(data.birth_date.replace(/-/g, '/'));

    try {

        if (data.googleData != null) {
            name = data.googleData.user.givenName;
            email = data.googleData.user.email;
            // Get google image with more quality
            profile_picture = data.googleData.user.photoUrl.replace("s96", "s400");
        } else {
            name = data.name;
            email = data.email;
            //profile_picture = await uploadProfilePicture(data.profile_picture, data.uid);
            profile_picture = "https://lh3.googleusercontent.com/a-/AOh14Gj32recPlk45teYg20KnAt3WZX8i8kql9LcUJiSdcg=s400-c";
        }

        var userData = {
            name: name,
            email: email,
            profile_picture: profile_picture,
            current_location: data.current_location,
            birth_date: data.birth_date,
            phone: data.phone,
            about_me: data.about_me,
            countries: data.countries,
            languages: data.languages,
            hobbies: data.hobbies,
            user_type: data.user_type,
            age: age,
            gender: data.gender,
        }

        // Inserting user data
        db.collection("users").doc(data.uid).set(userData)
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

    } catch (err) {
        console.log(err);
        return err;
    }

};

export async function editUser(data, userId) {

    // Checking if the profile picture is local
    // If it's not local then we don't update anything
    // If it's local we delete the old one and change it for the new one
    if (String(data.profile_picture).includes('googleusercontent') || String(data.profile_picture).includes('firebasestorage')) {
        delete data.profile_picture;
    } else {

        // Delete old image in firestore storage
        await deleteProfilePicture(userId);

        // Upload new image in firestore storage
        var profile_picture = await uploadProfilePicture(data.profile_picture, userId);
        data.profile_picture = profile_picture;
    }

    console.log(data)

    console.log("Updating user data... ", userId)

    db.collection('users').doc(userId).update(data).then(() => {
        console.log('User updated!');
        return;
    });
};

export function deleteUser() {

};

export async function getListOfPlaces(currentLocation, type) {
    console.log("Getting list of places nearby...")

    // Formatting the location
    var currentLocation = currentLocation.coords.latitude + ',' + currentLocation.coords.longitude;
    var radius = 10000;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    // Doing request to google api in order to get places nearby
    var res = fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + currentLocation + "&radius=" + radius + "&opennow=true&type=" + type + "&keyword=tourism&key=" + GOOGLE_API_KEY, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result.results;
        })
        .catch(error => console.log('error', error));

    return res;
}

export function getPlacePicture(place) {
    if (place.photos != undefined) {
        return 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + place.photos[0]['photo_reference'] + '&key=AIzaSyC_iGZnODFXnCUCOF_gRwja3-kmHnF-PAY'
    } else {
        return 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=ATtYBwJSNxfNe1BESWMrZyHEkHkFGjRxt8hDhoxVeYOeRxHMJR9ZjqTVbhKhybgSGtBBRhPchkmnABY6oFmh2I0PEAFYAVIwFB8aEsFk1FdOTUHboLHGaIqnfOnXgm6SNgAFzSU8lsN76FUYgeI9EkxynL1pZ-YOSoTdLJ1KUa_hlWsHaa5D&key=AIzaSyC_iGZnODFXnCUCOF_gRwja3-kmHnF-PAY'
    }
}


export async function getListOfLocals(currentUser) {

    var users = [];
    var data = await db.collection("users").where('user_type', 'in', ['Local']).get();

    data.docs.forEach(item => {

        if (item.data().email != currentUser) {
            var userData = item.data();
            userData.id = item.id
            users.push(userData)
        }
    })

    return users;
};

export async function getListOfTripvers(currentUser) {

    var users = [];
    var data = await db.collection("users").where('user_type', 'in', ['Tripver']).get();

    data.docs.forEach(item => {
        if (item.data().email != currentUser) {
            var userData = item.data();
            userData.id = item.id
            users.push(userData)
        }
    })

    return users;
};

export async function userExists(email) {

    var exists = false;
    var data = await db.collection("users").get();

    data.docs.forEach(item => {
        if (email == item.data().email) {
            exists = true;
        }
    })

    return exists;
}

export function getUserData(user) {
    /* In order to know which user is logged in
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              console.log('User uid: ', user.uid);
            }
          });*/
};

export async function getProfilePicture(chatkittyId) {

    var data = await db.collection("users").where('chatkitty_id', 'in', [chatkittyId]).get();

    console.log(chatkittyId)
    console.log(data.docs)
    data.docs.forEach(item => {
        console.log(item.data())
        //return item.data().profile_picture;
    })
}

export function calculateDistance(lat1, lon1, lat2, lon2) {
    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }
    // If is less than 1km return in meters
    var R = 6371; // km 
    //has a problem with the .toRad() method below.
    var x1 = lat2 - lat1;
    var dLat = x1.toRad();
    var x2 = lon2 - lon1;
    var dLon = x2.toRad();
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    // Converting to meters 
    //  if(d < 1){
    //     console.log('Before', d)
    //     d = d * 1000;
    //     console.log('After', d)
    //  }

    return Number((d).toFixed(1));;
}

export async function getCurrentLocation() {

    await UserPermissions.getLocationAsync();

    let location = await Location.getCurrentPositionAsync({
        maximumAge: 60000, // only for Android
        accuracy: Platform.OS == 'Android' ? Location.Accuracy.Low : Location.Accuracy.Lowest,
    });

return location;
}

