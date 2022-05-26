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
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import apiDetails from "../api/AllApis";
import Svg, { Path, G } from "react-native-svg";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { NormalHeader } from "./Components/customHeader";
import Images from "../assets/Images";
import normalize from "react-native-normalize";
import { FlexView } from "./Components/FlexView";
import { TextInputBox } from "./Components/TextInputBox";
import { HeaderModel, HelpScreenModel } from "./Components/NewModelView";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Styles from '../constants/Styles';
import Constant from '../constants/Contants';
import { InputBox, InputCard } from "./Components/InputBox";
import constants from "../assets/constants";
import { RFValue } from "react-native-responsive-fontsize";
export default function PaymentMethod({ navigation, route, user_id }) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [cardNumber, setCardNumber] = useState(null);
  const [cardHolderName, setCardHolderName] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [cvvNumber, setCvvNumber] = useState(null);

  return (
    // <SafeAreaView
    //   style={[
    //     {
    //       flex: 1,
    //       ...Platform.select({
    //         ios: {
    //           marginTop: -20,
    //         },
    //         android: {
    //           marginTop: 0,
    //         },
    //         default: {},
    //       }),
    //       // backgroundColor:'red'
    //     },
    //   ]}
    // >
    //   <LinearGradient
    //     colors={["#E683AF", "#7ACACB", "#77A1D3"]}
    //     start={{ x: 1, y: 0 }}
    //     end={{ x: 0, y: 0 }}
    //     style={{ height: "100%" }}
    //   >
    //     <StatusBar
    //       animated={true}
    //       translucent
    //       backgroundColor="transparent"
    //       barStyle={"light-content"}
    //     />
    //     <View
    //       style={[
    //         {
    //           marginTop: 10,
    //         },
    //         { height: "10%", width: "100%", flexDirection: "row" },
    //       ]}

    //     >
    //       <TouchableOpacity style={{ marginTop: 3 }} onPress={() => {
    //         navigation.goBack();
    //       }}>
    //         <Image
    //           style={{
    //             width: 20,
    //             height: 20,
    //             margin: 20,
    //             tintColor: "#FFF",
    //           }}
    //           source={Images.cross_white}
    //         />
    //       </TouchableOpacity>

    //       <Text style={styles.heading_top}>Payment method</Text>
    //     </View>

    //     <View style={styles.lower_view}>
    //       <LinearGradient
    //         colors={["#F7EFFA", "#FEFAF9"]}
    //         start={{ x: 1, y: 0 }}
    //         end={{ x: 0, y: 1 }}
    //         style={{
    //           height: "100%",
    //           paddingBottom: "20%",
    //           borderTopRightRadius: 25,
    //           borderTopLeftRadius: 25,
    //           borderRadius: 25,
    //           borderBottomLeftRadius: 0,
    //           borderBottomRightRadius: 0,
    //         }}
    //       >
    //         <ScrollView showsVerticalScrollIndicator={false}>
    //           <View
    //             style={[
    //               {
    //                 // backgroundColor:'red',
    //                 marginHorizontal: normalize(20),
    //                 marginTop: normalize(25),
    //                 marginBottom: normalize(20),
    //               },
    //             ]}
    //           >
    //             <View style={[styles.same_container_view]}>
    //               <Text style={[styles.lable_text_style]}>Card Number</Text>
    //               <TextInputBox
    //                 keyboardType="numeric"
    //                 placeholder="Enter Card Number"
    //               />
    //             </View>
    //             <View style={[styles.same_container_view]}>
    //               <Text style={[styles.lable_text_style]}>Cardholder Name</Text>
    //               <TextInputBox placeholder="Card Holder Name" />
    //             </View>
    //             <View style={[styles.same_container_view]}>
    //               <View style={[styles.row_container_style]}>
    //                 <View style={[styles.inner_row_view_style]}>
    //                   <Text style={[styles.lable_text_style]}>Expiry Date</Text>
    //                 </View>
    //                 <View style={[styles.inner_row_view_style]}>
    //                   <Text style={[styles.lable_text_style]}>CVV</Text>
    //                 </View>
    //               </View>
    //               <View style={[styles.row_container_style]}>
    //                 <View style={[styles.inner_row_view_style]}>
    //                   <TextInputBox
    //                     Input_Box_Style={{ width: normalize(150) }}
    //                     keyboardType="numeric"
    //                     placeholder="Expiry Date"
    //                   />
    //                 </View>
    //                 <View style={[styles.inner_row_view_style]}>
    //                   <View
    //                     style={[
    //                       {
    //                         flexDirection: "row",
    //                         backgroundColor: "#fff",
    //                         justifyContent: "space-between",
    //                         alignItems: "center",
    //                         borderRadius: normalize(20),
    //                         marginTop: normalize(10),
    //                       },
    //                     ]}
    //                   >
    //                     <TextInput
    //                       style={[
    //                         {
    //                           // backgroundColor:'green',
    //                           width: normalize(120),
    //                           height: normalize(55),
    //                           paddingLeft: normalize(10),
    //                         },
    //                       ]}
    //                       keyboardType="numeric"
    //                       placeholder="CVV"
    //                     />
    //                     <Image
    //                       style={[{ marginRight: normalize(15) }]}
    //                       source={Images.Icon_feather_credit_card}
    //                     />
    //                   </View>
    //                 </View>
    //               </View>
    //             </View>
    //             <View style={[styles.same_container_view]}>
    //               <Text style={[styles.lable_text_style]}>PinCode</Text>
    //               <TextInputBox
    //                 keyboardType="numeric"
    //                 placeholder="Enter PinCode"
    //               />
    //             </View>
    //             <View style={[styles.same_container_view]}>
    //               <Text style={[styles.lable_text_style]}>Email address</Text>
    //               <TextInputBox
    //                 keyboardType="email-address"
    //                 placeholder="Enter Email"
    //               />
    //             </View>
    //             <View style={[styles.box_style_view]}>
    //               <View style={[styles.box_inner_style_view]}>
    //                 <Text style={[styles.lable_text_style, { fontSize: 16 }]}>
    //                   8,33 $ per month X 12 months
    //                 </Text>
    //                 <Text style={[styles.lable_text_style, { fontSize: 16 }]}>
    //                   99,99 $
    //                 </Text>
    //               </View>
    //               <View style={[styles.box_inner_style_view]}>
    //                 <Text style={[styles.lable_text_style, { fontSize: 16 }]}>
    //                   Tax :
    //                 </Text>
    //                 <Text style={[styles.lable_text_style, { fontSize: 16 }]}>
    //                   --
    //                 </Text>
    //               </View>
    //               <View style={[styles.box_inner_style_view]}>
    //                 <Text style={[styles.lable_text_style, { fontSize: 16 }]}>
    //                   Total :
    //                 </Text>
    //                 <Text style={[styles.lable_text_style, { fontSize: 16 }]}>
    //                   --
    //                 </Text>
    //               </View>
    //             </View>

    //             <View
    //               style={[
    //                 {
    //                   marginTop: normalize(20),
    //                   marginHorizontal: normalize(25),
    //                 },
    //               ]}
    //             >
    //               <Text
    //                 style={[
    //                   {
    //                     color: "#66737F",
    //                     fontSize: normalize(12),
    //                   },
    //                 ]}
    //                 numberOfLines={3}
    //               >
    //                 Lorem Ipsum has been the industry's standard dummy text ever
    //                 since the 1500s, when an unknown printer took a galley of
    //                 type and scrambled it to make a type specimen book. It has
    //                 survived not only five centuries, but also the leap into
    //                 electronic typesetting, remaining essentially unchanged.
    //               </Text>
    //             </View>
    //             <View
    //               style={[
    //                 {
    //                   marginTop: normalize(20),
    //                 },
    //               ]}
    //             >
    //               <TouchableOpacity>
    //                 <LinearGradient
    //                   style={[
    //                     {
    //                       width: "100%",
    //                       justifyContent: "center",
    //                       alignItems: "center",
    //                       height: normalize(60),
    //                       borderRadius: normalize(20),
    //                     },
    //                   ]}
    //                   colors={constants.AppColor.LINEAR_GRADIENT_COLOR_BUTTON}
    //                   start={{ x: 1, y: 0 }}
    //                   end={{ x: 0, y: 1 }}
    //                 >
    //                   <Text
    //                     style={[
    //                       {
    //                         color: "#fff",
    //                         fontSize: normalize(15),
    //                       },
    //                     ]}
    //                   >
    //                     Buy Now
    //                   </Text>
    //                 </LinearGradient>
    //               </TouchableOpacity>
    //             </View>
    //             <TouchableOpacity onPress={()=>{
    //                 alert("Google account needed to setup")
    //             }}>
    //               <View
    //                 style={[
    //                   {
    //                     justifyContent: "center",
    //                     alignItems: "center",
    //                     marginTop: normalize(15),
    //                   },
    //                 ]}
    //               >
    //                 <Text
    //                   style={[
    //                     {
    //                       fontSize: normalize(15),
    //                       color: "#7ACACB",
    //                     },
    //                   ]}
    //                 >
    //                   Buy with Google Play instead
    //                 </Text>
    //               </View>
    //             </TouchableOpacity>
    //           </View>
    //         </ScrollView>
    //       </LinearGradient>
    //     </View>
    //   </LinearGradient>
    // </SafeAreaView>

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
              HeaderTitle={'Payment method'}
              leftImage={Images.cross_white}
            />
            <LinearGradient
              colors={constants.AppColor.FLEX_GRADIENT_BACK_COLOR}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[Styles.LinearGradientStyle]}>
              <ScrollView showsVerticalScrollIndicator={false} style={[Styles.customScrollview]}>
                {/* /*************************section code start************************* */}
                <View style={[Styles.SameContainerStyle]}>
                  <View>
                    <InputBox
                      InputStyle={[
                        Styles.REGULAR_15,
                        {
                          height: 50,

                          backgroundColor: 'red'
                        },
                      ]}
                      titleStyle={{ ...Styles.REGULAR_15,color:'#272D37'}}
                      name="Card Number"
                      placeholder="Enter card number"
                      value={cardNumber}
                      keyboardType={'email-address'}
                      onChangeText={userCardNumber => setCardNumber(userCardNumber)}
                      placeholderTextColor={'#20272B80'}
                    />
                  </View>
                  <View style={{ marginTop: verticalScale(15, Constant.DesignCanvas.HEIGHT) }}>
                    <InputBox
                      InputStyle={[
                        Styles.REGULAR_15,
                        {
                          height: 50,

                          backgroundColor: 'red'
                        },
                      ]}
                      titleStyle={{ ...Styles.REGULAR_15,color:'#272D37'}}
                      name="Cardholder Name"
                      placeholder="Enter Cardholder Name"
                      value={cardHolderName}
                      keyboardType={'email-address'}
                      onChangeText={useCardHolderName => setCardHolderName(useCardHolderName)}
                      placeholderTextColor={'#20272B80'}
                    />
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ marginTop: verticalScale(15, Constant.DesignCanvas.HEIGHT), width: Dimensions.get('window').width * 0.4253 }}>
                      <InputBox
                        InputStyle={[
                          Styles.REGULAR_15,
                          {
                            height: 50,
                            justifyContent: 'space-between'
                          },
                        ]}
                        titleStyle={{ ...Styles.REGULAR_15,color:'#272D37'}}
                        name="Expiry Date"
                        placeholder="Enter Expiry Date"
                        value={expiryDate}
                        keyboardType={'numeric'}
                        onChangeText={userExpiryDate => setExpiryDate(userExpiryDate)}
                        placeholderTextColor={'#20272B80'}
                      />
                    </View>
                    <View style={{ marginTop: verticalScale(15, Constant.DesignCanvas.HEIGHT), width: Dimensions.get('window').width * 0.4253 }}>
                      <InputCard
                        InputCvvStyle={[
                          Styles.REGULAR_15,
                          {
                            height: 50,

                          },
                        ]}
                        titleStyle={{ ...Styles.REGULAR_15,color:'#272D37'}}
                        name="CVV"
                        placeholder="Enter CVV"
                        value={cardHolderName}
                        keyboardType={'numeric'}
                        onChangeText={userCvvNumber => setCvvNumber(userCvvNumber)}
                        placeholderTextColor={'#20272B80'}
                        source={Images.Icon_credit_card}
                        imgStyle={{ width: scale(20), height: scale(20), marginRight: moderateScale(10) }}
                      />
                    </View>
                  </View>
                  <View style={{ marginTop: verticalScale(15, Constant.DesignCanvas.HEIGHT) }}>
                    <InputBox
                      InputStyle={[
                        Styles.REGULAR_15,
                        {
                          height: 50,
                          justifyContent: 'space-between'
                        },
                      ]}
                      titleStyle={{ ...Styles.REGULAR_15,color:'#272D37'}}
                      name="Pincode"
                      placeholder="Enter Pincode"
                      value={expiryDate}
                      keyboardType={'numeric'}
                      onChangeText={userExpiryDate => setExpiryDate(userExpiryDate)}
                      placeholderTextColor={'#20272B80'}
                    />
                  </View>
                  <View style={{ marginTop: verticalScale(15, Constant.DesignCanvas.HEIGHT) }}>
                    <InputBox
                      InputStyle={[
                        Styles.REGULAR_15,
                        {
                          height: 50,
                          justifyContent: 'space-between'
                        },
                      ]}
                      titleStyle={{ ...Styles.REGULAR_15,color:'#272D37'}}
                      name="Email address"
                      placeholder="Enter Email address"
                      value={expiryDate}
                      keyboardType={'email-address'}
                      onChangeText={userExpiryDate => setExpiryDate(userExpiryDate)}
                      placeholderTextColor={'#20272B80'}
                    />
                  </View>
                  <LinearGradient colors={constants.AppColor.FLEX_GRADIENT_BACK_COLOR}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{ borderRadius: moderateScale(16), marginTop: verticalScale(15), paddingHorizontal: moderateScale(5),height:scale(110) }}
                  >
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: verticalScale(15, Constant.DesignCanvas.HEIGHT) }}>
                      <View>
                        <Text>8,33 € per month x 12 months</Text>
                      </View>
                      <View>
                        <Text>99,99 €</Text>
                      </View>

                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: verticalScale(15, Constant.DesignCanvas.HEIGHT) }}>
                      <View>
                        <Text>Tax</Text>
                      </View>
                      <View>
                        <Text>--</Text>
                      </View>

                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: verticalScale(15, Constant.DesignCanvas.HEIGHT) }}>
                      <View>
                        <Text>Total</Text>
                      </View>
                      <View>
                        <Text>--</Text>
                      </View>

                    </View>
                  </LinearGradient>
                <View style={{marginTop:verticalScale(15,Constant.DesignCanvas.HEIGHT)}}>
                  <Text style={{justifyContent:'center',textAlign:'center',...Styles.REGULAR_14,color:'#66737F'}}>Lorem Ipsum is simply dummy text of the printing {'\n'}and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Text>
                </View>
                <View style={{marginTop:verticalScale(15)}}>
                <LinearGradient
                       style={[{
                        // backgroundColor: 'red',
                        width: Dimensions.get('window').width * 0.8856,
                        height: 50,
                        borderRadius: 16,
                        justifyContent:"center",
                        alignItems:"center"
                      }]}
                      colors={constants.AppColor.LINEAR_GRADIENT_COLOR_BUTTON}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 0, y: 1 }}
                    >
                      <Text style={[Styles.MEDIUM_15,{ color: "#fff" }]}>
                      Buy Now
                      </Text>
                    </LinearGradient>
                </View>
                <View style={{marginTop:verticalScale(15,Constant.DesignCanvas.HEIGHT),justifyContent:'center',alignItems:'center',paddingBottom:verticalScale(15,Constant.DesignCanvas.HEIGHT)}}>
                  <Text style={{...Styles.MEDIUM_15,color:'#7ACACB'}}>Buy with Google Play instead</Text>
                </View>
               </View>
                {/* /*************************section code end************************* */}

                {/* /*************************section code end************************* */}
              </ScrollView>
            </LinearGradient>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );






}

const styles = StyleSheet.create({
  heading_top: {
    color: "#FFF",
    fontSize: 20,
    marginTop: 20,
    marginLeft: "16%",
    justifyContent: "center",
    textAlign: "center",
  },
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
    // backgroundColor:'red',
    height: normalize(95),
  },
  lable_text_style: {
    fontSize: normalize(15),
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
