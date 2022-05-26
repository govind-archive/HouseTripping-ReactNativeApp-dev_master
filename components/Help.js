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
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
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
import { RFValue } from "react-native-responsive-fontsize";
import Contants from "../constants/Contants";
import Styles from "../constants/Styles";
import { HeaderModel, HelpScreenModel } from "./Components/NewModelView";
// import { WebView } from "react-native-webview";

export default function Help({ navigation, route, user_id }) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

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
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <LinearGradient
          colors={["#E683AF", "#7ACACB", "#77A1D3"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={[Styles.BackgroundGradient]}>
          <HeaderModel
            leftimgstyle={[{
              width: 28,
              height: 28
            }]}
            // rightimgstyle={[{
            //   width:20,
            //   height:20
            // }]}
            onPress={() => {
              navigation.goBack();
            }}
            HeaderTitle={'Help'}
            leftImage={Images.all_screen_back_black_arrow_icon}
          />
          <LinearGradient
            colors={constants.AppColor.FLEX_GRADIENT_BACK_COLOR}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[Styles.LinearGradientStyle]}>
            <ScrollView showsVerticalScrollIndicator={false} style={[Styles.customScrollview]}>
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, { flexDirection: "row" }]}>
                <View style={[{
                  ...Platform.select({
                    ios: {
                      // backgroundColor:"green",
                      height: RFValue(40, Contants.DesignCanvas.HEIGHT),
                      width: Dimensions.get('window').width / 2 + 20,
                      flexDirection: "row",
                      alignItems: "center"
                    },
                    android: {
                      // backgroundColor:"green",
                      width: Dimensions.get('window').width / 2,
                      height: RFValue(40, Contants.DesignCanvas.HEIGHT),
                      flexDirection: "row",
                      alignItems: "center"
                    }
                  })

                }]}>
                  <Image
                    source={Images.color_logo_icon}
                    style={[{
                      width: RFValue(35, Contants.DesignCanvas.HEIGHT),
                      height: RFValue(35, Contants.DesignCanvas.HEIGHT),
                    }]}
                    resizeMode="contain"

                  />
                  <Text style={[Styles.BOLD_22, { color: '#272D37', marginLeft: 5, marginTop: 5 }]}>
                    House Tripping
                  </Text>
                </View>
                <View style={[{
                  ...Platform.select({
                    ios: {
                      // backgroundColor:"yellow",
                      height: RFValue(40, Contants.DesignCanvas.HEIGHT),
                      width: Dimensions.get('window').width * 0.3544,
                      alignItems: "flex-end",
                      justifyContent: "center"
                    },
                    android: {
                      // backgroundColor:"yellow",
                      width: Dimensions.get('window').width * 0.3944,
                      height: RFValue(40, Contants.DesignCanvas.HEIGHT),
                      alignItems: "flex-end",
                      justifyContent: "center"
                    }
                  })

                }]}>
                  <TouchableOpacity onPress={() => {
                    navigation.navigate("ContactUs");
                  }}>
                    <Text style={[Styles.MEDIUM_15, { color: '#77A1D3', marginTop: 5 }]}>
                      Submit a Requrest
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, {
                flexDirection: "row", alignItems: "center",
                borderRadius: 16, marginTop: RFValue(30, Contants.DesignCanvas.HEIGHT), backgroundColor: "#fff",
              }]}>
                <Image
                  style={[{
                    width: 20,
                    height: 20,
                    marginLeft: 20
                  }]}
                  resizeMode="contain"
                  source={Images.Icon_Search}
                />
                <TextInput
                  style={[Styles.REGULAR_16, {
                    // backgroundColor:'green',
                    color: "#000",
                    width: Dimensions.get('window').width - 105,
                    height: RFValue(50, Contants.DesignCanvas.HEIGHT),
                    marginLeft: 10,
                    paddingLeft: 5
                  }]}
                  placeholder="Search"
                  placeholderTextColor={'#B3B6BA'}
                />
              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, { marginTop: RFValue(22, Contants.DesignCanvas.HEIGHT) }]}>
                <Text style={[Styles.BOLD_22, { color: '#272D37', lineHeight: 30 }]}>
                  There are many lorem of{'\n'}app in this site
                </Text>
              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, {
                marginTop: RFValue(15, Contants.DesignCanvas.HEIGHT),
                borderBottomWidth: 0.5,
                borderColor: "#E7ECF2",
              }]}>
                <Text numberOfLines={3} style={[Styles.REGULAR_16, { color: '#66737F', lineHeight: 22, }]}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
                <Text numberOfLines={3} style={[Styles.REGULAR_16, { color: '#66737F', lineHeight: 22, marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT) }]}>
                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.
                </Text>
              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, {
                marginTop: RFValue(20, Contants.DesignCanvas.HEIGHT),
                // borderBottomWidth:0.5,
                // borderColor:"#272D37",
              }]}>
                <Text numberOfLines={3} style={[Styles.BOLD_19, { color: '#77A1D3', lineHeight: 22, }]}>
                  Moments
                </Text>
                <HelpScreenModel
                  Title='How to fix sync issue on android'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='Recordings - Deleting a recordings'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='Removing myself/others form a recording'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='How to upload a beat to AutoRap (tutorial'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='Adding a Song to the Songbook'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, {
                marginTop: RFValue(20, Contants.DesignCanvas.HEIGHT),
                // borderBottomWidth:0.5,
                // borderColor:"#272D37",
              }]}>
                <Text numberOfLines={3} style={[Styles.BOLD_19, { color: '#77A1D3', lineHeight: 22, }]}>
                  Recordings
                </Text>
                <HelpScreenModel
                  Title='How to fix sync issue on android'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='Recordings - Deleting a recordings'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='Removing myself/others form a recording'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='How to upload a beat to AutoRap (tutorial'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='Adding a Song to the Songbook'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, {
                marginTop: RFValue(20, Contants.DesignCanvas.HEIGHT),
                // borderBottomWidth:0.5,
                // borderColor:"#272D37",
              }]}>
                <Text numberOfLines={3} style={[Styles.BOLD_19, { color: '#77A1D3', lineHeight: 22, }]}>
                  Uploading Content
                </Text>
                <HelpScreenModel
                  Title='How to fix sync issue on android'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='Recordings - Deleting a recordings'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='Removing myself/others form a recording'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='How to upload a beat to AutoRap (tutorial'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='Adding a Song to the Songbook'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, {
                marginTop: RFValue(20, Contants.DesignCanvas.HEIGHT),
                // borderBottomWidth:0.5,
                // borderColor:"#272D37",
              }]}>
                <Text numberOfLines={3} style={[Styles.BOLD_19, { color: '#77A1D3', lineHeight: 22, }]}>
                  Singing on House Tripping
                </Text>
                <HelpScreenModel
                  Title='How to fix sync issue on android'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='Recordings - Deleting a recordings'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='Removing myself/others form a recording'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='How to upload a beat to AutoRap (tutorial'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='Adding a Song to the Songbook'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, {
                marginTop: RFValue(20, Contants.DesignCanvas.HEIGHT),
                // borderBottomWidth:0.5,
                // borderColor:"#272D37",
              }]}>
                <Text numberOfLines={3} style={[Styles.BOLD_19, { color: '#77A1D3', lineHeight: 22, }]}>
                  Video on HouseTripping
                </Text>
                <HelpScreenModel
                  Title='How to fix sync issue on android'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='Recordings - Deleting a recordings'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='Removing myself/others form a recording'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='How to upload a beat to AutoRap (tutorial'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='Adding a Song to the Songbook'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, {
                marginTop: RFValue(20, Contants.DesignCanvas.HEIGHT),
                // borderBottomWidth:0.5,
                // borderColor:"#272D37",
              }]}>
                <Text numberOfLines={3} style={[Styles.BOLD_19, { color: '#77A1D3', lineHeight: 22, }]}>
                  Friends and Followers
                </Text>
                <HelpScreenModel
                  Title='How to fix sync issue on android'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='Recordings - Deleting a recordings'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='Removing myself/others form a recording'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='How to upload a beat to AutoRap (tutorial'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='Adding a Song to the Songbook'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, {
                marginTop: RFValue(20, Contants.DesignCanvas.HEIGHT),
                // borderBottomWidth:0.5,
                // borderColor:"#272D37",
              }]}>
                <Text numberOfLines={3} style={[Styles.BOLD_19, { color: '#77A1D3', lineHeight: 22, }]}>
                  Messaging and Comments
                </Text>
                <HelpScreenModel
                  Title='How to fix sync issue on android'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='Recordings - Deleting a recordings'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='Removing myself/others form a recording'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='How to upload a beat to AutoRap (tutorial'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='Adding a Song to the Songbook'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, {
                marginTop: RFValue(20, Contants.DesignCanvas.HEIGHT),
                // borderBottomWidth:0.5,
                // borderColor:"#272D37",
              }]}>
                <Text numberOfLines={3} style={[Styles.BOLD_19, { color: '#77A1D3', lineHeight: 22, }]}>
                  How to Use Search
                </Text>
                <HelpScreenModel
                  Title='How to fix sync issue on android'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='Recordings - Deleting a recordings'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='Removing myself/others form a recording'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='How to upload a beat to AutoRap (tutorial'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
                <HelpScreenModel
                  Title='Adding a Song to the Songbook'
                  source={Images.grey_next}
                  onPress={() => { alert('working.....') }}
                />
              </View>
              {/* /*************************section code end************************* */}

            </ScrollView>
          </LinearGradient>
        </LinearGradient>
        {/* </TouchableWithoutFeedback> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  customHeader: {
    ...Platform.select({
      ios: {},
      android: {
        marginTop: 30,
      },
      default: {},
    }),
  },
  customScrollview: {
    ...Platform.select({
      ios: {
        marginTop: -20,
        marginBottom: 10
      },
      android: {
        marginTop: 0,
      },
      default: {
        marginTop: -20,
      },
    }),
  },
  heading_top: {
    ...Styles.BOLD_20,
    color: "#FFF",
    marginTop: 30,
    justifyContent: "center",
    textAlign: "center",
    flex: 1,
    marginLeft: -50,
  },
  Flex_View_Style: {
    flex: 1,
    // height:'100%',
    borderTopLeftRadius: normalize(50),
    borderTopRightRadius: normalize(50),
    // backgroundColor: "red",
    // marginBottom:normalize(30),
  },
  Linear_Gradient_Style: {
    height: "100%",
    paddingTop: 10,
    borderTopLeftRadius: normalize(50),
    borderTopRightRadius: normalize(50),
  },
  same_container_view: {
    justifyContent: "space-between",
    flexDirection: "row",
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
});
