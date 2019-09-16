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

export default class FriendAccountTab extends Component {
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
      typedPassword: "",
      emails: [],
      newResult: []
    };
    this.ref = firebase.firestore().collection("emails");
    const { navigation } = props;
    this.user = navigation.getParam("user", {});
  }

  // componentWillMount() {
  //   this.ref
  //     // .where("emails", "==", this.user.id)
  //     .get({
  //       id: this.user.id,
  //       email: this.user.email
  //     })
  //     .then(snapshot => {
  //       snapshot.docs.forEach(doc => {
  //         const newResult = [...this.state.newResult];
  //         newResult.push({
  //           // id: this.user.id,
  //           email: this.user.email
  //         });
  //         this.setState({ newResult });
  //       });
  //     })
  //     .catch(error => {
  //       alert(error);
  //     });
  // }

  static navigationOptions = {
    title: "Friend Account"
  };

  toChat = () => {
    AsyncStorage.setItem("id", this.user.nickname);
    this.props.navigation.navigate("PersonalChat");
  };

  render() {
    return (
      <View>
        <Text style={styles.fname}>{this.user.fullname}</Text>
        <View style={styles.nname}>
          <Text style={styles.nname1}>Nickname:</Text>
          <Text style={styles.nname2}>{this.user.nickname}</Text>
        </View>
        <View style={styles.contact}>
          <Text style={styles.titleText}>Contact:</Text>
          <View style={styles.email}>
            <Text style={styles.email1}>Email: </Text>
            <Text style={styles.email2}>{this.user.email}</Text>
          </View>
          <View style={styles.phone}>
            <Text style={styles.phone1}>Phone: </Text>
            <Text style={styles.phone2}>{this.user.phonenumber}</Text>
          </View>
        </View>
        {/* <FlatList
          style={styles.dataList}
          data={this.state.newResult}
          renderItem={({ item, index }) => {
            return <Text styles={styles.dataText}>{item.email}</Text>;
          }}
        ></FlatList> */}
        {/* <Button
          style={styles.btnSend}
          title="Send message"
          onPress={() => this.toChat()}
        ></Button> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  },
  btnSend: {
    textAlign: "center",
    backgroundColor: "#3897f1",
    height: 30,
    color: "white",
    fontWeight: "bold",
    textAlignVertical: "center",
    padding: 6,
    marginTop: 100
  }
});
