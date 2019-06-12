/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class ItemList extends Component {

  render() {
      const {image_url, title} = this.props.anime
    return (
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: image_url}} />
        <View style={styles.info}>
            <Text style={styles.name}>{title} </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 10
  },
  image: {
    height: 120,
    width: 120,
  },
  info:{
      flex: 1,
      justifyContent: 'center'
  },
  name:{
      fontSize: 20,
      paddingLeft:5
  }
});