import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, TextInput, StatusBar, ScrollView, ImageBackground, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import apiDetails from '../api/AllApis';
import normalize from 'react-native-normalize';
import Images from '../assets/Images';
import { NormalHeader } from './Components/customHeader';
import { BlurView } from 'expo-blur';
import { RFValue } from 'react-native-responsive-fontsize';
import Constant from '../constants/Contants';
import { HeaderModel, HelpScreenModel } from "./Components/NewModelView";
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Styles from '../constants/Styles';

let mobileData;
let email = "";

const validate = (text, setEmailCheck) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
        email = ""
        setEmailCheck(false);
    }
    else {
        email = text
        setEmailCheck(true);
    }
}

function validEmail(emailCheck) {
    let a = <TouchableOpacity style={{ justifyContent: "center" }} >
        <Image style={{ width: 15, height: 15, alignSelf: "center", justifyContent: "center", alignContent: "center" }} source={require('../assets/images/cross.png')} />
    </TouchableOpacity>
    let b = <TouchableOpacity style={{ justifyContent: "center" }} >
        <Image style={{ width: 15, height: 15, alignSelf: "center", justifyContent: "center", alignContent: "center" }} source={Images.right_image} />
    </TouchableOpacity>

    if (emailCheck == false) {
        return a;
    } else {
        return b;
    }
}

function fireAPi(navigation, emailCheck) {
    if (emailCheck) {
        apiCall(email, navigation);
    } else {
        alert("Please enter valid email");
    }
}

function apiCall(email, navigation) {
    const a = new apiDetails();
    a.api
        .post(a.checkMail, { "email": email })
        .then(response => {
            if (response.data.status == "200") {
                mobileData.email = email;
                navigation.navigate(
                    mobileData.type == "user" ? "SignUp_username" : "SignUp_GroupName",
                    { mobileNumber: mobileData }
                );

            } else {
                console.log(response);
                alert(response.data.msg);
            }
        })
}

function SignUp_email({ navigation, route }) {
    const [emailCheck, setEmailCheck] = useState(false);

    if (route.params?.mobileNumber) {
        mobileData = route.params?.mobileNumber
    } else {
        alert("Oops something went wrong please go back");

    }

    let nav = {
        name: 'SignUp_full_name',
        merge: true,
    };

    if (mobileData.type && mobileData.type == "user") {
        nav = {
            name: 'SignUp_full_name',
            merge: true,
        };
    } else {
        nav = {
            name: 'SignUp_verify_code',
            merge: true,
        };
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
                        source={Images.email_back_image}
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
                                    source={Images.email_Image}
                                    resizeMode="contain"
                                />
                                <View style={[{
                                    paddingBottom: verticalScale(20),
                                    paddingVertical: verticalScale(30,
                                        Constant.DesignCanvas.HEIGHT)
                                }]}>
                                    <Text style={[styles.heading]}>
                                        Enter Email Address
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
                                            <BlurView intensity={100} style={[styles.blur_View]}>
                                                <TextInput
                                                    style={[styles.input]}
                                                    placeholder="Enter email address"
                                                    placeholderTextColor={'white'}
                                                    keyboardType="email-address" 
                                                    onChangeText={(text) => validate(text, setEmailCheck)}
                                                />
                                                {validEmail(emailCheck)}
                                            </BlurView>

                                        </View>
                                        {/* <View>
                                        <BlurView intensity={100} style={styles.blur_View}>

                                            <TextInput
                                                style={styles.input_style}
                                                onChangeText={(t) => { getFirstName(t) }}
                                                placeholder="Enter first name"
                                                placeholderTextColor={'#fff'}
                                                autoCapitalize={false}
                                            />
                                        </BlurView>

                                    </View>
                                    <View style={{ marginTop: RFValue(10, Constant.DesignCanvas.HEIGHT) }}>
                                        <BlurView intensity={100} style={styles.blur_View}>
                                            <TextInput
                                                style={styles.input_style}
                                                onChangeText={(t) => { getLastName(t) }}
                                                placeholder="Enter last name"
                                                placeholderTextColor={'#fff'}
                                                autoCapitalize={false}

                                            />
                                        </BlurView>

                                    </View> */}

                                    </View>
                                </View>

                            </View>

                        </View>
                        <View style={styles.button_style}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => { fireAPi(navigation, emailCheck) }}>
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
            // ios: {
            //     justifyContent: 'center',
            //     alignItems: 'flex-end',
            //     marginTop: 300
            // },
            // android: {
            //     justifyContent: 'flex-end',
            //     alignItems: 'flex-end',
            //     marginTop: 300
            // }
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
        backgroundColor: "#FFF",
        padding: 10,
        marginBottom: 10,
        borderRadius: 15,
        marginLeft: 30,
        marginRight: 30,
        // fontSize: 18,
        height: 50,
        color: "#fff",
        ...Styles.REGULAR_18,

    },
    heading: {
        color: '#fff',
        // fontSize: normalize(30),
        // fontWeight: 'bold',
        ...Styles.BOLD_28
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
    blur_View: {
        borderRadius: normalize(15),
        textAlign: "center",
        // fontSize: 20,
        height: normalize(50),
        // width: normalize(75)
        marginTop: normalize(10),
        paddingRight: normalize(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden'
    },
    input: {
        // backgroundColor: "#FFF",
        borderRadius: normalize(15),
        // fontSize: 18,
        height: normalize(50),
        color: "#fff",
        paddingLeft: normalize(15),
        width: normalize(310),
        ...Styles.BOLD_18
    },

    view_button_style: {
        ...Platform.select({
            ios: {
                // backgroundColor: "green",
                // marginTop: normalize(50),
                flexDirection: "row",
                height: normalize(70),
                justifyContent: "flex-end",
                marginTop: moderateScale(280)
            },
            android: {
                // backgroundColor: "green",
                // marginTop: normalize(50),
                flexDirection: "row",
                height: normalize(70),
                justifyContent: "flex-end",
                marginTop: moderateScale(280)
            }
        })

    },
});

export default SignUp_email;