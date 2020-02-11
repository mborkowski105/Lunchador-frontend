import React, { Component } from 'react'

import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Modal,
    TouchableHighlight,
    Picker
  } from 'react-native'

  class FilterTrucks extends Component {

    state = {
        searchTerm: "",
        sortBy: "newest"
    }

    styles = StyleSheet.create({
        modal: {
            height: 100
        }
    })

    hide = ()=>{
        this.props.hideFilterTrucks()
    }

    handleSearch = (text)=>{
        this.setState({searchTerm: text.toLowerCase()})
        this.props.handleSearch(text.toLowerCase())
    }

    handleSort = (value)=>{
        this.setState({sortBy: value})
        this.props.handleSort(value)
    }

    render(){
        const styles = StyleSheet.create({
        })
        
        return (
            <>
                <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <Modal
                        animationType="slide"
                        visible={this.props.modalVisible}
                    >
                        <View style={{marginTop: 22}}>
                            <View>
                                <Text>Search</Text>
                                <TextInput type="text" name="searchTerm" placeholder="Enter a search term" value={this.state.searchTerm} onChangeText={(text) => this.handleSearch(text)}/>                          
                                <Picker
                                    style={{height: 50, width: 200}}
                                    selectedValue={this.state.sortBy}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.handleSort(itemValue)}
                                    >
                                    <Picker.Item label="Distance" value="distance" />
                                    <Picker.Item label="Newest" value="newest" />
                                </Picker>
                                <TouchableHighlight>
                                    <Text onPress={this.hide}>❌</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                </View>
            </>
        )
    }
}

export default FilterTrucks;