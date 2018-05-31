import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom  } from 'react-navigation';
console.disableYellowBox = true ;
import  HomeScreen  from './screens/home';
import  SigninScreen  from './screens/signin';
import  SignupScreen  from './screens/signup';

import  CardScreen  from './screens/card';




const RootStack = StackNavigator(
    {
      signin: {
          screen: SigninScreen,
      },
      card: {
          screen: CardScreen,
      },
      signup: {
          screen: SignupScreen,
      },
      home: {
           screen: HomeScreen,
       },

    },
);

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    )
  }
}
CardScreen
