import React, { useState, useRef, useEffect } from "react";
import { Video } from "expo-av";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  ScrollView,
  FlatList,
  Button,
  useWindowDimensions,
  Share,
  RefreshControl,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Dimensions,
  ImageBackground,
} from "react-native";
import {
  ModelView,
  ProfileModel,
  ReportModelView,
  StarModel,
} from "../Components/ModeLView";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import CheckBox from "@react-native-community/checkbox";
import { LinearGradient } from "expo-linear-gradient";
import RBSheet from "react-native-raw-bottom-sheet";
import apiDetails from "../../api/AllApis";
import { styles } from "../../assets/styles/challanges/challange_details";
import AsyncStorage from "@react-native-async-storage/async-storage";
import constants from "../../assets/constants";
import { useNavigation } from "@react-navigation/native";
import normalize from "react-native-normalize";
import Images from "../../assets/Images";
import Styles from "../../constants/Styles";
import Contants from "../../constants/Contants";
import { RFValue } from "react-native-responsive-fontsize";
import { HeaderModel } from "../Components/NewModelView";

function Challange_details({ navigation, route }) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [selected, setSelected] = useState(0);
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [challangeDetails, setChallangeDetails] = useState([{}]);
  const [like_id, setLike_id] = useState(-1);
  const [starModelShow, setStarModelShow] = useState(false);
  const [playVideo, setPlayVideo] = useState(0);
  const [refreshed, setRefreshed] = useState(false);



  const refRBSheet = useRef();

  //api call
  const apiCall = () => {
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);
        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .post(a.get_challengeByID, { challenge_id: route.params.data.challenges_id })
          .then((response) => {
            // setRefresh(false); 
            if (response.status == "200") {
              setChallangeDetails(response.data.chalange);
            } else {
              console.log(response);
              // alert('Oops something went wrong');
            }
          });
      }
    });
  };

  //Time ago function
  const showTimeAgo = (time) => {
    if (time) {
      time = time.replace("T", " ");
      time = time.replace("000000Z", "000");
      var tem_d = Moment(time).fromNow();
      return tem_d;
    } else {
      return "";
    }
  };

  //like model code
  const openStarModal = (id) => {
    setLike_id(id);
    setStarModelShow(true);
  };

  const closeStarModal = (type, index = -1) => {
    if (index == -1) {
      if (like_id == -1) {
        setLike_id(-1);
        setStarModelShow(false);
        return;
      } else {
        index = like_id;
      }
    }

    var temp_l = challangeDetails;
    var id = temp_l[0].posts[index].id;
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);

        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .post(a.postLike, {
            liked_by: d.id,
            post_id: id,
            type: type,
          })
          .then((response) => {
            if (response.data.status == "200") {
              console.log(response.data);
              if (temp_l[0].posts[index].is_liked > 0) {
                temp_l[0].posts[index].is_liked = 0;
                temp_l[0].posts[index].likes = temp_l[0].posts[index].likes - 1;
              } else {
                temp_l[0].posts[index].is_liked = 1;
                temp_l[0].posts[index].likes = temp_l[0].posts[index].likes + 1;
              }
              setChallangeDetails(temp_l);
              setLike_id(-1);
              index = -1;
              setRefreshed(!refreshed);
              setStarModelShow(false);
            } else {
              console.log(response.data);
              setLike_id(-1);
              index = -1;
              setStarModelShow(false);
            }
          });
      }
    });
  };
  //like model end


  /*********************share code here*********************************************** */

  function shareComment(post_id, index) {
    var temp_l = challangeDetails;
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);

        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .post(a.sharePost, {
            post_id: post_id,
          })
          .then((response) => {
            if (response.data.status == "200") {
              temp_l[0].posts[index].share = temp_l[0].posts[index].share + 1;
              setChallangeDetails(temp_l);
            } else {
              console.log(response.data);
            }
          });
      }
    });
  }

  const link =
    "https://drive.google.com/file/d/1APoa717-oaz42OWfqPxvPMhjD8xuhpua/view?usp=sharing";

  const onShare = async (post_id, index) => {
    // shareComment(post_id, index);
    try {
      const result = await Share.share({
        message: link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          shareComment(post_id, index);
        } else {
          // shared
          shareComment(post_id, index);
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  /*****************share code here*************************************************** */

  if (!challangeDetails[0].id) {
    apiCall();
  }

  const challangeEnd = (dd) => {
    if (dd) {
      dd = dd.split(" ")[0];
      let strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return dd.split("-")[2] + " " + strArray[Number(dd.split("-")[1]) - 1];
    } else {
      return "";
    }

  }

  return (
    <SafeAreaView style={[styles.container]}>
      <LinearGradient
        colors={["#77A1D3", "#77A1D3", "#77A1D3"]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 1 }}
        style={[{
          ...Platform.select({
            ios: {
              flexDirection: "row", zIndex: 0,
              height: Dimensions.get('window').height + 30,
              marginTop: -30
            },
            android: {
              flexDirection: "row",
              height: Dimensions.get('window').height,
              zIndex: 0
            }
          })
        }]}
      >
        <View style={{ zIndex: 1000000 }}>
          <StatusBar
            animated={true}
            translucent
            backgroundColor="transparent"
            barStyle={"light-content"}
          />

          <View
            style={[
              styles.customHeader,
              {
                ...Platform.select({
                  ios: {
                    height: "7%", width: "100%", flexDirection: "row", marginTop: 35
                  },
                  android: {
                    height: "7%", width: "100%", flexDirection: "row", marginTop: 20
                  }
                })
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack()
              }}
            >
              <Image
                style={{
                  width: 28,
                  height: 28,
                  margin: 20,
                  marginLeft: 20,
                  tintColor: "#ffffff",
                }}
                source={Images.all_screen_back_black_arrow_icon}
              />
            </TouchableOpacity>
          </View>

          <View style={{
            flexDirection: "row",
            ...Platform.select({
              ios: {
                height: 180,
                width: "100%",
                //  backgroundColor:"green"
              },
              android: {
                height: 180,
                width: "100%",
                //  backgroundColor:"green"
              }
            })
          }}>
            <View style={{ width: "100%" }}>
              <Text numberOfLines={1}
                style={[Styles.REGULAR_22, {
                  marginLeft: 20,
                  color: "#ffffff",
                  lineHeight: 22,
                  marginTop: 20,
                  marginBottom: 5,
                }]}
              >
                {route.params.data.title}
                {/* Easy (Camila Cabello so... */}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{ marginLeft: 20, flex: 1, flexDirection: "column" }}
                >
                  <Text numberOfLines={1}
                    style={[Styles.REGULAR_15, { lineHeight: 22, color: "#fff", fontSize: 14, marginBottom: 5 }]}
                  >
                    Challange End on {challangeEnd(challangeDetails[0].days_left)}.
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text numberOfLines={1} style={[Styles.REGULAR_15, { lineHeight: 22, color: "#FFFFFF80", opacity: 0.5 }]}>
                      Created by{" "}
                    </Text>
                    <Text numberOfLines={1} style={[Styles.REGULAR_15, { lineHeight: 22, color: "#fff" }]}>
                      {route.params.data.username}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    alignContent: "flex-end",
                    justifyContent: "flex-end",
                    marginRight: 20,
                  }}
                >
                  <Text numberOfLines={1} style={[Styles.REGULAR_15, { lineHeight: 22, color: "#FFFFFF80", alignSelf: "flex-end" }]}>
                    Winning Prize
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignContent: "flex-end",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        marginLeft: 7,
                        marginRight: 5,
                        marginTop: 4,
                      }}
                      source={require("../../assets/images/cup_winner.png")}
                    />
                    <Text style={[Styles.REGULAR_22, { lineHeight: 29, color: "#fff", fontSize: 22 }]}>
                      ${route.params.data.winning_price}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[{
                // backgroundColor:"red",
                paddingLeft: 20,
                marginTop: 25
              }]}>
                <Text numberOfLines={1} style={[Styles.REGULAR_15, {
                  lineHeight: 22,
                  color: "#fff",
                }]}>Orignal Song</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              padding: 15,
              borderRadius: 40,
              backgroundColor: "#ffffff",
              marginLeft: 25,
              marginRight: 25,
              height: 80,
              flexDirection: "row",
              alignContent: "center",
              textAlign: "center",
              zIndex: 999999,
              marginTop: -30,
              marginBottom: -30,
              alignItems: "center",
              elevation: 3,
            }}
          >
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 10,
              }}
              source={{ uri: apiDetails.publicImage + challangeDetails[0].cover_photo }}
            />

            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} style={[Styles.MEDIUM_15, { lineHeight: 22, color: "#272D37" }]}>
                {challangeDetails[0].title}
              </Text>
              <Text numberOfLines={1} style={[Styles.REGULAR_12, { lineHeight: 12, color: "#686E76" }]}>
                {challangeDetails[0].artist}
              </Text>
            </View>

            <Image
              style={{ width: 30, height: 30, tintColor: "#000000" }}
              source={require("../../assets/images/play_icon.png")}
            />
          </View>

          <LinearGradient
            colors={["#FEFAF9", "#F7EFFA"]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 1 }}
            style={{
              ...Platform.select({
                ios: {
                  flexDirection: "row",
                  // flex: 1,
                  borderRadius: 25,
                  paddingTop: 30,
                  height: Dimensions.get('window').height - 285
                },
                android: {
                  flexDirection: "row",
                  // flex: 1,
                  borderTopRightRadius: 25,
                  borderTopStartRadius: 25,
                  borderTopLeftRadius: 25,
                  borderTopEndRadius: 25,
                  paddingTop: 30,
                  height: Dimensions.get('window').height - 230
                }
              })
            }}
          >
            <View style={{ marginTop: -5, flex: 1 }}>
              <View style={{
                flexDirection: "column",
                ...Platform.select({
                  ios: {
                    height: Dimensions.get('window').height - 325,
                    // backgroundColor:"green"
                  },
                  android: {
                    height: Dimensions.get('window').height - 295,
                    // backgroundColor:"green"
                  }
                })
              }}>
                <View
                  style={{
                    flex: 1,
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 20,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={[Styles.MEDIUM_16, {
                        color: "#272D37",
                        marginBottom: 20,
                        flex: 1,
                        lineHeight: 22
                      }]}
                    >
                      Challenges Videos
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        refRBSheet.current.open();
                      }}
                    >
                      <View style={{ padding: 5, width: 25, height: 25 }}>
                        <Image
                          style={{ width: 15, height: 15 }}
                          source={require("../../assets/images/filter.png")}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>

                  <FlatList
                    extraData={refreshed}
                    data={challangeDetails[0].posts}
                    ListEmptyComponent={<Text>No data found</Text>}
                    refreshControl={
                      <RefreshControl
                        refreshing={refresh}
                        onRefresh={() => apiCall()}
                      />
                    }
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                      <View
                        style={{ flexDirection: "column", marginBottom: 20 }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignContent: "center",
                            textAlign: "center",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 18,
                              marginRight: 10,
                            }}
                            source={{
                              uri: apiDetails.publicVideo + item.thumbnail,
                            }}
                          />

                          <TouchableOpacity onPress={() => {
                            AsyncStorage.getItem("userInfo").then((user) => {
                              if (user) {
                                var d = JSON.parse(user);
                                if (d.id != item.post_by) {
                                  navigation.navigate("User_Profile", {
                                    user_id: item.post_by,
                                  })
                                } else {
                                  alert("Its your post");
                                }
                              }
                            });

                          }}>
                            <View style={{ flex: 1 }}>
                              <Text numberOfLines={1} style={[Styles.MEDIUM_15, { lineHeight: 22, color: "#272D37" }]}>
                                {item.name} {item.lastname}
                              </Text>
                              <Text numberOfLines={1} style={[Styles.REGULAR_12, { lineHeight: 18, color: "#686E76" }]}>
                                {item.username}
                              </Text>
                            </View>
                          </TouchableOpacity>

                          {/* <Image
                            style={{
                              width: 20,
                              height: 20,
                              resizeMode: "center",
                            }}
                            source={require("../../assets/images/three_black_dots.png")}
                          /> */}
                        </View>
                        <View style={{ marginTop: 10 }}>


                          {playVideo == item.post_id ? <Video
                            source={{
                              uri: apiDetails.publicVideo + "" + item.video,
                            }}
                            poster={apiDetails.publicVideo + "" + item.thumbnail}
                            resizeMode={"cover"}
                            posterResizeMode={"cover"}
                            shouldPlay={true}
                            isLooping
                            useNativeControls
                            pictureInPicture={true}
                            style={{
                              height: 250,
                              borderRadius: 20
                            }}
                          /> : <ImageBackground source={{ uri: apiDetails.publicVideo + "" + challangeDetails[0].thumbnail }}
                            style={[{
                              width: "100%",
                              height: 250,
                              alignItems: "center",
                              justifyContent: "space-between"
                            }]}
                            imageStyle={[{
                              borderRadius: 25
                            }]}
                          >
                            <View style={[{
                              marginTop: 10,
                              width: Dimensions.get('window').width - 60,
                              marginHorizontal: 20,
                              alignItems: 'flex-end'
                            }]}>
                              {/* <TouchableOpacity>
                                  <Image
                                    source={Images.head_set_icon}
                                    style={[{
                                      width: 20,
                                      height: 20,
                                    }]}
                                    resizeMode="contain"
                                  />
                                </TouchableOpacity> */}
                            </View>
                            <View style={[{
                              // backgroundColor:'red',
                              // marginTop:10,
                              width: Dimensions.get('window').width - 220,
                              marginHorizontal: 20,
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: "space-between"
                            }]}>
                              <TouchableOpacity>
                                {/* <Image
                                    source={Images.decrees_video_icon}
                                    style={[{
                                      width: 25,
                                      height: 25,
                                    }]}
                                    resizeMode="contain"
                                  /> */}
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => {
                                  // console.log(item);
                                  // console.log(apiDetails.publicVideo + "" + item.video);
                                  setPlayVideo(item.post_id);
                                }}
                              >
                                <Image
                                  source={Images.play_icon}
                                  style={[{
                                    width: 40,
                                    height: 40,
                                  }]}
                                  resizeMode="contain"
                                />
                              </TouchableOpacity>
                              <TouchableOpacity>
                                {/* <Image
                                    source={Images.increes_video_icon}
                                    style={[{
                                      width: 25,
                                      height: 25,
                                    }]}
                                    resizeMode="contain"
                                  /> */}
                              </TouchableOpacity>
                            </View>
                            <View style={[{
                              // backgroundColor:'red',
                              marginBottom: 10,
                              width: Dimensions.get('window').width - 70,
                              // marginTop:-10,
                            }]}>
                              <View style={[{
                                ...Platform.select({
                                  ios: {
                                    backgroundColor: '#272D37',
                                    width: 30,
                                    flexDirection: "row",
                                    alignItems: 'center',
                                    height: 30,
                                    borderRadius: 4
                                  },
                                  android: {
                                    backgroundColor: '#272D37',
                                    width: 30,
                                    flexDirection: "row",
                                    alignItems: 'center',
                                    height: 30,
                                    borderRadius: 4
                                  }
                                })
                              }]}>
                                <Image
                                  source={Images.song_bars}
                                  style={[{
                                    width: 20,
                                    height: 20,
                                    marginLeft: 5
                                  }]}
                                  resizeMode="contain"
                                />
                                {/* <Text style={[Styles.REGULAR_13, {
                                  color: "#FFFFFF",
                                  lineHeight: 17,
                                  marginLeft: 5
                                }]}>2:30 min</Text> */}
                              </View>
                            </View>
                          </ImageBackground>}
                          <View></View>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            marginTop: 10,
                            marginBottom: 5,
                            alignItems: "center",
                          }}
                        >
                          <TouchableOpacity
                            style={{ width: 25, height: 25, marginRight: 5 }}
                            onPress={() => {
                              if (challangeDetails[0].posts[index].is_liked == 0) {
                                openStarModal(index);
                              } else {
                                closeStarModal("1", index);
                              }
                            }}
                          >
                            <Image
                              style={{
                                width: 25,
                                height: 25,
                                resizeMode: "center",
                              }}
                              source={item.is_liked ? Images.comment_star_icon : Images.comment_star_icon_outline}
                            />
                          </TouchableOpacity>
                          <Text
                            style={[Styles.REGULAR_13, {
                              lineHeight: 17,
                              color: "#272D37",
                              marginRight: 15,
                            }]}
                          >
                            {item.likes}
                          </Text>

                          <TouchableOpacity
                            style={{ width: 25, height: 25, marginRight: 5 }}
                            onPress={() => {
                              navigation.navigate("Comment_screen", {
                                post_id: item.post_id,
                              });
                            }}
                          >
                            <Image
                              style={{
                                width: 25,
                                height: 25,
                                resizeMode: "center",
                              }}
                              source={require("../../assets/images/comment_unfilled.png")}
                            />
                          </TouchableOpacity>
                          <Text
                            style={[Styles.REGULAR_13, {
                              lineHeight: 17,
                              color: "#272D37",
                              marginRight: 15,
                            }]}
                          >
                            {item.comments}
                          </Text>

                          <TouchableOpacity
                            style={{ width: 25, height: 25, marginRight: 5 }}
                            onPress={() => {
                              // console.log(item);
                              onShare(item.post_id, index)

                            }}
                          >
                            <Image
                              style={{
                                width: 25,
                                height: 25,
                                resizeMode: "center",
                              }}
                              source={require("../../assets/images/share.png")}
                            />
                          </TouchableOpacity>
                          <Text
                            style={[Styles.REGULAR_13, {
                              lineHeight: 17,
                              color: "#272D37",
                              marginRight: 15,
                            }]}
                          >
                            {item.share}
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text
                            style={{
                              color: "#272D37",
                              fontWeight: "normal",
                              fontSize: 14,
                            }}
                          >
                            <Text
                              style={[Styles.SEMIBOLD_14, {
                                color: "#272D37",
                                lineHeight: 22,
                              }]}
                            >
                              {item.name} {item.lastname}{' '}
                              <Text
                                style={[Styles.REGULAR_14, {
                                  color: "#272D37",
                                  lineHeight: 17,
                                }]}
                              >
                                {route.params.data.genere}
                              </Text>
                            </Text>
                          </Text>
                        </View>

                        <Text
                          style={{
                            color: "#686E76",
                            fontSize: 12,
                            marginTop: 5,
                          }}
                        >
                          {showTimeAgo()}
                        </Text>
                      </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />

                  <TouchableOpacity
                    style={styles.accept}
                    onPress={() => {
                      navigation.navigate("StartSinging", {
                        id: challangeDetails[0].id,
                        type: "challange"
                      });
                    }}
                  >
                    <LinearGradient
                      style={{
                        borderRadius: 15, height: 40, justifyContent: "center",
                        alignItems: "center"
                      }}
                      colors={constants.AppColor.LINEAR_GRADIENT_COLOR_BUTTON}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 0, y: 1 }}
                    >
                      <Text style={[{
                        ...Styles.MEDIUM_15,
                        lineHeight: 22,
                        color: "#fff"
                      }]}>
                        Accept Challenge
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

                {/* BOTTOM SHEET */}
                <RBSheet
                  ref={refRBSheet}
                  closeOnDragDown={true}
                  closeOnPressMask={false}
                  customStyles={{
                    wrapper: {
                      flexDirection: "column",
                    },
                    container: {
                      height: 240,
                      backgroundColor: "transparent",
                    },
                    draggableIcon: {
                      backgroundColor: "#B3B6BA",
                      width: 50,
                      height: 3,
                      display: "none",
                    },
                  }}
                >
                  <View style={{ flex: 1, flexDirection: "column" }}>
                    <View
                      style={{
                        backgroundColor: "#ffffff",
                        marginLeft: 15,
                        marginRight: 15,
                        borderRadius: 15,
                        height: normalize(170),
                      }}
                    >
                      <View
                        style={[
                          {
                            //   backgroundColor:'green',
                            alignItems: "center",
                            marginTop: normalize(20),
                          },
                        ]}
                      >
                        <Text
                          style={[Styles.BOLD_16,
                          {
                            lineHeight: 22,
                            color: "#000",
                          },
                          ]}
                        >
                          Sort by
                        </Text>
                      </View>
                      <View
                        style={[
                          {
                            //   backgroundColor:'red',
                            marginTop: normalize(10),
                          },
                        ]}
                      >
                        <TouchableOpacity>
                          <View
                            style={[
                              {
                                //   backgroundColor:'yellow',
                                flexDirection: "row",
                                marginHorizontal: normalize(20),
                                justifyContent: "space-between",
                                marginTop: normalize(10),
                                height: normalize(30),
                                alignItems: "center",
                              },
                            ]}
                          >
                            <Text
                              style={[Styles.MEDIUM_15,
                              {
                                lineHeight: 22,
                                color: "#000",

                              },
                              ]}
                            >
                              Latest
                            </Text>
                            {/* <Image
                              style={[
                                {
                                  width: normalize(20),
                                  height: normalize(20),
                                },
                              ]}
                              resizeMode="contain"
                              source={Images.filter_chack}
                            /> */}
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <View
                            style={[
                              {
                                //   backgroundColor:'yellow',
                                flexDirection: "row",
                                marginHorizontal: normalize(20),
                                justifyContent: "space-between",
                                marginTop: normalize(10),
                                height: normalize(30),
                                alignItems: "center",
                              },
                            ]}
                          >
                            <Text
                              style={[Styles.MEDIUM_15,
                              {
                                lineHeight: 22,
                                color: "#000",
                              },
                              ]}
                            >
                              Popular
                            </Text>
                            {/* <Image
                              style={[
                                {
                                  width: normalize(20),
                                  height: normalize(20),
                                },
                              ]}
                              resizeMode="contain"
                              source={Images.filter_chack}
                            /> */}
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <View
                            style={[
                              {
                                //   backgroundColor:'yellow',
                                flexDirection: "row",
                                marginHorizontal: normalize(20),
                                justifyContent: "space-between",
                                marginTop: normalize(10),
                                height: normalize(30),
                                alignItems: "center",
                              },
                            ]}
                          >
                            <Text
                              style={[Styles.MEDIUM_15,
                              {
                                color: "#000",
                                lineHeight: 22,
                              },
                              ]}
                            >
                              Most Accepted
                            </Text>
                            {/* <Image
                              style={[
                                {
                                  width: normalize(20),
                                  height: normalize(20),
                                },
                              ]}
                              resizeMode="contain"
                              source={Images.filter_chack}
                            /> */}
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.signup}
                      onPress={() => {
                        refRBSheet.current.close();
                      }}
                    >
                      <LinearGradient
                        style={{
                          borderRadius: 25, height: 40, justifyContent: 'center',
                          alignItems: 'center'
                        }}
                        colors={["#272D37", "#272D37", "#272D37"]}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                      >
                        <Text style={[Styles.MEDIUM_15, { lineHeight: 22, color: "#fff" }]}>
                          Cancel
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </RBSheet>
              </View>
              <StarModel
                transparent={true}
                visible={starModelShow}
                onRequestClose={() => { setStarModelShow(false); }}
                closeModelPress={() => { setStarModelShow(false) }}
                fireOnPress={() => closeStarModal("2")}
                goodLuckOnPress={() => closeStarModal("3")}
                goldenBuzzOnPress={() => closeStarModal("4")}
                notBadOnPress={() => closeStarModal("5")}
                starOnPress={() => closeStarModal("1")}
              />
            </View>
          </LinearGradient>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

export default Challange_details;
