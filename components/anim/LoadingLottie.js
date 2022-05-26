import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useState } from "react";
export default function LoadingLottie() {
    return (
        <View style={{
            position: "absolute",
            zIndex: 105, 
            justifyContent: "center", 
            flexDirection: "column",
            alignContent: "center",
            alignSelf: "center"
        }}>
            <LottieView
                source={require("../../assets/anim/78337-music-biggest-inspiration.json")}
                style={styles.animation}
                autoPlay
            />
        </View>
    );
}
const styles = StyleSheet.create({
    animation: {
        width: 100,
        height: 100,
        zIndex: 105
    },
});