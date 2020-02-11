import React, { Component } from 'react';
import Home from './Home.js'
import LeftNavbar from './LeftNavbar'

import {
  StyleSheet,
  DrawerLayoutAndroid,
} from 'react-native';

import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Warning: ReactNative.createElement'])

class App extends Component {

  render() {
    const styles = StyleSheet.create({
      app: {
        flex: 1,
        fontFamily: 'Noto Sans'
      }
    })

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition="left"
        drawerBackgroundColor="rgba(0,0,0,0.5)"
        renderNavigationView={() => <LeftNavbar/>}>
        <Home/>
      </DrawerLayoutAndroid>
    )
  }
}

export default App
