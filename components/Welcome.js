import React, { useState } from 'react';
import { StyleSheet, View, Text, Animated, SafeAreaView, TouchableOpacity, Image, ImageBackground, Dimensions, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import Welcome_challenges from './Welcome_challenges';
import Welcome_superstar from './Welcome_superstar';
import PagerView from 'react-native-pager-view';
import Welcome_group from './Welcome_group';
import Welcome_solo from './Welcome_solo';
import constants from '../assets/constants';
import Images from '../assets/Images';
import { RFValue } from 'react-native-responsive-fontsize';
import Styles from '../constants/Styles';

var viewPagerCustom;
var currentPage = 0;
// var setCurrentPage;
// var [currentPage, setCurrentPage];
function changePage(args) {
    if (args == "prev") {
        if (currentPage <= 0) {

        } else {
            currentPage = currentPage - 1;
        }
    } else {
        if (currentPage >= 3) {
            currentPage = 0;
        } else {
            currentPage = currentPage + 1;
        }
    }
    if (viewPagerCustom != null) {
        viewPagerCustom.setPage(currentPage);
    }
}

function Welcome({ navigation }) {
    const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userInfo', (error, result) => {
                if (result) {
                    var d = JSON.parse(result);
                    navigation.replace("HomeFeed", { "userData": d })
                    // navigation.navigate("HomeFeed", { "userData": d }); 
                } else {
                    console.log("New user");
                }
            });
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
            console.log(e);
        }
    }

    getData();

    setInterval(() => {
        changePage("")
    }, 4000);

    return (
        <SafeAreaView style={styles.pagerView}>
            <ImageBackground
                style={[{
                    ...Platform.select({
                        ios: {
                            width: Dimensions.get("window").width,
                            // height: Dimensions.get('window').height
                            flex: 1,
                            marginTop: -40
                        },
                        android: {
                            width: Dimensions.get("window").width,
                            // height: Dimensions.get('window').height
                            flex: 1,
                        }
                    })


                }]}
                source={Images.all_screen_bg_image}
            >
                <AnimatedPagerView style={styles.animatedPagerView} initialPage={0}
                    ref={(viewpager) => { viewPagerCustom = viewpager }}>
                    <View key="1">
                        <Welcome_solo onParaMeter={(t) => navigation.navigate(t, {
                            "type": "user"
                        })} />
                    </View>
                    <View key="2">
                        <Welcome_group onParaMeter={(t) => navigation.navigate(t, {
                            "type": "group"
                        })} />
                    </View>
                    <View key="3">
                        <Welcome_challenges onParaMeter={(t) => navigation.navigate(t, {
                            "type": "group"
                        })} />
                    </View>
                    <View key="4">
                        <Welcome_superstar onParaMeter={(t) => navigation.navigate(t, {
                            "type": "group"
                        })} />
                    </View>
                </AnimatedPagerView>
                <View style={[{
                    // backgroundColor:"#F7EFFA",
                    // backgroundColor:"red",
                    width: Dimensions.get('window').width,
                    // height:Dimensions.get('window').height*0.2133,
                    justifyContent: "center",
                    alignItems: "center",
                }]}>
                    <View style={[{
                        ...Platform.select({
                            ios: {
                                // backgroundColor:"#F7EFFA",
                                // backgroundColor:"yellow",
                                width: Dimensions.get('window').width * 0.8856,
                                height: Dimensions.get('window').height * 0.3033,
                                justifyContent: "flex-end",
                                alignItems: "center",
                                paddingBottom: 20
                                // marginBottom:RFValue(20, 812)
                            },
                            android: {
                                // backgroundColor:"#F7EFFA",
                                // backgroundColor:"yellow",
                                width: Dimensions.get('window').width * 0.8856,
                                height: Dimensions.get('window').height * 0.3333,
                                justifyContent: "flex-end",
                                alignItems: "center",
                                paddingBottom: 10
                                // marginBottom:RFValue(10, 812)
                            }
                        })
                    }]}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.loginButton}
                            onPress={() => {
                                navigation.navigate("Login", {
                                    "type": "user"
                                })
                            }} >
                            <Text style={[{ color: constants.AppColor.TEXT_COLOR, fontSize: 16, fontFamily: 'MEDIUM' }]}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[styles.loginButton, {}]} onPress={() => {
                                navigation.navigate("SignUp", {
                                    "type": "user"
                                })
                            }}>
                            <LinearGradient
                                style={styles.LinearButtonStyle}
                                colors={constants.AppColor.LINEAR_GRADIENT_COLOR_BUTTON}
                                start={{ x: 1, y: 0 }}
                                end={{ x: 0, y: 1 }}
                            >
                                <Text style={[Styles.MEDIUM_15, { color: '#fff', fontSize: 16, fontFamily: 'MEDIUM' }]}>Sign Up</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    pagerView: {
        // backgroundColor: 'red',
        width: Dimensions.get('window').width,
        flex: 1,
        // height: Dimensions.get('window').height
        // marginBottom: 10,
    },
    animatedPagerView: {
        ...Platform.select({
            ios: {
                // backgroundColor: 'yellow',
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height * 0.6969,
                // flex: 1,
                marginTop: -10
            },
            android: {
                // backgroundColor: 'yellow',
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height * 0.7169,
                // flex: 1,
            }
        })
    },
    loginButton: {
        backgroundColor: 'transparent',
        borderRadius: RFValue(16, 812),
        borderWidth: 1.5,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.8456,
        height:50,
        // marginLeft: 40,
        // marginRight: 40,
        // justifyContent: 'space-between',
        // alignSelf: 'stretch',
        borderColor: "#77A1D3",
    },
    LinearButtonStyle: {
        // backgroundColor: '#F7EFFA',
        borderRadius: RFValue(16, 812),
        // borderWidth: 1.5,
        // marginBottom: 10,
        justifyContent: "center",
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.8456,
        height: 50,
        // marginLeft: 40,
        // marginRight: 40,
        // justifyContent: 'space-between',
        // alignSelf: 'stretch',
        // borderColor: constants.AppColor.BUTTON_BORDER_COLOR,
    },
    signup: {
        backgroundColor: '#F7EFFA',
        borderRadius: 10,
        marginLeft: 40,
        marginRight: 40,
        justifyContent: 'space-between',
        alignSelf: 'stretch',
    },
    center: {

        alignSelf: 'center',
        // margin: 15,

        justifyContent: 'center'
    }
});

export default Welcome;