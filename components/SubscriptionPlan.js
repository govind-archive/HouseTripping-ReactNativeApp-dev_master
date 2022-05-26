import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ImageBackground,
  FlatList,
  Dimensions,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Images from "../assets/Images";
import constants from "../assets/constants";
import { log10 } from "core-js/core/number";
import normalize from "react-native-normalize";
import Styles from "../constants/Styles";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Constant from '../constants/Contants';
import { HeaderModel, HelpScreenModel } from "./Components/NewModelView";

const SubscriptionPlan = ({ navigation }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [planSelected, setPlanSelected] = useState(0);

  const [DATA, setDATA] = useState([
    {
      id: "1",
      title: "Standard",
      image: Images.bg_image_card_plan_free,
      challenge: {
        title_2: "2 Free Challenge Join",
        title_1: "1 Paid Challenge Join",
      },
      plans: [
        {
          name: "1 Month",
          isSelected: true,
          price: "$9.99 ",
          text: [
            "1 free challenges join",
            "4 Paid challenges join",
            "10 Create free challenges",
            "Unlimited free songs + AdFree",
            "Celebrety / Artist for video",
          ],
        },
        {
          name: "6 Month",
          isSelected: false,
          price: "FREE 6",
          text: [
            "6 free challenges join",
            "4 Paid challenges join",
            "10 Create free challenges",
            "Unlimited free songs + AdFree",
            "Celebrety / Artist for video",
          ],
        },
        {
          name: "Annual",
          isSelected: false,
          price: "Annual",
          text: [
            "Annual free challenges join",
            "4 Paid challenges join",
            "10 Create free challenges",
            "Unlimited free songs + AdFree",
            "Celebrety / Artist for video",
          ],
        },
      ],
    },

    {
      id: "2",
      title: "Standard",
      image: Images.bg_image_card_plan_1,
      challenge: {
        title_2: "2 Free Challenge Join",
        title_1: "1 Paid Challenge Join",
      },
      plans: [
        {
          name: "1 Month",
          isSelected: true,
          price: "$9.99 ",
          text: [
            "1 free challenges join",
            "4 Paid challenges join",
            "10 Create free challenges",
            "Unlimited free songs + AdFree",
            "Celebrety / Artist for video",
          ],
        },
        {
          name: "6 Month",
          isSelected: false,
          price: "$9.06 /month",
          text: [
            "6 free challenges join",
            "4 Paid challenges join",
            "10 Create free challenges",
            "Unlimited free songs + AdFree",
            "Celebrety / Artist for video",
          ],
        },
        {
          name: "Annual",
          isSelected: false,
          price: "$200 /month",
          text: [
            "Annual free challenges join",
            "4 Paid challenges join",
            "10 Create free challenges",
            "Unlimited free songs + AdFree",
            "Celebrety / Artist for video",
          ],
        },
      ],
    },
    {
      id: "3",
      title: "Premium",
      image: Images.bg_image_card_plan_2,
      challenge: {
        title_2: "2 Free Challenge Join",
        title_1: "1 Paid Challenge Join",
      },
      plans: [
        {
          name: "1 Month",
          isSelected: true,
          price: "$14.99 ",
          text: [
            "1 free challenges join",
            "4 Paid challenges join",
            "10 Create free challenges",
            "Unlimited free songs + AdFree",
            "Celebrety / Artist for video",
          ],
        },
        {
          name: "6 Month",
          isSelected: false,
          price: "$12.99 /month",
          text: [
            "6 free challenges join",
            "4 Paid challenges join",
            "10 Create free challenges",
            "Unlimited free songs + AdFree",
            "Celebrety / Artist for video",
          ],
        },
        {
          name: "Annual",
          isSelected: false,
          price: "$10.99",
          text: [
            "Annual free challenges join",
            "4 Paid challenges join",
            "10 Create free challenges",
            "Unlimited free songs + AdFree",
            "Celebrety / Artist for video",
          ],
        },
      ],
    },
    {
      id: "21",
      title: "Premium",
      image: Images.bg_image_card_plan_free,
      challenge: {
        title_2: "2 Free Challenge Join",
        title_1: "1 Paid Challenge Join",
      },
      plans: [
        {
          name: "1 Month",
          isSelected: true,
          price: "$29.99 ",
          text: [
            "1 free challenges join",
            "4 Paid challenges join",
            "10 Create free challenges",
            "Unlimited free songs + AdFree",
            "Celebrety / Artist for video",
          ],
        },
        {
          name: "6 Month",
          isSelected: false,
          price: "FREE",
          text: [
            "6 free challenges join",
            "4 Paid challenges join",
            "10 Create free challenges",
            "Unlimited free songs + AdFree",
            "Celebrety / Artist for video",
          ],
        },
        {
          name: "Annual",
          isSelected: false,
          price: "FREE",
          text: [
            "Annual free challenges join",
            "4 Paid challenges join",
            "10 Create free challenges",
            "Unlimited free songs + AdFree",
            "Celebrety / Artist for video",
          ],
        },
      ],
    },
  ]);

  const renderItem = (DATA, item) => {
    return (
      <View style={styles.cardStyle}>
        <View
          style={[
            {
              // backgroundColor: "red",
              height: normalize(180),
            borderRadius:18,
            },
          ]}
        >
          <ImageBackground
            style={[
              {
                width: normalize(290),
                height: normalize(180),
                justifyContent: "center",
                alignItems: "center",
                // marginTop:10
              },
            ]}
            imageStyle={{
              borderTopLeftRadius: normalize(14),
              borderTopRightRadius: normalize(14),
            }}
            source={DATA.item.image}
          >
            <View style={[styles.text_view_style]}>
              <Text
                style={[
                  {
                    ...Styles.SEMIBOLD_20,
                    color: 'white'
                  },
                ]}
              >
                {DATA.item.title}
              </Text>
            </View>
            <View
              style={[
                styles.text_view_style,
                {
                  flexDirection: "row",
                },
              ]}
            >
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={[
                    {
                      ...Styles.SEMIBOLD_28,
                      color: 'white'
                    },
                  ]}
                >
                  {DATA.item.plans[planSelected].price}
                </Text>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={{ ...Styles.MEDIUM_16, color: 'white' }}>/month</Text>
                </View>
              </View>

              {/* <Text
                style={[
                  {
                    fontSize: normalize(16),
                    color: "#fff",
                    marginTop: normalize(15),
                    marginLeft: normalize(5),
                  },
                ]}
              >
                /month
              </Text> */}
            </View>

            <View
              style={[
                styles.text_view_style,
                {
                  width: 284,
                  height: 38,
                },
              ]}
            >
              <View
                showsHorizontalScrollIndicator={false}
                horizontal
                style={[
                  {
                    flexDirection: "row",
                    height: 38,
                    borderRadius: 8,
                    marginRight: 5,
                    marginLeft: 5,
                    // backgroundColor:'red'
                    // width:normalize(250)
                  },
                ]}
              >
                <View
                  style={[
                    {
                      flexDirection: "row",
                      backgroundColor: "#272D37",
                      height:38,
                      position: "absolute",
                      flex: 1,
                      width: Platform.OS==='ios'?270:270,
                      opacity: 0.5,
                      borderRadius: 8,
                    },
                  ]}
                ></View>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  style={[
                    {
                      flexDirection: "row",
                      height: normalize(50),
                      borderRadius: normalize(15),
                    },
                  ]}
                >
                  {DATA.item.plans.map((item, index) => {
                    return (
                      <TouchableOpacity
                        style={[
                          {
                            padding: 10,
                            justifyContent: 'center',
                             alignItems: 'center',
                            height:38,
                            width: Platform.OS == 'ios' ? 90 : 90,
                            borderRadius: 8,
                            // backgroundColor:'red'
                            // width:moderateScale(94.66,Constant.DesignCanvas.HEIGHT)
                          },
                          planSelected == index && {
                            backgroundColor: "#272d37",
                          },
                        ]}
                        onPress={() => {
                          setPlanSelected(index);
                        }}
                        key={item.id}
                      >
                        <Text
                          style={{
                            ...Styles.MEDIUM_14, color: 'white'
                          }}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}

                  {/* {multipleViews(DATA.item.plans, DATA)} */}
                </ScrollView>
              </View>
              {/* <View
                style={[
                  {
                    flexDirection: "row",
                    backgroundColor: "#000",
                    height: normalize(50),
                    opacity: 0.5,
                    borderRadius: normalize(15),
                    // width:normalize(250)
                  },
                ]}
              > 

              {/* <FlatList
                  style={{ flex: 1 }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{ width: 10 }}
                      onPress={() => {}}
                      style={styles.touch_tab_style}
                    >
                      <Text style={[styles.touch_bar_text_style]}>item 1</Text>
                    </TouchableOpacity>
                  )}
                /> */}
              {/* </View> */}
            </View>
          </ImageBackground>
        </View>
        <View
          style={[
            {
              backgroundColor: "#fff",
              // backgroundColor:'red',
              height: normalize(330),
              borderRadius: 16,
            },
          ]}
        >
          <View
            style={[
              {
              //  backgroundColor:'yellow',
                marginTop: 10,
                marginHorizontal: 10,
                height: Platform.OS==='ios'?Dimensions.get('window').height*0.2390:Dimensions.get('window').height*0.2680,
              },
            ]}
          >
            {DATA.item.plans[planSelected].text.map((item, index) => {
              return (
                <View
                  style={{
                    margin: 10,
                    flexDirection: "row",
                  }}
                >
                  <Image
                    style={{
                      width: 15,
                      height: 15,
                      marginRight: 10,
                    }}
                    source={Images.green_right}
                  />
                  <Text
                    style={{
                      ...Styles.REGULAR_15,
                      color: '#272D37'
                    }}
                  >
                    {item}
                  </Text>
                </View>
              );
            })}
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PaymentMethod", {});
            }}
          >
            <LinearGradient
              style={{
                borderRadius: normalize(15),
                height: normalize(50),
                marginHorizontal: normalize(15),
                justifyContent: "center",
                alignItems: "center",
                marginTop: verticalScale(55, Constant.DesignCanvas.HEIGHT),
                marginBottom: verticalScale(20, Constant.DesignCanvas.HEIGHT)
              }}
              colors={constants.AppColor.LINEAR_GRADIENT_COLOR_BUTTON}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              <Text
                style={[
                  {
                    color: "#fff",
                    ...Styles.MEDIUM_15
                  },
                ]}
              >
                Subscribe
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        translucent
        backgroundColor="transparent"
        barStyle={"light-content"}
      />

      <Image
        style={styles.bgImagePlanStyle}
        source={Images.bg_subscription_plan}
      />
         <View style={{ flexDirection: "row" }}>
          <HeaderModel
            onPress={() => {
              navigation.goBack();
            }}
            HeaderTitle={'Subscription Plan'}
            leftImage={Images.cross_white}
            leftimgstyle={{ width: 20, height: 20 }}
          />
        </View>

        <View style={{ flex: 1, alignSelf: "center" }}>
          <FlatList
            horizontal
            contentContainerStyle={{ paddingBottom: 80 }}
            showsHorizontalScrollIndicator={false}
            data={DATA}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </View>
     </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
  },
  viewStyle: {
    justifyContent: "center",
    flexDirection: "row",
  },
  mainTitleStyle: {
    fontSize: 24,
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    marginLeft: "15%",
    flex: 1,
    color: "white",
  },
  titleStyle: {
    fontSize: 16,
    color: "white",
    marginTop: 24,
    alignSelf: "center",
  },
  subTitleStyle: {
    fontSize: 34,
    marginTop: 10,
    color: "white",
    alignSelf: "center",
    fontWeight: "600",
  },
  titlePlanStyle: {
    fontSize: 18,
    marginTop: 10,
    color: "black",
    alignSelf: "center",
  },
  viewStyle2: {
    flexDirection: "row",
  },
  cardStyle: {
    borderRadius: scale(18, Constant.DesignCanvas.HEIGHT),
    marginTop: normalize(40),
    // flex: 1,
    height: "78%",
    width: normalize(290),
    // alignSelf: "center",
    marginHorizontal: 7,
    // marginStart: 20,
    elevation: 1,
    backgroundColor: "#fff",
  },
  cardStyle2: {
    borderRadius: 18,
    // flex: 1.0,
    // marginTop: 70,
    width: 300,
    elevation: 3,
    backgroundColor: "white",
  },
  bgImagePlanStyle: {
    flex: 1,
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    // backgroundColor: "red",
    position: "absolute",
  },
  textStandardPlan: {
    fontSize: 24,
    color: "black",
  },
  imageStyle: {
    height: 100,
    width: 100,
    //  position: "absolute",
  },
  circleStyle: {
    width: 20,
    height: 20,
    borderRadius: 20,
    color: "#0CBA70",
  },
  text_view_style: {
    marginVertical: normalize(5),
    // backgroundColor:'red'
  },
  touch_bar_text_style: {
    color: "#fff",
  },
  touch_tab_style: {
    // backgroundColor:'red',
    width: normalize(85),
    borderRadius: normalize(15),
    justifyContent: "center",
    alignItems: "center",
  },
  touch_tab_focused_style: {
    backgroundColor: "#000",
    width: normalize(85),
    borderRadius: normalize(15),
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SubscriptionPlan;
