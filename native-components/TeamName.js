/* eslint-disable */
import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import socket from '../socket-client';
window.navigator.userAgent = "react-native";

class TeamName extends React.Component {
  constructor() {
    super()
    this.state = { name: '' }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {
    const { name } = this.state
    socket.emit('team-name', name)
    socket.on('team register', (team) => {
      console.log(`component from socket: team ${team}`)
    })
    AsyncStorage.setItem('team_name', name)
    this.props.navigation.navigate('PregameCountdown', { name })
  }

  render() {
    const { name } = this.state
    const { onSubmit } = this
    return (
      <KeyboardAvoidingView style={ styles.container} behavior="padding" enabled>
        <Text style={ styles.h1 }>Team Name</Text>
        <Text style={ styles.h2 }>Choose your team name</Text>
        <View style={ styles.inputContainer }>
          <TextInput
            onChangeText={(name) => this.setState({ name })}
            style={ styles.input }
            autoFocus
            value={ name }
            placeholder="Team name"
            maxLength={ 25}
            onSubmitEditing={ onSubmit }
            autoCapitalize="words"
          />
        </View>
        <View style={ styles.button }>
          <Button disabled={ name.length < 4 } title="Submit" onPress={ onSubmit } />
        </View>
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
    textAlign: 'center'
  },
  h2: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 40,
    textAlign: 'center'
  },
  input: {
    fontSize: 20,
    textAlign: 'center'
  },
  inputContainer: {
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    backgroundColor: '#fff',
    borderRadius: 5
  },
  button: {
    paddingTop: 50
  }
})

export default TeamName;
