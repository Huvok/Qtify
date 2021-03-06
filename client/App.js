import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Main from './app/components/main';
import Playlist from './app/components/playlist';
import Create from './app/components/create';
import Search from './app/components/search';
import Login from './app/components/login';
import Splash from './app/components/splash'

export default createStackNavigator({
  Main: Main,
  Playlist: Playlist,
  Create: Create,
  Search: Search,
  Login: Login,
  Splash: Splash
}, {
  initialRouteName: 'Splash'
});
