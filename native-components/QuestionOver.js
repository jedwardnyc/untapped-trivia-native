/* eslint-disable */
import React from 'react';
import { View, StyleSheet, Text, Button, AsyncStorage } from 'react-native';
import axios from 'axios';
import DOMParser from 'react-native-html-parser';

class QuestionOver extends React.Component {
  constructor() {
    super()
    this.state = {
      timer: 10,
      score: 0
    }
    this.countdown = this.countdown.bind(this)
    this.onParseHTML = this.onParseHTML.bind(this)
  }

  componentDidMount() {
    let countdownTimer
    this.setState({ timer: 10 })
    this.countdown()
    Promise.all([ AsyncStorage.getItem('score') ])
      .then(([ score ]) => this.setState({ score }))
  }

  componentWillUnmount() {
    clearTimeout(countdownTimer)
  }

  countdown() {
    let { timer } = this.state
    if (timer) {
      this.setState({ timer: timer - 1 })
      countdownTimer = setTimeout(() => this.countdown(), 1000)
    }
    else { this.props.navigation.push('QuestionWaiting') }
  }

  onParseHTML(str) {
    const html = `<div>${str}</div>`
    const parser = new DOMParser.DOMParser()
    const parsed = parser.parseFromString(html, 'text/html')
    return parsed.childNodes[0].childNodes[0].data
  }

  render() {
    const { timer, score } = this.state
    const { answer, question } = this.props.navigation.state.params
    const { onParseHTML } = this
    return (
      <View style={ styles.container }>
        <Text style={[ styles.centerText, styles.h1 ]}>Question X</Text>
        <Text style={[ styles.centerText, styles.copy ]}>{ onParseHTML(question.question) }</Text>
        <Text style={[ styles.centerText, styles.h2 ]}>Correct Answer:</Text>
        <Text style={[ styles.centerText, styles.copy ]}>{ onParseHTML(question.correct_answer) }</Text>
        <Text style={[ styles.centerText, styles.h2 ]}>Your Answer:</Text>
        <Text style={[ styles.centerText, styles.copy ]}>{ answer ? onParseHTML(answer) : 'No answer selected' }</Text>
        <Text style={[ styles.centerText, styles.h2, styles.final ]}>Your Score: {score}</Text>
        <Text style={[ styles.centerText, styles.timer ]}>:{ timer > 9 ? timer : `0${timer}` }</Text>

        {/*<Button title="Next Question" onPress={() => console.log('next')} />*/}
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
  },
  centerText: {
    textAlign: 'center'
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
    paddingBottom: 40
  }
})

export default QuestionOver
