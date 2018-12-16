import React, { Component } from 'react';
import { View, Platform,
  Image, StyleSheet,
  Text, ScrollView } from 'react-native';
import { createStackNavigator, createDrawerNavigator,
  DrawerItems, SafeAreaView } from 'react-navigation';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import DishDetail  from './DishDetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreator';

const mapDispatchToProps = dispatch => {
  return{
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const NavMenu = createStackNavigator(
  {
    Menu: { screen: Menu,
      navigationOptions: ({ navigation }) => ({
        headerLeft: 
          <Icon name="menu" size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
      })
    },
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
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#512DA8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      },
      headerLeft: 
        <Icon name="menu" size={24}
          color="white"
          onPress={() => navigation.toggleDrawer()}
        />
    })
  }
);

const ContactNavigator = createStackNavigator(
  {
    Contact: { screen: Contact },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#512DA8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      },
      headerLeft:
        <Icon name="menu" size={24}
          color="white"
          onPress={() => navigation.toggleDrawer()}
        />
    })
  }
);

const ReservationNavigator = createStackNavigator(
  {
    Reserve: { screen: Reservation },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#512DA8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      },
      headerLeft:
        <Icon name="menu" size={24}
          color="white"
          onPress={() => navigation.toggleDrawer()}
        />
    })
  }
);

const AboutNavigator = createStackNavigator(
  {
    About: { screen: About },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#512DA8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      },
      headerLeft: 
        <Icon name="menu" size={22}
          color="white"
          onPress={() => navigation.toggleDrawer()}
        />
    })
  }
);

const FavoriteNavigator = createStackNavigator(
  {
    Favorites: { screen: Favorites },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#512DA8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      },
      headerLeft:
        <Icon name="menu" size={24}
          color="white"
          onPress={() => navigation.toggleDrawer()}
        />
    })
  }
);

const CustomDrawerComponent = (props) => {
  return(
    <ScrollView>
      <SafeAreaView
        style={StyleSheet.container}
        forceInset={{top: 'always', horizontal: 'never'}}>
        <View style={styles.drawerHeader}>
          <View style={{flex: 1}}>
            <Image source={require('./images/logo.png')}
              style={styles.drawerImage}
            />
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>
              Ristorante Con Fusion
            </Text>
          </View>
        </View>
        <DrawerItems {...props}/>
      </SafeAreaView>
    </ScrollView>
  );
};

const MainNavigator = createDrawerNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      title: 'Home',
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Icon
          name='home'
          type='font-awesome'
          size={24}
          color={tintColor}
        />
      )
    }
  },
  About: {
    screen: AboutNavigator,
    navigationOptions: {
      title: 'About',
      drawerLabel: 'About Us',
      drawerIcon: ({ tintColor }) => (
        <Icon
          name='info-circle'
          type='font-awesome'
          size={24}
          color={tintColor}
        />
      )
    }
  },
  Menu: {
    screen: NavMenu,
    navigationOptions: {
      title: 'Menu',
      drawerLabel: 'Menu',
      drawerIcon: ({ tintColor }) => (
        <Icon
          name='list'
          type='font-awesome'
          size={24}
          color={tintColor}
        />
      )
    }
  },
  Contact: {
    screen: ContactNavigator,
    navigationOptions: {
      title: 'Contact Us',
      drawerLabel: 'Contact Us',
      drawerIcon: ({ tintColor }) => (
        <Icon
          name='address-card'
          type='font-awesome'
          size={24}
          color={tintColor}
        />
      )
    }
  },
  Reserve: {
    screen: ReservationNavigator,
    navigationOptions: {
      title: 'Reserve Table',
      drawerLabel: 'Reserve Table',
      drawerIcon: ({ tintColor }) => (
        <Icon
          name='cutlery'
          type='font-awesome'
          size={24}
          color={tintColor}
        />
      )
    }
  },
  Favorites: {
    screen: FavoriteNavigator,
    navigationOptions: {
      title: 'My favorites',
      drawerLabel: 'My favorites',
      drawerIcon: ({ tintColor }) => (
        <Icon
          name='heart'
          type='font-awesome'
          size={24}
          color={tintColor}
        />
      )
    }
  },
},{
    drawerBackgroundColor: '#54C3E8',
    contentComponent: CustomDrawerComponent,
    contentOptions: {
      activeTintColor: '#e91e63',
      itemsContainerStyle: {
        marginVertical: 0,
      },
    }
});

class Main extends Component {

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    
  }

  render(){
    return(
      <View style={{flex:1, marginTop: Platform.OS === 'ios'? 0 : 0}}>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawerHeader: {
    backgroundColor: '#0E3618',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);