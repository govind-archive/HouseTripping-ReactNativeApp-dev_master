import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import apiDetails from "../api/AllApis";
import LoadingLottie from "./anim/LoadingLottie";
import constants from "../assets/constants";
import Images from "../assets/Images";
import { RFValue } from "react-native-responsive-fontsize";
import Contants from "../constants/Contants";
import Styles from "../constants/Styles";

let email = "";
let password = "";

function apiCall({ navigation, setShow }) {
  setShow(true);
  if (email.length < 1) {
    alert("Please enter email");
    setShow(false);
    return;
  }

  if (password.length < 1) {
    alert("Please enter password");
    setShow(false);
    return;
  }

  const a = new apiDetails();
  var device = "1";
  if (Platform.OS === "ios") {
    device = "2";
  }


  AsyncStorage.getItem("notification_token").then((n_token) => {

    a.api.post(a.login, { email: email, password: password, device: device, token: n_token }).then((response) => {
      if (response.data.status == "200") { 
        setShow(false);
        const jsonValue = JSON.stringify(response.data.data);
        AsyncStorage.setItem("userInfo", jsonValue);
        const jsonValueToken = JSON.stringify(response.data.data.token);
        AsyncStorage.setItem("token", jsonValueToken);
        navigation.replace("HomeFeed", { userData: response.data.data });
      } else {
        setShow(false);
        alert(response.data.msg);
      }
    });
  });

}

