import { db } from './index';


export function createUser(data) {

    var res = {
        name: data.googleData.user.givenName,
        email: data.googleData.user.email,
        profile_picture: data.googleData.user.photoUrl,
        current_location: data.current_location,
        birth_date: data.birth_date,        
        user_type: data.phone,
        about_me: data.about_me,
        countries: data.countries,
        languages: data.languages,
        user_type: data.user_type,
        // TODO
        // Age --> calculate age from birth_date
        // Convert birth_date into date formats
    }

    // Data base insert
    db.collection("users").add(res)
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
};

export function deleteUser() {

};

export function editUser() {

};