import React, { Component } from 'react';
import { View, Text, 
  ScrollView, FlatList } from 'react-native';
import { Card, Icon, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavourite } from '../redux/ActionCreator';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favourites: state.favourites,
  }
}

const mapDispatchToProps = dispatch => ({
  postFavourite: (dishId) => dispatch(postFavourite(dishId))
})

const RenderDish = (props) => {
  const dish = props.dish;

  return(
    dish != null?
    <Card
      featuredTitle={dish.name}
      image={{ uri: baseUrl + dish.image }}
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
        <Rating
          startingValue={item.rating}
          readonly
          imageSize={10}
          style={{ 
            display: 'flex', flex: 1, flexDirection: 'row',
            justifyContent: 'flex-start', padding: 5}} 
        />
        <Text style={{fontSize: 10}}>{`--${item.author}, ${new Date(item.date).toLocaleDateString('en-us')}`}</Text>
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

  static navigationOptions = {
    title: 'Dish details',
  }

  markFavorite = (dishId) => {
    this.props.postFavourite(dishId);
  }

  render(){
    const dishId = this.props.navigation.getParam('dishId', '');
    return(
      <ScrollView>
        <RenderDish 
          dish={this.props.dishes.dishes[+dishId]}
          favourite={this.props.favourites.some((item) => item === dishId)}
          onPress={() => this.markFavorite(dishId)}
        />
        <RenderComments 
          comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)}
        />
      </ScrollView>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DishDetail);
