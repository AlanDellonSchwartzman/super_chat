import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  StatusBar,
  FlatList,
  RefreshControl,
  TextInput
} from "react-native";
 
import firebase from "@react-native-firebase/app";

var name, uid, email;
var items = [];

export default class FriendsList extends Component {
  state = {
    name: "",
    uid: null,
    email: ""
  };
  
  constructor(props) {
    super(props);
    this.state = {
      refreshing: true,
      
    };
    this.friendsRef = this.getRef().child("friends");

  }

  getRef() {
    return firebase.database().ref();
  }

  listenForItems(friendsRef) {
    var user = firebase.auth().currentUser;
    
    friendsRef.on("value", snap => {
      // get children as an array
      items = [];
      snap.forEach(child => {
        if (child.val().email != firebase.auth().currentUser.email)
          items.push({
            name: child.val().name,
            uid: child.val().uid,
            email: child.val().email
          });
      });
      
      this.setState({
        refreshing: false
      });
    });

    friendsRef.off('value', this.listenForItems);
  }

  componentDidMount() {
    this.listenForItems(this.friendsRef);
  }

  renderRefreshControl() {
    this.setState({ refreshing: true });
    this.listenForItems(this.friendsRef);
  }

  goLogin() {
    this.props.navigation.navigate('Login');
  }

  static navigationOptions = {
    headerStyle: {
      title: 'friends',
      backgroundColor: "#FF8764",
      elevation: null
    },
    headerTitleStyle: { color: 'white' },
    /*headerRight: (
      <View 
      style = {
        margin = 5,
        padding = 10,
        borderColor = '#111111'
      }>
        <Button 
        title = 'Sair'
        color = '#FF512C'
        onPress={() => {
          firebase
            .auth()
            .signOut();
        }}
        />
      </View>
      ),*/
  };

  renderRow = rowData => {
    return (
      <TouchableOpacity
        onPress={() => {
          name = rowData.name;
          email = rowData.email;
          uid = rowData.uid;
          this.props.navigation.navigate("Chat", {
            name: name,
            email: email,
            uid: uid
          });
        }}
      >
        <View style={styles.profileContainer}>
          <StatusBar barStyle="light-content" backgroundColor="#FF8764" />
          <Text style={styles.profileName}>{rowData.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topGroup}>
          <Text style={styles.myFriends}>Meus amigos</Text>
        </View>

        <FlatList
          data={items}
          renderItem={({item: friend}) => this.renderRow(friend)}
          keyExtractor={(item, index) => item.uid}
          onRefresh={() => this.renderRefreshControl()}
          refreshing={this.state.refreshing}
          initialNumToRender={5}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    marginRight: 10,
    marginLeft: 10
  },
  rightButton: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 10,
    padding: 0
  },
  topGroup: {
    flexDirection: "row",
    margin: 10
  },
  myFriends: {
    flex: 1,
    color: "#3A5BB1",
    fontSize: 16,
    padding: 5
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginLeft: 6,
    marginBottom: 8
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 6
  },
  profileName: {
    marginLeft: 6,
    fontSize: 16
  }
});