// Importing react utilities
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

import * as Colors from '../../styles/colors';


export default class Loading extends React.Component {

  constructor(props) {
    super(props);
 
    this.state = {
      showText: props.showText,
    };
  }

  componentDidMount() {
    this.animation.play();
    // Or set a specific startFrame and endFrame with:
    // this.animation.play(30, 120);
  }

  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

  render() {
    return (
      <View style={styles.animationContainer}>
        {this.state.showText ? <Text style={styles.text}>Setting up your profile...</Text> : null}
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            width: 200,
            height: 200,
          }}
          speed={0.7}
          source={require('../../assets/animations/loading.json')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
  logo: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '50%',
  },
  text:{
    fontSize:25,
    marginBottom:90,
    marginTop:-80,
    color:Colors.PRIMARY,
  },
});