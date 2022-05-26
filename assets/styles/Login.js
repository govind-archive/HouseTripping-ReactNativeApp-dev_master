import React, { userState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, SafeAreaView, StatusBar, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import apiDetails from '../api/AllApis';

let email = "postmagn@m.com"
let password = "123"

function apiCall({ navigation }) {
    if (email.length < 1) {
        alert("Please enter email")
        return
    }

    if (password.length < 1) {
        alert("Please enter password")
        return
    }

    const a = new apiDetails();
    a.api
        .post(a.login, { "email": email, "password": password })
        .then(response => {
            if (response.data.status == "200") {
                navigation.navigate("MyProfile",
                    { "userData": response.data.data });
            } else {
                // console.log(response);
                alert(response.data.msg);
            }
        })
}


function Login({ navigation }) {
    let [hidden1, setHidden1] = React.useState(true);


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                translucent
                backgroundColor="transparent"
                barStyle={"light-content"} />

            <ScrollView
                style={styles.customScrollview}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View >
                    <View style={{ width: '100%', height: "58%", flexDirection: "row", position: "relative" }}>
                        <Image style={{ width: '100%', borderBottomRightRadius: 25, borderBottomLeftRadius: 25 }} source={require('../assets/images/starting_pages_images.png')} />

                    </View>

                    <View style={{ marginTop: 20, marginBottom: 20, marginLeft: 30, marginRight: 30 }}>
                        <Text style={styles.heading}>Login account</Text>
                        <Text style={styles.para}>Lorem Ipsum is simply dummy text of the.</Text>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email or phone"
                        keyboardType="email-address"
                        onChangeText={(t) => { email = t }}
                    />

                    <View style={[styles.input, { flexDirection: 'row', alignContent: "flex-end" }]} >
                        <TextInput
                            style={{ flex: 1 }}
                            placeholder="Enter your password"
                            secureTextEntry={hidden1}
                            onChangeText={(t) => { password = t }}
                        />
                        <TouchableOpacity onPress={() => { setHidden1(!hidden1) }} >
                            <Image style={{ width: 30, height: 30, alignSelf: "center" }} source={require('../assets/images/password_eye.png')} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.signup} onPress={() => { apiCall({ navigation }) }}>
                        <LinearGradient
                            style={{ borderRadius: 15 }}
                            colors={['#CE72F6', '#9C71FE', '#7572FF']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 1 }}
                        >
                            <Text style={[styles.center, { color: '#fff' }]}>Login</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <Text style={[styles.para, { alignSelf: 'center', marginTop: 15 }]}> Don't have an account? <Text  onPress={() => { navigation.navigate("SignUp") }} style={[styles.para, { color: '#6263F0' }]}> Signup</Text></Text>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7EFFA',
        flex: 1
    },
    customScrollview: {
        ...Platform.select({
            ios: {
                marginTop: -20
            },
            android: {
                marginTop: 0
            },
            default: {
                marginTop: -20
            }
        })
    },
    input: {
        backgroundColor: "#FFF",
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        marginLeft: 30,
        marginRight: 30,
        height: 50
    },
    heading: {
        color: '#272D37',
        fontSize: 23,
        fontWeight: 'bold'
        // fontFamily: 'sp_bold',
    },
    para: {
        color: '#686E76',
        marginTop: 10,
        // fontFamily: 'sp_regular',
    },
    signup: {
        backgroundColor: '#F7EFFA',
        borderRadius: 10,
        marginLeft: 30,
        marginTop: 10,
        marginRight: 30,
        justifyContent: 'space-between',
        alignSelf: 'stretch',
    },
    center: {
        alignSelf: 'center',
        margin: 15,
        fontSize: 18,
        justifyContent: 'center'
    }
});

export default Login;