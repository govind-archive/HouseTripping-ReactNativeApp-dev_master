import React, { userState, useState } from "react";
import { filter } from "lodash";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  SafeAreaView,
  Keyboard,
  StatusBar,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path, G } from "react-native-svg";
import { NormalHeader } from "./Components/customHeader";
import Images from "../assets/Images";
import normalize from "react-native-normalize";
import constants from "../assets/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiDetails from "../api/AllApis";
import { RFValue } from 'react-native-responsive-fontsize';
import Constant from '../constants/Contants';
import Styles from '../constants/Styles';
import { HeaderModel, HelpScreenModel } from "./Components/NewModelView";
import Contants from "../constants/Contants";
import { scale } from "react-native-size-matters";
class SelectCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songcategory: [],
      selected: [],
      selected_cat: [],
    };
    // const [, setSelected_cat] = useState([]);
  }
  contains = (name, query) => {
    const name_ = name.name;
    const code_ = name.code;
    if (name_.includes(query) || code_.includes(query)) {
      return true;
    }
    return false;
  };

  handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const data = filter(this.state.songcategory, (user) => {
      return this.contains(user, formattedQuery);
    });
    console.log(data);
  };
  componentDidMount() {
    this.songCategoryApi();
  }

  songCategoryApi = () => {
    AsyncStorage.getItem("userInfo").then((user) => {
      console.log(user);
      if (user) {
        var d = JSON.parse(user);

        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .get(a.songcategory)
          .then((response) => {
            // setDataGroupTest(false);
            if (response.data.status == "200") {
              this.setState({ songcategory: response.data.data });
            } else {
              // alert(response.data.msg);
            }
          });
      }
    });
  };

  songCategoryUpdateApi = () => {
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);
        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .post(a.userupdatecategory, {
            category: this.state.selected_cat,
          })
          .then((response) => {
            if (response.data.status == "200") {
              this.props.navigation.navigate("Login");
            } else {
              console.log(response.data);
            }
          });
      }
    });
  };

  renderItemComponent = (songcategory) => {
    const { selectedClients, songcategorys, selected_cat } = this.state;

    return (
      <>
        <TouchableOpacity
          style={[
            styles.input,
            { justifyContent: "space-between", flexDirection: "column", alignItems: 'center' },
          ]}
          onPress={() => {
            var tmp = selected_cat;
            if (tmp.includes(songcategory.item.id)) {
              var index = tmp.indexOf(songcategory.item.id);
              if (index !== -1) {
                tmp.splice(index, 1);
              }
            } else {
              tmp.push(songcategory.item.id);
            }
            
            const d_t = JSON.stringify(tmp);
            AsyncStorage.setItem("filterChecked", d_t);
            this.setState({ selected_cat: tmp });
          }}
        >
          <View style={styles.background_style}>
            <Image
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                borderRadius: 25,
              }}
              source={{
                uri: apiDetails.publicImage + songcategory.item.category_image,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              {selected_cat.indexOf(songcategory.item.id) !== -1 ? (
                <Svg
                  style={{
                    marginRight: 13,
                    marginTop: 13,
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <G
                    id="Group_52143"
                    data-name="Group 52143"
                    transform="translate(-144 -115)"
                  >
                    <Path
                      id="Path_25201"
                      data-name="Path 25201"
                      d="M9,0A9,9,0,1,1,0,9,9,9,0,0,1,9,0Z"
                      transform="translate(144 115)"
                      fill="#fff"
                    />
                    <Path
                      id="Path_24172"
                      data-name="Path 24172"
                      d="M4921.821,1474.518l3.592,3.124,5.87-5.958"
                      transform="translate(-4773.551 -1350.544)"
                      fill="none"
                      stroke="#4b38d3"
                      stroke-width="1.5"
                    />
                  </G>
                </Svg>
              ) : (
                <View
                  style={[
                    {
                      // backgroundColor:"green",
                      width: normalize(20),
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: normalize(20),
                      borderWidth: normalize(3),
                      borderRadius: normalize(20),
                      borderColor: "#fff",
                      marginTop: normalize(15),
                      marginRight: normalize(15),
                    },
                  ]}
                ></View>
              )}
            </View>
          </View>
          <Text
            style={{
              alignSelf: "center",
              justifyContent: 'center',
              // fontSize: 15,
              color: "#272D37",
              ...Styles.MEDIUM_15,
              margin: 10,
            }}
          >
            {songcategory.item.category_name}
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  render() {
    <StatusBar
      animated={true}
      translucent
      backgroundColor="transparent"
      barStyle={"light-content"}
    />


    return (

      <SafeAreaView style={{ flex: 1 }}>

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
                  this.props.navigation.goBack();
                }}
                HeaderTitle={'Song Categories'}
                leftImage={Images.all_screen_back_black_arrow_icon}
              />
              <LinearGradient
                colors={constants.AppColor.FLEX_GRADIENT_BACK_COLOR}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[Styles.LinearGradientStyle]}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.customScrollview}>
                  {/* /*************************section code start************************* */}
                  <View style={[Styles.SameContainerStyle]}>
                    <FlatList
                      contentContainerStyle={{
                        justifyContent: "center",
                        marginHorizontal: 4,
                        // alignItems:'center',
                        // margin: 10,
                        // marginTop: 40,
                        marginBottom: 30,
                      }}
                      data={this.state.songcategory}
                      numColumns={2}
                      showsVerticalScrollIndicator={false}
                      renderItem={this.renderItemComponent}
                      ItemSeparatorComponent={this.ItemSeparator}
                      keyExtractor={(item, index) => index.toString()}
                    // ListEmptyComponent={<EmptyCard message="No Data Available" />}

                    // ListFooterComponent={() => (showFooterLoader) ? <LoaderFooter /> : <View style={{ height: 10 }} />}
                    />
                  </View>
                  {/* /*************************section code end************************* */}
                  <View>
                    <TouchableOpacity

                      onPress={() => {
                        this.songCategoryUpdateApi();
                      }}
                    >
                      <LinearGradient
                        style={{ borderRadius: 15, marginTop: Platform.OS === 'ios' ? 50 : 18 }}
                        colors={constants.AppColor.LINEAR_GRADIENT_COLOR_BUTTON}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                      >
                        <Text style={[styles.center, { color: "#fff", ...Styles.MEDIUM_15 }]}>
                          Complete Setup
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>

                  {/* /*************************section code end************************* */}
                </ScrollView>
              </LinearGradient>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );






  }
}

