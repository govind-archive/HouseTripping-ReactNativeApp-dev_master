import React, { userState, useState } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import Svg, { Path, G, Circle, Rect, Defs } from "react-native-svg";
import apiDetails from "../api/AllApis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Images from "../assets/Images";
import { RFValue } from "react-native-responsive-fontsize";
import Styles from "../constants/Styles";
import { HeaderModel } from "./Components/NewModelView";
import Contants from "../constants/Contants";
import constants from "../assets/constants";
import constantsF from "../constants/Contants";
import { androidClientId, IOSclient } from "../superSecretKey";
import * as Google from "expo-google-app-auth";
import { logInWithReadPermissionsAsync, initializeAsync } from "expo-facebook";
import LoadingLottie from "./anim/LoadingLottie";
import Header from "./common/Header";

let userData = {};

let new_password,
  password,
  currentPassword,
  re_password,
  userName,
  firstName,
  phoneNumber,
  lastName,
  push_notifications,
  email_updates,
  email = "";

function fireAPis({ navigation, setShow }) {
  setShow(true)
  let checkPassword = false;
  if (new_password != undefined && new_password.length > 0) {
    checkPassword = true;
  }

  if (password != undefined && password.length > 0) {
    checkPassword = true;
  }

  if (re_password != undefined && re_password.length > 0) {
    checkPassword = true;
  }

  if (checkPassword) {
    if (new_password === re_password) {
      //if it matches do nothing
      if (password == "") {
        setShow(false)
        alert("Please enter the old password");
        return;
      }
    } else {
      setShow(false)
      alert("new password and re-enter password not matched");
      return;
    }
  }

  callAPi({ navigation, setShow });
}

