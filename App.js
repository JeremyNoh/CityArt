import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {StackNavigator} from 'react-navigation';
console.disableYellowBox = true ;
import  HomeScreen  from './screens/home';
import  SigninScreen  from './screens/signin';




const RootStack = StackNavigator(
    {
      home: {
           screen: HomeScreen,
       },
        signin: {
            screen: SigninScreen,
        },

    },
);


export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}
