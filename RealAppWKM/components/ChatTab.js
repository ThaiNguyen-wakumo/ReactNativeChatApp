import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  AsyncStorage,
  TextInput
} from "react-native";
import { ChatLineHolder } from "./ChatLineHolder";
import firebase from "react-native-firebase";

export default class ChatTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatData: [],
      chatInputContent: "",
      username: ""
    };
  }
  static navigationOptions = {
    title: "Chat Room"
  };

  async componentDidMount() {
    let username = await AsyncStorage.getItem("ID");
    this.setState({ username });
    firebase
      .database()
      .ref("/chatRoom")

      .on("value", snapshot => {
        if (snapshot.val() !== undefined && snapshot.val() !== null) {
          console.log("==> data", Object.values(snapshot.val()));
          console.log("==> data", snapshot.val());
          const chatData = [];
          snapshot.forEach(element => {
            chatData.push(element.val());
          });
          this.setState({
            chatData
          });
        }
      });
  }

  _sendMessage = () => {
    firebase
      .database()
      .ref("/chatRoom")
      .push({
        userName: this.state.username,
        chatContent: this.state.chatInputContent,
        createdAt: new Date().getTime()
      });
    this.setState({
      chatInputContent: ""
    });
  };
  _onChangeChatInput = text => {
    this.setState({
      chatInputContent: text
    });
  };
  _renderChatLine = item => {
    if (item.userName === this.state.username) {
      return (
        <View style={{ alignItems: "flex-end" }}>
          <ChatLineHolder sender="You" chatContent={item.chatContent} />
        </View>
      );
    }
    return (
      <ChatLineHolder sender={item.userName} chatContent={item.chatContent} />
    );
  };
  render() {
    return (
      <View
        style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end" }}
      >
        <ImageBackground
          imageStyle={{ opacity: 0.4 }}
          source={require("../Image/bg.jpeg")}
          style={{
            flex: 9 / 10,
            backgroundColor: "#A5A5A5",
            flexDirection: "column",
            justifyContent: "flex-end"
          }}
        >
          <FlatList
            ref={ref => (this.flatlist = ref)}
            data={this.state.chatData}
            renderItem={({ item }, index) => this._renderChatLine(item)}
            onContentSizeChange={() => this.flatlist.scrollToEnd()}
          />
        </ImageBackground>
        <View style={{ flex: 1 / 10 }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#FFF",
              width: "100%",
              height: "100%",
              justifyContent: "space-around",
              alignItems: "center",
              marginLeft: 2
            }}
          >
            <View style={{ flex: 8 / 10 }}>
              <TextInput
                placeholder="Enter content"
                value={this.state.chatInputContent}
                onChangeText={text => this._onChangeChatInput(text)}
                style={{ height: 100, fontSize: 18 }}
              />
            </View>
            <View style={{ flex: 2 / 10 }}>
              <TouchableOpacity onPress={() => this._sendMessage()}>
                <Text
                  style={{ color: "#0099ff", fontSize: 14, marginRight: 15 }}
                >
                  Send
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
