/* eslint-disable */
import React from 'react';
import { View, StyleSheet, Text, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import axios from 'axios';
import he from 'he';
import socket from '../socket-client';
window.navigator.userAgent = "react-native";

class QuestionActive extends React.Component {
  constructor() {
    super()
    this.state = {
      answer: '',
      timer: 10,
      question: {},
      score: 0,
      team: '',
      questionNumber: 0
    }
    this.onChooseAnswer = this.onChooseAnswer.bind(this)
    this.onParseHTML = this.onParseHTML.bind(this)
  }

  componentDidMount() {
    socket.once('sending question', ({ index, question }) => {
      this.setState({ question, questionNumber: index + 1, answer: '' })
    })
    socket.once('waiting for next question', () => {
      this.props.navigation.push('QuestionOver', {
        question: this.state.question,
        answer: this.state.answer,
        questionNumber: this.state.questionNumber
      })
    })
    socket.on('question timer', (timer) => this.setState({ timer }))
    Promise.all([
      AsyncStorage.getItem('score'),
      AsyncStorage.getItem('team_name')
    ]).then(([ score, team ]) => this.setState({ score, team }))
  }

  componentWillUnmount() {
    socket.off('question timer')
  }

  onChooseAnswer(answer) {
    const { question, team, score } = this.state
    this.setState({ answer })
    socket.emit('answer', { answer, team, score })
    if (answer === question.correct_answer) {
      Promise.all([AsyncStorage.getItem('score')])
        .then(([ score ]) => {
          newScore = (score * 1) + 1
          AsyncStorage.setItem('score', `${newScore}`)
        })
    }
  }

  onParseHTML(str) {
    return he.decode(`${str}`)
  }

  render() {
    const { timer, answer, question, score, questionNumber } = this.state
    const { onChooseAnswer, onParseHTML } = this
    const noClick = !timer || !!answer
    if (!question.question) return null
    return (
      <View style={ styles.container }>
        <View style={ styles.topRow }>
          <Text style={{ color: '#27476E' }}>Top Score: XX</Text>
          <Text style={{ color: '#27476E' }}>Your Score: {score ? score : 0}</Text>
        </View>
        <View style={ styles.questionInfo }>
          <Text style={ [ styles.centerText, styles.questionHeader ]}>Question { questionNumber }</Text>
          <Text style={[styles.centerText, styles.timer, { color: timer < 4 ? '#B81365' : '#27476E' } ]}>:{ timer > 9 ? timer : `0${timer}` }</Text>
          <Text style={ [ styles.centerText, styles.questionText ]}>{ onParseHTML(question.question) }</Text>
          {
            answer &&
            <Text style={ [ styles.centerText, styles.selectedAnswer ]}>Your Answer: { onParseHTML(answer) }</Text>
          }
        </View>
        <View style={ styles.answers }>
          {
            question.answers.map((a, idx) => (
              <TouchableOpacity
                style={[styles.answerView, { backgroundColor: noClick? '#4591AF' : '#006992' }]}
                key={idx}
                disabled={ noClick }
                onPress={() => onChooseAnswer(a)}>
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
    backgroundColor: '#E7F1F5',
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
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
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
    flex: 5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    paddingRight: 10,
    paddingLeft: 10
  },
  centerText: {
    textAlign: 'center'
  },
  selectedAnswer: {
    fontWeight: 'bold',
    padding: 10,
    fontSize: 18,
    color: '#E56E00',
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
