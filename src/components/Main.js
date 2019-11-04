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
      headerTitleStyle: { color: 'white' },
      backgroundColor: "#FF8764"
    },
    headerLeft: null
  };
  render() {
    return (
      <View style={styles.containerl}>
        <StatusBar barStyle="light-content" backgroundColor="#FF8764" />
        <Text style={styles.title}>Digite seu nome:</Text>
        <TextInput
          style={styles.nameInput}
          placeholder={this.state.name}
          onChangeText={text => {
            this.setState({
              name: text
            });
          }}
          value={this.state.name}
        />

        <TouchableOpacity>
          <Text
            style={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate("Friendlist")}
          >
            Lista de Amigos
          </Text>
        </TouchableOpacity>

        <Button
          primary
          title="Sair"
          //style={styles.rightButton}
          onPress={() => {
            firebase
              .auth()
              .signOut()
              .then(
                () => {
                  this.props.navigation.navigate("Login");
                },
                function(error) {
                  // An error happened.
                }
              );
          }}
        >
          Log out
        </Button>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  title: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: 20
  },
  nameInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    margin: 20
  },
  buttonStyle: {
    marginLeft: 20,
    margin: 20
  },
  containerl: {
    flex: 1
  }
});

AppRegistry.registerComponent("Main", () => Main);