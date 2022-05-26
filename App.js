import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from "react-native";
import * as Font from 'expo-font';
import AuthStack from './components/Navigation/AuthStack';
import * as Notifications from 'expo-notifications';
import Device from 'expo-device';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from 'expo-linking';


async function registerForPushNotificationsAsync() {
  let token;
  //if (Device.isDevice) {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }

  token = (await Notifications.getExpoPushTokenAsync()).data; 

  AsyncStorage.setItem("notification_token", token);
 
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default function App({ navigation }) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [data, setData] = useState(null);

  console.ignoredYellowBox = [
    'Setting a timer',
    'MenuProviders'
    ];

  async function loadFonts() {
    await Font.loadAsync({
      BOLD: require('./assets/fonts/SFProText-Bold.ttf'),
      MEDIUM: require('./assets/fonts/SFProText-Medium.ttf'),
      SEMIBOLD: require('./assets/fonts/SFProText-Semibold.ttf'),
      REGULAR: require('./assets/fonts/SFProText-Regular.ttf'),
    });
    setFontsLoaded(true);
  }

  function handleDeepLinking(event) {
    let d = Linking.parse(event.url);
    console.log(d);
  }

  useEffect(() => {

    async function getInitialURL() {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) setData(Linking.parse(initialUrl));
    }

    loadFonts();
    Linking.addEventListener("url", handleDeepLinking);
    if (!data) {
      getInitialURL();
    }

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {

      if (response.notification.request.content.data.type == "messsage") {

        let userDetail = {
          profile: {
            firstname: "Test",
            lastname: "Test",
          },
        }

        var u = {
          profile: userDetail,
          sender_id: d.id,
          receiver_id: userDetail.id,
          firstname: d.name,
          lastname: d.lastname,
          profile_pic: d.image
        };

        navigation.navigate("MessagesScreen", {
          userData: u,
          listShow: "yes",
        });

        AuthStack.navigate('Help', {});
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
      Linking.removeEventListener("url");
    };

  }, [])



  if (fontsLoaded) {
    return (
      <AuthStack.AuthStack />
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// export default App;