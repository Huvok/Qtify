import React from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

import { createPlaylist } from '../model/qtify';
import { getUserId } from '../model/spotify';

export default class Create extends React.Component {
  addPlaylist() {
    let playlistName = this.state.text;
    let token = 'BQAy0UPfxjfcOMj8hPC6fT7NcbA1o-VZypNSTm_X1n6736HEzPVjhrNBfL0xTrmjyDgPE4w8ubSt0AQ5r5HT6KWQ9NJj3AC91TIkKp2z45iGHg1jvb1Vcgq8NQ-OZKqSoFcNtbn43EYs0RqnkOVGgoRypkv6TUgU9wkIjTWHlheOUuyQYN7mERrDZNAUlgV2HZGgV5T09XygPCkn857cSS_lo3cpmxZdy7vg2iBRVMLJbOWkGOCxlZCZPqk6qDE8wOaPwlrdPAogTjKzJb0M5Cza487f7UOflTUQ';
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
      <View>
        <TextInput
          placeholder="Type the playlist name"
          onChangeText={(text) => this.setState({text})}
        />
        <Button
          title="Create Playlist"
          onPress={() => this.addPlaylist()}
        />
      </View>
    );
  }
}
