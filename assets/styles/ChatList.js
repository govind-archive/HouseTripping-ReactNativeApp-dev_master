import React, { userState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, SafeAreaView, StatusBar, FlatList, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import apiDetails from '../api/AllApis';
import Svg, { Path, G } from 'react-native-svg';

export default function ChatList({ navigation, route }) {
    var demo = [
        {
            "name": "A",
            "code": "+34",
            "id": "1",
            "img": "af.png"
        },
        {
            "name": "An",
            "code": "+34",
            "id": "6",
            "img": "af.png"
        },
        {
            "name": "Ans",
            "code": "+34",
            "id": "5",
            "img": "af.png"
        }
        , {
            "name": "Ans",
            "code": "+34",
            "id": "3",
            "img": "af.png"
        }
        , {
            "name": "Ansh",
            "code": "+34",
            "id": "2",
            "img": "af.png"
        }
        , {
            "name": "Ansh",
            "code": "+34",
            "id": "21",
            "img": "af.png"
        }
        , {
            "name": "Ansh",
            "code": "+34",
            "id": "22",
            "img": "af.png"
        }
        , {
            "name": "Ansh",
            "code": "+34",
            "id": "23",
            "img": "af.png"
        }
        , {
            "name": "Ansh",
            "code": "+34",
            "id": "24",
            "img": "af.png"
        }
    ];


    return (
        <SafeAreaView>
            <LinearGradient
                colors={['#CE72F6', '#9C71FE', '#7572FF']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={{ marginTop: -20, height: "120%" }}
            >
                <StatusBar
                    animated={true}
                    translucent
                    backgroundColor="transparent"
                    barStyle={"light-content"} />

                <View style={[styles.customHeader, { height: "7%", width: '100%', flexDirection: 'row' }]}>
                    <TouchableOpacity style={{ marginTop: 3 }}>
                        <Image style={{ width: 20, height: 20, margin: 20, marginLeft: 30, tintColor: '#FFF' }} source={require('../assets/images/back.png')} />
                    </TouchableOpacity>

                    <Text style={styles.heading_top}>
                        Messages
                    </Text>

                    <TouchableOpacity style={{ marginTop: 27, marginRight: 20, marginLeft: 10 }} >
                        <Image style={{ width: 20, height: 20, alignSelf: "center", tintColor: "#FFF" }} source={require('../assets/images/add.png')} />
                    </TouchableOpacity>
                </View>



                <View style={styles.lower_view}>
                    <LinearGradient
                        colors={['#F7EFFA', '#FEFAF9']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={{ borderTopRightRadius: 40, borderTopLeftRadius: 40, height: "77%", padding: 30 }}
                    >
                        <View>
                            <Text style={styles.heading_following}>All chats</Text>
                        </View>
                        <FlatList
                            contentContainerStyle={{ paddingBottom: 20 }}
                            data={demo}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View  >
                                    <View style={styles.background_style}>
                                        <Image style={{ width: 60, height: 60, borderRadius: 20, marginRight: 20 }} source={require('../assets/images/song_thumb.png')} />
                                        <View>
                                            <Text style={{ color: "#272D37", fontSize: 16 }}>
                                                Christina Perri
                                            </Text>
                                            <Text style={{ color: "#686E76", fontSize: 14, marginTop: 5 }}>
                                                @Christina Perri
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end', marginTop: -28 }}>
                                            <Text style={{ color: "#A1A3AA" }}>
                                                6:52 pm
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ height: 1, marginLeft: 60, backgroundColor: "#E4DDE5", width: "100%", marginBottom: 10 }} />
                                </View>
                            )}
                        />
                    </LinearGradient>
                </View>
            </LinearGradient>

        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    customHeader: {
        ...Platform.select({
            ios: {
            },
            android: {
                marginTop: 30
            },
            default: {
            }
        })
    },
    roundedButtons: {
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 20,
        paddingRight: 20,
        borderColor: "#272D37",
        borderRadius: 50,
        borderWidth: 1,
        height: 35
    },
    imgBackground: {
        width: '100%',
        height: '100%',
    },
    toggleButtons: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        flex: 1
    },
    container: {
        height: "100%",
        width: '100%',
        backgroundColor: '#4B38D3'
    },
    heading: {
        color: '#272D37',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
        // fontFamily: 'sp_bold',
    },
    heading_following: {
        fontSize: 16,
        marginBottom: 20,
        color: '#272D37',

    },
    secondHeading: {
        marginTop: 10,
        color: '#272D37',
        fontSize: 15,
    },
    input: {
        backgroundColor: "#FFF",
        paddingLeft: 15,
        borderRadius: 15,
        textAlign: "center",
        justifyContent: "center",
        marginTop: 10,
        height: 50
    },
    background_style: {
        flex: 1,
        height: '100%',
        width: '100%',
        marginBottom: 10,
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center"
    },
    signup: {
        borderRadius: 10,
        marginLeft: 30,
        marginTop: 10,
        marginRight: 30,
        bottom: '-66%',
        height: 50,
        justifyContent: 'space-between',
        alignSelf: 'stretch',
    },
    center: {
        alignSelf: 'center',
        marginLeft: 15,
        marginRight: 15,
        alignContent: "center",
        textAlign: "center",
        alignItems: "center",
        fontSize: 14,
        justifyContent: 'center'
    },
    profile_view: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
        flexDirection: 'column',
        width: 90,
        height: 90,
        alignItems: "center",
        marginRight: 20
    },
    profile_image: {
        borderWidth: 3,
        borderColor: '#4B38D3',
        width: "100%",
        height: "100%",
        borderRadius: 25
    },
    linerGradient_background: {
        borderRadius: 25,
        width: "100%",
        height: "100%",
        padding: 2
    },
    lower_view: {
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        overflow: 'hidden',
        marginTop: -5,
        flex: 1
    },
    heading_top: {
        color: '#FFF',
        fontSize: 20,
        marginTop: 20,
        marginLeft: "15%",
        justifyContent: 'center',
        textAlign: 'center',
        flex: 1,
        marginRight: "15%",
        fontWeight: 'bold'
    },
    profile_name: {
        fontSize: 18,
        fontWeight: '700',
        alignItems: "center",
        color: '#fff'
    },
    profile_username: {
        fontSize: 14,
        alignItems: "center",
        marginTop: 5,
        color: '#C4C3E7'
    },
    zero_common: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 5,
        marginTop: 5,
        fontWeight: 'bold'
    },
    follow_common: {
        color: '#fff',
        fontSize: 14,
        marginRight: 30
    },
    border_middle:
    {
        backgroundColor: '#B3B6BA',
        opacity: 0.3,
        width: "100%",
        height: 1,
        marginTop: 10,
        marginBottom: 20,
        alignSelf: "center"
    }

});