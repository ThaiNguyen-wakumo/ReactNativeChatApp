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
      mail: ""
    };
    const { navigation } = props;
    this.user = navigation.getParam("user", {});
    this.ref = firebase.firestore().collection("emails");

    const passEmail = this.props.navigation.state.params.email;
    console.log(passEmail);
  }

  componentWillMount() {
    this.ref
      .get({
        email: this.props.navigation.state.params.email
      })
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          if (
            doc.data().newEmail === this.props.navigation.state.params.email
          ) {
            const newResult = [...this.state.newResult];
            newResult.push({
              email: doc.data().newEmail,
              name: doc.data().newFullName,
              nickname: doc.data().newNickname,
              phone: doc.data().newPhone
            });
            this.setState({ newResult });
            console.log(newResult);
          }
        });
      })
      .catch(error => {
        alert(error);
      });
  }

  static navigationOptions = {
    title: "Home",
    headerLeft: null
  };

  onSignout = () => {
    // await AsyncStorage.clear();
    this.props.navigation.navigate("Login");
  };

  toChatRoom = () => {
    this.ref.get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        if (doc.data().newEmail === this.props.navigation.state.params.email) {
          AsyncStorage.setItem("ID", doc.data().newNickname);
          console.log(doc.data().newNickname);
          this.props.navigation.navigate("Chat");
        }
      });
    });
  };

  render() {
    const { newResult } = this.state;
    const data = newResult && newResult.length ? newResult[0] : {};
    return (
      <View style={styles.container}>
        <View style={styles.containerUp}>
          <Text style={styles.fname}>{data.name}</Text>
          <View style={styles.nname}>
            <Text style={styles.nname1}>Nickname:</Text>
            <Text style={styles.nname2}>{data.nickname}</Text>
          </View>
          <View style={styles.contact}>
            <Text style={styles.titleText}>Contact:</Text>
            <View style={styles.email}>
              <Text style={styles.email1}>Email: </Text>
              <Text style={styles.email2}>{data.email}</Text>
            </View>
            <View style={styles.phone}>
              <Text style={styles.phone1}>Phone: </Text>
              <Text style={styles.phone2}>{data.phone}</Text>
            </View>
          </View>
        </View>
        <View style={styles.containerDown}></View>
        <View style={styles.containerBot}>
          {/* <View style={styles.btn}>
            <Button
              style={styles.btnUpdate}
              onPress={() => this.props.navigation.navigate("Update")}
              title="Update"
            ></Button>
          </View> */}
          <View style={styles.btn}>
            <Button
              style={styles.btnSignout}
              onPress={this.onSignout}
              title="Sign Out"
            ></Button>
          </View>
        </View>
        <View style={styles.containerMid}>
          <TouchableOpacity
            style={styles.border}
            onPress={() => this.props.navigation.navigate("Friend")}
          >
            <Text style={styles.titleMid}>Friend List</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.toChatRoom()}>
            <Text style={styles.titleMid}>Chat</Text>
          </TouchableOpacity>
          <FlatList
            data={this.state.newResult}
            renderItem={({ item, index }) => {}}
          ></FlatList>
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
    borderBottomWidth: 1,
    borderBottomColor: "gray"
  },
  titleUp: {
    backgroundColor: "#3897f1",
    width: 320,
    height: 35,
    textAlign: "center",
    fontSize: 20,
    color: "white"
  },
  titleMid: {
    backgroundColor: "#3897f1",
    width: 160,
    textAlign: "center",
    height: 35,
    color: "white",
    fontSize: 18,
    paddingTop: 5
  },
  containerMid: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 182
  },
  border: {
    borderRightWidth: 1,
    borderRightColor: "gray"
  },
  containerDown: {
    marginTop: 20,
    alignItems: "center"
  },
  inputsText: {
    fontSize: 15,
    fontWeight: "bold"
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
  containerBot: {
    // flexDirection: "row",
    marginTop: 72
  },
  btnText: {
    fontSize: 15,
    backgroundColor: "#3897f1",
    height: 20,
    width: 70,
    marginRight: 40,
    marginLeft: 40,
    textAlign: "center",
    color: "white"
  },
  fname: {
    fontWeight: "bold",
    fontSize: 26,
    textAlign: "center",
    marginTop: 20
  },
  nname: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20
  },
  nname1: {
    fontStyle: "italic",
    textDecorationLine: "underline",
    fontWeight: "400"
  },
  nname2: {
    marginLeft: 5
  },
  contact: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    marginTop: 20
  },
  titleText: {
    fontSize: 20,
    marginBottom: 10
  },
  email: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  email1: {
    fontWeight: "400"
  },
  phone: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  phone1: {
    fontWeight: "400"
  }
});
