import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    StatusBar,
    ScrollView,
    ImageBackground,
    Dimensions,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native"; import apiDetails from '../api/AllApis';
import normalize from 'react-native-normalize';
import Images from '../assets/Images';
import { NormalHeader } from './Components/customHeader';
import { BlurView } from 'expo-blur';
import { RFValue } from 'react-native-responsive-fontsize';
import Constant from '../constants/Contants';
import Styles from '../constants/Styles';
import { HeaderModel, HelpScreenModel } from "./Components/NewModelView";
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

let mobileData;
let username = "";

function apiCall(navigation) {
    if (username.length < 1) {
        alert("Please enter username")
    } else {
        const a = new apiDetails();
        a.api
            .post(a.checkusername, { "username": username })
            .then(response => {
                if (response.data.status == "200") {
                    mobileData.username = username;
                    navigation.navigate("SignUp_smart_password",
                        { "mobileNumber": mobileData });
                } else { 
                    alert(response.data.msg);
                }
            })
    }
}

function SignUp_username({ navigation, route }) {

    if (route.params?.mobileNumber) {
        mobileData = route.params?.mobileNumber
    } else {
        alert("Oops something went wrong please go back");
    }

    return (

        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                translucent
                backgroundColor="transparent"
                barStyle={"light-content"}
            />

            <KeyboardAvoidingView
                style={styles.customScrollview}
            >
                <ScrollView bounces={false} style={styles.customScrollview}
                    showsVerticalScrollIndicator={false}>
                    <ImageBackground
                        style={styles.image_background}
                        source={Images.username_back_image}
                    >
                        {/*****************  Header   ******************/}

                        <View style={[{
                            ...Platform.select({
                                ios: {
                                    marginTop: 20
                                },
                                android: {
                                    marginTop: 30
                                }
                            })
                        }]}>
                            <HeaderModel
                                leftimgstyle={[{
                                    width: 28,
                                    height: 28
                                }]}
                                // rightimgstyle={[{
                                //   width:20,
                                //   height:20
                                // }]}
                                onPress={() => {
                                    navigation.goBack();
                                }}
                                // HeaderTitle={'Help'}
                                leftImage={Images.all_screen_back_black_arrow_icon}
                            />
                        </View>
                        <View style={[{
                            paddingHorizontal: scale(14, Constant.DesignCanvas.HEIGHT),
                        }]}>
                            {/*************** VIEW FULL NAME ************ */}

                            <View style={{
                                marginTop: 60
                            }}>
                                <Image
                                    style={[{
                                        width: 80,
                                        height: 80,
                                    }]}
                                    source={Images.hand_wav_image}
                                    resizeMode="contain"
                                />
                                <View style={[{
                                    paddingBottom: verticalScale(20),
                                    paddingVertical: verticalScale(30,
                                        Constant.DesignCanvas.HEIGHT)
                                }]}>
                                    <Text style={[styles.heading]}>
                                        Pick a Username
                                    </Text>
                                    <View style={[{
                                        // backgroundColor:"green",
                                        paddingVertical: verticalScale(14, Constant.DesignCanvas.HEIGHT)
                                    }]}>
                                        <Text style={[{
                                            color: '#fff',
                                            ...Styles.REGULAR_15
                                        }]}>
                                            Enter the verification code we just sent you{'\n'}on your mobile number.
                                        </Text>
                                    </View>
                                    <View style={[{
                                        //   backgroundColor: "green",
                                        marginTop: RFValue(46, Constant.DesignCanvas.HEIGHT),
                                        // flexDirection:'row',
                                        justifyContent: 'space-between'
                                    }]}>
                                        <View style={{ marginTop: RFValue(10, Constant.DesignCanvas.HEIGHT) }}>
                                            <BlurView intensity={100} style={styles.blur_View}>

                                                <View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
                                                    <Image
                                                        style={styles.view_image}
                                                        source={Images.at_the_rate_image}
                                                        resizeMode={'cover'}
                                                    />
                                                    <TextInput
                                                        style={styles.input}
                                                        placeholderTextColor='#fff'
                                                        placeholder="Enter username"
                                                        autoCapitalize={false}
                                                        onChangeText={(t) => {
                                                            username = t
                                                        }}
                                                    />
                                                </View>
                                            </BlurView>
                                        </View>
                                        {/* <View style={[{
                                            // backgroundColor:"green",
                                            marginTop: normalize(10)
                                        }]}>
                                            <Text style={[{
                                                color: '#FF4643',
                                                fontSize: normalize(18),
                                                ...Styles.REGULAR_15
                                            }]}>
                                                This username is already taken. Please choose{'\n'}another username
                                            </Text>
                                        </View> */}

                                    </View>
                                </View>
                            </View>

                        </View>
                        <View style={styles.button_style}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => { apiCall(navigation) }}>
                                <Image
                                    style={[{
                                        width: normalize(50),
                                        height: normalize(50)
                                    }]}
                                    source={Images.next_page_imgae}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('screen').height,//'100%',
        flex: 1,
    },
    image_background: {
        ...Platform.select({
            ios: {
                height: Dimensions.get('window').height + 25,
                marginTop: 0,
            },
            android: {
                height: Dimensions.get('window').height + 85,
            }
        })
    },
    customScrollview: {
        ...Platform.select({
            ios: {
                marginTop: -30,
                height: Dimensions.get('window').height,
            },
            android: {
                marginTop: -15,
                height: Dimensions.get('window').height + 75,
            },
            default: {
                marginTop: -20,
            },
        }),
    },
    button_style: {
        ...Platform.select({
            ios: {
                justifyContent: 'center',
                alignItems: 'flex-end',
                // marginTop: 230
                // backgroundColor: 'red',
                position: 'absolute',
                bottom: 26,
                right: 16
            },
            android: {
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                // marginTop: 230
                alignSelf: 'flex-end',
                marginBottom: 10,
                // backgroundColor: 'yellow',
                position: 'absolute',
                bottom: 26,
                // backgroundColor: 'red',
                right: 16
            }
        })
    },
    input: {
        ...Styles.REGULAR_18,
        borderRadius: 15,
        // fontSize: 18,
        height: 50,
        color: "#fff"
    },
    view_username: {
        marginTop: 46,
    },
    para: {
        color: '#686E76',
        marginTop: 10,
        fontSize: 15,
        marginRight: "20%"
        // fontFamily: 'sp_regular',
    },
    loginButton: {
        flex: 1,
        borderRadius: 15,
        flexDirection: 'row',
        backgroundColor: '#272D37',
        marginTop: 10,
        marginLeft: 30,
        marginRight: 10,
        alignItems: "center",
        alignSelf: 'stretch',
        borderColor: '#6263F0',
    },
    name_suggest_touc_style: {
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: normalize(110),
        height: normalize(40),
        borderRadius: normalize(25),
        borderColor: '#fff'
    },
    blur_View: {
        ...Platform.select({
            ios: {
                // backgroundColor:'red',
                borderRadius: normalize(15),
                fontSize: 20,
                height: normalize(50),
                overflow: 'hidden',
                width: '100%',
            },
            android: {
                borderRadius: normalize(15),
                fontSize: 20,
                height: normalize(50),
                overflow: 'hidden',
                width: '100%'

            }
        })
        // width: normalize(75) 
        // width:Dimensions.get('window').width*0.9453,
    },
    input: {
        // backgroundColor: "#FFF",
        ...Platform.select({
            ios: {
                borderRadius: normalize(15),
                width: '100%',
                fontSize: 18,
                height: normalize(50),
                color: "#fff",
                paddingLeft: normalize(15),
                ...Styles.REGULAR_18
            },
            android: {
                borderRadius: normalize(15),
                width: '100%',
                fontSize: 18,
                // backgroundColor: 'red',
                height: normalize(50),
                color: "#fff",
                paddingLeft: normalize(15),
                ...Styles.REGULAR_18
            }
        })
    },
    heading: {
        color: '#fff',
        ...Styles.BOLD_28,
        // fontWeight: 'bold',

    },


    view_button_style: {
        ...Platform.select({
            ios: {
                marginTop: RFValue(260, Constant.DesignCanvas.HEIGHT),

            },
            android: {
                marginTop: RFValue(240, Constant.DesignCanvas.HEIGHT),

            }
        })
    },

    view_image: {
        ...Platform.select({
            ios: {
                width: normalize(20),
                height: normalize(20),
                marginLeft: 15
            },
            android: {
                width: normalize(20),
                height: normalize(20),
                marginLeft: 15,
            }
        })
    },

});

export default SignUp_username;