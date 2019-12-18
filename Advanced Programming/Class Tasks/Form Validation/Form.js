import React, {Component} from 'react';
import {View, Text, TextInput, TouchableHighlight, StyleSheet} from 'react-native';
import ValidationComponent from 'react-native-form-validator';

export default class Form extends ValidationComponent{
  constructor(props)
  {
    super(props);
    this.state={
      myname:"name",
      myemail:"email",
      mynumber:"number",
      mydate:"date"
    };
  }

  _onPressButton()
  {
    this.validate({
      myname:{minlength:3, maxlength:7, required: true},
      myemail:{email:true},
      mynumber:{number:true},
      mydate:{date:'YYYY-MM-DD'}
    });
  }

  render()
  {
    return ( 
      <View style={styles.container}> 
        <TextInput style={styles.textInput} onChangeText={(myname) => this.setState({myname})} value={this.state.myname} /> 
        <TextInput style={styles.textInput} onChangeText={(myemail) => this.setState({myemail})} value={this.state.myemail} /> 
        <TextInput style={styles.textInput} onChangeText={(mynumber) => this.setState({mynumber})} value={this.state.mynumber} /> 
        <TextInput style={styles.textInput} onChangeText={(mydate) => this.setState({mydate})} value={this.state.mydate} /> 
        
        <TouchableHighlight onPress={this._onPressButton.bind(this)}><View><Text>Submit</Text></View></TouchableHighlight> 

        <View style={styles.container}><Text> {this.getErrorMessages()} </Text> </View>
      </View> 
      ); 
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 8,
  },
  textInput: {
    margin: 1,
    borderWidth: 1,
    height: 40,
  },
});