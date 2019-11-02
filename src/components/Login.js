import React from "react";
import { 
    StyleSheet, 
    Text, 
    TextInput, 
    View, 
    StatusBar, 
    Button, 
    Image, 
    TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';

export default class Login extends React.Component {
    
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            isAuthenticated: false,
            phone: ''
        };
    }

    static navigationOptions = {
        headerStyle: {
          title: 'Login',
          headerTitleStyle: { color: 'white' },
          backgroundColor: "#FF8764",
          elevation: null
        },
        header: null
      };
    
    onPressLogin = async () => {
        try {
           const user =  await auth().signInWithEmailAndPassword(this.state.email, this.state.password);

           auth().onAuthStateChanged(user => {
                if (user) {
                    this.props.navigation.navigate('Main');
                }
            });

           console.log(user);
          } catch (e) {
            console.error(e.message);
          }

    };

    onChangeTextEmail =  email => this.setState ({email});
    onChangeTextPassword = password => this.setState ({password});

    onPressRegister = async () => {
        this.props.navigation.navigate('Register');
    }

  render () {
    return (
        <View style = {styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#FF8764" />
            <Image
                style={styles.logo}
                source={require('../images/logo.png')}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.nameInput}
                placeholder='Digite seu e-mail'
                onChangeText={this.onChangeTextEmail}
                value={this.state.email}
                returnKeyType="next"
            />
            <Text style={styles.label}>Senha</Text>
            <TextInput
                style={styles.nameInput}
                placeholder='Digite sua senha'
                onChangeText={this.onChangeTextPassword}
                value={this.state.password}
                secureTextEntry={true}
                returnKeyType="go"
            />

            <View style = {styles.button}>
                <Button
                    title="Login"
                    color = '#FF512C'
                    onPress={this.onPressLogin}
                />
            </View>

            <View style = {styles.button}>
                <Button
                    title="Registrar-se"
                    color = '#FF512C'
                    onPress={this.onPressRegister}
                />
            </View>

            { this.state.isAuthenticated ? <Text>Logado com sucesso</Text> : null }

        </View>
    )
  }   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FF8764"
    },
	label: {
		marginTop: 15,
		marginLeft: 15,
		fontSize: 14
	},
	nameInput: {
		width: '80%',
		margin: 15,
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
    logo: {
        width: 170,
        height: 170,
    }
});