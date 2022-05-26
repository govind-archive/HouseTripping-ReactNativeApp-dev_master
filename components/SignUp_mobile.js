import React, { useState } from 'react';
import {
    StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, TextInput, StatusBar, ScrollView, Dimensions, ImageBackground, KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
} from 'react-native';
import apiDetails from '../api/AllApis';
import Images from '../assets/Images';
import { androidClientId, IOSclient } from "../superSecretKey";
import * as Google from "expo-google-app-auth";
import { RFValue } from 'react-native-responsive-fontsize';
import Contants from '../constants/Contants';
import Styles from '../constants/Styles';

function next({ navigation }, { mobState }, { mob_val }, { type }) {
    let mobile = mobState;
    let mobile_val = mob_val;
    if (mobile.length <= 0) {
        alert("Please enter valid mobile number");
    } else {
        if (mobile_val.length < 1) {
            alert("Please select valid country");
        } else {
            apiCall("+" + mobile_val.phone_code + "" + mobile, navigation, type);
        }
    }
}
// let heightMo = Dimensions.get('window').height+42;

const apiCall = (mobnumber, navigation, type) => { 
    const a = new apiDetails();
    a.api
        .post(a.checkMobile, { "phone_number": mobnumber })
        .then(response => {
            response.data.phone_nuber = mobnumber;
            response.data.type = type;  
            if (response.data.status == "200") {
                navigation.navigate("SignUp_verify_code",
                    { "mobileNumber": response.data });
            } else {
                console.log(response.data.msg);
                alert(response.data.msg);
            }
        })
}

