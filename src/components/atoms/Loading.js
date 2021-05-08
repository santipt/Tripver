// Importing react utilities
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import LottieView from 'lottie-react-native';

export default class Loading extends React.Component {

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
        {/* <Image source={require('../../assets/animations/bird.png')} resizeMode="contain" style={styles.logo}></Image> */}
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
});