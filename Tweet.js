import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
  } from 'react-native'

function Tweet (props) {
    zoom = ()=>{
        props.zoom(props.lat, props.long)
    }

    const styles = StyleSheet.create({
        tweet: {
            borderColor: "#808080",
            borderWidth: 2,
            borderRadius: 10
        },
        tweetImage: {
            width: 48,
            height: 48,
            borderRadius: 50
        },
        tweetScreenName: {
            fontWeight: "bold",
            textAlign: "center",
            color: "#2EB2E9"
        },
        tweetName: {
            color: "#808080"
        }
    })

    return (
        <TouchableOpacity style={styles.tweet} onPress={zoom}>
            <Image source={{uri: props.profileImage}} style={styles.tweetImage}/>
            <Text>{props.creator.toUpperCase()}</Text>
            <Text style={styles.tweetName}>{props.screenname} - <Text style={{color: "black", fontWeight: "bold"}}>{props.distance}m away </Text></Text>
            <Text>{props.text}</Text>
            <Text>{props.twitterCreatedAt}</Text>
        </TouchableOpacity>
    )
}

export default React.memo(Tweet)