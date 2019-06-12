/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView, Image, AsyncStorage, Button} from 'react-native';

export default class DetailView extends Component {

  state = {
    is_favorite: false,
  }


  componentDidMount(){
    const {mal_id} = this.props.anime
    AsyncStorage.getItem('my_favorite', (err, result) => {
      let data = JSON.parse(result);
      var found = data.find(function(element) {
        return element.mal_id == mal_id;
      });
      this.setState({ is_favorite : found });
    });
  }

  handleAddFavorite(){
    AsyncStorage.getItem('my_favorite', (err, result) => {
      let data = [];
      if(result != null){
        data = JSON.parse(result);
      }
      data.push(this.props.anime);
      AsyncStorage.setItem('my_favorite', JSON.stringify(data), () => {
        this.setState({ is_favorite : true });
      });
    });
  }

  render() {
    const {image_url, title, synopsis, score, episodes} = this.props.anime
    return (
      <View style={styles.container}>
      <ScrollView >
        <View style={styles.contImg}>
          <Image style={styles.image} resizeMode='contain' source={{ uri: image_url}} />
        </View>
        <View style={styles.detail}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.twoCol}>
            <View>
              <Text style={styles.info}>Score: {score}</Text>
            </View>
            <View>
              <Text style={styles.info}>Episodes: {episodes}</Text>
            </View>
          </View>
          <Text style={styles.title}>Synopsis:</Text>
          <Text style={styles.info}>{synopsis}</Text>
          {!this.state.is_favorite && <Button
            style={styles.button}
            onPress={() => this.handleAddFavorite()}
            title="Add Favorite"
            accessibilityLabel="Add Favorite" />}
        </View>
      </ScrollView>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingBottom: 20,
  },
  contImg:{
    height: 350,
    backgroundColor: 'black',
    marginBottom: 10
  },
  image: {
    flex: 1
  },
  detail:{
    padding: 5,
  },
  title:{
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10
  },
  twoCol:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 14
  },
  info:{
    fontSize: 18,
    textAlign: 'justify',
    padding:10
  },
  synopsis:{
    fontSize: 18,
    fontWeight: 'bold'
  }
});