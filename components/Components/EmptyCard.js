import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Keyboard,
  StatusBar,
  PermissionsAndroid,
  Modal,
  FlatList
} from 'react-native';
import normalize from 'react-native-normalize';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Contants from '../../constants/Contants';
import Styles from '../../constants/Styles';
import Images from '../../assets/Images';


export function EmptyCard(props) {
    return (
      <View style={[{
          // backgroundColor:'red',
          justifyContent:'center',
          alignItems:'center',
          height:150,
          marginTop:RFValue(146,Contants.DesignCanvas.HEIGHT)
      }]}>
        <Image
        style={[{
          width:RFValue(32,Contants.DesignCanvas.HEIGHT),
          height:RFValue(32,Contants.DesignCanvas.HEIGHT),
          marginBottom:RFValue(17,Contants.DesignCanvas.HEIGHT)
        }]}
        resizeMode="contain"
        source={Images.profile_post_not_found_icon}
        />
          <Text style={[Styles.MEDIUM_18,{
              color:'#272D37',
              
          }]}>{(props.message) ? props.message : 'No record found'}</Text>
         
        
          
          </View>
    );
  }
export function EmptySongCard(props) {
    return (
      <View style={[{
          // backgroundColor:'red',
          justifyContent:'center',
          alignItems:'center',
          height:150,
          marginTop:RFValue(110,Contants.DesignCanvas.HEIGHT)
      }]}>
        <Image
        style={[{
          width:RFValue(32,Contants.DesignCanvas.HEIGHT),
          height:RFValue(32,Contants.DesignCanvas.HEIGHT),
          marginBottom:RFValue(17,Contants.DesignCanvas.HEIGHT)
        }]}
        resizeMode="contain"
        source={Images.profile_post_not_found_icon}
        />
          <Text style={[Styles.MEDIUM_18,{
              color:'#272D37',
              
          }]}>{(props.message) ? props.message : 'No record found'}</Text>
          <TouchableOpacity
          onPress={props.onPress}
          style={[{
            backgroundColor:'#272D37',
            justifyContent:"center",
            alignItems:"center",
            borderRadius:8,
            width:RFValue(122,Contants.DesignCanvas.HEIGHT),
            height:RFValue(40,Contants.DesignCanvas.HEIGHT),
            marginTop:RFValue(20,Contants.DesignCanvas.HEIGHT)
          }]}>
            <Text style={[Styles.MEDIUM_15,{color:"#FFFFFF"}]}>{(props.Title) ? props.Title : 'Upload song'}</Text>
          </TouchableOpacity>
        
          
          </View>
    );
  }