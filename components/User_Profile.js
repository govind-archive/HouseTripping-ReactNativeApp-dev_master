import React, { useEffect, useState } from "react";
import { filter } from "lodash";
import { Video } from "expo-av";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Linking,
  Modal,
  PermissionsAndroid,
  useWindowDimensions,
  RefreshControl,
  Share,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path, G, Circle, Rect } from "react-native-svg";
import apiDetails from "../api/AllApis";
import LoadingLottie from "./anim/LoadingLottie";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { EmptyCard } from "./Components/EmptyCard";
import Moment from "moment";
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import * as ImagePicker from "expo-image-picker";
import { ModelMenuView, ModelView, ProfileModel, UserProfileModelView } from "./Components/ModeLView";
import Images from "../assets/Images";
import normalize from "react-native-normalize";
import { Audio } from "expo-av";
import { HeaderModel, HelpScreenModel } from "./Components/NewModelView";
import Styles from "../constants/Styles";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { BlurView } from "expo-blur";
import { RFValue } from "react-native-responsive-fontsize";
import Contants from "../constants/Contants";

let userDataTmp = {
  image: "",
  name: "",
  user_id: "",
  lastname: "",
  profile_username: "",
  username: "",
  pathName: "",
};

export default function User_Profile({ navigation, route }) {
  const [show, setShow] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [hide, setHide] = useState(false);
  const [postShow, setPostShow] = useState(false);
  const [path, setPath] = useState("");
  const [gallary, setGallary] = useState("");
  const [userDetail, setUserDetail] = useState({});
  const [pathName, setPathName] = useState();
  const [userData, setUserData] = useState({});
  const [postTab, setPostTab] = useState(true);
  const [songsTab, setSongsTab] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [sound, setSound] = React.useState();
  const [showReport, setShowReport] = useState(false);
  const [data, setData] = useState({
    image: "",
  });


  const [openOneModel, setOpenOneModel] = useState(false);
  const [selectReport, setSelectReport] = useState(0);
  const openLastModal = () => {
    setOpenOneModel(true);
  };

  const closeLastModal = () => {
    setOpenOneModel(false);
  };

  const openReportModal = () => {
    setShowReport(true);
  };
  const closeReportModal = () => {
    setShowReport(false);
  };

  async function playSound(url) {
    const { sound } = await Audio.Sound.createAsync({ uri: url });
    setSound(sound);

    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  /*******SHARING CODE***********/
  const onShare = async (id) => {
    try {
      const result = await Share.share({
        message: "Singing application shareing text",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  /******************************/

  /*****************Posts Flatlist CODE HERE*********************************/
  const [playShow, setPlayShow] = useState(-1);
  const [videoShow, setVideoShow] = useState(false);
  const [status, setStatus] = useState(-1);
  const [songsData, setSongsData] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [songsCount, setSongsCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(0);

  const showHide = (id) => {
    if (status == id) {
      setStatus(-1)
    } else {
      setStatus(id)
    }
  };

  const followCheck = () => {
    apiCallForFollowing();
  };

  const apiCallForFollowing = () => {
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);
        var u = userDetail;

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
              setUserDetail(u);
              setIsFollowing(u.is_following);
            } else {
              console.log(response);
              alert("Oops something went wrong");
            }
          });
      }
    });
  };

  const renderItemComponent = (postData) => {
    return (
      <>
        {status != postData.item.id && <TouchableOpacity
          onPress={() => {
            showHide(postData.item.id);
          }}
        >
          <View style={[styles.flalist_container]}>
            <View style={[styles.flatlist_first_row_view]}>
              <View style={[styles.flatlist_profile_image_view]}>
                <Image
                  style={{ width: scale(48), height: scale(48), borderRadius: scale(16) }}
                  resizeMode="cover"
                  source={{
                    uri:
                      apiDetails.publicImage +
                      "challenge_videos/" +
                      postData.item.thumbnail,
                  }}
                // source={Images.girl_img}
                />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ alignItems: 'flex-start', flex: 1 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1 }}>
                      <Text
                        numberOfLines={1}
                        style={{ ...Styles.MEDIUM_16, color: '#272D37' }}
                      >
                        {postData.item.title}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{ ...Styles.MEDIUM_16, color: '#A1A3AA', marginTop: verticalScale(5) }}
                      >
                        @{postData.item.artist}
                      </Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                        }}
                      >
                        <Image
                          style={{ width: scale(28), height: scale(28), marginLeft: moderateScale(26), tintColor: '#000' }}
                          resizeMode="center"
                          source={Images.play_icon}
                        />
                      </TouchableOpacity>
                    </View>

                  </View>

                </View>

                <View style={[styles.flatlist_bottom_row_view]}>
                  <View style={[styles.flatlist_small_icon_container]}>
                    <View
                      style={[
                        styles.flatlist_small_icon_uper_row_view,
                        { width: normalize(150), marginVertical: verticalScale(5) },
                      ]}
                    >
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                          style={{ width: scale(8), height: scale(8) }}
                          source={Images.headset_icon}
                          resizeMode="contain"
                        />
                        <Text style={{ ...Styles.REGULAR_14, color: '#A1A3AA', marginLeft: scale(2.62) }}>
                          {postData.item.views_count}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: scale(10) }}>
                        <Image
                          style={{ width: scale(8), height: scale(8) }}
                          source={Images.heart_icon}
                          resizeMode="contain"
                        />
                        <Text style={{ ...Styles.REGULAR_14, color: '#A1A3AA', marginLeft: scale(2.62) }}>
                          {postData.item.post_likes}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: scale(10) }}>
                        <Image
                          style={{ width: scale(8), height: scale(8) }}
                          source={Images.msg_icon}
                          resizeMode="contain"
                        />
                        <Text style={{ ...Styles.REGULAR_14, color: '#A1A3AA', marginLeft: scale(2.62) }}>
                          {postData.item.comment_count}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={[
                      {
                        width: normalize(90),
                        // backgroundColor:'red',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                      },
                    ]}
                  >
                    <Text style={{ ...Styles.REGULAR_12, color: '#A1A3AA', marginTop: scale(5) }}>
                      {showTimeAgo(postData.item.created_at)}
                      {/* 2 days ago */}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>}

        {status == postData.item.id ? (
          <View style={[styles.flatlist_video_container]}>
            <Video
              source={{
                uri: apiDetails.publicVideo + "" + postData.item.video,
              }}
              poster={apiDetails.publicVideo + "" + postData.item.thumbnail}
              resizeMode={"cover"}
              posterResizeMode={"cover"}
              shouldPlay={true}
              isLooping
              useNativeControls
              pictureInPicture={true}
              style={{
                height: 150,
                borderRadius: 20
              }}
            />

            <View
              style={[
                {
                  marginTop: normalize(10),
                },
              ]}
            >
              <TouchableOpacity onPress={() => {
                showHide(postData.item.id);
              }}>
                <View
                  style={[
                    styles.flatlist_second_container,
                    { width: normalize(340), borderBottomColor: '#A1A3AA', borderBottomWidth: 0.3 },
                  ]}
                >
                  <View style={[styles.flatlist_second_top_row_view]}>
                    <View style={[styles.flatlist_second_top_text_view]}>
                      <Text
                        numberOfLines={1}
                        style={{ ...Styles.MEDIUM_16, color: '#272D37', marginTop: verticalScale(5) }}
                      >
                        {postData.item.title}
                      </Text>
                      <Text
                        style={{ ...Styles.REGULAR_14, color: '#686E76' }}
                      >
                        @{postData.item.artist}
                      </Text>

                    </View>
                    <View style={[styles.flatlist_menu_icon_view]}>
                      <TouchableOpacity>
                        <Image
                          style={{ tintColor: '#000', width: scale(28), height: scale(28) }}
                          resizeMode="contain"
                          source={Images.play_icon}

                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={[styles.flatlist_bottom_row_view]}>
                    <View style={[styles.flatlist_small_icon_container]}>
                      <View
                        style={[
                          styles.flatlist_small_icon_uper_row_view,
                          { width: normalize(160) },
                        ]}
                      >
                        <View style={[styles.flatlist_small_icom_inner_row_view]}>
                          <Image
                            style={{ width: scale(12), height: scale(12) }}
                            source={Images.headset_icon}
                            resizeMode="contain"
                          />
                          <Text style={{ ...Styles.REGULAR_14, color: '#A1A3AA', marginLeft: scale(5) }}>
                            {postData.item.views_count}
                          </Text>
                        </View>
                        <View style={[styles.flatlist_small_icom_inner_row_view]}>
                          <Image
                            style={[styles.flat_small_icon]}
                            source={Images.heart_icon}
                            resizeMode="contain"
                          />
                          <Text style={{ ...Styles.REGULAR_14, color: '#A1A3AA', marginLeft: scale(5) }}>
                            {postData.item.post_likes}
                          </Text>
                        </View>
                        <View style={[styles.flatlist_small_icom_inner_row_view]}>
                          <Image
                            style={[styles.flat_small_icon]}
                            source={Images.msg_icon}
                            resizeMode="contain"
                          />
                          <Text style={{ ...Styles.REGULAR_14, color: '#A1A3AA', marginLeft: scale(5) }}>
                            {postData.item.comment_count}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={[
                        {
                          // backgroundColor:'white',
                          marginRight: moderateScale(10)
                        },
                      ]}
                    >
                      <Text style={{ ...Styles.REGULAR_12, color: '#A1A3AA', marginLeft: scale(5) }}>
                        {showTimeAgo(postData.item.created_at)}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </>
    );
  };

  const showTimeAgo = (time) => {
    time = time.replace("T", " ");
    time = time.replace("000000Z", "000");
    var tem_d = Moment(time).fromNow();
    return tem_d;
  };

  //for songs
  const renderSongsItemComponent = (songsData) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            setVideoShow(true);
          }}
        >
          <View style={[styles.flalist_container]}>
            <View style={[styles.flatlist_first_row_view]}>
              <View style={[styles.flatlist_profile_image_view]}>
                <ImageBackground
                  style={[
                    {
                      width: normalize(65),
                      height: normalize(65),
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  ]}
                  resizeMode="contain"
                  imageStyle={{
                    borderRadius: 50,
                  }}
                  source={{
                    uri:
                      apiDetails.publicImage + "" + songsData.item.cover_photo,
                  }}
                // source={Images.girl_img}
                >
                  {playShow == songsData.item.id ? (

                    <TouchableOpacity
                      onPress={() => {
                        playSound(
                          apiDetails.publicImage + "" + songsData.item.song
                        );
                        setPlayShow(-1);
                      }}
                    >

                      <Image
                        style={[
                          {
                            width: normalize(30),
                            height: normalize(30),
                            tintColor: "white",
                          },
                        ]}
                        resizeMode="contain"
                        source={Images.pause_img}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        playSound(
                          apiDetails.publicImage + "" + songsData.item.song
                        );
                        setPlayShow(songsData.item.id);
                      }}
                    >
                      <Image
                        style={[
                          {
                            width: normalize(28),
                            height: normalize(28),
                            tintColor: "#fff",
                          },
                        ]}
                        resizeMode="contain"
                        source={Images.play_icon}
                      />
                    </TouchableOpacity>
                  )}
                </ImageBackground>
              </View>
              <View
                style={[
                  styles.flatlist_second_container,
                  { width: normalize(265), marginLeft: normalize(5) },
                ]}
              >
                <View style={[styles.flatlist_second_top_row_view]}>
                  <View style={[styles.flatlist_second_top_text_view]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View>
                        <Text
                          numberOfLines={1}
                          style={{ ...Styles.MEDIUM_16, color: '#272D37' }}
                        >
                          {songsData.item.title}
                        </Text>
                        <View>
                          <Text
                            style={{ ...Styles.REGULAR_14, color: '#686E76', marginTop: verticalScale(5) }}
                          >
                            {songsData.item.genere}
                          </Text>
                        </View>
                        <View

                        >
                          <Text
                            style={{ ...Styles.REGULAR_14, color: '#686E76', marginTop: verticalScale(5) }}
                          >
                            @{songsData.item.artist}
                          </Text>

                        </View>
                      </View>

                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("StartSinging", {
                            id: songsData.item.id,
                            type: "song",
                          });
                        }}
                        style={{
                          flexDirection: 'row', backgroundColor: '#272D37',
                          justifyContent: 'center', alignItems: 'center',
                          borderRadius: scale(16), width: scale(62), height: scale(32)
                        }}>
                        <Text style={{ color: 'white' }}>Sing</Text>
                      </TouchableOpacity>
                    </View>


                  </View>

                  {/* <View style={{ ...Styles.REGULAR_14, color: '#686E76' }}>
                    <TouchableOpacity
                      onPress={() => {
                        openSongsModal();
                      }}
                    >
                      <Image
                        style={[styles.flatlist_menu_icon_style]}
                        resizeMode="contain"
                        source={Images.three_black_dots}
                      />
                    </TouchableOpacity>
                  </View> */}
                </View>
                <View style={[styles.flatlist_bottom_row_view]}>
                  <View style={[styles.flatlist_small_icon_container]}>


                  </View>

                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  /*****************Posts Flatlist CODE HERE*********************************/
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getUserDetail(route.params?.user_id);
  }, []);
  const getUserDetail = (id) => {
    setRefreshing(true);
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);
        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .post(a.get_user_details_by_id, {
            user_id: id,
          })
          .then((response) => {
            setRefreshing(false);
            if (response.data.status == "200") {
              setSongsCount(response.data.data.usersongs.length);
              setUserDetail(response.data.data);
              setIsFollowing(response.data.data.is_following);
            } else {
              console.log("user Detail else--------", response);
            }
          });
      }
    });
  };
  /********************** user detail api ************************/

  //going to message screen
  const openMessagingWindow = () => {
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);
        var u = {
          profile: userDetail,
          sender_id: d.id,
          receiver_id: userDetail.id,
          firstname: d.name,
          lastname: d.lastname,
          profile_pic: d.image
        };

        navigation.navigate("MessagesScreen", {
          userData: u,
          listShow: "yes",
        });
      }
    });
  };

  const openModal = () => {
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
  };
  const openSongsModal = () => {
    setHide(true);
  };
  const closeSongsModal = () => {
    setHide(false);
  };
  const openPostsModal = (item) => {
    setPostShow(true);
    setSelectedItem(item);
  };
  const closePostsModal = () => {
    setSelectedItem({});
    setPostShow(false);
  };

  /*****************TAB VIEW CODE HERE********************************/
  /**********************user detail api*************************/

  return (
    <MenuProvider style={styles.container}>

      <View style={styles.container}>

        <ImageBackground
          style={[
            {
              width: "100%",
              height: "100%",
              marginTop: Platform.OS == 'ios' ? -47 : 0
            },
          ]}

          source={Images.profile_bg_img}
          source={{
            uri: userDetail.image,
          }}

        >
          <BlurView intensity={95} style={[{
            width: "100%",
            height: "100%",
            paddingTop: Platform.OS == 'ios' ? 70 : 30
          }]}>
            <StatusBar
              animated={true}
              translucent
              backgroundColor="transparent"
              barStyle={"light-content"}
            />

            {/*************** HEADER ************ */}

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
              RightPress={() => openReportModal(true)}
              HeaderTitle={'Profile'}
              leftImage={Images.all_screen_back_black_arrow_icon}
              rightImage={Images.three_black_dots}
              status={{ backgroundColor: "#000000" }}
            />

            <View style={{ flexDirection: "row", marginTop: verticalScale(20), marginHorizontal: moderateScale(15) }}>
              <View style={[styles.profile_view, {
                ...Platform.select({
                  ios: {},
                  android: {
                    borderRadius: 25,
                    //  backgroundColor:"red",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 1.25,
                    elevation: 7,
                  }
                })

              }]}>

                <LinearGradient
                  colors={["#E683AF", "#7ACACB", "#77A1D3"]}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 0 }}
                  style={{
                    borderRadius: 25,
                    padding: RFValue(2, Contants.DesignCanvas.HEIGHT),
                    shadowOffset: {
                      width: 2,
                      height: 2,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 2,

                    // elevation: 5

                  }}>
                  <View style={[{
                    backgroundColor: '#fff',
                    borderRadius: 25,
                    // borderWidth:1,
                    width: RFValue(100, Contants.DesignCanvas.HEIGHT),
                    height: RFValue(100, Contants.DesignCanvas.HEIGHT),
                    margin: RFValue(1, Contants.DesignCanvas.HEIGHT),
                    justifyContent: "center",
                    alignItems: "center",
                    shadowOffset: {
                      width: 2,
                      height: 2,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,

                    elevation: 5
                    // padding:RFValue(1,Contants.DesignCanvas.HEIGHT)
                  }]}>

                    <Image
                      style={[{
                        width: RFValue(100, Contants.DesignCanvas.HEIGHT),
                        height: RFValue(100, Contants.DesignCanvas.HEIGHT),
                        borderRadius: 25
                      }]}
                      // resizeMode='contain'
                      // source={Images.profile_demo_image}
                      source={{
                        uri: userDetail.image,
                      }}
                    />
                  </View>
                </LinearGradient>

              </View>

              <View style={{ flexDirection: "column", justifyContent: 'center', marginHorizontal: moderateScale(15), }}>
                <TouchableOpacity
                  onPress={() => {
                    handleClick();
                  }}
                >
                  <Text style={{ ...Styles.SEMIBOLD_18, color: 'white' }}>
                    {userDetail.firstname} {userDetail.lastname}
                    {/* asdasd */}
                  </Text>
                </TouchableOpacity>
                <Text style={{ ...Styles.REGULAR_14, color: '#FFFFFFBF', marginTop: verticalScale(5) }}>
                  @{userDetail.username}
                  {/* asdas */}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "column" }}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Followings_followers", {
                          userDetail: userDetail,
                        });
                      }}
                    >
                      {/* <Text style={styles.zero_common}>
                      {userDetail.followers}
               
                    </Text> */}


                      <View>
                        <Text style={{ ...Styles.BOLD_16, color: '#FFFFFF', marginTop: verticalScale(5) }}>
                          {userDetail.followers}
                        </Text>
                        <Text style={{ ...Styles.REGULAR_14, color: '#FFFFFF', marginTop: verticalScale(5) }}>followers</Text>
                        <View style={{ marginTop: verticalScale(15) }}>
                          <TouchableOpacity
                            style={styles.roundedButtonsFilled}
                            onPress={() => {
                              followCheck();
                            }}
                          >
                            <View style={{ flexDirection: "row", }}>
                              {isFollowing > 0 ? (
                                <Text style={{ ...Styles.REGULAR_14, color: 'white' }}>Following</Text>
                              ) : (
                                <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                                  <Image
                                    style={{ width: scale(12), height: (12) }}
                                    source={Images.add_friends}
                                  ></Image>
                                  <Text style={{ ...Styles.REGULAR_14, color: 'white', marginLeft: scale(8) }}>Follow</Text>
                                </View>
                              )}
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>

                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Followings_followers", {
                          screenName: "follow",
                          userDetail: userDetail,
                        });
                      }}
                    >
                      {/* <Text style={styles.zero_common}>
                    {userDetail.followings}  
                     </Text> */}
                      <View style={{ paddingHorizontal: moderateScale(20) }}>
                        <Text style={{ ...Styles.BOLD_16, color: '#FFFFFF', marginTop: verticalScale(5) }}>
                          {userDetail.followings}
                        </Text>
                        <Text style={{ ...Styles.REGULAR_14, color: '#FFFFFF', marginTop: verticalScale(5) }}>Following</Text>
                        <View style={{ marginTop: verticalScale(15) }}>
                          <TouchableOpacity
                            onPress={() => {
                              openMessagingWindow();
                            }}
                            style={styles.roundedMessageButtonFilled}
                          >
                            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', alignContent: "center", alignSelf: "center" }}>
                              <Image
                                style={{ marginTop: 2, tintColor: 'white', width: scale(12), height: (14), alignItems: 'center', justifyContent: 'center', alignContent: "center", alignSelf: "center" }}
                                source={Images.message}
                              />
                              <Text style={{ color: "#ffffff", marginLeft: scale(8), ...Styles.REGULAR_14, alignItems: 'center', justifyContent: 'center', alignContent: "center", alignSelf: "center" }}>
                                Message
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* <View style={{ marginTop: verticalScale(15), flexDirection: "row" }}> */}
                {/* <TouchableOpacity
                  style={styles.roundedButtonsFilled}
                  onPress={() => {
                    followCheck();
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    {isFollowing > 0 ? (
                      <Text style={styles.following_text}>following</Text>
                    ) : (
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          style={styles.follow_image_style}
                          source={Images.add_friends}
                        ></Image>
                        <Text style={styles.follow_text}>Follow</Text>
                      </View>
                    )} 
                  </View>
                </TouchableOpacity> */}
                {/* */}
              </View>
            </View>
            {/* </View> */}

            <View style={styles.lower_view}>
              <LinearGradient
                colors={["#F7EFFA", "#FEFAF9"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{
                  borderRadius: scale(32),
                  height: "100%",
                }}
              >
                <View style={styles.border_middle}></View>
                <View
                  style={[
                    {
                      // backgroundColor:'red',
                      marginHorizontal: normalize(20),
                      marginTop: normalize(10),
                    },
                  ]}
                >
                  <View
                    style={[
                      {
                        flexDirection: "row",
                        //  backgroundColor:'green',
                        height: normalize(35),
                        alignItems: "center",
                      },
                    ]}
                  >
                    <View style={[styles.same_view]}>
                      <TouchableOpacity
                        onPress={() => {
                          setSongsTab(false);
                          setPostTab(true);
                        }}
                      >
                        <Text
                          style={
                            postTab == true
                              ? styles.hilight_text
                              : styles.light_text
                          }
                        >
                          Posts
                        </Text>
                        {postTab == true ? (
                          <View style={[styles.indicatior_style]}></View>
                        ) : null}
                      </TouchableOpacity>
                    </View>
                    <View
                      style={[styles.same_view, { marginLeft: normalize(5) }]}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setPostTab(false);
                          setSongsTab(true);
                        }}
                      >
                        <Text
                          style={
                            songsTab == true
                              ? styles.hilight_text
                              : styles.light_text
                          }
                        >
                          Songs
                        </Text>
                        {songsTab == true ? (
                          <View style={[styles.indicatior_style]}></View>
                        ) : null}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                {/* /**********************Posts list code *************************************/}
                {postTab == true ? (
                  <View
                    style={[
                      {
                        //  backgroundColor:'red',
                        marginHorizontal: normalize(20),
                        marginTop: normalize(10),
                        height: "65%",
                      },
                    ]}
                  >
                    <Text style={{ ...Styles.REGULAR_15, color: '#686E76' }}>
                      ( {userDetail.userposts && userDetail.userposts.length}{" "}
                      Recordings)
                    </Text>

                    <FlatList
                      style={{ marginBottom: normalize(30) }}
                      refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={() => getUserDetail(route.params?.user_id)}
                        />
                      }
                      data={userDetail.userposts}
                      // data={post_List_Data}
                      showsVerticalScrollIndicator={false}
                      renderItem={(item) => renderItemComponent(item)}
                      // ItemSeparatorComponent={this.ItemSeparator}
                      keyExtractor={(item) => item.id.toString()}
                      ListEmptyComponent={<EmptyCard message="No Posts Found" />}
                    />
                  </View>
                ) : null}

                {/* /**********************Posts list code *************************************/}
                {/* /**********************Songs list code *************************************/}
                {songsTab == true ? (
                  <View
                    style={[
                      {
                        //  backgroundColor:'red',
                        marginHorizontal: normalize(20),
                        marginTop: normalize(10),
                        height: "65%",
                      },
                    ]}
                  >
                    {/* <Text style={[styles.light_text]}>{songsCount} Songs</Text> */}
                    <Text style={{ ...Styles.REGULAR_15, color: '#686E76' }}>( {userDetail.usersongs && userDetail.usersongs.length}{" "}
                      Songs)</Text>

                    <FlatList
                      style={{ marginBottom: normalize(30) }}
                      refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={() => getUserDetail(route.params?.user_id)}
                        />
                      }
                      data={userDetail.usersongs}
                      // data={post_List_Data}
                      showsVerticalScrollIndicator={false}
                      renderItem={(item) => renderSongsItemComponent(item)}
                      // ItemSeparatorComponent={this.ItemSeparator}
                      keyExtractor={(item) => item.id.toString()}
                      ListEmptyComponent={<EmptyCard message="No Songs Found" />}
                    />
                  </View>
                ) : null}

                {/* /**********************Songs list code *************************************/}
              </LinearGradient>
              <ModelView
                transparent={true}
                visible={hide}
                onRequestClose={() => {
                  setHide(false);
                }}
                lableTopOne="Sing Song"
                buttonText="Cancel"
                onPress={() => closeSongsModal()}
                ModalBottomView={[{ flexDirection: "row" }]}
              // lableTopOnePress={() => {
              //   setHide(false)
              // }}
              />
              <ModelMenuView
                transparent={true}
                visible={postShow}
                onRequestClose={() => {
                  setPostShow(false);
                }}
                lableTopOne="Copy Link"
                lableBottomTwo="Share"
                buttonText="Cancel"
                onPress={() => closePostsModal()}
                ModalSecContainer={[
                  {
                    height: normalize(120),
                  },
                ]}
                lableBottomTwoPress={() => {
                  onShare(selectedItem);
                }}
              />
            </View>
            <UserProfileModelView
              transparent={true}
              visible={showReport}
              onRequestClose={() => {
                setShowReport(false);
              }}
              FirstTitle="Let us curate your singing experience"
              FirstTitleNextLine="Tap 'OK' to give us permission to use your location."
              // titleOne={() => {}}
              SecondTitle="Report"
              titleTwo={() => {
                openLastModal();
                closeReportModal();
              }}
              onPress={() => { closeReportModal() }}
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
              // sourceTouchTwo={Images.Ellipse_white}
              // sourceTouchThree={Images.Ellipse_white}
              // sourceTouchFour={Images.Ellipse_white}
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
              TouchFourText="Illegal"
              TouchFourFourText="Content"
              profilebuttonText="Submit Report"
              placeholder="Add a custom reson here"
              placeholderTextColor="#B3B6BA"
              onPress={() => closeLastModal()}
            // onChangeOfText={(value) => handleOnChange("reason", value)}
            // ModalBottomView={[{ flexDirection: 'row' }]}
            />





          </BlurView>
        </ImageBackground>

      </View>

    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  imgBackground: {
    width: "100%",
    height: "100%",
  },
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#4B38D3",
  },
  customHeader: {
    ...Platform.select({
      ios: {},
      android: {
        marginTop: 20,
      },
      default: {
        height: "11%",
      },
    }),
  },
  input: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    width: "40%",
    height: 170,
    marginLeft: 20,
    marginRight: 20,
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
    margin: 15,
    fontSize: 15,
    justifyContent: "center",
  },
  profile_view: {
    // shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    // elevation: 7,
    flexDirection: "column",
    width: RFValue(110, Contants.DesignCanvas.HEIGHT),
    height: RFValue(110, Contants.DesignCanvas.HEIGHT),
    alignItems: "center",
    marginRight: RFValue(15, Contants.DesignCanvas.HEIGHT)
    // backgroundColor:"red"
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
    // backgroundColor:"#fff"
  },
  lower_view: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    // height: "100%",
    marginTop: 35,
    // overflow: "hidden",
  },
  heading_top: {
    color: "#FFF",
    fontSize: 20,
    marginTop: 20,
    justifyContent: "center",
    textAlign: "center",
    flex: 1,
    marginRight: 10,
    fontWeight: "bold",
  },
  profile_name: {
    ...Styles.SEMIBOLD_18,
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
    opacity: 0.5,
    width: 50,
    borderRadius: 10,
    height: 3,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
  ModalMainContainer: {
    // backgroundColor:"red",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    height: "100%",
  },
  ModalSecContainer: {
    backgroundColor: "#fff",
    width: 280,
    borderRadius: 10,
    // borderTopLeftRadius:10,
    // borderTopRightRadius:10,
    borderColor: "grey",
    borderWidth: 2,
    paddingTop: 10,
    paddingBottom: 5,
    height: 100,
    // justifyContent:"center",
    // alignItems:"center"
  },
  ModalTopView: {
    // backgroundColor:"red",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
  },
  ModalImgStyle: {
    width: 40,
    height: 40,
    marginLeft: 45,
  },
  hilight_text: {
    color: "#000",
    ...Styles.BOLD_20,
  },
  light_text: {
    color: "grey",
    ...Styles.BOLD_20,

  },
  indicatior_style: {
    width: normalize(20),
    // backgroundColor: "red",
    borderBottomWidth: normalize(4),
    borderColor: "#77A1D3",
    borderRadius: normalize(20),
    marginLeft: normalize(20),
    marginTop: normalize(5),
  },
  same_view: {
    height: normalize(35),
    // backgroundColor:'red',
    justifyContent: "center",
    alignItems: "center",
    width: normalize(70),
    // marginLeft:normalize(20)
  },
  flat_small_icon: {
    width: normalize(15),
    height: normalize(15),
  },
  flatlist_small_icon_text: {
    color: "grey",
    fontSize: normalize(20),
  },
  flatlist_small_icom_inner_row_view: {
    // backgroundColor:'green',
    flexDirection: "row",
    height: normalize(20),
    justifyContent: "space-between",
    alignItems: "center",
  },
  flalist_container: {
    // backgroundColor:"red",
    borderBottomColor: '#A1A3AA',
    borderBottomWidth: 0.2,
    marginTop: normalize(20),
    height: normalize(80),
  },
  flatlist_first_row_view: {
    // backgroundColor:'green',
    flexDirection: "row",
    height: normalize(80),
  },
  flatlist_profile_image_view: {
    // backgroundColor:'red',
    width: normalize(70),
  },
  flatlist_profile_image_style: {
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(20),
  },
  flatlist_second_container: {
    width: normalize(270),
    height: normalize(80),
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
    // elevation:0.6
  },
  flatlist_second_top_row_view: {
    //  backgroundColor: 'red',
    flexDirection: "row",
    justifyContent: "space-between",
    height: normalize(50),
  },
  flatlist_second_top_text_view: {
    // backgroundColor: 'green',
    width: moderateScale(250),
  },
  flatlist_second_top_song_name_text_style: {
    fontSize: normalize(22),
    fontWeight: "bold",
    color: "#000",
  },
  flatlist_second_top_user_name_test_style: {
    color: "grey",
    fontSize: normalize(20),
    fontWeight: "bold",
  },
  flatlist_menu_icon_view: {
    // backgroundColor:'yellow',
    width: normalize(20),
    marginRight: moderateScale(20),
    marginTop: verticalScale(5)
  },
  flatlist_menu_icon_style: {
    width: normalize(20),
    height: normalize(20),
  },
  flatlist_small_icon_uper_row_view: {
    // backgroundColor:'yellow',
    flexDirection: "row",
    height: normalize(20),
    justifyContent: "space-between",
    alignItems: "center",
  },
  flatlist_small_icon_container: {
    // backgroundColor:'red',
    width: normalize(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: normalize(30),
  },
  flatlist_bottom_row_view: {
    // backgroundColor:'red',
    flexDirection: "row",
    height: normalize(30),
    justifyContent: "space-between",
  },
  flatlist_video_container: {
    // backgroundColor:'red',
    marginTop: normalize(15),
  },
  flatlist_video_bg_style: {
    width: normalize(340),
    height: normalize(180),
    // justifyContent:"center",
    alignItems: "center",
  },
  flatlist_video_play_button_view: {
    // backgroundColor:'green',
    flexDirection: "row",
    width: normalize(140),
    height: normalize(40),
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: normalize(70),
  },
  flatlist_video_same_icone_style: {
    width: normalize(25),
    height: normalize(25),
  },
  flatlist_video_time_container: {
    // backgroundColor:"green",
    width: "90%",
    marginTop: normalize(30),
    height: normalize(35),
    // marginHorizontal:normalize(20)
  },
  flatlist_video_time_row_view: {
    flexDirection: "row",
    backgroundColor: "#272D37",
    height: normalize(35),
    width: normalize(100),
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: normalize(5),
  },

  roundedButtonsFilled: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: "#272D37",
    backgroundColor: "#272D37",
    borderRadius: 50,
    borderWidth: 1,
    width: scale(100),
    height: scale(30),
  },
  roundedMessageButtonFilled: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: "#77A1D3",
    backgroundColor: "#77A1D3",
    borderRadius: scale(30),
    borderWidth: 1,
    marginEnd: 3,
    width: scale(90),
    height: scale(30),
  },
  follow_image_style: {
    width: 15,
    height: 15,
    alignSelf: "center",
  },
  follow_text: {
    color: "#ffffff",
    marginLeft: 10,
  },
  following_text: {
    color: "#ffffff",
    marginLeft: 10,
  },
  TouchOneStyle: {
    backgroundColor: "#F5F5F7",
  },
  TouchOneStyleTrue: {
    backgroundColor: "#2DCB6F",
  },
});