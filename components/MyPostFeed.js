import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, Text, TouchableWithoutFeedback, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import constants from "../assets/constants";
import Images from "../assets/Images";
import Styles from "../constants/Styles";
import { HeaderModel, HelpScreenModel } from "./Components/NewModelView";
const MyPostFeed = ({navigation}) => {
    const postData = [{
        id: '1',
        title: 'Camila Cabello',
        sub_title: '@camilac_cabello',
        image: Images.girl_img,
        image_menu: Images.three_black_dots,
        image_main: Images.profile_video_img,
        gogle_star_icon: Images.gogle_star_icon
    },
    {
        id: '2',
        title: 'Camila Cabello',
        sub_title: '@camilac_cabello',
        image: Images.girl_img,
        image_menu: Images.three_black_dots,
        image_main: Images.profile_video_img,
        gogle_star_icon: Images.gogle_star_icon

    }]
    /********************  Render Post Components   *****************/
    const renderItem = (item) => {
        return (
            <View style={{ borderBottomColor: '#272D37', borderBottomWidth: 0.2, width: Dimensions.get('window').width, marginTop: 5, justifyContent: 'center', alignItems: 'center', }} >
                <View style={{ height: Dimensions.get('window').height * 0.6863, width: Dimensions.get('window').width * 0.9253, marginTop: 5 }} >
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Image resizeMode="cover" borderRadius={16} source={item.image} style={{ width: 40, height: 40 }} />
                        </View>

                        <View style={{ marginLeft: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', width: Dimensions.get('window').width * 0.8253 }}>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text style={{ ...Styles.MEDIUM_15, color: '#272D37' }}>{item.title}</Text>
                                    <Text style={{ ...Styles.REGULAR_12, color: '#686E76', marginTop: 2 }}>{item.sub_title}</Text>
                                </View>
                                <TouchableOpacity style={{ justifyContent: 'center' }}>
                                    <Image resizeMode="center" borderRadius={16} source={item.image_menu} style={{ width: 40, height: 40 }} />
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>

                    <View style={{ justifyContent: 'space-between' }}>
                        <View style={{ marginTop: 10, }}>
                            <Image resizeMode="cover" source={item.image_main}
                                style={{ width: Dimensions.get('window').width * 0.9245, height: Dimensions.get('window').height * 0.3893, borderRadius: 16 }}
                            />
                        </View>

                        <View style={{ position: 'absolute', width: '100%', marginTop: 20, paddingHorizontal: 10, alignItems: 'flex-end' }}>
                            <TouchableOpacity style={{ alignItems: 'flex-end', flexDirection: 'row', backgroundColor: 'green', width: 150, height: 30, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#272D37', borderRadius: 16 }}>
                                <Text style={{ ...Styles.MEDIUM_15, color: 'white' }}>love you like a love</Text>

                                <Image resizeMode="cover" source={Images.head_set_icon}
                                    style={{ width: 20, height: 20, }}
                                />
                            </TouchableOpacity>

                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', position: "absolute",marginTop:Dimensions.get('window').height *( 0.3893/2.05)}}>
                            <View style={{width: '40%', justifyContent: 'space-between', alignItems: 'center', flexDirection: "row" }}>
                                <TouchableOpacity>
                                    <Image resizeMode="cover" source={Images.decrees_video_icon}
                                        style={{ width: 20, height: 20, }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image resizeMode="cover" source={Images.play_icon}
                                        style={{ width: 40, height: 40, }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image resizeMode="cover" source={Images.increes_video_icon}
                                        style={{ width: 20, height: 20, }}
                                    />
                                </TouchableOpacity>

                            </View>

                        </View>
                        <View style={{ position: 'absolute', width: '100%', marginTop: Dimensions.get('window').height *( 0.3893/1.099), paddingHorizontal: 10, alignItems: 'flex-start', }}>
                            <TouchableOpacity style={{ alignItems: 'flex-end', flexDirection: 'row', backgroundColor: 'green', width: 80, height: 25, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#272D37', borderRadius: 4 }}>

                                <Image resizeMode="cover" source={Images.song_bars}
                                    style={{ width: 20, height: 20, }}
                                />
                                <Text style={{ ...Styles.MEDIUM_15, color: 'white' }}>2:30</Text>

                            </TouchableOpacity>

                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                        <View style={{
                            marginTop: 10, flexDirection: 'row', justifyContent: 'space-between',
                            width: Dimensions.get('window').width * 0.4553
                        }}>
                            <View style={{ flexDirection: 'row', width: 50, marginRight: 10, justifyContent: 'center' }}>
                                <Image source={Images.gogle_star_icon} />
                                <Text style={{ ...Styles.MEDIUM_15, color: '#272D37', marginLeft: 6 }}>17k</Text>

                            </View>
                            <View style={{ flexDirection: 'row', width: 50, marginRight: 10, justifyContent: 'center' }}>
                                <Image source={Images.comment_unfilled} style={{ width: 16, height: 16 }} />
                                <Text style={{ ...Styles.MEDIUM_15, color: '#272D37', marginLeft: 6 }}>17k</Text>

                            </View>
                            <View style={{ flexDirection: 'row', width: 50, marginRight: 10, justifyContent: 'center' }}>
                                <Image source={Images.share} style={{ width: 16, height: 16 }} />
                                <Text style={{ ...Styles.MEDIUM_15, color: '#272D37', marginLeft: 6 }}>17k</Text>

                            </View>

                        </View>
                        <View style={{ flexDirection: 'row', width: 50, marginRight: 10, justifyContent: 'center', marginTop: 10 }}>
                            <TouchableOpacity style={{ backgroundColor: '#272D37', width: 62, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 16 }}>
                                <Text style={{ ...Styles.REGULAR_15, color: 'white' }}>Sing</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <Text style={{ ...Styles.SEMIBOLD_14 }}>Manuel Rovira </Text>
                            <Text style={{ ...Styles.REGULAR_15 }}>Hey Friend, watch my new song video & </Text>
                        </View>
                        <View>
                            <Text style={{ ...Styles.REGULAR_15 }}>share vid your friends 😍 #sharevid #karaoke #mybest #housetripping #party...more</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ ...Styles.REGULAR_15, color: '#686E76' }}>Be thew first to comment</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ ...Styles.REGULAR_15, color: '#686E76' }}>2 days</Text>
                    </View>
                </View>

            </View>

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
                <LinearGradient
                    colors={["#E683AF", "#7ACACB", "#77A1D3"]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    style={[Styles.BackgroundGradient]}>
                    <HeaderModel
                     leftimgstyle={[{
                        width:20,
                        height:20
                      }]}
                      // rightimgstyle={[{
                      //   width:20,
                      //   height:20
                      // }]}
                        onPress={() => {
                            navigation.goBack();
                        }}
                        HeaderTitle={'Camila Cabello posts'}
                        leftImage={Images.drop_down}
                    />
                    <LinearGradient
                        colors={constants.AppColor.FLEX_GRADIENT_BACK_COLOR}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={[Styles.LinearGradientStyle]}>
                        {/* /*************************section code start************************* */}
                        <View>
                            <View style={[{
                                //    height:Dimensions.get('window').height*0.005270,
                                // backgroundColor:'red'
                                marginTop: -20,

                            }]}>
                                <FlatList

                                    showsVerticalScrollIndicator={false}
                                    data={postData}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => renderItem(item)}
                                />
                            </View>
                        </View>
                        {/* /*************************section code end************************* */}

                        {/* /*************************section code end************************* */}
                    </LinearGradient>
                </LinearGradient>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
export default MyPostFeed;