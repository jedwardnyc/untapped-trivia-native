/* eslint-disable */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class PregameStatic extends React.Component {
  // static navigationOptions = {
  //   title: 'Pregame'
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Game starts at 9:00pm
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 100,
  }
})

export default PregameStatic;
