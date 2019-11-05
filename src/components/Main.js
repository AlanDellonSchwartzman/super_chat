import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  TextInput,
  TouchableOpacity
} from "react-native";

import firebase from "@react-native-firebase/app";

export default class Main extends Component {
  state = {
    name: ""
  };

  static navigationOptions = {
    headerStyle: {
      tiltle: 'Menu',
      backgroundColor: "#FF8764"
    },
    headerLeft: null,
    headerTitleStyle: { color: 'white' }
  };
  
  
  render() {
    return (
      <View style={styles.containerl}>
        <StatusBar barStyle="light-content" backgroundColor="#FF8764" />
        <Text style={styles.wellcome} >
          <Text style={styles.title}>Bem vindo! </Text> 
          <Text style = {styles.nameUser} >{firebase.auth().currentUser.displayName} </Text>
        </Text>

        <TouchableOpacity>
          <Text
            style={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate("Friendlist")}
          >
            Lista de Amigos
          </Text>
        </TouchableOpacity>

        <View style= {styles.btn}>
          <Button
            primary
            title="Sair"
            color = '#FF512C'
            onPress={() => {
              firebase
                .auth()
                .signOut()
                .then(
                  () => {
                    this.props.navigation.navigate("Login");
                  },
                  function(error) {
                    
                  }
                );
            }}
          />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  title: {
    marginLeft: 20,
    fontSize: 20
  },
  nameUser: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  wellcome: {
    marginTop: 25,
    marginLeft: 15,
    flexDirection: 'row'
  },
  nameInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    margin: 20
  },
  buttonStyle: {
    color: "blue",
    padding: 5,
    margin: 10
  },
  containerl: {
    flex: 1
  },
  btn: {
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    borderColor: '#111111'
  }
});

AppRegistry.registerComponent("Main", () => Main);