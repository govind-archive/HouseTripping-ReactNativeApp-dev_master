import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, TextInput, StatusBar, ScrollView } from 'react-native';

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
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate({
                            name: 'SignUp_verify_code',
                            merge: true,
                        })
                    }}>
                        <Image style={{ width: 20, height: 20, margin: 20, marginLeft: 30 }} source={require('../assets/images/back.png')} />
                    </TouchableOpacity>
                </View>

                <Image style={{ width: 80, height: 80, marginLeft: 30, marginRight: 30, marginTop: 70 }} source={require('../assets/images/fire.png')} />

                <View style={{ marginTop: 20, marginBottom: 50, marginLeft: 30, marginRight: 30 }}>
                    <Text style={styles.heading}>Your Full Name</Text>
                    <Text style={styles.para}>Enter the verification code we just sent you on your mobile number.</Text>
                </View>

                <TextInput
                    style={styles.input}
                    onChangeText={(t) => { getFirstName(t) }}
                    placeholder="Enter first name"
                />

                <TextInput
                    style={styles.input}
                    onChangeText={(t) => { getLastName(t) }}
                    placeholder="Enter last name"
                />
                <View style={{ flexDirection: 'row', marginRight: 30, marginBottom: 20, justifyContent: "flex-end", flex: 1, alignItems: "flex-end" }}>
                    <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => { submitName({ navigation }) }} >
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

export default SignUp_full_name;