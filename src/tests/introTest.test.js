import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount, simulate } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { waitFor } from 'react-native-testing-library';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreens/SignUpScreen';
import SignUpScreen1 from '../screens/SignUpScreens/SignUpScreen1';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FindPeopleScreen from '../screens/FindPeopleScreen';


import FormInput from '../components/atoms/FormInput'
import LongButton from '../components/atoms/LongButton'

import { getAge, getListOfLocals, getListOfTripvers, changeEmail, changePassword, userExists, calculateDistance } from '../firebase/Logic';

Enzyme.configure({ adapter: new Adapter() });

// I have to do 25 tests:
// 6/25


// --------------------------------------------------------
// ----------------- TESTING RENDERING --------------------
// --------------------------------------------------------

// Testing if the SignUpScreen renders correctly
test('Renders correctly SignUpScreen', () => {
  const tree = renderer.create(<SignUpScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});


// --------------------------------------------------------
// ----------------- TESTING LOGIC FUNCTIONS --------------
// --------------------------------------------------------
describe("Testing logic functions", () => {

  // Testing GetListOfLocals() function
  test('Testing GetListOfLocals() function', async (done) => {

    // Passing an existing email (the current user) in order to avoid to show on the list
    getListOfLocals('julia@hotmail.es').then((data) => {
      expect(data).toEqual(
        expect.arrayContaining([
          // Expecting two users (in total are 3)
          expect.objectContaining({ id: 'KalIq4IRH8Ozr2T2g5IW0E7SgJn1' }),
          expect.objectContaining({ id: 'opkVgnmqmlZxZQC2bMisPV5fzLo2' })
        ]));
      done();
    });

  });

  // Testing GetListOfTripvers() function
  test('Testing GetListOfTripvers() function', async (done) => {

    // Passing an existing email (the current user) in order to avoid to show on the list
    getListOfTripvers('ramon@hotmail.es').then((data) => {
      expect(data).toEqual(
        expect.arrayContaining([
          // Expecting one user (in total are 3)
          expect.objectContaining({ id: 'FXjIr88P3ThDDoaaJQYfMDKxNL02' }),
        ]));
      done();
    });

  });


  // Testing if the useExists() works correctly with a user that doesn't exists
  test('Testing userExists() function', (done) => {
    // manolo123@gmail.com doesn't exists in the db
    userExists('manolo123@gmail.com').then((data) => {
      expect(data).toEqual(false);
      done();
    })
  });

  // // Testing changeEmail() function
  // test('Testing changeEmail() function', async (done) => {

  //   // Passing an the new email, existing email, and the wrong password
  //   changeEmail('ramon1@hotmail.es', 'ramon@hotmail.es', '1234').catch((data) => {
  //     console.log(data.message)
  //     expect(data.message).toEqual('The password is invalid or the user does not have a password.');
  //     done();
  //   });

  // });

  // // Testing changePassword() function
  // test('Testing changePassword() function', async (done) => {

  //   // Passing an existing email, the wrong current password and the new password
  //   changePassword('ramon@hotmail.es', '1234', '12345678').catch((data) => {
  //     console.log(data)
  //     expect(data.message).toEqual('The password is invalid or the user does not have a password.');
  //     done();
  //   });

  // });

  // Testing if the getAge() function works correctly
  test('Testing getAge() function', () => {
    // Giving a date and expecting the correct age of the date
    expect(getAge('11/10/1999')).toEqual(21)
  })

  // Testing if the calculateDistance() function works correctly
  test('Testing calculateDistance() function', () => {
    // Giving two coord and expecting the right distance
    expect(calculateDistance(51.12382554627786, 17.044555543152967, 51.11019424353001, 17.034513353317728)).toEqual(1.7)
  })

});

// --------------------------------------------------------
// ----------------- TESTING USER BEHAVIOUR ---------------
// --------------------------------------------------------
describe("LogIn form behaviour", () => {
  test('Renders correctly LoginScreen', () => {
    const tree = renderer.create(<LoginScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('validate user inputs', async () => {

    let inst;
    inst = renderer.create(<LoginScreen />)

    await waitFor(() => {
      const button = inst.root.findByType(LongButton);
      const inputEmail = inst.root.findAllByType(FormInput)[0];
      const inputPassword = inst.root.findAllByType(FormInput)[1];

      inputEmail.props.onChangeText('julia@hotmail.es');
      inputPassword.props.onChangeText('12345678');

      // button.props.onPress();

      // expect(button).toBeTruthy();

      expect(inputEmail.props.value).toBe('julia@hotmail.es');
      expect(inputPassword.props.value).toBe('12345678');
    });

  })
});

describe("SignUp form behaviour", () => {
  test('Renders correctly LoginScreen', () => {
    const tree = renderer.create(<SignUpScreen1 />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('validate user inputs', async () => {

    let inst;
    inst = renderer.create(<SignUpScreen1 />)

    await waitFor(() => {
      const inputName = inst.root.findAllByType(FormInput)[0];
      const inputEmail = inst.root.findAllByType(FormInput)[1];
      const inputPassword = inst.root.findAllByType(FormInput)[2];

      inputName.props.onChangeText('Julia');
      inputEmail.props.onChangeText('julia@hotmail.es');
      inputPassword.props.onChangeText('12345678');

      // button.props.onPress();

      // expect(button).toBeTruthy();

      expect(inputName.props.value).toBe('Julia');
      expect(inputEmail.props.value).toBe('julia@hotmail.es');
      expect(inputPassword.props.value).toBe('12345678');
    });

  })
});

