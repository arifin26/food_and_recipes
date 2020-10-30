import React from 'react';
import { View, Text, Image, ActivityIndicator, StatusBar } from 'react-native';
import { Bars } from 'react-native-loader';
import AppContainer from '../../navigations/AppNavigation';

export default class SplashScreen extends React.Component {
  state = {
    role: true
  };

  render() {
    setTimeout(() => {
      this.setState({
        role: false
      });
    }, 2000);
    if (this.state.role) {
      return (
        <View style={{ alignItems: 'center', paddingTop: 90, flex: 1, backgroundColor: '#ff6738' }}>
          <StatusBar barStyle={'dark-content'} backgroundColor={'#ff6738'} />

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('../../../assets/icons/recipes.png')}
              style={{ height: 160, width: 160 }}
            />
            <View style={{ marginTop: 40 }}>
              <Text style={{ textAlign: 'center', fontSize: 40, color: '#fff' }}>Recipe food</Text>
            </View>
          </View>

          <View style={{ paddingTop: 150 }}>
            {/* <ActivityIndicator size={'large'} color={'#fff'} /> */}
            <ActivityIndicator size={40} color="#fff" />
          </View>
        </View>
      );
    }

    return <AppContainer />;
  }
}
