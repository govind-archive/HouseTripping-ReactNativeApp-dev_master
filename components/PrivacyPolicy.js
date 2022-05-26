import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, FlatList, Keyboard, KeyboardAvoidingView, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import constants from "../assets/constants";
import Images from "../assets/Images";
import Contants from "../constants/Contants";
import Styles from "../constants/Styles";
import { HeaderModel, HelpScreenModel } from "./Components/NewModelView";
const PrivacyPolicy = ({ navigation }) => {
    const privacyPolicy = [{
        id: '1',
        title_last_update: 'Last updated: November 10, 2021',
        sub_title_last_update: 'Please read these terms and conditions carefully before using Our Service',
        defination: 'Interpretation and Definitions',
        interpretation: 'Interpretation',
        interpretation_sub_title: 'The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.',
        interpretation_definations: 'Definations',
        definations_title: 'For the purposes of this Privacy Policy:',
        title_1: ' means a unique account created for You '
    }];

    /**************************  List Item Components *****************************/

    const renderListItemComponent = (item) => {
        return (
            <View style={[{
                 flex:1,
             }]}>
                <View>
                    <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}>{item.title_last_update}</Text>
                </View>
                <View style={{ marginTop: verticalScale(30, Contants.DesignCanvas.HEIGHT) }}>
                    <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}>{item.sub_title_last_update}</Text>
                </View>

                <View style={{ marginTop: verticalScale(20, Contants.DesignCanvas.HEIGHT) }}>
                    <Text style={{ ...Styles.BOLD_20, color: '#272D37' }}>{item.defination}</Text>
                </View>
                <View style={{ marginTop: verticalScale(15, Contants.DesignCanvas.HEIGHT) }}>
                    <Text style={{ ...Styles.BOLD_18, color: '#77A1D3' }}>{item.interpretation}</Text>
                </View>
                <View style={{ marginTop: verticalScale(10, Contants.DesignCanvas.HEIGHT) }}>
                    <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}>{item.interpretation_sub_title}</Text>
                </View>

                {/**************************  Defination Component *****************************/}

                <View style={{ marginTop: verticalScale(20, Contants.DesignCanvas.HEIGHT) }}>
                    <Text style={{ ...Styles.BOLD_18, color: '#77A1D3' }}>{item.interpretation_definations}</Text>
                </View>

                <View style={{ marginTop: verticalScale(15, Contants.DesignCanvas.HEIGHT) }}>
                    <Text style={{ ...Styles.BOLD_16, color: '#272D37' }}>{item.definations_title}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: verticalScale(20, Contants.DesignCanvas.HEIGHT) }}>

                    <Text style={{ ...Styles.REGULAR_15, color: '#77A1D3' }}>
                        Account
                    </Text>

                    <View style={{ justifyContent: 'flex-start' }}>
                        <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}>
                            {item.title_1}
                        </Text>
                    </View>
                </View>
                <View>
                    <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}>to access our Service or parts of our Service.</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: verticalScale(20, Contants.DesignCanvas.HEIGHT) }}>

                    <Text style={{ ...Styles.REGULAR_15, color: '#77A1D3' }}>
                        Affiliate
                    </Text>

                    <View style={{ justifyContent: 'flex-start' }}>
                        <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}> means an entity that controls, is controlled
                        </Text>
                    </View>
                </View>
                <View>
                    <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}>by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority</Text>
                </View>


                <View style={{ flexDirection: 'row', marginTop: verticalScale(20, Contants.DesignCanvas.HEIGHT) }}>

                    <Text style={{ ...Styles.REGULAR_15, color: '#77A1D3' }}>
                        Application
                    </Text>

                    <View style={{ justifyContent: 'flex-start' }}>
                        <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}> means the software program provided
                        </Text>
                    </View>
                </View>
                <View>
                    <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}>by the Company downloaded by You on any electronic device, named HOUSE TRIPPING Company (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Future x Ltd, Daliyat El Carmel.</Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: verticalScale(20, Contants.DesignCanvas.HEIGHT) }}>
                    <Text style={{ ...Styles.REGULAR_15, color: '#77A1D3' }}>
                        Country refers to
                    </Text>
                    <View style={{ marginLeft: scale(5, Contants.DesignCanvas.HEIGHT) }}>
                        <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}>israel
                        </Text>
                    </View>
                </View>
                
                <View style={{ flexDirection: "row", marginTop: verticalScale(20, Contants.DesignCanvas.HEIGHT) }}>
                    <Text style={{ ...Styles.REGULAR_15, color: '#77A1D3' }}>
                        Device
                    </Text>
                    <View style={{ marginLeft: scale(5, Contants.DesignCanvas.HEIGHT) }}>
                        <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}>means any device that can access
                        </Text>
                    </View>
                </View>
                <View>
                    <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}>Service such as a computer, a cellphone or a digital tablet.
                    </Text>
                </View>

                <View style={{ flexDirection: "row", marginTop: verticalScale(20, Contants.DesignCanvas.HEIGHT) }}>
                    <Text style={{ ...Styles.REGULAR_15, color: '#77A1D3' }}>
                        Personal Data 
                    </Text>
                    <View style={{ marginLeft: scale(5, Contants.DesignCanvas.HEIGHT) }}>
                        <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}>is any information that relates to an 
                        </Text>
                    </View>
                </View>
                <View>
                    <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}>identified or identifiable individual.
                    </Text>
                </View>

                <View style={{ flexDirection: "row", marginTop: verticalScale(20, Contants.DesignCanvas.HEIGHT) }}>
                    <Text style={{ ...Styles.REGULAR_15, color: '#77A1D3' }}>
                        Service
                    </Text>
                    <View style={{ marginLeft: scale(5, Contants.DesignCanvas.HEIGHT) }}>
                        <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}>refers to the application
                        </Text>
                    </View>
                </View>
                 
                <View style={{ flexDirection: "row", marginTop: verticalScale(20, Contants.DesignCanvas.HEIGHT) }}>
                    <Text style={{ ...Styles.REGULAR_15, color: '#77A1D3' }}>
                        Service Provider
                    </Text>
                    <View style={{ marginLeft: scale(5, Contants.DesignCanvas.HEIGHT) }}>
                        <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}>means any natural or legal person
                        </Text>
                    </View>
                </View>
                <View>
                    <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}>who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.
                    </Text>
                </View>

                <View style={{ flexDirection: "row", marginTop: verticalScale(20, Contants.DesignCanvas.HEIGHT) }}>
                    <Text style={{ ...Styles.REGULAR_15, color: '#77A1D3' }}>
                        Third Party Social Media Service
                    </Text>
                    <View style={{ marginLeft: scale(5, Contants.DesignCanvas.HEIGHT) }}>
                        <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}>refers to any
                        </Text>
                    </View>
                </View>
                <View>
                    <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}>website or any social network website through which a User can log in or create an account to use the Service.
                    </Text>
                </View>

                <View style={{ flexDirection: "row", marginTop: verticalScale(20, Contants.DesignCanvas.HEIGHT) }}>
                    <Text style={{ ...Styles.REGULAR_15, color: '#77A1D3' }}>
                        Usage Data
                    </Text>
                    <View style={{ marginLeft: scale(5, Contants.DesignCanvas.HEIGHT) }}>
                        <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}>refers to data collected automatically
                        </Text>
                    </View>
                </View>
                <View>
                    <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}>either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).
                    </Text>
                </View>


                <View style={{ flexDirection: "row", marginTop: verticalScale(20, Contants.DesignCanvas.HEIGHT) }}>
                    <Text style={{ ...Styles.REGULAR_15, color: '#77A1D3' }}>
                        You
                    </Text>
                    <View style={{ marginLeft: scale(5, Contants.DesignCanvas.HEIGHT) }}>
                        <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}>means the individual accessing or using the
                        </Text>
                    </View>
                </View>
                <View>
                    <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}>Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
                    </Text>
                </View>


                <View style={{ flexDirection: "row", marginTop: verticalScale(30, Contants.DesignCanvas.HEIGHT) }}>
                    <Text style={{ ...Styles.BOLD_20, color: '#272D37' }}>
                       {"Collecting and Using Your Personal Data"}
                    </Text>
                 
                    </View>
                    <View style={{ marginTop: verticalScale(20, Contants.DesignCanvas.HEIGHT) }}>
                        <Text style={{ ...Styles.BOLD_16, color: '#5D6269' }}>Types of Data Collected
                        </Text>
                    </View>
                    <View style={{ marginTop: verticalScale(20, Contants.DesignCanvas.HEIGHT) }}>
                        <Text style={{ ...Styles.BOLD_16, color: '#77A1D3' }}>Personal Data
                        </Text>
                    </View>

                    <View style={{ marginTop: verticalScale(20, Contants.DesignCanvas.HEIGHT) }}>
                        <Text style={{ ...Styles.BOLD_15, color: '#5D6269' }}>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
                        </Text>
                    </View>

                    <View style={{ marginTop: verticalScale(30, Contants.DesignCanvas.HEIGHT) }}>
                        <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}> 1. Email address
                        </Text>
                    </View>
                    <View style={{ marginTop: verticalScale(22, Contants.DesignCanvas.HEIGHT) }}>
                        <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}> 2. First name and last name </Text>
                    </View>
                    <View style={{ marginTop: verticalScale(22, Contants.DesignCanvas.HEIGHT) }}>
                        <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}> 3. Phone number
                        </Text>
                    </View>
                    <View style={{ marginTop: verticalScale(22, Contants.DesignCanvas.HEIGHT) }}>
                        <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}> 4. Address, State, Province, ZIP/Postal code, City
                        </Text>
                    </View>
                    <View style={{ marginTop: verticalScale(22, Contants.DesignCanvas.HEIGHT) }}>
                        <Text style={{ ...Styles.REGULAR_15, color: '#5D6269' }}> 5. Usage Data
                        </Text>
                    </View>

                    <View style={{ marginTop: verticalScale(20, Contants.DesignCanvas.HEIGHT) }}>
                        <Text style={{ ...Styles.BOLD_18, color: '#77A1D3' }}>Usage Data
                        </Text>
                    </View>

                    <View style={{ marginTop: verticalScale(20, Contants.DesignCanvas.HEIGHT) }}>
                        <Text style={{ ...Styles.BOLD_18, color: '#272D37' }}>Contact Us
                        </Text>
                    </View>
                    <View style={{ marginTop: verticalScale(20, Contants.DesignCanvas.HEIGHT) }}>
                        <Text style={{ ...Styles.BOLD_18, color: '#272D37' }}>If you have any questions about this Privacy Policy, You can contact us:
                        </Text>
                    </View>

                     
            </View>

        );
    }
    return (

        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                animated={true}
                translucent
                backgroundColor="transparent"
                barStyle={"light-content"}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={[Styles.customScrollview]}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <LinearGradient
                        colors={["#E683AF", "#7ACACB", "#77A1D3"]}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 0 }}
                        style={[Styles.BackgroundGradient]}>
                        <HeaderModel
                            onPress={() => {
                                navigation.goBack();
                            }}
                            HeaderTitle={'Privacy Policy'}
                            leftImage={Images.all_screen_back_black_arrow_icon}
                        />

                        <LinearGradient
                            colors={constants.AppColor.FLEX_GRADIENT_BACK_COLOR}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={[Styles.LinearGradientStyle]}>
                            {/* /*************************section code start************************* */}
                            <View style={[Styles.SameContainerStyle]}>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={privacyPolicy}
                                    renderItem={({ item }) => renderListItemComponent(item)}
                                />
                            </View>
                        </LinearGradient>
                    </LinearGradient>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
const styles=StyleSheet.create({
    
})
export default PrivacyPolicy;