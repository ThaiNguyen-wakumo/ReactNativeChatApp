import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import firebase from "react-native-firebase";

export default class JoinTab extends Component {
  static navigationOptions = {
    title: "Enter ID"
  };
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      newUserName: "",
      newUserAge: "",
      newUserGender: "",
      newUserEmail: "",
      newUserPassword: "",
      loading: false,
      user: null,
      typedEmail: "",
      typedPassword: "",
      ID: ""
    };
  }

  _toChatRoom = () => {
    if (this.state.ID.trim() === "") {
      alert("ID is blank");
    } else {
      firebase
        .auth()
        .signInAnonymously()
        .then(user => {
          AsyncStorage.setItem("ID", this.state.ID);
          this.props.navigation.navigate("Account");
        })
        .then(() => {
          alert(`Hi ${this.state.ID}`);
        })
        .catch(err => alert(err));
    }
  };

  render() {
    return (
      <View
        style={{
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          padding: 10,
          paddingBottom: 15
        }}
      >
        {/* <Text>ENTER YOUR ID :</Text> */}
        <TextInput
          placeholder=""
          style={{
            borderColor: "#A5A5A5",
            borderWidth: 0.5,
            padding: 8,
            width: "100%",
            marginBottom: 15,
            marginTop: 15
          }}
          onChangeText={text =>
            this.setState({
              ID: text
            })
          }
          value={this.state.ID}
        />
        <TouchableOpacity onPress={() => this._toChatRoom()}>
          <Text style={{ fontWeight: "bold" }}>Join Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
