/* eslint-disable */
import React from 'react';
import { View, Text, Button, TouchableHighlight, StyleSheet, AsyncStorage, Image, Linking } from 'react-native';
import socket from '../socket-client';
window.navigator.userAgent = "react-native";

class Login extends React.Component {
  constructor() {
    super()
    this.onLogin = this.onLogin.bind(this)
  }

  onLogin(site) {
    Linking.openURL(`https://untapped-trivia.herokuapp.com/auth/${site}`)
      .then(() => this.props.navigation.navigate('ChooseBar'))
      .catch(err => console.log(err))
    socket.on('authenticated', ({ id, socket }) => {
      console.log('***socket***', socket)
      AsyncStorage.setItem('team', `${id}`)
    }) 
  }

  render() {
    const { onLogin } = this
    return (
      <View style={ styles.container }>
        <Text style={ styles.h1 }>Login to play</Text>

        <View style={ styles.buttonContainer }>
          <TouchableHighlight onPress={() => onLogin('google')} underlayColor={'#f0f3f8'}>
            <Image style={ styles.googleButton } source={require('../images/google_button.png')} />
          </TouchableHighlight>
        </View>

        <View>
          <TouchableHighlight onPress={() => onLogin('facebook')} underlayColor={'#f0f3f8'}>
            <Image style={ styles.facebookButton } source={require('../images/facebook_button.png')} />
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    backgroundColor: '#E7F1F5',
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 50,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
    color: '#27476E'
  },
  buttonContainer: {
    paddingBottom: 40
  },
  googleButton: {
    width: 250,
    height: 60.25
  },
  facebookButton: {
    width: 250,
    height: 40.5
  }
})

export default Login;
