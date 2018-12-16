import React, {Component} from 'react';
import { View, ScrollView,
  StyleSheet,
  Button, Modal } from 'react-native';
import { Rating, Input, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { postComment } from '../redux/ActionCreator';

const mapDispatchToProps = dispatch => ({
  postComment: (comment) => dispatch(postComment(comment))
})

let id=100; // as we don't have a real DB, I am taking it as an arbitrary value as per db.json

class AddComment extends Component{
  constructor(props){
    super(props);
    this.state = {
      author: '',
      comment: '',
      rating: 0,
      date: new Date().toISOString()
    }
  }

  submitComment = () => {
    this.props.postComment({...this.state,
      dishId: this.props.dishId, id: ++id});
    setTimeout(this.props.toggleModal, 500);
  }

  render(){
    return(
      <ScrollView>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.props.showModal}
          onDismiss={() => this.props.toggleModal()}
          onRequestClose={() => this.props.toggleModal()}
        >
          <View style={styles.modal}>
            <Rating
              showRating
              readonly={false}
              startingValue={this.state.rating}
              imageSize={20}
              style={{paddingVertical: 10, marginBottom: 30}}
              onFinishRating={(value) => this.setState({rating: value})}
            />
            <Input
              placeholder='Author'
              leftIcon={
                <Icon
                  name='user-o'
                  type='font-awesome'
                  size={24}
                  color='black'
                />
              }
              style={{paddingBottom: 30}}
              onChangeText={(text) => this.setState({author: text})}
            />
            <Input
              placeholder='Comment'
              leftIcon={
                <Icon
                  name='comment-o'
                  type='font-awesome'
                  size={24}
                  color='black'
                />
              }
              style={{paddingBottom: 30}}
              onChangeText={(text) => this.setState({comment: text})}
            />
            <View style={{marginTop: 40}}>
              <Button 
                onPress={() => this.submitComment()}
                color='#512DA8'
                title='Submit'
              />
            </View>
            <View style={{marginTop: 20}}>
              <Button 
                onPress={() => this.props.toggleModal()}
                color='grey'
                title='Cancel'
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  formItem: {
    flex: 1
  },
  modal: {
    justifyContent: 'center',
    margin: 20,
  },
})

export default connect(null, mapDispatchToProps)(AddComment);
