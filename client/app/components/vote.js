import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, AppRegistry, Image, Button, Alert } from 'react-native';
import { Icon } from 'react-native-elements'

class VotesHeader extends Component {
  render(){
    return (
      // Icon and title 
      <View style={ {flexDirection: 'row', padding: 20} }>
        <Icon name='chevron-left' color='green' size={50}/>
        <Text style={ {flex: 6, textAlign: 'center', fontSize: 30} }>Suggested Songs</Text>
      </View>
    );
  }
}

class SongDescription extends Component {
  render(){
    let bgColor = this.props.bgColor;
    return(
      <View style={{flex: 4, backgroundColor: bgColor, paddingLeft: 20}}>
        <Text style={{fontSize: 20}}>{this.props.artist}</Text>
        <Text style={{fontSize: 25}}>{this.props.song}</Text>
      </View>
    );
  }
}

class Vote extends React.Component {
  constructor(props){
    super(props);
    this.state = {voteEnum: 0, bgColor: 'white'};
  }

  // Toggle the state depending on the move
  changeState(change) {
    if(change == this.state.voteEnum){
      this.setState({
        voteEnum: 0,
        bgColor: 'white'
      });
    }
    else{
      this.setState({
        voteEnum: change,
        bgColor: (change == 1) ? 'green' : 'red'
      });
    }
  }

  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <View style={{flexDirection: 'row'}}>
        <Image source={pic} style={{width: 150, height: 150, flex: 3}}/>
        <SongDescription artist={this.props.artist} song={this.props.song} bgColor={this.state.bgColor}/>
        <Icon name='check-circle' color='green' size={70} onPress={ () => this.changeState(1) }/>
        <Icon name='cancel' color='red' size={70} onPress={ () => this.changeState(-1) }/>
      </View>
    );
  }
}
