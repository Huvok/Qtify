import React from 'react';
import { WebView, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import { getUserId } from '../model/spotify';
import { login } from '../model/qtify';

export default class Login extends React.Component {
  static navigationOptions = {
    title: 'Login'
  };

  constructor(props) {
    super(props);
  }

  navigationChanged(state) {
    let params = state.url.split('#');
    if(params.length > 1) {
      params = params[1];
      let accessToken = params.split('&')[0];
      let refreshToken = params.split('&')[1];
      if(accessToken && refreshToken) {
        accessToken = accessToken.split('=')[1];
        refreshToken = refreshToken.split('=')[1];
        console.log('Access token: ' + accessToken);
        console.log('Refresh token: ' + refreshToken);

        getUserId(accessToken).then((user) => {
          if(user) {
            login(user, accessToken, refreshToken).then((success) => {
              if(success) {
                AsyncStorage.setItem('UserID', user).catch((error) => {
                  console.log(error);
                });

                const resetStack = StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({routeName: 'Main', params: {userId: user, token: accessToken}})]
                });

                this.props.navigation.dispatch(resetStack);
              }
            });
          }
        });
      }
    }
  }

  render() {
    const host = 'http://10.12.221.138:3000'

    return (
      <WebView
        source={{uri: host + '/login'}}
        onNavigationStateChange={(state) => this.navigationChanged(state)}
      />
    );
  }
}
