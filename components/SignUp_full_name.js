import React from 'react';
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
} from 'react-native';
import normalize from 'react-native-normalize';
import apiDetails from '../api/AllApis';
import Images from '../assets/Images';
import { NormalHeader } from './Components/customHeader';
import { BlurView } from 'expo-blur';
import { RFValue } from 'react-native-responsive-fontsize';
import Constant from '../constants/Contants';
import Styles from '../constants/Styles';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { HeaderModel, HelpScreenModel } from "./Components/NewModelView";

let tFirstName = "";
let tLastName = "";

let mobileData;

function getFirstName(t) {
    tFirstName = t;
}

function getLastName(t) {
    tLastName = t;
}

function submitName({ navigation }) {

    if (tFirstName.length < 1) {
        alert("Please enter first name");
    } else {
        if (tLastName.length < 1) {
            alert("Please enter last name");
        } else {
            mobileData.firstName = tFirstName;
            mobileData.lastName = tLastName;
            navigation.navigate("SignUp_email",
                { "mobileNumber": mobileData });
        }
    }
}

function SignUp_full_name({ navigation, route }) {

    if (route.params?.mobileNumber) {
        mobileData = route.params?.mobileNumber
        // console.log(route.params?.mobileNumber);
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
                        source={Images.full_name_back_image}
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
                                marginTop: 60,
                                // backgroundColor: 'red',
                            }}>
                                <Image
                                    style={[{
                                        width: 80,
                                        height: 80,
                                    }]}
                                    source={Images.fire_image}
                                    resizeMode="contain"
                                />
                                <View style={[{
                                    paddingBottom: verticalScale(20),
                                    paddingVertical: verticalScale(30,
                                        Constant.DesignCanvas.HEIGHT),
                                }]}>
                                    <Text style={[styles.heading]}>
                                        Your Full Name
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
                                        // backgroundColor: "green",
                                        marginTop: RFValue(46, Constant.DesignCanvas.HEIGHT),
                                        // flexDirection:'row',
                                        justifyContent: 'space-between'
                                    }]}>
                                        <View>
                                            <BlurView intensity={100} style={styles.blur_View}>

                                                <TextInput
                                                    style={styles.input_style}
                                                    onChangeText={(t) => { getFirstName(t) }}
                                                    placeholder="Enter first name"
                                                    placeholderTextColor={'#fff'} 
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

                                                />
                                            </BlurView>

                                        </View>

                                    </View>

                                </View>

                            </View>

                        </View>
                        <View style={styles.button_style}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => { submitName({ navigation }) }} >
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
    input: {
        borderRadius: 15,
        fontSize: 18,
        height: normalize(50),
        color: "#fff",
        paddingLeft: normalize(15),
        ...Styles.REGULAR_18
    },
    input_style: {
        ...Platform.select({
            ios: {
                fontSize: 18,
                height: normalize(50),
                color: "#fff",
                paddingLeft: normalize(15),
                ...Styles.REGULAR_18,
            },
            android: {
                borderRadius: 15,
                fontSize: 18,
                height: normalize(50),
                color: "#fff",
                paddingLeft: normalize(15),
                ...Styles.REGULAR_18
            }
        })
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
        ...Platform.select({
            ios: {
                textAlign: "center",
                fontSize: 20,
                height: normalize(50),
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                overflow: 'hidden', marginTop: normalize(10),
            },
            android: {
                borderRadius: normalize(15),
                textAlign: "center",
                fontSize: 20,
                height: normalize(50),
                marginTop: normalize(10),
            }
        }),
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
                right: 16
            }
        })
    },
    view_button_style: {
        ...Platform.select({
            ios: {
                backgroundColor: 'cyan',
                justifyContent: 'center',
                flex: 1,
            },
            android: {
            }
        }
        )
    }
});

export default SignUp_full_name;