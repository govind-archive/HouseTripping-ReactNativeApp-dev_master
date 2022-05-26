import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const Welcome_solo = (props) => {
    return (

        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                translucent
                backgroundColor="transparent"
                barStyle={"dark-content"} />

            <View style={{ top: "-15%" }}>
                <Text style={styles.heading}>Solo Singing</Text>
                <Text style={styles.para}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
            </View>

            <Image style={{ top: 0, height: "40%", width: "55%" }} source={require('../assets/images/middle_image.png')} />



        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    heading: {
        color: '#272D37',
        fontSize: 28,
        alignSelf: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
        // fontFamily: 'sp_bold',
    },

    para: {
        color: '#686E76',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginLeft: 40,
        marginRight: 40,
        textAlign: 'center'
        // fontFamily: 'sp_regular',
    },

    container: {
        flex: 1,
        backgroundColor: '#F7EFFA',
        alignItems: 'center',
        justifyContent: 'center',
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



export default Welcome_solo;