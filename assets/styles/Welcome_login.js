import React, { userState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, SafeAreaView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, G, Circle, Rect, Defs } from 'react-native-svg';


function Welcome_login({ navigation }) {

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                translucent
                backgroundColor="transparent"
                barStyle={"light-content"} />

            <Image style={{ marginTop: -20, width: '100%', height: "65%", borderBottomRightRadius: 25, borderBottomLeftRadius: 25, marginBottom: 25 }} source={require('../assets/images/starting_pages_images.png')} />

            <TouchableOpacity style={[styles.loginButton, { flexDirection: "row", backgroundColor: "#FFF" }]} onPress={() => { navigation.navigate('Login') }} >
                <Image style={{ marginRight: 0, position: "absolute", justifyContent: "center", alignSelf: "center", marginLeft: 20 }} source={require('../assets/images/mail.png')} />
                <Text style={[styles.center, { color: '#272D37', textAlign: 'center', fontSize: 15, fontWeight: "600" }]}>Login with email or number</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.loginButton, { flexDirection: "row", backgroundColor: "#167AF2" }]} onPress={() => { alert("Working") }} >
                <Svg style={{ marginRight: 0, position: "absolute", justifyContent: "center", alignSelf: "center", marginLeft: 20 }} id="Group_312" data-name="Group 312" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <Circle id="Ellipse_1" data-name="Ellipse 1" cx="16" cy="16" r="16" fill="#167AF2" />
                    <Path id="Icon_awesome-facebook" data-name="Icon awesome-facebook" d="M32.563,16.563a16,16,0,1,0-18.5,15.806V21.188H10V16.563h4.065V13.037c0-4.01,2.387-6.225,6.043-6.225a24.624,24.624,0,0,1,3.582.312v3.935H21.67a2.313,2.313,0,0,0-2.607,2.5v3H23.5l-.71,4.625H19.063V32.369A16.006,16.006,0,0,0,32.563,16.563Z" transform="translate(-0.563 -0.563)" fill="#fff" />
                </Svg>
                <Text style={[styles.center, { color: '#FFF', textAlign: 'center', fontSize: 15, fontWeight: "600" }]}>Login with Faebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.loginButton, { flexDirection: "row", backgroundColor: "#FF4643" }]} onPress={() => { alert("Working") }} >
                <Image style={{ marginRight: 0, position: "absolute", justifyContent: "center", alignSelf: "center", marginLeft: 20 }} source={require('../assets/images/gmail.png')} />
                <Text style={[styles.center, { color: '#FFF', textAlign: 'center', fontSize: 15, fontWeight: "600" }]}>Login with Google</Text>
            </TouchableOpacity>


            <Text style={[styles.para, { alignSelf: 'center', marginTop: 18 }]}>Don't have an account ?<Text  onPress={() => { navigation.navigate("SignUp") }} style={[styles.para, { color: '#6263F0' }]}> Signup</Text> </Text>

        </SafeAreaView>
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
        marginRight: 30,
        justifyContent: 'space-between',
        alignSelf: 'stretch',
    },
    loginButton: {
        backgroundColor: '#F7EFFA',
        borderRadius: 15,
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
        height: 50,
        borderColor: '#6263F0',
    },
    center: {
        alignSelf: 'center',
        margin: 15,
        fontSize: 18,
        justifyContent: 'center',
        flex: 1
    }
});

export default Welcome_login;