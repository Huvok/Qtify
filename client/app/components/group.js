import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Group extends React.Component {
  render() {
    return (
      <View style={{padding: 10}}>
        <Text style={{fontSize: 16}}>{this.props.name}</Text>
      </View>
    );
  }
}
