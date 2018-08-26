import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class Add extends React.Component {
  render() {
    return (
      <View style={{flex:1, flexDirection: 'row', height: 60, margin: 5}}>
        <View style={{flex: 1, width: 32}}>
          <Image source={{uri: this.props.image}} style={{flex: 1, width: null, height: null, resizeMode: 'contain'}}/>
        </View>
        <View style={{flex: 4, flexDirection: 'column', margin: 5}}>
          <Text style={{flex: 2, fontSize: 17, paddingTop: 5}}>{this.props.song}</Text>
          <Text style={{flex: 1, color:'#666666'}}>{this.props.artist}</Text>
        </View>
      </View>
    );
  }
}
