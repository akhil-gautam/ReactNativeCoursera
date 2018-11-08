import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Home extends Component{
  
  static navigationOptions = {
    title: 'Home'
  }
  render(){
    return(
      <View style={{flex: 1, alignContent: "center"}}>
        <Text>
          This is the home screen.
        </Text>
      </View>
    )
  }
}

export default Home;
