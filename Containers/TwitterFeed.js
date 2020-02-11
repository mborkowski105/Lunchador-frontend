import React, { Component } from 'react'
import Tweet from '../Tweet'

import {
    StyleSheet,
    ScrollView
  } from 'react-native';

  import {
    Colors
  } from 'react-native/Libraries/NewAppScreen';

  class TwitterFeed extends Component {

    renderTweets = ()=>{
      if (this.props.tweets.length > 0)
      {
          return this.props.tweets.map((tweet)=>{
              if (tweet.text.length > 0)
              {
                  return <Tweet 
                      key={tweet.id}
                      twitterCreatedAt={tweet["twitter_created_at"]}
                      twitterId={tweet["twitter_id"]}
                      twitterIdStr={tweet["twitter_id_str"]}
                      text={tweet.text}
                      twitterUserId={tweet["twitter_user_id"]}
                      creator={tweet["twitter_user_name"]}
                      screenname={tweet["twitter_user_screen_name"]}
                      profileImage={tweet["twitter_user_profile_image_url"]}
                      lat={tweet["lat"]}
                      long={tweet["long"]}
                      distance={tweet["distance"]}
                      zoom={this.props.zoom}
                  />
              }
              else {
                  return null
              }
          })
        }
    }

    render(){
        const styles = StyleSheet.create({
            scrollView: {
              backgroundColor: Colors.lighter,
            },
            engine: {
              position: 'absolute',
              right: 0,
            },
            body: {
              backgroundColor: Colors.white,
            },
            highlight: {
              fontWeight: '700',
            },
            innerContainerOne: {
              flex: 1,
              width: "100%",
              height: "100%",
            },
            tweetColumn: {
                width: "90%",
                height: "100%",
                borderWidth: 1,
                alignSelf: "center",
                borderRadius: 10,
                backgroundColor: "white",
                marginTop: 30
            },
            map: {
              ...StyleSheet.absoluteFillObject,
            },
          });

        

        return (
            <ScrollView style={styles.tweetColumn}>{this.renderTweets()}</ScrollView>
        )
    }
  }

  export default TwitterFeed