import React from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  WebView,
  TextInput,

} from 'react-native';
import { Icon } from 'react-native-elements'

import  HomeScreen  from '../screens/home';
import  SigninScreen  from '../screens/signin';


// 37,785834
// -122,406417

class CardScreen extends React.Component {

  state = {
   };

  //  37.785834
  //  0.5 * (screenWidth / screenHeight)
  // Debut navigationOptions

  static navigationOptions = ({navigation}) => {
    const { state, setParams, navigate } = navigation;
    // const params = state.params || {}; 0066ff

    return {
      headerTitle: 'App-Art',
      headerStyle: {
        backgroundColor: '#5C63D8'
      },

      headerTitleStyle: {
        color: '#fff'
      },
      headerRight: (
        <View style={{ flexDirection: 'row', marginRight: 20 }}>
        // <Icon
        // name='search'
        // type='font-awesome'
        // onPress={() => state.params.search()} />
        // <Icon

        name='pencil-square-o'
        type='font-awesome'
        onPress={() => state.params.AddaTagg()} />
        < /View>
      )
    }
  }

  // Fin navigationOptions

  componentDidMount(){

    this.props.navigation.setParams({
      AddaTagg : this.AddaTagg
    })

  }


    // Debut des methodes de la Class Home
    AddaTagg  = ()  => {
      console.log("dede")
      Alert.alert(
              'Ajouter un Tagg',
              'Etes vous sur de vouloir Ajouter un tag',
              [
                {text: 'Cancel',  valuer : true },

                  {text: 'OK',  onPress: () => {
                    console.log("Ouverture du Modal")
                  }},
              ],
              { cancelable: false }
          )
    };
    // Fin des methodes de la Class Home


    render() {
      return (
        <View style={styles.container}>
         <Text> </Text>
         <Text>Ldedededed</Text>
          <Text>dededede: </Text>

        </View>
      );
    }

  }

  export default CardScreen
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // justifyContent: 'center',
      alignItems: 'center',
    },
    mapStyle: {
      left: 0,
      right: 0,
      top:50,
      bottom:0,
      position:'absolute',
    }
  });
