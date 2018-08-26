import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert, Button, TouchableOpacity } from 'react-native';

import { getPlaylists } from '../model/qtify';

import Group from './group';

export default class Main extends React.Component {
  static navigationOptions = {
    title: 'Qtify'
  };

  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  goToPlaylist(playlist) {
    this.props.navigation.navigate('Playlist', {playlist: playlist.id, name: playlist.group_name});
  }

  componentDidMount() {
    return getPlaylists().then((playlists) => {
      this.setState({
        isLoading: false,
        playlists: playlists
      });
    }).catch((error) => {
      this.setState({
        isLoading: false,
        playlists: []
      });
      Alert.alert('Error', 'Unable to load playlists', [{text: 'OK', onPress: () => console.log('OK Pressed')}], { cancelable: false });
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
      <View style={{flex: 1}}>
        <View style={{flex: 9}}>
          <FlatList
            data={this.state.playlists}
            renderItem={({item}) =>
              <TouchableOpacity
                onPress={() => this.goToPlaylist(item)}>
                <Group name={item.group_name}/>
              </TouchableOpacity>
            }
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={{flex: 1}}>
          <Button
          color='#1db954'
          title="Create Playlist"
          onPress={() => this.props.navigation.navigate('Create')}
          />
        </View>
      </View>
    );
  }
}
