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
    initialRegion: {} ,
    index: 1,
    distance : 5000,
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


      async componentWillMount(){
        console.log("componentWillMount")
        try {
          const result = await AsyncStorage.getItem('@User')
          if (result) {
            user  = JSON.parse(result) ;
            console.log(user);
            this.setState({ id : user.id , token : user.token });

          }
        } catch (e) {
          console.log(e);
        }
      }

  componentDidMount() {
    this.props.navigation.setParams({
      AddaTagg: this.AddaTagg,
      SwitchView: this.SwitchView
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
            this.state.distance
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

  SwitchView = () => {
    this.setState({distance : 10000000})
    // this.props.navigation.navigate("home");
  };

  updateIndex = (index) => {
    if (index == 0) {
        this.setState({index})
      this.props.navigation.navigate("home");
    }

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
          if(this.state.token){
            this.popupDialog.show();

          }
          else {
            this.GoToRegister();
          }
        }
      }
    ],
    { cancelable: false }
  );
};

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
        Alert.alert("Tag Ajouter ", "Parfait !! le tag est ajouté")
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

      <ButtonGroup
       selectedBackgroundColor="pink"
       onPress={this.updateIndex}
       selectedIndex={this.state.index}
       buttons={['Maps', 'Card']}
       containerStyle={{height: 30}} />

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
  }
});
