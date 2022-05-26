import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  FlatList,
  Platform,
  useWindowDimensions,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import apiDetails from "../api/AllApis";
import Svg, { Path, G } from "react-native-svg";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { NormalHeader } from "./Components/customHeader";
import Images from "../assets/Images";
import constants from "../assets/constants";
import normalize from "react-native-normalize";
import { FlexView } from "./Components/FlexView";
import { TextInputBox } from "./Components/TextInputBox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RFValue } from "react-native-responsive-fontsize";
import Contants from "../constants/Contants";
import Styles from "../constants/Styles";
import { HeaderModel } from "./Components/NewModelView";

export default function ContactInformation({ navigation, route, user_id }) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [userData, setUserData] = useState({
    address: "",
    email: "",
    phone: "",
  });

  AsyncStorage.getItem("userInfo").then((user) => {
    if (user) {
      var d = JSON.parse(user);
      let a = new apiDetails(d.token);
      a.api.get(a.contact_information).then((response) => {
        // console.log(response);
        // setDataTest(false);
        if (response.data.status == "200") {
          console.log("===========>RESPONSE=============", response.data.data);
           setUserData(response.data.data)          
          // console.log("============USER DATA", userData);
        } else {
          console.log("Something went wrong...");
            // alert("Something went wrong...");
        }
      });
    }
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        animated={true}
        translucent
        backgroundColor="transparent"
        barStyle={"light-content"}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[Styles.customScrollview]}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <LinearGradient
            colors={["#E683AF", "#7ACACB", "#77A1D3"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={[Styles.BackgroundGradient]}>
              <HeaderModel
            onPress={() => {
              navigation.goBack();
            }}
            HeaderTitle={'Contact Information'}
            leftImage={Images.new_back_icon}
           /> 
           <LinearGradient
              colors={constants.AppColor.FLEX_GRADIENT_BACK_COLOR}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[Styles.LinearGradientStyle]}>
                 <ScrollView showsVerticalScrollIndicator={false} style={[Styles.customScrollview]}>
                {/* /*************************section code start************************* */}
                <View style={[Styles.SameContainerStyle]}>
                  <Text style={[Styles.BOLD_22, { color: '#272D37', lineHeight: 30 }]}>
                    Contact Us
                  </Text>
                </View>
                {/* /*************************section code end************************* */}
                {/* /*************************section code start************************* */}
                <View style={[Styles.SameContainerStyle,{marginTop:RFValue(20,Contants.DesignCanvas.HEIGHT)}]}>
                <Text style={[Styles.MEDIUM_16, { color: '#272D37', lineHeight: 23, }]}>
                  If you have any questions about this Privacy Policy, You can contact us:
                  </Text>
                </View>
                {/* /*************************section code end************************* */}
                {/* /*************************section code start************************* */}
                <View style={[Styles.SameContainerStyle,{marginTop:RFValue(25,Contants.DesignCanvas.HEIGHT)}]}>
                <LinearGradient
            colors={["#E683AF", "#7ACACB", "#77A1D3"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={[{
              ...Platform.select({
                ios: {
                  // backgroundColor: "red",
                  // marginTop: RFValue(15, Contants.DesignCanvas.HEIGHT),
                  width: Dimensions.get('window').width - 30,
                  height:RFValue(352,Contants.DesignCanvas.HEIGHT),
                  borderRadius:16,
                  justifyContent:"space-evenly",
                  // paddingBottom: 5
          
          
                },
                android: {
                  // backgroundColor: "red",
                  // marginTop: RFValue(15, Contants.DesignCanvas.HEIGHT),
                  width: Dimensions.get('window').width - 35,
                  height:RFValue(352,Contants.DesignCanvas.HEIGHT),
                  borderRadius:16,
                  justifyContent:"space-evenly",
                  // paddingBottom: 5
          
                }
              })
            }]}>
              <View style={[{
                // marginTop:15,
                // backgroundColor:'green',
                 width: Dimensions.get('window').width - 30,
                justifyContent:"center",
                alignItems:"center"
              }]}>
                <Image
                style={[{
                  width:32,
                  height:32
                }]}
                resizeMode="contain"
                source={Images.location}
                />
                <Text style={[Styles.REGULAR_16,{color:'#fff', lineHeight:22,marginTop:20}]}>{userData.address}</Text>
              </View>
              <View style={[{
                // marginTop:15,
                 width: Dimensions.get('window').width - 30,
                justifyContent:"center",
                alignItems:"center"
              }]}>
                <Image
                style={[{
                  width:32,
                  height:32
                }]}
                resizeMode="contain"
                source={Images.email}
                />
                <Text style={[Styles.REGULAR_16,{color:'#fff', lineHeight:22,marginTop:20}]}>{userData.email}</Text>
              </View>
              <View style={[{
                // marginTop:15,
                 width: Dimensions.get('window').width - 30,
                justifyContent:"center",
                
                alignItems:"center"
              }]}>
                <Image
                style={[{
                  width:32,
                  height:32
                }]}
                resizeMode="contain"
                source={Images.phone_call}
                />
                <Text style={[Styles.REGULAR_16,{color:'#fff', lineHeight:22,marginTop:20}]}>{userData.phone}</Text>
              </View>
              </LinearGradient>
                </View>
                {/* /*************************section code end************************* */}
  
               {/* /*************************section code end************************* */ }
                </ScrollView>
            </LinearGradient>
        </LinearGradient>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  Flex_View_Style: {
    flex: 1,
    // height:'100%',
    borderTopLeftRadius: normalize(50),
    borderTopRightRadius: normalize(50),
    backgroundColor: "red",
    // marginBottom:normalize(30),
  },
  Linear_Gradient_Style: {
    height: "100%",
    paddingTop: 10,
    borderTopLeftRadius: normalize(50),
    borderTopRightRadius: normalize(50),
  },
  same_container_view: {
    flexDirection: "column",
  },
  lable_text_style: {
    fontSize: normalize(20),
  },
  row_container_style: {
    flexDirection: "row",
    // backgroundColor:'red'
  },
  inner_row_view_style: {
    // backgroundColor:'green',
    width: normalize(172),
  },
  box_style_view: {
    backgroundColor: "#F7EFFA",
    borderRadius: normalize(20),
    height: normalize(180),
    borderColor: "#FEFAF9",
    borderWidth: normalize(2),
    //   elevation:0.1
  },
  box_inner_style_view: {
    //   backgroundColor:'green',
    marginHorizontal: normalize(15),
    flexDirection: "row",
    justifyContent: "space-between",
    height: normalize(40),
    marginVertical: normalize(10),
    alignItems: "center",
    borderBottomWidth: normalize(3),
    borderColor: "#FEFAF9",
    paddingHorizontal: normalize(10),
  },
  signup: {
    backgroundColor: "#F7EFFA",
    borderRadius: 10,
    marginLeft: 40,
    marginRight: 40,
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  contact_us_textStyle: {
    fontSize: normalize(22),
    paddingTop: normalize(15),
    fontWeight: "600",
  },
  contact_us_subTitle_textStyle: {
    fontSize: normalize(16),
    marginTop: normalize(10),
    fontWeight: "400",
  },
  view_contact_us: {
    borderRadius: 16,
    marginTop: normalize(22),
    alignSelf: "center",
    width: "100%",
    height: "80%",
  },
  view_contact_us_location: {
    alignSelf: "center",
  },
  lable_contact_us_location: {
    alignSelf: "center",
    color: "white",
    marginTop: normalize(21),
  },
  lable_contact_us: {
    alignSelf: "center",
    color: "white",
    marginTop: normalize(21),
  },
  lable_contact_uss: {
    color: "black",
    marginTop: normalize(21),
  },
  view_image_contact: {
    width: 40,
    height: 40,
    alignSelf: "center",
  },
  view_email_us: {
    borderRadius: 16,
    marginTop: normalize(30),
    alignSelf: "center",
    width: "100%",
    height: "80%",
  },
  view_contact_us_email: {
    alignSelf: "center",
  },
  lable_contact_us_email: {
    alignSelf: "center",
    color: "white",
    marginTop: normalize(21),
  },
  view_image: {
    width: 35,
    height: 35,
    marginTop: normalize(40),
    alignSelf: "center",
  },
  view_image_location: {
    width: 40,
    height: 40,
    marginTop: normalize(20),
    alignSelf: "center",
  },
});