function SignUp_mobile({ navigation, route }) {
    const [mobState, setMobState] = useState("")
    const [type, setType] = useState("user")

    let mob = {};
    let mob_val = {
        "id_country": 1,
        "country_name": "Afghanistan",
        "Phone Code": "93",
        "phone_code": "93",
        "flag": "https://housetripping.pixbrand.net/public/assets/flags/af.png"
    };
    if (route.params?.post) {
        mob_val = route.params?.post;
        mob = <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { navigation.navigate('Mobile_code') }}><Image style={{ width: 30, height: 30, alignSelf: "center", marginRight: 15 }} source={{ uri: mob_val.flag }} /><Image style={{ width: 8.5, height: 8.5, alignSelf: "center", marginRight: 10 }} source={require('../assets/images/drop_down.png')} /><View style={{ height: "90%", backgroundColor: "#F5F5F7", width: 1.5, alignSelf: "center", marginRight: 10 }}></View></TouchableOpacity>
    } else {
        mob = <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { navigation.navigate('Mobile_code') }}><Image style={{ width: 30, height: 30, alignSelf: "center", marginRight: 15 }} source={{ uri: mob_val.flag }} /><Image style={{ width: 15, height: 10, alignSelf: "center", marginRight: 10 }} source={require('../assets/images/drop_down.png')} /><View style={{ height: "90%", backgroundColor: "#F5F5F7", width: 1.5, alignSelf: "center", marginRight: 10 }}></View></TouchableOpacity>
    }

    //google login start code
    const [profile, setProfile] = useState('');
    const signInAsync = async () => {
        try {
            const { type, user } = await Google.logInAsync({
                androidClientId: androidClientId,
                iosClientId: IOSclient,

            });


            if (type === "success") {
                // Then you can use the Google REST API 
                setProfile(user);
                navigation.navigate("Social_login", {
                    profile: user,
                });

            }
        } catch (error) {
            console.log("LoginScreen.js 19 | error with login", error);
        }
    };

   


    return (
        <SafeAreaView style={[styles.container]}>
            <StatusBar
                animated={true}
                translucent
                backgroundColor="transparent"
                barStyle={"dark-content"} />
            <ImageBackground style={[{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height + 42,
                marginTop: Platform.OS === 'ios' ? -47 : 0,

            }]}
                source={Images.all_screen_bg_image}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.customScrollview}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView bounces={false} style={styles.customScrollview}>
                            <View>

                                {/* /*****************Section start*************************** */}
                                <View
                                    style={[styles.SameContainer, { paddingHorizontal: RFValue(25, Contants.DesignCanvas.HEIGHT), marginTop: RFValue(50, Contants.DesignCanvas.HEIGHT) }]}
                                >
                                    <View style={[{
                                        //   backgroundColor: 'green',
                                        width: Dimensions.get('window').width * 0.8856,
                                        height: 30,
                                        marginTop: Platform.OS === 'ios' ? 30 : 0,
                                        // marginTop:RFValue(20,Contants.DesignCanvas.HEIGHT),
                                        //   flexDirection:"row",
                                        justifyContent: "center"
                                    }]}>
                                        <TouchableOpacity onPress={() => {
                                            navigation.navigate({
                                                name: 'SignUp',
                                                merge: true,
                                            })
                                        }}>
                                            <Image
                                                style={[{
                                                    width: RFValue(28, Contants.DesignCanvas.HEIGHT),
                                                    height: RFValue(28, Contants.DesignCanvas.HEIGHT)
                                                }]}
                                                resizeMode="contain"
                                                source={Images.all_screen_back_black_arrow_icon}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/* /*****************Section end*************************** */}
                                {/* /*****************Section start*************************** */}
                                <View
                                    style={[styles.SameContainer, { paddingHorizontal: RFValue(25, Contants.DesignCanvas.HEIGHT), marginTop: RFValue(50, Contants.DesignCanvas.HEIGHT) }]}
                                >
                                    <View style={[{
                                        //   backgroundColor: 'green',
                                        width: Dimensions.get('window').width * 0.8856,
                                        height: 75,
                                        // marginTop:RFValue(20,Contants.DesignCanvas.HEIGHT),
                                        //   flexDirection:"row",
                                        // justifyContent: "center"
                                    }]}>
                                        <Image
                                            style={[{
                                                width: RFValue(80, Contants.DesignCanvas.HEIGHT),
                                                height: RFValue(80, Contants.DesignCanvas.HEIGHT)
                                            }]}
                                            source={Images.sign_up_mobile_fingure}
                                        />
                                    </View>
                                </View>
                                {/* /*****************Section end*************************** */}
                                {/* /*****************Section Start*************************** */}
                                <View
                                    style={[styles.SameContainer, {}]}
                                >
                                    <View style={[{
                                        //   backgroundColor:'green',
                                        width: Dimensions.get('window').width * 0.8856,
                                        //   height:RFValue(40,Contants.DesignCanvas.HEIGHT)
                                    }]}>
                                        <Text style={[Styles.BOLD_28, {
                                            lineHeight: 36,
                                            color: '#272D37',
                                        }]}>Enter mobile number</Text>
                                        <Text style={[Styles.REGULAR_15, {

                                            color: '#686E76',
                                            marginTop: RFValue(15, Contants.DesignCanvas.HEIGHT),
                                            lineHeight: 21
                                        }]}>
                                            Lorem Ipsum is simply dummy text of the{'\n'}printing and typesetting industry.
                                        </Text>
                                    </View>
                                </View>
                                {/* /*****************Section end*************************** */}
                                {/* /*****************Section start*************************** */}
                                <View
                                    style={[styles.SameContainer, { marginTop: RFValue(46, 812) }]}
                                >
                                    <View style={[styles.input, { flexDirection: 'row', alignContent: "flex-end", flex: 1 }]} >

                                        {mob}

                                        <TextInput
                                            keyboardType="numeric"
                                            style={[Styles.REGULAR_15, { flex: 1, color: '#272D37', lineHeight: 21 }]}
                                            onChangeText={(t) => { setMobState(t) }}
                                            // keyboardType={'phonse-pad'}
                                            placeholder="9876 543 210"
                                        />
                                    </View>
                                </View>
                                {/* /*****************Section end*************************** */}
                                {/* /*****************Section start*************************** */}
                                <View
                                    style={[styles.SameContainer, {
                                        ...Platform.select({
                                            ios: {
                                                marginTop: RFValue(50, Contants.DesignCanvas.HEIGHT)
                                            },
                                            android: {
                                                marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT)
                                            }
                                        })
                                    }]}
                                >
                                    <View style={[{
                                        justifyContent: "flex-end",
                                        ...Platform.select({
                                            ios: {
                                                // backgroundColor:'green',
                                                width: Dimensions.get('window').width * 0.8856,
                                                height: RFValue(380, Contants.DesignCanvas.HEIGHT),
                                                flexDirection: "row",
                                                // justifyContent:"",
                                                alignItems: "flex-end",
                                                paddingBottom: 20
                                                // paddingBottom:RFValue(5, Contants.DesignCanvas.HEIGHT),
                                                // marginBottom:RFValue(50,Contants.DesignCanvas.HEIGHT)
                                            },
                                            android: {
                                                // backgroundColor:'green',
                                                width: Dimensions.get('window').width * 0.8856,
                                                height: Dimensions.get('window').height * 0.4883,
                                                flexDirection: "row",
                                                // justifyContent:"",
                                                alignItems: "flex-end",
                                                paddingBottom: 20
                                                // paddingBottom:RFValue(5, Contants.DesignCanvas.HEIGHT),
                                                // marginBottom:RFValue(40,Contants.DesignCanvas.HEIGHT)

                                            }
                                        })

                                    }]}>
                                        {/* <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={[
                                                styles.loginButton,
                                                { flexDirection: "row", backgroundColor: "#272D37", justifyContent: "flex-start", alignItems: "center", },
                                            ]}
                                            onPress={() => {
                                                signInAsync();
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    height: RFValue(35, 812),
                                                    width: RFValue(35, 812),
                                                    marginLeft: 15
                                                }}
                                                resizeMode='contain'
                                                source={Images.wellcome_login_google_icon}
                                            />
                                            <Text
                                                style={[Styles.MEDIUM_15,
                                                {
                                                    lineHeight: 21,
                                                    color: "#FFFFFF",
                                                    marginLeft: 40
                                                    // textAlign:"center"
                                                }
                                                ]}
                                            >
                                                Login with Google
                                            </Text>
                                        </TouchableOpacity> */}
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={[{
                                                alignSelf:"flex-end",
                                                // backgroundColor:"red",
                                                marginLeft: RFValue(10, 812),
                                                marginBottom: 3.5
                                            }]}
                                            // onPress={() => { navigation.navigate('Mobile_code') }}
                                            onPress={() => { next({ navigation }, { mobState }, { mob_val }, route.params.mobileNumber) }}
                                        >
                                            <Image style={{ width: RFValue(50, 812), height: RFValue(50, 812), }} source={Images.next_page_imgae} />
                                        </TouchableOpacity>

                                    </View>
                                </View>
                                {/* /*****************Section end*************************** */}

                            </View>
                        </ScrollView>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ImageBackground>
        </SafeAreaView >
    );

}


