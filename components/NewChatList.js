import React, { userState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, SafeAreaView, StatusBar, FlatList, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import apiDetails from '../api/AllApis';
import Svg, { Path, G } from 'react-native-svg';
import { styles } from '../assets/styles/NewChatList';
import Styles from '../constants/Styles';
import { HeaderModel } from './Components/NewModelView';
import Images from '../assets/Images';
import constants from '../assets/constants';

export default function NewChatList({ navigation, route }) {
    var demo = [
        {
            "name": "Enrique Iglesias",
            "id": "1",
        },
        {
            "name": "Christina Perri",
            "id": "2",
        },
        {
            "name": "Justin Bieber",
            "id": "3",
        }
        , {
            "name": "Pitbull",
            "id": "4",
        }
        , {
            "name": "Selena Gomez",
            "id": "5",
        }
        , {
            "name": "Taylor Swift",
            "id": "6",
        }
        , {
            "name": "Lady Gaga",
            "id": "7",
        }
    ];

    // <SafeAreaView>
    //     <LinearGradient
    //         colors={['#CE72F6', '#9C71FE', '#7572FF']}
    //         start={{ x: 1, y: 0 }}
    //         end={{ x: 0, y: 0 }}
    //         style={{ marginTop: -20, height: "120%" }}
    //     >
    //         <StatusBar
    //             animated={true}
    //             translucent
    //             backgroundColor="transparent"
    //             barStyle={"light-content"} />

    //         <View style={[styles.customHeader, { height: "7%", width: '100%', flexDirection: 'row' }]}>
    //             <TouchableOpacity onPress={() => {
    //                 navigation.goBack()
    //             }} style={{ marginTop: 3 }}>
    //                 <Image style={{ width: 20, height: 20, margin: 20, marginLeft: 30, tintColor: '#FFF' }} source={require('../assets/images/back.png')} />
    //             </TouchableOpacity>

    //             <Text style={styles.heading_top}>
    //                 New messages
    //             </Text>

    //         </View>



    //         <View style={styles.lower_view}>
    //             <LinearGradient
    //                 colors={['#F7EFFA', '#FEFAF9']}
    //                 start={{ x: 1, y: 0 }}
    //                 end={{ x: 0, y: 1 }}
    //                 style={{ borderTopRightRadius: 40, borderTopLeftRadius: 40, height: "77%", padding: 30 }}
    //             >

    //                 <FlatList
    //                     contentContainerStyle={{ paddingBottom: 20 }}
    //                     data={demo}
    //                     showsVerticalScrollIndicator={false}
    //                     renderItem={({ item }) => (
    //                         <View  >
    //                             <View style={styles.background_style}>
    //                                 <Image style={{ width: 60, height: 60, borderRadius: 20, marginRight: 20 }} source={require('../assets/images/song_thumb.png')} />
    //                                 <View>
    //                                     <Text style={{ color: "#272D37", fontSize: 16 }}>
    //                                         Christina Perri
    //                                     </Text>
    //                                 </View>
    //                                 <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
    //                                     <Image style={{ width: 20, height: 20, marginRight: 10 }} source={require('../assets/images/message.png')} />
    //                                 </View>
    //                             </View>
    //                             <View style={{ height: 1, marginLeft: 60, backgroundColor: "#E4DDE5", width: "100%", marginBottom: 10 }} />
    //                         </View>
    //                     )}
    //                 />
    //             </LinearGradient>
    //         </View>
    //     </LinearGradient>

    // </SafeAreaView>

    /**********************************  Render List Item Component  ******************************/
    const renderListItem = (item) => {
        return (
            <TouchableOpacity onPress={() => { 
                navigation.navigate("MessagesScreen",
                    { "userData": item, 'listShow': 'no' });
            }}  >
                <View style={styles.background_style}>
                    <Image style={{ width: 60, height: 60, borderRadius: 20, marginRight: 20 }} source={require('../assets/images/song_thumb.png')} />
                    <View>
                        <Text style={{ ...Styles.MEDIUM_16, color: '#272D37' }}>{item.name}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                        <Image style={{ width: 20, height: 20, marginRight: 10 }} source={require('../assets/images/message.png')} />
                    </View>
                </View>
                <View style={{ height: 1, marginLeft: 60, backgroundColor: "#E4DDE5", width: "100%", marginBottom: 10 }} />
            </TouchableOpacity>
        );
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                animated={true}
                translucent
                backgroundColor="transparent"
                barStyle={"light-content"}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={[Styles.customScrollview]}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <LinearGradient
                        colors={["#E683AF", "#7ACACB", "#77A1D3"]}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 0 }}
                        style={[Styles.BackgroundGradient]}>
                        <HeaderModel
                          leftimgstyle={[{
                            width:28,
                            height:28
                          }]}
                        //   rightimgstyle={[{
                        //     width:20,
                        //     height:20
                        //   }]}
                            onPress={() => {
                                navigation.goBack();
                            }}
                            HeaderTitle={'New Message'}
                            leftImage={Images.all_screen_back_black_arrow_icon}
                        />
                        <LinearGradient
                            colors={constants.AppColor.FLEX_GRADIENT_BACK_COLOR}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={[Styles.LinearGradientStyle]}>
                            <ScrollView showsVerticalScrollIndicator={false} style={[Styles.customScrollview]}>
                                {/* /*************************section code start************************* */}
                                <View style={[Styles.SameContainerStyle]}>
                                    <FlatList
                                        contentContainerStyle={{ paddingBottom: 20 }}
                                        data={demo}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({ item }) => renderListItem(item)}
                                    />
                                </View>
                            </ScrollView>
                        </LinearGradient>
                    </LinearGradient>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );







}

