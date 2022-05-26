import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

let mobileData = {};

function SignUp({ navigation, route }) {
    // if (route.params?.type) {
    //     mobileData.type = route.params?.type
    //     console.log(route.params?.type);
    // } else {
    //     alert("Oops something went wrong please go back");
    // }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                translucent
                backgroundColor="transparent"
                barStyle={"light-content"} />

            <ScrollView style={styles.customScrollview}
                contentContainerStyle={{ flexGrow: 1 }} >

                <View style={{ marginBottom: 30 }}>
                    <View style={{ width: '100%', height: "65%", flexDirection: "row", position: "relative" }}>
                        <Image style={{ width: '100%', borderBottomRightRadius: 25, borderBottomLeftRadius: 25 }} source={require('../assets/images/starting_pages_images.png')} />
                    </View>

                    <View style={{ marginTop: 15, marginBottom: 20, marginLeft: 30, marginRight: 30 }}>
                        <Text style={styles.heading}>Signup account</Text>
                        <Text style={styles.para}>Lorem Ipsum is simply dummy text of the.</Text>
                    </View>

                    <TouchableOpacity style={styles.signup} onPress={() => { navigation.navigate('SignUp_mobile', { "mobileNumber": { "type": "user" } }) }}>
                        <LinearGradient
                            style={{ borderRadius: 15 }}
                            colors={['#CE72F6', '#9C71FE', '#7572FF']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 1 }}
                        >
                            <Text style={[styles.center, { color: '#fff' }]}>Signup as Solo</Text>
                        </LinearGradient>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.loginButton} onPress={() => { navigation.navigate('SignUp_mobile', { "mobileNumber": { "type": "group" } }) }} >
                        <Text style={[styles.center, { color: '#6263F0' }]}>Signup as Group</Text>
                    </TouchableOpacity>


                    <Text style={[styles.para, { alignSelf: 'center', marginTop: 18 }]}>Already have an account?<Text onPress={() => { navigation.navigate("Login") }}  style={[styles.para, { color: '#6263F0' }]}> Login</Text> </Text>

                </View>
            </ScrollView>


        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: '100%',
        backgroundColor: '#F7EFFA',
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
        marginRight: 30,
        justifyContent: 'space-between',
        alignSelf: 'stretch',
    },
    loginButton: {
        backgroundColor: '#F7EFFA',
        borderRadius: 15,
        borderWidth: 1.5,
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        borderColor: '#6263F0',
    },
    center: {
        alignSelf: 'center',
        margin: 15,
        fontSize: 18,
        justifyContent: 'center'
    }
});

export default SignUp;