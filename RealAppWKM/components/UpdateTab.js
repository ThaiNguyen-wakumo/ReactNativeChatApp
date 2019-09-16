import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "react-native-firebase";

export default class UpdateTab extends Component {
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
      newUserID: ""
    };
    this.rootRef = firebase.database().ref();
    console.log(this.rootRef);

    this.userRef = this.rootRef.child("users");
    console.log(this.userRef);
  }

  static navigationOptions = {
    title: "Information"
  };

  onAdd = () => {
    this.userRef.push({
      newUserName: this.state.newUserName,
      newUserID: this.state.newUserID
    });
    this.props.navigation.navigate("Account", {
      name: this.state.newUserName,
      id: this.state.newUserID
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerUp}>
          <Text style={styles.inputsText}>Your Name</Text>
          <TextInput
            style={styles.inputs}
            keyboardType="default"
            autoCapitalize="none"
            title="Your Name"
            onChangeText={text => {
              this.setState({
                newUserName: text
              });
            }}
            value={this.state.newUserName}
          ></TextInput>
          <Text style={styles.inputsText}>Your ID</Text>
          <TextInput
            style={styles.inputs}
            keyboardType="default"
            autoCapitalize="none"
            title="Your Name"
            onChangeText={text => {
              this.setState({
                newUserID: text
              });
            }}
            value={this.state.newUserID}
          ></TextInput>
        </View>
        <View style={styles.containerDown}>
          <Button
            style={styles.btnAdd}
            title="Add"
            onPress={this.onAdd}
          ></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  containerUp: {
    flex: 1,
    textAlign: "center",
    marginTop: 20
  },
  inputs: {
    borderColor: "black",
    borderWidth: 1,
    width: 250,
    height: 35,
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center"
  },
  inputsText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center"
  },
  containerDown: {
    marginBottom: 300
  }
});
