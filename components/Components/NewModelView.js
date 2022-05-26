import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Picker,
  TextInput,
  Modal,
  Dimensions,
  Platform
} from 'react-native';
import Images from '../../assets/Images';
import { RFValue } from 'react-native-responsive-fontsize';
import Contants from '../../constants/Contants';
import Styles from '../../constants/Styles';
import normalize from 'react-native-normalize';
import { scale } from 'react-native-size-matters';

//************************************HelpScreenModel code start***********************************************/
export function HelpScreenModel(props) {
  return (
    <View style={props.MainVeiwStyle, styles.MainVeiwStyle}>
      <View style={props.TextViewStyle, styles.TextViewStyle}>
        <Text numberOfLines={1} style={props.TextStyle, styles.TextStyle}>
          {props.Title}
        </Text>
      </View>
      <TouchableOpacity onPress={props.onPress}>
        <Image
          style={props.ImageStyle, styles.ImageStyle}
          resizeMode="contain"
          source={props.source}
        />
      </TouchableOpacity>
    </View>


  );
}
//************************************HelpScreenModel code end***********************************************/
//************************************HeaderModel code start***********************************************/
export function HeaderModel(props) {
  return (
    <View style={[Styles.HeaderMainView]}>
      <View style={[Styles.HeaderRowView]}>
        <TouchableOpacity
          onPress={props.onPress}
        >
          <Image
            style={[props.leftimgstyle, {
              tintColor: "#FFF",
              marginLeft: 15
            }]}
            resizeMode='contain'
            source={props.leftImage}
          />
        </TouchableOpacity>
        <Text style={[Styles.BOLD_20, props.TitleStyle, { color: "#FFFFFF", lineHeight: 28, }]}>{props.HeaderTitle}</Text>
        <TouchableOpacity
          onPress={props.RightPress}
        >
          <Image
            style={[props.rightimgstyle, {
              tintColor: "#FFF",
              marginRight: 20
            }]}
            resizeMode='contain'
            source={props.rightImage}
          />
        </TouchableOpacity>
      </View>
    </View>


  );
}
//************************************HeaderModel code end***********************************************/
//************************************NewIconHeaderModel code start***********************************************/
export function NewIconHeaderModel(props) {
  return (
    <View style={[Styles.HeaderMainView]}>
      <View style={[Styles.HeaderRowView]}>
        <TouchableOpacity
          onPress={props.onPressOne}
        >
          <Image
            style={[props.sourceonestyle, {
              marginLeft: 20,
              tintColor: "#FFF",
            }]}
            resizeMode='contain'
            source={props.sourceOne}
          />
        </TouchableOpacity>
        <Text style={[Styles.BOLD_20, props.TitleStyle, { color: "#FFFFFF", lineHeight: 28, marginLeft: 15 }]}>{props.HeaderTitle}</Text>
        <View style={[{
          // backgroundColor:'black', 
          height: RFValue(40, Contants.DesignCanvas.HEIGHT),
          flexDirection: "row",
          alignItems: "center",
          //  justifyContent:'space-between'
        }]}>

          <TouchableOpacity
            onPress={props.onPressTwo}
          >
            <Image
              style={[props.sourcerightstyle, {
                tintColor: "#FFF",
              }]}
              resizeMode='contain'
              source={props.sourceTwo}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={props.onPressThree}
          >
            <Image
              style={[props.sourcerightstyle, {
                tintColor: "#FFF",
                marginLeft: 15,
                marginRight: 20
              }]}
              resizeMode='contain'
              source={props.sourceThree}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>


  );
}
//************************************NewIconHeaderModel code end***********************************************/
//************************************ContactUsScreenModel code start***********************************************/
export function ContactUsScreenModel(props) {
  return (
    <Modal
      transparent={props.transparent}
      visible={props.visible}
      onRequestClose={props.onRequestClose}
      style={props.model_style}
    // transparent={true}
    // visible={show}
    // onRequestClose={() => {
    //     setShow(false)
    // }}
    >
      <View style={[{
        ...Platform.select({
          ios: {
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            justifyContent: "flex-end",
            height: Dimensions.get('window').height,
            // backgroundColor: "red",
            // alignItems: 'center',
            // padding: 5,
            // marginBottom:normalize(15)
          },
          android: {
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            justifyContent: "flex-end",
            height: Dimensions.get('window').height - 10,
            // backgroundColor: "red",
            // alignItems: 'center',
            // padding: 5,
            // marginBottom:normalize(15)
          },
        })
      }]}>
        <View style={[{
          ...Platform.select({
            ios: {
              backgroundColor: "#fff",
              borderTopLeftRadius: normalize(25),
              borderTopRightRadius: normalize(25),
              borderColor: "#fff",
              borderWidth: 2,
              height: Dimensions.get("window").height * 0.3769,
              alignItems: "center"
              // height: '40%',
              // width: normalize(300),
              // justifyContent: "center",
            },
            android: {
              backgroundColor: "#fff",
              borderTopLeftRadius: normalize(25),
              borderTopRightRadius: normalize(25),
              borderColor: "#fff",
              borderWidth: 2,
              height: Dimensions.get("window").height * 0.4169,
              alignItems: "center",
              // height: '40%',
              // width: normalize(300),
              // justifyContent: "center",
            },
          })
        }]}>
          {/* /*************************section code start************************* */}
          <View style={[Styles.SameContainerStyle, { marginTop: RFValue(30, Contants.DesignCanvas.HEIGHT), alignItems: 'center' }]}>
            <Image
              style={[{
                width: 65,
                height: 65
              }]}
              resizeMode="contain"
              source={Images.Right_green_image}
            />
          </View>
          {/* /*************************section code end************************* */}
          {/* /*************************section code start************************* */}
          <View style={[Styles.SameContainerStyle, { marginTop: RFValue(17, Contants.DesignCanvas.HEIGHT), alignItems: 'center' }]}>
            <Text style={[Styles.BOLD_22, { color: "#272D37", lineHeight: 28, textAlign: 'center' }]}>Your Request has{'\n'} been submitted</Text>
          </View>
          {/* /*************************section code end************************* */}
          {/* /*************************section code start************************* */}
          <View style={[Styles.SameContainerStyle, { marginTop: RFValue(12, Contants.DesignCanvas.HEIGHT), alignItems: 'center' }]}>
            <Text style={[Styles.REGULAR_14, { color: "#686E76", lineHeight: 22, textAlign: 'center' }]}>Are you sure you would like to report this recording{'\n'} as inappropriate?</Text>
          </View>
          {/* /*************************section code end************************* */}
          {/* /*************************section code start************************* */}
          <View style={[Styles.SameContainerStyle, { marginTop: RFValue(12, Contants.DesignCanvas.HEIGHT), alignItems: 'center' }]}>
            <TouchableOpacity onPress={props.onPress}
              activeOpacity={0.8}
              style={[{
                width: RFValue(150, Contants.DesignCanvas.HEIGHT),
                height: RFValue(50, Contants.DesignCanvas.HEIGHT),
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#272D37",
                borderRadius: 16,
              }]}>
              <Text style={[Styles.MEDIUM_16, { color: "#fff", lineHeight: 22, }]}>Done</Text>
            </TouchableOpacity>

          </View>
          {/* /*************************section code end************************* */}
        </View>
      </View>
    </Modal>

  );
}
//************************************ContactUsScreenModel code end***********************************************/








