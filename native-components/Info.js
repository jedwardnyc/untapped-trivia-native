/* eslint-disable */
import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

const Info = ({ navigation }) => {
  return (
    <View style={ styles.container }>
      <Text style={ styles.h1 }>UnTapped Trivia</Text>
      <Text style={ styles.copy }>Prove you know the most random facts</Text>
      <TouchableOpacity style={styles.buttonView} onPress={() => navigation.goBack() }>
        <Text style={styles.buttonButton}>Close</Text>
      </TouchableOpacity>
      <Text style={ styles.bottom }>&copy; UnTapped Trivia 2018</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center'
    paddingTop: 180,
    backgroundColor: '#E7F1F5',
  },
  h1: {
    fontSize: 35,
    paddingBottom: 20,
    fontWeight: 'bold',
    color: '#27476E',
  },
  copy: {
    fontSize: 16,
    padding: 10,
    paddingBottom: 60,
    color: '#27476E',
  },
  bottom: {
    paddingTop: 100,
    fontSize: 12,
    color: '#27476E',
  },
  buttonView: {
    borderRadius: 30,
    width: 160,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#006992',
  },
  buttonButton: {
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

export default Info;
