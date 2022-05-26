

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
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import Images from "../assets/Images";
import normalize from "react-native-normalize";
import constants from "../assets/constants";
import apiDetails from "../api/AllApis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import SubscriptionPlan from "./SubscriptionPlan";
import { EmptyCard } from "./Components/EmptyCard";
import { EmptyCardImage } from "./Components/EmptyCardImage";
import { set } from "react-native-reanimated";
import Styles from "../constants/Styles";
import { HeaderModel } from "./Components/NewModelView";

const SearchUsersByName = ({ navigation, route }) => {
    var userDetails = {};
    const a = new apiDetails();
    const [show, setShow] = useState(false);
    const [searchListData, setSearchListData] = useState([])
    const [listBRender, setListBRender] = useState(false); 
    const [loadApi, setLoadApi] = useState(false);
    var typeValue = ""; 

    /****************************search api code here***************************** */
  
    const searchUserApi = (value = "") => {  
        AsyncStorage.getItem('userInfo').then((user) => {
            if (user) {
                var d = JSON.parse(user);
                userDetails = d;
                a.getClient(userDetails.token)
                    .post(a.searchusers, { 'user_id': userDetails.id, 'search_keyword': value  })
                    .then(response => { 
                        if (response.data.status == "200") { 
                            setSearchListData(response.data.data)
                        } else {
                            setSearchListData([])
                        }
                    })
            }

        });
    } 

    const apiCallForFollower = (item, index) => {
        // setShow(true);
        a.getClient(userDetails.token)
            .post(a.post_add_follower, {
                'user_id': userDetails.id,
                'follower_id': item
            })
            .then(response => {
                setShow(false);
                if (response.data.status == "200") {
                    updateFollowersSelection(index)
                } else if (response.data.status == "201") {
                    console.log(response.data.msg);
                    alert(response.data.msg);
                } else {
                    alert('Oops something went wrong');
                }
            })
    }

    if(!loadApi){
        setLoadApi(true)
        searchUserApi("") 
    }

    /****************************search api code here***************************** */
    return (
        <SafeAreaView>
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
                {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
                <LinearGradient
                    colors={["#E683AF", "#7ACACB", "#77A1D3"]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    style={[Styles.BackgroundGradient]}>

                    <View style={[{
                        //  backgroundColor:'orange',
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        width: Dimensions.get('window').width,
                        height: 40,
                        marginTop: Platform.OS === 'ios' ? 50 : 50
                    }]}>
                        <View style={[{
                            //  backgroundColor:'green',
                            flexDirection: "row",
                            alignItems: "center",
                            flex: 1,
                            justifyContent: "center",
                            height: normalize(60),
                        }]}>
                            <TouchableOpacity
                                style={{ marginLeft: 10 }}
                                onPress={() => {
                                    navigation.goBack()
                                }}>
                                <Image
                                    style={[{
                                        width: 28,
                                        height: 28,
                                        tintColor: '#fff'
                                    }]}
                                    resizeMode="contain"
                                    source={Images.all_screen_back_black_arrow_icon}
                                />
                            </TouchableOpacity>
                            <TextInput
                                style={[Styles.REGULAR_19, {
                                    // backgroundColor:"red",
                                    height: normalize(60),
                                    marginLeft: normalize(20),
                                    justifyContent: "center",
                                    color: '#fff',
                                    flex: 1,
                                    lineHeight: 22
                                }]}  
                                placeholderTextColor="#FFFFFF"
                                placeholder="Singer Usernames..."
                                onChangeText={(value) => typeValue = value}
                            />

                            <TouchableOpacity
                                style={{ marginRight: 10 }}
                                onPress={() => {
                                    searchUserApi(typeValue)
                                }}>
                                <Image
                                    style={[{
                                        width: 20,
                                        height: 20,
                                        tintColor: '#fff',
                                        margin: 10
                                    }]}
                                    resizeMode="contain"
                                    source={Images.search}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.lower_view}>
                        <LinearGradient
                            colors={["#F7EFFA", "#FEFAF9"]}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={[{
                                ...Platform.select({
                                    ios: {
                                        height: Dimensions.get('window').height - 75,
                                        alignItems: "center",
                                        paddingBottom: 20
                                    },
                                    android: {
                                        height: Dimensions.get('window').height - 60,
                                        alignItems: "center",
                                        paddingBottom: 20
                                    }
                                })
                            }]}
                        >
                            {/* /************************************* */}
                            <FlatList
                                // refreshControl={
                                //     <RefreshControl
                                //         refreshing={followRefresh}
                                //         onRefresh={() => { route.params?.screenName && route.params?.screenName == "follow" ? getFollowingList() : getFollowerList() }}
                                //     />
                                // }
                                extraData={listBRender}
                                contentContainerStyle={{ paddingBottom: 20 }}
                                data={searchListData}
                                keyExtractor={item => item.id.toString()}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={<EmptyCardImage source={Images.add_friends} />}
                                renderItem={({ item, index }) => (
                                    <View  >
                                        <TouchableOpacity onPress={() => {
                                            const data = {
                                                receiver_id: item.id,
                                                sender_id: userDetails.id,
                                                profile: item
                                            }
                                            navigation.navigate("MessagesScreen",
                                                {
                                                    "userData": data,
                                                    'listShow': 'yes'
                                                });
                                        }}>

                                            <View style={[Styles.SameContainerStyle]}>
                                                <View
                                                    style={[{
                                                        //    backgroundColor:"green",
                                                        flexDirection: "row",
                                                        height: 70,
                                                        //  width:Dimensions.get('window').width*0.9353,
                                                        flex: 1
                                                    }]}
                                                >
                                                    <View style={[{
                                                        //    backgroundColor:"yellow",
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
                                                            // resizeMode="contain"
                                                            source={item.image && item.image !== null ? { uri: apiDetails.publicImage + item.image } : Images.girl_img}
                                                        // source={Images.girl_img}
                                                        />
                                                    </View>
                                                    <View style={[{
                                                        // backgroundColor:"orange",
                                                        flexDirection: "row",
                                                        flex: 1,
                                                        width: Dimensions.get('window').width,
                                                        borderBottomWidth: 0.5,
                                                        borderColor: "#E4DDE5"
                                                    }]}>
                                                        <View style={[{
                                                            ...Platform.select({
                                                                ios: {
                                                                    //  backgroundColor:"blue",
                                                                    flex: 1,
                                                                    height: 70,
                                                                    justifyContent: "center",
                                                                    paddingLeft: 10
                                                                },
                                                                android: {
                                                                    //  backgroundColor:"blue",
                                                                    flex: 1,

                                                                    height: 70,
                                                                    justifyContent: "center",
                                                                    paddingLeft: 10
                                                                },
                                                            })
                                                        }]}>
                                                            <Text numberOfLines={1} style={[Styles.MEDIUM_16, { color: "#272D37", lineHeight: 22 }]}>
                                                                {item.firstname} {item.lastname}
                                                            </Text>
                                                            <Text numberOfLines={1} style={[Styles.REGULAR_15, { color: "#686E76", lineHeight: 21, marginTop: 5 }]}>@{item.username}
                                                            </Text>
                                                        </View>
                                                        <View style={[{
                                                            //  backgroundColor:"grey",
                                                            width: 100,
                                                            height: 70,
                                                            justifyContent: "center",
                                                            alignItems: "center"
                                                        }]}>
                                                            {item.follow == 0 ? (
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
                                                                        // console.log(item.id);
                                                                        apiCallForFollower(item.id, index)
                                                                    }}>
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
                                                                        // updateFollowersSelection(index) 
                                                                    }}>
                                                                    <Text numberOfLines={1} style={[Styles.REGULAR_15, { color: "#272D37", lineHeight: 22 }]}>Following</Text>
                                                                </TouchableOpacity>
                                                            )}
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                            {/* /************************************* */}
                        </LinearGradient>
                    </View>
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
                {/* </TouchableWithoutFeedback> */}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );


}


const styles = StyleSheet.create({
    Flex_View_Style: {
        flex: 1,
        // height:'100%',
        borderTopLeftRadius: normalize(50),
        borderTopRightRadius: normalize(50),
        backgroundColor: "red",
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
    background_style: {
        // flex: 1,
        // height: '100%',
        width: normalize(350),
        // backgroundColor:'green',
        marginBottom: 10,
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        marginHorizontal: normalize(20),
        marginVertical: normalize(20)
    },
    roundedButtons: {
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 20,
        paddingRight: 20,
        borderColor: "#272D37",
        borderRadius: 50,
        borderWidth: 1,
        height: 35
    },
    lower_view: {
        ...Platform.select({
            ios: {
                overflow: "hidden",
                marginTop: 2,
                flex: 1,
            },
            android: {
                overflow: "hidden",
                marginTop: 2,

                flex: 1,
            }
        })
    },
});

export default SearchUsersByName