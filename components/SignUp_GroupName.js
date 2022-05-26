import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, TextInput, StatusBar, ScrollView, ImageBackground } from 'react-native';
import apiDetails from '../api/AllApis';
import normalize from 'react-native-normalize';
import Images from '../assets/Images';
import { NormalHeader } from './Components/customHeader';
import { BlurView } from 'expo-blur';
let mobileData;
let groupName = "";

function apiCall(navigation) {
    if (groupName.length < 1) {
        alert("Please enter groupName")
    } else {
        const a = new apiDetails();
        a.api
            .post(a.checkusername, { "username": groupName })
            .then(response => {
                if (response.data.status == "200") {
                    mobileData.groupName = groupName;
                    navigation.navigate("SignUp_smart_password",
                        { "mobileNumber": mobileData });
                } else {
                    console.log(response);
                    alert(response.data.msg);
                }
            })
    }
}

function SignUp_GroupName({ navigation, route }) { 
    if (route.params?.mobileNumber) {
        mobileData = route.params?.mobileNumber
    } else {
        alert("Oops something went wrong please go back");
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                style={[{
                    width: '100%',
                    height: '100%'
                }]}
                source={Images.full_name_back_image}
            >
                <NormalHeader
                    onPress={() => {
                        navigation.navigate({
                            name: 'SignUp_email',
                            merge: true,
                        })
                    }}
                    source={Images.back_icon}
                />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={[{
                        // backgroundColor:'red',
                        marginHorizontal: normalize(20),
                        height: '100%'
                    }]}>
                        <View style={[{
                            // backgroundColor:'green',
                            height: normalize(70)
                        }]}>
                            <Image
                                style={[{
                                    width: normalize(70),
                                    height: normalize(70)
                                }]}
                                source={Images.hand_wav_image}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={[{
                            // backgroundColor:"green",
                            marginTop: normalize(20)
                        }]}>
                            <Text style={[styles.heading]}>
                                Pick a Group Name
                            </Text>

                        </View>
                        <View style={[{
                            // backgroundColor:"green",
                            marginTop: normalize(20)
                        }]}>
                            <Text style={[{
                                color: '#fff',
                                fontSize: normalize(18)
                            }]}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                            </Text>
                        </View>
                        <View style={[{
                            // backgroundColor: "green",
                            marginTop: normalize(50),
                            // flexDirection:'row',
                            // justifyContent: 'space-between'
                        }]}>
                            <BlurView intensity={100} style={[styles.blur_View]}>
                                <Image
                                    style={[{
                                        width: normalize(20),
                                        height: normalize(20)
                                    }]}
                                    source={Images.at_the_rate_image}
                                />
                                <TextInput
                                    style={[styles.input]}
                                    placeholder="Enter groupname"
                                    onChangeText={(t) => {
                                        groupName = t
                                    }}
                                />
                            </BlurView>
                        </View>
                        {/* <View style={[{
                            // backgroundColor:"green",
                            marginTop: normalize(10)
                        }]}>
                            <Text style={[{
                                color: '#fff',
                                fontSize: normalize(18)
                            }]}>
                               This username is already taken. Please choose{'\n'}another username
                            </Text>
                        </View> */}
                      
                        <View style={[{
                            flex: 1,
                            justifyContent: 'flex-end',
                            // alignItems:'flex-end',
                            marginBottom: normalize(30)
                        }]}>
                            <View style={[{
                                height: normalize(70),
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end'
                            }]}>
                                <TouchableOpacity onPress={() => { apiCall(navigation) }} >
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
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
          
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
    },
    name_suggest_touc_style:{
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
        width:normalize(110),
        height:normalize(40),
        borderRadius:normalize(25),
        borderColor:'#fff'
    },
    blur_View: {
        borderRadius: normalize(15),
        textAlign: "center",
        fontSize: 20,
        height: normalize(50),
        // width: normalize(75)
        marginTop: normalize(10),
        paddingLeft: normalize(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        // backgroundColor: "#FFF",
        borderRadius: normalize(15),
        fontSize: 18,
        height: normalize(50),
        color: "#fff",
        paddingLeft: normalize(15),
        width: normalize(310)
    },
    heading: {
        color: '#fff',
        fontSize: normalize(30),
        fontWeight: 'bold',

    },
});

export default SignUp_GroupName;