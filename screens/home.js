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
  TextInput,
  AsyncStorage
} from "react-native";
import { Icon, Button, ButtonGroup } from "react-native-elements";
import MapView from "react-native-maps";

import PopupDialog, { DialogTitle } from "react-native-popup-dialog";

// import  dataLocation  from '../assets/location.json';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

import SigninScreen from "../screens/signin";
import CardScreen from "../screens/card";

class HomeScreen extends React.Component {
  state = {
    locationloaded: false,
    initialRegion: {},
    user_id: 1,
    onRegionChange: {},
    index: 0
  };

  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    return {
      headerTitle: "City Art",
      headerStyle: {
        backgroundColor: "#8FE2D9"
      },
      headerTitleStyle: {
        color: "#fff"
      },

      headerRight: (
        <View style={{ flexDirection: "row", marginRight: 20 }}>
          <Icon
            name="pencil-square-o"
            type="font-awesome"
            onPress={() => state.params.AddaTagg()}
          />
        </View>
      )
    };
  };
  // Fin navigationOptions

  // stoke le token & l'id dans un state
  async componentWillMount() {
    console.log("componentWillMount");
    try {
      const result = await AsyncStorage.getItem("@User");
      if (result) {
        user = JSON.parse(result);
        console.log(user);
        this.setState({ id: user.id, token: user.token });
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      AddaTagg: this.AddaTagg
    });

    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        var initialRegion = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        };
        this.setState({ initialRegion });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );

    // get marker
    fetch("http://cityart.herokuapp.com/api/tags")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ dataLocation: responseJson, locationloaded: true });
      })
      .catch(error => {
        console.error(error);
      });
    // fin get marker
  }

  //  Ajout Dun tags si il a un token soit connecter il peux sinon il doit se register
  AddaTagg = () => {
    Alert.alert(
      "Ajouter un Tagg",
      "Etes vous sur de vouloir Ajouter un tag",
      [
        { text: "Cancel", valuer: true },

        {
          text: "OK",
          onPress: () => {
            console.log("ajout d'un Tagg");
            if (this.state.token) {
              this.popupDialog.show();
            } else {
              this.GoToRegister();
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  // Aller s'authentifié
  GoToRegister = () => {
    Alert.alert(
      "Veuillez vous Connecter",
      "pour ajouter un tag il faut etre membre",
      [
        { text: "Plus tard", valuer: true },

        {
          text: "Se connecter",
          onPress: () => {
            this.props.navigation.navigate("signin");
          }
        }
      ],
      { cancelable: false }
    );
  };

  updateIndex = index => {
    if (index == 1) {
      // this.setState({index})
      this.props.navigation.navigate("card");
    }
  };

  // Ajoute un tag
  AddTaggPOST = () => {
    console.log("voici le token on est al");
    console.log(this.state.token);
    fetch("https://cityart.herokuapp.com/api/tags/add_tag", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        message: this.state.message,
        longitude: this.state.initialRegion.longitude,
        latitude: this.state.initialRegion.latitude,
        user_id: this.state.id
      })
    })
      .catch(error => {
        console.error("c'est une erreur !!!", error);
      })
      .then(res => Alert.alert("Tag Ajouter ", "Parfait !! le tag est ajouté"));

    this.popupDialog.dismiss();
    this.setState({ message: " " });
  };

  // charge les markeurs
  LoadingMapp() {
    const list = this.state.dataLocation.tags.map((marker, index) => {
      return (
        <MapView.Marker
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude
          }}
          key={index}
          pinColor="#3366ff"
          title={marker.message}
        />
      );
    });

    return (
      <MapView
        style={styles.mapStyle}
        initialRegion={this.state.initialRegion}
        showsUserLocation
        loadingEnabled
        followUserLocation
      >
        {list}
      </MapView>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ButtonGroup
          selectedBackgroundColor="pink"
          onPress={this.updateIndex}
          selectedIndex={this.state.index}
          buttons={["Maps", "Card"]}
          containerStyle={{ height: 30 }}
        />
        <PopupDialog
          dialogTitle={<DialogTitle title="Ajoute ton Tagg" />}
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}
        >
          <View style={styles.container}>
            <TextInput
              style={styles.TextInputCSS}
              onChangeText={message => this.setState({ message })}
              value={this.state.message}
              multiline={true}
              numberOfLines={4}
              placeholder="Fais Preuve d'imagination  "
            />
            <Button
              title="Ajouter "
              buttonStyle={styles.addTaggCSS}
              containerStyle={{ marginTop: 20 }}
              onPress={() => this.AddTaggPOST()}
            />
          </View>
        </PopupDialog>
        {this.state.locationloaded && this.LoadingMapp()}
      </View>
    );
  }
}

// avec du temps et en terme de bonne Pratique j'aurai du exporter certainnes methodes que j'utilise
// dans la classe Home & card pour m'eviter le boublon ...
//  #autoCritique :D

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  mapStyle: {
    left: 0,
    right: 0,
    top: 37,
    bottom: 0,
    position: "absolute"
  },
  addTaggCSS: {
    backgroundColor: "#8FE2D9",
    width: 300,
    marginTop: 30,
    height: 45,
    borderWidth: 0,
    borderRadius: 5
  },
  TextInputCSS: {
    alignSelf: "stretch",
    backgroundColor: "#f2f2f2",
    height: 40,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    color: "#000"
  },
  imageForButtonInfo: {
    width: 40,
    height: 40
  }
});
