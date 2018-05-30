/* eslint-disable */
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import Info from './native-components/Info';
import Login from './native-components/Login';
import ChooseBar from './native-components/ChooseBar';
import PregameCountdown from './native-components/PregameCountdown';
import PregameStatic from './native-components/PregameStatic';
import TeamName from './native-components/TeamName';
import QuestionActive from './native-components/QuestionActive';
import QuestionOver from './native-components/QuestionOver';
import QuestionWaiting from './native-components/QuestionWaiting';
import GameOver from './native-components/GameOver';
import socket from './socket-client'
window.navigator.userAgent = "react-native";

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button title="About" onPress={() => navigation.navigate('Info')} />
      ),
      // headerRight: (
      //   <Button title="Home" onPress={() => navigation.push('Home')} />
      // )
    }
  }

  constructor() {
    super()
    this.onPlay = this.onPlay.bind(this)
  }

  onPlay() {
    Promise.all([
      AsyncStorage.removeItem('user'),
      AsyncStorage.removeItem('bar_id'),
      AsyncStorage.removeItem('team_name'),
      AsyncStorage.removeItem('score')
    ])
    .then(() => this.props.navigation.navigate('Login'))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={ styles.h1 }>UnTapped Trivia</Text>
        <Button onPress={() => this.props.navigation.navigate('Login')} title="Play now" />
        {/*<Text style={ styles.h2 }>Next game starts at 9:00pm</Text>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 80
    // justifyContent: 'center',
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 35
  },
  h2: {
    fontSize: 20,
    paddingBottom: 35
  }
});

// questions and gameplay have to be switch navigator
// not being used right now
// const GameStack = createSwitchNavigator(
//   {
//     QuestionActive: {
//       screen: QuestionActive,
//       navigationOptions: {
//         title: 'Current Question'
//       }
//     },
//     QuestionOver: {
//       screen: QuestionOver,
//       navigationOptions: {
//         title: 'Question Over'
//       }
//     },
//     QuestionWaiting: {
//       screen: QuestionWaiting,
//       navigationOptions: {
//         title: 'Next Question coming soon'
//       }
//     }
//   }, {
//     initialRouteName: 'QuestionActive'
//   }
// )

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Home',
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        title: 'Login',
      }
    },
    ChooseBar: {
      screen: ChooseBar,
      navigationOptions: {
        title: 'Bar ID'
      }
    },
    TeamName: {
      screen: TeamName,
      navigationOptions: {
        title: 'Team Name'
      }
    },
    PregameCountdown: {
      screen: PregameCountdown,
      navigationOptions: {
        title: 'Next Game'
      }
    },
    // GamePlay: GameStack,
    QuestionActive: {
      screen: QuestionActive,
      navigationOptions: {
        title: 'Current Question',
        headerLeft: null
      }
    },
    QuestionOver: {
      screen: QuestionOver,
      navigationOptions: {
        title: 'Correct Answer',
        headerLeft: null
      }
    },
    QuestionWaiting: {
      screen: QuestionWaiting,
      navigationOptions: {
        title: 'Next Question',
        headerLeft: null
      }
    },
    GameOver: {
      screen: GameOver,
      navigationOptions: {
        title: 'Game Over',
        headerLeft: null
      }
    }
  },
  {
    initialRouteName: 'Home', // will be set as home at end, changing for easier page testing
    // initialRouteName: 'Login',
    navigationOptions: {
      headerStyle: { backgroundColor: 'lightblue' }
    }
  }
)

// const TabStack = createBottomTabNavigator({
//   Home: MainStack,
//   // Profile: Profile
// })

const RootStack = createStackNavigator(
  {
    Main: MainStack,
    // GamePlay: GameStack,
    Info: Info
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.socket = socket
  }
  render() { return <RootStack /> }
}
