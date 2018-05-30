/* eslint-disable */
import React from 'react';
import { View, StyleSheet, Text, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import axios from 'axios';
import DOMParser from 'react-native-html-parser';
import socket from '../socket-client'
window.navigator.userAgent = "react-native";

class QuestionActive extends React.Component {
  constructor() {
    super()
    this.state = {
      answer: '',
      timer: 5,
      question: {},
      score: 0,
      team: ''
    }
    this.countdown = this.countdown.bind(this)
    this.onChooseAnswer = this.onChooseAnswer.bind(this)
    this.onParseHTML = this.onParseHTML.bind(this)
  }

  componentDidMount() {
    let countdownTimer
    socket.emit('request question')
    socket.on('send question', (question) => this.setState({ question: question.results[0]}))
    this.countdown()
    // axios.get('http://localhost:3000/v1/api/')
    //   .then( res => res.data)
    //   .then( question => this.setState({ question: question.results[0] }))
    Promise.all([
      AsyncStorage.getItem('score'),
      AsyncStorage.getItem('team_name')
      ])
      .then(([ score, team ]) => this.setState({ score, team }))
  }

  componentWillUnmount() {
    clearTimeout(countdownTimer)
  }

  countdown() {
    let { timer, question, answer } = this.state
    if (timer) {
      this.setState({ timer: timer - 1 })
      countdownTimer = setTimeout(() => this.countdown(), 1000)
    }
    else { this.props.navigation.push('QuestionOver', { question, answer }) }
  }

  onChooseAnswer(answer) {
    const { question, team } = this.state
    this.setState({ answer })
    socket.emit('answer', { answer, team })
    if (answer === question.correct_answer) {
      Promise.all([AsyncStorage.getItem('score')])
        .then(([ score ]) => {
          newScore = (score * 1) + 1
          AsyncStorage.setItem('score', `${newScore}`)
        })
    }
  }

  onParseHTML(str) {
    const html = `<div>${str}</div>`
    const parser = new DOMParser.DOMParser()
    const parsed = parser.parseFromString(html, 'text/html')
    return parsed.childNodes[0].childNodes[0].data
  }

  render() {
    const { timer, answer, question, score } = this.state
    const { onChooseAnswer, onParseHTML } = this
    if (!question.type) return null
    return (
      <View style={ styles.container }>
        <View style={ styles.topRow }>
          <Text style={{ color: '#27476E' }}>Top Score: XX</Text>
          <Text style={{ color: '#27476E' }}>Your Score: {score ? score : 0}</Text>
        </View>
        <View style={ styles.questionInfo }>
          <Text style={ [ styles.centerText, styles.questionHeader ]}>Question X</Text>
          <Text style={[styles.centerText, styles.timer, { color: timer < 10 ? '#B81365' : '#27476E' } ]}>:{ timer > 9 ? timer : `0${timer}` }</Text>
          <Text style={ [ styles.centerText, styles.questionText ]}>{ onParseHTML(question.question) }</Text>
          {
            answer &&
            <Text style={ [ styles.centerText, styles.selectedAnswer ]}>Your Answer: { onParseHTML(answer) }</Text>
          }
        </View>
        <View style={ styles.answers }>
          <TouchableOpacity
            style={styles.answerView}
            disabled={!timer || !!answer}
            onPress={() => onChooseAnswer(question.correct_answer)}
          >
            <Text style={styles.answerButton}>{`${onParseHTML(question.correct_answer)}`}</Text>
          </TouchableOpacity>
          {
            question.incorrect_answers.map((a, idx) => (
              <TouchableOpacity
                style={ styles.answerView }
                key={idx}
                disabled={!timer || !!answer}
                onPress={() => onChooseAnswer(a)}
              >
                <Text style={styles.answerButton}>{`${onParseHTML(a)}`}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // // alignItems: 'center'
    // justifyContent: 'center'
  },
  topRow: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  questionInfo: {
    flex: 3,
    alignItems: 'center',
    padding: 20,
    paddingTop: 0
  },
  questionHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10,
    paddingTop: 0,
    color: '#27476E',
  },
  timer: {
    fontSize: 35,
    fontWeight: 'bold',
    padding: 10,
    color: '#27476E'
  },
  questionText: {
    fontSize: 18,
    padding: 10,
    color: '#27476E'
  },
  answers: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    padding: 10,
    // maxHeight: 60%,
  },
  centerText: {
    textAlign: 'center'
  },
  selectedAnswer: {
    fontWeight: 'bold',
    padding: 10,
    fontSize: 18,
    color: '#ECA400',
  },
  answerView: {
    borderRadius: 30,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#006992',
  },
  answerButton: {
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

export default QuestionActive;
