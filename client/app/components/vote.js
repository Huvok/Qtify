import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, AppRegistry, Image, Button, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

import { voteSong } from '../model/qtify';

export default class Vote extends React.Component {
  constructor(props){
    super(props);
    this.state = {voteEnum: 0};
  }

  // Toggle the state depending on the move
  changeState(change) {
    let vote = 0;
    let nextVote = 0;
    if(change == this.state.vote){
      vote = this.state.vote * -1;
      nextVote = 0;
    } else if(this.state.vote == 0) {
      nextVote = change;
      vote = change;
    } else {
      if(change == -1) {
        vote = -2;
      } else {
        vote = 2;
      }
      nextVote = change;
    }

    voteSong(this.props.id, this.props.playlist, vote).then((voted) => {
      if(voted) {
        this.setState({
          vote: nextVote
        });
      }
    });

  }

  getColor(good) {
    if(this.state.vote == 0) return 'black';
    if(this.state.vote > 0) {
      if(good) {
        return 'green';
      }
    }
    if(this.state.vote < 0) {
      if(!good) {
        return 'red';
      }
    }
    return 'black';
  }

  render() {
    return (
      <View style={{flex:1, flexDirection: 'row', height: 60, margin: 5}}>
        <View style={{flex: 1, width: 32}}>
          <Image source={{uri: this.props.image}} style={{flex: 1, width: null, height: null, resizeMode: 'contain'}}/>
        </View>
        <View style={{flex: 3, flexDirection: 'column', margin: 5}}>
          <Text style={{flex: 2, fontSize: 17, paddingTop: 5}}>{this.props.song}</Text>
          <Text style={{flex: 1, color:'#666666'}}>{this.props.artist}</Text>
        </View>
        <View style={{flex: 1, padding: 15, marginTop: 10}}>
          <Icon size={28} name='done' color={this.getColor(true)} onPress={ () => this.changeState(1) }/>
        </View>
        <View style={{flex: 1, padding: 15, marginTop: 10}}>
          <Icon size={28} name='clear' color={this.getColor(false)} onPress={ () => this.changeState(-1) }/>
        </View>
      </View>
    );
  }
}
