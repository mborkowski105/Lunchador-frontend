import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';

class LeftNavbar extends Component {
  render() {
    return (
      <View>
        <ScrollView>
          <View>
            <Text 
            style={{margin: 10, fontSize: 15, textAlign: "left", color: "white"}}
            >Close me</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default LeftNavbar;