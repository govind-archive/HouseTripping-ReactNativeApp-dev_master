import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, TextInput, StatusBar, ScrollView } from 'react-native';
import apiDetails from '../api/AllApis';

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
                    console.log(response);
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

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate({
                            name: 'SignUp_email',
                            merge: true,
                        })
                    }}>
                        <Image style={{ width: 20, height: 20, margin: 20, marginLeft: 30 }} source={require('../assets/images/back.png')} />
                    </TouchableOpacity>
                </View>

                <Image style={{ width: 80, height: 80, marginLeft: 30, marginRight: 30, marginTop: 70 }} source={require('../assets/images/username.png')} />

                <View style={{ marginTop: 20, marginBottom: 50, marginLeft: 30, marginRight: 30 }}>
                    <Text style={styles.heading}>Pick a Username</Text>
                    <Text style={styles.para}>Enter the verification code we just sent you on your mobile number.</Text>
                </View>

                <View style={[styles.input, { flexDirection: 'row', alignContent: "flex-end" }]} >
                    <Image style={{ width: 15, height: 15, marginLeft: 12, marginRight: 15, alignSelf: "center", justifyContent: "center", alignContent: "center" }} source={require('../assets/images/at.png')} />

                    <TextInput
                        style={{ flex: 1, fontSize: 18 }}
                        placeholder="Enter username"
                        onChangeText={(t) => {
                            username = t
                        }}
                    />

                </View>


                <View style={{ flexDirection: 'row', marginRight: 30, marginBottom: 20, justifyContent: "flex-end", flex: 1, alignItems: "flex-end" }}>
                    <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => { apiCall(navigation) }} >
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

export default SignUp_username;