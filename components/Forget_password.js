import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
} from "react-native";
import apiDetails from "../api/AllApis";
import Images from "../assets/Images";
import { androidClientId, IOSclient } from "../superSecretKey";
import * as Google from "expo-google-app-auth";

const forgetPasswordApiCall = (email, navigation) => {
  if (email == "") {
    alert("Please enter valid email");
  } else {
    //  api call here
    const a = new apiDetails();
    a.api.post(a.forgetPassword, { email: email }).then((response) => {
      console.log(response.data);
      if (response.data.status == "200") {
        alert("Link sent on your email...!!!");
        navigation.goBack();
      } else {
        alert(response.data.msg);
      }
    });
  }
};

function Forget_password({ navigation, route }) {
  const [emailState, setEmailState] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        translucent
        backgroundColor="transparent"
        barStyle={"dark-content"}
      />

      <ScrollView
        style={{ flexDirection: "column", flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View style={styles.customTopBar}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image
                style={{ width: 20, height: 20, margin: 20, marginLeft: 30 }}
                source={require("../assets/images/back.png")}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Image
              style={{
                width: 80,
                height: 80,
                marginLeft: 30,
                marginRight: 30,
                marginTop: 70,
              }}
              source={require("../assets/images/email_Image.png")}
            />

            <View
              style={{
                marginTop: 20,
                marginBottom: 50,
                marginLeft: 30,
                marginRight: 30,
              }}
            >
              <Text style={styles.heading}>Enter email</Text>
              <Text style={styles.para}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>
            </View>

            <View
              style={[
                styles.input,
                {
                  flexDirection: "row",
                  alignContent: "flex-end",
                  flex: 1,
                  paddingLeft: 20,
                },
              ]}
            >
              <TextInput
                keyboardType="email-address"
                style={{ flex: 1, fontSize: 18 }}
                onChangeText={(t) => {
                  setEmailState(t);
                }}
                // keyboardType={'phonse-pad'}
                placeholder="xxxx@xxx.xxx"
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginRight: 30,
              marginBottom: 20,
              justifyContent: "flex-end",
              flex: 1,
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                forgetPasswordApiCall(emailState, navigation);
              }}
            >
              <Image
                style={{ width: 50, height: 50, marginTop: 10 }}
                source={Images.next_page_imgae}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#F7EFFA",
  },
  customTopBar: {
    ...Platform.select({
      ios: {},
      android: {
        marginTop: 20,
        marginLeft: -5,
      },
      default: {},
    }),
  },
  input: {
    backgroundColor: "#FFF",
    padding: 10,
    marginBottom: 10,
    borderRadius: 15,
    marginLeft: 30,
    marginRight: 30,
    height: 50,
  },
  heading: {
    color: "#272D37",
    fontSize: 28,
    fontWeight: "bold",
    marginRight: "20%",
    // fontFamily: 'sp_bold',
  },
  para: {
    color: "#686E76",
    marginTop: 10,
    fontSize: 15,
    marginRight: "20%",
    // fontFamily: 'sp_regular',
  },
  loginButton: {
    flex: 1,
    borderRadius: 15,
    flexDirection: "row",
    backgroundColor: "#272D37",
    marginTop: 10,
    marginLeft: 30,
    marginRight: 15,
    alignItems: "center",
    borderColor: "#6263F0",
    height: 50,
  },
});
  
export default Forget_password;
