/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View, FlatList, ActivityIndicator, TouchableOpacity, TextInput, AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ItemList from './Card';

export default class FavListView extends Component {

  state = {
    anime: null,
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('favorites');
      if (value !== null) {
        return value;
      }
    } catch (error) {
      return[];
    }
  };

  componentDidMount(){
    AsyncStorage.getItem('my_favorite', (err, result) => {
      let data = JSON.parse(result);
      if(result == null){
        data=[];
      }
      this.setState({ anime : data });
    });
  }

  handlePress (item) {
    Actions.detail({ anime : item})
  }

  render() {
    const lista = this.state.anime;
    return (
      <View style={styles.container}>
        {!lista && <ActivityIndicator size="large" color="#0000ff" />}
        {lista && <FlatList
          data={lista}
          renderItem={({item}) => {
            return(
              <TouchableOpacity
              style={styles.button}
              onPress={() => this.handlePress(item)}>
                <ItemList anime={item} />
              </TouchableOpacity>
            )
          }}
          keyExtractor={(item, index) => index.toString()}
        />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  searchBox: {
    margin: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 30,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
});