import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Info = ({ navigation }) => {
  return (
    <View style={ styles.container }>
      <Text style={ styles.h1 }>UnTapped Trivia</Text>
      <Text style={ styles.copy }>Prove you know the most random facts</Text>
      <Button title="Close" onPress={() => navigation.goBack() } />
      <Text style={ styles.bottom }>&copy; UnTapped Trivia 2018</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center'
    paddingTop: 180
  },
  h1: {
    fontSize: 35,
    paddingBottom: 20
  },
  copy: {
    fontSize: 16,
    padding: 10,
    paddingBottom: 60
  },
  bottom: {
    paddingTop: 100,
    fontSize: 12
  }
})

export default Info;
