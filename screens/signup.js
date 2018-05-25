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



class SignupScreen extends React.Component {
state = {
  username: null,
  email: null,
  password : null,
  confirmPassword: null,

  usernameError: true,
  emailError: true,
  passwordError : true,
  confirmPasswordError: true,
}

  //  37.785834
  //  0.5 * (screenWidth / screenHeight)
  // Debut navigationOptions
  static navigationOptions = ({navigation}) => {
    const { state, setParams, navigate } = navigation;
    return {
      headerTitle: 'CityArt',
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
      SignUp : this.SignUp
    })
  }

  testChampsRempli =  ( ) => {
    if (this.state.username  == null || this.state.username  == '' ) {
      this.setState({usernameError : false})
    }
    else  {
      this.setState({usernameError : true})
    }
    if (this.state.email  == null || this.state.email  == '' ) {
      this.setState({emailError : false})
    }
    else {
      this.setState({emailError : true})
    }
    if (this.state.password  == null || this.state.password  == '' ) {
      this.setState({passwordError : false})
    }
    else {
      this.setState({passwordError : true})
    }
    if (this.state.confirmPassword  == null || this.state.confirmPassword  == '' ) {
      this.setState({confirmPasswordError : false})
    }
    else {
      this.setState({confirmPasswordError : true})
    }
  }

  SignUp = () => {
    // this.props.navigation.navigate("home" )
    if ((this.state.username  == null || this.state.username  == '' ) || (this.state.email == null || this.state.email  == '') || (this.state.password == null || this.state.password  == '') || ( this.state.confirmPassword == null || this.state.confirmPassword  == '') ) {
      Alert.alert(
              'formulaire Incomplet',
              'Veuillez remplir tout les champs ',
          )
        this.testChampsRempli()

    }
    else if((this.state.password == this.state.confirmPassword) && !((this.state.username  == '') || (this.state.email == '') || (this.state.password == '') || ( this.state.confirmPassword == '') )  ){
      console.log("Vous etes inscrit ")
      this.AddUser()
    }
    else {
      Alert.alert(
              'Les mots de passe ne sont pas similaire ',
              'Veuillez saisir a nouveau votre mot de Passe',
          )
          this.setState({confirmPassword : ""})
          console
          this.testChampsRempli()

    }
  }

  AddUser = () => {
      const user = {
        username : this.state.username ,
        email : this.state.email ,
        password : this.state.password
      }

      console.log("DO a POST");
      fetch('/add-user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization' : `Bearer ${token}`,
      },
      body: JSON.stringify({
        user
      }),
    });
    this.props.navigation.navigate("home" )
  }

    render() {
      return (
        <View style={styles.container}>
        <Text style={styles.header}> ~ SignUp ~ </Text>

        <TextInput
                style={ this.state.usernameError ? styles.TextInputCSS : styles.TextInputCSSFalse }
                onChangeText={(username) => this.setState({username})}
                value={this.state.username}
                placeholder="username "
              />
        <TextInput
                style={ this.state.emailError ? styles.TextInputCSS : styles.TextInputCSSFalse }
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
                placeholder="email@email.com"
              />
        <TextInput
                style={ this.state.passwordError ? styles.TextInputCSS : styles.TextInputCSSFalse }
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                 secureTextEntry={true}
                placeholder="Password"
              />

        <TextInput
                style={ this.state.confirmPasswordError ? styles.TextInputCSS : styles.TextInputCSSFalse }
                onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                value={this.state.confirmPassword}
                 secureTextEntry={true}
                placeholder="Confirm Password"
              />


        <Button
          title="S'inscrire "
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
          onPress={this.SignUp}

        />

        </View>
        )
    }

  }



  export default SignupScreen

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
    TextInputCSSFalse: {
      alignSelf : "stretch",
      backgroundColor: "#f2f2f2",
      height : 40,
      marginVertical : 10 ,
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: '#ff0000',
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
  });
