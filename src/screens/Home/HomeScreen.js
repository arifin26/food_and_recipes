import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  StatusBar,
  Image,
} from 'react-native';
import styles from './styles';
import {recipes} from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import {getCategoryName} from '../../data/MockDataAPI';
import {Placeholder} from 'rn-placeholder';

export default class HomeScreen extends React.Component {
  state={
    isready:true
  }
  static navigationOptions = ({navigation}) => ({
    title: 'Recipe food',
    headerStyle: {
      backgroundColor: '#ff6738',
    },

    headerLeft: (
      <MenuImage
        onPress={() => {
          navigation.openDrawer ();
        }}
      />
    ),
  });

  constructor (props) {
    super (props);
  }

  onPressRecipe = item => {
    this.props.navigation.navigate ('Recipe', {item});
  };

  renderRecipes = ({item}) => (
    <View>
   
   
    <TouchableHighlight
      underlayColor="rgba(73,182,77,1,0.9)"
      onPress={() => this.onPressRecipe (item)}
    >
      <View style={styles.container}>
        <Image style={styles.photo} source={{uri: item.photo_url}} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName (item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  
    </View>
    
  );

  render () {
    return (
      <View>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#ff6738'} />
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={recipes}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.recipeId}`}
        />
      </View>
    );
  }
}
