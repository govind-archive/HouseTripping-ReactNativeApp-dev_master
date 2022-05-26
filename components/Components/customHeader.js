
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Picker,
} from 'react-native';
import Images from '../../assets/Images';
import normalize from 'react-native-normalize';
import constants from '../../assets/constants';
import { LinearGradient } from 'expo-linear-gradient';
import Styles from '../../constants/Styles';

export function IconHeader(props) {
    return(

        <View style={[props.Header_View_Style,styles.IconHeaderViewStyle]}>
            <TouchableOpacity style={[props.Header_Image_Touch_Style]} 
            onPress={props.onPressLeft}>
            <Image
            style={[props.Header_Image_Style,styles.HeaderImageStyle]}
            resizeMode="contain"
            source={props.source}
            />
            </TouchableOpacity>
            <View  style={[props.Header_Text_View_Style,styles.IconHeaderTextViewStyle]}>
            <Text style={[props.Header_Text_Style,styles.HeaderTextStyle]}>
                {props.Header_lable}
                
            </Text>
            </View>
            <TouchableOpacity style={[props.Header_Image_Touch_Style]} 
            onPress={props.onPressRightOne}>
            <Image
            style={[props.Header_Image_Style,styles.IconHeaderImageStyle]}
            resizeMode="contain"
            source={props.sourceRightOne}
            />
            </TouchableOpacity>
            <TouchableOpacity style={[props.Header_Image_Touch_Style]} 
            onPress={props.onPressRightTwo}>
            <Image
            style={[props.Header_Image_Style,styles.IconHeaderImageStyle]}
            resizeMode="contain"
            source={props.sourceRightTwo}
            />
            </TouchableOpacity>

        </View>
    );
}
/**
 * 
 * @param props <NormalHeader 
 * Header_lable="SUBMIT" 
 * Header_View_Style={{}} 
 * Header_Image_Touch_Style={{}} 
 * Header_Image_Style={{}}
 * Header_Text_View_Style={{}}
 * Header_Text_Style={{ color: '#FFF' }} />
 * 
 */

export function NormalHeader(props) {
    return(

        <View style={[props.Header_View_Style,styles.HeaderViewStyle]}>
            <TouchableOpacity style={[props.Header_Image_Touch_Style]} 
            onPress={props.onPress}>
            <Image
            style={[props.Header_Image_Style,styles.HeaderImageStyle]}
            resizeMode="contain"
            source={props.source}
            />
            </TouchableOpacity>
            <View  style={[props.Header_Text_View_Style,styles.HeaderTextViewStyle]}>
            <Text style={[props.Header_Text_Style,styles.HeaderTextStyle]}>
                {props.Header_lable}
                
            </Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
   HeaderViewStyle:{
    flexDirection:'row',
    height:120,
    marginTop:20,
    alignItems:'center'
},
IconHeaderViewStyle:{
    flexDirection:'row',
    height:60,
    marginTop:20,
    alignItems:'center'
},
HeaderImageStyle:{
    width:20,
    height:20,
    tintColor: '#fff',
    marginLeft:25
},
IconHeaderImageStyle:{
    width:15,
    height:15,
    tintColor: '#fff',
    marginLeft:10
},
HeaderTextViewStyle:{
    width:'80%',
    alignItems:"center",
    justifyContent:"center"
},
IconHeaderTextViewStyle:{
    width:'65%',
    alignItems:"center",
    justifyContent:"center",
    // backgroundColor:'green',
    marginLeft:normalize(20)
},
HeaderTextStyle:{
    // fontSize:normalize(22),
    ...Styles.BOLD_20,
    color:'#fff',
    textAlign:'center',
},
});