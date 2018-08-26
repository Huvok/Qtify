import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Group extends React.Component {
  render() {
    return (
      <View>
        <Text>{this.props.name}</Text>
      </View>
    );
  }
}
