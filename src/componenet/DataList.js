import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../config/Theme';

export default class DataList extends Component {
  render() {
    const {
      val: {date, name, isDone},
      deletemethod,
      checkTodo,
    } = this.props;
    return (
      <View style={styles.data}>
        <View>
          <CheckBox
            disabled={false}
            value={isDone}
            onValueChange={(newValue) => checkTodo(newValue)}
          />
        </View>
        <View>
          <Text style={styles.textnote}>{date}</Text>
          <Text
            style={[
              styles.textnote,
              {
                textDecorationLine: isDone ? 'line-through' : 'none',
              },
            ]}>
            {name}
          </Text>
        </View>

        <TouchableOpacity onPress={deletemethod} style={styles.deleteicon}>
          <Icon name="delete" size={30} color="#2980b9" />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  data: {
    position: 'relative',
    flexDirection: 'row',
    padding: 10,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: Colors.FADE_WHITE,
  },
  textnote: {
    paddingRight: 20,
  },
  deleteicon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',

    paddingRight: 10,
    right: 10,
    marginTop: 25,
  },

  notedeletetext: {
    color: Colors.WHITE,
  },
});
