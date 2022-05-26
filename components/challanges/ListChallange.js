import React, { useState, useRef, useEffect } from "react";
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
  RefreshControl,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import CheckBox from "@react-native-community/checkbox";
import { LinearGradient } from "expo-linear-gradient";
import RBSheet from "react-native-raw-bottom-sheet";
import apiDetails from "../../api/AllApis";
import constants from "../../assets/constants";
import normalize from "react-native-normalize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Styles from "../../constants/Styles";
import { HeaderModel, NewIconHeaderModel } from "../Components/NewModelView";
import Contants from "../../constants/Contants";
import { RFValue } from "react-native-responsive-fontsize";
import Images from "../../assets/Images";

function ListChallange({ navigation, route, soloChallange, groupChallange }) {

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [selected, setSelected] = useState(0);
  const [title, setTitle] = useState("");
  const [data, setData] = useState(true);
  const [dataGroup, setDataGroup] = useState(true);
  const [dataTest, setDataTest] = useState(true);
  const [dataGroupTest, setDataGroupTest] = useState(true);
  const [challangeSolo, setChallangeSolo] = useState([]);
  const [challangeGroup, setChallangeGroup] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const refRBSheet = useRef();
  const refTabView = useRef();
  const [userData, setUserData] = useState({
    name: "",
  });

  /**************************************************************** */
  const groupChallangeApi = (filter) => {
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);
        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .get(a.get_group_challenge + "?filter=" + filter)
          .then((response) => {
            if (response.data.status == "200") {
              setChallangeGroup(response.data.chalange.data);
            } else {

              // console.log(response.data);
            }
          });
      }
    });
  };
  /************************************************************************ */

  /************************************************************************ */

  useEffect(() => {
    soloChallangeApi("");
  }, []);

  /**************************************************************** */
  const soloChallangeApi = (filter = "") => {
    setRefresh(true);
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);
        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .get(a.solo_challenge + "?filter=" + filter)
          .then((response) => {
            setRefresh(false);
            if (response.data.status == "200") {
              setChallangeSolo(response.data.chalange.data);
            } else {
              console.log("response-----4664646---------", response);
            }
          });
      }
    });
  };
  /************************************************************************ */
  function multipleImages(item) {
    var e = (
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{
            width: 35,
            height: 35,
            borderRadius: 25,
            borderColor: "#FFFFFF",
            borderWidth: 1.5,
          }}
          source={require("../../assets/images/girl_img.png")}
        />
        <Image
          style={{
            width: 35,
            height: 35,
            marginLeft: -10,
            borderRadius: 25,
            borderColor: "#FFFFFF",
            borderWidth: 1.5,
          }}
          source={require("../../assets/images/girl_img.png")}
        />
        <Image
          style={{
            width: 35,
            height: 35,
            marginLeft: -10,
            borderRadius: 25,
            borderColor: "#FFFFFF",
            borderWidth: 1.5,
          }}
          source={require("../../assets/images/girl_img.png")}
        />
        <Image
          style={{
            width: 35,
            height: 35,
            marginLeft: -10,
            borderRadius: 25,
            borderColor: "#FFFFFF",
            borderWidth: 1.5,
          }}
          source={require("../../assets/images/girl_img.png")}
        />
        <View style={{ marginLeft: -10 }}>
          <Image
            style={{
              width: 35,
              height: 35,
              borderRadius: 25,
              borderColor: "#FFFFFF",
              borderWidth: 1.5,
            }}
            source={require("../../assets/images/girl_img.png")}
          />
          <View
            style={{
              width: 35,
              height: 35,
              position: "absolute",
              backgroundColor: "#000",
              borderRadius: 25,
              borderColor: "#FFFFFF",
              borderWidth: 1.5,
              opacity: 0.5,
            }}
          ></View>
          <View
            style={{
              width: 35,
              height: 35,
              position: "absolute",
              borderRadius: 25,
              borderColor: "#FFFFFF",
              borderWidth: 1.5,
              justifyContent: "center",
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff", fontSize: 11 }}>
              +99
            </Text>
          </View>
        </View>
      </View>
    );
    return e;
  }

  const FirstRoute = () => (
    <View
      style={{
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        flex: 1,
        flexDirection: "column"
      }}
    >
      <View style={{ flexDirection: "row", }}>
        <Text
          style={[Styles.MEDIUM_16, {
            color: "#272D37",
            marginBottom: 10,
            flex: 1,
            lineHeight: 22
          }]}
        >
          Challenges List
        </Text>
        <TouchableOpacity
          onPress={() => {
            refRBSheet.current.open();
            // navigation.navigate("Create_challange");
          }}
        >
          <View style={{ padding: 5, width: 25, height: 25, }}>
            <Image
              style={{ width: 15, height: 15 }}
              source={require("../../assets/images/filter.png")}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => soloChallangeApi("")}
            />
          }
          data={challangeSolo}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ justifyContent: "space-between", width: "100%" }}
              onPress={() => {
                navigation.navigate("Challange_details", { data: item });
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                  backgroundColor: "#fff",
                  padding: 10,
                  borderRadius: 20,
                  paddingTop: 15
                }}
              >
                <View style={{ flex: 0 }}>
                  <Image
                    style={{ width: 60, height: 60, borderRadius: 15 }}
                    source={{ uri: apiDetails.publicImage + item.cover_photo }}
                  />
                  <Image
                    style={{
                      width: 25,
                      height: 25,
                      position: "absolute",
                      right: 0,
                      bottom: 30,
                    }}
                    source={require("../../assets/images/start_challange_list.png")}
                  />
                </View>

                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text numberOfLines={1}
                    style={[Styles.MEDIUM_16, { lineHeight: 22, color: "#272D37", marginBottom: 5 }]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[Styles.REGULAR_14, { lineHeight: 21, color: "#686E76", marginBottom: 10 }]}
                  >
                    Challenge End on {item.created_at_challenge}.
                  </Text>

                  {/* {multipleImages()} */}
                </View>

                <View style={{ flex: 0 }}>
                  <Text
                    style={[Styles.BOLD_16, {
                      lineHeight: 22,
                      color: "#272D37",
                    }]}
                  >
                    ${item.winning_price}
                  </Text>
                </View>
              </View>

              {/* <View style={{ height: 1, marginLeft: 60, backgroundColor: "#E4DDE5", width: "100%", marginBottom: 10, marginEnd: 20, marginRight: 20 }} /> */}
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );

  const SecondRoute = () => (
    <View
      style={{
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        flex: 1,
        flexDirection: "column",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Text
          style={[Styles.MEDIUM_16, {
            color: "#272D37",
            marginBottom: 10,
            flex: 1,
            lineHeight: 22
          }]}
        >
          Challenges List
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

      <View style={{ flex: 1 }}>
        <FlatList
          data={challangeGroup}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => groupChallangeApi("")}
            />
          }
          // extraData={groupChallange}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={{
              alignContent: "center",
              alignSelf: "center",
              alignItems: "center"
            }}>No Group Challenges Found</Text>
          }
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ justifyContent: "space-between", width: "100%" }}
              onPress={() => {
                navigation.navigate("Challange_details", { data: item });
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                  backgroundColor: "#FFF",
                  padding: 10,
                  borderRadius: 20,
                }}
              >
                <View style={{ flex: 0 }}>
                  <Image
                    style={{ width: 60, height: 60, borderRadius: 20 }}
                    source={{ uri: apiDetails.publicImage + item.cover_photo }}
                  />
                  <Image
                    style={{
                      width: 25,
                      height: 25,
                      position: "absolute",
                      right: 0,
                      bottom: 30,
                    }}
                    source={require("../../assets/images/start_challange_list.png")}
                  />
                </View>

                <View style={{ flex: 1, marginLeft: 5 }}>
                  <Text numberOfLines={1}
                    style={[Styles.MEDIUM_16, { lineHeight: 22, color: "#272D37", marginBottom: 10 }]}
                  >
                    {item.title}
                  </Text>
                  <Text numberOfLines={1}
                    style={[Styles.REGULAR_14, { lineHeight: 22, color: "#686E76", marginBottom: 10 }]}
                  >
                    Challenge End on {item.created_at_challenge}.
                  </Text>

                  {/* {multipleImages()} */}
                </View>

                <View style={{ flex: 0 }}>
                  <Text
                    style={[Styles.BOLD_16, {
                      lineHeight: 22,
                      color: "#272D37",
                    }]}
                  >
                    ${item.winning_price}
                  </Text>
                </View>
              </View>

              {/* <View style={{ height: 1, marginLeft: 60, backgroundColor: "#E4DDE5", width: "100%", marginBottom: 10, marginEnd: 20, marginRight: 20 }} /> */}
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );

  /************************************************************************ */

  function getData(da) {
    da = da.replace(" ", "T");
    const d = new Date(da);
    d.setDate(d.getDate() + 7);
    return d.getDate() + " " + monthNames[d.getMonth()] + " " + d.getFullYear();
  }

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Solo Challenge" },
    { key: "second", title: "Group Challenge" },
  ]);

  return (
    <SafeAreaView>
      <StatusBar
        animated={true}
        translucent
        backgroundColor="transparent"
        barStyle={"light-content"}
      />
      <LinearGradient
        colors={["#E683AF", "#7ACACB", "#77A1D3"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={[Styles.BackgroundGradient]}>

        <View>
          <HeaderModel
            leftimgstyle={[{
              width: 20,
              height: 20
            }]}
            rightimgstyle={[{
              width: 20,
              height: 20
            }]}
            onPress={() => {
              navigation.navigate("Create_challange");
            }}
            RightPress={() => {
              navigation.navigate("ChatList", { userData: userData });
            }}
            HeaderTitle={'Challenges'}
            leftImage={Images.add}
            rightImage={Images.message}
          />
        </View>

        <View style={[{
          //  backgroundColor:"red",
          marginTop: 20,
        }]}>
          <Image
            style={[{
              ...Platform.select({
                ios: {
                  width: Dimensions.get('window').width,
                  height: RFValue(200, Contants.DesignCanvas.HEIGHT),
                  marginTop: RFValue(-40, Contants.DesignCanvas.HEIGHT),
                },
                android: {
                  width: Dimensions.get('window').width,
                  height: RFValue(200, Contants.DesignCanvas.HEIGHT),
                  marginTop: RFValue(-40, Contants.DesignCanvas.HEIGHT),
                }
              })

            }]}
            source={Images.list_challenge_banner}
          />
        </View>

        <LinearGradient
          colors={constants.AppColor.FLEX_GRADIENT_BACK_COLOR}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[{
            ...Platform.select({
              ios: {
                flex:1,
                borderRadius: 40,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                paddingBottom: 100,
                alignItems: 'center' 
              },
              android: {
                flex:1,
                borderTopLeftRadius: normalize(50),
                borderTopRightRadius: normalize(50), 
                paddingBottom: 100,
                alignItems: 'center'  
              }
            })
          }]}>
            {/* /*************************section code start************************* */}
            <View style={[{
              ...Platform.select({
                ios: {
                  flexDirection: "row",
                  flex: 1,
                  height: "100%"
                },
                android: {
                  flexDirection: "row",
                  flex: 1,
                  paddingBottom: 20
                }
              })
            }]}>

              <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                style={{
                  flex: 1,
                  height: "100%"
                }}
                initialLayout={{ width: layout.width, height: layout.height }}
                renderTabBar={(props) => (
                  <TabBar
                    {...props}
                    renderLabel={({ route, color }) => (
                      <Text
                        style={[Styles.MEDIUM_16, {
                          color: "#272D37",
                          margin: 5,
                          lineHeight: 22
                        }]}
                      >
                        {route.title}
                      </Text>
                    )}
                    indicatorStyle={{
                      backgroundColor: "#E683AF",
                      height: 2,
                    }}
                    style={{
                      backgroundColor: "#F7EFFA",
                      borderTopLeftRadius: 30,
                      borderTopRightRadius: 30,
                    }}
                  />
                )}
              />

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
                      marginHorizontal: 20,
                      borderRadius: 15,
                    }}
                  >
                    <Text style={styles.second_heading_top}>Sort by</Text>

                    <View
                      style={{
                        marginLeft: 20,
                        marginRight: 20,
                        marginTop: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          if (index == 0) {
                            soloChallangeApi("desc");
                          } else {
                            groupChallangeApi("desc");
                          }
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            textAlign: "center",
                            justifyContent: "center",
                            alignContent: "center",
                            paddingBottom: 10,
                            paddingTop: 10,
                          }}
                        >
                          <Text style={styles.leftSide}>Latest</Text>
                          {/* <Image style={{ width: 10, height: 11, marginLeft: 7, marginRight: 5, marginTop: 4 }} source={require('../../assets/images/grey_next.png')} /> */}
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          if (index == 0) {
                            soloChallangeApi("pop");
                          } else {
                            groupChallangeApi("pop");
                          }
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            textAlign: "center",
                            justifyContent: "center",
                            alignContent: "center",
                            paddingBottom: 10,
                            paddingTop: 10,
                          }}
                        >
                          <Text style={styles.leftSide}>Popular</Text>
                          {/* <Image style={{ width: 10, height: 11, marginLeft: 7, marginRight: 5, marginTop: 4 }} source={require('../../assets/images/grey_next.png')} /> */}
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          if (index == 0) {
                            soloChallangeApi("acc");
                          } else {
                            groupChallangeApi("acc");
                          }
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            textAlign: "center",
                            justifyContent: "center",
                            alignContent: "center",
                            paddingBottom: 10,
                            paddingTop: 10,
                            marginBottom: 5,
                          }}
                        >
                          <Text style={styles.leftSide}>Most Accepted</Text>
                          {/* <Image style={{ width: 10, height: 11, marginLeft: 7, marginRight: 5, marginTop: 4 }} source={require('../../assets/images/grey_next.png')} /> */}
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
                      style={{ borderRadius: 25 }}
                      colors={["#272D37", "#272D37", "#272D37"]}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 0, y: 1 }}
                    >
                      <Text style={[styles.center, { color: "#fff" }]}>
                        Cancel
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </RBSheet>

            </View>
            {/* /*************************section code end************************* */}
        </LinearGradient>
      </LinearGradient>
    </SafeAreaView>
  );


}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#F7EFFA",
    ...Platform.select({
      ios: {
        marginTop: 30,
      },
      android: {},
      default: {},
    }),
  },
  customHeader: {
    ...Platform.select({
      ios: {
        height: "11%",
        marginTop: 10,
      },
      android: {
        height: "11%",
        marginTop: 20,
      },
      default: {
        height: "11%",
      },
    }),
  },
  input: {
    backgroundColor: "#FFF",
    padding: 5,
    marginBottom: 10,
    borderRadius: 15,
    textAlign: "center",
    fontSize: 20,
    height: 50,
    color: "#272D37",
    width: 75,
  },
  cardDesigin: {
    width: "50%",
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#6263F0",
    alignContent: "center",
    textAlign: "center",
    justifyContent: "center",
    padding: 30,
  },
  heading: {
    color: "#272D37",
    fontSize: 28,
    fontWeight: "bold",
    marginRight: "20%",
    // fontFamily: 'sp_bold',
  },
  para: {
    color: "#686E76",
    marginTop: 10,
    fontSize: 15,
    marginRight: "20%",
    // fontFamily: 'sp_regular',
  },
  loginButton: {
    // flex: 1,
    borderRadius: 15,
    flexDirection: "row",
    backgroundColor: "#272D37",
    marginTop: 10,
    marginLeft: 30,
    marginRight: 10,
    alignItems: "center",
    alignSelf: "stretch",
    borderColor: "#6263F0",
  },
  heading_top: {
    color: "#272D37",
    fontSize: 20,
    marginTop: 15,
    marginLeft: -70,
    justifyContent: "center",
    textAlign: "center",
    // flex: 1,
    fontWeight: "bold",
  },
  second_heading_top: {
    ...Styles.BOLD_16,
    lineHeight: 22,
    color: "#272D37",
    marginTop: 10,
    textAlign: "center",
  },
  leftSide: {
    ...Styles.MEDIUM_15,
    lineHeight: 22,
    color: "#272D37",
    // flex: 1,
  },
  rightSide: {
    color: "#686E76",
  },
  cardDesignRight: {
    width: "50%",
    borderRadius: 20,
    marginLeft: 10,
    backgroundColor: "#6263F0",
    alignContent: "center",
    textAlign: "center",
    justifyContent: "center",
    padding: 30,
  },
  lineBreak: {
    marginTop: 10,
    marginBottom: 10,
    height: 1,
    backgroundColor: "#272D37",
  },
  signup: {
    borderRadius: 10,
    // marginLeft: 30,
    marginTop: 5,
    // marginRight: 30,
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginHorizontal: 20
  },
  center: {
    ...Styles.MEDIUM_15,
    lineHeight: 22,
    alignSelf: "center",
    margin: 15,
    justifyContent: "center",
  },
});

export default ListChallange;