function callAPi({ navigation, setShow }) {
  const a = new apiDetails();
  AsyncStorage.getItem("userInfo").then((user) => {
    if (user) {
      var d = JSON.parse(user);
      let a = new apiDetails(d.token);

      a.getClient(d.token)
        .post(a.updateProfile, {
          user_id: userData.id,
          firstname: firstName,
          lastname: lastName,
          email: email,
          password: new_password,
          oldpassword: password,
          push_notifications: push_notifications,
          email_updates: email_updates
        })
        .then((response) => { 
          setShow(false)
          if (response.data.status == "200") {
            var dataUser = response.data.data;
            d.email = dataUser.email;
            d.image = dataUser.image;
            d.lastname = dataUser.lastname;
            d.name = dataUser.name;
            d.phone_number = dataUser.phone_number;
            d.notification = dataUser.notification;
            d.email_update = dataUser.email_update;

            const jsonValue = JSON.stringify(d);
            AsyncStorage.setItem("userInfo", jsonValue);

            alert("Profile Updated");
          } else {
            console.log(response);
            alert(response.data.msg);
          }
        });
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

        connectSocialAccount(profile.id, "Facebook");
        // checkUserLogin(profile, "Facebook");

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
      connectSocialAccount(user.id, "Google");
    }
  } catch (error) {
    console.log("LoginScreen.js 19 | error with login", error);
    alert(error);
  }
};

function connectSocialAccount(social_id, socialtype) {
  AsyncStorage.getItem("userInfo").then((user) => {
    if (user) {
      var d = JSON.parse(user);
      let a = new apiDetails(d.token);

      a.getClient(d.token)
        .post(a.connectSocialAccount, {
          social_id: social_id,
          socialtype: socialtype
        })
        .then((response) => {
          if (response.data.status == "200") {
            d.social_id = social_id;
            d.socialtype = socialtype;

            const jsonValue = JSON.stringify(d);
            AsyncStorage.setItem("userInfo", jsonValue);
            alert("Account Connected");
          } else {
            console.log(response);
            alert(response.data.msg);
          }
        });
    }
  });
}

export default function SettingProfile({ navigation, route }) {
  const [statusOn, setStatusOn] = useState(true);
  const [statusOff, setStatusOff] = useState(false);
  const [statusNotifyOn, setStatusNotifyOn] = useState(true);
  const [statusNotifyOff, setStatusNotifyOff] = useState(false);
  const [userDetail, setUserDetails] = useState({ socialtype: "" });
  const [index, setIndex] = React.useState(0);
  const [hidden1, setHidden1] = React.useState(true);
  const [hidden2, setHidden2] = React.useState(true);
  const [hidden3, setHidden3] = React.useState(true);
  const [show, setShow] = useState(true);

  if (!userDetail.id) {
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);
        userName = d.username;
        firstName = d.name;
        lastName = d.lastname;
        email = d.email;
        phoneNumber = d.phone_number;
        push_notifications = d.notification;
        email_updates = d.email_update;

        if (push_notifications == "1") {
          setStatusNotifyOn(true);
        } else {
          setStatusNotifyOn(false);
        }

        if (email_updates == "1") {
          setStatusNotifyOff(true);
        } else {
          setStatusNotifyOff(false);
        }

        setShow(false)
        setUserDetails(d);
      }
    });
  }

  AsyncStorage.getItem("password").then((val) => {
    currentPassword = val;
  });

  const showOnHide = () => {
    if (statusOn == true) {
      setStatusOn(!statusOn == true);
    } else {
      setStatusOn(statusOn == false);
    }
  };
  const showOffHide = () => {
    if (statusOff == true) {
      setStatusOff(!statusOff == true);
    } else {
      setStatusOff(statusOff == false);
    }
  };
  const showNotifyOn = () => {
    if (statusNotifyOn == true) {
      push_notifications = "0";
      setStatusNotifyOn(!statusNotifyOn == true);
    } else {
      push_notifications = "1";
      setStatusNotifyOn(statusNotifyOn == false);
    }
  };
  const showNotifyOff = () => {
    if (statusNotifyOff == true) {
      email_updates = "0";
      setStatusNotifyOff(!statusNotifyOff == true);
    } else {
      email_updates = "1";
      setStatusNotifyOff(statusNotifyOff == false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} >

        <LinearGradient
          colors={["#E683AF", "#7ACACB", "#77A1D3"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={[Styles.BackgroundGradient, { height: "100%", marginTop: 0, paddingBottom: 10 }]}>
          <HeaderModel
            leftimgstyle={[{
              width: 28,
              height: 28
            }]}
            rightimgstyle={[{
              width: 20,
              height: 20
            }]}
            onPress={() => {
              navigation.goBack();
            }}
            HeaderTitle={'Settings'}
            leftImage={Images.all_screen_back_black_arrow_icon}
            rightImage={Images.right_blue}
            RightPress={() => {
              fireAPis({ navigation, setShow })
            }}
          />
          <LinearGradient
            colors={constants.AppColor.FLEX_GRADIENT_BACK_COLOR}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[Styles.LinearGradientStyle, { height: "auto" }]}>
            <ScrollView showsVerticalScrollIndicator={false} style={[Styles.customScrollview, {
              width: "100%",
              height: "100%",
              ...Platform.select({
                ios: {
                  marginLeft: 10,
                  marginRight: 10
                },
                android: {
                },
                default: {
                },
              })
            }]}>
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle]}>
                <Text style={[Styles.BOLD_22, { color: '#272D37', lineHeight: 30 }]}>
                  Account
                </Text>
              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, { marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT) }]}>
                <Text style={[Styles.FieldStyle, Styles.REGULAR_16]}>
                  Username
                </Text>
                <TextInput
                  value={'@' + userDetail.username}
                  style={[Styles.REGULAR_16, Styles.InputBoxStyle, {  width: "auto" }]}
                  placeholder="Your Username"
                  placeholderTextColor={'#B3B6BA'}
                  editable={false}
                // onChangeText={(value) => handleOnChange("email", value)}
                />
              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, { marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT) }]}>
                <Text style={[Styles.FieldStyle, Styles.REGULAR_16]}>
                  First name
                </Text>
                <TextInput
                  value={userDetail.name}
                  style={[Styles.REGULAR_16, Styles.InputBoxStyle, {   width: "auto" }]}
                  placeholder="Your First Name"
                  placeholderTextColor={'#B3B6BA'}
                  editable={false}
                  onChangeText={(t) => {
                    firstName = t;
                  }}
                />
              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, { marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT) }]}>
                <Text style={[Styles.FieldStyle, Styles.REGULAR_16]}>
                  Last name
                </Text>
                <TextInput
                  value={userDetail.lastname}
                  style={[Styles.REGULAR_16, Styles.InputBoxStyle, {   width: "auto" }]}
                  placeholder="Your email address"
                  placeholderTextColor={'#B3B6BA'}
                  editable={false}
                  onChangeText={(t) => {
                    lastname = t;
                  }}
                />
              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, { marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT) }]}>
                <Text style={[Styles.FieldStyle, Styles.REGULAR_16]}>
                  Email Address
                </Text>
                <TextInput
                  value={userDetail.email}
                  style={[Styles.REGULAR_16, Styles.InputBoxStyle, {   width: "auto" }]}
                  placeholder="Your email address"
                  placeholderTextColor={'#B3B6BA'}
                  editable={false}
                  selectTextOnFocus={false}
                  contextMenuHidden={true}
                  onChangeText={(t) => {
                    verifyEmail = t;
                  }}
                />
              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, { marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT), borderBottomWidth: 0.5, borderColor: "#E7ECF2", paddingBottom: 10 }]}>
                <Text style={[Styles.FieldStyle, Styles.REGULAR_16]}>
                  Phone number
                </Text>
                <TextInput
                  value={userDetail.phone_number}
                  style={[Styles.REGULAR_16, Styles.InputBoxStyle, {   width: "auto" }]}
                  placeholder="Your email address"
                  placeholderTextColor={'#B3B6BA'}
                  editable={false}
                  selectTextOnFocus={false}
                  contextMenuHidden={true}
                // onChangeText={(t) => {
                //   verifyEmail = t;
                // }}
                />
              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, { marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT) }]}>
                <Text style={[Styles.BOLD_22, { color: '#272D37', lineHeight: 30 }]}>
                  Password
                </Text>
              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, { marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT) }]}>
                <Text style={[Styles.FieldStyle, Styles.REGULAR_16]}>
                  Current Password
                </Text>
                <View
                  style={[
                    styles.input,
                    { flexDirection: "row", alignContent: "flex-end" }]}>
                  <TextInput
                    style={{ flex: 1 }}
                    placeholder="Password"
                    secureTextEntry={hidden1}
                    onChangeText={(t) => {
                      password = t;
                    }}>
                    {currentPassword}
                  </TextInput>
                  <TouchableOpacity
                    style={{ justifyContent: "center", paddingRight: 15 }}
                    onPress={() => {
                      setHidden1(!hidden1);
                    }}>
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                        alignSelf: "center",
                        tintColor: "#000",
                      }}
                      source={hidden1 ? Images.password_eye : Images.open_eyes_icon} />
                  </TouchableOpacity>
                </View>
              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, { marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT) }]}>
                <Text style={[Styles.FieldStyle, Styles.REGULAR_16]}>
                  New password
                </Text>
                <View
                  style={[
                    styles.input,
                    { flexDirection: "row", alignContent: "flex-end" }]}>
                  <TextInput
                    style={{ flex: 1 }}
                    placeholder="New password"
                    secureTextEntry={hidden2}
                    onChangeText={(t) => {
                      new_password = t;
                    }}>
                    {currentPassword}
                  </TextInput>
                  <TouchableOpacity
                    style={{ justifyContent: "center", paddingRight: 15 }}
                    onPress={() => {
                      setHidden2(!hidden2);
                    }}>
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                        alignSelf: "center",
                        tintColor: "#000",
                      }}
                      source={hidden2 ? Images.password_eye : Images.open_eyes_icon} />
                  </TouchableOpacity>
                </View>
              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, { marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT), borderBottomWidth: 0.5, borderColor: "#E7ECF2", paddingBottom: 10 }]}>
                <Text style={[Styles.FieldStyle, Styles.REGULAR_16]}>
                  Re-enter new password
                </Text>
                <View
                  style={[
                    styles.input,
                    { flexDirection: "row", alignContent: "flex-end" }]}>
                  <TextInput
                    style={{ flex: 1 }}
                    placeholder="Re-enter new password"
                    secureTextEntry={hidden3}
                    onChangeText={(t) => {
                      re_password = t;
                    }}>
                    {currentPassword}
                  </TextInput>
                  <TouchableOpacity
                    style={{ justifyContent: "center", paddingRight: 15 }}
                    onPress={() => {
                      setHidden3(!hidden3);
                    }}>
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                        alignSelf: "center",
                        tintColor: "#000",
                      }}
                      source={hidden3 ? Images.password_eye : Images.open_eyes_icon} />
                  </TouchableOpacity>
                </View>
              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, { marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT) }]}>
                <Text style={[Styles.BOLD_22, { color: '#272D37', lineHeight: 30 }]}>
                  Social profiles
                </Text>
              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, { marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT), borderBottomWidth: 0.5, borderColor: "#E7ECF2", paddingBottom: 10 }]}>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      alignContent: "flex-end",
                      marginBottom: 10,
                      marginTop: 10,
                      textAlign: "center",
                      alignItems: "center",
                    },
                  ]}
                >
                  <Svg
                    style={{ marginRight: 10 }}
                    id="Group_312"
                    data-name="Group 312"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <Circle
                      id="Ellipse_1"
                      data-name="Ellipse 1"
                      cx="16"
                      cy="16"
                      r="16"
                      fill="#fff"
                    />
                    <Path
                      id="Icon_awesome-facebook"
                      data-name="Icon awesome-facebook"
                      d="M32.563,16.563a16,16,0,1,0-18.5,15.806V21.188H10V16.563h4.065V13.037c0-4.01,2.387-6.225,6.043-6.225a24.624,24.624,0,0,1,3.582.312v3.935H21.67a2.313,2.313,0,0,0-2.607,2.5v3H23.5l-.71,4.625H19.063V32.369A16.006,16.006,0,0,0,32.563,16.563Z"
                      transform="translate(-0.563 -0.563)"
                      fill="#167af2"
                    />
                  </Svg>
                  <Text
                    style={{
                      ...Styles.MEDIUM_16,
                      lineHeight: 22,
                      color: "#272D37",
                    }}
                  >
                    Connect with Facebook
                  </Text>
                  <View style={styles.toggleButtons}>
                    <TouchableOpacity
                      onPress={() => {
                        if (userDetail.socialtype == "Facebook" || userDetail.socialtype == "Google") {
                          alert("Only one social can be linked");
                        } else {
                          handleFacebookLogin();
                        }
                      }}
                    >
                      {userDetail.socialtype == "Facebook" ? (
                        <Image
                          source={require("../assets/images/check_box_purple.png")}
                        />
                      ) : (
                        <Image
                          source={require("../assets/images/checkbox_grey.png")}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      marginBottom: 10,
                      textAlign: "center",
                      alignItems: "center",
                    },
                  ]}
                >
                  <Image
                    style={{
                      marginRight: 0,
                      justifyContent: "center",
                      alignSelf: "center",
                      marginRight: 10,
                    }}
                    source={require("../assets/images/gmail.png")}
                  />
                  <Text
                    style={{
                      ...Styles.MEDIUM_16,
                      lineHeight: 22,
                      color: "#272D37",
                    }}
                  >
                    Connect with Google
                  </Text>

                  <View style={styles.toggleButtons}>
                    <TouchableOpacity
                      onPress={() => {
                        if (userDetail.socialtype == "Facebook" || userDetail.socialtype == "Google") {
                          alert("Only one social can be linked");
                        } else {
                          signInAsync()
                        }
                      }}
                    >
                      {userDetail.socialtype == "Google" ? (
                        <Image
                          source={require("../assets/images/check_box_purple.png")}
                        />
                      ) : (
                        <Image
                          source={require("../assets/images/checkbox_grey.png")}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, { marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT) }]}>
                <Text style={[Styles.BOLD_22, { color: '#272D37', lineHeight: 30 }]}>
                  Notifications
                </Text>
              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, { marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT) }]}>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      alignContent: "flex-end",
                      marginBottom: 10,
                      marginTop: 10,
                      textAlign: "center",
                      alignItems: "center",
                    },
                  ]}
                >
                  <Text
                    style={{
                      ...Styles.REGULAR_16,
                      lineHeight: 22,
                      color: "#272D37",
                    }}
                  >
                    Turn on/off push notifications
                  </Text>

                  <View style={styles.toggleButtons}>
                    <TouchableOpacity onPress={() => showNotifyOn()}>
                      {statusNotifyOn == true ? (
                        <Image
                          source={require("../assets/images/check_box_purple.png")}
                        />
                      ) : (
                        <Image
                          source={require("../assets/images/checkbox_grey.png")}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      // marginBottom: 15,
                      textAlign: "center",
                      alignItems: "center",
                    },
                  ]}
                >
                  <Text
                    style={{
                      ...Styles.REGULAR_16,
                      lineHeight: 22,
                      color: "#272D37",
                    }}
                  >
                    Turn on/off email updates
                  </Text>

                  <View style={styles.toggleButtons}>
                    <TouchableOpacity onPress={() => showNotifyOff()}>
                      {statusNotifyOff == true ? (
                        <Image
                          source={require("../assets/images/check_box_purple.png")}
                        />
                      ) : (
                        <Image
                          source={require("../assets/images/checkbox_grey.png")}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle, { marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT), alignItems: "center" }]}>
                <Text style={[Styles.REGULAR_15, { color: '#686E76', lineHeight: 22 }]}>
                  App Viersion 8.8.0 Build 2023 release prod
                </Text>
              </View>
              {/* /*************************section code end************************* */}

              {/* /*************************section code end************************* */}
            </ScrollView>
          </LinearGradient>
        </LinearGradient>

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
    </View>
  );
}

