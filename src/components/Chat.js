import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Button
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

var name, uid, email;

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

    this.user = firebase().currentUser;
    console.log("User:" + this.user.uid);
    
    const { params } = this.props.navigation.state;
    uid = firebase().currentUser.uid;
    name = firebase().currentUser.name;
    email = firebase().currentUser.email;
    console.log("User:" + uid);

    this.chatRef = this.getRef().child("chat/" + this.generateChatId());
    this.chatRefData = this.chatRef.orderByChild("order");
    this.onSend = this.onSend.bind(this);
  }

  //generate ChatId works cause when you are the user sending chat you take user.uid and your friend takes uid
  // when your friend is using the app to send message s/he takes user.uid and you take the uid cause you are the friend 

  generateChatId() {
    if (this.user.uid > uid) return `${this.user.uid}-${uid}`;
    else return `${uid}-${this.user.uid}`;
  }

  getRef() {
    return database().ref();
  }

  listenForItems(chatRef) {
    chatRef.on("value", snap => {
      // get children as an array
      var items = [];
      snap.forEach(child => {
        items.push({
          _id: child.val().createdAt,
          text: child.val().text,
          createdAt: new Date(child.val().createdAt),
          user: {
            _id: child.val().uid
          }
        });
      });

      this.setState({
        loading: false,
        messages: items
      });
    });
  }

  componentDidMount() {
    this.listenForItems(this.chatRefData);
  }

  componentWillUnmount() {
    this.chatRefData.off();
  }

  onSend(messages = []) {
    // this.setState({
    //     messages: GiftedChat.append(this.state.messages, messages),
    // });
    messages.forEach(message => {
      var now = new Date().getTime();
      this.chatRef.push({
        _id: now,
        text: message.text,
        createdAt: now,
        uid: this.user.uid,
        order: -1 * now
      });
    });
  }
  render() {
    return (
      
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend.bind(this)}
          user={{
            _id: this.user.uid
          }}
        />   
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    marginRight: 10,
    marginLeft: 10
  }
});