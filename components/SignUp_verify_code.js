import React, { useState, useEffect, useRef } from "react";
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  ImageBackground,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import normalize from "react-native-normalize";
import apiDetails from "../api/AllApis";
import Images from "../assets/Images";
import { BlurView } from "expo-blur";
import { RFValue } from "react-native-responsive-fontsize";
import Constant from '../constants/Contants';
import Styles from "../constants/Styles";
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { HeaderModel, HelpScreenModel } from "./Components/NewModelView";
import firebase from 'firebase';
import LoadingLottie from "./anim/LoadingLottie";

function SignUp_verify_code({ navigation, route }) {
  let mobileData;

  let s1;
  let s2 = "";
  let s3 = "";
  let s4 = "";
  let [i1, i2, i3, i4] = "";
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState(true);
  const [show, setShow] = useState(true);
  const [mobileOtp, setMobileOtp] = useState();
  const recaptchaVerifier = useRef(null);
  const [verificationId, setVerificationId] = useState(null);


  function init(phone) {
    firebase.initializeApp({
      apiKey: "AIzaSyCF7C1W0Jim_JIBdUOM2-zlQdia5PSUWUk",
      authDomain: "react-native-demo-277b7.firebaseapp.com",
      databaseURL: "https://react-native-demo-277b7-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "react-native-demo-277b7",
      storageBucket: "react-native-demo-277b7.appspot.com",
      messagingSenderId: "87325373920",
      appId: "1:87325373920:web:9ba7285bbabea7a179e785"
    })
    sendVerification(phone);
  }


  function changeFocus(f, t) {
    if (f == "2") {
      if (t.length > 0) {
        s2.focus();
        i1 = t;
      } else {
        i1 = "";
        s1.focus();
      }
    } else if (f == "3") {
      if (t.length > 0) {
        s3.focus();
        i2 = t;
      } else {
        i2 = "";
        s1.focus();
      }
    } else if (f == "4") {
      if (t.length > 0) {
        s4.focus();
        i3 = t;
      } else {
        i3 = "";
        s2.focus();
      }
    } else if (f == "1") {
      if (t.length > 0) {
        s4.focus();
        i4 = t;
      } else {
        i4 = "";
        s3.focus();
      }
    }
  }

  // Function to be called when requesting for a verification code
  const sendVerification = (phone) => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phone, recaptchaVerifier.current)
      .then(setVerificationId)
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to be called when confirming the verification code that we received
  // from Firebase via SMS
  const confirmCode = (code) => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        // Do something with the results here  
        navigation.navigate(
          route.params?.mobileNumber.type == "user" ? "SignUp_full_name" : "SignUp_email",
          { mobileNumber: route.params?.mobileNumber }
        );
      })
      .catch((error) => {
        console.log(error);
        alert("Invalid code")
        setShow(false);
      });
  }

  if (route.params?.mobileNumber && code) {
    mobileData = route.params?.mobileNumber; 
    setTimeout(() => {  
      if (firebase.apps.length === 0) {
        init(mobileData.phone_nuber);
      } else {
        sendVerification(mobileData.phone_nuber);
      }
      setShow(false);
      setCode(false);
    }, 3000) 
  } else {
    // navigation.goBack();
    // alert("Oops something went wrong please go back");
  }

  const resendOtpApi = (route, navigation, mobile, type) => {
    const a = new apiDetails();
    a.api.post(a.checkMobile, { phone_number: route }).then((response) => {
      if (response.data.status == "200") {
        alert("Your otp is here " + response.data.otp);
        setMobileOtp(response.data.otp);
      } else {
        console.log(response.data.msg);
        alert(response.data.msg);
      }
    });
  };


  const apiCall = (otp, navigation) => {
    let veryfyOtp = mobileOtp === undefined ? mobileData.otp : mobileOtp;
    const a = new apiDetails();
    a.api
      .post(a.verifyOTP, { otp: veryfyOtp, userotp: parseInt(otp) })
      .then((response) => {
        if (response.data.status == "200") {
          navigation.navigate(
            mobileData.type == "user" ? "SignUp_full_name" : "SignUp_email",
            { mobileNumber: mobileData }
          );
        } else {
          alert(response.data.msg);
        }
      });
  };

  async function submitData({ navigation }) {
    let finalOtp = i1;
    setShow(true);
    if (finalOtp && finalOtp.length == 6) {
      try {
        confirmCode(finalOtp)
      } catch (error) {
        console.log(error);
        console.log('Invalid code.');
        setShow(false);
      }
      // apiCall(finalOtp, navigation);
    } else {
      setShow(false);
      alert("Not valid code");
    }
  }

  // unsubscribe on unmount
  // useEffect(() => {
  //   const subscriber = FirebaseCode.createSubscribe(onAuthStateChanged); 
  //   return subscriber; 
  // }, []);

  // if (initializing) return alert("Oops something is wrong please restart the application"); 

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        translucent
        backgroundColor="transparent"
        barStyle={"light-content"}
      />

      <KeyboardAvoidingView
        //behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.customScrollview}
      >
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <ScrollView bounces={false} style={styles.customScrollview} showsVerticalScrollIndicator={false}>
          <ImageBackground
            style={styles.image_background}
            source={Images.verification_back_image}
            resizeMode={'cover'}

          >
            {/*************** HEADER ************ */}
            <View style={[{
              ...Platform.select({
                ios: {
                  marginTop: 20,
                  // backgroundColor:'red'
                },
                android: {
                  marginTop: 30,
                  // backgroundColor:'red'

                }
              })
            }]}>
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
                // HeaderTitle={'Help'}
                leftImage={Images.all_screen_back_black_arrow_icon}
              />
            </View>

            <FirebaseRecaptchaVerifierModal
              ref={recaptchaVerifier}
              firebaseConfig={firebase.app().options} 
            />

            {/*************** VIEW VERIFY CODE ************ */}
            <View>
              <View style={{
                paddingHorizontal: scale(14, Constant.DesignCanvas.HEIGHT),
                // backgroundColor:'red',

              }}>
                <View style={{ paddingVertical: verticalScale(60) }}>
                  <Image
                    style={[
                      {
                        width: RFValue(80, 812),
                        height: RFValue(80, 812),
                      },
                    ]}
                    source={Images.lock_image}
                    resizeMode="contain"
                  />
                  <View
                    style={[
                      {
                        paddingVertical: verticalScale(30),
                        paddingBottom: verticalScale(20),
                      },
                    ]}
                  >
                    <Text style={[styles.heading]}>Verification Code</Text>
                    <View
                      style={[
                        {
                          //  backgroundColor:"green",
                          paddingVertical: verticalScale(14)
                        },
                      ]}
                    >
                      <Text
                        style={[
                          {
                            lineHeight: 20,
                            color: "#fff",
                            ...Styles.REGULAR_15
                          },
                        ]}
                      >
                        Enter the verification code we just sent you{"\n"}on your mobile
                        number.
                      </Text>
                    </View>
                    <View
                      style={[
                        {
                          //  backgroundColor: "green",
                          marginTop: RFValue(46, Constant.DesignCanvas.HEIGHT),
                          flexDirection: "row",
                          justifyContent: "space-between",
                        },
                      ]}
                    >

                      <View style={styles.parent_blur_view}>
                        <BlurView intensity={100} style={[styles.blur_View]}>
                          <TextInput
                            ref={(input) => {
                              s1 = input;
                            }}
                            placeholderTextColor="#C5C5C5"
                            style={[styles.input]}
                            placeholder="XXXXXX"
                            keyboardType="phone-pad"
                            onChangeText={(t) => {
                              i1 = t;
                              // changeFocus("2", t);
                            }}
                            maxLength={6}
                          />
                        </BlurView>
                      </View>


                      {/* <View style={styles.parent_blur_view}>
                        <BlurView intensity={100} style={[styles.blur_View]}>
                          <TextInput

                            ref={(input) => {
                              s2 = input;
                            }}
                            placeholderTextColor="#C5C5C5"
                            style={[styles.input]}
                            placeholder="X"
                            keyboardType="phone-pad"
                            onChangeText={(t) => {
                              changeFocus("3", t);
                            }}
                            maxLength={1}
                          />
                        </BlurView>
                      </View>
                      <View style={styles.parent_blur_view}>
                        <BlurView intensity={100} style={[styles.blur_View]}>
                          <TextInput

                            ref={(input) => {
                              s3 = input;
                            }}
                            placeholderTextColor="#C5C5C5"
                            style={[styles.input]}
                            placeholder="X"
                            keyboardType="phone-pad"
                            value={mobileOtp}
                            textContentType="oneTimeCode"
                            onChangeText={(t) => {
                              changeFocus("4", t);
                            }}
                            maxLength={1}
                          />
                        </BlurView>
                      </View>
                      <View style={styles.parent_blur_view}>
                        <BlurView intensity={100} style={[styles.blur_View]}>
                          <TextInput

                            ref={(input) => {
                              s4 = input;
                            }}
                            style={[styles.input, { marginRight: 30 }]}
                            placeholderTextColor="#C5C5C5"
                            placeholder="X"
                            keyboardType="phone-pad"
                            onChangeText={(t) => {
                              changeFocus("1", t);
                            }}
                            maxLength={1}
                          />
                        </BlurView>
                      </View> */}



                    </View>
                    {/* <View
                      style={[
                        {
                          ...Platform.select({
                            ios:{},
                            android:{}
                          }),
                         backgroundColor: "green",
                          // marginTop: normalize(50),
                          // flexDirection:'row',
                          justifyContent: "flex-end",
                          paddingBottom:verticalScale(0,Constant.DesignCanvas.HEIGHT)
                          // alignItems:'flex-end',
                        },
                      ]}
                    > */}
                    <View
                      style={styles.view_button_style}
                    >
                      <View>
                        <Text
                          style={[
                            {
                              color: "#fff",
                              ...Styles.REGULAR_16
                            },
                          ]}
                        >
                          Did'nt recive any code?
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            // resendOtpApi(route.params.mobileNumber.phone_nuber);
                            sendVerification(route.params.mobileNumber.phone_nuber);
                          }}
                        >
                          <Text
                            style={[
                              {
                                color: "#77A1D3",
                                marginTop: normalize(5),
                                ...Styles.REGULAR_19
                              },
                            ]}
                          >
                            Re-send Code
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity activeOpacity={0.8}
                        onPress={() => {
                          submitData({ navigation });
                        }}
                      >
                        <Image
                          style={[
                            {
                              width: normalize(50),
                              height: normalize(50),
                            },
                          ]}
                          source={Images.next_page_imgae}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    </View>
                    {/* </View> */}
                  </View>



                </View>



              </View>

            </View>

            {show && (
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#ffffffB3",
                  zIndex: 105,
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <LoadingLottie />
              </View>
            )}

          </ImageBackground>
        </ScrollView>
        {/* </TouchableWithoutFeedback> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height,//'100%',
    // width: "100%",
    flex: 1,
    // backgroundColor: "red",
  },
  customHeader: {
    ...Platform.select({
      ios: {
        height: "11%",

      },
      android: {
        height: "11%",

      },
      default: {
        height: "11%",
      },
    }),
  },
  input: {
    borderRadius: normalize(15),
    justifyContent: "center",
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 18,
    height: normalize(50),
    ...Styles.SEMIBOLD_20,
    color: "#fff",
    width: '100%'
  },

  blur_View: {
    textAlign: "center",
    fontSize: 20,
    height: "100%",
    // backgroundColor:'red',
    width: "100%",
  },
  parent_blur_view: {
    borderRadius: 15,
    overflow: "hidden",
    width: "100%",
    height: 50,
  },
  heading: {
    color: "#fff",
    ...Styles.BOLD_28,
    // marginRight: "20%"
    // fontFamily: 'sp_bold',
  },
  para: {
    color: "#686E76",
    marginTop: 10,
    fontSize: 15,
    marginRight: "20%",
    // fontFamily: 'sp_regular',
  },
  loginButton: {
    flex: 1,
    borderRadius: 15,
    flexDirection: "row",
    backgroundColor: "#272D37",
    marginTop: 10,
    marginLeft: 30,
    marginRight: 10,
    alignItems: "center",
    alignSelf: "stretch",
    borderColor: "#6263F0",
  },
  image_background: {
    ...Platform.select({
      ios: {
        height: Dimensions.get('window').height + 25,
        marginTop: 0,
      },
      android: {
        height: Dimensions.get('window').height + 85,
        // flex:1
      }

    }),
  },
  customScrollview: {
    ...Platform.select({
      ios: {
        marginTop: -30,
        height: Dimensions.get('window').height,
        // backgroundColor:"green",
      },
      android: {
        marginTop: -15,
        height: Dimensions.get('window').height + 75,
        // flex:1,
        // backgroundColor:"green",
      },
      default: {
        // marginTop: -20,
      },
    }),
  },
  button_style: {
    ...Platform.select({
      ios: {
        height: normalize(70),
        justifyContent: 'flex-end',
        marginTop: RFValue(240),
        alignItems: 'flex-end'
      },
      android: {
        height: normalize(70),
        justifyContent: 'flex-end',
        // marginTop: RFValue(200, Constant.DesignCanvas.HEIGHT),
        alignItems: 'flex-end'
      }
    })
  },
  view_button_style: {
    ...Platform.select({
      ios: {
        // backgroundColor: "red",
        // marginTop: normalize(50),
        flexDirection: "row",
        height: Dimensions.get('window').height * 0.4333,//RFValue(370, Contants.DesignCanvas.HEIGHT),
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingBottom: 20,
        // marginTop: moderateScale(254)
      },
      android: {
        // backgroundColor: "green",
        // marginTop: normalize(50),
        flexDirection: "row",
        height: Dimensions.get('window').height * 0.4444,//RFValue(410, Contants.DesignCanvas.HEIGHT),
        justifyContent: "space-between",
        alignItems: "flex-end",
        // marginTop: moderateScale(254),
        paddingBottom: 20,

      }
    }),
    // backgroundColor: 'cyan',

  },
});

export default SignUp_verify_code;
