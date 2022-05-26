import React, { userState } from 'react';
import { filter } from 'lodash';
import { StyleSheet, FlatList, Text, View, Image, SafeAreaView, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, G, Circle, Rect } from 'react-native-svg';
import apiDetails from '../api/AllApis';
// import { SceneMap, TabView } from 'react-native-tab-view';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { NavigationContainer } from '@react-navigation/native';
import SignUp from './SignUp';
import Welcome_solo from './Welcome_solo';
import {
    MenuProvider, Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import Welcome_group from './Welcome_group';
import { ScrollView } from 'react-native-gesture-handler';

let userData = { 
} 


export default function MyProfile({ navigation, route }) {
    let a = new apiDetails()
    let image = "";
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
    ]);

    if (route.params?.userData) {
        userData = route.params?.userData
    } else {
        alert("Oops, please login again");
    }

    if (userData.image) {
        image = a.baseURLs + "/public/profile_images/" + userData.image;
    } else {
        image = a.baseURLs + "/public/profile_images/" + "err"
    }

    return (
        <MenuProvider style={styles.container}>
            <SafeAreaView style={styles.container}>

                <StatusBar
                    animated={true}
                    translucent
                    backgroundColor="transparent"
                    barStyle={"light-content"} />

                <View style={[styles.customHeader,{ height: "10%", width: '100%', flexDirection: 'row' }]}>
                    <TouchableOpacity style={{ marginTop: "0%" }} onPress={() => { navigation.navigate('HomeFeed') }}>
                        <Image style={{ width: 20, height: 20, margin: 20, marginLeft: 30, tintColor: '#FFF' }} source={require('../assets/images/back.png')} />
                    </TouchableOpacity>

                    <Text style={styles.heading_top}>
                        Profile
                    </Text>

                    <Menu style={{ marginTop: 16, marginRight: 20 }}>
                        <MenuTrigger >
                            <Svg id="Group_52060" data-name="Group 52060" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
                                <Rect id="Rectangle_84" data-name="Rectangle 84" width="28" height="28" fill="rgba(255,255,255,0)" />
                                <G id="Group_52149" data-name="Group 52149" transform="translate(2 1)">
                                    <Circle id="Ellipse_278" data-name="Ellipse 278" cx="1.5" cy="1.5" r="1.5" transform="translate(11 5)" fill="#fff" />
                                    <Circle id="Ellipse_278-2" data-name="Ellipse 278" cx="1.5" cy="1.5" r="1.5" transform="translate(11 12)" fill="#fff" />
                                    <Circle id="Ellipse_278-3" data-name="Ellipse 278" cx="1.5" cy="1.5" r="1.5" transform="translate(11 19)" fill="#fff" />
                                </G>
                            </Svg>
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption onSelect={() =>
                                navigation.navigate("SettingProfile",
                                    { "userData": userData })} text='Settings' />
                            <MenuOption onSelect={() => alert(`Delete`)} >
                                <Text style={{ color: 'red' }}>Delete</Text>
                            </MenuOption>
                            <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
                        </MenuOptions>
                    </Menu>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                    <View style={styles.profile_view}>
                        <LinearGradient
                            colors={['#CE72F6', '#9C71FE', '#7572FF']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}
                            style={styles.linerGradient_background}
                        >
                            <Image style={styles.profile_image} source={require('../assets/images/demo_profile.jpg')} defaultSource={require('../assets/images/demo_profile.jpg')} />

                        </LinearGradient>
                        <Image style={{ marginTop: -20, height: 30, width: 30 }} source={require('../assets/images/camera_profile.png')} />
                    </View>

                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.profile_name}>{userData.name} {userData.lastname}</Text>
                        <Text style={styles.profile_username}>@{userData.username}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.zero_common}>0</Text>
                                <Text style={styles.follow_common}>followers</Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.zero_common}>0</Text>
                                <Text style={styles.follow_common}>followings</Text>
                            </View>
                        </View>
                    </View>

                </View>

                <View style={styles.lower_view}>
                    <LinearGradient
                        colors={['#F7EFFA', '#FEFAF9']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={{ borderTopRightRadius: 40, borderTopLeftRadius: 40, height: "100%" }}
                    >

                        <View style={styles.border_middle}>

                        </View>

                        {/* <NavigationContainer>
                            <Tab.Navigator>
                                <Tab.Screen name="Home" component={HomeScreen} />
                                <Tab.Screen name="Settings" component={SettingsScreen} />
                            </Tab.Navigator>
                        </NavigationContainer> */}


                    </LinearGradient>
                </View>

            </SafeAreaView >
        </MenuProvider>

    );
}


const styles = StyleSheet.create({
    imgBackground: {
        width: '100%',
        height: '100%',
    },
    container: {
        height: "100%",
        width: '100%',
        backgroundColor: '#4B38D3'
    },
    customHeader: {
        ...Platform.select({
            ios: {
            },
            android: {
                marginTop: 20
            },
            default: {
                height: "11%"
            }
        })
    },
    input: {
        flexDirection: "row",
        justifyContent: 'center',
        alignContent: "center",
        textAlign: 'center',
        width: '40%',
        height: 170,
        marginLeft: 20,
        marginRight: 20
    },
    background_style: {
        flex: 1,
        height: '100%',
        width: '100%'
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
        margin: 15,
        fontSize: 15,
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
        height: "100%",
        marginTop: 35,
        overflow: 'hidden'
    },
    heading_top: {
        color: '#FFF',
        fontSize: 20,
        marginTop: 20,
        justifyContent: 'center',
        textAlign: 'center',
        flex: 1,
        marginRight: 10,
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
        opacity: 0.5,
        width: 50,
        borderRadius: 10,
        height: 3,
        marginTop: 10,
        marginBottom: 10,
        alignSelf: "center"
    }

});
