import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';

import { searchSongs } from '../model/spotify';
import { sendSong } from '../model/qtify';

import Add from './add';

export default class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isLoading: false,
      songs: [],
      playlist: this.props.navigation.getParam('playlist', '0000'),
      token: this.props.navigation.getParam('token', '')
    };
  }

  searchSong(song) {
    this.setState({
      text: song,
      isLoading: true,
      songs: [],
      playlist: this.state.playlist
    });

    searchSongs(song, this.state.token).then((result) => {
      console.log(result);
      this.setState({
        text: song,
        isLoading: false,
        songs: result,
        playlist: this.state.playlist
      });
    });
  }

  addSongToPlaylist(songId) {
    sendSong(songId, this.state.playlist).then((added) => {
      if(added) {
        let updatePreView = this.props.navigation.getParam('updatePreView', () => {console.log("Default function");});
        updatePreView();
        this.props.navigation.goBack();
      } else {
        console.log('Unable to add a song');
      }
    });
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View style={{flex: 1}}>
          <TextInput
            style={{flex: 1, height: 40, fontSize: 20}}
            value={this.state.text}
            placeholder="Search for a song"
            onChangeText={(text) => this.searchSong(text)}
          />
          <ActivityIndicator style={{flex: 9}} />
        </View>
      );
    } else if(this.state.songs.length == 0) {
      return (
        <View style={{flex: 1}}>
        <TextInput
          style={{flex: 1, height: 40, fontSize: 20}}
          value={this.state.text}
          placeholder="Search for a song"
          onChangeText={(text) => this.searchSong(text)}
        />
        <Text style={{flex: 9}}>There are no results</Text>
        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
        <TextInput
          style={{flex: 1, height: 40, fontSize: 20}}
          value={this.state.text}
          placeholder="Search for a song"
          onChangeText={(text) => this.searchSong(text)}
        />
        <View style={{flex: 9}}>
          <FlatList
            data={this.state.songs}
            renderItem={({item}) =>
              <TouchableOpacity
                onPress={() => this.addSongToPlaylist(item.id)}>
                <Add image={item.img} song={item.name} artist={item.artist}/>
              </TouchableOpacity>
            }
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        </View>
      );
    }
  }
}
