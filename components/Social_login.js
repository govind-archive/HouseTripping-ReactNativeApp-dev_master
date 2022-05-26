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
import DateTimePicker from "@react-native-community/datetimepicker";
import normalize from 'react-native-normalize';
import DatePicker from 'react-native-datepicker';
import Images from "../assets/Images";
import AsyncStorage from '@react-native-async-storage/async-storage';

let mobileData;

function Social_login({ navigation, route }) {
  const [date, setDate] = useState('');
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [dob, setDob] = useState('')
  let username = route.params.profile.name;
  var email = "";
  var phone = "";
  // var dob = "";  
  //   if (route.params?.name) {
  //     mobileData = route.params?.profile;
  //   } else {
  //     alert("Oops something went wrong please go back");
  //   }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === "ios");
  };
  var d = new Date();

  if (route.params?.profile) {
    profileData = route.params?.profile;
    social_type = route.params?.social_type;

    var arr = profileData.name.split(" ");

    firstname = arr[0];

    const index = arr.indexOf(firstname);
    if (index > -1) {
      arr.splice(index, 1);
      lastname = arr.join(" ");
    }

    email = profileData.email;
    social_id = profileData.id;
  } else {
    alert("Oops something went wrong please go back");
  }

  function apiCallSocialLogin() {

    if (email.length < 1) {
      alert("Please enter email");
      return;
    }

    if (phone.length < 1) {
      alert("Please enter phone number");
      return;
    }

    if (username.length < 1) {
      alert("Please enter username");
      return;
    }

    if (dob.length < 1) {
      console.log('dob---------------------->',dob);
      alert("Please enter date of birth");
      return;
    }

    if (firstname.length < 1) {
      alert("Please enter first name");
      return;
    }

    if (lastname.length < 1) {
      alert("Please enter last name");
      return;
    }

    const a = new apiDetails();
    a.api
      .post(a.socialLogin, {
        social_id: social_id,
        socialtype: social_type,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone:phone,
        username: username,
        dob: dob,
      })
      .then((response) => {
        if (response.data.status == "200") {

          // setShow(false);
          const jsonValue = JSON.stringify(response.data.data);
          AsyncStorage.setItem("userInfo", jsonValue);
          const jsonValueToken = JSON.stringify(response.data.data.token);
          AsyncStorage.setItem("token", jsonValueToken);
          navigation.navigate("HomeFeed", { userData: response.data.data });
          console.log('response------------->',response);
        } else {
          alert(response.data.msg);
        }
      });
  }

  const showMode = () => {
    setShow(true);
    setMode('');
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
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

        <View
          style={{
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <View
            style={[
              styles.input,
              { flexDirection: "row", alignContent: "flex-end" },
            ]}
          >
            <Image
              style={{
                width: 15,
                height: 15,
                marginLeft: 12,
                marginRight: 15,
                alignSelf: "center",
                justifyContent: "center",
                alignContent: "center",
              }}
              source={require("../assets/images/at.png")}
            />

            <TextInput
              // value={route.params.profile.name}
              style={{ flex: 1, fontSize: 18 }}
              placeholder="Enter first name"
              value={firstname}
              onChangeText={(t) => {
                firstname = t;
              }}
            />
          </View>

          <View
            style={[
              styles.input,
              { flexDirection: "row", alignContent: "flex-end" },
            ]}
          >
            <Image
              style={{
                width: 15,
                height: 15,
                marginLeft: 12,
                marginRight: 15,
                alignSelf: "center",
                justifyContent: "center",
                alignContent: "center",
              }}
              source={require("../assets/images/at.png")}
            />

            <TextInput
              style={{ flex: 1, fontSize: 18 }}
              placeholder="Enter last name"
              value={lastname}
              onChangeText={(t) => {
                lastname = t;
              }}
            />
          </View>

          <View
            style={[
              styles.input,
              { flexDirection: "row", alignContent: "flex-end" },
            ]}
          >
            <Image
              style={{
                width: 15,
                height: 15,
                marginLeft: 12,
                marginRight: 15,
                alignSelf: "center",
                justifyContent: "center",
                alignContent: "center",
              }}
              source={require("../assets/images/at.png")}
            />

            <TextInput
              style={{ flex: 1, fontSize: 18 }}
              placeholder="Enter username"
              onChangeText={(t) => {
                username = t;
              }}
            />
          </View>

          <View
            style={[
              styles.input,
              { flexDirection: "row", alignContent: "flex-end" },
            ]}
          >
            <Image
              style={{
                width: 15,
                height: 15,
                marginLeft: 12,
                marginRight: 15,
                alignSelf: "center",
                justifyContent: "center",
                alignContent: "center",
              }}
              source={require("../assets/images/at.png")}
            />

            <TextInput
              // value={route.params.profile.email}
              style={{ flex: 1, fontSize: 18 }}
              value={profileData.email}
              placeholder="Enter email"
              onChangeText={(t) => {
                email = t;
              }}
            />
          </View>

          <View
            style={[
              styles.input,
              { flexDirection: "row", alignContent: "flex-end" },
            ]}
          >
            <Image
              style={{
                width: 15,
                height: 15,
                marginLeft: 12,
                marginRight: 15,
                alignSelf: "center",
                justifyContent: "center",
                alignContent: "center",
              }}
              source={require("../assets/images/at.png")}
            />

            <TextInput
              // value={route.params.profile.name}
              style={{ flex: 1, fontSize: 18 }}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              onChangeText={(t) => {
                phone = t;
              }}
            />
          </View>

          <View style={[{
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent:'space-between',
            width: normalize(310),
            height: normalize(50),
            borderRadius: normalize(15),
            paddingLeft: normalize(25)
          }]}>
            <Image
              style={[{
                width: normalize(20),
                height: normalize(20),
              }]}
              resizeMode="contain"
              source={Images.at_the_rate_image}
            />
            <DatePicker
              //   defaultValue={dob}
              style={[{
                fontSize: 18,
                height: normalize(50),
                color: "#fff",
                width: normalize(250),
                marginLeft: normalize(5)

              }]}
              date={dob}  // Initial date from state
              mode="date" // The enum of date, datetime and time
              placeholder="Date of Birth"
              format="YYYY-MM-DD"
              // minDate="01-01-2016"
              // maxDate="01-01-2019"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                dateIcon: {
                  //display: 'none',
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateText: {
                  fontSize: normalize(18),
                  fontWeight: '900',
                  color: '#000',

                },
                dateInput: {
                  marginLeft: normalize(10),
                  textAlign: 'left',
                  alignItems: "flex-start",
                  borderBottomWidth: 0,
                  borderTopWidth: 0,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  color: '#fff'
                },
              }}
              onDateChange={(dob) => {
                setDob(dob);
                // handleOnChange('dob', dob)
              }}

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
            style={{ alignSelf: "flex-end" }}
            onPress={() => {
              apiCallSocialLogin();
            }}
          >
            <Image
              style={{ width: 50, height: 50, marginTop: 10 }}
              source={require("../assets/images/next.png")}
            />
          </TouchableOpacity>
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
  input: {
    backgroundColor: "#FFF",
    padding: 10,
    marginBottom: 10,
    borderRadius: 15,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 18,
    height: 50,
    color: "#272D37",
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
    marginRight: 10,
    alignItems: "center",
    alignSelf: "stretch",
    borderColor: "#6263F0",
  },
});

export default Social_login;
