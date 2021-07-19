// Importing react utilities
import React, { createContext, useState } from 'react';
import * as Google from "expo-google-app-auth";

// Importing components
import { kitty } from '../chatkitty';
import { firebase, IOS_CLIENT_ID, ANDROID_CLIENT_ID } from '../firebase/index.js';
import { createUser, userExists } from '../firebase/Logic.js';

export const AuthContext = createContext({});

// Register google user in firebase
async function onGoogleSignUp(googleUser, data) {

  // Build Firebase credential with the Google ID token.
  var credential = firebase.auth.GoogleAuthProvider.credential(
    googleUser.idToken,
    googleUser.accessToken,
  );

  // Sign in with credential from the Google user.
  firebase.auth().signInWithCredential(credential).then(async function (res) {

    data.uid = res.user.uid

    // Inserting all the user data to the cloud firestore and create the user
    await createUser(data);

    // Starting session
    let result = await kitty.startSession({
      username: googleUser.user.email,
      authParams: {
        accessToken: googleUser.accessToken,
        idToken: googleUser.accessToken,
      },
    });

    return result;

  }).catch((error) => {
    console.log(error)
  });
}


// Log In google user with firebase
async function onGoogleSignIn() {
  try {

    const googleResult = await Google.logInAsync({
      iosClientId: IOS_CLIENT_ID,
      androidClientId: ANDROID_CLIENT_ID,
    });

    if (googleResult.type === "success") {

      // Check if the user exists
      if (await userExists(googleResult.user.email)) {

        // Starting session
        let result = await kitty.startSession({
          username: googleResult.user.email,
          authParams: {
            accessToken: googleResult.accessToken,
            idToken: googleResult.accessToken
          },
        });

        if (result.failed) {
          console.log('Could not login');
          return;
        }

        return;

      } else {
        console.log("This user does not exist: ", googleResult.user)
        return;
      }
    }
  }
  catch (error) {
    console.log("Could not login", error);
    return;
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userId,
        setUserId,
        loading,
        setLoading,
        firebaseUser,
        setFirebaseUser,
        // --------------------------------
        // --------- Email login ----------
        //---------------------------------
        loginWithEmail: async (email, password) => {
          setLoading(true);

          // Starting session
          let result = await kitty.startSession({
            username: email,
            authParams: {
              password: password,
            },
          });

          setLoading(false);

          if (result.failed) {
            console.log('Could not login');
            return false;
          }
        },
        // --------------------------------
        // --------- Google login ---------
        //---------------------------------
        loginWithGoogle: async () => {
          setLoading(true);
          await onGoogleSignIn();
          setLoading(false);
        },
        // --------------------------------
        // -------- Email register --------
        //---------------------------------
        register: async (data) => {

          try {
            
            setLoading(true);

            // --------------------------------
            // ----- Register with Google -----
            //---------------------------------
            if (data.googleData != null) {
              console.log("GOOGLE AUTH")

              var res = onGoogleSignUp(data.googleData, data);

              setLoading(false);

              if (res.failed) {
                console.log('Could not login');
              }


            }

            // --------------------------------
            // ----- Register with Email -----
            //---------------------------------
            else {
              setLoading(true);

              // Creating the user from email
              console.log("EMAIL AUTH")
              await firebase
                .auth()
                .createUserWithEmailAndPassword(data.email, data.password)
                .then((credential) => {
                  credential.user
                    .updateProfile({ displayName: data.name })
                    .then(async () => {

                      data.uid = credential.user.uid;

                      // Inserting all the user data to the cloud firestore and create user
                      await createUser(data);
                  
                      // Starting session
                      const result = await kitty.startSession({
                        username: data.email,
                        authParams: {
                          password: data.password,
                        },
                      });

                      setLoading(false);

                      if (result.failed) {
                        console.log('Could not login');
                      }

                    });
                });
            }
          } catch (e) {
            console.log(e);
            setLoading(false);
          }
        },
        // --------------------------------
        // ----- Continue with Google -----
        // --------------------------------
        continueWithGoogle: async () => {
          console.log("Continue with Google");
          setLoading(true);

          try {

            const googleResult = await Google.logInAsync({
              iosClientId: IOS_CLIENT_ID,
              androidClientId: ANDROID_CLIENT_ID,
            })

            setLoading(false);

            if (googleResult.type === "success") {

              //console.log(googleResult)

              // If the user doesn't exists, sign in
              if (! await userExists(googleResult.user.email)) {
                // Returning data to SignUpScreen2
                return googleResult;
              }
              else {
                // If the user exists log in with the google credentials
                setLoading(true);

                // Starting session
                let result = await kitty.startSession({
                  username: googleResult.user.email,
                  authParams: {
                    accessToken: googleResult.accessToken,
                    idToken: googleResult.idToken
                  },
                });

                setLoading(false);

                if (result.failed) {
                  console.log('Could not login');
                  return;
                }
              }

            }

          } catch (error) {
            console.log("Could not login", error);
            setLoading(false);
          }
        },
        // --------------------------------
        // ---------- Logout --------------
        //---------------------------------
        logout: async () => {
          try {
            await kitty.endSession();
            console.log("Logged out");
            firebase.auth()
              .signOut()
              .then(() => console.log('User signed out!'));
            setLoading(false);
          } catch (e) {
            console.error(e);
            setLoading(false);
          }
        },
      }
      }
    >
      { children}
    </AuthContext.Provider >
  );
};