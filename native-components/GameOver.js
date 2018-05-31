/* eslint-disable */
import React from 'react';
import { View, StyleSheet, Text, Button, ScrollView, TouchableOpacity } from 'react-native';
import { StackActions } from 'react-navigation';

class GameOver extends React.Component {
  render() {
    const scores = [
      { team: 'The GOATs', score: 16 },
      { team: 'Dream Team', score: 12 },
      { team: 'Get to the Choppa', score: 9 }
    ]
    return (
      <View style={ styles.container }>
        <Text style={ styles.h1} >Thanks for playing!</Text>
        <Text style={ styles.h2 }>Final Scores:</Text>
        <View style={ styles.scroll }>
          <ScrollView>
            {
              scores.map(score => (
                <Text style={ styles.scores } key={ score.team }>{`${score.team}: ${score.score}`}</Text>
              ))
            }
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.buttonView} onPress={() => this.props.navigation.push('Home')}>
          <Text style={styles.buttonButton}>Back home</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    backgroundColor: '#E7F1F5',
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingBottom: 20,
    color: '#27476E',
  },
  h2: {
    fontSize: 26,
    paddingBottom: 20,
    color: '#27476E',
  },
  scores: {
    fontSize: 18,
    padding: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#27476E',
  },
  scroll: {
    maxHeight: '50%'
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

export default GameOver;
