/* eslint-disable */
import React from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, AsyncStorage, TouchableOpacity } from 'react-native';
import socket from '../socket-client';
import axios from 'axios';
window.navigator.userAgent = "react-native";

class ChooseBar extends React.Component {
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
    this.scanQR = this.scanQR.bind(this)
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
    const milesLong = 24901.92 / 360;
    const milesLat = Math.cos(Math.PI * currentCoords.lat / 180.0) * milesLong;
    const distLong = Math.abs(currentCoords.lat - barCoords.lat) * milesLong;
    const distLat = Math.abs(currentCoords.lng - barCoords.lng) * milesLat;
    return Math.sqrt(distLong**2 + distLat**2) <= miles;
  }

  onSubmit() {
    const { barId, bars } = this.state
    const bar_name = bars.find(bar => barId === bar.id).name
    Promise.all([
      AsyncStorage.setItem('bar_id', barId),
      AsyncStorage.setItem('bar_name', bar_name)
    ])
    .then(()=> {
      socket.emit('choose bar', barId)
      this.props.navigation.navigate('TeamName')
    })
  }

  scanQR(bar) {
    Promise.all([this.setState({ barId: bar.data })])
      .then(() =>this.onSubmit());
  }

  render() {
    const { barId, longitude, latitude, error, bars } = this.state
    const { onSubmit, scanQR } = this
    const noBar = barId.length < 4
    
    const closeBars = bars.filter((bar) => this.anyCloseBars({ lng: longitude, lat: latitude }, { lng: bar.longitude, lat: bar.latitude }, 2))
    return (
      <KeyboardAvoidingView style={ styles.container } behavior="padding" enabled>
        <Text style={ styles.title }>Choose your Bar</Text>
        <TouchableOpacity disabled={ !!barId } style={[ styles.scanView, { backgroundColor: barId ? '#4591AF' : '#006992'} ]} onPress={() => this.props.navigation.navigate('QRScanner', { scanQR })}>
          <Text style={ styles.scanButton }>Scan Code</Text>
        </TouchableOpacity>
        <Text style={ styles.h2 }> --- OR --- </Text>
        { closeBars.length ? 
          <View style={styles.center}>
            <Text style={ styles.idText }> Pick a Bar Near You </Text>
            { closeBars.map(bar => {
                return ( 
                  <TouchableOpacity style={barId === bar.id ? styles.selectedBar : styles.barView} key={bar.id} onPress={() => this.setState({ barId: barId ? '' : bar.id})}> 
                    <Text style={ barId === bar.id ? styles.selectedButton : styles.barButton }>{ bar.name }</Text>
                  </TouchableOpacity>
                )
              }) 
            }
            { error && <Text>Whoops! {error}</Text> }
          </View>
          : 
          <View style={styles.enterBar}>
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
    paddingTop: 40,
    backgroundColor: '#E7F1F5',
  },
  title: {
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
  center: {
    alignItems: 'center',
    marginBottom: 80
  },
  enterBar: {
    alignItems: 'center',
  },
  barView: {
    borderRadius: 30,
    width: 160,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#E7F1F5',
    borderColor: '#006992',
    borderWidth: 0.5,
  },
  barButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006992',
    textAlign: 'center',
  },
  selectedBar: {
    borderRadius: 30,
    width: 160,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#006992',
  },
  selectedButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
})

export default ChooseBar;
