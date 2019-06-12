/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View, FlatList, ActivityIndicator, TouchableOpacity, TextInput, Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ItemList from './Card';
import {getData} from '../service/Animelist';

export default class ListView extends Component {

  state = {
    anime: null,
    search: '',
  }

  componentDidMount(){
    getData(this.state.search).then(data => this.setState({ anime : data }));
  }

  handlePress (item) {
    Actions.detail({ anime : item})
  }

  handleFavorite(){
    Actions.favList();
  }

  handleSearch(search){
    this.setState({search});
    if(search.trim().length > 3 || search.trim().length == 0){
      getData(search).then(data => this.setState({ anime : data }));
    }
  }

  render() {
    const lista = this.state.anime;
    return (
      
      <View style={styles.container}>
        <TextInput
          style={styles.searchBox}
          onChangeText={(search) => this.handleSearch(search)}
          value={this.state.search}
          placeholder="Anime name"
        />
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
        <TouchableOpacity 
          style={styles.position}
          onPress={() => this.handleFavorite()}>
          <View style={styles.container_button}>
            <Image
              style={styles.fav_button}
              source={require('../image/no_favorite_white.png')}
            />          
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  searchBox: {
    margin: 5,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  container_button:{
    width: 45,
    height:45,
    paddingTop: 3,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#000',
    borderRadius: 20,
    // position:'absolute',
    // bottom:40,
    // right:40,
    // zIndex:1000
  },
  fav_button:{
    width: 40,
    height:40,
  },
  position:{
    position:'absolute',
    bottom:40,
    right:40,
    zIndex:1000
  }
});