// Importing react utilities
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';

// Importing components
import { kitty } from '../chatkitty';


import Loading from '../components/atoms/Loading';
import { db } from '../firebase/index';

import { AuthContext } from './AuthProvider';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

export default function Routes() {
  const { user, setUser } = useContext(AuthContext);
  const { userId, setUserId } = useContext(AuthContext);
  const { firebaseUser, setFirebaseUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    return kitty.onCurrentUserChanged(async (currentUser) => {

      setUser(currentUser);

      // Getting uid of firestore from email of chatkitty logged in
      if (currentUser != null) {

        var email = currentUser.name
        var picture;

        var data = await db.collection("users").where('email', '==', email).get();

        data.docs.forEach(async item => {
          // Saving all the data of the current user
          setFirebaseUser(item.data())

          // // Adding a property to the current user for the profile_picture

          // IT CREATES A BUG IN THE CHAT
          if (currentUser.properties.profile_picture == undefined) {
            // await kitty.updateCurrentUser((user) => {
            //   user.properties = {
            //     ...user.properties,
            //     "profile_picture": item.data().profile_picture,
            //   };
          }

          //   return user;
          // });

          // Updating the chatkitty display picture
          // picture = item.data().profile_picture;

          // Saving firebase logged user id
          setUserId(item.id)
          //console.log("USER ID", item.id)

          // TO DO: Not doing it always
          // Saving chatkitty id        
          if (item.chatkitty_id == undefined) {
            await db.collection("users").doc(item.id).update({ chatkitty_id: currentUser.id });
          }

        })


        // I have to pass a file in order to change the chatkitty display picture
        // var res = await kitty.updateCurrentUserDisplayPicture( file );
        // console.log(res)
        // console.log("CHATKITTY PICTURE", currentUser.displayPictureUrl)


      }

      if (initializing) {
        setInitializing(false);
      }

      setLoading(false);
    });
  }, [initializing, setUserId, setUser, setFirebaseUser]);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}