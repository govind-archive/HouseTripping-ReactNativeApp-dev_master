import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import Images from "../assets/Images";
import normalize from "react-native-normalize";
import constants from "../assets/constants";
import apiDetails from "../api/AllApis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import SubscriptionPlan from "./SubscriptionPlan";
import { HeaderModel } from "./Components/NewModelView";
import Styles from "../constants/Styles";
import { InputBox, InputSearch } from "./Components/InputBox";
import { EmptyCard, EmptySearchSongCard } from "./Components/EmptyCard";

const SearchForSongs = ({ route }) => {
  const [getSongs, setSongs] = useState([]);
  const navigation = useNavigation();


  useEffect(() => {
    getSongsApi("");
  }, []);
  // {'song_id': route.params.Songs.data}
  const getSongsApi = (search) => {
    AsyncStorage.getItem("userInfo").then((user) => {
      if (user) {
        var d = JSON.parse(user);
        let a = new apiDetails(d.token);
        a.getClient(d.token)
          .get(a.get_songs + "?search=" + search)
          .then((response) => {
            setSongs([]);
            if (response.data.status == "200") {
              setSongs(response.data.Songs.data);
            } else {
              // setSongs([])
              // alert("Oops Something went wrong");
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
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[Styles.customScrollview]}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <LinearGradient
        colors={["#E683AF", "#7ACACB", "#77A1D3"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={[Styles.BackgroundGradient, { height: "100%" }]}>
        <InputSearch
          onPress={() => {
            navigation.goBack();
          }}
          // HeaderTitle={'Contact Us'}
          leftImage={Images.all_screen_back_black_arrow_icon}
        />
        <LinearGradient
          colors={constants.AppColor.FLEX_GRADIENT_BACK_COLOR}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[Styles.LinearGradientViewStyle, { height: "100%" }]}>
          {/* /*************************section code start************************* */}
          <View>

            <LinearGradient
              colors={["#F7EFFA", "#FEFAF9", "#FEFAF9"]}
              start={{ x: 1, y: 0 }}
              style={{ height: 50 }}
            >

              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center',
                    marginTop: 5,
                    // backgroundColor:'red',
                    borderRadius: 32,
                    width: Dimensions.get('window').width

                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      marginLeft: 20,
                      paddingTop: 10,
                      color: "#272D37",
                      ...Styles.MEDIUM_16
                    }}
                  >
                    Songs
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      getSongsApi("");
                    }}
                  >
                    <Text
                      style={{
                        color: "#272D37",
                        //  backgroundColor:'red',
                        marginRight: 10,
                        color: "#77A1D3",
                        ...Styles.MEDIUM_16,
                        marginTop: 10
                      }}
                    >
                      View All
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
            <FlatList
              keyExtractor={item => item.id.toString()}
              style={{ backgroundColor: 'white' }}
              data={getSongs}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginVertical: 5, borderBottomWidth: Platform.OS === 'ios' ? 0.3 : 0.5, borderColor: '#272D37', padding: 5 }}>
                    <Image
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 60,
                        marginStart: 10,
                      }}
                      source={{
                        uri: apiDetails.publicImage + item.cover_photo,
                      }}
                    />
                    <View style={{ marginStart: 10, borderBottomColor: '#272D37', }}>
                      <View>
                        <Text numberOfLines={1} style={{ color: "#272D37", ...Styles.MEDIUM_16, color: '#272D37' }}>
                          {item.song}
                        </Text>
                        <Text numberOfLines={1}
                          style={{ color: "#686E76", ...Styles.REGULAR_14, marginTop: 5 }}
                        >
                          {item.lyrics}
                        </Text>
                        <Text
                          style={{ color: "#686E76", ...Styles.REGULAR_14, marginTop: 5 }}
                        >
                          {item.artist}
                        </Text>
                      </View>

                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        //  backgroundColor:'orange',
                        justifyContent: "space-between",
                        alignItems: 'center',
                      }}
                    >
                      <TouchableOpacity style={styles.roundedButtons}>
                        <Text style={{ color: "white", ...Styles.REGULAR_15, justifyContent: 'center', alignItems: 'center' }}>Sing</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                </View>
              )}
            />

          </View>


          {/* /*************************section code end************************* */}

          {/* /*************************section code end************************* */}
        </LinearGradient>

      </LinearGradient>
      {/* </TouchableWithoutFeedback>
      </KeyboardAvoidingView> */}
    </SafeAreaView>
  );


}