const styles = StyleSheet.create({
  imgBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#F7EFFA",
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
    // backgroundColor:'red',
    height: "100%",
    width: "100%",
  },
  signup: {
    borderRadius: 10,
    // marginLeft: 40,
    // backgroundColor:'red',
    alignItems: 'center',
    // width:Dimensions.get('window').width*0.8853,
    // marginTop: 10,
    // marginRight: 40,
    // bottom: '-66%',
    height: 50,
    // width:Dimensions.get('window').width    // justifyContent: 'space-between',
    // alignSelf: 'stretch',
  },
  center: {
    alignSelf: "center",
    margin: 15,
    fontSize: 15,
    justifyContent: "center",
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
  Flex_View_Style: {
    ...Platform.select({
      ios: {
        flex: 1,
        // height:'100%',
        borderTopLeftRadius: normalize(50),
        borderTopRightRadius: normalize(50),
        backgroundColor: "white",
        height: Dimensions.get('window').height,
        marginTop: -47,
        marginBottom: -47,
        // backgroundColor: 'red'
        // marginBottom:normalize(30),
      },
      android: {
        flex: 1,
        // height:'100%',
        borderTopLeftRadius: normalize(50),
        borderTopRightRadius: normalize(50),
        // backgroundColor: "red",
        marginBottom: -47,

        // marginBottom:normalize(30),
      }
    }),

  },
  Linear_Gradient_Style: {
    ...Platform.select({
      ios: {
        height: "100%",
        paddingTop: 10,
        borderRadius: RFValue(32),
        // backgroundColor: 'red'
        // borderTopRightRadius: normalize(50),
      },
      android: {
        height: "100%",
        paddingTop: 10,
        borderTopLeftRadius: RFValue(32),
        borderTopRightRadius: RFValue(32),

      }
    })
  },
  image_background: {
    ...Platform.select({
      ios: {
        height: Dimensions.get('window').height,
        marginTop: -47,
      },
      android: {
        height: Dimensions.get('window').height,
      }

    }),

  },
  /****************************Screen layout design style*********************************/

});

export default SelectCategory;
