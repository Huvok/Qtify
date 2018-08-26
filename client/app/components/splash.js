import React from 'react';
import { View, Text, AsyncStorage, StyleSheet } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    return AsyncStorage.getItem('UserID').then((result) => {

      // We do not have a way to get the auth token from the server yet so we
      // login every time
      if(result && false) {
        const resetStack = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'Main', params: {userId: result}})]
        });

        this.props.navigation.dispatch(resetStack);
      } else {
        const resetStack = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'Login'})]
        });

        this.props.navigation.dispatch(resetStack);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: 'white', fontSize: 30}}>Qtify</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1db954',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
