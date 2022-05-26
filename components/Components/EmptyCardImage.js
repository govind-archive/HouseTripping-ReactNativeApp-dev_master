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
import Images from '../../assets/Images'
import Contants from '../../constants/Contants';
import Styles from '../../constants/Styles';
export function EmptyCardImage(props) {
    return (
      <View style={[{
        //   backgroundColor:'red',
          justifyContent:'center',
          alignItems:'center',
          height:normalize(350),
          marginTop:120
      }]}>
          {/* <Text style={[Styles.fontRegular, Styles.font16]}>{(props.message) ? props.message : 'No record found'}</Text> */}
          <Image 
          style={[{
              width:45,
              height:45,
              tintColor:'#77A1D3'
          }]}
          resizeMode='contain'
          source={props.source}
          />
          <Text style={[Styles.REGULAR_16,{
            lineHeight:22,
              textAlign:'center',
              color:'#686E76',
              ...Styles.REGULAR_15,
              marginTop:15,
            }]}>
              {/* Find your singer friends */}
              Find your singer friends {'\n'} Type the full @username and press search
              {/* {props.messageOne } */}
          </Text>
          <Text tyle={[Styles.REGULAR_16,{
            lineHeight:22,
              textAlign:'center',
              color:'#686E76',
              ...Styles.REGULAR_15,
              marginTop:normalize(5),
            }]}>
              {/* Type the full @username and press search */}
              {props.messageTwo}
          </Text>
          </View>
    );
  }

  export function EmptyFbCard(props) {
    return (
      <View style={[{
        //   backgroundColor:'red',
          justifyContent:'center',
          alignItems:'center',
          height:normalize(350),
          marginTop:100
      }]}>
          {/* <Text style={[Styles.fontRegular, Styles.font16]}>{(props.message) ? props.message : 'No record found'}</Text> */}
          <Image 
          style={[{
              width:normalize(50),
              height:normalize(50),
              marginBottom:normalize(15)
              // tintColor:'#77A1D3'
          }]}
          resizeMode='contain'
          source={Images.fb_image}
          // source={props.source}
          />
          <Text style={[Styles.MEDIUM_18,{
              textAlign:'center',
              color:'#000',
              marginTop:normalize(5),
              marginBottom:normalize(10),
              lineHeight:25
            }]}>
              Find Facebook Friends
              {/* {props.messageOne} */}
          </Text>
          <Text style={[Styles.REGULAR_15,{
              textAlign:'center',
              color:'#686E76',
              marginTop:normalize(5),
              lineHeight:22,
            }]}>
              Use facebook to see who you{'\n'}  alredy know on Housetripping.
              {/* {props.messageOne} */}
          </Text>
          {/* <Text style={[Styles.REGULAR_15,{
              textAlign:'center',
              color:'#686E76',
              marginTop:normalize(5),
              lineHeight:22,
            }]}>
              {/* {props.messageOne} 
              alredy know on Housetripping.
          </Text> */}
         
          <View>
            <TouchableOpacity
            activeOpacity={0.8}
            onPress={props.onPress} style={[{
              backgroundColor:"#167AF2",
              width:RFValue(200,Contants.DesignCanvas.HEIGHT),
              height:RFValue(40,Contants.DesignCanvas.HEIGHT),
              justifyContent:"center",
              alignItems:'center',
              marginTop:normalize(15),
              borderRadius:normalize(7)
            }]}>
              <Text style={[Styles.MEDIUM_15,{
                lineHeight:22,
                color:'#FFFFFF',
              // textAlign:'center',
              // marginTop:normalize(5),
              // marginBottom:normalize(10)

            }]}>
              Connect Facebook
              {/* {props.messageOne} */}
          </Text>
            </TouchableOpacity>
          </View>
          </View>
    );
  }
  export function EmptyHomeFeedCard(props) {
    return (
      <View style={[{
        //   backgroundColor:'red',
          justifyContent:'center',
          alignItems:'center',
          height:normalize(350),
          marginTop:100
      }]}>
          {/* <Text style={[Styles.fontRegular, Styles.font16]}>{(props.message) ? props.message : 'No record found'}</Text> */}
          <Image 
          style={[{
              width:RFValue(64,Contants.DesignCanvas.HEIGHT),
              height:RFValue(64,Contants.DesignCanvas.HEIGHT),
              marginBottom:normalize(15)
              // tintColor:'#77A1D3'
          }]}
          resizeMode='contain'
          source={Images.empty_home_feed_card_demo_icon}
          // source={props.source}
          />
          <Text style={[Styles.BOLD_20,{
              textAlign:'center',
              color:'#272D37',
              marginTop:normalize(5),
              ...Styles.BOLD_20,
              // fontSize:normalize(20),
              // fontWeight:'900',
              // fontSize:normalize(24),
              marginBottom:normalize(10)
            }]}>
             The Hits are Coming.
              {/* {props.messageOne} */}
          </Text>
          <Text style={[Styles.REGULAR_15,{
              textAlign:'center',
              color:'grey',
              ...Styles.REGULAR_15,
               marginTop:normalize(5),
              // fontSize:normalize(20),
              // fontWeight:'900'
            }]}>
              Once you follow people you'll see the
              {/* {props.messageOne} */}
          </Text>
          <Text style={[Styles.REGULAR_15,{
              textAlign:'center',
              color:'grey',
              ...Styles.REGULAR_15,
              marginTop:normalize(5),
              // fontSize:normalize(20),
              // fontWeight:'900'
            }]}>
              recordings they share.
              {/* {props.messageTwo} */}
          </Text>
          <View>
            <TouchableOpacity 
            activeOpacity={0.8}
            onPress={props.onPress} style={[{
              backgroundColor:"#272D37",
              width:174,
              height:40,
              justifyContent:"center",
              alignItems:'center',
              marginTop:RFValue(20,812),
              borderRadius:8
            }]}>
              <Text style={[Styles.MEDIUM_15,{
              // textAlign:'center',
              color:'#fff',

              // marginTop:normalize(5),
              // fontSize:normalize(20),
              // fontWeight:'900',
              // fontSize:normalize(22),
              // marginBottom:normalize(10)
            }]}>
              Find people to follow
              {/* {props.messageOne} */}
          </Text>
            </TouchableOpacity>
          </View>
          </View>
    );
  }
  export function EmptyFollowingCard(props) {
    return (
      <View style={[{
        //   backgroundColor:'red',
          justifyContent:'center',
          alignItems:'center',
          height:normalize(350),
          marginTop:100
      }]}>
          {/* <Text style={[Styles.fontRegular, Styles.font16]}>{(props.message) ? props.message : 'No record found'}</Text> */}
          <Image 
          style={[{
              width:RFValue(64,Contants.DesignCanvas.HEIGHT),
              height:RFValue(64,Contants.DesignCanvas.HEIGHT),
              marginBottom:normalize(15)
              // tintColor:'#77A1D3'
          }]}
          resizeMode='contain'
          source={Images.following_empyt_icon}
          // source={props.source}
          />
          <Text style={[Styles.MEDIUM_18,{
              textAlign:'center',
              color:'#272D37',
              marginTop:normalize(5),
              // fontSize:normalize(20),
              // fontWeight:'900',
              // fontSize:normalize(24),
              marginBottom:normalize(10)
            }]}>
             People you follow
              {/* {props.messageOne} */}
          </Text>
          <Text style={[Styles.REGULAR_15,{
              textAlign:'center',
              color:'grey',
              marginTop:normalize(5),
              // fontSize:normalize(20),
              // fontWeight:'900'
            }]}>
            When you follow people, you'll see them here.
              {/* {props.messageOne} */}
          </Text>
          
         
          </View>
    );
  }