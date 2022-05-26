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
  FlatList,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../assets/styles/MessagesScreen";
import FirebaseCode from "../FirebaseCode";
import { GiftedChat, Bubble, SystemMessage } from "react-native-gifted-chat";
import {
  ModelView,
  ReportModelView,
  ProfileModel,
} from "./Components/ModeLView";
import Images from "../assets/Images";
import normalize from "react-native-normalize";
import apiDetails from "../api/AllApis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import constants from "../assets/constants";
import Styles from "../constants/Styles";

export default function MessagesScreen({ navigation, route }) {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState();
  const [userList, setUserList] = useState();
  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState(false);
  const [selectOne, setSelectOne] = useState(false);
  const [selectTwo, setSelectTwo] = useState(false);
  const [selectThree, setSelectThree] = useState(false);
  const [selectFour, setSelectFour] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(-1);
  var image_url = Images.girl_img;
  var loadMessages = false;
  var userDatas = {};
  var tmp_list = [];
  var user_ids = "";
  var list;
  var i = 1;

  var tmp = [];

  const sendNotification = (msg) => {
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);
        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .post(a.sendMessageNotification, { user_id: route.params?.userData.receiver_id, msg: msg, username: d.username })
          .then((response) => {
            if (response.data.status == "200") {
            } else {
              console.log(response.data);
            }
          }).catch((error) =>{console.log(error);});
      }
    });
  };


  if (userData == undefined) {
    if (route.params?.userData) {
      userDatas = route.params?.userData;
      if(route.params?.userData.profile.image != null){
        image_url = {
          uri : apiDetails.publicImage + ""+route.params?.userData.profile.image
        }
      }else{
        image_url = Images.girl_img;
      }
      
    } else {
      alert("Oops, please login again");
    }
  }

  

  if (data.length <= 0) {
    FirebaseCode.loadMessages(
      route.params?.userData.sender_id,
      route.params?.userData.receiver_id,
      setData
    );
  } else {
    data.forEach((datass) => {
      let datas = datass.val();
      tmp.push({
        _id: i,
        text: datas.text,
        createdAt: datas.created_on,
        user: {
          _id: datas.sender_id,
          name: "React Native",
        },
      });
      i = i + 1;
    });
    tmp.reverse();
    loadMessages = true;
  }

  function onSend(messageArray) {
    const msg = messageArray[0];
    FirebaseCode.sendMessage(
      route.params?.userData.sender_id,
      route.params?.userData.receiver_id,
      msg.text
    );
    sendNotification(msg.text);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, {
        _id: i,
        text: msg.text,
        createdAt: new Date().getTime(),
        user: {
          _id: route.params?.userData.sender_id,
          name:
            route.params?.userData.firstname +
            " " +
            route.params?.userData.lastname,
          avatar: "https://placeimg.com/140/140/any",
        },
      })
    );
  }

  var chat = (
    <GiftedChat
      messages={tmp}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: route.params?.userData.sender_id,
      }}
    />
  );

  var chat_view;
  if (Platform.OS === "android") {
    chat_view = ( 
      <KeyboardAvoidingView 
        behavior="height" 
        keyboardVerticalOffset={10}
        style={styless.customScrollview}
        enabled
      >
        {chat}
      </KeyboardAvoidingView>
    );
  } else {
    chat_view = chat;
  }

  const getUserDetail = (id) => {
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);
        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .post(a.get_user_details_by_id, {
            user_id: route.params?.userData.receiver_id,
          })
          .then((response) => {
            if (response.data.status == "200") {
              var d1 = response.data.data;
              setUserData(d1);
            } else {
              console.log("user Detail else--------", response);
            }
          }).catch((error) =>{console.log(error);});
      }
    });
  };

  if (!userData) {
    getUserDetail(route.params?.userData.receiver_id);
  } else if (isFollowing == -1) {
    setIsFollowing(userData.is_following);
  }

  const openModal = () => {
    setShow(true)
  };
  const closeModal = () => {
    setShow(false)
  };

  const OneSelect = () => {
    { selectOne === true ? setSelectTwo(false) + setSelectThree(false) + setSelectFour(false) : null }
  }
  const TwoSelect = () => {
    { selectTwo === true ? setSelectOne(false) + setSelectThree(false) + setSelectFour(false) : null }
  }
  const ThreeSelect = () => {
    { selectThree === true ? setSelectTwo(false) + setSelectOne(false) + setSelectFour(false) : null }
  }
  const FourSelect = () => {
    { selectFour === true ? setSelectTwo(false) + setSelectThree(false) + setSelectOne(false) : null }
  }
  // /****************************Add following api************************************** */
  const followCheck = () => {
    apiCallForFollowing();
  };

  const apiCallForFollowing = () => {
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);
        var u = userData;

        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .post(a.post_add_following, {
            user_id: d.id,
            following_id: u.id,
          })
          .then((response) => {
            if (response.status == "200") {
              if (u.is_following > 0) {
                u.is_following = 0;
              } else {
                u.is_following = 1;
              }
              setUserData(u);
              setIsFollowing(u.is_following);
            } else {
              console.log(response);
              alert("Oops something went wrong");
            }
          }).catch((error) =>{console.log(error);});
      }
    });
  };
  /****************************Add following api************************************** */

  return (
    <SafeAreaView>
      <LinearGradient
        colors={constants.AppColor.LINEAR_GRADIENT_COLOR_BUTTON}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={{ height: Dimensions.get('window').height, marginTop: Platform.OS == 'ios' ? -47 : 0 }}
      >
        <StatusBar
          animated={true}
          translucent = {true}
          barStyle={"light-content"}
        />

        <View
          style={[
            styles.customHeader,
            { height: "7%", flexDirection: "row", marginBottom: 10, marginTop: 40 },
          ]}
        >
          <TouchableOpacity
            style={{ marginTop: 3 }}
            onPress={() => {
              // navigation.navigate("ChatList", {
              //     backValue: 'backScreen'
              // });
              navigation.goBack();
            }}
          >
            <Image
              style={{
                width: 16,
                height: 16,
                margin: 20,
                marginLeft: 30,
                tintColor: "#FFF",
              }}
              source={require("../assets/images/back.png")}
            />
          </TouchableOpacity>

          <Text style={styles.heading_top}>
            {route.params?.userData.profile.firstname}{" "}
            {route.params?.userData.profile.lastname}
          </Text>

          <TouchableOpacity
            style={{ marginTop: 24, marginRight: 20, marginLeft: 10 }}
            onPress={() => openModal()}
          >
            <Image
              style={{
                width: 16,
                height: 16,
                alignSelf: "center",
                tintColor: "#FFF",
                resizeMode: 'contain',
              }}
              source={require("../assets/images/three_black_dots.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.lower_view}>
          <LinearGradient
            colors={["#F7EFFA", "#FEFAF9"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[{
              ...Platform.select({
                ios: {
                  borderTopRightRadius: 40,
                  borderTopLeftRadius: 40,
                  height: Dimensions.get('window').height * 0.9083,
                  padding: 30,
                  paddingBottom: 50
                },
                android: {
                  borderTopRightRadius: 40,
                  borderTopLeftRadius: 40,
                  // height: "88%",
                  // padding: 20,
                  height: Dimensions.get('window').height * 0.9383,
                  paddingLeft: 20,
                  paddingRight: 20
                },
                default: {
                  borderTopRightRadius: 40,
                  borderTopLeftRadius: 40,
                  height: "90%",
                  padding: 20
                }
              })


            }]}
          >
            {route.params.listShow == "yes" ? (
              <View
                style={[
                  {
                    backgroundColor: "#fff",
                    flexDirection: "row",
                    height: 68,
                    borderRadius: normalize(20),
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: normalize(10),
                  },
                ]}
              >
                <Image
                  style={[
                    {
                      width: 48,
                      height: 48,
                      borderRadius: 16,
                    },
                  ]}
                  // source={
                  //   userData.image !== null
                  //     ? {
                  //         uri: userData.image,
                  //       }
                  //     : Images.demo_image
                  // }
                  source={Images.girl_img}
                  resizeMode="contain"
                />
                <View
                  style={[
                    {
                      // backgroundColor:'red',
                      width: Dimensions.get('window').width * 0.4525,
                    },
                  ]}
                >
                  <Text
                    style={[
                      {
                        color: "#272D37",
                        //  backgroundColor:'red',
                        ...Styles.REGULAR_16,
                      },
                    ]}
                  >
                    {route.params?.userData.profile.firstname}{" "}
                    {route.params?.userData.profile.lastname}
                  </Text>
                  <Text
                    style={[
                      {
                        color: "#686E76",
                        //    fontWeight:'bold',
                        ...Styles.REGULAR_14,
                        marginTop: 5,
                      },
                    ]}
                  >
                    {route.params?.userData.profile.username}
                  </Text>
                </View>
                {isFollowing == 0 ? (
                  <TouchableOpacity
                    onPress={() => {
                      followCheck();
                    }}
                    style={[
                      {
                        backgroundColor: "#000",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: normalize(20),
                        height: 30,
                        width: 78,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        {
                          color: "#fff",
                          //    fontWeight:'bold',
                          ...Styles.REGULAR_15
                        },
                      ]}
                    >
                      Follow
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      followCheck();
                    }}
                    style={[
                      {
                        backgroundColor: "#fff",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: normalize(20),
                        height: normalize(30),
                        width: normalize(78),
                        borderWidth: 0.5,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        {
                          color: "#000",
                          //    fontWeight:'bold',
                          ...Styles.REGULAR_15
                        },
                      ]}
                    >
                      Following
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : null}
            {loadMessages && chat_view}
          </LinearGradient>
        </View>
      </LinearGradient>
      <ProfileModel
        transparent={true}
        visible={show}
        onRequestClose={() => {
          setShow(false);
        }}
        onPressTouchOne={() => {
          setSelectOne(true);
          OneSelect();
        }}
        onPressTouchTwo={() => {
          setSelectTwo(true);
          TwoSelect();
        }}
        onPressTouchThree={() => {
          setSelectThree(true);
          ThreeSelect();
        }}
        onPressTouchFour={() => {
          setSelectFour(true);
          FourSelect();
        }}
        profileTopText="Report Profile"
        source={image_url}
        // sourceTouchOne={Images.Ellipse_white}
        sourceTouchOne={
          selectOne == true ? Images.green_right : Images.Ellipse_white
        }
        sourceTouchTwo={
          selectTwo == true ? Images.green_right : Images.Ellipse_white
        }
        sourceTouchThree={
          selectThree == true ? Images.green_right : Images.Ellipse_white
        }
        sourceTouchFour={
          selectFour == true ? Images.green_right : Images.Ellipse_white
        }
        TouchOneStyle={
          selectOne == true ? styless.TouchOneStyleTrue : styless.TouchOneStyle
        }
        TouchTwoStyle={
          selectTwo == true ? styless.TouchOneStyleTrue : styless.TouchOneStyle
        }
        TouchThreeStyle={
          selectThree == true
            ? styless.TouchOneStyleTrue
            : styless.TouchOneStyle
        }
        TouchFourStyle={
          selectFour == true ? styless.TouchOneStyleTrue : styless.TouchOneStyle
        }
        // TouchOneStyle={[styless.TouchOneStyle]}
        // sourceTouchTwo={Images.green_right}
        // sourceTouchThree={Images.green_right}
        // sourceTouchFour= {Images.green_right}
        TouchOneText="Abusing"
        TouchOneOneText="User"
        TouchTwoText="Fraud"
        TouchTwoTwoText="User"
        TouchThreeText="SPam"
        TouchThreeThreeText="Profile"
        TouchFourText="Illigal"
        TouchFourFourText="Content"
        profilebuttonText="Submit Report"
        placeholder="Add a custom reson here"
        onPress={() => closeModal()}
        onCancel={()=> closeModal()}
      // ModalBottomView={[{ flexDirection: 'row' }]}
      />
    </SafeAreaView>
  );
}
const styless = StyleSheet.create({
  TouchOneStyle: {
    backgroundColor: "#F5F5F7",
  },
  TouchOneStyleTrue: {
    backgroundColor: "#2DCB6F",
  },
  customScrollview: {
    ...Platform.select({
      ios: {
        marginTop: -27,
        flex: 1,
        marginBottom: 30
      },
      android: {
        marginTop: 0,
        flex: 1,
        marginBottom: 30
      },
      default: {
        marginTop: -20,
      },
    }),
  }
}); 