const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: '100%',
        // backgroundColor: '#F7EFFA',
        // backgroundColor:'red'
    },
    customTopBar: {
        ...Platform.select({
            ios: {
            },
            android: {
                marginTop: 20,
                marginLeft: -5
            },
            default: {
            }
        })
    },
    customScrollview: {
        ...Platform.select({
            ios: {
                marginTop: -20,
                height: Dimensions.get('window').height + 40,
                //    backgroundColor:'red'
            },
            android: {
                marginTop: 0,
                marginBottom: RFValue(10, Contants.DesignCanvas.HEIGHT)
            },
            default: {
                marginTop: -20,
            },
        }),
    },
    input: {
        backgroundColor: "#FFF",
        padding: 10,
        // marginBottom: 10,
        borderRadius: 15,
        // marginLeft: 30,
        // marginRight: 30,
        height: 50
    },
    heading: {
        color: '#272D37',
        fontSize: 28,
        fontWeight: 'bold',
        marginRight: "20%"
        // fontFamily: 'sp_bold',
    },
    para: {
        color: '#686E76',
        marginTop: 10,
        fontSize: 15,
        marginRight: "20%"
        // fontFamily: 'sp_regular',
    },
    loginButton: {
        backgroundColor: "#F7EFFA",
        borderRadius: 16,
        // marginTop: 10,
        // marginLeft: 30,
        // marginRight: 30,
        // width:Dimensions.get('window').width*0.8856,
        width: RFValue(290, 812),
        height: 50,
        borderColor: "#6263F0",
    },
    SameContainer: {
        // backgroundColor: "red",
        marginTop: RFValue(30, Contants.DesignCanvas.HEIGHT),
        width: Dimensions.get('window').width,
        paddingHorizontal: RFValue(25, Contants.DesignCanvas.HEIGHT)
    },
});


// const appNavigator = createStackNavigator({
//     Home: {
//         screen: SignUp_mobile,
//     },
//     Mobile_code: {
//         screen: Mobile_code
//     }
// }, {
//     headerMode: 'none',
//     navigationOptions: {
//         headerVisible: false,
//     }
// }
// );

export default SignUp_mobile;
