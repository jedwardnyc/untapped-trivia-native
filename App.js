/* eslint-disable */
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, StatusBar, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import Info from './native-components/Info';
import Login from './native-components/Login';
import ChooseBar from './native-components/ChooseBar';
import PregameCountdown from './native-components/PregameCountdown';
import PregameStatic from './native-components/PregameStatic';
import TeamName from './native-components/TeamName';
import QuestionActive from './native-components/QuestionActive';
import QuestionOver from './native-components/QuestionOver';
import GameOver from './native-components/GameOver';
import QRScanner from './native-components/QRScan';
import socket from './socket-client';
// window.navigator.userAgent = "react-native";
console.disableYellowBox = true;

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate('Info')}>
          <Text style={ styles.about }>About</Text>
        </TouchableOpacity>
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
      AsyncStorage.removeItem('team'),
      AsyncStorage.removeItem('bar_id'),
      AsyncStorage.removeItem('team_name'),
      AsyncStorage.removeItem('score')
    ])
    .then(() => this.props.navigation.navigate('Login'))
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Image style={ styles.logo } source={require('./images/untapped.png')}/>
        <TouchableOpacity style={ styles.playView } onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={ styles.playButton }>Play now</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7F1F5',
    alignItems: 'center',
    paddingTop: 80
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 35,
    color: '#27476E'
  },
  h2: {
    fontSize: 20,
    paddingBottom: 35
  },
  about: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    paddingLeft: 8,
    paddingRight: 8
  },
  playView: {
    borderRadius: 30,
    width: 160,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#006992',
  },
  playButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
  },
  logo: {
    width: 320,
    height: 120,
    marginBottom: 60,
    marginTop: 100
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
        title: 'Bar ID',
      }
    },
    QRScanner: {
      screen: QRScanner,
      navigationOptions: {
        title: 'QR Scanner',
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
        title: 'Next Game',
        headerLeft: null
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
    GameOver: {
      screen: GameOver,
      navigationOptions: {
        title: 'Game Over',
        headerLeft: null
      }
    },
  },
  {
    initialRouteName: 'Home', // will be set as home at end, changing for easier page testing
    // initialRouteName: 'ChooseBar',
    navigationOptions: {
      headerStyle: { backgroundColor: '#006992' },
      headerTintColor: '#fff'
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
    Info: Info,
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
