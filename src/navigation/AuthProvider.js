// Importing react utilities
import React, { createContext, useState } from 'react';

// Importing components
import { kitty } from '../chatkitty';
import { firebase, IOS_CLIENT_ID, ANDROID_CLIENT_ID } from '../firebase';
import * as Google from "expo-google-app-auth";

export const AuthContext = createContext({});

// Call this at the end of the sign up steps
function onGoogleSignUp(googleUser) {
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser.user, firebaseUser)) {

      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken,
      );

      // Sign in with credential from the Google user.
      firebase.auth().signInWithCredential(credential).then(function (result) {
        // Inserting all the user data to the cloud firestore and create user

      }).catch((error) => {
        console.log(error)
      });
    } else {
      console.log('User already signed-in Firebase.');
    }
  }
  );
}

function isUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
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
  const [userExists, setUserExists] = useState(false);

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

          try {

            const googleResult = await Google.logInAsync({
              iosClientId: IOS_CLIENT_ID,
              androidClientId: ANDROID_CLIENT_ID,
            });

            setLoading(false);

            if (googleResult.type === "success") {
              // In order to get firebase users
              var unsubscribe = firebase.auth().onAuthStateChanged(async (firebaseUser) => {
                unsubscribe();
                setUserExists(isUserEqual(googleResult.user, firebaseUser))
              });

              // Check if the user exists
              if (userExists) {
                // Starting session
                let result = await kitty.startSession({
                  username: googleResult.user.email,
                });


                if (result.failed) {
                  console.log('Could not login');
                }
              } else {
                console.log("This user does not exist: ",googleResult.user)
                setLoading(false);
              }

            }
          }
          catch (error) {
            console.log("Could not login", error);
            setLoading(false);
          }

        },
        // --------------------------------
        // -------- Email register --------
        //---------------------------------
        registerWithEmail: async (email, password) => {
          setLoading(true);

          try {
            await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then((credential) => {
                credential.user
                  .then(async () => {
                    console.log(email)
                    console.log(password)

                    // Starting session
                    let result = await kitty.startSession({
                      username: email,
                      authParams: {
                        password: password,
                      },
                    });

                    if (result.failed) {
                      console.log('Could not login');
                    }
                  });
              });
          } catch (e) {
            console.log(e);
          }
          setLoading(false);
        },
        // --------------------------------
        // ----- Register with Google -----
        //---------------------------------
        registerWithGoogle: async () => {
          console.log("Sign Up with Google");
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
                setUserExists(isUserEqual(googleResult.user, firebaseUser))
              });

              if (!userExists) {
                // Passing data to SignUp2
                return googleResult;
              }
              else {
                console.log("This user already exists", googleResult)
                return null;
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
          } catch (e) {
            console.error(e);
          }
        },
      }
      }
    >
      { children}
    </AuthContext.Provider >
  );
};