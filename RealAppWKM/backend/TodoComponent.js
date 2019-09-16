import React, { Component } from "react";
import {
  AppRegistry,
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  Platform,
  TouchableHighlight,
  TextInput,
  Button
} from "react-native";
import firebase from "react-native-firebase";

export default class TodoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoTasks: [],
      newTaskName: "",
      loading: false
    };
    this.ref = firebase.firestore().collection("todoTasks");
  }

  componentDidMount() {
    this.unsubcribe = this.ref.onSnapshot(querySnapShot => {
      const todos = [];
      querySnapShot.forEach(doc => {
        todos.push({
          taskName: doc.data().taskName
        });
      });
      this.setState({
        todoTasks: todos.sort((a, b) => {
          return a.taskName > b.taskName;
        }),
        loading: false
      });
    });
  }

  componentWillMount() {
    this.ref.get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        console.log(doc.data());
      });
    });
  }

  onPressAdd = () => {
    this.ref
      .add({
        taskName: this.state.newTaskName
      })
      .then(data => {
        console.log(`added data= ${data}`);
        this.setState({
          newTaskName: "",
          loading: true
        });
      })
      .catch(error => {
        console.log(`error adding Firestore document = ${error}`);
        this.setState({
          newTaskName: "",
          loading: true
        });
      });
  };

  onPressGet = () => {
    this.ref
      .get({
        task: this.state.newTaskName
      })
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          if (doc.data().taskName === this.state.newTaskName) {
            console.log(doc.data().taskName);
            // <FlatList/>
          }
        });
        // .then(() => {
        //   console.log(`get data = ${data}`);
      })
      .catch(error => {
        console.log(`error = ${error}`);
      });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          marginTop: Platform.OS === "ios" ? 34 : 0
        }}
      >
        <View
          style={{
            backgroundColor: "tomato",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            height: 64
          }}
        >
          <TextInput
            style={{
              height: 40,
              width: 200,
              margin: 10,
              padding: 10,
              borderColor: "white",
              borderWidth: 1,
              color: "white"
            }}
            keyboardType="default"
            placeholderTextColor="white"
            placeholder="Enter task name"
            autoCapitalize="none"
            onChangeText={text => {
              this.setState({
                newTaskName: text
              });
            }}
          ></TextInput>
          <Button
            style={{
              marginRight: 10
            }}
            onPress={this.onPressAdd}
            title="Add"
          ></Button>
        </View>
        <Button
          style={{
            marginRight: 10
          }}
          onPress={this.onPressGet}
          title="Get"
        ></Button>

        <FlatList
          data={this.state.todoTasks}
          renderItem={({ item }) => {
            return <Text>{item.taskName}</Text>;
          }}
          keyExtractor={item => item.taskName}
        ></FlatList>

        <FlatList
          data={this.state.todoTasks}
          renderItem={({ item }) => {
            console.log(item);
            return <Text style={{ color: "black" }}>{item.task}</Text>;
          }}
          keyExtractor={item => item.task}
        ></FlatList>
      </View>
    );
  }
}
