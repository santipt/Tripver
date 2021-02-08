// Importing react utilities
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';

// Importing components
import FormButton from '../components/atoms/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);

  // {user.displayName}
  return (
      <View style={styles.container}>
        <Title>Hello, !</Title>
        <FormButton
            modeValue="contained"
            title="Logout"
            onPress={() => logout()}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});