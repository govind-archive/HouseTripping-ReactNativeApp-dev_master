



import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    View,
    Picker,
    TextInput
} from 'react-native';
import Images from '../../assets/Images';
import normalize from 'react-native-normalize';
import constants from '../../assets/constants';
import { LinearGradient } from 'expo-linear-gradient';


/**
 * 
 * @param props <TextInputBox 
 * Input_Box_Style={{}} 
 * placeholder={}
 * editable={}
 * placeholderTextColor={}
 * secureTextEntry={}
 * value={}
 * keyboardType={}
 * onChangeText={}
 * numberOfLines={}
 * multiline={}
 * />
 * 
 */

export function TextInputBox(props) {
    return (
        <>
            <TextInput
                style={[styles.Input_Box_Style,props.Input_Box_Style]}
                placeholder={props.placeholder}
                editable={props.editable}
                placeholderTextColor={props.placeholderTextColor}
                secureTextEntry={props.secureTextEntry}
                value={props.value}
                keyboardType={props.keyboardType}
                onChangeText={props.onChangeOfText}
                numberOfLines={props.numberOfLines}
                multiline={props.multiline}
            />
        </>

    );
}

const styles = StyleSheet.create({
  Input_Box_Style:{
    backgroundColor: '#fff',
    height: normalize(55),
    marginTop: normalize(10),
    borderRadius: normalize(20),
    paddingLeft: normalize(10),
},
});


