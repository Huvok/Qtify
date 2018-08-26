import React from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

import { createPlaylist } from '../model/qtify';
import { getUserId } from '../model/spotify';

export default class Create extends React.Component {
  addPlaylist() {
    let playlistName = this.state.text;
    let userId = '';
    let token = 'BQBeOYJGQHTRjBbgq6oAiOM7rFT8y5UOu8z6MUu3lzKreQNZCw_Gca_SkbytRHzjNxtkKE_HX1CdsCfd39Spmkqyap17YPC8D00xV4qr2XREX1TABuOTywctKWe41j2Ch3VtHs7NLeoY9ZgpWc5CKHNhiJi-FdRdCg2e0qsRDb8BgcAdtw9vfkcBytzJ--2h-IHpRKdje5-mVu96o8K4-cjcsgQYOQ0oMpoy2Ea6BBAtEb6i0dZAZeo0vQj_sBXv8NPNcDSBXmRywWoWHncOsK6Dd9t_j4n6atVo';
    getUserId(token).then((user) => {
      userId = user;
    });
    createPlaylist(userId, playlistName, token).then((created) => {
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
