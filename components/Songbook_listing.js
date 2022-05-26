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
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import apiDetails from "../api/AllApis";
import normalize from "react-native-normalize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingLottie from "./anim/LoadingLottie";
import { useNavigation } from "@react-navigation/native";
import Styles from "../constants/Styles";
import constants from "../assets/constants";
import { HeaderModel, NewIconHeaderModel } from "./Components/NewModelView";
import Images from "../assets/Images";
import { RFValue } from "react-native-responsive-fontsize";
import Contants from "../constants/Contants";
import Header from "./common/Header";
export default function Songbook_listing({ }) {
  var selectedId = "";
  const navigation = useNavigation();
  const [songCategorys, setSongCategorys] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [getSongs, setSongs] = useState([]);
  const [selectedItem, setSelectedId] = useState(0);
  const [userData, setUserData] = useState({
    name: "",
  });
  const [show, setShow] = useState(true);

  useEffect(() => {
    getCategorySongApi();
  }, []);

  function updateCategory() {
    getCategorySongApi();
  }

  const getSongsApi = (cat) => {
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);
        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .get(a.get_songs + "?cat=" + cat)
          .then((response) => {
            setShow(false);
            if (response.data.status == "200") {
              setSongs(response.data.Songs.data);
            } else {
              setSongs([])
            }
          });
      }
    }).catch(error => console.log(error.message));
  };

  const getCategorySongApi = () => {
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);

        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .get(a.songcategory)
          .then((response) => {
            if (response.data.status == "200") {
              AsyncStorage.getItem("filterChecked").then((filterChecked) => {
                var d = JSON.parse(filterChecked);
                var selected_arr = new Array();
                var select_id = "";
                if (d != null) {
                  var tmp_s = new Array();
                  selected_arr = d;
                  for (let i = 0; i < response.data.data.length; i++) {
                    var newItem = response.data.data[i];
                    if (selected_arr.indexOf(newItem.id) !== -1) {
                      tmp_s.push(newItem)
                      select_id += newItem.id + ",";
                    }

                    response.data.data[i] = newItem;
                  }
                  setSelectedCategory(tmp_s);
                } else {
                  setSelectedCategory(response.data.data);
                }
                if (select_id != "") {
                  select_id = select_id.replace(/,\s*$/, "");
                }
                getSongsApi(select_id);

              });
            } else {
              alert("Oops Something went wrong");
            }
          }).catch(error => console.log(error.message));
      }
    });
  };

  const handleSelection = (id) => {
    setShow(true);
    selectedId = selectedItem;
    if (selectedId === id) setSelectedId({ selectedItem: null });
    else setSelectedId({ selectedItem: id });

    getSongsApi(id);
  };

  return (
    <View style={{
      flex: 1,
    }}>

      <Header />
 
      <LinearGradient
        colors={["#E683AF", "#7ACACB", "#77A1D3"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={[Styles.BackgroundGradient, {paddingBottom:30}]}>

        <HeaderModel
          leftimgstyle={[{
            width: 18,
            height: 18
          }]}
          rightimgstyle={[{
            width: 18,
            height: 28
          }]}
          leftImage={Images.search}
          HeaderTitle={'Song book'}
          rightImage={Images.message}
          onPress={() => {
            navigation.navigate("SearchForSongs");
          }}
          RightPress={() => {
            navigation.navigate("ChatList", { userData: userData });
          }}
        />

        <LinearGradient
          colors={constants.AppColor.FLEX_GRADIENT_BACK_COLOR}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[{
            ...Platform.select({
              ios: {
                marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT),
                borderRadius: 40,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                marginTop: 16,
                paddingBottom: 80,
                alignItems: 'center'
              },
              android: {
                marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT),
                borderTopLeftRadius: normalize(50),
                borderTopRightRadius: normalize(50),
                paddingTop: 0,
                paddingBottom: 100,
                alignItems: 'center'

              }
            })
          }]}>
          {/* <ScrollView showsVerticalScrollIndicator={false} style={[Styles.customScrollview]}> */}
          {/* /*************************section code start************************* */}
          <View style={[Styles.SameContainerStyle, {}]}>

            <View style={{ flexDirection: "row", alignItems: 'center' }}>

              <View  >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Song_book_filter", {
                      callHome: updateCategory.bind(),
                    })
                  }
                  }
                >
                  <Image
                    style={{
                      width: 15,
                      height: 15,
                      marginTop: 18, marginLeft: 10,
                      tintColor: "#3C404A",
                    }}
                    resizeMode={'cover'}
                    source={require("../assets/images/menu.png")}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ marginRight: 10, marginTop: 16 }}>
                <FlatList
                  data={selectedCategory}
                  extraData={selectedId}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => {
                    return (
                      <View style={{ alignSelf: "center" }}>
                        <TouchableOpacity
                          onPress={() => handleSelection(item.id)}
                          style={item.id === selectedItem ? "red" : null}
                        >
                          <Text
                            style={[Styles.MEDIUM_16, {
                              marginHorizontal: 10,
                              alignSelf: "center",
                              lineHeight: 22,
                              color: "#272D37"
                            }]}
                          >
                            {item.category_name}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              </View>
            </View>

            <View
              style={{
                width: "100%",
                borderBottomColor: "gray",
                borderBottomWidth: 0.3,
                color: "gray",
                height: 1,
                padding: 10,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: "100%",
                  borderBottomColor: "gray",
                  borderBottomWidth: 0.5,
                  color: "gray",
                  height: 2,
                  padding: 5,
                  marginBottom: -20,
                  flexDirection: "row",
                }}
              >
                {/* <LinearGradient
                      colors={["#E683AF", "#7ACACB", "#77A1D3"]}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 0, y: 0 }}
                      style={{
                        height: 2,
                        marginStart: -10,
                        marginTop: 5,
                        width: "24%",
                      }}
                    ></LinearGradient> */}
              </View>
            </View>

            <FlatList
              contentContainerStyle={{ paddingBottom: 40 }}
              data={getSongs}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <Text style={{
                  alignContent: "center",
                  alignSelf: "center",
                  alignItems: "center",
                  marginTop: 30
                }}>No Songs Found</Text>
              }
              renderItem={({ item }) => (

                //  {/* /*************************section code start************************* */}
                <View style={[Styles.SameContainerStyle, {
                  flexDirection: 'row', paddingTop: 10
                }]}>
                  <View style={[{
                    width: 60,
                    height: 70,
                    justifyContent: "center"
                  }]}>
                    <ImageBackground
                      //  source={Images.girl_img}
                      source={{
                        uri: apiDetails.publicImage + item.cover_photo,
                      }}
                      style={[{
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }]}
                      imageStyle={[{ borderRadius: 50 }]}
                    >
                      {/* <Image
                            style={[{
                              width: 25,
                              height: 25,
                            }]}
                            resizeMode="contain"
                            source={Images.play_icon}

                          /> */}
                    </ImageBackground>

                  </View>
                  <View style={[{
                    ...Platform.select({
                      ios: {
                        width: 340,
                        height: 80,
                        flexDirection: 'row',
                        justifyContent: "space-between",
                        borderBottomWidth: 0.2,
                        borderColor: "#272D37",
                        paddingRight: 10
                        // backgroundColor:"green"
                      },
                      android: {
                        width: 300,
                        height: 70,
                        flexDirection: 'row',
                        justifyContent: "space-between",
                        borderBottomWidth: 0.5,
                        borderColor: "#272D37",
                        paddingRight: 10
                      }
                    })

                  }]}>
                    <View style={[{
                      flex: 1,
                      justifyContent: 'center',
                      //  backgroundColor:'green',
                    }]}>
                      <Text numberOfLines={1} style={[Styles.MEDIUM_16, { color: "#272D37", marginTop: 5 }]}>
                        {item.title}
                        {/* Care Ni Karda */}
                      </Text>
                      <Text style={[Styles.REGULAR_14, { color: "#686E76", marginTop: 5 }]}>
                        {item.lyrics}
                        {/* Care Ni Karda */}
                      </Text>
                      <Text style={[Styles.REGULAR_14, { color: "#686E76", marginTop: 5 }]}>
                        {item.artist}
                        {/* Care Ni Karda */}
                      </Text>
                    </View>
                    <View style={[{
                      justifyContent: "center",
                      alignItems: 'center'
                    }]}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          navigation.navigate("StartSinging", {
                            id: item.id,
                            type: "song",
                          });
                        }}
                        style={[{
                          backgroundColor: '#272D37',
                          width: 85,
                          height: 30,
                          justifyContent: "center",
                          alignItems: 'center',
                          borderRadius: 16,
                          ...Platform.select({
                            ios: { marginRight: 10 },
                            android: {
                            },
                            default: {},
                          })
                        }]}
                      >
                        <Text style={[Styles.REGULAR_16, { color: "#fff", lineHeight: 22, }]}>
                          Sing
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

              )}
            />
          </View>
          {/* /*************************section code end************************* */}

          {/* /*************************section code end************************* */}
          {/* </ScrollView> */}
        </LinearGradient>

      </LinearGradient>
 
      {/* {show &&
        <View style={{
          flex: 1,
          backgroundColor: "#ffffffB3",
          zIndex: 105,
          position: "absolute",
          width: "100%",
          height: "100%",
          justifyContent: "center"
        }}>
          <LoadingLottie />
        </View>
      } */}
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
    width: 80,
    backgroundColor: "#272D37",
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
    fontSize: 16,
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
  },
  heading_top: {
    color: "#FFF",
    fontSize: 20,
    marginTop: "10.0%",
    justifyContent: "center",
    textAlign: "center",
    flex: 1,
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
