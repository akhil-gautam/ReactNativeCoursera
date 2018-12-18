import React, { Component } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { deleteFavourite } from '../redux/ActionCreator';
import Swipeout from 'react-native-swipeout';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    favorites: state.favourites
  }
}

const mapDispatchToProps = dispatch => {
  return{
    deleteFav: (dishId) => dispatch(deleteFavourite(dishId))
  }
}

class Favorites extends Component {

  static navigationOptions = {
    title: 'My Favorites'
  };

  render() {

    const { navigate } = this.props.navigation;

    const renderMenuItem = ({item, index}) => {
      const rightButton = [
        {
          text: 'Delete',
          type: 'delete',
          onPress: () => {
            Alert.alert(
              'Remove Favourite',
              `Are you sure you want to remove ${item.name} from your favourites?`,
              [
                {
                  text: 'Cancel', 
                  onPress: () => console.log('Not removed'),
                  style: 'cancel'
                },
                {
                  text: 'Ok', 
                  onPress: () => this.props.deleteFav(item.id),
                  style: 'default'
                }
              ],
              { cancelable: false }
            )
          }
        }
      ];
      return (
        <Swipeout right={rightButton} autoClose={true}>
          <ListItem
            key={index}
            title={item.name}
            subtitle={item.description}
            hideChevron={true}
            onPress={() => navigate('DishDetail', { dishId: item.id })}
            leftAvatar={{ source: {uri: baseUrl + item.image}}}
          />
        </Swipeout>
      );
    };

    if (this.props.dishes.isLoading) {
      return(
        <Loading />
      );
    }
    else if (this.props.dishes.errMess) {
      return(
        <View>            
          <Text>{this.props.dishes.errMess}</Text>
        </View>            
      );
    }
    else {
      return (
        <Animatable.View animation="fadeInRightBig" duration={2000}>
          <FlatList 
            data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
          />
        </Animatable.View>
      );
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
