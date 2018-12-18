import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
  }
}

class Menu extends Component {

  static navigationOptions = {
    title: 'Menu',
  }
  
  render(){

    const renderMenuItem = ({item, index}) => {
      return(
        <Animatable.View animation="fadeInRightBig" duration={2000}>
          <Tile
            key={index}
            title={item.name}
            caption={item.description}
            featured
            imageSrc={{uri: baseUrl + item.image }}
            onPress={() => navigate('DishDetail', { dishId: item.id })}
          />
        </Animatable.View>
      )
    }

    const { navigate } = this.props.navigation;
    return(
      <FlatList
        data={this.props.dishes.dishes}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id.toString()}
      />
    )
  }
  
}

export default connect(mapStateToProps)(Menu);
