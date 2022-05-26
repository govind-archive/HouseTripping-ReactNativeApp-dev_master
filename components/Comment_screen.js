import React, { useRef, useState } from "react";
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
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import apiDetails from "../api/AllApis";
import Svg, { Path, G } from "react-native-svg";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Images from "../assets/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Moment from "moment";
import Styles from "../constants/Styles";
import { HeaderModel } from "./Components/NewModelView";
import { RFValue } from "react-native-responsive-fontsize";
import Contants from "../constants/Contants";
import LoadingLottie from "./anim/LoadingLottie";
import Header from "./common/Header";

export default function Comment_screen({ navigation, route }) {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState();
  const [heartFill, setHeartFill] = useState(false);
  const [postId, setPostId] = useState(-1);
  const [update, setUpdate] = useState(false);
  const [show, setShow] = useState(true);

  const refInput = React.useRef();
  var comment = "";

  function getComments(id) {
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);

        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .post(a.getComments, {
            post_id: id,
            user_id: d.id,
          })
          .then((response) => {
            setShow(false);
            if (response.data.status == "200") {
              setUserData(d);
              setData(response.data.comments);
              setUpdate(!update);
            } else {
              console.log(response);
            }
          });
      }
    });
  }

  function likeComment(id, index) {
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);

        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .post(a.commentLike, {
            liked_by: d.id,
            comment_id: id,
          })
          .then((response) => {
            if (response.data.status == "200") {
              var temp_l = data;
              if (temp_l[index].comment.is_liked > 0) {
                temp_l[index].comment.is_liked = 0;
                temp_l[index].comment.likes = temp_l[index].comment.likes - 1;
              } else {
                temp_l[index].comment.is_liked = 1;
                temp_l[index].comment.likes = temp_l[index].comment.likes + 1;
              }
              setData(temp_l);
              setUpdate(!update);
            } else {
              console.log(response);
            }
          });
      }
    });
  }

  function deleteCommentApi(id, index) {
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);

        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .post(a.delete_comment, {
            user_id: d.id,
            comment_id: id,
          })
          .then((response) => {
            if (response.data.status == "200") {
              var temp_l = data;
              temp_l.splice(index, 1);
              setData(temp_l);
              setUpdate(!update);
              alert("Comment deleted successfully....!!!");
            } else {
              console.log(response);
            }
          });
      }
    });
  }

  function addComment() {
    setShow(true);
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);

        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .post(a.addComment, {
            post_id: route.params?.post_id,
            user_id: d.id,
            comment_parent_id: "",
            comment: comment,
          })
          .then((response) => {
            if (response.data.status == "200") {
              refInput.current.clear();
              getComments(route.params?.post_id);
            } else {
              console.log(response);
              alert(response.data.msg);
            }
          });
      }
    });
  }

  const showTimeAgo = (time) => {
    time = time.replace("T", " ");
    time = time.replace("000000Z", "000");
    var tem_d = Moment(time).fromNow();
    return tem_d;
  };

  if (postId == -1) {
    if (route.params?.post_id) {
      setPostId(route.params?.post_id);
      getComments(route.params?.post_id);
    } else {
      alert("Oops, Please select post again");
    }
  }

  return (
    <View styles={{ flex: 1 }}>

      <Header />

      <LinearGradient
        colors={["#E683AF", "#7ACACB", "#77A1D3"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={[{
          ...Platform.select({
            ios: {
              height: "100%",
            },
            android: {
              height: Dimensions.get('window').height
            }
          })
        }]}
      >

        <HeaderModel
          leftimgstyle={[{
            width: 28,
            height: 28
          }]}
          onPress={() => {
            navigation.goBack()
          }}
          HeaderTitle={'Comments'}
          leftImage={require("../assets/images/all_screen_back_black_arrow_icon.png")}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View>
            <LinearGradient
              colors={["#F7EFFA", "#FEFAF9"]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{

                ...Platform.select({
                  ios: {
                    height: Dimensions.get('window').height - 30,
                    borderTopLeftRadius: 25,
                    borderTopLeftRadius: 25
                  },
                  android: {
                    height: Dimensions.get('window').height - 35,
                    borderTopLeftRadius: 25,
                    borderTopLeftRadius: 25
                  }
                })
              }}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 20,
                    flex: 0.85,
                  }}
                >
                  <FlatList
                    contentContainerStyle={{ marginBottom: 20 }}
                    data={data}
                    extraData={update}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => {
                      return "" + item.comment.id;
                    }}
                    renderItem={({ item, index }) => (
                      // <TouchableOpacity onPress={() => {}}>
                      <View key={item.id}>
                        <View style={styles.background_style_second}>
                          {item.comment.profile_image == null && (
                            <Image
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 16,
                                marginRight: 20,
                                alignSelf: "baseline",
                              }}
                              source={require("../assets/images/girl_img.png")}
                            />
                          )}

                          {item.comment.profile_image != null && (
                            <Image
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 16,
                                marginRight: 20,
                                alignSelf: "baseline",
                              }}
                              source={{ uri: item.comment.profile_image }}
                            />
                          )}

                          <View style={{ flex: 2 }}>
                            <Text>
                              <Text
                                style={[Styles.SEMIBOLD_14, {
                                  lineHeight: 21,
                                  color: "#272D37",
                                }]}
                              >
                                {item.comment.name} {item.comment.lastname}{" "}
                              </Text>
                              <Text style={[Styles.REGULAR_14, { lineHeight: 21, color: "#272D37", }]}>
                                {item.comment.comment}
                              </Text>
                            </Text>

                            <View
                              style={{
                                color: "#686E76",
                                fontSize: 12,
                                marginTop: 5,
                                flexDirection: "row",
                              }}
                            >
                              <Text style={[Styles.REGULAR_13, { color: "#686E76", lineHeight: 17 }]}>
                                {showTimeAgo(item.comment.created_at)}
                              </Text>
                              <Text
                                style={[Styles.REGULAR_13, { color: "#686E76", lineHeight: 17, marginLeft: 5 }]}
                              >
                                {item.comment.likes} likes
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              flex: 0.4,
                              justifyContent: "flex-end",
                              marginRight: 20,
                              marginTop: -15,
                            }}
                          >
                            {item.comment.is_liked == 0 ? (
                              <TouchableOpacity
                                onPress={() => {
                                  likeComment(item.comment.id, index);
                                }}
                              >
                                <Image
                                  style={{ width: 20, height: 17 }}
                                  source={Images.heart_unfilled}
                                />
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                onPress={() => {
                                  likeComment(item.comment.id, index);
                                }}
                              >
                                <Image
                                  style={{ width: 20, height: 17 }}
                                  source={Images.heart_fill}
                                />
                              </TouchableOpacity>
                            )}

                            {item.comment.user_id == userData.id && (
                              <TouchableOpacity
                                onPress={() => {
                                  deleteCommentApi(item.comment.id, index);
                                }}
                              >
                                <Image
                                  style={{
                                    width: 20,
                                    height: 20,
                                    marginLeft: 20,
                                  }}
                                  source={Images.delete_icon}
                                />
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                      </View>
                      // </TouchableOpacity>
                    )}
                  />
                </View>
              </View>

              <View
                style={{
                  ...Platform.select({
                    ios: {
                      position: "absolute",
                      flex: 0.3,
                      bottom: "4%",
                      flexDirection: "row",
                      alignContent: "center",
                      alignItems: "center",
                      backgroundColor: "#fff",
                      padding: 15,
                    },
                    android: {
                      position: "absolute",
                      flex: 0.3,
                      bottom: "4%",
                      flexDirection: "row",
                      alignContent: "center",
                      alignItems: "center",
                      backgroundColor: "#fff",
                      padding: 15,
                    }
                  })

                }}
              >


                <TextInput
                  ref={refInput}
                  onChangeText={(c) => {
                    comment = c;
                  }}
                  style={{ flex: 1 }}
                  placeholder="Add a comment..."
                />

                <TouchableOpacity
                  onPress={() => {
                    if (comment == "") {
                      alert("Please enter comment");
                    } else {
                      addComment();
                    }
                  }}
                >
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      alignItems: "flex-end",
                      padding: 5,
                      flex: 0,
                    }}
                    source={require("../assets/images/ic_send.png")}
                  />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

          {/* </TouchableWithoutFeedback> */}
        </KeyboardAvoidingView>
      </LinearGradient>
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
    // ...Platform.select({
    //   ios: {},
    //   android: {
    //     marginTop: 30,
    //   },
    //   default: {},
    // }),
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
    marginBottom: -25,
    marginLeft: 10,
    marginRight: 25,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  background_style_second: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 20,
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
    flex: 1,
    width: "100%",
  },
  heading_top: {
    color: "#FFF",
    fontSize: 20,
    marginTop: 20,
    justifyContent: "center",
    textAlign: "center",
    flex: 1,
    marginRight: "15%",
    marginLeft: "0%",
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
