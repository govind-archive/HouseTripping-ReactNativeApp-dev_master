import React from "react";
import {
    StyleSheet,
    StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
export default function Header({ navigation }) { 
    return (
        <LinearGradient
            colors={["#E683AF", "#7ACACB", "#77A1D3"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={styles.customHeader}
        >
            <StatusBar
                animated={true}
                translucent
                backgroundColor="transparent"
                barStyle={"light-content"}
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    customHeader: {
        ...Platform.select({
            ios: {
                height: 20,
            },
            android: {
                height: StatusBar.currentHeight,
            },
            default: {},
        }),
    },
});





