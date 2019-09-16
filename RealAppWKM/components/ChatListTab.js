import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  AsyncStorage,
  Button
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  TouchableOpacity,
  FlatList,
  ScrollView
} from "react-native-gesture-handler";
import firebase from "react-native-firebase";
import { navigate } from "react-navigation";

export default class AccountTab extends Component {
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
      results: [],
      typedPassword: "",
      emails: [],
      newResult: [],
      lists: [],
      mail: ""
    };
    this.ref = firebase.firestore().collection("emails");
  }

  static navigationOptions = {
    title: "Chat List"
  };

  componentWillMount() {
    this.ref
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          const lists = [...this.state.lists];
          lists.push({
            listMail: doc.data().newEmail
          });
          this.setState({ lists });
          console.log(lists);
        });
      })
      .catch(error => alert(error));
  }

  onCheck = item => {
    this.props.navigation.navigate("Mess");
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.dataList}
          data={this.state.lists}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.dataBtn}
                onPress={() => this.onCheck(item)}
              >
                <Text style={styles.dataText}>{item.listMail}</Text>
              </TouchableOpacity>
            );
          }}
        ></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10
  },
  dataBtn: {
    height: 50,
    backgroundColor: "gray",
    marginTop: 5
  },
  dataText: {
    marginTop: 18,
    marginLeft: 5
  }
});
