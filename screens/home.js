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
import MapView from 'react-native-maps';

import PopupDialog , { DialogTitle } from 'react-native-popup-dialog';

import  dataLocation  from '../assets/location.json';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

import  SigninScreen  from '../screens/signin';
import  CardScreen  from '../screens/card';

// 37,785834
// -122,406417

class HomeScreen extends React.Component {

  state = {
    locationloaded : false ,
    initialRegion : {
    },
    user_id : 1,

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

    navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            var initialRegion = {
              latitude: parseFloat(position.coords.latitude),
              longitude:parseFloat(position.coords.longitude),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }
            this.setState({initialRegion, locationloaded : true});
          },
          (error) => this.setState({ error: error.message }),
          { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );

  }


    // Debut des methodes de la Class Home
    AddaTagg  = ()  => {
      Alert.alert(
              'Ajouter un Tagg',
              'Etes vous sur de vouloir Ajouter un tag',
              [
                {text: 'Cancel',  valuer : true },

                  {text: 'OK',  onPress: () => {
                    console.log("ajout d'un Tagg")
                    this.popupDialog.show()
                  }},
              ],
              { cancelable: false }
          )
    };

    AddTaggPOST  = ()  => {
      console.log("DO a POST");
      fetch('https://cityart.herokuapp.com/api/tags/add_tag', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization' : `Bearer ${token}`,
      },
      body: JSON.stringify({
        message : this.state.message ,
        longitude : this.state.initialRegion.longitude ,
        latitude : this.state.initialRegion.latitude,
        user_id : this.state.user_id
      })
      })
      .catch(error => {
        console.error("c'est une erreur !!!",error)
      })
      .then(res =>
      // console.log("good ",res.json())
      Alert.alert(
              'Tagg Ajouter ',
              'Parfait !! le tagg est ajouter',
          )
      )

      this.popupDialog.dismiss();
      this.setState({message : ''})
    };




    LoadingMapp(){
      const list = dataLocation.data.map((marker , index )=> {
        return (
          <MapView.Marker
                 coordinate={{
                   latitude: marker.latittude,
                   longitude: marker.longitude
                 }}
                 key = {index}
                 pinColor= '#3366ff'
                 title={marker.tags[0].msg}/>
               )
      })


        return (
          <MapView
                  style={styles.mapStyle}
                  initialRegion={this.state.initialRegion}
                  showsUserLocation
                  loadingEnabled
                  followUserLocation
                  >
                  {list}
            </ MapView>
        )
    }



    render() {
      return (
        <View style={styles.container}>
        <Text>Latitude: {this.state.initialRegion.latitude}</Text>
         <Text>Longitude: {this.state.initialRegion.longitude}</Text>
        <PopupDialog
         dialogTitle={<DialogTitle title="Ajoute ton Tagg" />}
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
        >
          <View style={styles.container}>
          <TextInput
                  style={ styles.TextInputCSS }
                  onChangeText={(message) => this.setState({message})}
                  value={this.state.message}
                  multiline = {true}
                  numberOfLines = {4}
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

  export default HomeScreen
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
      top:0,
      bottom:0,
      position:'absolute',
    },
    addTaggCSS: {
      backgroundColor: "#5C63D8",
      width: 300,
      marginTop : 30,
      height: 45,
      borderWidth: 0,
      borderRadius: 5,
    },
    TextInputCSS: {
      alignSelf : "stretch",
      backgroundColor: "#f2f2f2",
      height : 40,
      marginVertical : 10 ,
      marginHorizontal : 10 ,
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: '#d6d7da',
      color : '#000'
    },

  });
