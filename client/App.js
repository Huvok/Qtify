import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Main from './app/components/main';
import Playlist from './app/components/playlist';

export default createStackNavigator({
  Main: Main,
  Playlist: Playlist
}, {
  initialRouteName: 'Main'
});