function Login({ navigation }) {
  let [hidden1, setHidden1] = React.useState(true);
  const [show, setShow] = useState(false);

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
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView bounces={false} style={styles.customScrollview}>
              <View>
                <View
                  style={{
                    width: Dimensions.get('window').width,
                  }}
                >
                  <Image
                    style={{
                      ...Platform.select({
                        ios: {
                          width: "100%",
                          height: Dimensions.get("window").height * 0.5689,
                          // height: RFValue(510, Contants.DesignCanvas.HEIGHT),
                          borderBottomRightRadius: 25,
                          borderBottomLeftRadius: 25,
                        },
                        android: {
                          width: "100%",
                          height: Dimensions.get("window").height * 0.5689,
                          // height: RFValue(530, Contants.DesignCanvas.HEIGHT),
                          borderBottomRightRadius: 25,
                          borderBottomLeftRadius: 25,
                        }
                      })

                    }}
                    resizeMode="cover"
                    source={Images.signup_girl_image}
                  />
                </View>
                <View
                  style={[styles.SameContainer, { paddingHorizontal: RFValue(30, 812) }]}
                >
                  <View style={[{
                    // backgroundColor:'green',
                    width: Dimensions.get('window').width * 0.8856
                  }]}>
                    <Text style={[styles.heading, Styles.BOLD_29, { letterSpacing: -1 }]}>Login Account</Text>
                    {/* <Text style={[styles.heading,{fontFamily:'MEDIUM'}]}>Login account</Text> */}
                    <Text style={[styles.para, Styles.REGULAR_16]}>
                      Lorem Ipsum is simply dummy text of the.
                    </Text>
                  </View>
                </View>
                <View
                  style={[styles.SameContainer, { paddingHorizontal: RFValue(25, 812) }]}
                >
                  <View style={[{
                    // backgroundColor:'green',
                    width: Dimensions.get('window').width * 0.8856,
                    height: 50,
                  }]}>
                    <TextInput
                      style={[Styles.REGULAR_16, {
                        backgroundColor: '#FFFFFF',
                        width: Dimensions.get('window').width * 0.8856,
                        height: 50,
                        borderRadius: 16,
                        paddingLeft: 15,
                        color: "#000"
                      }]}
                      placeholderTextColor="#B3B6BA"
                      placeholder="Enter your email or phone"
                      keyboardType="email-address"
                      onChangeText={(t) => {
                        email = t;
                      }}
                    />
                  </View>
                  <View style={[{
                    backgroundColor: '#FFFFFF',
                    width: Dimensions.get('window').width * 0.8856,
                    height: 50,
                    borderRadius: 16,
                    marginTop: 10,
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }]}>
                    <TextInput
                      style={[Styles.REGULAR_16, {
                        // backgroundColor: 'yellow',
                        width: Dimensions.get('window').width * 0.7256,
                        height: 50,
                        color: "#000",
                        paddingLeft: 15
                      }]}
                      placeholderTextColor="#B3B6BA"
                      placeholder="Enter your password"
                      secureTextEntry={hidden1}
                      onChangeText={(t) => {
                        password = t;
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setHidden1(!hidden1);
                      }}
                      style={[{
                        justifyContent: "center",
                      }]}>
                      {hidden1 ? (
                        <Image
                          style={{
                            width: 30,
                            height: 30,
                            marginRight: RFValue(15, Contants.DesignCanvas.HEIGHT),
                            alignSelf: "center",
                            tintColor: "#000",
                          }}
                          source={Images.login_close_eyes_icon}
                        />
                      ) : (
                        <Image
                          style={{
                            width: 30,
                            height: 30,
                            alignSelf: "center",
                            tintColor: "#000",
                            marginRight: RFValue(15, Contants.DesignCanvas.HEIGHT),
                          }}
                          source={Images.login_open_eyes_icon}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  <View style={[{
                    // backgroundColor: 'green',
                    width: Dimensions.get('window').width * 0.8856,
                    height: 50,
                    marginTop: RFValue(20, Contants.DesignCanvas.HEIGHT)
                  }]}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={[{

                        // backgroundColor: 'red',
                        width: Dimensions.get('window').width * 0.8856,
                        height: 50,
                        borderRadius: 16,
                      }]}
                      onPress={() => {
                        apiCall({ navigation, setShow });
                      }}
                    >
                      <LinearGradient
                        style={[{
                          // backgroundColor: 'red',
                          width: Dimensions.get('window').width * 0.8856,
                          height: 50,
                          borderRadius: 16,
                          justifyContent: "center",
                          alignItems: "center"
                        }]}
                        colors={constants.AppColor.LINEAR_GRADIENT_COLOR_BUTTON}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                      >
                        <Text style={[Styles.MEDIUM_16, { color: "#fff", letterSpacing: -1 }]}>
                          Login
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>

                </View>
                <View
                  style={[styles.SameContainer, {
                    ...Platform.select({
                      ios: {
                        marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT), paddingHorizontal: RFValue(20, 812),
                      },
                      android: {
                        marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT), paddingHorizontal: RFValue(20, 812),
                      }
                    })
                  }]}
                >
                  <View style={[{
                    // backgroundColor: 'green',
                    width: Dimensions.get('window').width * 0.8856,
                    // height: 50,
                    marginBottom: RFValue(10, Contants.DesignCanvas.HEIGHT),
                    flexDirection: "row",
                    justifyContent: "center",


                  }]}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        navigation.navigate("Forget_password");
                      }}>
                      <Text style={[Styles.REGULAR_15, {
                        color: "#77A1D3"
                      }]}>{''} Forget Password ?</Text>
                    </TouchableOpacity>
                  </View>
                </View>


                <View
                  style={[styles.SameContainer, {
                    ...Platform.select({
                      ios: {
                        marginTop: RFValue(5, Contants.DesignCanvas.HEIGHT), paddingHorizontal: RFValue(20, 812),
                        marginBottom: RFValue(20, Contants.DesignCanvas.HEIGHT)
                      },
                      android: {
                        marginTop: RFValue(5, Contants.DesignCanvas.HEIGHT), paddingHorizontal: RFValue(20, 812),
                        marginBottom: RFValue(20, Contants.DesignCanvas.HEIGHT)
                      }
                    })
                  }]}
                >
                  <View style={[{
                    // backgroundColor: 'green',
                    width: Dimensions.get('window').width * 0.8856,
                    // height: 50,
                    marginBottom: RFValue(10, Contants.DesignCanvas.HEIGHT),
                    flexDirection: "row",
                    justifyContent: "center",


                  }]}>
                    <Text style={[Styles.REGULAR_15, {
                      color: '#272D37'
                    }]}>Don't have an account ?</Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        navigation.navigate("SignUp");
                      }}>
                      <Text style={[Styles.REGULAR_15, {
                        color: "#77A1D3"
                      }]}>{''} Signup</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>

          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7EFFA",
    flex: 1,
  },
  customScrollview: {
    ...Platform.select({
      ios: {
        marginTop: -27,
      },
      android: {
        marginTop: 0,
      },
      default: {
        marginTop: -20,
      },
    }),
  },
  input: {
    backgroundColor: "#FFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 16,
    marginHorizontal: 25,
    // marginLeft: 30,
    // marginRight: 30,
    height: 50,
  },
  heading: {
    color: "#272D37",
    // fontSize: 23,
    // fontWeight: "bold",
    // fontFamily: 'sp_bold',
  },
  para: {
    color: "#686E76",
    marginTop: 10,
  },
  signup: {
    backgroundColor: "#F7EFFA",
    borderRadius: 16,
    // marginLeft: 30,
    marginTop: RFValue(20, Contants.DesignCanvas.HEIGHT),
    // marginRight: 30,
    marginHorizontal: 25,
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  center: {
    alignSelf: "center",
    margin: 15,
    fontSize: 18,
    justifyContent: "center",
  },
  SameContainer: {
    // backgroundColor: "red",
    marginTop: RFValue(30, Contants.DesignCanvas.HEIGHT),
    width: Dimensions.get('window').width,
    paddingHorizontal: RFValue(25, 812)
  },
});

export default Login;


// Contants.DesignCanvas.HEIGHT