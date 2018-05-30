/* eslint-disable */
import React from 'react';
import { View, Text, Button, TouchableHighlight, StyleSheet, AsyncStorage, Image, Linking } from 'react-native';
import socket from '../socket-client';
import axios from 'axios';
window.navigator.userAgent = "react-native";

class Login extends React.Component {
  constructor() {
    super()
    this.onLogin = this.onLogin.bind(this)
  }

  componentDidUpdate() {
    Linking.addEventListener('url', this.handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL(event){
    console.log("url", event.url);
  }

  onLogin(site) {
    console.log(`login component: login with ${site}`)
    switch(site) {
      case 'google':
        console.log('switch google')
        // axios.get(`http://localhost:3000/auth/${site}`)
          // .then(res => console.log('response from axios: ', res.data))
      case 'facebook':
        console.log('switch facebook')
    }
    // re-direct user to login with google
    // setting email and google id in the database
    // send back user id who is logging in
    // store user id in async storage

    // Linking.openURL(`http://localhost:3000/auth/${site}`)

    socket.on('authenticated', (id) => {
      console.log("authenticated user:", id)
      AsyncStorage.setItem('user', `${id}`)
    })

    this.props.navigation.navigate('ChooseBar')
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
        {/*<Button onPress={() => onLogin('google') } title="Login with Google" />*/}
        {/*<Button onPress={() => onLogin('facebook') } title="Login with Facebook" />*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 50,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center'
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
