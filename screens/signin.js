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


import { Icon , Button } from 'react-native-elements'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// 37,785834
// -122,406417

class SigninScreen extends React.Component {
state = {
  login :'',
}

  //  37.785834
  //  0.5 * (screenWidth / screenHeight)
  // Debut navigationOptions
  static navigationOptions = ({navigation}) => {
    const { state, setParams, navigate } = navigation;
    return {
      headerTitle: 'App-Art',
      headerStyle: {
        backgroundColor: '#5C63D8'
      },
      headerTitleStyle: {
        color: '#fff'
      },

    }
  }
  // Fin navigationOptions

  componentDidMount(){

    this.props.navigation.setParams({
      login : this.login
    })
  }

  login = () => {
    console.log("go to Home")
    this.props.navigation.navigate("home" )
  }


    render() {
      return (
        <View style={styles.container}>
        <Text style={styles.header}> ~ Login ~ </Text>
        <TextInput
                style={styles.TextInputCSS}
                /*value={this.state.login}*/
                placeholder="username or email"
              />
        <TextInput
                style={styles.TextInputCSS}
                /*value={this.state.login}*/
                placeholder="Password"
              />

        <Button
          title="Login"
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "#5C63D8",
            width: 300,
            marginTop : 10,
            height: 45,
            borderWidth: 0,
            borderRadius: 5
          }}
          containerStyle={{ marginTop: 20 }}
          onPress={this.login}

        />
        </View>
        )
    }

  }

  export default SigninScreen

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    header: {
      alignItems: 'center',
      fontSize: 35,
      fontWeight : 'bold',
      color: "#000",


    },
    TextInputCSS: {
      alignSelf : "stretch",
      backgroundColor: "#f2f2f2",
      height : 40,
      marginVertical : 10 ,
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: '#d6d7da',
      color : '#000'
    },
    Confirm: {
      alignItems: 'center',
      alignSelf : "stretch",
      backgroundColor: "#fff",
      height : 40,
      marginVertical : 10 ,
      opacity : 1,
    },
    test: {


    },
  });
