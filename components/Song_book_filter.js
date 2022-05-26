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
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import apiDetails from "../api/AllApis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Images from "../assets/Images";
import normalize from "react-native-normalize";
import { RFValue } from 'react-native-responsive-fontsize';
import Constant from '../constants/Contants';
import Styles from '../constants/Styles';
export default function Song_book_filter({ navigation, route, user_id }) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [songCategory, setSongCategory] = useState([]);
  const [songAllCategory, setAllSongCategory] = useState([]);
  const [newSelectedItem, setNewSelectedItem] = useState([]);
  const [status, setStatus] = useState(false);
  const [listBRender, setListBRender] = useState(false);
  const [itemListSelected, setListItemSelected] = useState("");
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    getCategorySongApi();
  }, []);

  const selectedCheckListItem = (selectedItem) => {
    setAllSongCategory({ selectedItem });
  };

  const renderCheckListItem = (songCategory) => {
    return (
      <>
        {songCategory.item.isSelected == true ? (
          <View>
            <View style={styles.background_style}>
              <View
                style={{
                  width: 28,
                  height: 28,
                  justifyContent: "center",
                  backgroundColor: "#77A1D3",
                }}
              >
                <Image
                  style={{
                    width: 28,
                    height: 28,
                    alignSelf: "center",
                    tintColor: "#000000",
                  }}
                  source={Images.bg_image_check_white}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  selectedCheckListItem();
                }}
              >
                <View
                  style={{
                    width: 15,
                    height: 15,
                    justifyContent: "center",
                    borderColor: "#77A1D3",
                    borderWidth: 1,
                    backgroundColor: "#fff",
                  }}
                ></View>
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: "#272D37",
                    fontSize: 14,
                    marginLeft: normalize(20),
                  }}
                >
                  {data.item.category_name}
                  {newSelectedItem.item.category_name}
                </Text>
              </View>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  alignSelf: "center",
                  tintColor: "black",
                }}
                source={require("../assets/images/right.png")}
              />
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: "#E4DDE5",
                width: "100%",
                marginBottom: 10,
              }}
            >
              <Text>{songCategory.item.category_name}</Text>
            </View>
            <Image
              style={{
                width: 20,
                height: 20,
                alignSelf: "center",
                tintColor: "black",
              }}
              source={require("../assets/images/right.png")}
            />
            <View
              style={{
                height: 1,
                backgroundColor: "#E4DDE5",
                width: "100%",
                marginBottom: 10,
              }}
            ></View>
          </View>
        ) : null}
      </>
    );
  };

  const updateSelection = async (index, type = "new") => {
    var arrchecks = songCategory;
    if (type == "select") {
      arrchecks = newSelectedItem;
    }
    var newItem = arrchecks[index];
    newItem.isSelected = !newItem.isSelected;
    arrchecks[index] = newItem;
    if (type == "select") {
      setNewSelectedItem(arrchecks);
    } else {
      setSongCategory(arrchecks);
    }

    setListBRender(!listBRender);

    AsyncStorage.getItem("filterChecked").then((filterChecked) => {
      var d = JSON.parse(filterChecked);
      if (d != null) {
        var index = d.indexOf(newItem.id);
        if (index !== -1) {
          d.splice(index, 1);
        } else {
          d.push(newItem.id);
        }
      } else {
        d = new Array();
        d.push(newItem.id);
      }
      const d_t = JSON.stringify(d);
      AsyncStorage.setItem("filterChecked", d_t);
    });
  };

  const getCategorySongApi = () => {
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);

        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .get(a.songcategory)
          .then(async (response) => {
            if (response.data.status == "200") {
              AsyncStorage.getItem("filterChecked").then((filterChecked) => {
                var d = JSON.parse(filterChecked);
                var selected_arr = new Array();
                if (d != null) {
                  selected_arr = d;
                }
                for (let i = 0; i < response.data.data.length; i++) {
                  var newItem = response.data.data[i];
                  if (selected_arr.indexOf(newItem.id) !== -1) {
                    newItem.isSelected = true;
                    var n = newSelectedItem;
                    n.push(newItem);
                    setNewSelectedItem(n);
                  } else {
                    newItem.isSelected = false;
                  }

                  response.data.data[i] = newItem;
                }
                setSongCategory(response.data.data);
              });
            } else {
              console.log("Oops Something went wrong");
              // alert(response.data.msg);
            }
          });
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
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
        style={styles.linerGradient_background}
      >
        {/************** HEADER *********** */}
        <View style={[{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: Platform.OS === 'ios' ? 10 : 20,
          width: Dimensions.get('window').width,
          height: Platform.OS == 'ios' ? 100 : 80,
        }]}>
          <View style={{ height: RFValue(20, 812), width: Dimensions.get('window').width * 0.9453 }}>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => {
                navigation.goBack("Songbook_listing", {
                  songCategory: songCategory,
                });
                route.params.callHome();
              }}>

                <Image source={Images.all_screen_back_black_arrow_icon} style={{ width: RFValue(28, Constant.DesignCanvas.HEIGHT), height: RFValue(28, 812), tintColor: '#fff' }} resizeMode="cover"
                />
              </TouchableOpacity>
              <Text style={styles.filterText}>Filters</Text>

              <TouchableOpacity onPress={() => {
                navigation.goBack("Songbook_listing", {
                  songCategory: songCategory,
                });
                route.params.callHome();
              }}>

                <Image
                  style={{
                    width: 20,
                    height: 20,
                    marginLeft: 20,
                    tintColor: "#FFF",
                  }}
                  source={require("../assets/images/right.png")}
                />
              </TouchableOpacity>

            </View>

          </View>

        </View>

        <LinearGradient
          colors={["#E683AF", "#7ACACB", "#77A1D3"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={{ marginTop: -20, height: "120%" }}
        >
          <StatusBar
            animated={true}
            translucent
            backgroundColor="transparent"
            barStyle={"light-content"}
          />


          <View style={styles.lower_view}>
            <LinearGradient
              colors={["#F7EFFA", "#FEFAF9"]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{ height: "77%", paddingBottom: "14%" }}
            >
              {newSelectedItem && newSelectedItem.length > 0 && (
                <FlatList
                  data={newSelectedItem}
                  // data={newSelectedItem}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          updateSelection(index, "select");
                        }}
                      >
                        <View>
                          <View style={styles.background_style}>
                            {item.isSelected && (
                              <View
                                style={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: 2,
                                  justifyContent: "center",
                                  backgroundColor: "#77A1D3",
                                }}
                              >
                                <Image
                                  style={{
                                    width: 12,
                                    height: 12,
                                    alignSelf: "center",
                                    tintColor: "#fff",
                                  }}
                                  source={Images.bg_image_check_white}
                                  resizeMode={'center'}
                                />
                              </View>
                            )}

                            {!item.isSelected && (
                              <View
                                style={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: 2,
                                  justifyContent: "center",
                                  borderColor: "#77A1D3",
                                  borderWidth: 1,
                                  backgroundColor: "#fff",
                                }}
                              ></View>
                            )}

                            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                              <Text
                                style={{
                                  color: "#272D37",
                                  ...Styles.REGULAR_16,
                                  marginLeft: 20,
                                }}
                              >
                                {item.category_name}
                              </Text>
                              <Image source={Images.menu_icon} style={{ width: 14, height: 14 }} resizeMode={'cover'} />

                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <View
                        style={{
                          height: 1,
                          backgroundColor: "#E4DDE5",
                          width: "100%",
                          marginBottom: 10,
                        }}
                      />
                    </>
                  )}
                  keyExtractor={(item, index) => `item-${item.id}`}
                />
              )}

              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 10,
                  paddingBottom: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: "#fff",
                }}
              >
                <Text style={{ marginLeft: 20, ...Styles.MEDIUM_16 }}>All Categories</Text>
                <Image
                  style={{
                    width: 15,
                    height: 15,
                    marginRight: 25,
                  }}
                  source={Images.menu_icon}
                />
              </View>

              <FlatList
                data={songCategory}
                showsVerticalScrollIndicator={false}
                extraData={listBRender}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        updateSelection(index);
                      }}
                    >
                      <View>
                        <View style={styles.background_style}>
                          {item.isSelected && (
                            <View
                              style={{
                                width: 20,
                                height: 20,
                                justifyContent: "center",
                                backgroundColor: "#77A1D3",
                              }}
                            >
                              <Image
                                style={{
                                  width: 12,
                                  height: 12,
                                  alignSelf: "center",
                                  tintColor: "#fff",
                                }}
                                source={Images.bg_image_check_white}
                                resizeMode={'center'}
                              />
                            </View>
                          )}



                          {!item.isSelected && (
                            <View
                              style={{
                                width: 20,
                                height: 20,
                                borderRadius: 2,
                                justifyContent: "center",
                                borderColor: "#77A1D3",
                                borderWidth: 1,
                                backgroundColor: "#fff",
                              }}
                            ></View>
                          )}

                          <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text
                              style={{
                                color: "#272D37",
                                ...Styles.REGULAR_16,
                                marginLeft: normalize(20),
                              }}
                            >
                              {item.category_name}
                            </Text>
                            <Image source={Images.menu_icon} style={{ width: 14, height: 14 }} resizeMode={'cover'} />
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: "#E4DDE5",
                        width: "100%",
                        marginBottom: 10,
                      }}
                    />
                  </>
                )}
              />
            </LinearGradient>
          </View>
        </LinearGradient>

        <View style={[{
          width: Dimensions.get('window').width
        }]}>
          <View>
            <View style={styles.lower_view}>
              <LinearGradient
                colors={["#F7EFFA", "#FEFAF9"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ height: "77%", paddingBottom: "14%" }}
              >
                {newSelectedItem && newSelectedItem.length > 0 && (
                  <FlatList
                    data={newSelectedItem}
                    // data={newSelectedItem}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                      <>
                        <TouchableOpacity
                          onPress={() => {
                            updateSelection(index, "select");
                          }}
                        >
                          <View>
                            <View style={styles.background_style}>
                              {item.isSelected && (
                                <View
                                  style={{
                                    width: 15,
                                    height: 15,
                                    justifyContent: "center",
                                    backgroundColor: "#77A1D3",
                                  }}
                                >
                                  <Image
                                    style={{
                                      width: 10,
                                      height: 10,
                                      alignSelf: "center",
                                      tintColor: "#fff",
                                    }}
                                    source={Images.bg_image_check_white}
                                  />
                                </View>
                              )}

                              {!item.isSelected && (
                                <View
                                  style={{
                                    width: 15,
                                    height: 15,
                                    justifyContent: "center",
                                    borderColor: "#77A1D3",
                                    borderWidth: 1,
                                    backgroundColor: "#fff",
                                  }}
                                ></View>
                              )}

                              <View style={{ flex: 1 }}>
                                <Text
                                  style={{
                                    color: "#272D37",
                                    fontSize: 14,
                                    marginLeft: normalize(20),
                                  }}
                                >
                                  {item.category_name}
                                </Text>
                                <Image
                                  style={{
                                    width: 15,
                                    height: 15,
                                    marginRight: 25,
                                  }}
                                  source={Images.menu_icon}
                                />
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                        <View
                          style={{
                            height: 1,
                            backgroundColor: "#E4DDE5",
                            width: "100%",
                            marginBottom: 10,
                          }}
                        />
                      </>
                    )}
                    keyExtractor={(item, index) => `item-${item.id}`}
                  />
                )}

                <View
                  style={{
                    flexDirection: "row",
                    paddingTop: 10,
                    paddingBottom: 10,
                    backgroundColor: "#e5e5e5",
                  }}
                >
                  <Text style={{ flex: 1, marginLeft: 20 }}>All Categories</Text>
                  <Image
                    style={{
                      width: 15,
                      height: 15,
                      marginRight: 20,
                    }}
                    source={Images.menu_icon}
                  />
                </View>

                <FlatList
                  data={songCategory}
                  showsVerticalScrollIndicator={false}
                  extraData={listBRender}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item, index }) => (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          updateSelection(index);
                        }}
                      >
                        <View>
                          <View style={styles.background_style}>
                            {item.isSelected && (
                              <View
                                style={{
                                  width: 15,
                                  height: 15,
                                  justifyContent: "center",
                                  backgroundColor: "#77A1D3",
                                }}
                              >
                                <Image
                                  style={{
                                    width: 10,
                                    height: 10,
                                    alignSelf: "center",
                                    tintColor: "#fff",
                                  }}
                                  source={Images.bg_image_check_white}
                                />
                              </View>
                            )}

                            {!item.isSelected && (
                              <View
                                style={{
                                  width: 15,
                                  height: 15,
                                  justifyContent: "center",
                                  borderColor: "#77A1D3",
                                  borderWidth: 1,
                                  backgroundColor: "#fff",
                                }}
                              ></View>
                            )}

                            <View style={{ flex: 1 }}>
                              <Text
                                style={{
                                  color: "#272D37",
                                  fontSize: 14,
                                  marginLeft: normalize(20),
                                }}
                              >
                                {item.category_name}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <View
                        style={{
                          height: 1,
                          backgroundColor: "#E4DDE5",
                          width: "100%",
                          marginBottom: 10,
                        }}
                      />
                    </>
                  )}
                />
              </LinearGradient>
            </View>
          </View>

        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  customHeader: {
    ...Platform.select({
      ios: {
        marginTop: 30,
        // backgroundColor:'red',
      },
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
    marginLeft: 20,
    marginRight: 25,
    height: 50,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  background_style_second: {
    flex: 1,
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
    ...Platform.select({
      ios: {
        width: "100%",
        height: Dimensions.get('window').height,
        marginTop: -47,
        marginBottom: -30
      },
      android: {
        width: "100%",
        height: Dimensions.get('window').height,
      }
    })
  },
  lower_view: {
    overflow: "hidden",
    flex: 1,
    borderRadius: 25,
  },
  heading_top: {
    color: "#FFF",
    fontSize: 18,
    marginTop: "10.5%",
    justifyContent: "center",
    textAlign: "center",
    flex: 1,
    marginRight: "0%",
    marginLeft: "0%",
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
  filterText: {
    color: '#fff',
    ...Styles.BOLD_20
  },
  linear_gradient_style: {
    ...Platform.select({
      ios: {
        marginTop: 30, backgroundColor: 'red'
      },
      android: {
        marginTop: -20, height: "120%"
      }
    })
  }
});

// const styles = StyleSheet.create({
//   customHeader: {
//     ...Platform.select({
//       ios: {
//         marginTop: 30,
//         // backgroundColor:'red',
//       },
//       android: {
//         marginTop: 30,
//       },
//       default: {},
//     }),
//   },
//   roundedButtons: {
//     paddingTop: 7,
//     paddingBottom: 7,
//     paddingLeft: 20,
//     paddingRight: 20,
//     borderColor: "#272D37",
//     borderRadius: 50,
//     borderWidth: 1,
//     height: 35,
//   },
//   roundedButtonsFilled: {
//     paddingTop: 7,
//     paddingBottom: 7,
//     paddingLeft: 20,
//     paddingRight: 20,
//     borderColor: "#272D37",
//     backgroundColor: "#272D37",
//     borderRadius: 50,
//     borderWidth: 1,
//     height: 35,
//   },
//   imgBackground: {
//     width: "100%",
//     height: "100%",
//   },
//   toggleButtons: {
//     justifyContent: "flex-end",
//     alignItems: "flex-end",
//     flex: 1,
//   },
//   container: {
//     height: "100%",
//     width: "100%",
//   },
//   heading: {
//     color: "#272D37",
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 5,
//     // fontFamily: 'sp_bold',
//   },
//   heading_following: {
//     fontSize: 16,
//     marginBottom: 20,
//     color: "#272D37",
//   },
//   secondHeading: {
//     marginTop: 10,
//     color: "#272D37",
//     fontSize: 15,
//   },
//   input: {
//     backgroundColor: "#FFF",
//     paddingLeft: 15,
//     borderRadius: 15,
//     textAlign: "center",
//     justifyContent: "center",
//     marginTop: 10,
//     height: 50,
//   },
//   background_style: {
//     flex: 1,
//     marginLeft: 20,
//     marginRight: 25,
//     height: 50,
//     flexDirection: "row",
//     alignContent: "center",
//     alignItems: "center",
//   },
//   background_style_second: {
//     flex: 1,
//     flexDirection: "row",
//     alignContent: "center",
//     alignItems: "center",
//   },
//   signup: {
//     borderRadius: 10,
//     marginLeft: 30,
//     marginTop: 10,
//     marginRight: 30,
//     bottom: "-66%",
//     height: 50,
//     justifyContent: "space-between",
//     alignSelf: "stretch",
//   },
//   center: {
//     alignSelf: "center",
//     marginLeft: 15,
//     marginRight: 15,
//     alignContent: "center",
//     textAlign: "center",
//     alignItems: "center",
//     fontSize: 14,
//     justifyContent: "center",
//   },
//   profile_view: {
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//     elevation: 5,
//     flexDirection: "column",
//     width: 90,
//     height: 90,
//     alignItems: "center",
//     marginRight: 20,
//   },
//   profile_image: {
//     borderWidth: 3,
//     borderColor: "#4B38D3",
//     width: "100%",
//     height: "100%",
//     borderRadius: 25,
//   },
//   linerGradient_background: {
//     ...Platform.select({
//       ios: {
//         width: "100%",
//         height: Dimensions.get('window').height,
//         marginTop: -47,
//         marginBottom: -30
//       },
//       android: {
//         width: "100%",
//         height: Dimensions.get('window').height,
//       }
//     })
//   },
//   lower_view: {
//     overflow: "hidden",
//     flex: 1,
//     borderRadius: 25,
//   },
//   heading_top: {
//     color: "#FFF",
//     fontSize: 18,
//     marginTop: "10.5%",
//     justifyContent: "center",
//     textAlign: "center",
//     flex: 1,
//     marginRight: "0%",
//     marginLeft: "0%",
//   },
//   profile_name: {
//     fontSize: 18,
//     fontWeight: "700",
//     alignItems: "center",
//     color: "#fff",
//   },
//   profile_username: {
//     fontSize: 14,
//     alignItems: "center",
//     marginTop: 5,
//     profile_username: {
//       fontSize: 14,
//       alignItems: "center",
//       marginTop: 5,
//       color: "#C4C3E7",
//     },
//     zero_common: {
//       color: "#fff",
//       fontSize: 16,
//       marginBottom: 5,
//       marginTop: 5,
//       fontWeight: "bold",
//     },
//     follow_common: {
//       color: "#fff",
//       fontSize: 14,
//       marginRight: 30,
//     },
//     border_middle: {
//       backgroundColor: "#B3B6BA",
//       opacity: 0.3,
//       width: "100%",
//       height: 1,
//       marginTop: 10,
//       marginBottom: 20,
//       alignSelf: "center",
//     },
//     filterText: {
//       color: '#fff',
//       ...Styles.BOLD_20
//     },
//     linear_gradient_style: {
//       ...Platform.select({
//         ios: {
//           marginTop: 30, backgroundColor: 'red'
//         },
//         android: {
//           marginTop: -20, height: "120%"
//         }
//       })
//     },
//   });