import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Dimensions, Platform, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import constants from '../assets/constants';
import { RFValue } from 'react-native-responsive-fontsize';
import Contants from '../constants/Contants';
import Styles from '../constants/Styles';
import Images from '../assets/Images';

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
           <ImageBackground
                style={[{
                    ...Platform.select({
                        ios: {
                            width: Dimensions.get("window").width,
                            // height: Dimensions.get('window').height
                            flex: 1,
                            marginTop: -40
                        },
                        android: {
                            width: Dimensions.get("window").width,
                            // height: Dimensions.get('window').height
                            flex: 1,
                        }
                    })


                }]}
                source={Images.all_screen_bg_image}
            >
            <StatusBar
                animated={true}
                translucent
                backgroundColor="transparent"
                barStyle={"light-content"} />
 {/* <LinearGradient
            colors={["#FEFAF9", "#F7EFFA",]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={[Styles.BackgroundGradient]}> */}
            <ScrollView bounces={false} style={styles.customScrollview}
                contentContainerStyle={{ flexGrow: 1 }} >

                <View>
                    <View
                        style={{
                            width: Dimensions.get('window').width,
                        }}
                    >
                        <Image
                            style={{
                              ...Platform.select({
                                ios:{
                                width: "100%",
                                height: Dimensions.get("window").height*0.6551,
                                borderBottomRightRadius: 25,
                                borderBottomLeftRadius: 25,
                                },
                                android:{
                                width: "100%",
                                height: Dimensions.get("window").height*0.6551,
                                borderBottomRightRadius: 25,
                                borderBottomLeftRadius: 25,
                                }
                              })
                                
                            }}
                            resizeMode="cover"
                            source={Images.signup_girl_image}
                        />
                    </View>
                    <View
                style={[styles.SameContainer, { paddingHorizontal: RFValue(30, 812),
                marginTop:Platform.OS === 'ios' ? 30 :40
                }]}
              >
                <View style={[{
                  // backgroundColor:'green',
                  width: Dimensions.get('window').width * 0.8856
                }]}>
                  <Text style={[styles.heading,Styles.BOLD_28,{letterSpacing:-1}]}>Signup Account</Text>
                  <Text style={[styles.para,Styles.REGULAR_16]}>
                    Lorem Ipsum is simply dummy text of the.
                  </Text>
                </View>
              </View>

              <View
                style={[styles.SameContainer, { paddingHorizontal: RFValue(25, 812) }]}
              >
                <View style={[{
                  // backgroundColor: 'green',
                  width: Dimensions.get('window').width * 0.8856,
                  height: 50,
                  // marginTop:RFValue(20,Contants.DesignCanvas.HEIGHT)
                }]}>
                  <TouchableOpacity style={[{
                    // backgroundColor: 'red',
                    width: Dimensions.get('window').width * 0.8856,
                    height: 50,
                    borderRadius: 16,
                  }]}
                  onPress={() => { navigation.navigate('SignUp_mobile', { "mobileNumber": { "type": "user" } }) }}
                  >
                    <LinearGradient
                       style={[{
                        // backgroundColor: 'red',
                        width: Dimensions.get('window').width * 0.8856,
                        height: 50,
                        borderRadius: 16,
                        justifyContent:"center",
                        alignItems:"center"
                      }]}
                      colors={constants.AppColor.LINEAR_GRADIENT_COLOR_BUTTON}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 0, y: 1 }}
                    >
                      <Text style={[Styles.MEDIUM_16,{ color: "#fff",letterSpacing:-1 }]}>
                      Signup as Solo
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  </View>
                  <View style={[{
                  // backgroundColor: 'green',
                  width: Dimensions.get('window').width * 0.8856,
                  height: 50,
                  marginTop:RFValue(10,Contants.DesignCanvas.HEIGHT)
                }]}>
                  <TouchableOpacity style={[{
                    // backgroundColor: 'red',
                    width: Dimensions.get('window').width * 0.8856,
                    height: 50,
                    borderRadius: 16,
                    borderColor: constants.AppColor.BUTTON_BORDER_COLOR,
                    justifyContent:"center",
                    alignItems:"center",
                    borderWidth:1,
                    // marginTop:10
                  }]}
                  onPress={() => { navigation.navigate('SignUp_mobile', { "mobileNumber": { "type": "group" } }) }}
                  >
                   
                      <Text style={[Styles.MEDIUM_16,{ color: "#77A1D3",letterSpacing:-1 }]}>
                      Signup as Group
                      </Text>
                  </TouchableOpacity>
                </View>
               
              </View>
              <View
                style={[styles.SameContainer, { paddingHorizontal: RFValue(30, 812),  marginTop: RFValue(20, Contants.DesignCanvas.HEIGHT),}]}
              >
                <View style={[{
                  // backgroundColor: 'green',
                  width: Dimensions.get('window').width * 0.8856,
                  // height: 50,
                  // marginBottom:RFValue(5,Contants.DesignCanvas.HEIGHT),
                  flexDirection:"row",
                  justifyContent:"center"
                }]}>
                  <Text style={[Styles.REGULAR_16,{
                    color:'#272D37'
                  }]}>Already have an account ?</Text>
                  <TouchableOpacity  onPress={() => { navigation.navigate("Login") }}>
                  <Text style={[Styles.REGULAR_16,{
                    color:"#77A1D3"
                  }]}>{''} Login</Text>
                  </TouchableOpacity>
                </View>
                </View>

              
              
              
                </View>
            </ScrollView>
            {/* </LinearGradient> */}
            </ImageBackground>
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
                marginTop: -50
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
        // fontSize: 23,
        // fontWeight: 'bold'
        // fontFamily: 'sp_bold',

    },
    para: {
        color: '#686E76',
        marginTop: 8,
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
        borderColor: constants.AppColor.BUTTON_BORDER_COLOR,
    },
    center: {
        alignSelf: 'center',
        margin: 15,
        fontSize: 18,
        justifyContent: 'center'
    },
    SameContainer: {
        // backgroundColor: "red",
        marginTop: RFValue(30, Contants.DesignCanvas.HEIGHT),
        width: Dimensions.get('window').width,
        paddingHorizontal: RFValue(25, 812)
    },
});

export default SignUp;