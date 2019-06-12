/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Scene, Router} from 'react-native-router-flux';
import ListView from './List';
import FavListView from './favList';
import DetailView from './Detail';


export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="list" component={ListView} title="Animes"/>
          <Scene key="favList" component={FavListView} title="Favorites"/>
          <Scene key="detail" component={DetailView} title="Detail"/>
        </Scene>
      </Router>
    );
  }
}
