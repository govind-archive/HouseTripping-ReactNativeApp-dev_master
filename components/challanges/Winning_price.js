import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, TextInput, StatusBar, ScrollView, Platform, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Images from '../../assets/Images';
import Contants from '../../constants/Contants';
import Styles from '../../constants/Styles';
import { LinearGradient } from "expo-linear-gradient";

function Winning_price({ navigation, route }) {
    var price = "0";
    var type = "30";

    // if (route.params?.mobileNumber) {
    //     userData = route.params?.userData
    // } else {
    //     alert("Oops something went wrong please go back");

    // }

    if (route.params?.type) {
        type = route.params?.type;
    } else {
        alert("Oops, please login again");
    }

    let handleValue = (text) => {
        price = text;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

            <View style={[{
                    borderBottomWidth: 1.5,
                    borderColor: "#77A1D3",
                    ...Platform.select({
                        ios: {
                            marginTop: RFValue(15, Contants.DesignCanvas.HEIGHT),
                            height: RFValue(40, Contants.DesignCanvas.HEIGHT),
                            width: Dimensions.get('window').width,
                            alignItems: "center",


                        },
                        android: {
                            marginTop: RFValue(45, Contants.DesignCanvas.HEIGHT),
                            width: Dimensions.get('window').width,
                            height: RFValue(40, Contants.DesignCanvas.HEIGHT),
                            alignItems: "center",
                        }
                    })
                }]}>
                    <View style={[{
                        ...Platform.select({
                            ios: {
                                height: RFValue(40, Contants.DesignCanvas.HEIGHT),
                                width: "100%",
                                flex: 1,
                                flexDirection: "row",
                            },
                            android: {
                                width: "100%",
                                height: RFValue(40, Contants.DesignCanvas.HEIGHT),
                                flexDirection: "row",
                                flex: 1,
                            }
                        })
                    }]}>
                        <TouchableOpacity
                            style={{
                                alignSelf: "flex-start",
                                alignItems: "center",
                                alignContent: "center",
                                justifyContent: "center",
                                alignSelf: "center",
                            }}
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <Image
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginLeft: 20,
                                    marginRight: 20,
                                    tintColor: "#000",
                                }}
                                resizeMode='contain'
                                source={Images.all_screen_back_black_arrow_icon}
                            />
                        </TouchableOpacity>
                        <Text style={[Styles.BOLD_20, {
                            color: "#000",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                            justifyContent: "center",
                            alignSelf: "center",
                            flex: 1
                        }]}>Create Challenge</Text>

                    </View>
                </View>
                <View
                    style={{
                        width: "100%",
                    }}
                >
                    <View
                        style={{
                            width: "100%",
                        }}
                    >
                        <LinearGradient
                            colors={["#E683AF", "#7ACACB", "#77A1D3"]}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}
                            style={{
                                height: 1.5,
                                // marginStart: -10,
                                marginTop: -2,
                                width: 250,
                            }}
                        ></LinearGradient>
                    </View>
                </View>

                <Image style={{ width: 80, height: 80, marginLeft: 30, marginRight: 30, marginTop: 70 }} source={require('../../assets/images/create_challange_1_2.png')} />

                <View style={{ marginTop: 20, marginBottom: 50, marginLeft: 30, marginRight: 30 }}>
                    <Text style={styles.heading}>Winning Prize</Text>
                    <Text style={styles.para}>Enter the verification code we just sent you on your mobile number.</Text>
                </View>

                <View style={[styles.input, { flexDirection: 'row', alignContent: "flex-end", alignItems: "center" }]} >
                    <TextInput
                        style={[Styles.REGULAR_18, { flex: 1, lineHeight: 25, color: "#272D37" }]}
                        placeholder="Enter Amount"
                        keyboardType="numeric"
                        onChangeText={handleValue}
                    />

                    <Text style={[Styles.REGULAR_18, { lineHeight: 25, color: "#6263F0" }]}>
                        $
                    </Text>

                </View>

                <View style={{ flexDirection: 'row', marginRight: 30, marginBottom: 20, justifyContent: "flex-end", flex: 1, alignItems: "flex-end" }}>
                    <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => {
                        if (price == "0" || price == "") {
                            alert("please enter valid amount");
                            return;
                        }
                        navigation.navigate("Select_song", {
                            price: price,
                            type: type
                        });
                    }} >
                        <Image style={{ width: 50, height: 50, marginTop: 10 }} source={Images.next_page_imgae} />
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
        ...Styles.BOLD_28,
        lineHeight: 36,
        color: '#272D37',
        marginRight: "20%"
    },
    para: {
        ...Styles.REGULAR_15,
        lineHeight: 21,
        color: '#686E76',
        marginTop: 10,
        marginRight: "20%"
        // fontFamily: 'sp_regular',
    },
    heading_top: {
        color: '#272D37',
        fontSize: 20,
        marginTop: 15,
        marginLeft: -70,
        justifyContent: 'center',
        textAlign: 'center',
        flex: 1,
        fontWeight: 'bold'
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
    }
});

export default Winning_price;