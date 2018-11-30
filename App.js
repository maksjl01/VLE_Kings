import React from 'react';

import LoginScreen from './Login';
import MainScreen from './MainScreen';
import TasksScreen from './TasksScreen';
import TimetableScreen from './TimetableScreen';
import LessonsScreen from './LessonsScreen';
import LunchScreen from './LunchScreen';
import SportScreen from './SportScreen';
import ReportsScreen from './ReportsScreen';

import { createStackNavigator, createAppContainer  } from 'react-navigation';

import { Text } from 'react-native';

const AppNavigator = createStackNavigator({
  Login: LoginScreen,
  Main: MainScreen,
  Tasks: TasksScreen,
  Timetable: TimetableScreen,
  Music: LessonsScreen,
  Lunch: LunchScreen,
  Sport: SportScreen,
  Reports: ReportsScreen,
});
 
const AppContainer = createAppContainer(AppNavigator);

export default class HomeScreen extends React.Component {
  render() {
    return <AppContainer/>;
    // return(
    //   <LoginScreen/>
    // )
  }
}

