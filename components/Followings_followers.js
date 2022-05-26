import React, { useEffect, userState, useState } from "react";
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
  RefreshControl,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import apiDetails from "../api/AllApis";
import Svg, { Path, G } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import constants from "../assets/constants";
import { EmptyCard } from "./Components/EmptyCard";
import Images from "../assets/Images";
import Styles from "../constants/Styles";
import { RFPercentage } from "react-native-responsive-fontsize";
import { EmptyFollowingCard } from "./Components/EmptyCardImage";
import { HeaderModel } from "./Components/NewModelView";
import { scale } from "react-native-size-matters";

export default function Followings_followers({ navigation, route }) { 
  const [listData, setListData] = useState([]);
  const [listBRender, setListBRender] = useState(false);
  const [followRefresh, setFollowRefresh] = useState(false); 
 

  /****************************Add following api************************************** */
  const addFollowingApi = (item, index) => {
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);
        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .post(a.post_add_following, {
            user_id: route.params.userDetail.id,
            following_id: item,
          })
          .then((response) => {
            if (response.data.status == "200") {
              updateFollowersSelection(index);
              console.log("add following ---if->", response);
            } else {
              console.log("add following else--------", response);
            }
          });
      }
    });
  };
  /****************************Add following api************************************** */

  useEffect(() => {
    {
      route.params?.screenName && route.params?.screenName == "follow"
        ? getFollowingList()
        : getFollowerList();
    }
  }, []);

  const getFollowingList = () => {
    setFollowRefresh(true);
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);
        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .post(a.get_following_list, { user_id: route.params.userDetail.id })
          .then((response) => {
            setFollowRefresh(false);
            if (response.data.status == "200") {
              for (let i = 0; i < response.data.data.data.length; i++) {
                var newItem = response.data.data.data[i];
                newItem.isSelected = false;
                newItem.following = 1;
                response.data.data.data[i] = newItem;
              }

              setListData(response.data.data.data);
            } else {
              console.log("following list else--------", response);
            }
          });
      }
    });
  };

  const updateFollowersSelection = (index) => {
    const arrFollowers = listData;
    const newItem = arrFollowers[index];

    if (newItem.following == 0) {
      newItem.following = 1;
    } else {
      newItem.following = 0;
    }

    arrFollowers[index] = newItem;
    setListData(arrFollowers);
    setListBRender(!listBRender);
  };

  const getFollowerList = () => {
    setFollowRefresh(true);
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);
        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .post(a.get_follower_list, { user_id: route.params.userDetail.id })
          .then((response) => {
            setFollowRefresh(false);
            if (response.data.status == "200") {
              for (let i = 0; i < response.data.data.data.length; i++) {
                var newItem = response.data.data.data[i];
                newItem.isSelected = true;

                response.data.data.data[i] = newItem;
              }
              setListData(response.data.data.data);
            } else {
              console.log("follower list else--------", response);
            }
          });
      }
    });
  };

  return (
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
              leftimgstyle={[{
                width: 28,
                height: 28
              }]}

              onPress={() => {
                navigation.goBack();
              }}
              // {route.params?.screenName && route.params?.screenName == "follow" ? (
              HeaderTitle={route.params?.screenName && route.params?.screenName == "follow" ? "Followings" : 'Followers'}
              leftImage={Images.all_screen_back_black_arrow_icon}
            />
            <LinearGradient
              colors={constants.AppColor.FLEX_GRADIENT_BACK_COLOR}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[Styles.LinearGradientStyle]}>
              {/* <ScrollView showsVerticalScrollIndicator={false} style={[Styles.customScrollview]}> */}
              {/* /*************************section code start************************* */}
              <View style={[Styles.SameContainerStyle]}>

                {route.params?.screenName &&
                  route.params?.screenName == "follow" ? (
                  <Text style={[Styles.REGULAR_17, { color: '#272D37', lineHeight: 22 }]}>
                    {listData.length} followings{" "}
                  </Text>
                ) : (
                  <Text style={[Styles.REGULAR_17, { color: '#272D37', lineHeight: 22 }]}>
                    {listData.length} followers{" "}
                  </Text>
                )}

              </View>
              {/* /*************************section code end************************* */}
              {/* /*************************section code Start************************* */}
              <View style={[Styles.SameContainerStyle, { marginTop: scale(15) }]}>
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={followRefresh}
                      onRefresh={() => {
                        route.params?.screenName &&
                          route.params?.screenName == "follow"
                          ? getFollowingList()
                          : getFollowerList();
                      }}
                    />
                  }
                  extraData={listBRender}
                  contentContainerStyle={{ paddingBottom: 20 }}
                  // data={postsLists}
                  data={listData}
                  keyExtractor={(item) => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={<EmptyFollowingCard />}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => {
                      navigation.navigate("User_Profile", {
                        user_id: item.id
                      })
                    }}>
                      <View>
                        <View style={styles.background_style}>
                          <Image
                            style={{
                              width: 60,
                              height: 60,
                              borderRadius: 20,
                              marginRight: 20,
                            }}
                            // source={Images.girl_img}
                            source={
                              item.image && item.image !== null
                                ? { uri: apiDetails.publicImage + item.image }
                                : Images.demo_image
                            }
                          />
                          <View>
                            <Text style={[Styles.MEDIUM_16, { color: "#272D37" }]}>
                              {item.firstname} {item.lastname}
                              {/* Michael Jackson */}
                            </Text>
                            <Text
                              style={[Styles.REGULAR_14, {
                                color: "#686E76",
                                marginTop: 5,
                              }]}
                            >
                              {/* Michael Jackson */}
                              {item.username}
                            </Text>
                          </View>
                          {/* /********************** */}
                          {route.params?.screenName &&
                            route.params?.screenName == "follow" ? (
                            <View
                              style={{
                                flexDirection: "row",
                                flex: 1,
                                justifyContent: "flex-end",
                              }}
                            >
                              {item.following != 0 ? (
                                <TouchableOpacity
                                  onPress={() => {
                                    // updateFollowersSelection(index)
                                    // updateFollowersSelection(index);
                                    addFollowingApi(item.id, index);

                                    // console.log("following---->", item.id);
                                  }}
                                  style={styles.roundedButtons}
                                >
                                  <Text
                                    style={[Styles.REGULAR_14,
                                    {
                                      color: "#000",
                                    },
                                    ]}
                                  >
                                    Following
                                  </Text>
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity
                                  onPress={() => {
                                    //   updateFollowersSelection(index)
                                    addFollowingApi(item.id, index);
                                    // addFollowingApi(item.id);
                                  }}
                                  style={[
                                    styles.roundedButtons,
                                    { backgroundColor: "#000" },
                                  ]}
                                >
                                  <Text
                                    style={Styles.REGULAR_14, [
                                      {
                                        color: "#fff",
                                      },
                                    ]}
                                  >
                                    Follow
                                  </Text>
                                </TouchableOpacity>
                              )}
                            </View>
                          ) : (
                            <View
                              style={{
                                flexDirection: "row",
                                flex: 1,
                                justifyContent: "flex-end",
                              }}
                            >
                              {item.following == 0 ? (
                                <TouchableOpacity
                                  onPress={() => {
                                    addFollowingApi(item.id, index);
                                    // addFollowerApi(item.id)
                                  }}
                                  style={[
                                    styles.roundedButtons,
                                    { backgroundColor: "#000" },
                                  ]}
                                >
                                  <Text
                                    style={Styles.REGULAR_14, [
                                      {
                                        color: "#fff",
                                      },
                                    ]}
                                  >
                                    Follow
                                  </Text>
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity
                                  onPress={() => {
                                    addFollowingApi(item.id, index);
                                  }}
                                  style={styles.roundedButtons}
                                >
                                  <Text
                                    style={Styles.REGULAR_14, [
                                      {
                                        color: "#000",
                                      },
                                    ]}
                                  >
                                    Following
                                  </Text>
                                </TouchableOpacity>
                              )}
                            </View>
                          )}
                          {/* /********************** */}
                          {/* {follow_button} */}
                        </View>
                        <View
                          style={{
                            height: 1,
                            marginLeft: 60,
                            backgroundColor: "#E4DDE5",
                            width: "100%",
                            marginBottom: 10,
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>

              {/* /*************************section code end************************* */}
              {/* </ScrollView> */}
            </LinearGradient>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  gradient_style: {
    ...Platform.select({
      ios: {
        marginTop: -47,
        height: Dimensions.get('window').height
      },
      android: {
        height: Dimensions.get('window').height + 25
      },
    })
  },

  roundedButtons: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: "#272D37",
    borderRadius: 50,
    borderWidth: 1,
    height: 35,
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
    color: "#272D37",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    // fontFamily: 'sp_bold',
  },
  heading_following: {
    ...Styles.REGULAR_16,
    // fontSize: 16,
    marginBottom: 20,
    color: "#272D37",
  },
  secondHeading: {
    marginTop: 10,
    color: "#272D37",
    fontSize: 15,
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
    marginBottom: 10,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
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
    overflow: "hidden",
    flex: 1,
    marginTop: 15
  },
  lower_view_gradient_style: {
    ...Platform.select({
      ios: {
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        height: Dimensions.get('screen').height * 0.8796,
        // marginTop:15,
        padding: 30,
      },
      android: {
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        height: Dimensions.get('screen').height * 0.8246,
        padding: 30,
      },
    })
  },
  heading_top: {
    ...Styles.BOLD_20,
    color: "#FFF",

    marginTop: 20,
    justifyContent: "center",
    textAlign: "center",
    flex: 1,
    marginRight: "15%",

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
