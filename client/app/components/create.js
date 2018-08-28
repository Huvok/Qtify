import React from 'react';
import { StyleSheet, View, TextInput, Button, KeyboardAvoidingView, Alert } from 'react-native';

import { createPlaylist } from '../model/qtify';
import { getUserId } from '../model/spotify';


export default class Create extends React.Component {
  static navigationOptions = {
    title: 'New Playlist'
  };

  constructor(props) {
    super(props);
    this.state = {
      token: this.props.navigation.getParam('token', '')
    };
  }

  addPlaylist() {
    let playlistName = this.state.text;
    getUserId(this.state.token).then((user) => {
      console.log(user);
      createPlaylist(user, playlistName, this.state.token).then((created) => {
        if(created) {
          let updatePreView = this.props.navigation.getParam('updatePreView', () => { console.log("Default function"); });
          updatePreView();
          this.props.navigation.goBack();
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
          onChangeText={(text) => this.setState({text, token: this.state.token})}
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
