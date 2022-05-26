import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, TextInput, SafeAreaView, StatusBar, FlatList, Platform, RefreshControl, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import apiDetails from '../api/AllApis';
import Svg, { Path, G } from 'react-native-svg';
import FirebaseCode from '../FirebaseCode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingLottie from "./anim/LoadingLottie";
import constants from '../assets/constants';
import { RFValue } from 'react-native-responsive-fontsize';
import Constant from '../constants/Contants';
import Styles from '../constants/Styles';
import Images from "../assets/Images";
import { HeaderModel, HelpScreenModel } from "./Components/NewModelView";
import Header from "./common/Header"; 
export default function ChatList({ navigation, route }) {
    const [data, setData] = useState();
    const [refreshing, setRefreshing] = useState(false);

    const [userList, setUserList] = useState();
    const [userListTmps, setUserListTmps] = useState();
    const [show, setShow] = useState(true);
    const [showLoading, setShowLoading] = useState(true);
    var tmp_list = [];
    var user_ids = "";
    var list = <View></View>;
    const [userData, setUserData] = useState();
    var userDetails = {};

    //***********************************************************************/
    if (!userDetails.hasOwnProperty('id')) {
        AsyncStorage.getItem('userInfo').then((user) => {
            if (user) {
                var d = JSON.parse(user);
                userDetails = d;

                if (data == undefined) {
                    FirebaseCode.listMyChat(userDetails.id, setData);
                    setUserListTmps(true);
                    list = <View></View>;
                } else {
                    const apiCall = () => {

                        let a = new apiDetails(d.token)

                        a.getClient(d.token)
                            .post(a.getuserslist, {
                                "user_ids": user_ids
                            })

                            .then(response => {
                                if (response.data.status == "200") {
                                    for (var i in response.data.data.data) {
                                        for (var j in tmp_list) {
                                            if (tmp_list[j].receiver_id == response.data.data.data[i]["id"]) {
                                                tmp_list[j].profile = response.data.data.data[i];
                                            }
                                        }
                                    }
                                    setShow(false);
                                    setUserList(tmp_list);
                                    // setRefreshing(false)
                                } else if (response.data.status == "201") {
                                    setShow(false);
                                    setUserList([]);
                                } else {
                                    setShow(false);
                                    alert('Oops something went wrong');
                                }
                            })
                    }
                    if (userList == undefined) {
                        // console.log('userlist------.>',userList);
                        data.forEach(datass => {
                            let datas = datass.val();
                            user_ids = user_ids + "," + datas.receiver_id;
                            var temp_d = {
                                sender_id: datas.sender_id,
                                receiver_id: datas.receiver_id,
                                last_message: datas.last_message,
                                created_on: datas.created_on
                            };
                            tmp_list.push(temp_d)
                        });
                        if (userList == undefined) {
                            apiCall();
                        }
                    }
                }
            }
        });
    }


    function timeAndDate(time) {
        if (time == 124704) {
            return "0";
        }
        var timestemp = new Date(time).toLocaleDateString("en-US");
        return timestemp;
    }

    const loadList = () => {
        if (userList == undefined) {
            return <View>
            </View>;
        } else {
            if (userList.length > 0 && userList[0].profile == undefined) { 
                return <View><Text>No Listing Avaliable</Text></View>;
            } else {
                return <FlatList
                    data={userList}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={
                        <Text style={{
                            alignContent: "center",
                            alignSelf: "center",
                            alignItems: "center"
                        }}>No Chats Found</Text>
                    }
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("MessagesScreen",
                                { "userData": item, 'listShow': 'no' });
                        }}>
                            <View>
                                <View style={styles.background_style}>
                                    <Image style={{ width: 60, height: 60, borderRadius: 20, marginRight: 20 }} source={require('../assets/images/demo_profile.jpg')} defaultSource={require('../assets/images/demo_profile.jpg')} />
                                    {item.profile && <View>

                                        <Text style={{ color: "#272D37", ...Styles.MEDIUM_16, color: '#272D37' }}>
                                            {item.profile.firstname} {item.profile.lastname}
                                        </Text>
                                        <Text style={{ color: "#686E76", ...Styles.REGULAR_14, marginTop: 5 }}>
                                            {item.sender_id == userDetails.id ? "You: " + item.last_message : item.last_message}
                                        </Text>
                                    </View>}


                                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                                        <Text style={{ color: "#A1A3AA", ...Styles.REGULAR_12, color: '#A1A3AA' }}>
                                            {timeAndDate(item.created_on)}
                                        </Text>

                                        {/* <View style={{ justifyContent: 'flex-end' }}>
                                        <View style={{ backgroundColor: "#CE72F6", width: 10, height: 10, borderRadius: 10,marginTop: 20 }}>
                                        </View>
                                    </View> */}
                                    </View>



                                </View>

                                <View style={{ height: 1, marginLeft: 60, backgroundColor: "#E4DDE5", width: "100%", marginBottom: 10 }} />
                            </View>
                        </TouchableOpacity>
                    )}
                />;
            }

        }
    }

    return (
        <View style={{ flex: 1 }}>

             <Header />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <LinearGradient
                        colors={["#E683AF", "#7ACACB", "#77A1D3"]}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 0 }}>
                        <HeaderModel
                            leftimgstyle={[{
                                width: 28,
                                height: 28
                            }]}
                            rightimgstyle={[{
                                width: 18,
                                height: 18
                            }]}
                            onPress={() => {
                                navigation.goBack();
                            }}
                            HeaderTitle={'Messages'}
                            leftImage={Images.all_screen_back_black_arrow_icon}
                            rightImage={Images.add_icon}
                            RightPress={() => {
                                navigation.navigate("Find_friends", {
                                    userData: userDetails
                                });
                            }}
                        />
                        <LinearGradient
                            colors={constants.AppColor.FLEX_GRADIENT_BACK_COLOR}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={[Styles.LinearGradientStyle]}>

                            {/* /*************************section code start************************* */}
                            <View style={[Styles.SameContainerStyle, {width:"100%", height:"100%"}]}>
                                <View style={styles.lower_view}>
                                    <View>
                                        <Text style={styles.heading_following}>All chats</Text>
                                    </View>
                                    {loadList()}
                                </View>
                            </View>
                            {/* /*************************section code end************************* */}
                        </LinearGradient>
                    </LinearGradient>

                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

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
        ...Platform.select({
            ios: {
            },
            android: {
                marginTop: 30
            },
            default: {
            }
        })
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
    imgBackground: {
        width: '100%',
        height: '100%',
    },
    toggleButtons: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        flex: 1
    },
    container: {
        height: "100%",
        width: '100%',
        backgroundColor: '#4B38D3'
    },
    heading: {
        color: '#272D37',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
        // fontFamily: 'sp_bold',
    },
    heading_following: {
        marginBottom: 20,
        ...Styles.REGULAR_16,
        color: '#272D37'
    },
    secondHeading: {
        marginTop: 10,
        color: '#272D37',
        fontSize: 15,
    },
    input: {
        backgroundColor: "#FFF",
        paddingLeft: 15,
        borderRadius: 15,
        textAlign: "center",
        justifyContent: "center",
        marginTop: 10,
        height: 50
    },
    background_style: {
        ...Platform.select({
            ios: {
                // height: '100%',
                width: '100%',
                // backgroundColor:'green',
                flexDirection: "row",

            },
            android: {
                // height: '100%',
                width: '100%',
                marginBottom: 10,
                flexDirection: "row",
            }

        })
    },
    signup: {
        borderRadius: 10,
        marginLeft: 30,
        marginTop: 10,
        marginRight: 30,
        bottom: '-66%',
        height: 50,
        justifyContent: 'space-between',
        alignSelf: 'stretch',
    },
    center: {
        alignSelf: 'center',
        marginLeft: 15,
        marginRight: 15,
        alignContent: "center",
        textAlign: "center",
        alignItems: "center",
        fontSize: 14,
        justifyContent: 'center'
    },
    profile_view: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
        flexDirection: 'column',
        width: 90,
        height: 90,
        alignItems: "center",
        marginRight: 20
    },
    profile_image: {
        borderWidth: 3,
        borderColor: '#4B38D3',
        width: "100%",
        borderRadius: 25
    },
    linerGradient_background: {
        ...Platform.select({
            ios: {
                width: "100%",
                marginTop: -47,
            },
            android: {
                width: "100%",
                height: Dimensions.get('window').height,
            }
        })
    },
    lower_view: {
        borderRadius: 32,
        marginTop: 30,
        width:"100%"
        // backgroundColor:'red'
    },
    heading_top: {
        color: '#FFF',
        fontSize: 20,
        marginTop: 20,
        marginLeft: "15%",
        justifyContent: 'center',
        textAlign: 'center',
        flex: 1,
        marginLeft: "10%",
        marginRight: "15%",
        fontWeight: 'bold'
    },
    profile_name: {
        fontSize: 18,
        fontWeight: '700',
        alignItems: "center",
        color: '#fff'
    },
    profile_username: {
        fontSize: 14,
        alignItems: "center",
        marginTop: 5,
        color: '#C4C3E7'
    },
    zero_common: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 5,
        marginTop: 5,
        fontWeight: 'bold'
    },
    follow_common: {
        color: '#fff',
        fontSize: 14,
        marginRight: 30
    },
    border_middle:
    {
        backgroundColor: '#B3B6BA',
        opacity: 0.3,
        width: "100%",
        height: 1,
        marginTop: 10,
        marginBottom: 20,
        alignSelf: "center"
    },
    linear_gradient_style: {
        ...Platform.select({
            ios: {
                backgroundColor: 'green',

            },
            android: {
                marginTop: -20, height: "120%"
            }
        })
    },
    filterText: {
        color: '#fff',
        ...Styles.BOLD_20
    },
});