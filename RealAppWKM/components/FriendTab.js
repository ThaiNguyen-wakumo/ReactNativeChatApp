import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import firebase from "react-native-firebase";

export default class FriendTab extends Component {
  constructor(props) {
    super(props);
    this.unsubscriber = null;
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
      results: [],
      newResult: [],
      typedPassword: "",
      emails: []
    };
    this.ref = firebase.firestore().collection("emails");
  }
  static navigationOptions = {
    title: "Friends"
  };

  onCheck = item => {
    this.props.navigation.navigate("FriendAccount", {
      user: item
    });
  };

  showResult = doc => {
    if (doc.data().newEmail === this.state.typedEmail) {
      const results = [];
      results.push({
        id: doc.id,
        password: doc.data().newPassword,
        email: doc.data().newEmail,
        fullname: doc.data().newFullName,
        nickname: doc.data().newNickname,
        phonenumber: doc.data().newPhone
      });
      this.setState({ results });
    }
  };

  onFind = () => {
    if (this.state.typedEmail.trim() === "") {
      alert("Enter email first");
    } else {
      this.ref
        .get({
          email: this.state.typedEmail
        })
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            this.showResult(doc);
          });
        })
        .catch(error => {
          alert(error);
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerUp}>
          <TextInput
            style={styles.inputs}
            placeholder="Enter email"
            keyboardType="default"
            autoCapitalize="none"
            onChangeText={text =>
              this.setState({
                typedEmail: text
              })
            }
            value={this.state.typedEmail}
          ></TextInput>
          <Button
            style={styles.btnFind}
            title="Find"
            onPress={this.onFind}
          ></Button>
        </View>
        <View style={styles.containerDown}>
          <FlatList
            style={styles.dataList}
            data={this.state.results}
            renderItem={({ item, index }) => {
              // console.log(item, index);
              return (
                <TouchableOpacity
                  style={styles.dataBtn}
                  onPress={() => this.onCheck(item)}
                >
                  <Text style={styles.dataText}>{item.email}</Text>
                </TouchableOpacity>
              );
            }}
          ></FlatList>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerUp: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
    paddingBottom: 15
  },
  inputs: {
    borderColor: "#A5A5A5",
    borderWidth: 0.5,
    padding: 8,
    width: "85%",
    marginTop: 5,
    textAlign: "center"
  },
  btnFind: {
    width: "15%"
  },
  dataText: {
    textAlign: "center",
    backgroundColor: "#3897f1",
    height: 30,
    color: "white",
    fontWeight: "bold",
    textAlignVertical: "center",
    padding: 6,
    margin: 5
  }
});
