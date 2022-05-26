import React, { useState, useEffect } from "react";
import { Video } from "expo-av";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ImageBackground,
  Modal,
  Share,
  RefreshControl,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions,
  Platform
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Bottom_bar from "./Bottom_bar";
import Tabbar from "@mindinventory/react-native-tab-bar-interaction";
import ListChallange from "./challanges/ListChallange";
import Notifications_screen from "./Notifications_screen";
import Songbook_listing from "./Songbook_listing";
import apiDetails from "../api/AllApis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import constants from "../assets/constants";
import { IconHeader, NormalHeader } from "./Components/customHeader";
import Images from "../assets/Images";
import normalize from "react-native-normalize";
import { FlexView } from "./Components/FlexView";
import { set } from "react-native-reanimated";
import {
  ModelView,
  ProfileModel,
  ReportModelView,
  StarModel,
} from "./Components/ModeLView";
import Profile from "./Profile";
import Contants from "../constants/Contants";
import { EmptyCard } from "./Components/EmptyCard";
import { EmptyFbCard, EmptyHomeFeedCard } from "./Components/EmptyCardImage";
import { NewIconHeaderModel } from "./Components/NewModelView";
import Styles from "../constants/Styles";
import { RFValue } from "react-native-responsive-fontsize";
import { scale } from "react-native-size-matters";
import Header from "./common/Header";
import LoadingLottie from "./anim/LoadingLottie";

const activeHome = (isPlay) => {
  return (
    <View style={{ width: 70, height: 70, backgroundColor: "#77A1D3", borderRadius: 100, justifyContent: "center", alignItems: "center" }}>
      <Image
        style={{ width: 28, height: 28 }}
        source={require(`../assets/images/bottomtab_home_icon.png`)}
        resizeMode={'contain'}
      />
    </View>
  );
};

const activeList = (isPlay) => {
  return (
    <View style={{ width: 70, height: 70, backgroundColor: "#7ACACB", borderRadius: 100, justifyContent: "center", alignItems: "center" }}>
      <Image
        style={{ width: 20, height: 20 }}
        source={require(`../assets/images/music_bottom.png`)}
      />
    </View>
  );
};

const activeCamera = (isPlay) => {
  return (
    <View style={{ width: 70, height: 70, backgroundColor: "#7ACACB", borderRadius: 100, justifyContent: "center", alignItems: "center" }}>
      <Image
        style={{ width: 25, height: 25 }}
        source={require(`../assets/images/mike_bottom.png`)}
      />
    </View>
  );
};

const activeNotification = (isPlay) => {
  return (
    <View style={{ width: 70, height: 70, backgroundColor: "#E683AF", borderRadius: 100, justifyContent: "center", alignItems: "center" }}>
      <Image
        style={{ width: 20, height: 20 }}
        source={require(`../assets/images/profile_bottom.png`)}
      />
    </View>
  );
};

const activeUser = (isPlay) => {
  return (
    <View style={{ width: 70, height: 70, backgroundColor: "#7ACACB", borderRadius: 100, justifyContent: "center", alignItems: "center" }}>
      <Image
        style={{ width: 20, height: 20 }}
        source={require(`../assets/images/bell.png`)}
      />
    </View>
  );
};

const tabData = [
  {
    name: "Home",
    activeIcon: activeHome(true),
    inactiveIcon: (
      <View style={{ width: 28, height: 28, }}>
        <Image
          style={{ width: 28, height: 28 }}
          // resizeMode={'contain'}
          source={require(`../assets/images/bottomtab_home_icon.png`)}
        />
      </View>
    ),
  },
  {
    name: "Cart",
    activeIcon: null,
    inactiveIcon: (
      <View style={{ width: 20, height: 20 }}>
        <Image
          style={{ width: 20, height: 20 }}
          source={require(`../assets/images/music_bottom.png`)}
        />
      </View>
    ),
  },
  {
    name: "Search",
    activeIcon: null,
    inactiveIcon: (
      <View style={{ width: 25, height: 25 }}>
        <Image
          style={{ width: 25, height: 25 }}
          source={require(`../assets/images/mike_bottom.png`)}
        />
      </View>
    ),
  },

  {
    name: "Profile",
    activeIcon: null,
    inactiveIcon: (
      <View style={{ width: 20, height: 20 }}>
        <Image
          style={{ width: 20, height: 20 }}
          source={require(`../assets/images/bell.png`)}
        />
      </View>
    ),
  },
  {
    name: "Setting",
    activeIcon: null,
    inactiveIcon: (
      <View style={{ width: 20, height: 20 }}>
        <Image
          style={{ width: 20, height: 20 }}
          source={require(`../assets/images/profile_bottom.png`)}
        />
      </View>
    ),
  },
];

