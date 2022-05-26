import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Images from '../assets/Images';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Styles from '../constants/Styles';
const Welcome_group = (props) => {
    return (

        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                translucent
                backgroundColor="transparent"
                barStyle={"dark-content"} />

            <View style={[{
                // backgroundColor: "yellow",
                height: Dimensions.get('window').height * 0.1222,
                width: Dimensions.get('window').width * 0.8856,
                marginTop: RFValue(100, 812),
                justifyContent: "center",
                alignItems: "center",
                // marginHorizontal: RFValue(25, 812)
            }]}>
               <Text style={[{fontSize:28,color:'#000',fontFamily:'BOLD', letterSpacing: -1}]}>Group Singing</Text>
               <Text style={[styles.para,{fontFamily:"REGULAR",fontSize:16,lineHeight:24}]}>Lorem Ipsum is simply dummy text of the{'\n'} printing and typesetting industry.</Text>
            </View>
            <View style={[{
              // backgroundColor:"red",
              width: Dimensions.get('window').width * 0.8856,
              height: Dimensions.get('window').height * 0.4996,
              justifyContent:"center",
              alignItems:"center",
              marginTop:RFValue(10,812)
            }]}>
                <Image style={[{
                     width:RFValue(360,812),
                     height:RFValue(320,812),
                }]}
                resizeMode="contain"
                source={Images.group_singing_image} />
            </View>



        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.6869,
        // backgroundColor: '#F7EFFA',
        // backgroundColor: 'green',
        alignItems: 'center',
        // justifyContent: 'center',
        alignItems: "center"
    },
    heading: {
        color: '#272D37',
        // fontSize: 28,
        alignSelf: 'center',
        // justifyContent: 'center',
        // fontWeight: 'bold'
        // fontFamily: 'sp_bold',
    },

    para: {
        color: '#686E76',
        alignSelf: 'center',
        // justifyContent: 'center',
        marginTop: 10,
        // marginLeft: 40,
        // marginRight: 40,
        textAlign: 'center'
        // fontFamily: 'sp_regular',
    },


    viewsStyle: {
        flex: 1,
        position: 'absolute', //Here is the trick
        bottom: 50, //Here is the trick
    },

    loginButton: {
        backgroundColor: '#F7EFFA',
        borderRadius: 15,
        borderWidth: 1.5,
        marginBottom: 10,
        marginLeft: 40,
        marginRight: 40,
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        bottom: -100, //Here is the trick
        borderColor: '#6263F0',
    },

    signup: {
        backgroundColor: '#F7EFFA',
        borderRadius: 10,
        marginLeft: 40,
        marginRight: 40,
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        bottom: -100, //Here is the trick 
    },

    center: {
        alignSelf: 'center',
        margin: 15,
        fontSize: 18,
        justifyContent: 'center'
    }
});



export default Welcome_group;