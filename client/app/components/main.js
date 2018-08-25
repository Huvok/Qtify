import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import Group from './group';

export class Main extends React.Component {
  render() {
    return (
      <View>
        <FlatList
          data={[{key: 'a', key: 'b'}]}
          renderItem={(item) => <Group name={item.key}/>}
        />
      </View>
    );
  }
}
