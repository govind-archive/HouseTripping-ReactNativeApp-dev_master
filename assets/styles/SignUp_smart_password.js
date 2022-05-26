import React, { userState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, TextInput, StatusBar, ScrollView } from 'react-native';
import apiDetails from '../api/AllApis';

let password = ""
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
        mobileData.dob = "1989-09-30";
        mobileData.type = "user";
        mobileData.group_name = "";
        apiCall(navigation)
        // navigation.navigate("SignUp_DOB",
        // { "mobileNumber": mobileData });
    } else {
        alert("Your password and current password doesn't match")
    }

}

function apiCall(navigation) {
    const a = new apiDetails();
    a.api
        .post(a.registration, {
            "firstname": mobileData.firstName,

            "lastname": mobileData.lastName,

            "email": mobileData.email,

            "password": mobileData.password,

            "confirm_password": mobileData.confirm_password,

            "username": mobileData.username,

            "phone_nuber": mobileData.phone_nuber,

            "dob": mobileData.dob,

            "group_name": mobileData.group_name,

            "type": mobileData.type,

        })
        .then(response => {
            console.log(response.data);
            if (response.data.status == "200") {
                alert(response.data.msg);
                navigation.navigate({
                    name: 'Login',
                    merge: true,
                })
            } else {
                console.log(response);
                alert(response.data.msg);
            }
        })

    a.api.addRequestTransform(request => {
        console.log(request.params);
    })
}

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
                barStyle={"dark-content"} />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                <View>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate({
                            name: 'SignUp_username',
                            merge: true,
                        })
                    }}>
                        <Image style={{ width: 20, height: 20, margin: 20, marginLeft: 30 }} source={require('../assets/images/back.png')} />
                    </TouchableOpacity>
                </View>

                <Image style={{ width: 80, height: 80, marginLeft: 30, marginRight: 30, marginTop: 70 }} source={require('../assets/images/lock.png')} />

                <View style={{ marginTop: 20, marginBottom: 50, marginLeft: 30, marginRight: 30 }}>
                    <Text style={styles.heading}>Smart Password</Text>
                    <Text style={styles.para}>Enter the verification code we just sent you on your mobile number.</Text>
                </View>

                <View style={[styles.input, { flexDirection: 'row', alignContent: "flex-end" }]} >
                    <TextInput
                        style={{ flex: 1 }}
                        placeholder="Password"
                        secureTextEntry={hidden1}
                        onChangeText={(t) => { password = t }}
                    />
                    <TouchableOpacity onPress={() => { setHidden1(!hidden1) }}  >
                        <Image style={{ width: 30, height: 30, alignSelf: "center" }} source={require('../assets/images/password_eye.png')} />
                    </TouchableOpacity>
                </View>

                <View style={[styles.input, { flexDirection: 'row', alignContent: "flex-end" }]} >
                    <TextInput
                        style={{ flex: 1 }}
                        placeholder="Confirm password"
                        secureTextEntry={hidden2}
                        onChangeText={(t) => { con_password = t }}
                    />
                    <TouchableOpacity onPress={() => { setHidden2(!hidden2) }}  >
                        <Image style={{ width: 30, height: 30, alignSelf: "center" }} source={require('../assets/images/password_eye.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginRight: 30, marginBottom: 20, justifyContent: "flex-end", flex: 1, alignItems: "flex-end" }}>
                    <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => { checkPassword(navigation, route) }} >
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

export default SignUp_smart_password;