const styles = StyleSheet.create({
  MainVeiwStyle: {
    ...Platform.select({
      ios: {
        // backgroundColor:"green",
        marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT),
        width: Dimensions.get('window').width - 30,
        height: RFValue(27, Contants.DesignCanvas.HEIGHT),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      },
      android: {
        // backgroundColor:"green",
        marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT),
        width: Dimensions.get('window').width - 35,
        height: RFValue(25, Contants.DesignCanvas.HEIGHT),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }
    })

  },
  TextViewStyle: {
    ...Platform.select({
      ios: {
        // backgroundColor:"yellow",
        // marginTop:RFValue(15,Contants.DesignCanvas.HEIGHT),
        width: Dimensions.get('window').width - 100,
        height: RFValue(27, Contants.DesignCanvas.HEIGHT),
        justifyContent: "center",
      },
      android: {
        // backgroundColor:"yellow",
        // marginTop:RFValue(15,Contants.DesignCanvas.HEIGHT),
        width: Dimensions.get('window').width - 120,
        height: RFValue(25, Contants.DesignCanvas.HEIGHT),
        justifyContent: "center",
      }
    })

  },
  TextStyle: {
    ...Styles.REGULAR_17,
    color: '#272D37',
    lineHeight: 20,
  },
  ImageStyle: {
    width: 15,
    height: 15,
    tintColor: "#272D37"
  },

})