import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  AppRegistry,
  Button,
  AsyncStorage
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import firebase from "react-native-firebase";
import {
  TouchableOpacity,
  FlatList,
  TextInput
} from "react-native-gesture-handler";

export default class SignupTab extends Component {
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
      typedPassword: "",
      newResult: [],
      emails: []
    };

    console.log(firebase.auth());

    this.rootRef = firebase.database().ref();
    console.log(this.rootRef);

    this.userRef = this.rootRef.child("users");
    console.log(this.userRef);

    this.ref = firebase.firestore().collection("emails");
  }

  static navigationOptions = {
    title: "Quick Sign Up"
  };

  onRegister = () => {
    if (this.state.newUserName.trim() === "") {
      alert("User name is blank");
    } else if (this.state.newUserGender.trim() === "") {
      alert("User nickname is blank");
    } else if (this.state.newUserAge.trim() === "") {
      alert("User phone is blank");
    } else if (this.state.newUserEmail.trim() === "") {
      alert("User email is blank");
    } else if (this.state.newUserPassword.trim() === "") {
      alert("User password is blank");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.state.typedEmail,
          this.state.typedPassword
        )
        .then(loggedInUser => {
          this.setState({ user: loggedInUser });
          alert(`Register successfully`);
          this.props.navigation.navigate("Login");
        })
        .catch(error => {
          console.log("error", error);
        });
      this.ref
        .add({
          newEmail: this.state.typedEmail,
          newPassword: this.state.typedPassword,
          newFullName: this.state.newUserName,
          newNickname: this.state.newUserGender,
          newPhone: this.state.newUserAge
        })
        .then(data => {
          console.log(`added data= ${data}`);
          this.setState({
            typedEmail: "",
            typedPassword: "",
            newUserName: "",
            newUserGender: "",
            loading: true
          });
        })
        .catch(error => {
          console.log(`error: ${error}`);
          this.setState({
            typedEmail: "",
            typedPassword: "",
            newUserName: "",
            newUserGender: "",
            loading: true
          });
        });
      this.userRef.push({
        userFullName: this.state.newUserName,
        userNickName: this.state.newUserGender,
        userPhone: this.state.newUserAge,
        userEmail: this.state.newUserEmail,
        userPassword: this.state.newUserPassword
      });
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.containerUp}></View>
        <View style={styles.containerMid}>
          <View style={styles.subContainerMid}>
            <Text style={styles.inputsText}>Your Full Name</Text>
            <TextInput
              style={styles.inputs}
              keyboardType="default"
              placeholder="Enter your full name"
              autoCapitalize="none"
              onChangeText={text => {
                this.setState({
                  newUserName: text
                });
              }}
            />
          </View>
          <View style={styles.subContainerMid}>
            <Text style={styles.inputsText}>Your Nickname</Text>
            <TextInput
              style={styles.inputs}
              keyboardType="default"
              placeholder="Enter your nickname"
              autoCapitalize="none"
              onChangeText={text => {
                this.setState({
                  newUserGender: text
                });
              }}
            ></TextInput>
          </View>
          <View style={styles.subContainerMid}>
            <Text style={styles.inputsText}>Your Phone</Text>
            <TextInput
              style={styles.inputs}
              keyboardType="default"
              placeholder="Enter your phone number"
              autoCapitalize="none"
              onChangeText={text => {
                this.setState({
                  newUserAge: text
                });
              }}
            ></TextInput>
          </View>
          <View style={styles.subContainerMid}>
            <Text style={styles.inputsText}>Your Email</Text>
            <TextInput
              style={styles.inputs}
              keyboardType="email-address"
              placeholder="Enter your email"
              autoCapitalize="none"
              onChangeText={text =>
                this.setState({
                  newUserEmail: text,
                  typedEmail: text
                })
              }
            ></TextInput>
          </View>
          <View style={styles.subContainerMid}>
            <Text style={styles.inputsText}>Your Password</Text>
            <TextInput
              style={styles.inputs}
              keyboardType="default"
              secureTextEntry="true"
              placeholder="Enter your password"
              autoCapitalize="none"
              onChangeText={text => {
                this.setState({
                  newUserPassword: text,
                  typedPassword: text
                });
              }}
            ></TextInput>
          </View>
        </View>
        <View style={styles.containerDown}>
          <Button
            style={styles.btnSignup}
            onPress={this.onRegister}
            title="Register"
          ></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: Platform.OS === "ios" ? 1 : 1
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "400",
    marginTop: 15,
    color: "#3897f1"
  },
  subContainerMid: {
    flexDirection: "column",
    marginLeft: 20,
    marginTop: 40,
    alignItems: "center"
  },
  inputsText: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: -20
  },
  inputs: {
    marginTop: 1,
    borderColor: "black",
    borderWidth: 1,
    width: 250,
    height: 35
  },
  radio: {
    marginTop: 15
  },
  containerDown: {
    alignItems: "center",
    marginTop: 20
  },
  btnSignup: {
    backgroundColor: "#3897f1",
    color: "white",
    fontSize: 15,
    height: 25,
    width: 60,
    textAlign: "center",
    justifyContent: "center"
  },
  dataText: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10
  }
});
