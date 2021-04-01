// Importing react utilities
import React, { createContext, useState } from 'react';
import * as Google from "expo-google-app-auth";

// Importing components
import { kitty } from '../chatkitty';
import { firebase, IOS_CLIENT_ID, ANDROID_CLIENT_ID } from '../firebase/index.js';
import { createUser } from '../firebase/Logic.js';

export const AuthContext = createContext({});

// Register google user in firebase
function onGoogleSignUp(googleUser, data) {
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(async (firebaseUser) => {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser.user, firebaseUser)) {

      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken,
      );

      // Sign in with credential from the Google user.
      firebase.auth().signInWithCredential(credential).then(async function (res) {

        // Inserting all the user data to the cloud firestore and create user
        await createUser(data);
        //displayName: res.additionalUserInfo.profile.given_name

        // Starting session
        let result = await kitty.startSession({
          username: googleUser.user.email,
          authParams: {
            accessToken: googleUser.accessToken,
            idToken: googleUser.accessToken,
            displayName: googleUser.user.givenName
          },
        });

        if (result.failed) {
          console.log('Could not login');
        }

      }).catch((error) => {
        console.log(error)
      });

    } else {
      console.log('User already signed-in Firebase.');

      // Login with the user and the credentials of gooogle
      // Starting session
      let result = await kitty.startSession({
        username: data.email,
        authParams: {
          accessToken: googleUser.accessToken,
          idToken: googleUser.accessToken,
        },
      });

      if (result.failed) {
        console.log('Could not login');
      }
    }
  }
  );
}

// Log In google user with firebase
async function onGoogleSignIn() {
  try {

    const googleResult = await Google.logInAsync({
      iosClientId: IOS_CLIENT_ID,
      androidClientId: ANDROID_CLIENT_ID,
    });

    if (googleResult.type === "success") {
      // In order to get firebase users
      var unsubscribe = firebase.auth().onAuthStateChanged(async (firebaseUser) => {
        unsubscribe();

        // Check if the user exists
        if (isUserEqual(googleResult.user, firebaseUser)) {

          // Starting session
          let result = await kitty.startSession({
            username: googleResult.user.email,
            authParams: {
              accessToken: googleResult.accessToken,
              idToken: googleResult.accessToken
            },
          });

          return;

          if (result.failed) {
            console.log('Could not login');
            return;
          }

        } else {
          console.log("This user does not exist: ", googleResult.user)
          return;
        }
      });
    }
  }
  catch (error) {
    console.log("Could not login", error);
    return;
  }
}

function isUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      console.log(providerData[i].uid)
      console.log(googleUser.id)
      if (providerData[i].uid === googleUser.id) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
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
          }
        },
        // --------------------------------
        // --------- Google login ---------
        //---------------------------------
        loginWithGoogle: async () => {
          setLoading(true);
          await onGoogleSignIn();
        },
        // --------------------------------
        // -------- Email register --------
        //---------------------------------
        register: async (data) => {

          setLoading(true);

          try {

            // --------------------------------
            // ----- Register with Google -----
            //---------------------------------
            if (data.googleData != null) {
              console.log("GOOGLE AUTH")

              onGoogleSignUp(data.googleData, data)

            }

            // --------------------------------
            // ----- Register with Email -----
            //---------------------------------
            else {
              // Creating the user from email
              console.log("EMAIL AUTH")
              await firebase
                .auth()
                .createUserWithEmailAndPassword(data.email, data.password)
                .then((credential) => {
                  credential.user
                    .updateProfile({ displayName: data.name })
                    .then(async () => {

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

              // Then you can use the Google REST API
              // In order to get firebase users
              var unsubscribe = firebase.auth().onAuthStateChanged(async (firebaseUser) => {
                unsubscribe();

                if (!isUserEqual(googleResult.user, firebaseUser)) {
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
              });

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
            console.log("Logged out")
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