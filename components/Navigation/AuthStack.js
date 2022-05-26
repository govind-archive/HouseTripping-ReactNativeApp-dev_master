import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../Welcome";
import Login from "../Login";
import SignUp from "../SignUp";
import SignUp_mobile from "../SignUp_mobile";
import Mobile_code from "../Mobile_code";
import SignUp_verify_code from "../SignUp_verify_code";
import SignUp_full_name from "../SignUp_full_name";
import SignUp_email from "../SignUp_email";
import SignUp_username from "../SignUp_username";
import SignUp_smart_password from "../SignUp_smart_password";
import SignUp_DOB from "../SignUp_DOB";
import SelectCategory from "../SelectCategory";
import HomeFeed from "../HomeFeed";
import SettingProfile from "../SettingProfile";
import Welcome_login from "../Welcome_login";
import Followings_followers from "../Followings_followers";
import ChatList from "../ChatList";
import NewChatList from "../NewChatList";
import MessagesScreen from "../MessagesScreen";
import Find_friends from "../Find_friends";
import Create_challange from "../challanges/Create_challange";
import Winning_price from "../challanges/Winning_price";
import Select_song from "../challanges/Select_song";
import StartSinging from "../challanges/StartSinging";
import ListChallange from "../challanges/ListChallange";
import Challange_details from "../challanges/Challange_details";
import Notifications_screen from "../Notifications_screen";
import Comment_screen from "../Comment_screen";
import SubscriptionPlan from "../SubscriptionPlan";
import PaymentMethod from "../PaymentMethod";
import SubscriptionPremium from "../SubscriptionPremium";
import SubscriptionVIP from "../SubscriptionVIP";
import SubscriptionStandard from "../SubscriptionStandard";
import SubscriptionFree from "../SubscriptionFree";
import InAppPurches from "../InAppPurches";
import ContactUs from "../ContactUs";
import AboutApp from "../AboutApp";
import Help from "../Help";
import SignUP_date_of_birth from "../SignUp_date_of_birth";
import Social_login from "../Social_login";
import Profile from "../Profile";
import ContactInformation from "../ContactInformation";
import Songbook_listing from "../Songbook_listing";
import Song_book_filter from "../Song_book_filter";
import SearchForSongs from "../SearchForSongs";
import User_Profile from "../User_Profile";
import SearchUsersByName from "../SearchUsersByName";
import SignUp_GroupName from "../SignUp_GroupName";
import Forget_password from "../Forget_password";
import PrivacyPolicy from "../PrivacyPolicy";
import MyPostFeed from "../MyPostFeed";


const Stack = createStackNavigator();
const navigationRef = createNavigationContainerRef()
const navigate = (name, params) => {
  
  if (navigationRef.isReady()) { 
    navigationRef.navigate(name, params);
  }
}
const AuthStack = () => {
   
    return(
        <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {/* HOME SCREEN */}
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Forget_password"
          component={Forget_password}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="SelectCategory"
          component={SelectCategory}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Song_book_filter"
          component={Song_book_filter}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Social_login"
          component={Social_login}
          options={{
            headerShown: false,
          }}
        />
        {/* HOME SCREEN */}
        <Stack.Screen
          name="Songbook_listing"
          component={Songbook_listing}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ContactInformation"
          component={ContactInformation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Help"
          component={Help}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="AboutApp"
          component={AboutApp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ContactUs"
          component={ContactUs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="InAppPurches"
          component={InAppPurches}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PaymentMethod"
          component={PaymentMethod}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SubscriptionPlan"
          component={SubscriptionPlan}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SubscriptionFree"
          component={SubscriptionFree}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SubscriptionStandard"
          component={SubscriptionStandard}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SubscriptionPremium"
          component={SubscriptionPremium}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SubscriptionVIP"
          component={SubscriptionVIP}
          options={{
            headerShown: false,
          }}
        />
        {/* All Modules */}

        {/* MODULE 5 */}
        <Stack.Screen
          name="ListChallange"
          component={ListChallange}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Comment_screen"
          component={Comment_screen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Notifications_screen"
          component={Notifications_screen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Challange_details"
          component={Challange_details}
          options={{
            headerShown: false,
          }}
        />
        {/* MODULE 4 */}
        <Stack.Screen
          name="Create_challange"
          component={Create_challange}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Select_song"
          component={Select_song}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Winning_price"
          component={Winning_price}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="StartSinging"
          component={StartSinging}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Welcome_login"
          component={Welcome_login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Mobile_code"
          component={Mobile_code}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp_mobile"
          component={SignUp_mobile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp_verify_code"
          component={SignUp_verify_code}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp_full_name"
          component={SignUp_full_name}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp_email"
          component={SignUp_email}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp_username"
          component={SignUp_username}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUP_date_of_birth"
          component={SignUP_date_of_birth}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="SignUp_smart_password"
          component={SignUp_smart_password}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp_DOB"
          component={SignUp_DOB}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="HomeFeed"
          component={HomeFeed}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="SettingProfile"
          component={SettingProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Followings_followers"
          component={Followings_followers}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Find_friends"
          component={Find_friends}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChatList"
          component={ChatList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MessagesScreen"
          component={MessagesScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SearchForSongs"
          component={SearchForSongs}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="User_Profile"
          component={User_Profile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SearchUsersByName"
          component={SearchUsersByName}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp_GroupName"
          component={SignUp_GroupName}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MyPostFeed"
          component={MyPostFeed}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NewChatList"
          component={NewChatList}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
    
}

export default {AuthStack, navigate};