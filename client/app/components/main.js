import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert, Button } from 'react-native';

import { getPlaylists } from '../model/qtify';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
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
      <View>
        <FlatList
          data={this.state.playlists}
          renderItem={({item}) =>
            <Text>{item.group_name}, {item.id}</Text>
          }
          keyExtractor={(item, index) => index.toString()}
        />
        <Button
          title="Create Playlist"
          onPress={() => this.props.navigation.navigate('Create')}
        />
      </View>
    );
  }
}
