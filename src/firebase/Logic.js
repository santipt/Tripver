import { db, firebase } from './index';

// Calculating age from date of birth
const getAge = (dateString) => {

    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export function convertTimestampToDate(timestamp) {
    var a = new Date(timestamp * 1000);
    var year = a.getFullYear();
    var day = a.getDay();
    var month = a.getMonth()
    var date = day + '/' + month + '/' + year ;
    return date;
}

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
    var birth_date = new Date(data.birth_date);//new Date(data.birth_date.replace(/-/g, '/'));

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
            birth_date: birth_date,
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

export async function getListOfLocals(currentUser) {

    var users = [];
    var data = await db.collection("users").where('user_type', 'in', ['local']).get();

    data.docs.forEach(item => {

        if (item.data().email != currentUser) {
            users.push(item.data())
        }
    })

    return users;
};

export async function getListOfTripvers(currentUser) {

    var users = [];
    var data = await db.collection("users").where('user_type', 'in', ['tripver']).get();

    data.docs.forEach(item => {

        if (item.data().email != currentUser) {
            users.push(item.data())
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
