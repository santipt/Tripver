// Importing react utilities
import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';

// Importing components
import * as Colors from '../../styles/colors';

// Importing icons
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

export default function EditInput({ labelName, editText,  ...props }) {

  const [text, setText] = useState(editText);

  return (
    <View>
      <View style={styles.description_container}>
                <Text style={styles.description_title}>
                  {labelName}
                </Text>
                <TextInput
                  style={styles.text_input}
                  multiline
                  editable
                  maxLength={35}
                  onChangeText={txt => setText(txt)}
                  value={text}
                  blurOnSubmit={true}
                />
                <Icon2
                  name={props.icon}
                  color={Colors.GRAY_MEDIUM}
                  size={20}
                  style={styles.icon}
                />
              </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    height: 44,
    paddingVertical: 5,
    paddingHorizontal: 10,    
    borderRadius: 30,
    backgroundColor: 'white',
    fontSize: 15,
  },
  title:{
    marginLeft:10,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },

  description_container: {
    borderRadius: 14,
    padding: 8,
    marginBottom: 10,
    color: Colors.GRAY_DARK,
    borderColor: Colors.GRAY_MEDIUM,
    borderRadius: 14,
    borderWidth: 2,
  },

  description_title: {
    fontWeight: 'normal',
    fontSize: 15,
    marginLeft: 5,
  },

  text_input: {
    padding: 5,
    color: Colors.PRIMARY,
  },

  icon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: '45%',
    right: '4%'
  },
});