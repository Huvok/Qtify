import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert, Button } from 'react-native';

import { getSongs } from '../model/qtify';
import { getSong } from '../model/spotify';

import { styles } from '../styles/style';

import token from '../data/token';

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
    this.state = {isLoading: true, playlist: playlistId};
  }

  componentDidMount() {
    return getSongs(this.state.playlist).then((songsIds) => {
      let promises = [];
      console.log(songsIds);
      console.log(this.state.playlist);
      songsIds.forEach((song) => {
        promises.push(getSong(song.song_id, token));
      });

      return Promise.all(promises).then((songs) => {
        console.log(songs);
        this.setState({
          isLoading: false,
          songs: /*songs*/ [{name: 'Hello', artist: 'Adelle', img: 'https://i.scdn.co/image/7afb855c28a2c8ad5ed9d51460736f4022e60bbf'},{name: 'Hello', artist: 'Adelle', img: 'https://i.scdn.co/image/7afb855c28a2c8ad5ed9d51460736f4022e60bbf'}],
          playlist: this.state.playlist
        });
      });
    });
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View style={{flex: 1}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 9}}>
          <FlatList
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
            onPress={() => this.props.navigation.navigate('Search', {playlist: this.state.playlist})}
          />
        </View>
      </View>
    );
  }
}
