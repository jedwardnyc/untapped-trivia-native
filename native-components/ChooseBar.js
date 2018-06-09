/* eslint-disable */
import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, KeyboardAvoidingView, AsyncStorage, TouchableOpacity, ScrollView } from 'react-native';
import socket from '../socket-client';
import axios from 'axios';
window.navigator.userAgent = "react-native";

class ChooseBar extends React.Component {
  // static navigationOptions = (props) => {
  //   return {
  //     headerRight: (
  //       <TouchableOpacity onPress={() => props.navigation.navigate('QRScanner', { scanQR: props })}>
  //         <Text style={{
  //           color: '#fff',
  //           fontWeight: 'bold',
  //           fontSize: 16,
  //           textAlign: 'center',
  //           paddingLeft: 8,
  //           paddingRight: 8
  //         }} >Scan QR Code</Text>
  //       </TouchableOpacity>
  //     ),
  //   }
  // }
  constructor() {
    super()
    this.state = { 
      barId: '',
      latitude: null,
      longitude: null,
      error: null,
      bars: []
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onScanQR = this.onScanQR.bind(this)
    this.anyCloseBars = this.anyCloseBars.bind(this)
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      (error) => this.setState({ error: error.message })
    )
    axios.get('https://untapped-trivia.herokuapp.com/v1/bars')
    .then(res => res.data)
    .then(bars => this.setState({ bars }))
    .catch(err => console.log(err))
  }

  anyCloseBars (currentCoords, barCoords, miles) {
      const my = 24901.92 / 360;
      const mx = Math.cos(Math.PI * currentCoords.lat / 180.0) * my;
      const dy = Math.abs(currentCoords.lat - barCoords.lat) * my;
      const dx = Math.abs(currentCoords.lng - barCoords.lng) * mx;
      return Math.sqrt(dx**2 + dy**2) <= miles;
  }

  onSubmit() {
    console.log('Bar id:', this.state.barId)
    const { barId } = this.state
    socket.emit('choose bar', barId)
    AsyncStorage.setItem('bar_id', barId)
    this.props.navigation.navigate('TeamName')
  }

  onScanQR(bar) {
    console.log('qr scanned!', bar)
    this.setState({ barId: bar.data })
  }

  render() {
    const { barId, longitude, latitude, error, bars } = this.state
    const { onSubmit, onScanQR } = this
    const noBar = barId.length < 4
    console.log("All Bars:", bars)
    console.log("Close Bars:", closeBars)
    console.log(this.state)
    const closeBars = bars.filter((bar) => this.anyCloseBars({ lng: longitude, lat: latitude }, { lng: bar.longitude, lat: bar.latitude }, 2))
    return (
      <KeyboardAvoidingView style={ styles.container } behavior="padding" enabled>
        <Text style={ styles.h1 }>Choose your Bar</Text>
        <TouchableOpacity style={styles.scanView} onPress={() => this.props.navigation.navigate('QRScanner', { scanQR: this.onScanQR })}>
          <Text style={ styles.scanButton }>Scan Code</Text>
        </TouchableOpacity>
        <Text style={ styles.h2 }> --- OR --- </Text>
        { closeBars.length ? 
          <View>
            <Text style={ styles.idText }> Pick a Bar Near You </Text>
            { closeBars.map(bar => {
                return ( 
                  <TouchableOpacity style={barId === bar.id ? styles.selectedBar : styles.barView} key={bar.id} onPress={() => this.setState({ barId: bar.id })}> 
                    <Text style={ styles.barButton }>{ bar.name }</Text>
                  </TouchableOpacity>
                )
              }) 
            }
            { error && <Text>Whoops! {error}</Text> }
          </View>
          : 
          <View>
            <Text style={ styles.idText }>Looks like there are no bars near you that are playing </Text>
            <Text style={ styles.idText }>Enter a Bar ID below</Text>
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
          </View>
        }
        <TouchableOpacity style={[ styles.submitView, { backgroundColor: noBar ? '#4591AF' : '#006992'} ]} disabled={ noBar } title="Submit" onPress={ onSubmit }>
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
    paddingTop: 60,
    backgroundColor: '#E7F1F5',
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#27476E'
  },
  h2: {
    fontSize: 15,
    paddingTop: 10,
    color: '#27476E'
  },
  idText: {
    fontSize: 24,
    paddingTop: 10,
    color: '#27476E',
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
  },
  scanView: {
    borderRadius: 30,
    width: 160,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#006992',
  },
  scanButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  barView: {
    borderRadius: 30,
    width: 160,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#E7F1F5',
    borderColor: '#006992',
    color: '#006992'
  },
  barButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  selectedBar: {
    borderRadius: 30,
    width: 160,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#006992',
    color: '#fff'
  },
  spacer: {
    paddingTop: 50
  }
})

export default ChooseBar;
