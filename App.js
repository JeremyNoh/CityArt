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
      signup: {
          screen: SignupScreen,
      },


      card: {
          screen: CardScreen,
      },
      home: {
           screen: HomeScreen,
       },

    },
);


// const HomeStack = StackNavigator({
//         signin: {
//             screen: SigninScreen,
//         },
//   Home: { screen: HomeScreen },
//   card: {screen: CardScreen,},
// });
//
// const CardScreenStack = StackNavigator({
//   card: {screen: CardScreen},
//   Home: { screen: HomeScreen },
// });
//
// const TabNav =   TabNavigator(
//   {
//     Home: { screen: HomeStack },
//     card: {screen: CardScreenStack,},
//   },
//   {
//     navigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused, tintColor }) => {
//         const { routeName } = navigation.state;
//         let iconName;
//       },
//     }),
//     tabBarComponent: TabBarBottom,
//     tabBarPosition: 'bottom',
//     tabBarOptions: {
//       activeTintColor: 'tomato',
//       inactiveTintColor: 'gray',
//     },
//     animationEnabled: false,
//     swipeEnabled: false,
//   }
// );


// const TabNav = TabNavigator(
//       {
//         home: {
//              screen: HomeScreen,
//          },
//         card: {
//             screen: CardScreen,
//         },
//       },
// );
//
//
// const RootStack = StackNavigator(
//     {
//       signin: {
//           screen: SigninScreen,
//       },
//       TabNav: {
//           screen: TabNav,
//       },
//     },
// );





export default class App extends React.Component {
  render() {
    return (
      <RootStack />


    );
  }
}
CardScreen
