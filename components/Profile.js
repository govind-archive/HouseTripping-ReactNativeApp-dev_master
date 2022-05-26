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
  Dimensions,
  Platform,
  Animated,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path, G, Circle, Rect } from "react-native-svg";
import apiDetails from "../api/AllApis";
import LoadingLottie from "./anim/LoadingLottie";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { EmptyCard, EmptySongCard } from "./Components/EmptyCard";
import Moment from "moment";
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import * as ImagePicker from "expo-image-picker";
import { ModelMenuView, ModelView, ProfileCameraModelView, ProfileMenuModel, ProfilePostsListMenuModel, } from "./Components/ModeLView";
import Images from "../assets/Images";
import normalize from "react-native-normalize";
import { Audio } from "expo-av";
import { RFValue } from "react-native-responsive-fontsize";
import Contants from "../constants/Contants";
import Styles from "../constants/Styles";
import { scale } from "react-native-size-matters";
import { BlurView } from "expo-blur";

export default function Profile({ navigation }) {
  const [showLoading, setShowLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [hide, setHide] = useState(false);
  const [postShow, setPostShow] = useState(false);
  const [path, setPath] = useState("");
  const [gallary, setGallary] = useState("");
  const [imageTemp, setImageTemp] = useState(null);
  const [userImage, setUserImage] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [pathName, setPathName] = useState();
  const [userData, setUserData] = useState({});
  const [postTab, setPostTab] = useState(true);
  const [songsTab, setSongsTab] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [sound, setSound] = React.useState();
  const [playShow, setPlayShow] = useState(false);
  const [videoShow, setVideoShow] = useState(false);
  const [status, setStatus] = useState(-1);
  const [songsData, setSongsData] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [songsCount, setSongsCount] = useState(0);
  const [imageLoaded, setImageLoaded] = useState([]);
  const [loadAllImage, setLoadAllImage] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState({
    image: "",
  });

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

  const handleOnChange = (field, value) => {
    data[field] = value;
    setData(data);
  };

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

  /*****************Image update api CODE HERE*********************************/
  const handleClick = (uri) => {
    setShowLoading(true);
    AsyncStorage.getItem("userInfo").then((user) => {
      var n = uri.substring(uri.lastIndexOf(".") + 1);
      var image_name = "name" + (Math.floor(Math.random() * 100000) + 1) + "." + n;
      const form = new FormData();
      {
        form.append("image", {
          image: uri,
          type: "image/" + n,
          name: image_name,
          uri: uri,
        })
      }

      const headers = {
        "Content-Type": "multipart/form-data",
      };
      if (user) {
        var d = JSON.parse(user);
        const a = new apiDetails();

        a.getClient(d.token)
          .post(a.post_profile_image, form, { headers })
          .then((response) => {
            setShowLoading(false);
            if (response.data.status == "200") {
            } else {
            }
          });
      }
    });
  };
  /************************************************************** */

  /*****************Posts Flatlist CODE HERE*********************************/

  const showHide = (id) => {
    if (status == id) {
      setStatus(-1)
    } else {
      setStatus(id)
    }
  };

  //render list
  const renderItemComponent = (postData) => {
    return (
      <>
        {status != postData.item.id &&
          <TouchableOpacity
            onPress={() => {
              showHide(postData.item.id);
            }}
          >
            <View style={[styles.flalist_container]}>
              <View style={[{
                ...Platform.select({
                  ios: {
                    // backgroundColor: 'blue',
                    flexDirection: "row",
                    height: RFValue(70, Contants.DesignCanvas.HEIGHT),
                    width: Dimensions.get('window').width
                  },
                  android: {
                    // backgroundColor: 'blue',
                    flexDirection: "row",
                    height: RFValue(70, Contants.DesignCanvas.HEIGHT),
                    width: Dimensions.get('window').width
                  }
                })
              }]}>
                <View style={[{
                  // backgroundColor: 'red',
                  width: RFValue(60, Contants.DesignCanvas.HEIGHT),
                }]}>
                  <ImageBackground
                    imageStyle={[{ borderRadius: 16 }]}
                    // source={Images.girl_img}
                    style={[{
                      width: RFValue(50, Contants.DesignCanvas.HEIGHT),
                      height: RFValue(50, Contants.DesignCanvas.HEIGHT),
                      justifyContent: "center",
                      alignItems: "center"
                    }]}
                    source={
                      loadAllImage ? {
                        uri:
                          apiDetails.publicVideo + "" +
                          postData.item.thumbnail,
                      } : Images.demo_image}

                    onLoad={() => {
                      // let imageLoaded_temp = imageLoaded;
                      // imageLoaded_temp.push(postData.item.id)
                      // setImageLoaded(imageLoaded_temp);
                      if (!loadAllImage) {
                        setLoadAllImage(true);
                      }
                    }}
                  >
                    <TouchableOpacity>
                      <Image
                        style={[{
                          width: RFValue(24, Contants.DesignCanvas.HEIGHT),
                          height: RFValue(24, Contants.DesignCanvas.HEIGHT),
                          // borderRadius:16
                        }]}
                        resizeMode="cover"
                        source={Images.play_icon}

                      />
                    </TouchableOpacity>
                  </ImageBackground>

                </View>
                <View style={[{
                  flex: 1,
                  height: RFValue(70, Contants.DesignCanvas.HEIGHT),
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#272D37",
                  // paddingBottom:5
                  // elevation:0.6
                }]}>
                  <View style={[{
                    // backgroundColor: 'yellow',
                    flexDirection: "row",
                    // justifyContent: "space-between",
                    height: RFValue(45, Contants.DesignCanvas.HEIGHT),
                  }]}>
                    <View style={[{
                      flex: 1,
                      // backgroundColor: "pink"
                    }]}>
                      <Text
                        numberOfLines={1}
                        style={[Styles.MEDIUM_16, {
                          color: "#272D37",
                        }]}
                      >
                        {" "}
                        {postData.item.title}
                        {/* All These Years (Camila Cabe... */}
                        {" "}
                      </Text>
                      <Text
                        style={[Styles.REGULAR_14, {
                          color: "#686E76",
                          marginTop: RFValue(5, Contants.DesignCanvas.HEIGHT)
                        }]}
                      >
                        @{postData.item.artist}
                        {/* @starwilliam */}
                      </Text>
                    </View>
                    <View style={[{
                      flex: 0.5,
                      ...Platform.select({
                        ios: {
                          // backgroundColor:'red',
                          width: RFValue(25, Contants.DesignCanvas.HEIGHT),
                          // justifyContent:"center"
                          alignItems: 'center',
                          marginLeft: RFValue(10, Contants.DesignCanvas.HEIGHT)
                        },
                        android: {
                          // backgroundColor:'red',
                          width: RFValue(25, Contants.DesignCanvas.HEIGHT),
                          // justifyContent:"center"
                          alignItems: 'center',
                          marginLeft: RFValue(10, Contants.DesignCanvas.HEIGHT)
                        }
                      })

                    }]}>
                      <TouchableOpacity
                        onPress={() => {
                          openPostsModal(postData.item);
                        }}
                      >
                        <Image
                          style={[styles.flatlist_menu_icon_style]}
                          resizeMode="contain"
                          source={Images.three_black_dots}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={[styles.flatlist_bottom_row_view,
                  {
                    // backgroundColor:"red"
                  }]}>
                    <View style={[styles.flatlist_small_icon_container, {
                      flex: 1,
                      height: RFValue(20, Contants.DesignCanvas.HEIGHT),
                      // backgroundColor:"green"
                    }]}>
                      <View
                        style={[

                          {
                            ...Platform.select({
                              ios: {
                                // backgroundColor:'yellow',
                                flexDirection: "row",
                                height: RFValue(20, Contants.DesignCanvas.HEIGHT),
                                // justifyContent: "space-between",
                                alignItems: "center",
                                width: RFValue(170, Contants.DesignCanvas.HEIGHT)
                              },
                              android: {
                                // backgroundColor:'yellow',
                                flexDirection: "row",
                                height: RFValue(20, Contants.DesignCanvas.HEIGHT),
                                // justifyContent: "space-between",
                                alignItems: "center",
                                width: RFValue(170, Contants.DesignCanvas.HEIGHT)
                              }
                            })

                          },
                        ]}
                      >
                        <View style={[{
                          // backgroundColor:'red',
                          flexDirection: "row",
                          alignItems: "center",
                          // backgroundColor: "black",
                          height: RFValue(30, Contants.DesignCanvas.HEIGHT),
                          width: RFValue(65, Contants.DesignCanvas.HEIGHT),
                          // justifyContent:"space-around"
                          paddingLeft: 5
                        }]}>
                          <Image
                            style={[styles.flat_small_icon]}
                            source={Images.headset_icon}
                            resizeMode="contain"
                          />
                          <Text style={[Styles.REGULAR_12, {
                            color: "#A1A3AA",
                            marginLeft: RFValue(3, Contants.DesignCanvas.HEIGHT)
                          }]}>
                            {postData.item.views_count}
                          </Text>
                        </View>
                        <View style={[{
                          // backgroundColor:'green',
                          flexDirection: "row",
                          alignItems: "center",
                          // backgroundColor: "black",
                          height: RFValue(30, Contants.DesignCanvas.HEIGHT),
                          width: RFValue(65, Contants.DesignCanvas.HEIGHT),
                          // justifyContent:"space-around"
                          paddingLeft: 5
                        }]}>
                          <Image
                            style={[styles.flat_small_icon]}
                            source={Images.heart_icon}
                            resizeMode="contain"
                          />
                          <Text style={[Styles.REGULAR_12, {
                            color: "#A1A3AA",
                            marginLeft: RFValue(3, Contants.DesignCanvas.HEIGHT)
                          }]}>
                            {postData.item.post_likes}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={[
                        {
                          flex: 1,
                          ...Platform.select({
                            ios: {
                              // backgroundColor:'black', 
                              alignItems: "center",
                              justifyContent: "center",
                              height: RFValue(20, Contants.DesignCanvas.HEIGHT),
                            },
                            android: {
                              //  backgroundColor:'black', 
                              justifyContent: "center",
                              alignItems: "center",
                              height: RFValue(20, Contants.DesignCanvas.HEIGHT),
                            },
                          })
                        },
                      ]}
                    >
                      <Text style={[Styles.REGULAR_12, { color: "#A1A3AA" }]}>
                        {showTimeAgo(postData.item.created_at)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        }

        {status == postData.item.id ? (
          <View style={[styles.flatlist_video_container,
          {
            // backgroundColor:"green",
            marginLeft: 10,
            flex: 1
          }]}>

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
                height: 250,
                borderRadius: 20
              }}
            />

            <View
              style={[
                {
                  // backgroundColor: "red",
                  flex: 1,
                  marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT)
                },
              ]}
            >
              <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                showHide(postData.item.id);
              }}>
                <View
                  style={[
                    styles.flatlist_second_container,
                    { flex: 1 },
                  ]}
                >
                  <View style={[styles.flatlist_second_top_row_view, {
                    // backgroundColor:"yellow",
                    height: RFValue(40, Contants.DesignCanvas.HEIGHT),
                    flex: 1
                    // justifyContent:"space-between"
                  }]}>
                    <View style={[styles.flatlist_second_top_text_view,
                    {
                      // backgroundColor:"green",
                      flex: 1
                    }]}>
                      <Text
                        numberOfLines={1}
                        style={[Styles.MEDIUM_16, { color: "#272D37" }]}
                      >
                        {" "}
                        {postData.item.title}
                        {/* Havana (Camila Cabello song) */}
                        {" "}
                      </Text>
                      <Text
                        style={[Styles.REGULAR_14, { color: '#686E76' }]}
                      >
                        @{postData.item.artist}
                        {/* @starwilliam */}
                      </Text>
                    </View>
                    <View style={[styles.flatlist_menu_icon_view, {
                      ...Platform.select({
                        ios: {
                          // backgroundColor:'blue',
                          width: RFValue(30, Contants.DesignCanvas.HEIGHT),
                          marginLeft: RFValue(20, Contants.DesignCanvas.HEIGHT),
                          alignItems: "center"
                        },
                        android: {
                          // backgroundColor:'blue',
                          width: RFValue(30, Contants.DesignCanvas.HEIGHT),
                          marginLeft: RFValue(30, Contants.DesignCanvas.HEIGHT),
                          alignItems: "center"
                        }
                      })


                    }]}>
                      <TouchableOpacity onPress={() => {
                        openPostsModal(postData.item);
                      }}>
                        <Image
                          style={[styles.flatlist_menu_icon_style]}
                          resizeMode="contain"
                          source={Images.three_black_dots}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={[styles.flatlist_bottom_row_view, {
                    // backgroundColor: "green",
                    // justifyContent:"center"
                    // alignItems:'center'
                    flex: 1
                  }]}>
                    <View style={[styles.flatlist_small_icon_container,
                    {
                      width: RFValue(210, Contants.DesignCanvas.HEIGHT),
                      // backgroundColor:"black",
                      justifyContent: "center"
                    }]}>
                      <View
                        style={[
                          styles.flatlist_small_icon_uper_row_view,
                          {
                            width: RFValue(210, Contants.DesignCanvas.HEIGHT),
                            // backgroundColor: "blue",
                            height: RFValue(30, Contants.DesignCanvas.HEIGHT),
                          },
                        ]}
                      >
                        <View style={[styles.flatlist_small_icom_inner_row_view]}>
                          <Image
                            style={[styles.flat_small_icon, {
                              width: RFValue(13, Contants.DesignCanvas.HEIGHT),
                              height: RFValue(13, Contants.DesignCanvas.HEIGHT),
                            }]}
                            source={Images.headset_icon}
                            resizeMode="contain"
                          />
                          <Text style={[styles.flatlist_small_icon_text]}>
                            {postData.item.views_count}
                            {/* 278 */}
                          </Text>
                        </View>
                        <View style={[styles.flatlist_small_icom_inner_row_view]}>
                          <Image
                            style={[styles.flat_small_icon, {
                              width: RFValue(13, Contants.DesignCanvas.HEIGHT),
                              height: RFValue(13, Contants.DesignCanvas.HEIGHT),
                            }]}
                            source={Images.heart_icon}
                            resizeMode="contain"
                          />
                          <Text style={[styles.flatlist_small_icon_text]}>
                            {postData.item.post_likes}
                            {/* 278 */}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate("Comment_screen", {
                              post_id: postData.item.id,
                            });
                          }}
                        >
                          <View style={[styles.flatlist_small_icom_inner_row_view]}>
                            <Image
                              style={[styles.flat_small_icon, {
                                width: RFValue(13, Contants.DesignCanvas.HEIGHT),
                                height: RFValue(13, Contants.DesignCanvas.HEIGHT),
                                // marginTop:5
                              }]}
                              source={Images.msg_icon}
                              resizeMode="contain"
                            />
                            <Text style={[styles.flatlist_small_icon_text]}>
                              {postData.item.comment_count}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={[
                        {
                          ...Platform.select({
                            ios: {
                              // backgroundColor:'yellow',
                              flex: 1,
                              marginLeft: RFValue(20, Contants.DesignCanvas.HEIGHT),
                              height: RFValue(30, Contants.DesignCanvas.HEIGHT),
                              justifyContent: "center",
                              alignItems: "flex-end"
                            },
                            android: {
                              // backgroundColor:'yellow', 
                              flex: 1,
                              marginLeft: RFValue(30, Contants.DesignCanvas.HEIGHT),
                              height: RFValue(30, Contants.DesignCanvas.HEIGHT),
                              alignItems: "flex-end",
                              justifyContent: "center"
                            }
                          })

                        },
                      ]}
                    >
                      <Text style={[styles.flatlist_small_icon_text]}>
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

  //Time ago function
  const showTimeAgo = (time) => {
    time = time.replace("T", " ");
    time = time.replace("000000Z", "000");
    var tem_d = Moment(time).fromNow();
    return tem_d;
  };

  //render song list
  const renderSongsItemComponent = (songsData) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            showHide();
          }}
        >
          <View style={[styles.flalist_container]}>
            <View style={[{
              ...Platform.select({
                ios: {
                  // backgroundColor: 'blue',
                  flexDirection: "row",
                  height: RFValue(80, Contants.DesignCanvas.HEIGHT),
                  width: Dimensions.get('window').width
                },
                android: {
                  // backgroundColor: 'blue',
                  flexDirection: "row",
                  height: RFValue(80, Contants.DesignCanvas.HEIGHT),
                  width: Dimensions.get('window').width
                }
              })
            }]}>
              <View style={[{
                // backgroundColor: 'red',
                width: RFValue(60, Contants.DesignCanvas.HEIGHT),
              }]}>
                <ImageBackground
                  imageStyle={[{ borderRadius: 25 }]}
                  // source={Images.girl_img}
                  style={[{
                    width: RFValue(50, Contants.DesignCanvas.HEIGHT),
                    height: RFValue(50, Contants.DesignCanvas.HEIGHT),
                    justifyContent: "center",
                    alignItems: "center"

                  }]}
                  source={{
                    uri:
                      apiDetails.publicImage + "" + songsData.item.cover_photo,
                  }}
                >
                  {playShow == true ? (
                    <TouchableOpacity
                      onPress={() => {
                        playSound(
                          apiDetails.publicImage + "" + songsData.item.song
                        );
                        setPlayShow(false);
                      }}
                    >
                      <Image
                        style={[{
                          width: RFValue(24, Contants.DesignCanvas.HEIGHT),
                          height: RFValue(24, Contants.DesignCanvas.HEIGHT),
                          // borderRadius:16
                        }]}
                        resizeMode="cover"
                        source={Images.play_icon}

                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setPlayShow(true);
                      }}
                    >
                      <Image
                        style={[{
                          width: RFValue(24, Contants.DesignCanvas.HEIGHT),
                          height: RFValue(24, Contants.DesignCanvas.HEIGHT),
                          // borderRadius:16
                        }]}
                        resizeMode="cover"
                        source={Images.play_icon}

                      />
                    </TouchableOpacity>
                  )}
                </ImageBackground>

              </View>
              <View style={[{
                // backgroundColor: 'green',
                width: "100%",
                height: RFValue(80, Contants.DesignCanvas.HEIGHT),
                borderBottomWidth: 0.5,
                borderBottomColor: "#272D37",
                // paddingBottom:5
                // elevation:0.6
              }]}>
                <View style={[{
                  width: "100%",
                  flexDirection: "row",
                  height: RFValue(45, Contants.DesignCanvas.HEIGHT),
                }]}>
                  <View style={[{
                    flex: 1
                  }]}>
                    <Text
                      numberOfLines={1}
                      style={[Styles.MEDIUM_16, {

                        color: "#272D37",
                      }]}
                    >
                      {" "}
                      {songsData.item.title}
                      {/* All These Years (Camila Cabe... */}
                      {" "}
                    </Text>
                    <Text
                      style={[Styles.REGULAR_14, {
                        color: "#686E76",
                        marginTop: RFValue(5, Contants.DesignCanvas.HEIGHT)
                      }]}
                    >
                      {songsData.item.genere}
                      {/* @starwilliam */}
                    </Text>
                  </View>
                  <View style={[{
                    ...Platform.select({
                      ios: {
                        // backgroundColor:'red',
                        width: RFValue(25, Contants.DesignCanvas.HEIGHT),
                        // justifyContent:"center"
                        alignItems: 'center',
                        marginLeft: RFValue(10, Contants.DesignCanvas.HEIGHT)
                      },
                      android: {
                        flex: 1,
                        // backgroundColor:'red',
                        width: RFValue(25, Contants.DesignCanvas.HEIGHT),
                        // justifyContent:"center"
                        alignItems: 'center',
                        marginLeft: RFValue(10, Contants.DesignCanvas.HEIGHT)
                      }
                    })

                  }]}>
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
                  </View>
                </View>
                <View style={[styles.flatlist_bottom_row_view,
                {
                  paddingTop: scale(5),
                  width: "100%",
                  backgroundColor: "#000"
                }]}>

                  <View
                    style={[
                      {
                        ...Platform.select({
                          ios: {
                            // backgroundColor:'black',
                            width: RFValue(300, Contants.DesignCanvas.HEIGHT),
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            alignItems: "center",
                            height: RFValue(20, Contants.DesignCanvas.HEIGHT),
                            // marginLeft: RFValue(25, Contants.DesignCanvas.HEIGHT),
                          },
                          android: {
                            //  backgroundColor:'black', 
                            width: "100%",
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            alignItems: "center",
                            // marginLeft: RFValue(20, Contants.DesignCanvas.HEIGHT),
                          },
                        })

                      },
                    ]}
                  >
                    <Text style={[Styles.REGULAR_12, { color: "#A1A3AA" }]}>
                      @{songsData.item.artist}
                      {/* @starwilliam */}
                    </Text>
                    <Text style={[Styles.REGULAR_12, { color: "#A1A3AA" }]}>
                      {showTimeAgo(songsData.item.created_at)}
                      {/* 2 days ago */}
                    </Text>
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

  useEffect(() => {
    getUserDetail();
  }, []);

  //Api call for user details
  const getUserDetail = () => {
    setRefreshing(true);
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);
        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .post(a.get_user_detail)
          .then((response) => {
            setRefreshing(false);
            if (response.data.status == "200") {
              setShowLoading(false);
              setSongsCount(response.data.data.usersongs.length);
              setUserDetail(response.data.data);
              setImageTemp(response.data.data.image);
            } else {
              console.log("user Detail else--------", response);
            }
          });
      }
    });
  };

  //Logout function
  const logOut = () => {
    setRefreshing(true);
    var main_token = "";
    if (AsyncStorage !== '') {
      AsyncStorage.getItem("notification_token").then((token) => {
        if (token) {
          main_token = token;
        }
        AsyncStorage.clear();
        AsyncStorage.setItem("notification_token", main_token);
        setRefreshing(false);
        navigation.navigate('Login');
      });
    }
  }
  /**********************user detail api************************/

  // This function is triggered when the "Gallery" has pressed
  const openGallery = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      setGallary(result);
      setImageTemp(result.uri);
      handleClick(result.uri);
    }
  };

  // This function is triggered when the "Camera" has pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result

    if (!result.cancelled) {
      setPath(result);
      setImageTemp(result.uri);
      handleClick(result.uri);
    }
  };

  /************* Delete post ***************/
  function deletePost() {
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);
        const a = new apiDetails();

        a.getClient(d.token)
          .delete(a.deletePost + "/" + selectedItem.id)
          .then((response) => {
            if (response.data.status == "200") {
              alert("Removed Success");
              getUserDetail();
              closeModal();
            } else {
              alert("Oops this item cannot be deleted at this movement");
            }
          });
      }
    });
  }
  /***************************************/

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
  const openMenuModal = () => {
    setOpenMenu(true);
  };
  const closeMenuModal = () => {
    setOpenMenu(false);
  };

  /*****************TAB VIEW CODE HERE********************************/
  /**********************user detail api*************************/

  return (
    <MenuProvider style={styles.container}>
      <ImageBackground
        style={[
          {
            width: "100%",
            height: "100%",
          },
        ]}
        source={{ uri: imageTemp }}
      >
        <BlurView intensity={100} style={[{
          height:"100%",
          paddingTop: 10
        }]}>
          <StatusBar
            animated={true}
            translucent
            backgroundColor="transparent"
            barStyle={"light-content"}
          />
          {/*****************************section start************************** */}
          <View
            style={[styles.SameContainer, {}]}
          >
            <View style={[styles.profile_header_container]}>

              <View style={[styles.profile_header_style,]}>

                <View style={[{
                  flex: 1,
                  justifyContent: "center", alignContent: "center", alignItems: "center",
                }]}>

                  <Text style={[Styles.BOLD_20, { color: '#fff' }]}>Profile</Text>

                </View>

                <View style={[{
                  height: RFValue(50, 812),
                  alignContent: "flex-end",
                  justifyContent: 'center',
                  alignItems: 'flex-end'
                }]}>

                  <TouchableOpacity
                    onPress={() => {
                      openMenuModal();
                    }}
                  >
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                        tintColor: "#FFF",
                        // justifyContent:'flex-end',
                        // alignItems:'flex-end'
                      }}
                      resizeMode={"contain"}
                      source={require("../assets/images/three_black_dots.png")}
                    />

                  </TouchableOpacity>

                </View>

              </View>

              { /*****************************section start************************** */}
              <View style={{ flexDirection: "row", marginTop: RFValue(20, Contants.DesignCanvas.HEIGHT) }}>

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
                      marginBottom: 10
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
                          borderRadius: 25,
                        }]}
                        // resizeMode='contain'
                        source={
                          userImage ?
                            { uri: imageTemp } :
                            Images.profile_demo_image
                        }
                        onLoad={() => {
                          setTimeout(function () {
                            setUserImage(true);
                          }, 1000);
                        }}
                      />
                    </View>
                  </LinearGradient>
                  <TouchableOpacity style={[{
                    width: 35,
                    paddingLeft: 4,
                    marginTop: -20,
                  }]} onPress={() => openModal()}>
                    <Image
                      style={{ height: 30, width: 30 }}
                      source={Images.profile_camera_icon}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "column", paddingTop: RFValue(5, Contants.DesignCanvas.HEIGHT) }}>

                  <Text style={[Styles.SEMIBOLD_18, { color: '#ffff' }]}>
                    {userDetail.firstname} {userDetail.lastname}
                  </Text>
                  <Text style={[Styles.REGULAR_14, { color: '#FFFFFFBF', marginTop: 5 }]}>
                    @{userDetail.username}
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
                        <Text style={styles.zero_common}>
                          {userDetail.followers}
                        </Text>

                        <Text style={styles.follow_common}>followers</Text>
                      </TouchableOpacity>
                    </View>
                    <View></View>
                    <View style={{ flexDirection: "column" }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("Followings_followers", {
                            screenName: "follow",
                            userDetail: userDetail,
                          });
                        }}
                      >
                        <Text style={styles.zero_common}>
                          {userDetail.followings}
                        </Text>

                        <Text style={styles.follow_common}>followings</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              { /*****************************section end************************** */}

            </View>

          </View>
          { /*****************************section end************************** */}

          <View style={styles.lower_view}>
            <LinearGradient
              colors={["#FEFAF9", "#F7EFFA"]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[styles.lower_view_gradient]}
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
                      // marginHorizontal: RFValue(0,Contants.DesignCanvas.HEIGHT),
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
                    styles.parentStyle,
                    {height:"100%"}
                  ]}
                >
                  <Text style={[Styles.REGULAR_15, { color: '#686E76' }]}>
                    ( {userDetail.userposts && userDetail.userposts.length}{" "}
                    Recordings)
                  </Text>

                  <FlatList
                    style={[styles.postStyle,]}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => getUserDetail()}
                      />
                    }
                    data={userDetail.userposts} 
                    showsVerticalScrollIndicator={false}
                    renderItem={(item) => renderItemComponent(item)} 
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={<EmptyCard message="No Post Yet" />}
                  />

                </View>
              ) : null}

              {/* /**********************Posts list code *************************************/}
              {/* /**********************Songs list code *************************************/}
              {songsTab == true ? (
                <View
                  style={[
                    {
                      marginHorizontal: RFValue(25, Contants.DesignCanvas.HEIGHT),
                      marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT),
                    }
                  ]}
                >
                  <Text style={[Styles.REGULAR_15, { color: '#686E76', marginLeft: 5 }]}>{songsCount} Songs</Text>

                  <FlatList
                    style={{ marginBottom: normalize(0) }}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => getUserDetail()}
                      />
                    }
                    data={userDetail.usersongs}
                    showsVerticalScrollIndicator={false}
                    renderItem={(item) => renderSongsItemComponent(item)}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={<EmptySongCard message="There are no Songs yet" Title="Upload song" onPress={() => {
                      Linking.openURL('https://housetripping.com/');
                    }} />}
                  />
                </View>
              ) : null}

              {/* /**********************Songs list code *************************************/}
            </LinearGradient>
            {/* /**********************Camera model view *************************************/}
            <ProfileCameraModelView
              transparent={true}
              visible={show}
              onRequestClose={() => {
                setShow(false);
              }}
              onPress={() => { closeModal() }}
              FirstTitle="Camera"
              titleOne={() => {
                openCamera("image", path.uri);
                handleOnChange("image", path.uri);
                setShow(false);
              }}
              SecondTitle="Gallary"
              titleTwo={() => {
                openGallery("image", gallary.uri);
                handleOnChange("image", gallary.uri);
                setShow(false);
              }}
            />
            {/* /**********************Camera model view *************************************/}
            <ProfileCameraModelView
              transparent={true}
              visible={hide}
              onRequestClose={() => {
                setHide(false);
              }}
              onPress={() => { setHide(false); }}
              FirstTitle={"Sing Song"}
              titleOne={() => { setHide(false) }}
              SecondTitle="Remove"
              titleTwo={() => { deletePost() }}

            />
            {/* /**********************Menu Model view *************************************/}
            <ProfilePostsListMenuModel
              transparent={true}
              visible={postShow}
              onRequestClose={() => {
                setPostShow(false);
              }}
              onPress={() => { closePostsModal() }}
              Copylink={() => { alert('working.....') }}
              Share={() => { onShare(selectedItem); }}
              Remove={() => { deletePost(); }}

            />
            {/* /**********************Menu Model view *************************************/}

          </View>
        </BlurView>
      </ImageBackground>

      {/* </SafeAreaView> */}
      {/* /**********************Menu Model view *************************************/}
      <ProfileMenuModel
        transparent={true}
        visible={openMenu}
        onRequestClose={() => {
          setOpenMenu(false);
        }}
        onPress={() => { closeMenuModal() }}
        Settings={() => {
          navigation.navigate("SettingProfile", {
            userDetail: userDetail,
          });
          setOpenMenu(false);
        }}
        // Subscription={() => {
        //   navigation.navigate("SubscriptionPlan");
        //   setOpenMenu(false);
        // }}
        AboutApp={() => {
          navigation.navigate("AboutApp");
          setOpenMenu(false);
        }}
        Help={() => {
          navigation.navigate("Help");
          setOpenMenu(false);
        }}
        logout={() => {
          // AsyncStorage.clear();
          logOut()
          setOpenMenu(false);
          // navigation.navigate('Login')
        }}
      />
      {/* /**********************Menu Model view *************************************/}

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
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  imgBackground: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#77A1D3",
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
    // borderWidth: 3,
    // borderColor: "#4B38D3",
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  linerGradient_background: {
    borderRadius: 25,
    width: "100%",
    height: "100%",
    padding: RFValue(2, Contants.DesignCanvas.HEIGHT),
    // backgroundColor:"#fff"
  },
  lower_view: {
    ...Platform.select({
      ios: {
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        height: "100%",
        overflow: "hidden",
        // backgroundColor:"red"
      },
      android: {
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        height: "100%",
        marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT),
        // overflow: "hidden",
        
      }
    })
  },
  lower_view_gradient: {
    ...Platform.select({
      ios: {
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        height: "100%",
      },
      android: {
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        height: "100%",
        overflow: 'hidden',
      }
    })
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
    ...Styles.BOLD_16,
    color: "#fff",
    marginTop: 5,

  },
  follow_common: {
    ...Styles.REGULAR_14,
    color: "#fff",

    marginRight: 30,
    marginTop: 3
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
    ...Styles.BOLD_20,
    color: "#000",

  },
  light_text: {
    ...Styles.MEDIUM_16,
    color: "grey",
    marginBottom: 2

  },
  indicatior_style: {
    width: normalize(20),
    backgroundColor: "red",
    borderBottomWidth: normalize(4),
    borderColor: "#77A1D3",
    borderRadius: normalize(20),
    marginLeft: normalize(15),
    marginTop: normalize(5),
  },
  same_view: {
    ...Platform.select({
      ios: {
        height: normalize(35),
        // backgroundColor:'red',
        justifyContent: "center",
        alignItems: "center",
        width: scale(58)
        // marginLeft:normalize(20)
      },
      android: {
        height: normalize(35),
        // backgroundColor:'red',
        justifyContent: "center",
        alignItems: "center",
        // width: RFValue(55, Contants.DesignCanvas.HEIGHT),
        width: scale(58)
        // marginLeft:normalize(20)
      }
    })

  },
  flat_small_icon: {
    width: RFValue(10, Contants.DesignCanvas.HEIGHT),
    height: RFValue(10, Contants.DesignCanvas.HEIGHT),
  },
  flatlist_small_icon_text: {
    ...Styles.REGULAR_14,
    color: "#A1A3AA",
    marginLeft: 5,
    textAlign: "center"
    // alignSelf:'centerS'
  },
  flatlist_small_icom_inner_row_view: {
    // backgroundColor:'red',
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "black",
    height: RFValue(30, Contants.DesignCanvas.HEIGHT),
    width: RFValue(65, Contants.DesignCanvas.HEIGHT),
    // justifyContent:"space-around"
    paddingLeft: 5
  },
  flalist_container: {
    // backgroundColor: "red",
    marginTop: normalize(20),
    // height: RFValue(60, Contants.DesignCanvas.HEIGHT),
    width: Dimensions.get('window').width
  },
  flatlist_first_row_view: {
    ...Platform.select({
      ios: {
        backgroundColor: 'green',
        flexDirection: "row",
        height: normalize(80),
        width: Dimensions.get('window').width
      },
      android: {
        backgroundColor: 'green',
        flexDirection: "row",
        height: normalize(80),
        width: Dimensions.get('window').width
      }
    })

  },
  flatlist_profile_image_view: {
    backgroundColor: 'red',
    width: normalize(70),
  },
  flatlist_profile_image_style: {
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(20),
  },
  flatlist_second_container: {
    // backgroundColor: 'green', 
    height: normalize(70),
    borderBottomWidth: 0.5,
    borderBottomColor: "#272D37",
    // elevation:0.6
  },
  flatlist_second_top_row_view: {
    // backgroundColor: 'blue',
    flexDirection: "row",
    // justifyContent: "space-between",
    height: normalize(50),
  },
  flatlist_second_top_text_view: {
    // backgroundColor: 'yellow',
    width: RFValue(250, Contants.DesignCanvas.HEIGHT)
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
  },
  flatlist_menu_icon_style: {
    width: 20,
    height: 20,
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
    height: normalize(30),
  },
  flatlist_bottom_row_view: {
    // backgroundColor:'red',
    flexDirection: "row",
    height: normalize(30),
    // justifyContent: "space-between",
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
    width: RFValue(12, Contants.DesignCanvas.HEIGHT),
    height: RFValue(12, Contants.DesignCanvas.HEIGHT),
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
    height: RFValue(25, Contants.DesignCanvas.HEIGHT),
    width: RFValue(80, Contants.DesignCanvas.HEIGHT),
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 4
  },

  SameContainer: {
    ...Platform.select({
      ios: {
        // backgroundColor: "red",
        marginTop: RFValue(5, Contants.DesignCanvas.HEIGHT),
        width: Dimensions.get('window').width,
        paddingHorizontal: RFValue(20, Contants.DesignCanvas.HEIGHT)
      },
      android: {
        paddingHorizontal: RFValue(25, Contants.DesignCanvas.HEIGHT),
        justifyContent: "center",
        alignContent: "center"
      },

    }),
  },
  profile_header_container: {
    ...Platform.select({
      ios: {
        // backgroundColor:'green',
        width: Dimensions.get('window').width * 0.8956,
        height: RFValue(210, 812)
      },
      android: {
        // backgroundColor:'green',  
      },
    })
  },
  profile_header_style: {
    ...Platform.select({
      ios: {
        // backgroundColor:'yellow',
        width: Dimensions.get('window').width * 0.8956,
        height: RFValue(50, 812),
        flexDirection: "row",
        // justifyContent:'center',
        // alignItems:'center'
      },
      android: {
        // backgroundColor:'yellow',
        marginTop: 10,
        width: "100%",
        flexDirection: "row",
        alignItems: 'center'
      }
    })
  },
  postStyle: {
    ...Platform.select({
      ios: {
        marginBottom: normalize(30),
      },
      android: {
        marginBottom: normalize(80),
      }
    })
  },
  parentStyle: {
    ...Platform.select({
      ios: {
        marginHorizontal: RFValue(25, Contants.DesignCanvas.HEIGHT),
        flex: 1
      },
      android: {
        marginHorizontal: RFValue(25, Contants.DesignCanvas.HEIGHT),
        // flex: 1,
      }
    })
    //  backgroundColor:'red',

  },


});
