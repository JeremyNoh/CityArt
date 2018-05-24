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
import MapView from 'react-native-maps';

import  dataLocation  from '../assets/location.json';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// 37,785834
// -122,406417

class HomeScreen extends React.Component {

  state = {
    locationloaded : false ,
    initialRegion : {
    }

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
    // console.log(dataLocation.data[0].longitude)

    LoadingMapp(){

      const list = dataLocation.data.map(marker => {
        return (
          <MapView.Marker
                 coordinate={{
                   latitude: marker.latittude,
                   longitude: marker.longitude
                 }}
                 pinColor= '#3366ff'
                 title={marker.tags[0].msg}/>
               )
      })


        return (
          <MapView
                  style={styles.mapStyle}
                  initialRegion={this.state.initialRegion}
                  showsUserLocation = "true"
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
         <Text> </Text>
         <Text>Latitude: {this.state.initialRegion.latitude}</Text>
          <Text>Longitude: {this.state.initialRegion.longitude}</Text>
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
      top:50,
      bottom:0,
      position:'absolute',
    }
  });
