import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  Button,
  Image,
  KeyboardAvoidingView,

} from "react-native";

import firebase from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
    };

    /*firebase().onAuthStateChanged(user => {
      if (user) {
        this.getRef()
          .child("friends")
          .push({
            email: user.email,
            uid: user.uid,
            name: this.state.name
          });
        this.props.navigation.navigate("Main");
      }
    });*/
  }

  getRef() {
    return database().ref();
  }

  static navigationOptions = {
    headerStyle: {
      title:'Cadastro',
      backgroundColor: "#FF8764",
      elevation: null,
      headerTitleStyle: { color: 'white' }
    }
  };

  async onRegisterPress() {
    const { email, password, name } = this.state;
    console.log(email);
    console.log(name);
    console.log(password);


    if (this.state.email != "" && this.state.password != "" && this.state.name != ""){
      try {
        const user = await firebase().createUserWithEmailAndPassword(email, password);
        firebase().currentUser.updateProfile({
          displayName: name,
        });

        firebase().onAuthStateChanged(user => {
          if (user) {
              this.props.navigation.navigate('Main');
          }
        });

        firebase().onAuthStateChanged(user => {
          if (user) {
            this.getRef()
              .child("friends")
              .push({
                email: user.email,
                uid: user.uid,
                name: this.state.name
              });
            this.props.navigation.navigate("Main");
          }
        });

      } catch (e) {
        if (e.message.includes("invalid-email")){
          alert("Digite um e-mail válido!")
        }
        else if (e.message.includes("email-already-in-use")){
          alert("E-mail já está em uso!")
        }
        else console.error(e.message);
      }
    } else (alert("Informe todos os dados necessário para cadastro!"))
  }

  render() {
    return (
      <View behavior="padding" style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#FF8764" />
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../images/logo.png')} />
          <Text style={styles.subtext}>Cadastro</Text>
        </View>
        <KeyboardAvoidingView>
          <TextInput
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
            style={styles.input}
            placeholder="Digite seu nome"
            returnKeyType="next"
            onSubmitEditing={() => this.emailInput.focus()}
          />
          <TextInput
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            style={styles.input}
            returnKeyType="next"
            ref={input => (this.emailInput = input)}
            onSubmitEditing={() => this.passwordCInput.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu e-mail"
          />
          <TextInput
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry={true}
            ref={input => (this.passwordCInput = input)}
            onSubmitEditing={() => this.passwordInput.focus()}
            returnKeyType="next"
            secureTextEntry
          />
          <TextInput
            value={this.state.password}
            onChangeText={password_confirmation =>
              this.setState({ password_confirmation })}
            style={styles.input}
            placeholder="Confirme sua senha"
            secureTextEntry={true}
            returnKeyType="go"
            secureTextEntry
            ref={input => (this.passwordInput = input)}
          />
        </KeyboardAvoidingView>
        
        <View style = {styles.button}>
          <Button
              title="Cadastrar-se"
              color = '#FF512C'
              onPress={this.onRegisterPress.bind(this)}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#FF8764",
    padding: 20
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 150
  },
  input: {
    width: 350,
		marginBottom: 15,
		paddingHorizontal: 15,
		borderColor: '#900C3F',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#ffffff",
		fontSize: 15
  },
  button: {
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    borderColor: '#111111',
    width: '40%'
  },
  buttonText: {
    fontSize: 18,
    alignSelf: "center",
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700"
  },
  subtext: {
    color: "#ffffff",
    width: 160,
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 20
  },
  error: {
    margin: 8,
    marginBottom: 0,
    color: "red",
    textAlign: "center"
  }
});