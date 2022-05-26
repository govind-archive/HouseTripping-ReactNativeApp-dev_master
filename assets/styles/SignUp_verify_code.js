import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, TextInput, StatusBar, ScrollView } from 'react-native';
import apiDetails from '../api/AllApis';

let mobileData;

let s1;
let s2;
let s3;
let s4;

let [i1, i2, i3, i4] = "";

function changeFocus(f, t) {
    if (f == "2") {
        if (t.length > 0) {
            s2.focus();
            i1 = t;
        } else {
            i1 = "";
            s1.focus();
        }
    }
    else if (f == "3") {
        if (t.length > 0) {
            s3.focus();
            i2 = t;
        } else {
            i2 = "";
            s1.focus();
        }
    }
    else if (f == "4") {
        if (t.length > 0) {
            s4.focus();
            i3 = t;
        } else {
            i3 = "";
            s2.focus();
        }
    }
    else if (f == "1") {
        if (t.length > 0) {
            s4.focus();
            i4 = t;
        } else {
            i4 = "";
            s3.focus();
        }
    }
}

function submitData({ navigation }) {
    let finalOtp = i1 + i2 + i3 + i4;
    if (finalOtp.length == 4) {
        apiCall(finalOtp, navigation);
    } else {
        alert("Not valid");
    }
}

const apiCall = (otp, navigation) => {
    const a = new apiDetails();
    a.api
        .post(a.verifyOTP, { "otp": mobileData.otp, "userotp": parseInt(otp) })
        .then(response => {
            if (response.data.status == "200") {
                navigation.navigate(mobileData.type == "user" ? 'SignUp_full_name' : "SignUp_email",
                    { "mobileNumber": mobileData });
            } else {
                alert(response.data.msg);
            }
        })
}

function SignUp_verify_code({ navigation, route }) {
    if (route.params?.mobileNumber) {
        mobileData = route.params?.mobileNumber
        alert("Your otp is " + mobileData.otp)
    } else {
        alert("Oops something went wrong please go back");
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <StatusBar
                    animated={true}
                    translucent
                    backgroundColor="transparent"
                    barStyle={"dark-content"} />

                <View style={styles.customHeader} >
                    <TouchableOpacity onPress={() => {
                        navigation.navigate({
                            name: 'SignUp_mobile',
                            merge: true,
                        })
                    }}>
                        <Image style={{ width: 20, height: 20, margin: 20, marginLeft: 30 }} source={require('../assets/images/back.png')} />
                    </TouchableOpacity>
                </View>

                <Image style={{ width: 80, height: 80, marginLeft: 30, marginRight: 30, marginTop: 70 }} source={require('../assets/images/lock.png')} />

                <View style={{ marginTop: 20, marginBottom: 50, marginLeft: 30, marginRight: 30 }}>
                    <Text style={styles.heading}>Verification Code</Text>
                    <Text style={styles.para}>Enter the verification code we just sent you on your mobile number.</Text>
                </View>

                <View style={[{ flexDirection: 'row', justifyContent: "space-between", marginRight: 30, width: "100%" }]} >
                    <TextInput
                        ref={(input) => { s1 = input; }}
                        style={[styles.input, { marginLeft: 30 }]}
                        placeholder="9"
                        keyboardType="phone-pad"
                        onChangeText={(t) => {
                            changeFocus("2", t)
                        }}
                        maxLength={1}
                    />
                    <TextInput
                        ref={(input) => { s2 = input; }}
                        style={styles.input}
                        placeholder="9"
                        keyboardType="phone-pad"
                        onChangeText={(t) => {
                            changeFocus("3", t)
                        }}
                        maxLength={1}
                    />
                    <TextInput
                        ref={(input) => { s3 = input; }}
                        style={styles.input}
                        placeholder="9"
                        keyboardType="phone-pad"
                        onChangeText={(t) => {
                            changeFocus("4", t)
                        }}
                        maxLength={1}
                    />
                    <TextInput
                        ref={(input) => { s4 = input; }}
                        style={[styles.input, { marginRight: 30 }]}
                        placeholder="9"
                        keyboardType="phone-pad"
                        onChangeText={(t) => {
                            changeFocus("1", t)
                        }}
                        maxLength={1}
                    />
                </View>

                <View style={{ flexDirection: 'row', marginRight: 30, marginBottom: 20, justifyContent: "flex-end", flex: 1, alignItems: "flex-end" }}>
                    <View style={{ height: 50, alignContent: "center", justifyContent: "center", flex: 1, marginLeft: 30, marginTop: 12 }}>
                        <Text style={{ fontSize: 16, color: "#686E76" }}>
                            Did'nt recive any code?
                        </Text>

                        <TouchableOpacity onPress={() => { console.log(">>>>>>>>") }} >
                            <Text style={{ fontSize: 16, color: "#6263F0" }}>
                                Re-send Code
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => { submitData({ navigation }) }} >
                        <Image style={{ width: 50, height: 50, marginTop: 10 }} source={require('../assets/images/next.png')} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: '100%',
        backgroundColor: '#F7EFFA',
    },
    customHeader: {

        ...Platform.select({
            ios: {
                height: "11%"
            },
            android: {
                height: "11%",
                marginTop: 20
            },
            default: {
                height: "11%"
            }
        })
    },
    input: {
        backgroundColor: "#FFF",
        padding: 5,
        marginBottom: 10,
        borderRadius: 15,
        textAlign: "center",
        fontSize: 20,
        height: 50,
        color: "#272D37",
        width: 75
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
    }
});

export default SignUp_verify_code;