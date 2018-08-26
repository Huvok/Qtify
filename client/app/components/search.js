import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, ActivityIndicator } from 'react-native';

import { searchSongs } from '../model/spotify';

export default class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isLoading: false,
      songs: []
    };
  }

  searchSong(song) {
    let token = 'BQBeOYJGQHTRjBbgq6oAiOM7rFT8y5UOu8z6MUu3lzKreQNZCw_Gca_SkbytRHzjNxtkKE_HX1CdsCfd39Spmkqyap17YPC8D00xV4qr2XREX1TABuOTywctKWe41j2Ch3VtHs7NLeoY9ZgpWc5CKHNhiJi-FdRdCg2e0qsRDb8BgcAdtw9vfkcBytzJ--2h-IHpRKdje5-mVu96o8K4-cjcsgQYOQ0oMpoy2Ea6BBAtEb6i0dZAZeo0vQj_sBXv8NPNcDSBXmRywWoWHncOsK6Dd9t_j4n6atVo';

    this.setState({
      text: song,
      isLoading: true,
      songs: []
    });

    searchSongs(song, token).then((result) => {
      this.setState({
        text: song,
        isLoading: false,
        songs: result
      });
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
          renderItem={({item}) => <Text>{item.name}, {item.artist}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
        </View>
      );
    }
  }
}
