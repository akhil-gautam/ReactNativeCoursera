import React, {Component} from 'react';
import { ScrollView, View, Text, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { ABOUT } from '../shared/textData';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = (state) => {
  return {
    leaders: state.leaders
  }
}

const Leaders = (props) => {
  
  const renderLeaders = ({item, index}) => {
    return(
      <ListItem
        key={index}
        title={item.name}
        subtitle={item.description}
        hideChevron={true}
        leftAvatar={{source: {uri: baseUrl + item.image }}}
      />
    )
  };

  return(
    <Card title='Corporate Leadership'>
      <FlatList
        data={props.leaders}
        renderItem={renderLeaders}
        keyExtractor={item => item.id.toString()}
      />
    </Card>
  );
};

const History = () => {
  return(
    <View>
      <Card title="Our History">
          <View>
            <Text>{ABOUT.firstPart}</Text>
            <Text style={{paddingTop: 10}}>{ABOUT.secondPart}</Text>
          </View>
        </Card>
    </View>
  );
}

class AboutComponent extends Component {

  static navigationOptions = {
    title: 'About Us'
  }
  
  render(){
    if (this.props.leaders.isLoading) {
      return(
          <ScrollView>
              <History />
              <Card
                title='Corporate Leadership'>
                <Loading />
              </Card>
          </ScrollView>
      );
    }
    else if (this.props.leaders.errMess) {
      return(
          <ScrollView>
              <History />
              <Card
                title='Corporate Leadership'>
                <Text>{this.props.leaders.errMess}</Text>
              </Card>
          </ScrollView>
      );
    }
    else {
      return(
        <ScrollView>
          <History/>
          <Leaders leaders={this.props.leaders.leaders}/>
        </ScrollView>
      );
    }
  }
}

export default connect(mapStateToProps)(AboutComponent);
