import React, { useState } from "react";
import { filter } from "lodash";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import apiDetails from "../api/AllApis";
import LoadingLottie from "./anim/LoadingLottie";
import Contants from "../constants/Contants";
import { RFValue } from "react-native-responsive-fontsize";
import Images from "../assets/Images";
import Styles from "../constants/Styles";
import constants from "../assets/constants";

function Mobile_code({ navigation }) {
  const [data, setData] = useState([]);
  const [dataTempApi, setDataTempApi] = useState([]);
  const [apiCheck, setApiCheck] = useState(0);
  const [showLottie, setShowLottie] = useState(true);

  let contains = (name, query) => {
    const name_ = name.country_name;
    const code_ = name.phone_code;
    try {
      if (
        name_.toLowerCase().includes(query) ||
        code_.toString().toLowerCase().includes(query)
      ) {
        return true;
      }
    } catch (error) {
      console.log(error);
    }

    return false;
  };

  let handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const datas = filter(dataTempApi, (user) => {
      return contains(user, formattedQuery);
    });
    setData(datas);
  };

  const apiCall = () => {
    const a = new apiDetails();
    a.api.get(a.mobileCodes).then((response) => { 
      if (response.data.status == "200") {
        let data_temp = [];
        for (var i in response.data.data) {
           data_temp.push(response.data.data[i]);
        } 
        setApiCheck(1);
        setData(data_temp);
        setDataTempApi(data_temp);
        setShowLottie(false);
      } else {
        console.log(response);
        setShowLottie(false);
        alert("Oops something went wrong");
      }
    });
  };
  if (apiCheck == 0) {
    apiCall();
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        translucent
        backgroundColor="transparent"
        barStyle={"light-content"}
      />

      {/* /*****************Section start*************************** */}
      <View
        style={[styles.SameContainer, { paddingHorizontal: RFValue(0, Contants.DesignCanvas.HEIGHT), marginTop: RFValue(0, Contants.DesignCanvas.HEIGHT) }]}
      >
       
          <LinearGradient
         colors={constants.AppColor.LINEAR_GRADIENT_COLOR_BUTTON}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[{
            width: Dimensions.get('window').width ,
            // height: 100,
            paddingHorizontal: RFValue(25, Contants.DesignCanvas.HEIGHT),
           
            ...Platform.select({
              ios:{
                marginTop:-55,
              },
              android:{}
            })
          }]}
        >
           <View style={[{
            // backgroundColor: 'green',
          width: Dimensions.get('window').width * 0.8856,
          height: 50,
          marginTop:RFValue(50,Contants.DesignCanvas.HEIGHT),
            flexDirection:"row",
          justifyContent: "flex-start",
          alignItems:"center"
        }]}>
          <TouchableOpacity onPress={() => {
            navigation.navigate({
              name: "SignUp_mobile",
              merge: true,
            });
          }}>
            <Image
              style={[{
                width: RFValue(28, Contants.DesignCanvas.HEIGHT),
                height: RFValue(28, Contants.DesignCanvas.HEIGHT),
                tintColor:"#FFFFFF"
              }]}
              resizeMode="contain"
              source={Images.all_screen_back_black_arrow_icon}
            />
          </TouchableOpacity>
          <TextInput
            style={[Styles.REGULAR_18,{
              // backgroundColor:"red",
              width:Dimensions.get('window').width*0.7856,
              height:50,
              paddingLeft:10,
              color:"#FFFFFF"
            }]}
            placeholderTextColor="#FFF"
            onChangeText={handleSearch}
            placeholder="Search..."
          />
        </View>
          </LinearGradient>
      </View>
      {/* /*****************Section end*************************** */}
      {/* /*****************Section start*************************** */}
      {/* <View style={[{
        paddingBottom:RFValue(50,812)
      }]}> */}
      <FlatList
      style={[{
        ...Platform.select({
          ios:{},
          android:{
            marginBottom:RFValue(10,Contants.DesignCanvas.HEIGHT)
          }
        })
        
      }]}
        data={data}
        extraData={data}
        renderItem={({ item }) => (
          <TouchableOpacity
          activeOpacity={0.8}
            style={[styles.input, { justifyContent: "space-between" }]}
            onPress={() => {
              navigation.navigate({
                name: "SignUp_mobile",
                params: { post: item },
                merge: true,
              });
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{ width: RFValue(32, 812), height: RFValue(32, 812), marginRight: 15 ,borderRadius:100,}}
                resizeMode={"contain"}
                source={{ uri: item.flag }}
              />
              <Text
                style={[Styles.REGULAR_15,{ alignSelf: "center", color: "#272D37" }]}
              >
                {item.country_name}
              </Text>
            </View>
            <Text
              style={[Styles.REGULAR_15,{ alignSelf: "center", color: "#272D37" }]}
            >
              +{item.phone_code}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {/* </View> */}
      {/* /*****************Section end*************************** */}
      {showLottie && (
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#F7EFFA",
  },
  input: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    justifyContent: "center",
    // alignContent: "center",
    alignItems:"center",
    textAlign: "center",
    padding: 15,
    marginTop: 10,
    borderRadius: 16,
    marginHorizontal:RFValue(25,812),
    height:60,

    // marginLeft: 30,
    // marginRight: 30,
    // shadowColor: '#C2C2C2',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
    // elevation: 1,
  },
  customHeader: {
    ...Platform.select({
      ios: {
        height: "11%",
        marginTop: -20,
      },
      android: {
        height: "11%",
        marginTop: 0,
      },
      default: {
        height: "11%",
      },
    }),
  },
  SameContainer: {
    backgroundColor: "red",
    marginTop: RFValue(30, Contants.DesignCanvas.HEIGHT),
    width: Dimensions.get('window').width,
    paddingHorizontal: RFValue(25, 812)
  },
});

export default Mobile_code;
