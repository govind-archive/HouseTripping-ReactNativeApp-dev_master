import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, TextInput, StatusBar, ScrollView } from 'react-native';
import apiDetails from '../api/AllApis';

function next({ navigation }, { mobState }, { mob_val }, { type }) {
    let mobile = mobState;
    let mobile_val = mob_val;
    if (mobile.length < 1) {
        alert("Please enter mobile number");
    } else {
        if (mobile_val.length < 1) {
            alert("Please select valid country");
        } else {
            apiCall("+" + mobile_val.phone_code + "" + mobile, navigation, type);
        }
    }
}

const apiCall = (mobnumber, navigation, type) => {
    const a = new apiDetails();
    a.api
        .post(a.checkMobile, { "phone_nuber": mobnumber })
        .then(response => {
            response.data.phone_nuber = mobnumber;
            response.data.type = type;
            if (response.data.status == "200") {
                navigation.navigate("SignUp_verify_code",
                    { "mobileNumber": response.data });
            } else {
                console.log(response.data.msg);
                alert('Oops something went wrong');
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
        "flag": "af"
    };
    if (route.params?.post) {
        mob_val = route.params?.post;
        mob = <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { navigation.navigate('Mobile_code') }}><Image style={{ width: 30, height: 30, alignSelf: "center", marginRight: 15 }} source={require('../assets/images/camera_profile.png')} /><Image style={{ width: 15, height: 10, alignSelf: "center", marginRight: 10 }} source={require('../assets/images/drop_down.png')} /><View style={{ height: "90%", backgroundColor: "#F5F5F7", width: 1.5, alignSelf: "center", marginRight: 10 }}></View></TouchableOpacity>
    } else {
        mob = <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { navigation.navigate('Mobile_code') }}><Image style={{ width: 30, height: 30, alignSelf: "center", marginRight: 15 }} source={require('../assets/images/spain.png')} /><Image style={{ width: 15, height: 10, alignSelf: "center", marginRight: 10 }} source={require('../assets/images/drop_down.png')} /><View style={{ height: "90%", backgroundColor: "#F5F5F7", width: 1.5, alignSelf: "center", marginRight: 10 }}></View></TouchableOpacity>
    }

    return (
        <SafeAreaView style={styles.container}>

            <StatusBar
                animated={true}
                translucent
                backgroundColor="transparent"
                barStyle={"dark-content"} />

            <ScrollView style={{ flexDirection: "column", flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} >
                <View style={{ flex: 1, flexDirection: "column" }}>
                    <View style={styles.customTopBar} >
                        <TouchableOpacity onPress={() => {
                            navigation.navigate({
                                name: 'SignUp',
                                merge: true,
                            })
                        }} >
                            <Image style={{ width: 20, height: 20, margin: 20, marginLeft: 30 }} source={require('../assets/images/back.png')} />

                        </TouchableOpacity>
                    </View>

                    <View >
                        <Image style={{ width: 80, height: 80, marginLeft: 30, marginRight: 30, marginTop: 70 }} source={require('../assets/images/sign_up_mobile_fingure.png')} />

                        <View style={{ marginTop: 20, marginBottom: 50, marginLeft: 30, marginRight: 30 }}>
                            <Text style={styles.heading}>Enter mobile number</Text>
                            <Text style={styles.para}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                        </View>

                        <View style={[styles.input, { flexDirection: 'row', alignContent: "flex-end", flex: 1 }]} >

                            {mob}

                            <TextInput
                                style={{ flex: 1 }}
                                onChangeText={(t) => { setMobState(t) }}
                                keyboardType={'phone-pad'}
                                placeholder="9876 543 210"
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginRight: 30,marginBottom:20, justifyContent: "flex-end", flex: 1,alignItems:"flex-end" }}>
                        <TouchableOpacity style={[styles.loginButton]} onPress={() => { console.log(">>>>>>>>") }} >
                            <Image style={{ width: 30, height: 30, alignSelf: "center", marginLeft: 15, marginRight: 30 }} source={require('../assets/images/google.png')} />
                            <Text style={{ color: '#FFF', fontSize: 15 }}>Login with Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { next({ navigation }, { mobState }, { mob_val }, route.params.mobileNumber) }} >
                            <Image style={{ width: 50, height: 50, marginTop: 10 }} source={require('../assets/images/next.png')} />
                        </TouchableOpacity>
                    </View>
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
    input: {
        backgroundColor: "#FFF",
        padding: 10,
        marginBottom: 10,
        borderRadius: 15,
        marginLeft: 30,
        marginRight: 30,
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
        flex: 1,
        borderRadius: 15,
        flexDirection: 'row',
        backgroundColor: '#272D37',
        marginTop: 10,
        marginLeft: 30,
        marginRight: 15,
        alignItems: "center", 
        borderColor: '#6263F0',
        height:50
    }
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
