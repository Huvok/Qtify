import React from 'react';
import { StyleSheet, View, TextInput, Button, KeyboardAvoidingView } from 'react-native';

import { createPlaylist } from '../model/qtify';
import { getUserId } from '../model/spotify';

import token from '../data/token';

export default class Create extends React.Component {
  static navigationOptions = {
    title: 'New Playlist'
  };
  addPlaylist() {
    let playlistName = this.state.text;
    getUserId(token).then((user) => {
      console.log(user);
      createPlaylist(user, playlistName, token).then((created) => {
        if(created) {
          this.props.navigation.navigate('Main');
        } else {
          Alert.alert(
            'Error',
            'Unable to create the playlist',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Try Again', onPress: () => this.addPlaylist()},
            ],
            { cancelable: false });
        }
      });
    });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled style={{flex: 1}}>
        <TextInput
          style={{height: 40, fontSize: 20}}
          placeholder="Type the playlist name"
          onChangeText={(text) => this.setState({text})}
          autoFocus
        />
        <View>
          <Button
          color='#1db954'
          title="Create Playlist"
          onPress={() => this.addPlaylist()}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}
