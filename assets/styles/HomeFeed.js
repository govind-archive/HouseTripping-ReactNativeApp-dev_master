import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Bottom_bar from './Bottom_bar';


const HomeFeed = () => {

    return (
        < View style={styles.container} >
            <LinearGradient
                colors={['#CE72F6', '#9C71FE', '#7572FF']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={{ height: "100%" }}
            >
                <StatusBar
                    animated={true}
                    translucent
                    backgroundColor="transparent"
                    barStyle={"dark-content"} />

                <View style={{ height: "10%", marginBottom: 10 }}>
                    <LinearGradient
                        colors={['#CE72F6', '#9C71FE', '#7572FF']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={{ flexDirection: 'row', height: "100%" }}
                    >
                        {/* <TouchableOpacity style={{ marginTop: "5%" }}>
                            <Image style={{ width: 20, height: 20, margin: 20, marginLeft: 30, tintColor: '#FFF' }} source={require('../assets/images/back.png')} />
                        </TouchableOpacity> */}

                        <Text style={{ color: '#FFF', fontSize: 18, marginTop: "9.3%", justifyContent: 'center', textAlign: 'center', flex: 1 }}>
                            Home Feed
                        </Text>
                    </LinearGradient>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 40, borderTopLeftRadius: 40, overflow: 'hidden', height: '100%', zIndex: 0 }}>
                    <LinearGradient
                        colors={['#F7EFFA', '#FEFAF9']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={{ borderTopRightRadius: 40, borderTopLeftRadius: 40, width: '100%', height: '100%',padding:20 }}
                    >
                        <Text>Home Feed page</Text>
                    </LinearGradient>
                </View>

                <Bottom_bar />
            </LinearGradient>
        </View >
    )

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
})

export default HomeFeed;