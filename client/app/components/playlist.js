import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert, Button } from 'react-native';

import { getSongs } from '../model/qtify';
import { getSong } from '../model/spotify';

export default class Playlist extends React.Component {
  constructor(props) {
    super(props);
    let playlistId = this.props.navigation.getParam('playlist', '0000');
    this.state = {isLoading: true, playlist: playlistId};
  }

  componentDidMount() {
    let token = 'BQAy0UPfxjfcOMj8hPC6fT7NcbA1o-VZypNSTm_X1n6736HEzPVjhrNBfL0xTrmjyDgPE4w8ubSt0AQ5r5HT6KWQ9NJj3AC91TIkKp2z45iGHg1jvb1Vcgq8NQ-OZKqSoFcNtbn43EYs0RqnkOVGgoRypkv6TUgU9wkIjTWHlheOUuyQYN7mERrDZNAUlgV2HZGgV5T09XygPCkn857cSS_lo3cpmxZdy7vg2iBRVMLJbOWkGOCxlZCZPqk6qDE8wOaPwlrdPAogTjKzJb0M5Cza487f7UOflTUQ';
    return getSongs(this.state.playlist).then((songsIds) => {
      let promises = [];
      songsIds.forEach((song) => {
        promises.push(getSong(song.song_id, token));
      });

      return Promise.all(promises).then((songs) => {
        this.setState({
          isLoading: false,
          songs: songs,
          playlist: this.state.playlist
        });
      });
    });
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
        <FlatList
          data={this.state.songs}
          renderItem={({item}) =>
            <Text style={{padding: 10}}>{item.artist}, {item.name}, {item.id}</Text>
          }
          keyExtractor={(item, index) => index.toString()}
        />
        <Button
          title="Add song"
          onPress={() => this.props.navigation.navigate('Search', {playlist: this.state.playlist})}
        />
      </View>
    );
  }
}
