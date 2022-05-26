import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  FlatList,
  Button,
  Platform,
  Dimensions,
} from "react-native";
import apiDetails from "../../api/AllApis";
import RBSheet from "react-native-raw-bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import constants from "../../assets/constants";
import { ChallangeModel } from "../Components/ModeLView";
import Images from "../../assets/Images";
import { RFValue } from "react-native-responsive-fontsize";
import Contants from "../../constants/Contants";
import Styles from "../../constants/Styles";

function Select_song({ navigation, route }) {
  var checked = "../../assets/images/checked_list.png";
  var unchecked = "../../assets/images/unchecked.png";

  const [selected, setSelected] = useState(0);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [userData, setUserData] = useState({});
  const [show, setShow] = useState(false);
  const refRBSheet = useRef();
  var price = "0";
  var type = "30";

  const a = new apiDetails();

  if (!userData.hasOwnProperty("id")) {
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);
        setUserData(d);
      }
    });
  }

  //api call
  const apiCall = () => {
    // const a = new apiDetails(userData.token);

    a.getClient(userData.token)
      .get(a.get_songs)
      .then((response) => {
        // console.log(response);
        if (response.data.status == "200") {
          setData(response.data.Songs.data);
        } else {
          console.log(response);
          // alert('Oops something went wrong');
        }
      });
  };

  const openModal = () => {
    console.log("filter...");
    setShow(true);
  };
  const closeModal = () => {
    navigation.navigate("StartSinging");
    // navigation.navigate ("Search", { screen: 'ListChallange' })
    console.log("filter...");
    setShow(false);
  };

  //api call for create challange
  const apiCallCreateChallange = () => {
    if (price == "0" || price == "") {
      alert("please enter valid amount");
      return;
    }
    if (type == "0" || type == "") {
      alert("please chose valid duration");
      return;
    }
    if (selected == "0" || selected == "") {
      alert("please select valid song");
      return;
    }
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);
        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .post(a.create_challenge, {
            created_by: userData.id,
            duration: type,
            winning_price: price,
            song_id: selected,
            chalange_type: "solo",
          })
          .then((response) => {
            if (response.status == "200") {
              refRBSheet.current.close();
              // setShow(true);
              alert("Challaneg Created..!!!")
              navigation.replace("HomeFeed")
            } else {
              console.log("--------------->else");
              console.log(response);
              // alert('Oops something went wrong');
            }
          });
      }
    });
  };

  if (data.length <= 0) {
    apiCall();
  }

  if (route.params?.type) {
    type = route.params?.type;
  } else {
    alert("Oops, please login again");
  }

  if (route.params?.price) {
    price = route.params?.price;
  } else {
    alert("Oops, please login again");
  }

  function showCheck(item) {
    if (selected == 0) {
      return (
        <Image
          style={{ alignSelf: "center", width: 20, height: 20 }}
          source={require(unchecked)}
        />
      );
    } else {
      if (item.id == selected) {
        return (
          <Image
            style={{ alignSelf: "center", width: 20, height: 20 }}
            source={require(checked)}
          />
        );
      } else {
        return (
          <Image
            style={{ alignSelf: "center", width: 20, height: 20 }}
            source={require(unchecked)}
          />
        );
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        translucent
        backgroundColor="transparent"
        barStyle={"dark-content"}
      />
 
      <View style={[{
        borderBottomWidth: 1.5,
        borderColor: "#77A1D3",
        ...Platform.select({
          ios: {
            marginTop: RFValue(15, Contants.DesignCanvas.HEIGHT),
            height: RFValue(40, Contants.DesignCanvas.HEIGHT),
            width: Dimensions.get('window').width,
            alignItems: "center",


          },
          android: {
            marginTop: RFValue(45, Contants.DesignCanvas.HEIGHT),
            width: Dimensions.get('window').width,
            height: RFValue(40, Contants.DesignCanvas.HEIGHT),
            alignItems: "center",
          }
        })
      }]}>
        <View style={[{
          ...Platform.select({
            ios: {
              height: RFValue(40, Contants.DesignCanvas.HEIGHT),
              width: "100%",
              flex: 1,
              flexDirection: "row",
            },
            android: {
              width: "100%",
              height: RFValue(40, Contants.DesignCanvas.HEIGHT),
              flexDirection: "row",
              flex: 1,
            }
          })
        }]}>
          <TouchableOpacity
            style={{
              alignSelf: "flex-start",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              style={{
                width: 20,
                height: 20,
                marginLeft: 20,
                marginRight: 20,
                tintColor: "#000",
              }}
              resizeMode='contain'
              source={Images.all_screen_back_black_arrow_icon}
            />
          </TouchableOpacity>
          <Text style={[Styles.BOLD_20, {
            color: "#000",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            alignSelf: "center",
            flex: 1
          }]}>Create Challenge</Text>

        </View>
      </View>
      <View
        style={{
          width: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
          }}
        >
          <LinearGradient
            colors={["#E683AF", "#7ACACB", "#77A1D3"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={{
              height: 1.5,
              // marginStart: -10,
              marginTop: -2,
              width: 320,
            }}
          ></LinearGradient>
        </View>
      </View>


      <View
        style={{
          flex: 1,
          flexDirection: "column",
          marginLeft: 20,
          marginRight: 20,
          marginTop: 20,
        }}
      >
        <Text style={[Styles.REGULAR_16, { color: "#272D37", lineHeight: 22, marginBottom: 20 }]}>
          Select Song
        </Text>

        <FlatList
          data={data}
          extraData={data}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ justifyContent: "space-between", width: "100%" }}
              onPress={() => {
                setTitle(item.title);
                setSelected(item.id);
              }}
            >
              <View style={{ flexDirection: "row", height: 70 }}>
                <TouchableOpacity>
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      position: "absolute",
                      alignContent: "center",
                      margin: 20,
                      zIndex: 5,
                    }}
                    source={require("../../assets/images/play_icon.png")}
                  />
                  <Image
                    style={{
                      width: 60,
                      height: 60,
                      marginRight: 15,
                      borderRadius: 30,
                    }}
                    source={{ uri: item.cover_photo }}
                  />
                </TouchableOpacity>

                <View style={{ flex: 1, alignSelf: "center" }}>
                  <Text style={[Styles.MEDIUM_16, { lineHeight: 22, color: "#272D37" }]}>
                    {item.title}
                  </Text>
                  <Text style={[Styles.REGULAR_14, { lineHeight: 22, color: "#686E76", }]}>
                    {item.artist}
                  </Text>
                  <Text style={[Styles.REGULAR_14, { lineHeight: 22, color: "#272D37", }]}>@starwilliam</Text>
                </View>

                {showCheck(item)}
              </View>

              <View
                style={{
                  height: 1,
                  marginLeft: 60,
                  backgroundColor: "#E4DDE5",
                  width: "100%",
                  marginBottom: 10,
                  marginEnd: 20,
                  marginRight: 20,
                }}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <View
          style={{
            flexDirection: "row",
            marginRight: 10,
            marginBottom: 20,
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{ alignSelf: "flex-end" }}
            onPress={() => {
              refRBSheet.current.open();
            }}
          >
            <Image
              style={{ width: 50, height: 50, marginTop: 10 }}
              source={Images.next_page_imgae}
            />
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
              height: 350,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              backgroundColor: "#F7EFFA",
            },
            draggableIcon: {
              backgroundColor: "#B3B6BA",
              width: 50,
              height: 3,
            },
          }}
        >
          <View style={{ flex: 1, flexDirection: "column" }}>
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.close();
              }}
            >
              <Image
                style={{ width: 20, height: 20, margin: 20, marginLeft: 20 }}
                resizeMode="contain"
                source={Images.all_screen_back_black_arrow_icon}
              />
            </TouchableOpacity>
            <Text style={styles.second_heading_top}>
              Are you sure to confirm to create {"\n"}solo challange ?
            </Text>

            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  textAlign: "center",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Text style={styles.leftSide}>Challange Duration</Text>
                <Text style={styles.rightSide}>
                  {type == "30" ? "Month" : "Week"}
                </Text>
                <Image
                  style={{
                    width: 10,
                    height: 10,
                    marginLeft: 7,
                    marginRight: 5,
                    marginTop: 6,
                  }}
                  resizeMode='contain'
                  source={require("../../assets/images/grey_next.png")}
                />
              </View>
              <View style={styles.lineBreak}></View>
              <View
                style={{
                  flexDirection: "row",
                  textAlign: "center",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Text style={styles.leftSide}>Winning Prize</Text>
                <Text style={styles.rightSide}>{price}$</Text>
                <Image
                  style={{
                    width: 10,
                    height: 10,
                    marginLeft: 7,
                    marginRight: 5,
                    marginTop: 6,
                  }}
                  resizeMode='contain'
                  source={require("../../assets/images/grey_next.png")}
                />
              </View>
              <View style={styles.lineBreak}></View>
              <View
                style={{
                  flexDirection: "row",
                  textAlign: "center",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Text style={styles.leftSide}>Song</Text>
                <Text style={styles.rightSide}>{title}</Text>
                <Image
                  style={{
                    width: 10,
                    height: 10,
                    marginLeft: 7,
                    marginRight: 5,
                    marginTop: 6,
                  }}
                  resizeMode='contain'
                  source={require("../../assets/images/grey_next.png")}
                />
              </View>
            </View>
            <TouchableOpacity
              style={[{
                backgroundColor: "green",
                width: Dimensions.get("window").width - 45,
                marginHorizontal: 20,
                marginTop: 10,
                height: 50,
                borderRadius: 16
              }]}
              onPress={() => {
                apiCallCreateChallange();
              }}
            // onPress={() => { setShow(true) }}
            >
              <LinearGradient
                style={[{
                  width: Dimensions.get("window").width - 45,
                  height: 50,
                  borderRadius: 16,
                  justifyContent: 'center',
                  alignItems: 'center'
                }]}
                colors={constants.AppColor.LINEAR_GRADIENT_COLOR_BUTTON}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
              >
                <Text style={[Styles.MEDIUM_15, { lineHeight: 21, color: '#FFFFFF' }]}>
                  Create Challange
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>
      <ChallangeModel
        transparent={true}
        visible={show}
        onRequestClose={() => {
          setShow(false);
        }}
        source={Images.Right_green_image}
        ChallangeTopText="Your Solo Challange"
        ChallangeTwoText="Created Successfully"
        challangebuttonText="Go to Challange"
        onPress={() => closeModal()}
      // ModalBottomView={[{ flexDirection: 'row' }]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#F7EFFA",
  },
  customHeader: {
    ...Platform.select({
      ios: {
        height: "11%",
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
    flex: 1,
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
    flex: 1,
    fontWeight: "bold",
  },
  second_heading_top: {
    ...Styles.BOLD_22,
    lineHeight: 27,
    color: "#272D37",
    marginLeft: 20,
    marginBottom: 8,
  },
  leftSide: {
    ...Styles.MEDIUM_15,
    lineHeight: 21,
    color: "#272D37",
    flex: 1,
  },
  rightSide: {
    ...Styles.REGULAR_14,
    lineHeight: 21,
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
    backgroundColor: "#B3B6BA",
  },
  signup: {
    backgroundColor: "#F7EFFA",
    borderRadius: 10,
    marginLeft: 30,
    marginTop: 20,
    marginRight: 30,
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  center: {
    ...Styles.MEDIUM_15,
    lineHeight: 21,
    alignSelf: "center",
    margin: 15,
    justifyContent: "center",
  },
});

export default Select_song;
