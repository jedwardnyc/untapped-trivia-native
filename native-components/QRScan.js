import React from 'react';
 
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
 
import QRCodeScanner from 'react-native-qrcode-scanner';

class Scanner extends React.Component {

  onSuccess(e) {
    const { scanQR } = this.props.navigation.state.params;
    scanQR(e)
    this.props.navigation.goBack()
  }

  render(){
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
      />
    )
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default Scanner;