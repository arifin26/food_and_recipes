import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  WebView,
  Dimensions,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import styles from './styles';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  getIngredientName,
  getCategoryName,
  getCategoryById,
} from '../../data/MockDataAPI';
import BackButton from '../../components/BackButton/BackButton';
import {recipes} from '../../data/dataArrays';

const {width: viewportWidth} = Dimensions.get ('window');

export default class RecipeScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTransparent: 'true',
      headerLeft: (
        <BackButton
          onPress={() => {
            navigation.goBack ();
          }}
        />
      ),
    };
  };

  constructor (props) {
    super (props);
    this.state = {
      activeSlide: 0,
    };
  }

  renderImage = ({item}) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: item}} />
      </View>
    </TouchableHighlight>
  );

  onPressIngredient = item => {
    var name = getIngredientName (item);
    let ingredient = item;
    this.props.navigation.navigate ('Ingredient', {ingredient, name});
  };

  
   
  
  

  render () {
    const {activeSlide} = this.state;
    const {navigation} = this.props;
    const item = navigation.getParam ('item');
    const category = getCategoryById (item.categoryId);
    const title = getCategoryName (category.id);

  
    return (
      <ScrollView style={styles.container1}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
        <View style={styles.carouselContainer}>
          <View style={styles.carousel}>
            <Carousel
              ref={c => {
                this.slider1Ref = c;
              }}
              data={item.photosArray}
              renderItem={this.renderImage}
              sliderWidth={viewportWidth}
              itemWidth={viewportWidth}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              firstItem={0}
              loop={false}
              autoplay={false}
              autoplayDelay={500}
              autoplayInterval={3000}
              onSnapToItem={index => this.setState ({activeSlide: index})}
            />
            <Pagination
              dotsLength={item.photosArray.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              dotColor="rgba(255, 255, 255, 0.92)"
              dotStyle={styles.paginationDot}
              inactiveDotColor="white"
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={this.slider1Ref}
              tappableDots={!!this.slider1Ref}
            />
          </View>
        </View>
        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>{item.title}</Text>
          <View style={styles.infoContainer}>
            <TouchableHighlight
              onPress={() =>
                navigation.navigate ('RecipesList', {category, title})}
            >
              <Text style={styles.category2}>
                {getCategoryName (item.categoryId).toUpperCase ()}
              </Text>
            </TouchableHighlight>
          </View>

          <View style={styles.infoContainer}>
            <Image
              style={styles.infoPhoto}
              source={require ('../../../assets/icons/time.png')}
            />
            <Text style={styles.infoRecipe}>{item.time} menit </Text>
          </View>
{/* 
          <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={recipes}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.recipeId}`}
        /> */}
          <View style={{height: 200, width: 300, marginTop: 20}}>

            <WebView
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{uri: 'https://www.youtube.com/embed/Lw-zSzjHjSU'}}
            />

          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
          </View>

        </View>
      </ScrollView>
    );
  }
}

/*cooking steps
<View style={styles.infoContainer}>
  <Image style={styles.infoPhoto} source={require('../../../assets/icons/info.png')} />
  <Text style={styles.infoRecipe}>Cooking Steps</Text>
</View>
<Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
*/