import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  Platform,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NormalHeader } from "./Components/customHeader";
import Images from "../assets/Images";
import constants from "../assets/constants";
import { RFValue } from "react-native-responsive-fontsize";
import Contants from "../constants/Contants";
import normalize from "react-native-normalize";
import { TextInputBox, TextInputDescription } from "./Components/TextInputBox";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiDetails from "../api/AllApis";
import { ChallangeModel } from "./Components/ModeLView";
import Styles from "../constants/Styles";
import { ContactUsScreenModel, HeaderModel } from "./Components/NewModelView";

const ContactUs = ({ navigation }) => {
  // let email, userName, subject, description, image;
  const [gallary, setGallary] = useState("");
  const [data, setData] = useState({
    email: "",
    username: "",
    subject: "",
    description: "",
    files: "",
  });
  console.log("==========Username=====", data.username);

  const [show, setShow] = useState(false);
  const [path, setPath] = useState("");
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [subject, setSubject] = useState('')
  const [description, set] = useState('')

  useEffect(() => {
    contactUsApi();
  }, []);

  const contactUsApi = () => {
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);
        let a = new apiDetails(d.token);
        const form = new FormData();
        form.append("email", data.email);
        form.append("username", data.username);
        form.append("subject", data.subject);
        form.append("description", data.description);
        form.append("files", {
          files: gallary.uri,
          type: "image/jpg",
          name: "image.jpg",
          uri: gallary.uri,
        });
        console.log("form===========", form);
        const headers = {
          "Content-Type": "multipart/form-data",
        };
        a.getClient(d.token)
          .post(a.submit_ContactUs, form, { headers })
          .then((response) => {
            console.log("contact us------>", response);
            if (response.data.status == "200") {
              console.log("contact us---if->", response);
              openModal();
            } else {
              console.log("contact us else--------", response);
            }
          });
      }
    });
  };
  const openModal = () => {
    console.log("filter...");
    setShow(true);
  };
  const closeModal = () => {
    navigation.goBack()
    console.log("filter...");
    setShow(false);
  };
  const handleOnChange = (field: any, value: any) => {
    console.log("value-----", value);
    console.log("field------", field);
    data[field] = value;
    setData(data);
  };

  const openGallery = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPath(result);
      setGallary(result);
      console.log("gallary path---->", path);
      console.log("gallary ------", gallary);
    }
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
                width:28,
                height:28
              }]}
              // rightimgstyle={[{
              //   width:20,
              //   height:20
              // }]}
            onPress={() => {
              navigation.goBack();
            }}
            HeaderTitle={'Contact Us'}
            leftImage={Images.all_screen_back_black_arrow_icon}
           /> 
           <LinearGradient
              colors={constants.AppColor.FLEX_GRADIENT_BACK_COLOR}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[Styles.LinearGradientStyle]}>
                 <ScrollView showsVerticalScrollIndicator={false} style={[Styles.customScrollview]}>
                {/* /*************************section code start************************* */}
                <View style={[styles.InputBoxMainViewStyle]}>
                  <Text style={[Styles.BOLD_22, { color: '#272D37', lineHeight: 30 }]}>
                    Contact Us
                  </Text>
                </View>
                {/* /*************************section code end************************* */}
                {/* /*************************section code start************************* */}
                <View style={[styles.InputBoxMainViewStyle,{  marginTop: RFValue(15, Contants.DesignCanvas.HEIGHT),}]}>
                  <Text  style={[Styles.REGULAR_16, { color: '#66737F', lineHeight: 22 }]}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                  </Text>
                </View>
                {/* /*************************section code end************************* */}
                {/* /*************************section code start************************* */}
                <View style={[styles.InputBoxMainViewStyle,{  marginTop: RFValue(15, Contants.DesignCanvas.HEIGHT),}]}>
                  <Text  style={[styles.FieldStyle]}>
                    Select Issue
                  </Text>
                  <TextInput
                    style={[styles.InputBoxStyle]}
                    placeholder="Technical issues"
                    placeholderTextColor={'#B3B6BA'}
                  />
                </View>
                {/* /*************************section code end************************* */}
                 {/* /*************************section code start************************* */}
                 <View style={[styles.InputBoxMainViewStyle,{  marginTop: RFValue(15, Contants.DesignCanvas.HEIGHT),}]}>
                  <Text  style={[styles.FieldStyle]}>
                    Your email address*
                  </Text>
                  <TextInput
                    style={[styles.InputBoxStyle]}
                    placeholder="Your email address"
                    placeholderTextColor={'#B3B6BA'}
                    onChangeText={(value) => handleOnChange("email", value)}
                  />
                </View>
                {/* /*************************section code end************************* */}
                 {/* /*************************section code start************************* */}
                 <View style={[styles.InputBoxMainViewStyle,{  marginTop: RFValue(15, Contants.DesignCanvas.HEIGHT),}]}>
                  <Text  style={[styles.FieldStyle]}>
                    Your user name*
                  </Text>
                  <TextInput
                    style={[styles.InputBoxStyle]}
                    placeholder="Your user name"
                    placeholderTextColor={'#B3B6BA'}
                    onChangeText={(value) => handleOnChange("username", value)}
                  />
                </View>
                {/* /*************************section code end************************* */}
                {/* /*************************section code start************************* */}
                <View style={[styles.InputBoxMainViewStyle,{  marginTop: RFValue(15, Contants.DesignCanvas.HEIGHT),}]}>
                  <Text  style={[styles.FieldStyle]}>
                    Subject*
                  </Text>
                  <TextInput
                    style={[styles.InputBoxStyle]}
                    placeholder="Subject"
                    placeholderTextColor={'#B3B6BA'}
                    onChangeText={(value) => handleOnChange("subject", value)}
                  />
                </View>
                {/* /*************************section code end************************* */}
                {/* /*************************section code start************************* */}
                <View style={[styles.InputBoxMainViewStyle,{  marginTop: RFValue(15, Contants.DesignCanvas.HEIGHT),}]}>
                  <Text  style={[styles.FieldStyle]}>
                    Description**
                  </Text>
                  <TextInput
                    style={[{
                      ...Platform.select({
                        ios: {
                          ...Styles.REGULAR_16,
                          backgroundColor: "#FFFFFF",
                          color: "#000",
                          lineHeight: 22,
                          marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT),
                          width: Dimensions.get('window').width - 35,
                          height: RFValue(150, Contants.DesignCanvas.HEIGHT),
                          borderRadius: 16,
                          paddingLeft: 15,

                        },
                        android: {
                          ...Styles.REGULAR_16,
                          backgroundColor: "#fff",
                          color: "#000",
                          lineHeight: 22,
                          marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT),
                          width: Dimensions.get('window').width - 30,
                          height: RFValue(170, Contants.DesignCanvas.HEIGHT),
                          borderRadius: 16,
                          paddingLeft: 15,
                          paddingTop:10
                        }
                      })
                    }]}
                    textAlignVertical={'top'}
                    placeholder="Description"
                    placeholderTextColor={'#B3B6BA'}
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={(value) =>
                      handleOnChange("description", value)
                    }
                  />
                </View>
                {/* /*************************section code end************************* */}
                {/* /*************************section code start************************* */}
                <View style={[styles.InputBoxMainViewStyle,{  marginTop: RFValue(15, Contants.DesignCanvas.HEIGHT),}]}>
                  <Text  style={[Styles.REGULAR_16, { color: '#66737F', lineHeight: 22 }]}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                  </Text>
                </View>
                {/* /*************************section code end************************* */}
                {/* /*************************section code start************************* */}
                <View style={[styles.InputBoxMainViewStyle,{  marginTop: RFValue(15, Contants.DesignCanvas.HEIGHT),}]}>
                  <Text  style={[styles.FieldStyle]}>
                    What app are you using?*
                  </Text>
                  <TextInput
                    style={[styles.InputBoxStyle]}
                    placeholder="What app are you using"
                    placeholderTextColor={'#B3B6BA'}
                    // onChangeText={(value) => handleOnChange("subject", value)}
                  />
                </View>
                {/* /*************************section code end************************* */}
                {/* /*************************section code start************************* */}
                <View style={[styles.InputBoxMainViewStyle,{  marginTop: RFValue(15, Contants.DesignCanvas.HEIGHT),}]}>
                  <Text  style={[styles.FieldStyle]}>
                    Attachments*
                  </Text>
                  <TouchableOpacity 
                  onPress={() => {
                    openGallery();
                  }}
                  activeOpacity={0.8}
                  style={[{
                    ...Platform.select({
                      ios: {
                        backgroundColor: "#FFFFFF",
                        marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT),
                        width: Dimensions.get('window').width - 50,
                        height: RFValue(50, Contants.DesignCanvas.HEIGHT),
                        borderRadius: 10,
                        // paddingLeft: 15,
                       flexDirection:"row",
                  alignItems:"center",
                  justifyContent:'center'
                        

                      },
                      android: {
                        backgroundColor: "#FFFFFF",
                        marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT),
                        width: Dimensions.get('window').width - 50,
                        height: RFValue(60, Contants.DesignCanvas.HEIGHT),
                        borderRadius: 10,
                        // paddingLeft: 15,
                         flexDirection:"row",
                  alignItems:"center",
                  justifyContent:'center'
                      }
                    })
                  }]}>
                    <Text style={[Styles.REGULAR_16,{color:"#77A1D3", lineHeight:22}]}>
                    Add file
                    </Text>
                    <Text style={[Styles.REGULAR_16,{color:"#272D37", lineHeight:22,marginLeft:5}]}>
                    or drop file here
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* /*************************section code end************************* */}
                {/* /*************************section code start************************* */}
                <View style={[styles.InputBoxMainViewStyle,{  marginTop: RFValue(15, Contants.DesignCanvas.HEIGHT),}]}>
                
                  <TouchableOpacity 
                   onPress={() => {
                    //  navigation.navigate('ContactInformation')
                    // handleOnChange("files", gallary.uri);
                    // contactUsApi();
                    openModal();
                    
                  }}
                  activeOpacity={0.8}
                  style={[{
                    ...Platform.select({
                      ios: {
                        backgroundColor: "#FFFFFF",
                        marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT),
                        width: Dimensions.get('window').width - 50,
                        height: RFValue(50, Contants.DesignCanvas.HEIGHT),
                        borderRadius: 10,
                        // paddingLeft: 15,
                  alignItems:"center",
                  justifyContent:'center'
                        

                      },
                      android: {
                        backgroundColor: "#FFFFFF",
                        marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT),
                        width: Dimensions.get('window').width - 50,
                        height: RFValue(50, Contants.DesignCanvas.HEIGHT),
                        borderRadius: 10,
                        // paddingLeft: 15,
                  alignItems:"center",
                  justifyContent:'center'
                      }
                    })
                  }]}>
                  <LinearGradient
            colors={["#E683AF", "#7ACACB", "#77A1D3"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={[{
              ...Platform.select({
                ios: {
                  backgroundColor: "#FFFFFF",
                  // marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT),
                  width: Dimensions.get('window').width - 50,
                  height: RFValue(50, Contants.DesignCanvas.HEIGHT),
                  borderRadius: 10,
                  // paddingLeft: 15,
            alignItems:"center",
            justifyContent:'center'
                  

                },
                android: {
                  backgroundColor: "#FFFFFF",
                  // marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT),
                  width: Dimensions.get('window').width - 50,
                  height: RFValue(50, Contants.DesignCanvas.HEIGHT),
                  borderRadius: 10,
                  // paddingLeft: 15,
            alignItems:"center",
            justifyContent:'center'
                }
              })
            }]}>
                    <Text style={[Styles.MEDIUM_16,{color:"#fff", lineHeight:22}]}>
                    Submit
                    </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                {/* /*************************section code end************************* */}
                </ScrollView>
              </LinearGradient>
           
              <ContactUsScreenModel
        transparent={true}
        visible={show}
        onRequestClose={() => {
          setShow(false);
        }}
        onPress={() => closeModal()}
      />
          </LinearGradient>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>


    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Flex_View_Style: {
    flex: 1,
    // height:'100%',
    borderTopLeftRadius: normalize(50),
    borderTopRightRadius: normalize(50),
    // backgroundColor: "red",
    // marginBottom:normalize(30),
  },
  customScrollview: {
    ...Platform.select({
      ios: {
        marginTop: -20,
      },
      android: {
        // paddingBottom: 20,
      },
      default: {
        marginTop: -20,
      },
    }),
  },
  Linear_Gradient_Style: {
    height: "100%",
    paddingTop: 10,
    borderTopLeftRadius: normalize(50),
    borderTopRightRadius: normalize(50),
  },
  contact_us_textStyle: {
    fontSize: normalize(22),
    paddingTop: normalize(15),
  },
  contact_us_subTitle_textStyle: {
    fontSize: normalize(15),
    marginTop: normalize(10),
    fontWeight: "400",
  },
  same_container_view: {
    // backgroundColor:'red',
    height: normalize(90),
  },
  lable_text_style: {
    fontSize: normalize(16),
  },
  lable_text_user_style: {
    fontSize: normalize(16),
    marginTop: normalize(10),
  },
  lable_text_subject_style: {
    fontSize: normalize(16),
    marginTop: normalize(10),
  },
  lable_text_description_style: {
    fontSize: normalize(16),
    marginTop: normalize(10),
  },
  same_container_description_view: {
    height: normalize(150),
    backgroundColor: "#fff",
    marginTop: normalize(10),
    borderRadius: normalize(20),
    paddingLeft: normalize(10),
  },
  same_container_email_view: {
    height: normalize(60),
    backgroundColor: "#fff",
    marginTop: normalize(10),
    borderRadius: normalize(20),
    paddingLeft: normalize(10),
  },
  same_container_username_view: {
    height: normalize(60),
    backgroundColor: "#fff",
    marginTop: normalize(10),
    borderRadius: normalize(20),
    paddingLeft: normalize(10),
  },
  same_container_subject_view: {
    height: normalize(60),
    backgroundColor: "#fff",
    marginTop: normalize(10),
    borderRadius: normalize(20),
    paddingLeft: normalize(10),
  },
  button_Style: {
    backgroundColor: "#fff",
    height: normalize(55),
    marginTop: normalize(10),
    borderRadius: normalize(20),
    paddingLeft: normalize(10),
    marginTop: normalize(20),
  },
  signup: {
    backgroundColor: "#F7EFFA",
    borderRadius: 10,
    marginLeft: 40,
    marginRight: 40,
    height: normalize(50),
    justifyContent: "space-between",
  },
  center: {
    alignSelf: "center",
    margin: 10,
    fontSize: 18,
    justifyContent: "center",
  },
  titleStyle: {
    fontSize: normalize(20),
    fontWeight: "600",
    backgroundColor: "red",
  },
  profilemodelContainer: {
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    justifyContent: "flex-end",
    height: "100%",
    // marginBottom:normalize(15)
  },
  heading_top: {
    ...Styles.BOLD_20,
    color: "#FFF",
    marginTop: 30,
    justifyContent: "center",
    textAlign: "center",
    flex: 1,
    marginLeft: -50,
  },
  FieldStyle: {
    ...Styles.REGULAR_16,
    color: '#272D37',
    lineHeight: 22
  },
  InputBoxMainViewStyle: {
    ...Platform.select({
      ios: {
        width: Dimensions.get('window').width - 30,
        paddingBottom: 5,
        // backgroundColor: "red",
        // marginTop: RFValue(15, Contants.DesignCanvas.HEIGHT),
        // height:RFValue(70,Contants.DesignCanvas.HEIGHT),


      },
      android: {
        width: Dimensions.get('window').width -35,
        paddingBottom: 5,
        // backgroundColor: "red",
        // marginTop: RFValue(15, Contants.DesignCanvas.HEIGHT),
        // height:RFValue(58,Contants.DesignCanvas.HEIGHT),

      }
    })
  },
  InputBoxStyle: {
    ...Platform.select({
      ios: {
        ...Styles.REGULAR_16,
        backgroundColor: "#fff",
        color: "#000",
        lineHeight: 22,
        marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT),
        width: Dimensions.get('window').width - 30,
        height: RFValue(50, Contants.DesignCanvas.HEIGHT),
        borderRadius: 10,
        paddingLeft: 15,

      },
      android: {
        ...Styles.REGULAR_16,
        backgroundColor: "#fff",
        color: "#000",
        lineHeight: 22,
        marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT),
        width: Dimensions.get('window').width - 35,
        height: RFValue(50, Contants.DesignCanvas.HEIGHT),
        borderRadius: 10,
        paddingLeft: 15,
      }
    })
  }
});
export default ContactUs;
