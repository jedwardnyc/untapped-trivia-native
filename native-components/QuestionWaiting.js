/* eslint-disable */
import React from 'react';
import { View, Text, Button, StyleSheet, AsyncStorage } from 'react-native';

class QuestionWaiting extends React.Component {
  constructor() {
    super()
    this.state = {
      timer: 10,
      score: 0
    }
    this.countdown = this.countdown.bind(this)
  }

  componentDidMount() {
    let countdownTimer
    this.setState({ timer: 10 })
    Promise.all([AsyncStorage.getItem('score')])
      .then(([score]) => this.setState({ score }))
    this.countdown()
  }

  componentWillUnmount() {
    clearTimeout(countdownTimer)
  }

  countdown() {
    let { timer } = this.state
    if (timer) {
      this.setState({ timer: timer - 1 })
      countdownTimer = setTimeout(() => this.countdown(), 1000);
    }
    else { this.props.navigation.push('QuestionActive') }
  }

  render() {
    const { timer, score } = this.state
    return (
      <View style={ styles.conatiner }>
        <Text style={[ styles.centerText, styles.h1 ]}>Next Question</Text>
        {/*<Text style={[ styles.centerText, styles.h2 ]}>Category: XX</Text>*/}
        <Text style={[ styles.centerText, styles.h2 ]}>Starting in:</Text>
        <Text style={[ styles.centerText, styles.timer ]}>:{timer > 9 ? timer : `0${timer}`}</Text>
        <Text style={[ styles.centerText, styles.score ]}>Your Score: { score || 0 }</Text>
        <Text style={[ styles.centerText, styles.score ]}>Top Score: X</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    paddingTop: 80,
    backgroundColor: '#E7F1F5',
    // justifyContent: 'center'
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 10
  },
  h2: {
    fontSize: 22,
    paddingBottom: 15
  },
  timer: {
    fontSize: 35,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 25
  },
  score: {
    fontSize: 22,
    padding: 25
  },
  centerText: {
    textAlign: 'center',
    color: '#27476E',
  }
})

export default QuestionWaiting
