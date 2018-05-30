/* eslint-disable */
import React from 'react';
import { View, StyleSheet, Text, Button, ScrollView, FlatList } from 'react-native';
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
        <Text style={ styles.h2 }>Final Scores</Text>
        <View style={ styles.scroll }>
          <ScrollView>
            {
              scores.map(score => (
                <Text style={ styles.scores } key={ score.team }>{`${score.team}: ${score.score}`}</Text>
              ))
            }
          </ScrollView>
        </View>
        <Button title="Back Home" onPress={() => this.props.navigation.push('Home')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingBottom: 20
  },
  h2: {
    fontSize: 26,
    paddingBottom: 20
  },
  scores: {
    fontSize: 18,
    padding: 5,
    textAlign: 'center'
  },
  scroll: {
    maxHeight: '50%'
  }
})

export default GameOver;
