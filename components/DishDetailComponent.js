import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

const RenderDish = (props) => {
  const dish = props.dish;

  return(
    dish != null?
    <Card
      featuredTitle={dish.name}
      image={require('./images/uthappizza.png')}
    >
      <Text>
        {dish.description}
      </Text>
    </Card>
    :
    <View></View>
  );
}

class DishDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      dishes : DISHES
    }
  }

  static navigationOptions = {
    title: 'Dish details',
  }

  render(){
    const dishId = this.props.navigation.getParam('dishId', '');
    return(
      <RenderDish 
        dish={this.state.dishes[+dishId]}
      />
    )
  }
}

export default DishDetail;