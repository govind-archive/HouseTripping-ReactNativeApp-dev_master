import React from 'react';
import { StyleSheet, View, Text, Animated, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PagerView from 'react-native-pager-view';
import Welcome_group from './Welcome_group';
import Welcome_solo from './Welcome_solo';
import Welcome_challenges from './Welcome_challenges';
import Welcome_superstar from './Welcome_superstar';

var viewPagerCustom;
var currentPage = 0;
function changePage(args) {
    if (args == "prev") {
        if (currentPage <= 0) {

        } else {
            currentPage = currentPage - 1;
        }
    } else {
        if (currentPage >= 3) {

        } else {
            currentPage = currentPage + 1;
        }
    }
    viewPagerCustom.setPage(currentPage);
}

function Welcome({ navigation }) {

    const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
    AnimatedPagerView.setPage = 2
    return (
        <SafeAreaView style={styles.pagerView}>
            <AnimatedPagerView style={styles.animatedPagerView} initialPage={0}
                ref={(viewpager) => { viewPagerCustom = viewpager }}>
                <View key="1">
                    <Welcome_solo onParaMeter={(t) => navigation.navigate(t, {
                        "type": "user"
                    })} />
                </View>
                <View key="2">
                    <Welcome_group onParaMeter={(t) => navigation.navigate(t, {
                        "type": "group"
                    })} />
                </View>
                <View key="3">
                    <Welcome_challenges onParaMeter={(t) => navigation.navigate(t, {
                        "type": "group"
                    })} />
                </View>
                <View key="4">
                    <Welcome_superstar onParaMeter={(t) => navigation.navigate(t, {
                        "type": "group"
                    })} />
                </View>
            </AnimatedPagerView>

            <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 50, marginTop: -80 }}>
                <TouchableOpacity style={{ marginRight: 15, height: 30, width: 30 }} onPress={() => { changePage("prev") }}>
                    <Image style={{ height: 30, width: 30 }} source={require('../assets/images/prev_rounded.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => { changePage("next") }}>
                    <Image style={{ height: 30, width: 30 }} source={require('../assets/images/next_rounded.png')} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={() => {
                navigation.navigate("Welcome_login", {
                    "type": "user"
                })
            }} >
                <Text style={[styles.center, { color: '#6263F0' }]}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signup} onPress={() => {
                navigation.navigate("SignUp", {
                    "type": "user"
                })
            }}>
                <LinearGradient
                    style={{ borderRadius: 15 }}
                    colors={['#CE72F6', '#9C71FE', '#7572FF']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                >
                    <Text style={[styles.center, { color: '#fff' }]}>Sign up</Text>
                </LinearGradient>
            </TouchableOpacity>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    pagerView: {
        backgroundColor: '#F7EFFA',
        width: '100%',
        flex: 1,
        marginBottom: 10,
    },
    animatedPagerView: {
        backgroundColor: '#F7EFFA',
        width: '100%',
        flex: 1,
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
        borderColor: '#6263F0',
    },

    signup: {
        backgroundColor: '#F7EFFA',
        borderRadius: 10,
        marginLeft: 40,
        marginRight: 40,
        justifyContent: 'space-between',
        alignSelf: 'stretch',
    },
    center: {
        alignSelf: 'center',
        margin: 15,
        fontSize: 18,
        justifyContent: 'center'
    }
});

export default Welcome;