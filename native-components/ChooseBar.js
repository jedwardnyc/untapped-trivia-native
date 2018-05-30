/* eslint-disable */
import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, KeyboardAvoidingView, AsyncStorage, TouchableOpacity } from 'react-native';
import socket from '../socket-client';
window.navigator.userAgent = "react-native";

class ChooseBar extends React.Component {
  constructor() {
    super()
    this.state = { barId: '' }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {
    const { barId } = this.state
    socket.emit('choose-bar', barId)
    socket.on('bar register', (bar) => {
      console.log(`component from socket: bar id: ${bar}`)
    })
    AsyncStorage.setItem('bar_id', barId)
    this.props.navigation.navigate('TeamName')
  }

  render() {
    const { barId } = this.state
    const { onSubmit } = this
    const noBar = barId.length < 4
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={ styles.h1 }>Choose your Bar</Text>
        <Text style={ styles.h2 }>Enter your Bar ID below</Text>
        <TextInput
          autoFocus
          maxLength={4}
          style={ styles.input }
          placeholder="__  __  __  __"
          keyboardType='numeric'
          value={ barId }
          onChangeText={(barId) => this.setState({ barId })}
          onSubmitEditing={ onSubmit }
        />
        <TouchableOpacity style={[styles.submitView, { backgroundColor: noBar ? '#4591AF' : '#006992'} ] } disabled={ noBar } title="Submit" onPress={ onSubmit }>
          <Text style={ styles.submitButton }>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#27476E'
  },
  h2: {
    fontSize: 20,
    paddingTop: 20,
    color: '#27476E'
  },
  input: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop: 40,
    paddingBottom: 50,
    color: '#27476E'
  },
  submitView: {
    borderRadius: 30,
    width: 160,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#006992',
  },
  submitButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
  }
})

export default ChooseBar;
