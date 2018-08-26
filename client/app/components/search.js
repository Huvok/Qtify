import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, ActivityIndicator, TouchableNativeFeedback } from 'react-native';

import { searchSongs } from '../model/spotify';
import { sendSong } from '../model/qtify';

export default class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isLoading: false,
      songs: [],
      playlist: this.props.navigation.getParam('playlist', '0000')
    };
  }

  searchSong(song) {
    let token = 'BQAy0UPfxjfcOMj8hPC6fT7NcbA1o-VZypNSTm_X1n6736HEzPVjhrNBfL0xTrmjyDgPE4w8ubSt0AQ5r5HT6KWQ9NJj3AC91TIkKp2z45iGHg1jvb1Vcgq8NQ-OZKqSoFcNtbn43EYs0RqnkOVGgoRypkv6TUgU9wkIjTWHlheOUuyQYN7mERrDZNAUlgV2HZGgV5T09XygPCkn857cSS_lo3cpmxZdy7vg2iBRVMLJbOWkGOCxlZCZPqk6qDE8wOaPwlrdPAogTjKzJb0M5Cza487f7UOflTUQ';

    this.setState({
      text: song,
      isLoading: true,
      songs: [],
      playlist: this.state.playlist
    });

    searchSongs(song, token).then((result) => {
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
        this.props.navigation.goBack();
      } else {
        console.log('Unable to add a song');
      }
    });
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View>
          <TextInput
            value={this.state.text}
            placeholder="Search for a song"
            onChangeText={(text) => this.searchSong(text)}
          />
          <ActivityIndicator />
        </View>
      );
    } else if(this.state.songs.length == 0) {
      return (
        <View>
        <TextInput
        value={this.state.text}
        placeholder="Search for a song"
        onChangeText={(text) => this.searchSong(text)}
        />
        <Text>There are no results</Text>
        </View>
      );
    } else {
      return (
        <View>
        <TextInput
        value={this.state.text}
        placeholder="Search for a song"
        onChangeText={(text) => this.searchSong(text)}
        />
        <FlatList
          data={this.state.songs}
          renderItem={({item}) =>
            <TouchableNativeFeedback
            onPress={() => this.addSongToPlaylist(item.id)}>
              <Text style={{padding: 10}}>{item.name}, {item.artist}</Text>
            </TouchableNativeFeedback>
          }
          keyExtractor={(item, index) => index.toString()}
        />
        </View>
      );
    }
  }
}
