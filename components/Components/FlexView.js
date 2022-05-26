
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


/**
 * 
 * @param props <FlexView 
 * Flex_View_Style={{}} 
 * Linear_Gradient_Style={{}} 
 * />
 * 
 */

export function FlexView(props) {
    return(

        <View style={[styles.Flex_View_Style,props.Flex_View_Style]}>
                <LinearGradient
                colors={constants.AppColor.FLEX_GRADIENT_BACK_COLOR}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.Linear_Gradient_Style,props.Linear_Gradient_Style]}
            > 
        </LinearGradient>
            
        </View>
    );
}

const styles = StyleSheet.create({
 Flex_View_Style:{
    flex:1,
    borderTopLeftRadius:normalize(50),
    borderTopRightRadius:normalize(50),
    backgroundColor:"#fff"
},
Linear_Gradient_Style:{ 
    height: "100%", 
     paddingTop:10,
     borderTopLeftRadius:normalize(50),
     borderTopRightRadius:normalize(50),
    },
});