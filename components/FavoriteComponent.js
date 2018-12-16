import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { deleteFavourite } from '../redux/ActionCreator';
import Swipeout from 'react-native-swipeout';

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
          onPress: () => this.props.deleteFav(item.id)
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
        <FlatList 
          data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
          renderItem={renderMenuItem}
          keyExtractor={item => item.id.toString()}
        />
      );
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
