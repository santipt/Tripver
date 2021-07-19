import { db, firebase, GOOGLE_API_KEY } from './index';
import * as Location from 'expo-location';
import UserPermissions from '../utils/UserPersmissions';
import { deleteUserChatkitty, kitty } from '../chatkitty';

// Calculating age from date of birth
export const getAge = (dateString) => {

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
            profile_picture = await uploadProfilePicture(data.profile_picture, data.uid);
            //profile_picture = "https://lh3.googleusercontent.com/a-/AOh14Gj32recPlk45teYg20KnAt3WZX8i8kql9LcUJiSdcg=s400-c";
        }

        // Preparing the data from the user for firebase
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

    // First checking if the profile picture is updated
    // Checking if the profile picture is local
    // If it's not local then we don't update anything
    // If it's local we delete the old one and change it for the new one
    if (data.profile_picture != undefined) {
        if (String(data.profile_picture).includes('googleusercontent') || String(data.profile_picture).includes('firebasestorage')) {
            delete data.profile_picture;
        } else {

            // Delete old image in firestore storage
            await deleteProfilePicture(userId);

            // Upload new image in firestore storage
            var profile_picture = await uploadProfilePicture(data.profile_picture, userId);
            data.profile_picture = profile_picture;
        }
    }

    console.log(data)

    console.log("Updating user data... ", userId)

    db.collection('users').doc(userId).update(data).then(() => {
        console.log('User updated!');
        return;
    });
};

export async function deleteUserData(userId) {

    // Deleting profile picture from firebase storage
    await deleteProfilePicture(userId);

    // Deleting the data from the user in firestore
    return db.collection("users").doc(userId).delete().then(() => {
        console.log("User information successfully deleted!");
        return;
    }).catch((error) => {
        console.error("Error removing document: ", error);
        throw error;
    });

}

export async function deleteUser(email, currentPassword) {

    // Getting chatkitty id of the current user
    let chatkittyId = kitty.currentUser.id;

    // We need to reauthenticate in order to get the firebase user
    return reauthenticate(email, currentPassword).then(async (user) => {

        console.log('Deleting user --> id: ' + user.id + ' email: ' + email)

        // Deleting the user from firebase
        await user.delete();

        // Deleting user information from the database
        await deleteUserData(user.id)

        // Deleting the user from chatkitty
        await deleteUserChatkitty(chatkittyId);

        return;

    })
        .catch((err) => {
            throw err;
        });
}

export async function reauthenticate(email, password) {
    console.log("Reauthentication...")
    return firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        var user = firebase.auth().currentUser;
        return user;
    }).catch((err) => {
        // Throwing error because the password was incorrect
        throw err;
    })

}

export async function changeEmail(newEmail, currentEmail, currentPassword) {
    // We need to reauthenticate in order to get the firebase user
    return reauthenticate(currentEmail, currentPassword).then((user) => {
        //Update user email chatkitty
        return user.updateEmail(newEmail);
    })  // Change email in chatkitty too
        .catch((err) => {
            throw err;
        });

}

export async function changePassword(email, currentPassword, newPassword) {
    // We need to reauthenticate in order to get the firebase user
    return reauthenticate(email, currentPassword).then((user) => {
        return user.updatePassword(newPassword);
        // Change password in chatkitty too
    })
        .catch((err) => {
            throw err;
        });
}

export async function resetPassword(email) {
    try {
        await firebase.auth().sendPasswordResetEmail(email)
        console.log('Password reset email sent successfully')
        return;
    } catch (error) {
        throw error;
    }
}

export async function getListOfPlaces(currentLocation, type) {
    console.log("Getting list of places nearby...")

    // Formatting the location
    var location = currentLocation.coords.latitude + ',' + currentLocation.coords.longitude;
    var radius = 10000;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    // Doing request to google api in order to get places nearby
    var res = fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + location + "&radius=" + radius + "&opennow=true&type=" + type + "&keyword=tourism&key=" + GOOGLE_API_KEY, requestOptions)
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

    console.log(currentUser)

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

    //Checking if the user has the correcg permissions
    await UserPermissions.getLocationAsync();

    // Adding the option low accuracy location in order to get the current position faster
    let location = await Location.getCurrentPositionAsync({
        maximumAge: 60000, // only for Android
        accuracy: Platform.OS == 'Android' ? Location.Accuracy.Low : Location.Accuracy.Lowest,
    });

    let location2 = {
        "coords": {
          "accuracy": 65,
          "altitude": 15.575302124023438,
          "altitudeAccuracy": 20.078706741333008,
          "heading": -1,
          "latitude": 39.484485,
          "longitude": -0.374623,
          "speed": -1,
        },
        "timestamp": 1626646984393.7612,
      }

    return location2;
}

export async function setLastLocation(userId) {

    // First we get the current location from the phone
    // Secondly we inserted the coordinates in firebase
    getCurrentLocation().then(res => {
        var coordinates = {
            last_location: { latitude: res.coords.latitude, longitude: res.coords.longitude }
        }
        db.collection('users').doc(userId).update(coordinates);
    });


}
