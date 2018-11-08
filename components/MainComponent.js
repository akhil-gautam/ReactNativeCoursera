import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import DishDetail  from './DishDetailComponent';

const NavMenu = createStackNavigator(
  {
    Menu: { screen: Menu },
    DishDetail: { screen: DishDetail }
  },
  {
    initialRouteName: 'Menu',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#512DA8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      }
    }
  }
);

const HomeNavigator = createStackNavigator(
  {
    Home: { screen: Home },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#512DA8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      }
    }
  }
);

const MainNavigator = createDrawerNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      title: 'Home',
      drawerLabel: 'Home'
    }
  },
  Menu: {
    screen: NavMenu,
    navigationOptions: {
      title: 'Menu',
      drawerLabel: 'Menu'
    }
  }
}, {
  drawerBackgroundColor: '#54C3E8',
  contentOptions: {
    activeTintColor: '#e91e63',
    itemsContainerStyle: {
      marginVertical: 0,
    },
  }
});

class Main extends Component {

  render(){
    return(
      <View style={{flex:1, paddingTop: Platform.OS === 'ios'? 0 : Expo.Constants.statusBarHeight}}>
        <MainNavigator />
      </View>
    );
  }
}

export default Main;