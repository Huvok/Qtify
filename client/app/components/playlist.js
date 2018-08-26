import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert, Button, RefreshControl } from 'react-native';

import { getSongs } from '../model/qtify';
import { getSong } from '../model/spotify';

import { styles } from '../styles/style';

import Vote from './vote';

export default class Playlist extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name', 'Playlist'),
    };
  };

  constructor(props) {
    super(props);
    let playlistId = this.props.navigation.getParam('playlist', '0000');
    let token = this.props.navigation.getParam('token', '');
    this.state = {isLoading: true, playlist: playlistId, token: token};
  }

  componentDidMount() {
    return this.load();
  }

  load() {
    return getSongs(this.state.playlist).then((songsIds) => {
      let promises = [];
      console.log(songsIds);
      console.log(this.state.playlist);
      songsIds.forEach((song) => {
        promises.push(getSong(song.song_id, this.state.token));
      });

      return Promise.all(promises).then((songs) => {
        console.log(songs);
        this.setState({
          isLoading: false,
          songs: songs, // [{name: 'Hello', artist: 'Adelle', img: 'https://i.scdn.co/image/7afb855c28a2c8ad5ed9d51460736f4022e60bbf'},{name: 'Hello', artist: 'Adelle', img: 'https://i.scdn.co/image/7afb855c28a2c8ad5ed9d51460736f4022e60bbf'}],
          playlist: this.state.playlist,
          token: this.state.token
        });
      });
    });
  }

  refresh() {
    this.setState({isLoading: true, playlist: this.state.playlist, token: this.state.token});
    this.load();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 9}}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.isLoading}
                onRefresh={() => this.refresh()}
              />
            }
            data={this.state.songs}
            renderItem={({item}) =>
              <Vote image={item.img} artist={item.artist} song={item.name} id={item.id} playlist={this.state.playlist}/>
            }
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={{flex: 1}}>
          <Button
            color='#1db954'
            title="Add song"
            onPress={() => this.props.navigation.navigate('Search', {playlist: this.state.playlist, updatePreView: this.refresh.bind(this), token: this.state.token})}
          />
        </View>
      </View>
    );
  }
}
