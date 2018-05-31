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

import HomeScreen from "../screens/home";
import SigninScreen from "../screens/signin";
import PopupDialog, { DialogTitle } from "react-native-popup-dialog";
import geolib from "geolib";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage
} from "react-native-cards";

// 37,785834
// -122,406417

class CardScreen extends React.Component {
  state = {
    locationloaded: false,
    initialRegion: {}
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
        // test

        let DansMaRegion = [];
        for (let tag of responseJson.tags) {
          let tagIsIn = geolib.isPointInCircle(
            {
              latitude: this.state.initialRegion.latitude,
              longitude: this.state.initialRegion.longitude
            },
            { latitude: tag.latitude, longitude: tag.longitude },
            5000
          );
          if (tagIsIn) {
            DansMaRegion.push(tag);
          }
        }
        DansMaRegion.map(
          item =>
            (item.distance = geolib.getDistanceSimple(
              {
                latitude: this.state.initialRegion.latitude,
                longitude: this.state.initialRegion.longitude
              },
              { latitude: item.latitude, longitude: item.longitude }
            ))
        );
        DansMaRegion.sort(function(a, b) {
          return a.distance - b.distance;
        });
        console.log(DansMaRegion);
        this.setState({ DansMaRegion, isReady: true });
      })
      .catch(error => {
        console.error(error);
      });
  }

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
            this.popupDialog.show();
          }
        }
      ],
      { cancelable: false }
    );
  };

  AddTaggPOST = () => {
    fetch("https://cityart.herokuapp.com/api/tags/add_tag", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        // 'Authorization' : `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: this.state.message,
        longitude: this.state.initialRegion.longitude,
        latitude: this.state.initialRegion.latitude,
        user_id: this.state.user_id
      })
    })
      .catch(error => {
        console.error("c'est une erreur !!!", error);
      })
      .then(res =>
        Alert.alert("Tagg Ajouter ", "Parfait !! le tagg est ajouter")
      );

    this.popupDialog.dismiss();
    this.setState({ message: " " });
  };

  isReady() {
    if (this.state.isReady) {
      return (
        <ScrollView>
          {this.state.DansMaRegion.map(item => (
            <Card>
              <CardTitle subtitle={item.distance + " m"} />
              <CardContent text={item.message} />
              <CardAction separator={true} inColumn={false}>
                <CardButton
                  onPress={() => {}}
                  title="Explore"
                  color="#FEB557"
                />
              </CardAction>
            </Card>
          ))}
        </ScrollView>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.isReady()}
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
      </View>
    );
  }
}

export default CardScreen;
const styles = StyleSheet.create({
  mapStyle: {
    left: 0,
    right: 0,
    top: 50,
    bottom: 0,
    position: "absolute"
  },
  addTaggCSS: {
    backgroundColor: "#5C63D8",
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
  }
});