const styles = StyleSheet.create({
  customHeader: {
    ...Platform.select({
      ios: {
        marginTop: 30,
      },
      android: {
        marginTop: 30,
      },
      default: {},
    }),
  },
  imgBackground: {
    width: "100%",
    height: "100%",
  },
  toggleButtons: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flex: 1,
  },
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#4B38D3",
  },
  heading: {
    ...Styles.BOLD_19,
    lineHeight: 26,
    color: "#272D37",
    marginBottom: 5,
    // fontFamily: 'sp_bold',
  },
  secondHeading: {
    ...Styles.REGULAR_16,
    lineHeight: 22,
    marginTop: 10,
    color: "#272D37",
  },
  input: {
    backgroundColor: "#FFF",
    paddingLeft: 15,
    borderRadius: 15,
    textAlign: "center",
    justifyContent: "center",
    marginTop: 10,
    height: 50,
  },
  background_style: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  signup: {
    borderRadius: 10,
    marginLeft: 30,
    marginTop: 10,
    marginRight: 30,
    bottom: "-66%",
    height: 50,
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  center: {
    alignSelf: "center",
    marginLeft: 15,
    marginRight: 15,
    alignContent: "center",
    textAlign: "center",
    alignItems: "center",
    fontSize: 14,
    justifyContent: "center",
  },
  profile_view: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    flexDirection: "column",
    width: 90,
    height: 90,
    alignItems: "center",
    marginRight: 20,
  },
  profile_image: {
    borderWidth: 3,
    borderColor: "#4B38D3",
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  linerGradient_background: {
    borderRadius: 25,
    width: "100%",
    height: "100%",
    padding: 2,
  },
  lower_view: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    height: "100%",
    overflow: "hidden",
  },
  heading_top: {
    color: "#FFF",
    fontSize: 20,
    // marginTop: 20,
    justifyContent: "center",
    textAlign: "center",
    flex: 1,
    // marginRight: 10,
    fontWeight: "bold",
  },
  profile_name: {
    fontSize: 18,
    fontWeight: "700",
    alignItems: "center",
    color: "#fff",
  },
  profile_username: {
    fontSize: 14,
    alignItems: "center",
    marginTop: 5,
    color: "#C4C3E7",
  },
  zero_common: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5,
    fontWeight: "bold",
  },
  follow_common: {
    color: "#fff",
    fontSize: 14,
    marginRight: 30,
  },
  border_middle: {
    backgroundColor: "#B3B6BA",
    opacity: 0.3,
    width: "100%",
    height: 1,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "center",
  },
});
