import React, { userState } from 'react';
import { StyleSheet, FlatList, Text, View, Image, SafeAreaView, TouchableOpacity, StatusBar, ImageBackground, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import Svg, { Path, G, Circle, Rect, Defs } from 'react-native-svg';
import apiDetails from '../api/AllApis';

let userData = {
}

let new_password, password, re_password, firstname, lastname, email = "";
let verifyEmail = true

function fireAPis({ navigation }) {
    let checkPassword = false
    if (new_password != undefined && new_password.length > 0) {
        checkPassword = true;
    }

    if (password != undefined && password.length > 0) {
        checkPassword = true;
    }

    if (re_password != undefined && re_password.length > 0) {
        checkPassword = true;
    }

    if (checkPassword) {
        if (new_password === re_password) {
            //if it matches do nothing
            if (password == "") {
                alert("Please enter the old password")
                retrun
            }
        } else {
            alert("new password and re-enter password not matched");
            return
        }
    }

    callAPi({ navigation })
}

function callAPi({ navigation }) {
    const a = new apiDetails();
    a.api
        .post(a.updateProfile, {
            "user_id": userData.id,
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "password": new_password,
            "old_password": password
        })
        .then(response => {
            if (response.data.status == "200") {
                alert("Profile Updated")
                // navigation.navigate("SignUp_username",
                //     { "mobileNumber": response.data.data });
            } else {
                console.log(response);
                alert(response.data.msg);
            }
        })
}


export default function SettingProfile({ navigation, route }) {
    const [index, setIndex] = React.useState(0);
    const [hidden1, setHidden1] = React.useState(true);
    const [hidden2, setHidden2] = React.useState(true);
    const [hidden3, setHidden3] = React.useState(true);
    const [routes] = React.useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
    ]);

    if (route.params?.userData) {
        userData = route.params?.userData
    } else {
        alert("Oops, please login again");
    }

    firstname = userData.name;
    lastname = userData.lastname;

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#CE72F6', '#9C71FE', '#7572FF']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={{ marginTop: -20, height: "120%" }}
            >

                <StatusBar
                    animated={true}
                    translucent
                    backgroundColor="transparent"
                    barStyle={"light-content"} />

                <View style={[styles.customHeader, { height: "7%", width: '100%', flexDirection: 'row' }]}>
                    <TouchableOpacity style={{ marginTop: 3 }} onPress={() => { navigation.navigate('MyProfile') }}>
                        <Image style={{ width: 20, height: 20, margin: 20, marginLeft: 30, tintColor: '#FFF' }} source={require('../assets/images/back.png')} />
                    </TouchableOpacity>

                    <Text style={styles.heading_top}>
                        Setting
                    </Text>

                    <TouchableOpacity style={{ marginTop: 25, marginRight: 20, marginLeft: 10 }} onPress={() => fireAPis({ navigation })}>
                        <Image style={{ width: 20, height: 20, alignSelf: "center", tintColor: "#FFF" }} source={require('../assets/images/right.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.lower_view}>
                    <LinearGradient
                        colors={['#F7EFFA', '#FEFAF9']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={{ borderTopRightRadius: 40, borderTopLeftRadius: 40, height: "77%", padding: 30 }}
                    >
                        <ScrollView
                            showsVerticalScrollIndicator={false}>
                            <View>
                                <Text style={styles.heading}>Account</Text>
                                <View style={{ marginBottom: 5 }}>
                                    <Text style={styles.secondHeading}>Username</Text>
                                    <View style={styles.input}>
                                        <Text >@{userData.username}</Text>
                                    </View>
                                </View>
                                <View style={{ marginBottom: 10 }}>
                                    <Text style={styles.secondHeading}>First name</Text>
                                    <View style={styles.input}>
                                        <TextInput onChangeText={(t) => { firstname = t }}>{userData.name}</TextInput>
                                    </View>
                                </View>

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={styles.secondHeading}>Last name</Text>
                                    <View style={styles.input}>
                                        <TextInput onChangeText={(t) => { lastname = t }}>{userData.lastname}</TextInput>
                                    </View>
                                </View>

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={styles.secondHeading}>Email address</Text>
                                    <View style={[styles.input, { flexDirection: "row" }]}>
                                        <TextInput style={{ flex: 1 }} onChangeText={() => { verifyEmail = false }}> {userData.email} </TextInput>
                                        <TouchableOpacity style={{ height: 30, alignSelf: "center", marginRight: 15 }} onPress={() => { verifyEmail = false }}>
                                            <LinearGradient
                                                style={{ borderRadius: 15, height: 30, justifyContent: "center" }}
                                                colors={['#272D37', '#272D37', '#272D37']}
                                                start={{ x: 1, y: 0 }}
                                                end={{ x: 0, y: 1 }}
                                            >
                                                <Text style={[styles.center, { color: '#fff' }]}>Verify</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={styles.secondHeading}>Phone number</Text>
                                    <View style={[styles.input, { flexDirection: 'row', alignContent: "flex-end" }]}>
                                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { navigation.navigate('Mobile_code') }}><Image style={{ width: 30, height: 30, alignSelf: "center", marginRight: 15 }} source={require('../assets/images/spain.png')} /><Image style={{ width: 15, height: 10, alignSelf: "center", marginRight: 10 }} source={require('../assets/images/drop_down.png')} /><View style={{ height: "90%", backgroundColor: "#F5F5F7", width: 1.5, alignSelf: "center", marginRight: 10 }}></View></TouchableOpacity>
                                        <Text style={{ justifyContent: "center", flex: 1, alignSelf: "center" }}>{userData.phone_nuber}</Text>
                                    </View>
                                </View>

                                <View style={styles.border_middle}>

                                </View>

                                <Text style={styles.heading}>Password</Text>

                                <View>
                                    <Text style={styles.secondHeading}>Current password</Text>

                                    <View style={[styles.input, { flexDirection: 'row', alignContent: "flex-end" }]} >
                                        <TextInput
                                            style={{ flex: 1 }}
                                            placeholder="Password"
                                            secureTextEntry={hidden1}
                                            onChangeText={(t) => { password = t }}
                                        />
                                        <TouchableOpacity style={{ justifyContent: "center", paddingRight: 15 }} onPress={() => { setHidden1(!hidden1) }}>
                                            <Image style={{ width: 30, height: 30, alignSelf: "center" }} source={require('../assets/images/password_eye.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View>
                                    <Text style={styles.secondHeading}>New password</Text>

                                    <View style={[styles.input, { flexDirection: 'row', alignContent: "flex-end" }]} >
                                        <TextInput
                                            style={{ flex: 1 }}
                                            placeholder="New password"
                                            secureTextEntry={hidden2}
                                            onChangeText={(t) => { new_password = t }}
                                        />
                                        <TouchableOpacity style={{ justifyContent: "center", paddingRight: 15 }} onPress={() => { setHidden2(!hidden2) }}>
                                            <Image style={{ width: 30, height: 30, alignSelf: "center" }} source={require('../assets/images/password_eye.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{ marginBottom: 10 }}>
                                    <Text style={styles.secondHeading}>Re-enter new password</Text>

                                    <View style={[styles.input, { flexDirection: 'row', alignContent: "flex-end" }]} >
                                        <TextInput
                                            style={{ flex: 1 }}
                                            placeholder="Re-enter new password"
                                            secureTextEntry={hidden3}
                                            onChangeText={(t) => { re_password = t }}
                                        />
                                        <TouchableOpacity style={{ justifyContent: "center", paddingRight: 15 }} onPress={() => { setHidden3(!hidden3) }}>
                                            <Image style={{ width: 30, height: 30, alignSelf: "center" }} source={require('../assets/images/password_eye.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.border_middle}>

                                </View>

                                <Text style={styles.heading}>Social profiles</Text>
                                <View style={[{ flexDirection: 'row', alignContent: "flex-end", marginBottom: 10, marginTop: 10, textAlign: "center", alignItems: "center" }]} >
                                    <Svg style={{ marginRight: 10 }} id="Group_312" data-name="Group 312" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                        <Circle id="Ellipse_1" data-name="Ellipse 1" cx="16" cy="16" r="16" fill="#fff" />
                                        <Path id="Icon_awesome-facebook" data-name="Icon awesome-facebook" d="M32.563,16.563a16,16,0,1,0-18.5,15.806V21.188H10V16.563h4.065V13.037c0-4.01,2.387-6.225,6.043-6.225a24.624,24.624,0,0,1,3.582.312v3.935H21.67a2.313,2.313,0,0,0-2.607,2.5v3H23.5l-.71,4.625H19.063V32.369A16.006,16.006,0,0,0,32.563,16.563Z" transform="translate(-0.563 -0.563)" fill="#167af2" />
                                    </Svg>
                                    <Text style={{ fontSize: 15, color: "#272D37", fontWeight: "500" }}>
                                        Login with Faebook
                                    </Text>

                                    <View style={styles.toggleButtons}>

                                        <Image source={require('../assets/images/checkbox_grey.png')} />

                                    </View>

                                </View>

                                <View style={[{ flexDirection: 'row', marginBottom: 10, textAlign: "center", alignItems: "center" }]} >
                                    <Svg style={{ marginRight: 10 }} id="Group_311" data-name="Group 311" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                        <Circle id="Ellipse_2" data-name="Ellipse 2" cx="16" cy="16" r="16" fill="#1ca1f1" />
                                        <Path id="Icon_awesome-twitter" data-name="Icon awesome-twitter" d="M16.5,7.1c.012.163.012.327.012.49A10.65,10.65,0,0,1,5.788,18.317,10.651,10.651,0,0,1,0,16.625a7.8,7.8,0,0,0,.91.047,7.548,7.548,0,0,0,4.679-1.61,3.776,3.776,0,0,1-3.524-2.614,4.753,4.753,0,0,0,.712.058,3.986,3.986,0,0,0,.992-.128,3.77,3.77,0,0,1-3.022-3.7V8.632a3.8,3.8,0,0,0,1.7.478A3.775,3.775,0,0,1,1.284,4.069,10.713,10.713,0,0,0,9.055,8.013a4.255,4.255,0,0,1-.093-.863,3.773,3.773,0,0,1,6.523-2.579,7.42,7.42,0,0,0,2.392-.91A3.759,3.759,0,0,1,16.22,5.738a7.556,7.556,0,0,0,2.17-.583A8.1,8.1,0,0,1,16.5,7.1Z" transform="translate(6.655 6.151)" fill="#fff" />
                                    </Svg>
                                    <Text style={{ fontSize: 15, color: "#272D37", fontWeight: "500" }}>
                                        Login with Google
                                    </Text>

                                    <View style={styles.toggleButtons}>

                                        <Image source={require('../assets/images/check_box_purple.png')} />

                                    </View>

                                </View>

                                <View style={styles.border_middle}>

                                </View>

                                <Text style={styles.heading}>Social profiles</Text>
                                <View style={[{ flexDirection: 'row', alignContent: "flex-end", marginBottom: 10, marginTop: 10, textAlign: "center", alignItems: "center" }]} >

                                    <Text style={{ fontSize: 15, color: "#272D37", fontWeight: "500" }}>
                                        Turn on/off push notifications
                                    </Text>

                                    <View style={styles.toggleButtons}>

                                        <Image source={require('../assets/images/checkbox_grey.png')} />

                                    </View>

                                </View>

                                <View style={[{ flexDirection: 'row', marginBottom: 15, textAlign: "center", alignItems: "center" }]} >
                                    <Text style={{ fontSize: 15, color: "#272D37", fontWeight: "500" }}>
                                        Turn on/off email updates
                                    </Text>

                                    <View style={styles.toggleButtons}>

                                        <Image source={require('../assets/images/check_box_purple.png')} />

                                    </View>

                                </View>

                                <Text style={{ flexDirection: 'row', marginBottom: 5, textAlign: "center", alignItems: "center", marginTop: 10 }}>App Viersion 8.8.0 Build 2023 release prod</Text>

                            </View>
                        </ScrollView>

                    </LinearGradient>
                </View>
            </LinearGradient>
        </SafeAreaView>

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
        height: '100%',
        width: '100%'
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
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        height: "100%",
        overflow: 'hidden'
    },
    heading_top: {
        color: '#FFF',
        fontSize: 20,
        marginTop: 20,
        justifyContent: 'center',
        textAlign: 'center',
        flex: 1,
        marginRight: 10,
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
    }

});
