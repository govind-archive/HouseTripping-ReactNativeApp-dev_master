import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ImageBackground,
  ScrollView,
  Keyboard,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path, G, Circle, Rect, Defs } from "react-native-svg";
import constants from "../assets/constants";
import constantsF from "../constants/Contants";
import { logInWithReadPermissionsAsync, initializeAsync } from "expo-facebook";
import { androidClientId, IOSclient } from "../superSecretKey";
import apiDetails from "../api/AllApis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from '@react-native-community/datetimepicker';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import * as Google from "expo-google-app-auth";
import { RFValue } from "react-native-responsive-fontsize";
import Images from "../assets/Images";
import Styles from "../constants/Styles";
import Contants from "../constants/Contants";

function Welcome_login({ navigation }) {
  const [profile, setProfile] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  function checkUserLogin(data, type) {
    const a = new apiDetails();
    a.api
      .post(a.getsocialLoginDetails, {
        social_id: data.id,
        socialtype: type,
      })
      .then((response) => {
        if (response.data.status == "200") {
          //login

          const jsonValue = JSON.stringify(response.data.data);
          AsyncStorage.setItem("userInfo", jsonValue);
          const jsonValueToken = JSON.stringify(response.data.data.token);
          AsyncStorage.setItem("token", jsonValueToken);
          navigation.replace("HomeFeed", { userData: response.data.data });
        } else if (response.data.status == "202") {
          navigation.navigate("Social_login", {
            profile: data,
            social_type: type,
          });
        } else {
          alert(response.data.msg);
        }
      });
  }

  //facebook login
  const handleFacebookLogin = async () => {
    try {
      initializeAsync({
        appId: constantsF.FacebookDetails.FAID,
        appName: constantsF.FacebookDetails.FNAME,
      });
      const data = await logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      switch (data.type) {
        case "success": {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(
            `https://graph.facebook.com/me?fields=id,name,email&access_token=${data.token}`
          );
          const profile = await response.json();

          checkUserLogin(profile, "Facebook");

          break;
        }
        case "cancel": {
          alert("Cancelled!", "Login was cancelled!");
          break;
        }
        default: {
          alert("Oops!", "Login failed!");
        }
      }
    } catch (e) {
      alert("Oops!", "Login failed!");
    }
  };

  //google login
  const signInAsync = async () => {
    try {
      const { type, user } = await Google.logInAsync({
        androidClientId: androidClientId,
        iosClientId: IOSclient,
      });

      if (type === "success") {
        checkUserLogin(user, "Google");
      }
    } catch (error) {
      console.log("LoginScreen.js 19 | error with login", error);
      alert(error);
    }
  };

  // initAsync = async () => {
  //   await GoogleSignIn.initAsync({
  //     // You may ommit the clientId when the firebase `googleServicesFile` is configured
  //     clientId: androidClientId,
  //   });
  //   syncUserWithStateAsync();
  // };
  // const syncUserWithStateAsync = async () => {
  //   const user = await GoogleSignIn.signInSilentlyAsync();
  //   setUser(user);
  // };
  // const initAsync=async()=>{
  //   try{
  //     await GoogleSignIn.initAsync({
  //       clientId:androidClientId
  //     });
  //     getUsersDetails();
  //   }catch({message}){
  //    alert(message)
  //   }
  // }
  // const getUsersDetails=async()=>{
  //   await GoogleSignIn.signInSilentlyAsync()
  // }
  // const  handleGoogleSignIn=async()=>{
  //   try{
  //     setGoogleSubmitting(true);
  //     await GoogleSignIn.askForPlayServicesAsync();
  //    const {type,user}= await GoogleSignIn.signInAsync();
  //        if(type=='success'){
  //           getUsersDetails();
  //        }
  //        else{
  //          alert('Google signin Cancelled')
  //          setGoogleSubmitting(false)

  //        }
  //   } catch{
  //     setGoogleSubmitting(false)
  //   }
  // }

  return (
    <SafeAreaView style={styles.container}>
       <ImageBackground
                style={[{
                    ...Platform.select({
                        ios: {
                            width: Dimensions.get("window").width,
                            // height: Dimensions.get('window').height
                            flex: 1,
                            marginTop: -40
                        },
                        android: {
                            width: Dimensions.get("window").width,
                            // height: Dimensions.get('window').height
                            flex: 1,
                        }
                    })


                }]}
                source={Images.all_screen_bg_image}
            >
      <StatusBar
        animated={true}
        translucent
        backgroundColor="transparent"
        barStyle={"light-content"}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.customScrollview}
      >
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <ScrollView bounces={false} style={styles.customScrollview}>
          {/* <Image
        style={{
          marginTop: -20,
          width: "100%",
          // height: "70%",
          height:RFValue(554,812),
          borderBottomRightRadius: 25,
          borderBottomLeftRadius: 25,
          // marginBottom: 25,
        }}
        source={require("../assets/images/starting_pages_images.png")}
      /> */}
          <View
            style={{
              width: Dimensions.get('window').width,
            }}
          >
            <Image
              style={{
                ...Platform.select({
                  ios: {
                    // marginTop: -20,
                    width: "100%",
                    // height: "70%",
                    height: Dimensions.get("window").height * 0.6822,
                    borderBottomRightRadius: 25,
                    borderBottomLeftRadius: 25,
                    // marginBottom: 25,
                  },
                  android: {
                    width: "100%",
                    // height: RFValue(600, Contants.DesignCanvas.HEIGHT),
                    height: Dimensions.get("window").height * 0.6822,
                    borderBottomRightRadius: 25,
                    borderBottomLeftRadius: 25,
                  }
                })

              }}
              // resizeMode="contain"
              source={Images.signup_girl_image}
            />
          </View>
          <View style={[{
            // backgroundColor:"red",
            width: Dimensions.get('window').width,
            justifyContent: "center",
            alignItems: 'center',
            marginTop: 20
          }]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.loginButton,
                { flexDirection: "row", backgroundColor: "#FFF", justifyContent: "flex-start", alignItems: "center", },
              ]}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Image
                style={{
                  height: RFValue(35, 812),
                  width: RFValue(35, 812),
                  marginLeft: 15
                }}
                resizeMode='contain'
                source={require("../assets/images/mail.png")}
              />
              <Text
                style={[
                  {
                    fontFamily: 'MEDIUM',
                    fontSize: 16,
                    color: "#272D37",
                    marginLeft: 20,
                    letterSpacing: -1
                  }
                ]}
              >
                Login with email or number
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.loginButton,
                { flexDirection: "row", backgroundColor: "#167AF2", justifyContent: "flex-start", alignItems: "center", },
              ]}
              onPress={() => {
                handleFacebookLogin();
              }}
            >
              <Image
                style={{
                  height: RFValue(35, 812),
                  width: RFValue(35, 812),
                  marginLeft: 15
                }}
                resizeMode='contain'
                source={Images.wellcome_login_fb_icon}
              />
              <Text
                style={[
                  {
                    fontFamily: 'MEDIUM',
                    fontSize: 16,
                    color: "#FFFFFF",
                    marginLeft: 20,
                    letterSpacing: -1
                  }
                ]}
              >
                Login with Facebook
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.loginButton,
                { flexDirection: "row", backgroundColor: "#FF4643", justifyContent: "flex-start", alignItems: "center", },
              ]}
              onPress={() => {
                signInAsync();
              }}
            >
              <Image
                style={{
                  height: RFValue(35, 812),
                  width: RFValue(35, 812),
                  marginLeft: 15
                }}
                resizeMode='contain'
                source={Images.wellcome_login_google_icon}
              />
              <Text
                style={[Styles.MEDIUM_15,
                {
                  fontFamily: 'MEDIUM',
                  fontSize: 16,
                  color: "#FFFFFF",
                  marginLeft: 20,
                  // textAlign:"center"
                  letterSpacing: -1
                }
                ]}
              >
                Login with Google
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[{
            ...Platform.select({
              ios: {
                // backgroundColor:"red",
                width: Dimensions.get('window').width,
                justifyContent: "center",
                alignItems: 'center',
                marginTop: 20
              },
              android: {
                // backgroundColor:"red",
                width: Dimensions.get('window').width,
                justifyContent: "center",
                alignItems: 'center',
                marginTop: 20,
                // paddingBottom:-50
              }
            })
          }]}>
            <Text style={[styles.para, { alignSelf: "center", fontFamily: 'REGULAR', fontSize: 16, letterSpacing: -1 }]}>
              Don't have an account ?
              <Text
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
                style={[styles.para, { color: constants.AppColor.TEXT_COLOR, fontFamily: 'REGULAR', fontSize: 16, letterSpacing: -1 }]}
              >
                {" "}
                Signup
              </Text>{" "}
            </Text>
          </View>
        </ScrollView>
        {/* </TouchableWithoutFeedback> */}
      </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#F7EFFA",
    marginBottom: RFValue(30, Contants.DesignCanvas.HEIGHT)
  },
  customScrollview: {
    ...Platform.select({
      ios: {
        marginTop: -24,
      },
      android: {
        marginTop: 0,
        // marginBottom:RFValue(10,Contants.DesignCanvas.HEIGHT)
      },
      default: {
        marginTop: -20,
      },
    }),
  },
  input: {
    backgroundColor: "#FFF",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    marginLeft: 30,
    marginRight: 30,
    height: 50,
  },
  heading: {
    color: "#272D37",
    fontSize: 23,
    fontWeight: "bold",
    // fontFamily: 'sp_bold',
  },
  para: {
    color: "#686E76",
    // marginTop: 10,
    // fontFamily: 'sp_regular',
  },
  signup: {
    backgroundColor: "#F7EFFA",
    borderRadius: 10,
    marginLeft: 30,
    marginRight: 30,
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  loginButton: {
    backgroundColor: "#F7EFFA",
    borderRadius: 16,
    marginTop: 10,
    // marginLeft: 30,
    // marginRight: 30,
    // width:Dimensions.get('window').width*0.8856,
    width: RFValue(320, 812),
    height: 50,
    borderColor: "#6263F0",
  },
  center: {
    alignSelf: "center",
    margin: 15,
    fontSize: 18,
    justifyContent: "center",
    flex: 1,
  },
});

export default Welcome_login;
