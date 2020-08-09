import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import DataList from './DataList';

import {storeData} from '../utils/Method';
import AsyncStorage from '@react-native-community/async-storage';
import {Colors, FontSizes} from '../config/Theme';

export default class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataText: null,
      DataArry: [],
    };
  }
  async componentDidMount() {
    const todoData = await this.getData();
    if (todoData) {
      this.setState({DataArry: todoData});
    }
  }

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('todoData');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  addData = () => {
    const {dataText, DataArry} = this.state;
    if (dataText) {
      var d = new Date();

      const todo = {
        date: d.getFullYear() + '/' + d.getMonth() + '/' + d.getDate(),
        name: dataText,
        isDone: false,
      };
      const updatedArray = [todo, ...DataArry];

      this.setState({
        DataArry: updatedArray,
        dataText: null,
      });
      storeData('todoData', updatedArray);
    }
  };

  deleteNote = (deleteIndex) => {
    const {DataArry} = this.state;
    const updatedData = DataArry.filter((item, index) => {
      return index !== deleteIndex;
    });
    this.setState({
      DataArry: updatedData,
    });
    storeData('todoData', updatedArray);
  };

  checkTodo = (value, idx) => {
    const {DataArry} = this.state;
    const updatedData = DataArry.map((item, index) => {
      if (index === idx) {
        return {
          ...item,
          isDone: value,
        };
      } else {
        return item;
      }
    });
    this.setState({
      DataArry: updatedData,
    });
    storeData('todoData', updatedData);
  };

  renderitems = ({item, index}) => {
    return (
      <DataList
        val={item}
        deletemethod={() => this.deleteNote(index)}
        checkTodo={(val) => this.checkTodo(val, index)}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>ToDoApp</Text>
        </View>
        {/* <ScrollView style={styles.scrollContainer}>{Data}</ScrollView> */}
        <FlatList
          contentContainerStyle={{paddingBottom: 150}}
          data={this.state.DataArry}
          renderItem={this.renderitems}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.footer}>
          <TextInput
            style={styles.textinput}
            placeholder="add list"
            value={this.state.dataText}
            onChangeText={(text) => this.setState({dataText: text})}
            placeholderTextColor="white"
          />
        </View>
        <TouchableOpacity onPress={this.addData} style={styles.addbutton}>
          <Text style={styles.addbuttontext}> +</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    borderBottomWidth: 10,
    borderBottomColor: Colors.FADER_WHITE,
  },
  headerText: {
    color: Colors.WHITE,
    fontSize: FontSizes.MEDIUM,
    padding: 26,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  textinput: {
    alignSelf: 'stretch',
    color: Colors.GREY,
    padding: 20,
    backgroundColor: Colors.BLACK,
    borderTopWidth: 2,
    borderTopColor: Colors.FADE_WHITE,
  },
  addbutton: {
    position: 'absolute',
    zIndex: 2,
    right: 10,
    bottom: 12,
    backgroundColor: Colors.PRIMARY,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },

  addbuttontext: {
    color: '#fff',
    fontSize: FontSizes.X_LARGE,
    right: 2,
  },
});
