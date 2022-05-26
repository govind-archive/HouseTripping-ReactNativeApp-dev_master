import React, { userState } from 'react';
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


let password = ''
let con_password = ""
let mobileData;

function checkPassword(navigation, route) {

    if (password == "") {
        alert("Please enter password")
        return
    }

    if (con_password == "") {
        alert("Please enter Confirm password")
        return
    }

    if (password === con_password) {
        mobileData.password = password;
        mobileData.confirm_password = password;
        // mobileData.dob = "1989-09-30";
        // mobileData.type = "user";
        mobileData.group_name = "";
        // apiCall(navigation)
        navigation.navigate("SignUP_date_of_birth",
            { "mobileNumber": mobileData });
    } else {
        alert("Your password and current password doesn't match")
    }

}

// function apiCall(navigation) {
//     const a = new apiDetails();
//     a.api
//         .post(a.registration, {
//             "firstname": mobileData.firstName,

//             "lastname": mobileData.lastName,

//             "email": mobileData.email,

//             "password": mobileData.password,

//             "confirm_password": mobileData.confirm_password,

//             "username": mobileData.username,

//             "phone_number": mobileData.phone_nuber,

//             "dob": mobileData.dob,

//             "group_name": mobileData.group_name,

//             "type": mobileData.type,

//         })
//         .then(response => {
//             console.log(response.data);
//             if (response.data.status == "200") {
//                 navigation.navigate({
//                     name: 'Login',
//                     merge: true,
//                 })
//             } else {
//                 console.log(response);
//                 alert(response.data.msg);
//             }
//         })

//     a.api.addRequestTransform(request => {
//         console.log(request.params);
//     })
// }

function SignUp_smart_password({ navigation, route }) {
    let [hidden1, setHidden1] = React.useState(true);
    let [hidden2, setHidden2] = React.useState(true);

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
                        source={Images.password_back_image}
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
                                    source={Images.lock_image}
                                    resizeMode="contain"
                                />
                                <View style={[{
                                    paddingBottom: verticalScale(20),
                                    paddingVertical: verticalScale(30,
                                        Constant.DesignCanvas.HEIGHT)
                                }]}>
                                    <Text style={[styles.heading]}>
                                        Smart Password
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
                                                    placeholder="Password"
                                                    secureTextEntry={hidden1}
                                                    placeholderTextColor='#fff'
                                                    onChangeText={(t) => { password = t }}
                                                />
                                                <TouchableOpacity onPress={() => { setHidden1(!hidden1) }}>
                                                    {hidden1 ?
                                                        <Image
                                                            style={[{
                                                                width: normalize(25),
                                                                height: normalize(25),
                                                                tintColor: '#fff'
                                                            }]}
                                                            source={Images.password_eye}
                                                        />
                                                        :
                                                        <Image
                                                            style={[{
                                                                width: normalize(25),
                                                                height: normalize(25),
                                                                tintColor: '#fff'
                                                            }]}
                                                            source={Images.open_eyes_icon}
                                                        />
                                                    }
                                                </TouchableOpacity>
                                            </BlurView>
                                            <BlurView intensity={100} style={[styles.blur_View]}>
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder="Confirm password"
                                                    secureTextEntry={hidden2}
                                                    placeholderTextColor='#fff'
                                                    onChangeText={(t) => { con_password = t }}
                                                />
                                                <TouchableOpacity onPress={() => { setHidden2(!hidden2) }} >
                                                    {hidden2 ?
                                                        <Image
                                                            style={[{
                                                                width: normalize(25),
                                                                height: normalize(25),
                                                                tintColor: '#fff'
                                                            }]}
                                                            source={Images.password_eye}
                                                        />
                                                        :
                                                        <Image
                                                            style={[{
                                                                width: normalize(25),
                                                                height: normalize(25),
                                                                tintColor: '#fff'
                                                            }]}
                                                            source={Images.open_eyes_icon}
                                                        />
                                                    }
                                                </TouchableOpacity>
                                            </BlurView>

                                        </View>


                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.button_style}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => { checkPassword(navigation, route) }}>
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
        backgroundColor: "#FFF",
        padding: 10,
        marginBottom: 10,
        borderRadius: 15,
        marginLeft: 30,
        marginRight: 30,
        fontSize: 18,
        height: 50,
        color: "#272D37",
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
        overflow: 'hidden',
        textAlign: "center",
        fontSize: 20,
        height: normalize(50),
        // width: normalize(75)
        marginTop: normalize(10),
        paddingRight: normalize(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        // backgroundColor: "#FFF",
        borderRadius: normalize(15),
        fontSize: 18,
        height: normalize(50),
        color: "#fff",
        ...Styles.REGULAR_18,
        paddingLeft: normalize(15),
        width: normalize(310)
    },
    heading: {
        color: '#fff',
        // fontWeight: 'bold',
        ...Styles.BOLD_28

    },

    text_sub_title_smart_password: {
        ...Styles.REGULAR_15,
        color: '#fff'
    },

    view_button_style: {
        ...Platform.select({
            ios: {
                justifyContent: 'flex-end',
                alignItems: 'flex-end',

            },
            android: {
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                // marginTop:(251,Constant.DesignCanvas.HEIGHT)
            }
        })

    },


});

export default SignUp_smart_password;