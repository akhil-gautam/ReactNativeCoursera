import React, {Component} from 'react';
import { ScrollView, View, Text, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { ABOUT } from '../shared/textData';
import { LEADERS } from '../shared/leaders';

const Leaders = (props) => {
  
  const renderLeaders = ({item, index}) => {
    return(
      <ListItem
        key={index}
        title={item.name}
        subtitle={item.description}
        hideChevron={true}
        leftAvatar={{source: require('./images/uthappizza.png')}}
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
    return(
      <ScrollView>
        <History/>
        <Leaders leaders={LEADERS}/>
      </ScrollView>
    );
  }
}

export default AboutComponent;