// return (
//   <SafeAreaView>
//     <LinearGradient
//       colors={["#E683AF", "#7ACACB", "#77A1D3"]}
//       start={{ x: 1, y: 0 }}
//       end={{ x: 0, y: 0 }}
//       style={{ marginTop: -20, height: "110%" }}
//     >
//       <StatusBar
//         animated={true}
//         translucent
//         backgroundColor="transparent"
//         barStyle={"light-content"}
//       />
//       <View
//         style={[
//           {
//             // backgroundColor:'green',
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "center",
//             height: normalize(60),
//             marginTop: normalize(50),
//           },
//         ]}
//       >
//         <View
//           style={[
//             {
//               // backgroundColor:'green',
//               flexDirection: "row",
//               alignItems: "center",
//               // justifyContent:"center",
//               marginHorizontal: normalize(25),
//               width: "90%",
//               height: normalize(60),
//             },
//           ]}
//         >
//           <TouchableOpacity
//             onPress={() => {
//               navigation.goBack();
//             }}
//           >
//             <Image
//               style={[
//                 {
//                   width: normalize(25),
//                   height: normalize(25),
//                   tintColor: "#fff",
//                 },
//               ]}
//               resizeMode="contain"
//               source={Images.back_icon}
//             />
//           </TouchableOpacity>
//           <TextInput
//             style={[
//               {
//                 // backgroundColor:"red",
//                 height: normalize(50),
//                 marginLeft: normalize(20),
//                 fontSize: normalize(20),
//                 color: "#fff",
//               },
//             ]}
//             // onEndEditing={searcUserApi}
//             placeholderTextColor="white"
//             placeholder="Search for songs, singers, groups"
//             onChangeText={(value) => getSongsApi(value)}
//           />
//         </View>
//       </View>
//       {/* <View
//         style={[
//           styles.customHeader,
//           { height: "10%", width: "100%", flexDirection: "row" },
//         ]}
//       >
//         <TouchableOpacity
//           onPress={() => {
//             navigation.goBack("SearchForSongs");
//           }}
//           style={{ marginTop: "10.9%" }}
//         >
//           <Image
//             style={{
//               width: 20,
//               height: 20,
//               marginLeft: 20,
//               tintColor: "#FFF",
//             }}
//             source={Images.back_icon}
//           />
//         </TouchableOpacity>
//         <TextInput
//           style={{  marginStart: 16, fontSize: 18 }}
//           placeholderTextColor="white"
//           placeholder="Search for songs, singers, groups"
//         />
//       </View> */}
//       <View>
//         <LinearGradient
//           colors={["#F7EFFA", "#FEFAF9", "#FEFAF9"]}
//           start={{ x: 1, y: 0 }}
//           style={{ marginTop: 10, height: 50 }}
//         >
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//               alignItems:'center',
//               marginTop: 5,
//               borderRadius:32

//             }}
//           >
//             <Text
//               style={{
//                 flex: 1,
//                 marginLeft: 20,
//                 paddingTop: 10,
//                 color: "black",
//                 fontSize: 16,
//               }}
//             >
//               Songs
//             </Text>
//             <TouchableOpacity
//               onPress={() => {
//                 getSongsApi("");
//               }}
//             >
//               <Text
//                 style={{
//                   marginLeft: 20,
//                   color: "black",
//                   alignSelf: "flex-end",
//                   marginRight: 10,
//                   color: "#77A1D3",
//                   fontSize: 14,
//                   marginTop:10
//                 }}
//               >
//                 View All
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </LinearGradient>
//       </View>
//       <View style={[styles.Flex_View_Style]}>
//         <LinearGradient
//           colors={constants.AppColor.FLEX_GRADIENT_BACK_COLOR}
//           start={{ x: 1, y: 0 }}
//           end={{ x: 0, y: 1 }}
//           style={[styles.Linear_Gradient_Style]}
//         >
//           <FlatList
//             contentContainerStyle={{ paddingBottom: 20, paddingTop: 21 }}
//             data={getSongs}
//             showsVerticalScrollIndicator={false}
//             renderItem={({ item }) => (
//               <View>
//                 <View style={styles.background_style}>
//                   <Image
//                     style={{
//                       width: 60,
//                       height: 60,
//                       borderRadius: 60,
//                       marginStart: 10,
//                     }}
//                     source={{
//                       uri: apiDetails.publicImage + item.cover_photo,
//                     }}
//                   />
//                   <View style={{ marginStart: 10 }}>
//                     <Text style={{ color: "#272D37", fontSize: 16 }}>
//                       {item.song}
//                     </Text>
//                     <Text
//                       style={{ color: "#686E76", fontSize: 14, marginTop: 5 }}
//                     >
//                       {item.lyrics}
//                     </Text>
//                     <Text
//                       style={{ color: "#686E76", fontSize: 14, marginTop: 5 }}
//                     >
//                       {item.artist}
//                     </Text>
//                   </View>
//                   {follow_button}
//                 </View>
//                 <View
//                   style={{
//                     height: 1,
//                     marginLeft: 60,
//                     backgroundColor: "#E4DDE5",
//                     width: "100%",
//                     marginBottom: 10,
//                   }}
//                 />
//               </View>
//             )}
//           />
//         </LinearGradient>
//       </View>
//     </LinearGradient>
//   </SafeAreaView>
// );

const styles = StyleSheet.create({
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
  },
  customHeader: {
    ...Platform.select({
      ios: {},
      android: {
        marginTop: 30,
      },
      default: {},
    }),
  },
  heading: {
    color: "#272D37",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    // fontFamily: 'sp_bold',
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
  root: {
    height: Dimensions.get("window").height - 80,
    flex: 1,
  },

  roundedButtons: {
    borderColor: "#272D37",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    width: 70,
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
    backgroundColor: 'red'

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

export default SearchForSongs;
