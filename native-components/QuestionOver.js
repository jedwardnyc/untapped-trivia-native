/* eslint-disable */
import React from 'react';
import { View, StyleSheet, Text, Button, AsyncStorage } from 'react-native';
import axios from 'axios';
import socket from '../socket-client';
import he from 'he';
window.navigator.userAgent = "react-native";

class QuestionOver extends React.Component {
  constructor() {
    super()
    this.state = {
      timer: 5,
      score: 0
    }
    this.onParseHTML = this.onParseHTML.bind(this)
  }

  componentDidMount() {
    Promise.all([ AsyncStorage.getItem('score') ])
      .then(([ score ]) => this.setState({ score }))
    socket.once('ready for next question', (index) => {
      if (index < 9) this.props.navigation.push('QuestionActive')
    })
    socket.on('wait timer', (timer) => this.setState({ timer }))
    socket.once('game has ended', () => this.props.navigation.navigate('GameOver'))
  }

  componentWillUnmount() {
    socket.off('wait timer')
  }

  onParseHTML(str) {
    return he.decode(`${str}`)
  }

  render() {
    const { timer, score } = this.state
    const { answer, question, questionNumber } = this.props.navigation.state.params
    const { onParseHTML } = this
    return (
      <View style={ styles.container }>
        <Text style={[ styles.centerText, styles.h1 ]}>Question { questionNumber }</Text>
        <Text style={[ styles.centerText, styles.copy ]}>{ onParseHTML(question.question) }</Text>
        <Text style={[ styles.centerText, styles.h2 ]}>Correct Answer:</Text>
        <Text style={[ styles.centerText, styles.copy ]}>{ onParseHTML(question.correct_answer) }</Text>
        <Text style={[ styles.centerText, styles.h2 ]}>Your Answer:</Text>
        <Text style={[ styles.centerText, styles.copy ]}>{ answer ? onParseHTML(answer) : 'No answer selected' }</Text>
        <Text style={[ styles.centerText, styles.h2, styles.final ]}>Your Score: {score || 0}</Text>
        <Text style={[styles.centerText, styles.h1]}>Next Question in:</Text>
        <Text style={[ styles.centerText, styles.timer ]}>:{ timer > 9 ? timer : `0${timer}` }</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 10,
    paddingTop: 80,
    backgroundColor: '#E7F1F5',
  },
  centerText: {
    textAlign: 'center',
    color: '#27476E',
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 10
  },
  h2: {
    fontSize: 22,
    paddingTop: 25
  },
  timer: {
    fontSize: 35,
    fontWeight: 'bold'
  },
  copy: {
    fontSize: 18,
    paddingTop: 10
  },
  final: {
    paddingBottom: 40,
    fontWeight: 'bold'
  }
})

export default QuestionOver
