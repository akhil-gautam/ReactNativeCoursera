import React, { Component } from 'react';
import { View, Text, 
  ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';

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
      <Icon
        raised
        reverse
        name={ props.favourite ? 'heart' : 'heart-o' }
        type='font-awesome'
        color='#f50'
        onPress={() => props.favourite ? console.log('We already know this.') : props.onPress()}
      />
    </Card>
    :
    <View></View>
  );
}

const RenderComments = (props) => {
  const { comments } = props;
  renderCommentItem = ({item, index}) => {
    return(
      <View key={index} style={{margin: 10}}>
        <Text style={{fontSize: 12}}>{item.comment}</Text>
        <Text style={{fontSize: 14}}>{item.rating} Stars</Text>
        <Text style={{fontSize: 10}}>{`--${item.author}, ${item.date}`}</Text>
      </View>
    )
  }
  return(
    <Card title='Comments'>
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={item => item.id.toString()}
      />
    </Card>
  );

}

class DishDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      dishes : DISHES,
      comments: COMMENTS,
      favourites: []
    }
  }

  static navigationOptions = {
    title: 'Dish details',
  }

  markFavourite = (dishId) => {
    this.setState({ favourites: this.state.favourites.concat(dishId)})
  }

  render(){
    const dishId = this.props.navigation.getParam('dishId', '');
    return(
      <ScrollView>
        <RenderDish 
          dish={this.state.dishes[+dishId]}
          favourite={this.state.favourites.some((item) => item === dishId)}
          onPress={() => this.markFavourite(dishId)}
        />
        <RenderComments 
          comments={this.state.comments.filter((comment) => comment.dishId === dishId)}
        />
      </ScrollView>
    )
  }
}

export default DishDetail;