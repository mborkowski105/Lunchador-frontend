import React, { Component } from 'react'
import TwitterFeed from './Containers/TwitterFeed'
import { createAppContainer, DrawerActions } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Image
  } from 'react-native'

import MapView, { PROVIDER_GOOGLE, Callout, Marker } from 'react-native-maps'
import FilterTrucks from './FilterTrucks'

class Home extends Component {

    static navigationOptions = {
      headerTitle: ()=> <Text />,
      headerLeft: () => <Text style={{paddingLeft:18}}>🍔</Text>,
      headerTransparent: true
    }

    state = {
      markers: [],
      tweets: [],
      shownTweets: [],
      renderFilterTrucks: false,
      searchTerm: "",
      latitude: 40.705272,
      longitude: -74.0139675
    }  

    componentDidMount(){
      // let NGROK_URL = ""
      // I've been using ngrok to access my localhost where my rails API is served
      fetch(`${NGROK_URL}/api/v1/tweets`)
      .then((res)=>{
          return res.json()
      }).then((data)=>{
            data = data.map((tweet)=>{
              let newDistance

              if ((tweet.lat == 40.705272) && (tweet.long == -74.0139675)) {
                  newDistance = 0
              }
              else {
                  let radlat1 = Math.PI * tweet.lat/180
                  let radlat2 = Math.PI * 40.705272/180
                  let theta = tweet.long-(-74.0139675)
                  let radtheta = Math.PI * theta/180
                  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
                  if (dist > 1) {
                      dist = 1
                  }
                  dist = Math.acos(dist)
                  dist = dist * 180/Math.PI
                  dist = dist * 60 * 1.1515
                  dist = Math.round( dist * 10 ) / 10
                  newDistance = dist
              }

              return Object.assign(tweet, {"distance": newDistance})
          })
          this.setState({tweets: data, shownTweets: data})
      })
    }

    renderMarkers = ()=>{
      if (this.state.tweets.length > 0){
        return this.state.shownTweets.map((tweet)=>{
          return (
            <Marker coordinate={
              {latitude: parseFloat(tweet.lat),
              longitude: parseFloat(tweet.long)}}
              ref={_marker => {
                this.marker = _marker
              }}
              onCalloutPress={() => {
                this.marker.hideCallout()
              }}>
            
              <View>
                <Image source={{uri: tweet["twitter_user_profile_image_url"]}} 
                style={{width: 32,
                  height: 32, borderRadius: 50, borderWidth: 1, borderColor: "#000000"}} />
                  <Callout style={{borderColor: "#808080", height: 138, width: 276}}>
                    <View>
                      <Text style={{fontSize: 13}}>
                        <Image source={{uri: tweet["twitter_user_profile_image_url"]}} style={{width: 36, height: 36, borderRadius: 50}}/>
                        {tweet["twitter_user_name"].toUpperCase()}
                      </Text>
                      <Text style={{color: "#808080", fontSize: 12}}>
                        {tweet["twitter_user_screen_name"]}
                      </Text>
                      <Text style={{fontSize: 13}}>{tweet.text}</Text>
                      <Text>{tweet["twitter_created_at"]}</Text>
                    </View>
                  </Callout>
              </View>
            </Marker>
          )
        })
      }
      else {
        return null
      }
    }

    hideFilterTrucks = ()=>{
      this.setState({renderFilterTrucks: false})
    }

    handleSearch = (searchTerm) => {
      this.setState({shownTweets: this.state.tweets.filter((tweet)=>{
        return (tweet.text.toLowerCase().includes(searchTerm) || tweet["twitter_user_name"].toLowerCase().includes(searchTerm))
      })})
    }

    handleSort = (value) => {
      if (value === "distance") {
        this.setState({shownTweets: this.state.tweets.sort((a, b) => a["distance"] - b["distance"])})
      }

      else {
        this.setState({ shownTweets: this.state.tweets.sort((a, b)=>{
          a = new Date(a.dateModified)
          b = new Date(b.dateModified)
          return a > b ? -1 : a<b ? 1 : 0
        })})
      }
    }

    zoomToTweet = (lat, long) =>{
      this.setState({latitude: parseFloat(lat), longitude: parseFloat(long)})
    }

    render(){
      const styles = StyleSheet.create({
          innerContainerOne: {
            flex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: "black"
          },
          map: {
            ...StyleSheet.absoluteFillObject,
          }
      })
        
      return (
        <>
          <View style={styles.innerContainerOne}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121
                }}
            >
              <View style={{ position: 'absolute', top: 100, left: 50 }}>
                {this.renderMarkers()}
              </View>
            </MapView>
          </View>
          <View style={styles.innerContainerOne} >
            <TouchableHighlight>
              <Text 
                style={{alignSelf: "center", color: "white"}} 
                onPress={()=>{this.setState({renderFilterTrucks: true})}}
                >🔎 </Text>
            </TouchableHighlight>
            <TwitterFeed 
              style={styles.twitterfeed} 
              tweets={this.state.shownTweets}
              zoom={this.zoomToTweet}
            />
            <FilterTrucks 
              modalVisible={this.state.renderFilterTrucks} 
              hideFilterTrucks={this.hideFilterTrucks} 
              handleSearch={this.handleSearch}
              backgroundColor="black"
              handleSort={this.handleSort}
              />
          </View>
        </>
      )
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
})

export default createAppContainer(AppNavigator)
