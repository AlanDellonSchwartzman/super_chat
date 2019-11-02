import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './src/components/Login';
import Chat from './src/components/Chat';
import Register from './src/components/Register';
import Main from './src/components/Main';
import Friendlist from "./src/components/Friendlist";

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, StatusBar } from "react-native";

import firebase from "@react-native-firebase/app";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      page: "connection",
      authenticated: false
    };
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#FF8764",
      elevation: null
    },
    header: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ authenticated: true });
      } else {
        this.setState({ authenticated: false });
      }
    });
  }

  render() {
    if (!this.state.authenticated) {
      return <Login navigation={this.props.navigation} />;
    }
    return <Main navigation={this.props.navigation} />;
  }
}

const App = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Home"
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Login"
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: "Cadastro"
    }
  },
  Main: {
    screen: Main,
    navigationOptions: {
      title: "Main"
    }
  },
  Friendlist: {
    screen: Friendlist,
    navigationOptions: {
      title: "Lista de amigos"
    }
  },
  Chat: {
    screen: Chat,
    navigationOptions: {
      title: "Chat"
    }
  }
});

export default createAppContainer (App);

const styles = StyleSheet.create({});