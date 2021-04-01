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

export function createUser(data) {

    console.log("Inserting user data into firestore...")

    var name;
    var email;
    var profile_picture;
    var age = getAge(data.birth_date.replace(/-/g, '/'));
    var birth_date = new Date(data.birth_date.replace(/-/g, '/'));
   
    if (data.googleData != null) {
        name = data.googleData.user.givenName;
        email = data.googleData.user.email;
        profile_picture = data.googleData.user.photoUrl;
    } else {
        name = data.name;
        email = data.email;
        profile_picture = data.profile_picture;
    }

    try {
        var userData = {
            name: name,
            email: email,
            profile_picture: profile_picture,
            current_location: data.current_location,
            birth_date: birth_date,
            user_type: data.phone,
            about_me: data.about_me,
            countries: data.countries,
            languages: data.languages,
            user_type: data.user_type,
            age: age,
            gender: data.gender,
        }

        // Inserting user data
        db.collection("users").add(userData)
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    } catch (err) {
        console.log(err);
        return err;
    }

};


export function deleteUser() {

};

export function editUser() {

};

export async function getListOfUsers() {

    var users = [];
    var data = await db.collection("users").get();

    await data.docs.forEach(item => {
        users.push(item.data())
    })

    return users;
};


export function getUserData(user) {
    /* In order to know which user is logged in
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              console.log('User uid: ', user.uid);
            }
          });*/
};
