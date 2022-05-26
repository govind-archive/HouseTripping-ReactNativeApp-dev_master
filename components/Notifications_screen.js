import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, SafeAreaView, StatusBar, FlatList, Platform, useWindowDimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import apiDetails from '../api/AllApis';
import Svg, { Path, G } from 'react-native-svg';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import constants from '../assets/constants';
import Styles from '../constants/Styles';
import { HeaderModel, NewIconHeaderModel } from './Components/NewModelView';
import Images from '../assets/Images';
import Contants from '../constants/Contants';
import { RFValue } from 'react-native-responsive-fontsize';
import { scale } from 'react-native-size-matters';
import normalize from 'react-native-normalize';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Moment from "moment";
import Header from "./common/Header";
import LoadingLottie from "./anim/LoadingLottie";

export default function Notifications_screen({ navigation, route, user_id }) {
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState();
    const [notificationActivity, setNotificationActivity] = useState([]);
    const [notificationChallange, setNotificationChallange] = useState([]);
    const [apiLoaded, setApiLoaded] = useState(false);
    const [show, setShow] = useState(true);

    var apiLoaded_ = false;

    function multipleImages(item) {
        var e = <View style={{ flexDirection: "row" }}>
            <Image style={{ width: 30, height: 30, borderRadius: 25, borderColor: "#FFFFFF", borderWidth: 1.5 }} source={require('../assets/images/girl_img.png')} />
            <Image style={{ width: 30, height: 30, marginLeft: -10, borderRadius: 25, borderColor: "#FFFFFF", borderWidth: 1.5 }} source={require('../assets/images/girl_img.png')} />
            <Image style={{ width: 30, height: 30, marginLeft: -10, borderRadius: 25, borderColor: "#FFFFFF", borderWidth: 1.5 }} source={require('../assets/images/girl_img.png')} />
            <Image style={{ width: 30, height: 30, marginLeft: -10, borderRadius: 25, borderColor: "#FFFFFF", borderWidth: 1.5 }} source={require('../assets/images/girl_img.png')} />
            <View style={{ marginLeft: -10 }}>
                <Image style={{ width: 30, height: 30, borderRadius: 25, borderColor: "#FFFFFF", borderWidth: 1.5 }} source={require('../assets/images/girl_img.png')} />
                <View style={{ width: 30, height: 30, position: "absolute", backgroundColor: "#000", borderRadius: 25, borderColor: "#FFFFFF", borderWidth: 1.5, opacity: 0.5 }}>
                </View>
                <View style={{ width: 30, height: 30, position: "absolute", borderRadius: 25, borderColor: "#FFFFFF", borderWidth: 1.5, justifyContent: "center" }}>
                    <Text style={{ textAlign: "center", color: "#fff", fontSize: 11 }}>
                        +99
                    </Text>
                </View>
            </View>
        </View>;
        return e;
    }

    const showTimeAgo = (time) => {
        time = time.replace("T", " ");
        time = time.replace("000000Z", "000");
        var tem_d = Moment(time).fromNow();
        return tem_d;
    };

    const apiCall = (user) => {
        setApiLoaded(true);
        //For Challange
        var d = JSON.parse(user);
        let a = new apiDetails(d.token);
        a.getClient(d.token)
            .post(a.challenge_Notifications, {})
            .then((response) => {
                
                setShow(false)
                if (response.data.status == "200") {
                    if (Object.keys(response.data.data).length == 0) {
                    } else {
                        setNotificationChallange(response.data.data);
                    }
                } else {
                    console.log(response.data);
                }
            });
    }

    const apiCallActivity = (user) => {
        setApiLoaded(true);
        //For Activity
        var d = JSON.parse(user);
        let a = new apiDetails(d.token);
        a.getClient(d.token).post(a.activity_Notifications, {}).then((response) => {
            setShow(false)
            if (response.data.status == "200") {
                setNotificationActivity(response.data.data);
            } else {
                alert(response.data.msg);
            }
        });
    }

    if (!apiLoaded) {
        AsyncStorage.getItem("userInfo").then((user) => {
            if (user) {
                apiCall(user);
                apiCallActivity(user);
            }
        });
    }

    //For Challange
    FirstRoute = () => (
        <View style={{ marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 20 }}>
            <FlatList
                contentContainerStyle={{ paddingBottom: 20 }}
                data={notificationChallange}
                ListEmptyComponent={
                    <Text style={{
                        alignContent: "center",
                        alignSelf: "center",
                        alignItems: "center"
                    }}>No Data Found</Text>
                }
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => {
                    return "" + item.id
                }}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {
                        // var data = {
                        //     receiver_id: item.id,
                        //     sender_id: userData.id,
                        //     profile: item
                        // }
                        // navigation.navigate("MessagesScreen",
                        //     { "userData": data });
                    }}>
                        <View key={item.id}>
                            <View style={styles.background_style}>
                                <Image style={{ top: 0, alignSelf: "baseline", width: 60, height: 60, borderRadius: 30, marginRight: 20 }} source={require('../assets/images/congrats.png')} />
                                <View style={{ width: "79%" }}>
                                    <Text>
                                        <Text numberOfLines={1} style={[Styles.MEDIUM_15, { lineHeight: 22, color: "#272D37", }]}>Congratulations Camila ! </Text>
                                        <Text numberOfLines={1} style={[Styles.REGULAR_15, { lineHeight: 21, color: "#686E76", }]}>you won this Challenge</Text>
                                    </Text>

                                    <Text style={[Styles.REGULAR_13, { lineHeight: 17, color: "#B3B6BA", marginTop: 5 }]}>
                                        2 days ago
                                    </Text>

                                    <View style={{ flexDirection: 'row', marginTop: 10, backgroundColor: "#FFF", padding: 10, borderRadius: 10, borderColor: "#272D371A", borderWidth: 1 }}>
                                        <View style={{ flex: 0 }}>
                                            <Image style={{ width: 50, height: 50, borderRadius: 23 }} source={require('../assets/images/girl_img.png')} />
                                            <Image style={{ width: 20, height: 20, position: "absolute", right: 0, bottom: 30 }} source={require('../assets/images/start_challange_list.png')} />
                                        </View>

                                        <View style={{ flex: 1, marginLeft: 5 }}>
                                            <Text style={[Styles.MEDIUM_13, { lineHeight: 17, color: "#272D37", marginBottom: 10 }]}>
                                                Know No Better (song)
                                            </Text>
                                            <Text style={[Styles.REGULAR_11, { lineHeight: 15, color: "#686E76", marginBottom: 10 }]}>
                                                Challange End on 20 Sept.
                                            </Text>

                                            {/* {multipleImages()} */}
                                        </View>

                                        <View style={{ flex: 0 }}>
                                            <Text style={[Styles.BOLD_12, { lineHeight: 17, color: "#272D37", fontWeight: "bold" }]}>
                                                $50
                                            </Text>
                                        </View>

                                    </View>
                                </View>
                            </View>

                            <View style={{ height: 1, marginLeft: 60, backgroundColor: "#E4DDE5", width: "100%", marginBottom: 10 }} />
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );

    //For Activity
    SecondRoute = () => (
        <View style={{ marginLeft: 30, marginRight: 30, marginTop: 20 }}>
            <FlatList
                contentContainerStyle={{ paddingBottom: 20 }}
                data={notificationActivity}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => {
                    return "" + item.id
                }}
                ListEmptyComponent={
                    <Text style={{
                        alignContent: "center",
                        alignSelf: "center",
                        alignItems: "center"
                    }}>No Data Found</Text>
                }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{ marginBottom: 5 }}
                        onPress={() => {
                            navigation.navigate("User_Profile", {
                                user_id: item.action_userid,
                            });
                        }}>
                        <View key={item.id}>
                            <View style={styles.background_style_second}>
                                <Image style={{ width: 60, height: 60, borderRadius: 30, marginRight: 5 }}
                                    source={{ uri: apiDetails.publicImage + "" + item.image }}
                                />
                                <View style={[{
                                    ...Platform.select({
                                        ios: {
                                            width: "100%",
                                        },
                                        android: {
                                            width: "100%",
                                        }
                                    })
                                }]}>
                                    <Text>
                                        <Text numberOfLines={1} style={[Styles.MEDIUM_15, { lineHeight: 21, color: "#272D37", }]}>{item.title.split("####")[0]} </Text>
                                        <Text style={[Styles.REGULAR_15, { color: "#686E76", fontSize: 15 }]}>{item.title.split("####")[1].charAt(0).toUpperCase() + item.title.split("####")[1].slice(1)}</Text>
                                    </Text>

                                    <Text style={[Styles.REGULAR_13, { lineHeight: 17, color: "#B3B6BA", marginTop: 5 }]}>
                                        {showTimeAgo(item.created_at)}
                                    </Text>
                                </View>
                                {/* <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                                    <TouchableOpacity style={styles.roundedButtonsFilled}>
                                        <Text numberOfLines={1} style={[Styles.REGULAR_15, { lineHeight: 17, color: "#ffffff" }]}>
                                            Follow
                                        </Text>
                                    </TouchableOpacity>
                                </View> */}
                            </View>
                            <View style={{ height: 1, marginLeft: 60, backgroundColor: "#E4DDE5", width: "100%", marginBottom: 5, marginTop: 5 }} />
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Challenge Activity' },
        { key: 'second', title: 'Activity' },
    ]);
    return (
        <View >

            <Header />

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
                    <HeaderModel
                        leftimgstyle={[{
                            width: 20,
                            height: 20
                        }]}
                        rightimgstyle={[{
                            width: 20,
                            height: 20
                        }]}
                        leftImage={Images.search}
                        rightImage={Images.message}
                        HeaderTitle='Notification'
                        onPress={() => {
                            navigation.navigate("SearchForSongs");
                        }}
                        RightPress={() => {
                            navigation.navigate("ChatList",
                                { "userData": userData });
                        }}
                    />

                    <LinearGradient
                        colors={constants.AppColor.FLEX_GRADIENT_BACK_COLOR}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={[{
                            ...Platform.select({
                                ios: {
                                    height: Dimensions.get('window').height - 150,
                                    marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT),
                                    borderRadius: 40,
                                    // borderBottomLeftRadius: 0,
                                    // borderBottomRightRadius: 0,
                                    // paddingTop: 55,
                                    paddingBottom: 20,
                                    // alignItems: 'center'
                                    //    paddingHorizontal:RFValue(25,Contants.DesignCanvas.HEIGHT),
                                },
                                android: {
                                    height: Dimensions.get('window').height - 80,
                                    // height:Dimensions.get('window').height -110,
                                    marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT),
                                    borderTopLeftRadius: normalize(50),
                                    borderTopRightRadius: normalize(50),
                                    // paddingTop: 40,
                                    // paddingBottom: 20,
                                    // alignItems: 'center'
                                    // paddingHorizontal:RFValue(25,Contants.DesignCanvas.HEIGHT),

                                }
                            })
                        }]}>
                        {/* <ScrollView showsVerticalScrollIndicator={false} style={[Styles.customScrollview]}> */}
                        {/* /*************************section code start************************* */}
                        <TabView
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            initialLayout={{ width: layout.width }}
                            renderTabBar={props => <TabBar {...props}
                                renderLabel={({ route, color }) => (
                                    <Text style={[Styles.MEDIUM_16, { color: '#272D37', lineHeight: 22, margin: 8 }]} >
                                        {route.title}
                                    </Text>
                                )}
                                indicatorStyle={{ backgroundColor: '#E683AF', height: 2 }}
                                style={{
                                    backgroundColor: '#F7EFFA', borderTopLeftRadius: 30,
                                    borderTopRightRadius: 30,
                                }} />
                            }
                        />
                        {/* /*************************section code end************************* */}
                        {/* </ScrollView> */}
                    </LinearGradient>
                </LinearGradient>
                {/* </TouchableWithoutFeedback> */}
            </KeyboardAvoidingView>

            {show &&
                <View style={{ 
                    backgroundColor: "#ffffffB3",
                    zIndex: 105,
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    justifyContent: "center"
                }}>
                    <LoadingLottie />
                </View>
            }

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
    roundedButtonsFilled: {

        borderColor: "#272D37",
        backgroundColor: "#272D37",
        borderRadius: 50,
        borderWidth: 1,
        height: 35,
        width: 80,
        justifyContent: "center",
        alignItems: 'center'

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
        fontSize: 16,
        marginBottom: 20,
        color: '#272D37',

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
        flex: 1,
        marginBottom: -10,
        marginLeft: 10,
        marginRight: 25,
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center"
    },
    background_style_second: {
        flex: 1,
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        // backgroundColor:"green"
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
        height: "100%",
        borderRadius: 25
    },
    linerGradient_background: {
        borderRadius: 25,
        width: "100%",
        height: "100%",
        padding: 2
    },
    lower_view: {
        overflow: 'hidden',
        flex: 1,
        borderRadius: 45,
    },
    heading_top: {
        color: '#FFF',
        fontSize: 18,
        // marginTop: 22,
        justifyContent: 'center',
        textAlign: 'center',
        flex: 1,
        marginRight: "0%",
        marginLeft: "0%"
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
    }

});