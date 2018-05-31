import React from "react";
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
  TextInput
} from "react-native";

import { Icon, Button } from "react-native-elements";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

// 37,785834
// -122,406417

class SigninScreen extends React.Component {
  state = {
    login: "",
    signUpActive: false,
    email: null,
    password: null
  };

  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    return {
      headerTitle: "City Art",
      headerStyle: {
        backgroundColor: "#5C63D8"
      },
      headerTitleStyle: {
        color: "#fff"
      }
    };
  };
  // Fin navigationOptions

  componentDidMount() {
    this.props.navigation.setParams({
      login: this.login,
      SignUp: this.SignUp
    });
  }

  login = () => {
    this.props.navigation.navigate("home");
  };

  SignUp = () => {
    this.props.navigation.navigate("signup");
  };

  loginUser = () => {
    console.log("DO a POST");
    fetch("https://cityart.herokuapp.com/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        // 'Authorization' : `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .catch(error => {
        console.error("c'est une erreur !!!", error);
      })
      .then(res => {
        console.log(res);
        this.props.navigation.navigate("home");
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}> ~ Login ~ </Text>
        <TextInput
          style={styles.TextInputCSS}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          placeholder=" email"
        />
        <TextInput
          style={styles.TextInputCSS}
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          placeholder="Password"
          type="password"
        />

        <Button
          title="Login"
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "#5C63D8",
            width: 300,
            marginTop: 10,
            height: 45,
            borderWidth: 0,
            borderRadius: 5
          }}
          containerStyle={{ marginTop: 20 }}
          onPress={this.loginUser}
        />

        <Button
          title="SignUp"
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "#adb1eb",
            width: 300,
            marginTop: 10,
            height: 45,
            borderWidth: 0,
            borderRadius: 5
          }}
          containerStyle={{ marginTop: 20 }}
          onPress={this.SignUp}
        />
      </View>
    );
  }
}

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  header: {
    alignItems: "center",
    fontSize: 35,
    fontWeight: "bold",
    color: "#000"
  },
  TextInputCSS: {
    alignSelf: "stretch",
    backgroundColor: "#f2f2f2",
    height: 40,
    marginVertical: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    color: "#000"
  },
  Confirm: {
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "#fff",
    height: 40,
    marginVertical: 10,
    opacity: 1
  }
});