const HomeFeed = ({ navigation, route }) => {
  const [userDetail, setUserDetails] = useState();
  const [show, setShow] = useState(false);
  const [starModelShow, setStarModelShow] = useState(false);
  const [reportShow, setReportShow] = useState(false);
  const [tabs, setTabs] = useState(tabData);
  const [bgColor, setBgColor] = useState("#fbf5f9");
  const [name, setName] = useState("Name");
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState("");
  const [showLoading, setShowLoading] = useState(true);

  const [selectReport, setSelectReport] = useState(0);

  const [selectOne, setSelectOne] = useState(false);
  const [selectTwo, setSelectTwo] = useState(false);
  const [selectThree, setSelectThree] = useState(false);
  const [selectFour, setSelectFour] = useState(false);

  const [openOneModel, setOpenOneModel] = useState(false);
  const [data, setData] = useState([{ id: 1 }, { id: 2 }]);
  const [getHomeFeed, setHomeFeed] = useState();
  const [listData, setListData] = useState([]);
  const [focusVideo, setFocusVideo] = useState(-1);
  const [like_id, setLike_id] = useState(-1);

  var challangeDataGroup = [];
  var challangeDataSolo = [];

  const loadNewFeeds = () => {
    setRefreshing(true);
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);
        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .post(a.get_home_feeds, { user_id: d.id })
          .then((response) => {
            setShowLoading(false)
            setRefreshing(false); 
            if (response.data.status == "200") {
              setListData(response.data.posts.data);
            } else { 
              console.log(response.data);
            }
          });
      }
    });
  };

  const [refreshing, setRefreshing] = useState(false);

  if (!userData.hasOwnProperty("id")) {
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);

        let a = new apiDetails(d.token);
        setTimeout(function () {
          a.getClient(d.token)
            .post(a.getuserByID, {
              user_id: d.id,
            })
            .then((response) => {
              if (response.data.status == "200") {
                setUserData(response.data.data);
              } else {
                console.log(response.data);
              }
            });

          a.getClient(d.token)
            .post(a.challengeNotifications, {
              user_id: d.id,
            })
            .then((response) => {
              apiLoaded = true;
              // console.log(response);
              // if (response.status == "200") {
              //     setData(response.data.data);
              // } else {
              //     console.log(response);
              //     //alert('Oops something went wrong');
              // }
            });

          loadNewFeeds();

          a.getClient(d.token)
            .get(a.solo_challenge)
            .then((response) => {
              if (response.data.status == "200") {
                challangeDataSolo = response.data.chalange.data;
              } else {
                console.log(response.data);
              }
            });

          a.getClient(d.token)
            .get(a.get_group_challenge)
            .then((response) => {
              if (response.data.status == "200") {
                challangeDataGroup = response.data.chalange.data;
              } else {
                console.log(response.data);
              }
            });
        });
      }
    });
  }

  if (token == "") {
    AsyncStorage.getItem("token").then((t) => {
      if (t) {
        // var d = JSON.parse(t);
        setToken(t);
      }
    });
  }

  const onTabChange = (item) => {
    let tempTabs = [...tabs];

    setTimeout(() => {
      tempTabs.map((val) => {
        if (item.name === "Home" && val.name === "Home") {
          val.activeIcon = Object.assign({}, activeHome(true));
          setBgColor("#fbf5f9");
          setName("Home");
        } else if (item.name === "Cart" && val.name === "Cart") {
          val.activeIcon = Object.assign({}, activeList(true));
          setBgColor("#fbf5f9");
          setName("Cart");
        } else if (item.name === "Search" && val.name === "Search") {
          val.activeIcon = Object.assign({}, activeCamera(true));
          setBgColor("#fbf5f9");
          setName("Search");
        } else if (item.name === "Setting" && val.name === "Setting") {
          val.activeIcon = Object.assign({}, activeNotification(true));
          setBgColor("#fbf5f9");
          setName("Setting");
        } else if (item.name === "Profile" && val.name === "Profile") {
          val.activeIcon = Object.assign({}, activeUser(true));
          setBgColor("#fbf5f9");
          setName("Profile");
        } else {
          val.activeIcon = null;
        }
      });

      setTabs(tempTabs);
    }, 500);
  };

  /*********************share code here*********************************************** */

  function shareComment(post_id, index) {
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
              var temp = listData[index];
              temp.share = temp.share + 1;
              listData[index] = temp;
              setListData(listData);
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
  /*****************Report User Api Code here*************************************************** */
  const [reportUser, setReportUser] = useState({
    reason: "",
  });
  const [reportUserId, setReportUserId] = useState("");
  const [reportUserType, setReportUserType] = useState("");
  const handleOnChange = (field, value) => {
    reportUser[field] = value;
    setReportUser(reportUser);
  };

  const ReportUserApi = () => {
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);
        const a = new apiDetails();
        a.getClient(d.token)
          .post(a.report_user_api, {
            reason: reportUser.reason,
            report_userid: reportUserId,
            report_type: selectReport,
          })
          .then((response) => {
            if (response.data.status == "200") {
              closeLastModal();
            } else {
              console.log("---error-.>", response.data);
            }
          });
      }
    });
  };
  /*****************Report User Api Code here*************************************************** */
  /****************************Add following api************************************** */
  // { 'user_id':route.params.userDetail.id , 'following_id': item }
  const [followerId, setFollowerId] = useState("");
  const addFollowingApi = () => {
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);
        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .post(a.post_add_following, {
            user_id: d.id,
            following_id: followerId,
          })
          .then((response) => {
            if (response.data.status == "200") {
            } else {
            }
          });
      }
    });
  };
  /****************************Add following api************************************** */

  const postList = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
  ]


  const renderItemComponent = (ListData, itme) => {
    return (
      <>
        <View style={[styles.flatlist_super_container, {}]}>
          <LinearGradient
            style={{

              ...Platform.select({
                ios: {
                  position: 'absolute',
                  width: Dimensions.get("window").width - 20,
                  height: 100,
                  zIndex: 1,
                  opacity: 0.6,
                  // borderRadius:25,
                  borderTopLeftRadius: 28,
                  borderTopRightRadius: 28,
                  // paddingHorizontal:10,
                },
                android: {
                  overflow: 'hidden',
                  position: 'absolute',
                  width: Dimensions.get("window").width - 20,
                  height: 100,
                  // backgroundColor: 'cyan',
                  zIndex: 1,
                  opacity: 0.6,
                  // borderRadius:25,
                  borderTopLeftRadius: 28,
                  borderTopRightRadius: 28,
                  // paddingHorizontal:10,
                },
              })

            }}
            colors={constants.AppColor.LINEAR_GRADIENT_COLOR_HOME_FEED}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          ></LinearGradient>

          <Video
            source={{
              uri: apiDetails.publicVideo + "" + ListData.item.video,
            }}
            poster={apiDetails.publicVideo + "" + ListData.item.thumbnail}
            resizeMode={"cover"}
            posterResizeMode={"cover"}
            shouldPlay={focusVideo == ListData.index}
            isLooping
            pictureInPicture={true}
            style={{
              flex: 1,
              width: Dimensions.get("window").width - 20,
              margin: "auto",
              // height:Dimensions.get('window').height -80,
              height: 600,
              position: "absolute",
              top: 0,
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
            }}
          />

          <View style={[styles.flatlist_header_main_container]}>
            <View style={[styles.flatlist_header_top_inner_container]}>
              <View style={[styles.flatlist_header_top_left_image_view]}>
                <TouchableOpacity
                  onPress={() => {
                    setFocusVideo(-1);
                    navigation.navigate("User_Profile", {
                      user_id: ListData.item.post_by,
                    });
                  }}
                >
                  <Image
                    style={[styles.flatlist_header_top_left_image]}
                    source={{ uri: ListData.item.profile_image }}
                  // source={Images.girl_img}
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.flatlist_header_top_text_view]}>
                <Text numberOfLines={1} style={[Styles.MEDIUM_16, { color: '#fff', lineHeight: 22 }]}>
                  {ListData.item.name} {ListData.item.lastname}
                  {/* govind */}
                </Text>
                <Text style={[Styles.REGULAR_13, { color: '#fff', lineHeight: 18 }]}>
                  @{ListData.item.username}
                  {/* @govind */}
                </Text>
              </View>
            </View>
            <View style={[styles.flatlist_header_top_right_image_view]}>
              {/* <TouchableOpacity
                onPress={() => {
                  setFocusVideo(-1);
                  // navigation.navigate("Profile");
                }}
              >
                <Image
                  style={[styles.fletlist_left_top_image]}
                  resizeMode="contain"
                  source={Images.head_set_icon}
                />
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => {
                  openModal(ListData.item.id);
                }}
              >
                <Image
                  style={[styles.fletlist_left_top_image,]}
                  resizeMode="contain"
                  source={Images.three_black_dots}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View></View>
          {listData.index == 0 ? (
            <View
              style={[
                {
                  // backgroundColor:'#000',
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  marginHorizontal: normalize(20),
                },
              ]}
            >
              <View
                style={[
                  {
                    flexDirection: "row",
                    backgroundColor: "#000",
                    justifyContent: "center",
                    alignItems: "center",
                    // marginHorizontal:normalize(25),
                    width: normalize(85),
                    borderRadius: normalize(10),
                    height: normalize(35),
                  },
                ]}
              >
                <Image
                  style={[
                    styles.fletlist_left_top_image,
                    {
                      width: normalize(20),
                      height: normalize(20),
                      marginRight: normalize(8),
                    },
                  ]}
                  resizeMode="contain"
                  source={Images.song_bars}
                />
                <Text style={[Styles.REGULAR_14, { color: "#fff", lineHeight: 18 }]}>
                  2:30 min
                </Text>
              </View>
            </View>
          ) : null}
          <View
            style={[
              {
                // backgroundColor:'red',
                marginTop: normalize(270),
                marginHorizontal: normalize(10),
              },
            ]}
          >
            <View
              style={[
                {
                  flexDirection: "row",
                  // backgroundColor:'green',
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: Dimensions.get("window").width,
                  paddingHorizontal: 37,
                  height: normalize(70),
                },
              ]}
            >
              {/* <View style={[styles.bottom_image_view_style]}>
                <TouchableOpacity onPress={() => { navigation.navigate('MyPostFeed') }} style={[styles.bottom_image_touch_style]}>
                  <Image
                    style={[styles.bottom_image_style]}
                    source={Images.head_set_menu_icon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View> */}
              <View
                style={[
                  {
                    backgroundColor: "#fff",
                    // width: normalize(220),
                    height: 45,
                    borderRadius: normalize(30),
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 5
                  },
                ]}
              >
                <View
                  style={[
                    {
                      //   backgroundColor:"red",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      alignContent: "center",
                      flex: 1
                    },
                  ]}
                >
                  <View style={[styles.bottom_box_inner_view_style]}>
                    <TouchableOpacity
                      onPress={() => {
                        openStarModal(ListData.index);
                      }}
                    >
                      <Image
                        style={[styles.bottom_box_image_style]}
                        source={ListData.item.is_liked ? Images.comment_star_icon : Images.comment_star_icon_outline}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <Text
                      style={[
                        Styles.REGULAR_14,
                        { color: "#000", lineHeight: 18, marginLeft: 8 },
                      ]}
                    >
                      {ListData.item.likes}
                    </Text>
                  </View>
                  <View style={[styles.bottom_box_inner_view_style]}>
                    <TouchableOpacity
                      onPress={() => {
                        setFocusVideo(-1);
                        navigation.navigate("Comment_screen", {
                          post_id: ListData.item.id,
                        });
                      }}
                    >
                      <Image
                        style={[styles.bottom_box_image_style]}
                        source={Images.comment_unfilled}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <Text
                      style={[
                        Styles.REGULAR_14,
                        { color: "#000", lineHeight: 18, marginLeft: 8 },
                      ]}
                    >
                      {ListData.item.comments}
                    </Text>
                  </View>
                  <View style={[styles.bottom_box_inner_view_style]}>
                    <TouchableOpacity
                      onPress={() => {
                        onShare(ListData.item.id, ListData.index);
                      }}
                    >
                      <Image
                        style={[styles.bottom_box_image_style]}
                        source={Images.share}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <Text
                      style={[
                        Styles.REGULAR_14,
                        { color: "#000", lineHeight: 18, marginLeft: 8 },
                      ]}
                    >
                      {ListData.item.share}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.bottom_image_view_style, { flex: 0.5, marginLeft: 20 }]}>
                <TouchableOpacity
                  onPress={() => {
                    setFocusVideo(-1)
                    navigation.navigate("StartSinging", {
                      id: ListData.item.song_id,
                      type: "song",
                    });
                  }}
                  style={[styles.bottom_image_touch_style]}
                >
                  <Image
                    style={[styles.bottom_image_style]}
                    source={Images.add_icon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  const openStarModal = (id) => {
    setLike_id(id);
    setStarModelShow(true);
  };

  const closeStarModal = (type) => {
    if (like_id == -1) {
      setLike_id(-1);
      setStarModelShow(false);
      return;
    }
    var temp_l = listData;
    var id = temp_l[like_id].id;
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
              if (temp_l[like_id].is_liked > 0) {
                temp_l[like_id].is_liked = 0;
                temp_l[like_id].likes = temp_l[like_id].likes - 1;
              } else {
                temp_l[like_id].is_liked = 1;
                temp_l[like_id].likes = temp_l[like_id].likes + 1;
              }

              setListData(temp_l);
              setLike_id(-1);
              setStarModelShow(false);
            } else {
              console.log(response.data);
              setLike_id(-1);
              setStarModelShow(false);
            }
          });
      }
    });
  };

  const openModal = (listData) => {
    setFollowerId(listData);
    setReportUserId(listData);
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  const openReportModal = () => {
    setReportShow(true);
  };

  const closeReportModal = () => {
    setReportShow(false);
  };

  const openLastModal = () => {
    setOpenOneModel(true);
  };

  const closeLastModal = () => {
    setOpenOneModel(false);
  };

  const OneSelect = () => {
    {
      selectOne === true
        ? setSelectTwo(false) + setSelectThree(false) + setSelectFour(false)
        : null;
    }
  };

  const TwoSelect = () => {
    {
      selectTwo === true
        ? setSelectOne(false) + setSelectThree(false) + setSelectFour(false)
        : null;
    }
  };

  const ThreeSelect = () => {
    {
      selectThree === true
        ? setSelectTwo(false) + setSelectOne(false) + setSelectFour(false)
        : null;
    }
  };

  const FourSelect = () => {
    {
      selectFour === true
        ? setSelectTwo(false) + setSelectThree(false) + setSelectOne(false)
        : null;
    }
  };

  const onViewRef = React.useRef((viewableItems) => {
    setFocusVideo(viewableItems.viewableItems[0].index);
  });

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });


  const loadView = () => {
    let home = (
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
        > 
          <LinearGradient
            colors={["#E683AF", "#7ACACB", "#77A1D3"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={[Styles.BackgroundGradient, {height:"100%"}]}>

            <NewIconHeaderModel 
              sourcerightstyle={[{
                width: 20,
                height: 20
              }]}
              sourceonestyle={[{
                width: 28,
                height: 28
              }]}
              HeaderTitle="Home Feed"
              sourceOne={Images.add_frnd_big_icon}
              sourceTwo={Images.message}
              sourceThree={Images.search}
              onPressOne={() => {
                setFocusVideo(-1);
                navigation.navigate("Find_friends");
              }}
              onPressTwo={() => {
                setFocusVideo(-1);
                navigation.navigate("ChatList", { userData: userData });
              }}
              onPressThree={() => {
                setFocusVideo(-1);
                navigation.navigate("SearchForSongs");
              }}
            />

            <LinearGradient
              colors={constants.AppColor.FLEX_GRADIENT_BACK_COLOR}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[{ 
                ...Platform.select({
                  ios: { 
                    height: "100%",
                    marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT),
                    borderTopLeftRadius: 28,
                    borderTopRightRadius: 28, 
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0, 
                    paddingBottom: 4,
                    alignItems: 'center',
                    flex:1
                  },
                  android: {
                    overflow: "hidden",  
                    marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT),
                    borderTopLeftRadius: 28,
                    borderTopRightRadius: 28, 
                    paddingBottom: 60,
                    alignItems: 'center', 
                  }
                })
              }]}> 
              
              <FlatList
                contentContainerStyle={[{
                  //overflow:'hidden',
                  borderTopLeftRadius: 28,
                  borderTopRightRadius: 28,
                }]}

                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={[
                  {
                    ...Platform.select({
                      ios: {
                        // backgroundColor:"cyan",
                        borderTopLeftRadius: 28,
                        borderTopRightRadius: 28,
                        marginBottom: -10,
                        width: Dimensions.get('window').width - 20,
                        marginTop: 10,
                        // paddingLeft:10,
                        // paddingRight:10
                        // paddingTop:10,
                        // paddingHorizontal:10
                      },
                      android: { 
                        borderTopLeftRadius: 28,
                        borderTopRightRadius: 28, 
                        marginBottom: 50,
                        width: Dimensions.get('window').width - 20,
                        marginTop: 10, 
                      }
                    }),


                  },
                ]}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => {
                      loadNewFeeds()
                      return true
                    }}
                  />
                }
                viewabilityConfig={viewConfigRef.current}
                onViewableItemsChanged={onViewRef.current}
                data={listData}
                // data={postList}
                renderItem={renderItemComponent}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                  <EmptyHomeFeedCard
                    onPress={() => {
                      navigation.navigate("Find_friends");
                    }}
                  />
                }
              />

              {/* MODELS */}
              <ModelView
                transparent={true}
                visible={show}
                onRequestClose={() => {
                  setShow(false);
                }}
                lableTopOne="Report Abuse"
                lableBottomOne="Follow"
                lableBottomTwo="/"
                lableBottomThree="Unfollow"
                buttonText="Cancel"
                onPress={() => closeModal()}
                ModalBottomView={[{ flexDirection: "row" }]}
                lableTopOnePress={() => {
                  openReportModal();
                  closeModal();
                }}
                lableBottomOnePress={() => {
                  addFollowingApi();
                  closeModal();
                }}
              />
              <ReportModelView
                transparent={true}
                visible={reportShow}
                onRequestClose={() => {
                  setReportShow(false);
                }}
                bottomLablePress={() => {
                  openLastModal();
                  closeReportModal();
                }}
                topLablePress={() => {
                  openLastModal();
                  closeReportModal();
                }}
                onPress={() => {
                  closeReportModal();
                }}
                buttonText="Calncel"
              />
              <StarModel
                transparent={true}
                visible={starModelShow}
                onRequestClose={() => {
                  setStarModelShow(false);
                }}
                closeModelPress={() => { setStarModelShow(false) }}
                fireOnPress={() => closeStarModal("2")}
                goodLuckOnPress={() => closeStarModal("3")}
                goldenBuzzOnPress={() => closeStarModal("4")}
                notBadOnPress={() => closeStarModal("5")}
                starOnPress={() => closeStarModal("1")}
              />
              <ProfileModel
                transparent={true}
                visible={openOneModel}
                onRequestClose={() => {
                  setOpenOneModel(false);
                }}
                onPressTouchOne={() => {
                  setSelectReport(1);
                  // setSelectOne(true);
                  //OneSelect();
                  //setReportUserType("Abusing User");
                }}
                onPressTouchTwo={() => {
                  setSelectReport(2);
                  // setSelectTwo(true);
                  // TwoSelect();
                  // setReportUserType("Fraud User");
                }}
                onPressTouchThree={() => {
                  setSelectReport(3);
                  // setSelectThree(true);
                  // ThreeSelect();
                  // setReportUserType("Spam Profile");
                }}
                onPressTouchFour={() => {
                  setSelectReport(4);
                  // setSelectFour(true);
                  // FourSelect();
                  // setReportUserType("Illigal Content");
                }}
                profileTopText="Report Profile"
                source={Images.girl_img}
                // sourceTouchOne={Images.Ellipse_white}
                sourceTouchOne={
                  selectReport == 1 ? Images.green_right : Images.Ellipse_white
                }
                sourceTouchTwo={
                  selectReport == 2 ? Images.green_right : Images.Ellipse_white
                }
                sourceTouchThree={
                  selectReport == 3 ? Images.green_right : Images.Ellipse_white
                }
                sourceTouchFour={
                  selectReport == 4 ? Images.green_right : Images.Ellipse_white
                }
                TouchOneStyle={
                  selectReport == 1
                    ? styles.TouchOneStyleTrue
                    : styles.TouchOneStyle
                }
                TouchTwoStyle={
                  selectReport == 2
                    ? styles.TouchOneStyleTrue
                    : styles.TouchOneStyle
                }
                TouchThreeStyle={
                  selectReport == 3
                    ? styles.TouchOneStyleTrue
                    : styles.TouchOneStyle
                }
                TouchFourStyle={
                  selectReport == 4
                    ? styles.TouchOneStyleTrue
                    : styles.TouchOneStyle
                }
                TouchOneText="Abusing"
                TouchOneOneText="User"
                TouchTwoText="Fraud"
                TouchTwoTwoText="User"
                TouchThreeText="Spam"
                TouchThreeThreeText="Profile"
                TouchFourText="Illigal"
                TouchFourFourText="Content"
                profilebuttonText="Submit Report"
                placeholder="Add a custom reson here"
                onPress={() => ReportUserApi()}
                onChangeOfText={(value) => handleOnChange("reason", value)} 
              /> 

            </LinearGradient>
          </LinearGradient> 
        </KeyboardAvoidingView>
      </View>
    );

    if (name === "Home") {
      return home;
    } else if (name === "Cart") {
      return (
        <View>
          <Songbook_listing />
        </View>
      );
    } else if (name === "Search") {
      return (
        <View style={{ height: "93%" }}>
          <ListChallange
            navigation={navigation}
            soloChallange={challangeDataSolo}
            groupChallange={challangeDataGroup}
          />
        </View>
      );
    } else if (name === "Setting") {
      //console.log(token);
      return (
        <View style={{ height: "93%" }}>
          <Profile navigation={navigation} />
        </View>
      );
      // return Profile(navigation, userData, token);
    } else if (name === "Profile") {
      return (
        <View style={{ height: "93%" }}>
          <Notifications_screen navigation={navigation} user_id={userData.id} />
        </View>
      );
    } else {
      return home;
    }
  };

  return (
    <View style={{flex:1}}>
      <Header />

      <LinearGradient
        colors={constants.AppColor.LINEAR_GRADIENT_COLOR_BUTTON}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={{ flex: 1, flexDirection: "column" }}
      >
        {loadView()}

        <Tabbar
          tabs={tabs}
          tabBarBackground={bgColor}
          labelStyle={{
            color: "#4d4d4d",
            fontWeight: "600",
            fontSize: 11,
            display: "none",
          }}
          onTabChange={(item) => onTabChange(item)}
        />
      </LinearGradient>

      {showLoading && (
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  center: {
    alignSelf: "center",
    margin: 15,
    fontSize: 18,
    justifyContent: "center",
    textAlign: "center",
  },
  flatlist_super_container: {
    // backgroundColor:"green",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    alignItems: "center",
    marginHorizontal: 10,
    // marginHorizontal: 10,
    // marginTop:normalize(20),
    // justifyContent: "center",
    // alignItems: "center",
    // paddingHorizontal:10
    // paddingLeft:10,
    // paddingRight:20
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
  bgImage_style: {
    width: "100%",
    height: normalize(490),

    // marginTop:normalize(-10),
  },
  bgImage_style_index: {
    width: "100%",
    height: normalize(490),

    marginTop: normalize(-23),
  },
  fletlist_left_top_image: {
    width: 28,
    height: 28,
    tintColor: "#fff",
  },
  flatlist_header_main_container: {
    // backgroundColor:'green',
    flexDirection: "row",
    justifyContent: "space-between",
    // marginHorizontal: normalize(20),
    marginTop: 10,
    height: normalize(70),
    alignItems: "center",
    zIndex: 2,
    paddingHorizontal: 20,
    width: Dimensions.get('window').width,

  },
  flatlist_header_top_inner_container: {
    // backgroundColor:'blue',
    flexDirection: "row",
  },
  flatlist_header_top_left_image_view: {
    // backgroundColor:'red',
    width: normalize(50),
    height: normalize(60),
    borderRadius: normalize(20),
    justifyContent: "center"
  },
  flatlist_header_top_left_image: {
    width: 40,
    height: 40,
    borderRadius: 16,
  },
  flatlist_header_top_text_view: {
    // backgroundColor:'red',
    // width: 190,
    height: normalize(60),
    justifyContent: "center",
    // paddingLeft:10
  },
  flatlist_header_top_right_image_view: {
    flexDirection: "row",
    // backgroundColor:'grey',
    width: normalize(60),
    height: normalize(70),
    justifyContent: "flex-end",
    alignItems: "center",
  },
  flatlist_header_top_name_text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: normalize(22),
  },
  flatlist_header_top_name_id_text: {
    color: "#fff",
    fontSize: normalize(18),
  },
  bottom_image_style: {
    width: 16,
    height: 16,
  },
  bottom_image_view_style: {
    // backgroundColor:'red',
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  bottom_image_touch_style: {
    backgroundColor: "#000",
    width: 37,
    height: 37,
    borderRadius: 37,
    justifyContent: "center",
    alignItems: "center",
  },
  bottom_box_image_style: {
    width: 25,
    height: 25,
    // tintColor:'#000'
  },
  bottom_box_inner_view_style: {
    flexDirection: "row",
    // backgroundColor:"green",
    height: normalize(30),
    alignItems: "center",
    width: normalize(80),
    alignContent: "center",
    justifyContent: "center",
  },
  ModalMainContainer: {
    // backgroundColor:"red",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    justifyContent: "flex-end",
    alignItems: "center",
    // padding: 5,
    height: "100%",
    // marginBottom:normalize(15)
  },
  ModalSecContainer: {
    backgroundColor: "#fff",
    width: normalize(300),
    borderRadius: normalize(20),
    borderColor: "grey",
    borderWidth: 2,
    height: normalize(100),
    justifyContent: "center",
    alignItems: "center",
  },
  ModalTopView: {
    // backgroundColor:"red",
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: 15,
    height: normalize(30),
  },
  ModalImgStyle: {
    width: 40,
    height: 40,
    marginLeft: 45,
  },
  moder_text_style: {
    color: "#000",
    fontSize: normalize(20),
    fontWeight: "bold",
  },
  modle_btn_touh_style: {
    backgroundColor: "#000",
    width: normalize(320),
    height: normalize(60),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(30),
  },
  TouchOneStyle: {
    backgroundColor: "#F5F5F7",
  },
  TouchOneStyleTrue: {
    backgroundColor: "#2DCB6F",
  },
});

export default HomeFeed;
