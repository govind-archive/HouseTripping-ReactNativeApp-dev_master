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
  FlatList,
  Platform,
  useWindowDimensions,
  RefreshControl,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import apiDetails from "../api/AllApis";
import Svg, { Path, G } from "react-native-svg";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import LoadingLottie from "./anim/LoadingLottie";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logInWithReadPermissionsAsync, initializeAsync } from "expo-facebook";
import constants from "../assets/constants";
import { IconHeader } from "./Components/customHeader";
import Images from "../assets/Images";
import normalize from "react-native-normalize";
import { EmptyCardImage, EmptyFbCard } from "./Components/EmptyCardImage";
import { Fbmodel } from "./Components/FbModel";
import constantsF from "../constants/Contants";
import { HeaderModel } from "./Components/NewModelView";
import Styles from "../constants/Styles";
import { RFValue } from "react-native-responsive-fontsize";
import Contants from "../constants/Contants";
import { scale } from "react-native-size-matters";
import Header from "./common/Header";

export default function Find_friends({ navigation, route }) {
  const [fbmodelShow, setFbmodelShow] = useState(false);
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({});
  const [show, setShow] = useState(true);
  const [follow, setFollow] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [listBRender, setListBRender] = useState(false);
  const [allUsersList, setAllUsersList] = useState([]);
  const [fbDataList, setFbDataList] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const a = new apiDetails();

  const _handleFacebookLogin = async () => {
    try {
      initializeAsync({
        appId: constantsF.FacebookDetails.FAID,
        appName: constantsF.FacebookDetails.FNAME,
      });
      const data = await logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email", "user_age_range"],
      });
      switch (data.type) {
        case "success": {
          // Get the user's name using Facebook's Graph API
          const response1 = await fetch(
            `https://graph.facebook.com/me/friends?&access_token=${data.token}`
          );
          const friends = await response1.json();
          if (friends.data.length > 0) {
            setFbDataList(friends.data);
          } else {
            alert("No friends found")
            setFbDataList([]);
          }
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
      console.log(e);
      alert("Oops! please try again", "Friend failed!");
    }
  };

  const apiCall = () => {
    setRefreshing(true);
    a.getClient(userDetails.token)
      .post(a.searchusers, {
        user_id: userDetails.id,
        search_keyword: "",
      })
      .then((response) => {
        setRefreshing(false);
        if (response.data.status == "200") {
          setShow(false);
          setData(response.data.data);
        } else {
          setShow(false);
          console.log(response);
          alert("Oops something went wrong");
        }
      });
  };

  const apiCallForFollowing = (item, index) => {
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);

        a.getClient(d.token)
          .post(a.post_add_following, {
            user_id: d.id,
            following_id: item,
          })
          .then((response) => {
            setShow(false);
            if (response.status == "200") {
              updateFollowersSelection(index);
            } else {
              console.log(response);
              alert("Oops something went wrong");
            }
          });
      }
    });
  };

  const updateFollowersSelection = (index) => {
    const arrFollowers = allUsersList;
    const newItem = arrFollowers[index];
    if (newItem.following == 0) {
      newItem.following = 1;
    } else {
      newItem.following = 0;
    }
    newItem.isSelected = !newItem.isSelected;
    arrFollowers[index] = newItem;
    setAllUsersList(arrFollowers);
    setListBRender(!listBRender);
  };

  useEffect(() => {
    AllUserListApi();
  }, []);

  const AllUserListApi = () => {
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        setUserDetails(user);
        var d = JSON.parse(user);
        a.api.get(a.all_user_list + "?id=" + d.id).then((response) => {
          setShow(false);
          if (response.status == "200") {
            setAllUsersList(response.data.data);
          } else {
            alert("Oops something went wrong");
          }
        });
      }
    });
  };

  FirstRoute = () => (
    <View
      style={{
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 30,
      }}
    >
      <View>
        <Text style={styles.heading_following}>Recommended for you</Text>
      </View>
      <FlatList  
        contentContainerStyle={{ paddingBottom: 20 }}
        data={allUsersList}
        extraData={listBRender} 
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => {
          return "" + item.id;
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              // var data = {
              //   receiver_id: item.id,
              //   sender_id: userDetails.id,
              //   profile: item,
              // };
              // navigation.navigate("MessagesScreen", {
              //   // receiver_id: item.id,
              //   data: {
              //     receiver_id: item.id,
              //     sender_id: userDetails.id,
              //     profile: item,
              //   },
              //   listShow: "yes",
              // });

              navigation.navigate("User_Profile", {
                user_id: item.id,
              });
            }}
          >
            <View key={item.id}>

              <View style={[Styles.SameContainerStyle]}>
                <View
                  style={[{
                    //  backgroundColor:"green",
                    flexDirection: "row",
                    height: 70,
                    width: Dimensions.get('window').width,

                  }]}
                >
                  <View style={[{
                    //  backgroundColor:"yellow",
                    width: 55,
                    height: 70,
                    justifyContent: "center"
                  }]}>
                    <Image
                      style={[{
                        ...Platform.select({
                          ios: {
                            width: 50,
                            height: 50,
                            borderRadius: 20
                          },
                          android: {
                            width: 50,
                            height: 50,
                            borderRadius: 60
                          }
                        })

                      }]}
                      resizeMode="contain"
                      source={
                        item.image && item.image !== null
                          ? { uri: apiDetails.publicImage + item.image }
                          : Images.demo_image
                      }
                    // source={Images.girl_img}
                    />
                  </View>
                  <View style={[{
                    justifyContent: "space-between",
                    ...Platform.select({
                      ios: {
                        // backgroundColor:"orange",
                        flexDirection: "row",
                        borderBottomWidth: 0.5,
                        borderColor: "#E4DDE5",
                        width: Dimensions.get("window").width - 115
                      },
                      android: {
                        // backgroundColor:"orange",
                        flexDirection: "row",
                        borderBottomWidth: 0.5,
                        borderColor: "#E4DDE5",
                        width: Dimensions.get("window").width - 115,


                      }
                    })

                  }]}>
                    <View style={[{
                      ...Platform.select({
                        ios: {
                          // backgroundColor:"blue",
                          width: Dimensions.get("window").width - 210,
                          height: 70,
                          justifyContent: "center",
                          paddingLeft: 10
                        },
                        android: {
                          // backgroundColor:"blue",
                          width: Dimensions.get("window").width - 210,
                          height: 70,
                          justifyContent: "center",
                          paddingLeft: 10
                        },
                      })

                    }]}>
                      <Text numberOfLines={1} style={[Styles.MEDIUM_16, { color: "#272D37", lineHeight: 22 }]}>
                        {item.firstname} {item.lastname}
                      </Text>
                      <Text numberOfLines={1}
                        style={[Styles.REGULAR_15, { color: "#686E76", lineHeight: 21, marginTop: 5 }]}
                      >
                        @{item.username}
                      </Text>
                    </View>
                    <View style={[{
                      //  backgroundColor:"grey",
                      width: 100,
                      height: 70,
                      justifyContent: "center",
                      alignItems: "center"
                    }]}>
                      {item.following == 0 ? (
                        <TouchableOpacity
                          style={[{
                            borderColor: "#272D37",
                            backgroundColor: "#272D37",
                            borderRadius: 50,
                            borderWidth: 1,
                            height: 35,
                            width: 80,
                            marginRight: 10,
                            justifyContent: "center",
                            alignItems: "center"
                          }]}
                          onPress={() => {
                            apiCallForFollowing(item.id, index);
                          }}
                        >
                          <Text numberOfLines={1} style={[Styles.REGULAR_15, { color: "#ffffff", lineHeight: 22 }]}>Follow</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={[{
                            borderColor: "#272D37",
                            borderRadius: 50,
                            borderWidth: 1,
                            height: 35,
                            marginRight: 10,
                            width: 80,
                            justifyContent: "center",
                            alignItems: "center"
                          }]}
                          onPress={() => {
                            apiCallForFollowing(item.id, index);
                          }}
                        >
                          <Text numberOfLines={1} style={[Styles.REGULAR_15, { color: "#272D37", lineHeight: 22 }]}>Following</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              </View>

            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  SecondRoute = () => (
    <>
      <View
        style={{
          marginLeft: 30,
          marginRight: 30,
          marginTop: 20,
          marginBottom: 30,
        }}
      >
        <View>
          <Text style={styles.heading_following}>
            Your friends on housetripping
          </Text>
        </View>
        <FlatList
          // refreshControl={
          //     <RefreshControl
          //         refreshing={refreshing}
          //         onRefresh={() => this.getVirtualListData()}
          //     />
          // }

          contentContainerStyle={{ paddingBottom: 20 }}
          data={fbDataList}
          // extraData={listBRender}
          // keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => {
            return "" + item.id;
          }}
          ListEmptyComponent={
            <EmptyFbCard
              onPress={() => {
                _handleFacebookLogin();
              }}
            />
          }
          renderItem={({ item, index }) => (
            <TouchableOpacity
            // onPress={() => {
            //     var data = {
            //         receiver_id: item.id,
            //         sender_id: userDetails.id,
            //         profile: item
            //     }
            //     navigation.navigate("MessagesScreen",
            //         {
            //             "userData": data,
            //             'listShow': 'yes'
            //         });
            // }}
            >

              <View key={item.id}>
                <View style={[Styles.SameContainerStyle]}>
                  <View
                    style={[{
                      //  backgroundColor:"green",
                      flexDirection: "row",
                      height: 70,
                      width: Dimensions.get('window').width,

                    }]}
                  >
                    <View style={[{
                      //  backgroundColor:"yellow",
                      width: 55,
                      height: 70,
                      justifyContent: "center"
                    }]}>
                      <Image
                        style={[{
                          ...Platform.select({
                            ios: {
                              width: 50,
                              height: 50,
                              borderRadius: 20
                            },
                            android: {
                              width: 50,
                              height: 50,
                              borderRadius: 60
                            }
                          })

                        }]}
                        resizeMode="contain"
                        source={item.image && item.image !== null ? { uri: apiDetails.publicImage + item.image } : Images.demo_image}
                      // source={Images.girl_img}
                      />
                    </View>
                    <View style={[{
                      justifyContent: "space-between",
                      ...Platform.select({
                        ios: {
                          // backgroundColor:"orange",
                          flexDirection: "row",
                          borderBottomWidth: 0.5,
                          borderColor: "#E4DDE5",
                          width: Dimensions.get("window").width - 115
                        },
                        android: {
                          // backgroundColor:"orange",
                          flexDirection: "row",
                          borderBottomWidth: 0.5,
                          borderColor: "#E4DDE5",
                          width: Dimensions.get("window").width - 115,


                        }
                      })

                    }]}>
                      <View style={[{
                        ...Platform.select({
                          ios: {
                            // backgroundColor:"blue",
                            width: Dimensions.get("window").width - 210,
                            height: 70,
                            justifyContent: "center",
                            paddingLeft: 10
                          },
                          android: {
                            // backgroundColor:"blue",
                            width: Dimensions.get("window").width - 210,
                            height: 70,
                            justifyContent: "center",
                            paddingLeft: 10
                          },
                        })



                      }]}>
                        <Text numberOfLines={1} style={[Styles.MEDIUM_16, { color: "#272D37", lineHeight: 22 }]}>
                          {item.firstname} {item.lastname}
                        </Text>
                        <Text numberOfLines={1}
                          style={[Styles.REGULAR_15, { color: "#686E76", lineHeight: 21, marginTop: 5 }]}
                        >
                          @{item.username}
                        </Text>
                      </View>
                      <View style={[{
                        //  backgroundColor:"grey",
                        width: 100,
                        height: 70,
                        justifyContent: "center",
                        alignItems: "center"
                      }]}>
                        {show == true ? (
                          <TouchableOpacity
                            style={[{
                              borderColor: "#272D37",
                              backgroundColor: "#272D37",
                              borderRadius: 50,
                              borderWidth: 1,
                              height: 35,
                              width: 80,
                              justifyContent: "center",
                              alignItems: "center"
                            }]}
                            onPress={() => {
                              // updateFollowersSelection(index)
                              // apiCallForFollowing(item.id)
                              console.log("============item.id======", item.id);
                            }}
                          >
                            <Text numberOfLines={1} style={[Styles.REGULAR_15, { color: "#ffffff", lineHeight: 22 }]}>Follow</Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={[{
                              borderColor: "#272D37",
                              borderRadius: 50,
                              borderWidth: 1,
                              height: 35,
                              width: 80,
                              justifyContent: "center",
                              alignItems: "center"
                            }]}
                            onPress={() => {
                              // apiCallForFollowing(item.id)
                            }}
                          >
                            <Text numberOfLines={1} style={[Styles.REGULAR_15, { color: "#272D37", lineHeight: 22 }]}>Following</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </View>

            </TouchableOpacity>
          )}
        />
      </View>
      <Fbmodel
        transparent={true}
        visible={fbmodelShow}
        onRequestClose={() => {
          setFbmodelShow(false);
        }}
        onPress={() => {
          setFbmodelShow(false);
        }}
        source={Images.fb_model_icon}
        // onPressAllow={}
        onPressDeny={() => {
          setFbmodelShow(false);
        }}
      />
    </>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Recommanded" },
    { key: "second", title: "Facebook" },
  ]);


  return (
    <View>
       
       <Header />

      <KeyboardAvoidingView 
        style={[Styles.customScrollview]}
      > 
        <LinearGradient
          colors={["#E683AF", "#7ACACB", "#77A1D3"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={[{
            ...Platform.select({
              ios: {
                height: Dimensions.get('window').height + 5,
                marginTop: RFValue(-30, Contants.DesignCanvas.HEIGHT)
              },
              android: {
                height: Dimensions.get('window').height + 60
              }
            })
          }]}>

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
            RightPress={() => {
              navigation.navigate("SearchUsersByName");
            }}
            HeaderTitle={'Find Friends'}
            leftImage={Images.all_screen_back_black_arrow_icon}
            rightImage={Images.search}
          />

          <View style={styles.lower_view}>
            <LinearGradient
              // colors={['red','red']}
              colors={["#F7EFFA", "#FEFAF9"]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[{
                ...Platform.select({
                  ios: {
                    height: Dimensions.get('window').height - 70
                  },
                  android: {
                    height: Dimensions.get('window').height - 30
                  }
                })

              }]}
            >
              <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={(props) => (
                  <TabBar
                    {...props}
                    renderLabel={({ route, color }) => (
                      <Text style={{ color: "#272D37", fontSize: 16, margin: 8 }}>
                        {route.title}
                      </Text>
                    )}
                    indicatorStyle={{ backgroundColor: "#E683AF", height: 2 }}
                    style={{ backgroundColor: "#FAF4FA" }}
                  />
                )}
              />
            </LinearGradient>
          </View>
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
      ios: {},
      android: {
        marginTop: 30,
      },
      default: {},
    }),
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
  roundedButtonsFilled: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: "#272D37",
    backgroundColor: "#272D37",
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
    lineHeight: 22,
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
    marginBottom: normalize(25),
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    // backgroundColor:'red'
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
    overflow: "hidden",
    flex: 1,
  },
  heading_top: {
    color: "#FFF",
    fontSize: 20,
    marginTop: 20,
    justifyContent: "center",
    textAlign: "center",
    flex: 1,
    marginRight: "15%",
    marginLeft: "10%",
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
