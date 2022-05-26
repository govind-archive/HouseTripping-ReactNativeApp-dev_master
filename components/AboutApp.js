import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  PlatformColor,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NormalHeader } from "./Components/customHeader";
import Images from "../assets/Images";
import normalize from "react-native-normalize";
import constants from "../assets/constants";
import { TextInputBox, TextInputDescription } from "./Components/TextInputBox";
import Styles from "../constants/Styles";
import { RFValue } from "react-native-responsive-fontsize";
import Contants from "../constants/Contants";
export default function AboutApp({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          colors={["#E683AF", "#7ACACB", "#77A1D3"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            ...Platform.select({
              ios:{
                marginTop:RFValue(-50,Contants.DesignCanvas.HEIGHT),
                height: Dimensions.get('window').height*0.6656,
                borderRadius:32,
                alignItems:"center"
              },
              android:{
                height: "70%",
                borderBottomLeftRadius: 32,
                borderBottomRightRadius: 32,
                alignItems:"center"
              }
            })
          
          }}
        >
          <StatusBar
            animated={true}
            translucent
            backgroundColor="transparent"
            barStyle={"light-content"}
          />
            <View style={[{
                ...Platform.select({
                  ios:{
                    // backgroundColor:'red',
              width:Dimensions.get('window').width*0.8953,
              height:RFValue(30,Contants.DesignCanvas.HEIGHT),
              marginTop:RFValue(70,Contants.DesignCanvas.HEIGHT),
                  },
                  android:{
                    // backgroundColor:'red',
                    width:Dimensions.get('window').width*0.8953,
                    height:RFValue(30,Contants.DesignCanvas.HEIGHT),
                    marginTop:RFValue(60,Contants.DesignCanvas.HEIGHT),
                  }
                })
             
            }]}> 
              <TouchableOpacity onPress={()=>{navigation.goBack()}} >
              <Image
              style={[{
                width:28,
                height:28,
                tintColor:'#fff'
              }]}
              resizeMode="contain"
              source={Images.all_screen_back_black_arrow_icon} 
              />
              </TouchableOpacity>
            </View>

             {/* <NormalHeader onPress={()=>{navigation.goBack()}} source={Images.back_icon} />  */}
          <View style={[{
            // backgroundColor:"red",
            width:Dimensions.get('window').width*0.8953,
            height:RFValue(200,Contants.DesignCanvas.HEIGHT),
            // justifyContent:"center",
            alignItems:"center",
            marginTop:RFValue(140,Contants.DesignCanvas.HEIGHT),
            
          }]}>
         
             <Image
                 source={Images.logo}
                 style={[{
                   width:RFValue(170,Contants.DesignCanvas.HEIGHT),
                  height:RFValue(112,Contants.DesignCanvas.HEIGHT),
                
                 }]}
                 resizeMode={'contain'}
               />
           
          </View>
        </LinearGradient>
        <View
          style={{
            // backgroundColor:"red",
            height: "28%",
            justifyContent: "center",
            alignItems: "center",
            marginTop:10
          }}
        >
          <Text
            style={[Styles.BOLD_22,{
              alignSelf: "center",
              color:"#272D37"
              // fontSize: normalize(22),
              // fontWeight: "600",
            }]}
          >
            House Tripping
          </Text>
          <Text
            style={[Styles.REGULAR_15,{
              alignSelf: "center",
              marginTop: normalize(15),
              color: "#66737F",
            }]}
          >
            @2021-2022 HouseTripping Inc
          </Text>
          <View>
            <Text
              style={[Styles.REGULAR_15,{
                alignSelf: "center",
                marginTop: normalize(20),
                color: "#66737F",
              }]}
            >
              Version
            </Text>
            <Text
              style={[Styles.REGULAR_15,{
                alignSelf: "center",
                marginTop: normalize(10),
                color: "#66737F",
              }]}
            >
              1.1.19
            </Text>
          </View>
        </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Flex_View_Style: {
    flex: 1,
    // height:'100%',

    // marginBottom:normalize(30),
  },
  customScrollview: {
    ...Platform.select({
      ios: {
        marginTop: -20,
      },
      android: {
        marginTop: 0,
      },
      default: {
        marginTop: -20,
      },
    }),
  },
  Linear_Gradient_Style: {
    height: "100%",
    paddingTop: 10,
    borderTopLeftRadius: normalize(50),
    borderTopRightRadius: normalize(50),
  },
  imageStyle:{
    width:'50%',
     height:'65%',
    alignSelf:'center',
    justifyContent:'center'
  }
});
