import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Camera from 'react-native-camera';

class CameraView extends React.Component {
  render() {
    return (
      <View>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>
            [CAPTURE]
       </Text>
        </Camera>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
})

export default CameraView;
