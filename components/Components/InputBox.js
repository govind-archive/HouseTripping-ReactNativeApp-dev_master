import React from 'react';
import { Dimensions, Image, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import normalize from 'react-native-normalize';
import { RFValue } from 'react-native-responsive-fontsize';
import { moderateScale } from 'react-native-size-matters';
import Images from '../../assets/Images';
import Styles from '../../constants/Styles';
export function InputBox(props) {
    return (
        <>
            <Text
                style={[
                    props.titleStyle, Styles.REGULAR_15,
                    //   {color: Constants.AppColors.TEXT_LIGHT_BLACK,},
                ]}>
                {props.name}
            </Text>
            <TextInput
                placeholder={props.placeholder}
                value={props.value}
                keyboardType={props.keyboardType}
                onChangeText={props.onChangeText}
                editable={props.editable}
                placeholderTextColor={props.placeholderTextColor}
                style={[
                    Styles.REGULAR_15,
                    props.InputStyle,
                    {
                        backgroundColor: '#F9F7F7',
                        paddingLeft: normalize(15),
                        // width: 320,
                        // height: 60,
                        borderRadius: RFValue(16),
                        color: 'black',
                        marginTop: normalize(8),
                    },
                ]}
                style={[
                    props.InputCvvStyle,
                    {
                        backgroundColor: '#F9F7F7',
                        paddingLeft: normalize(15),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // width: 320,
                        // height: 60,
                        height: 50,
                        borderRadius: RFValue(16),
                        color: 'black',
                        marginTop: normalize(8),
                    },
                ]}
            />
        </>
    );
}
export function InputCard(props) {

    return (
        <>

            <Text
                style={[
                    props.titleStyle,
                    Styles.REGULAR_15,
                    {},
                ]}>
                {props.name}
            </Text>
            <View
                style={[
                    props.viewStyle,
                    {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: '#F9F7F7',
                        borderRadius: RFValue(16),
                        // height:60,
                        // width:320,
                        marginTop: RFValue(7),
                        alignItems: 'center',
                    },
                ]}>
                <TextInput
                    placeholder={props.placeholder}
                    value={props.value}
                    keyboardType={props.keyboardType}
                    onChangeText={props.onChangeText}
                    editable={props.editable}
                    secureTextEntry={props.secureTextEntry}
                    placeholderTextColor={props.placeholderTextColor}
                    style={[
                        Styles.PRO_DISPLAY_REGULAR_15,
                        props.InputCvvStyle,
                        { width: '75%', height: 50, paddingLeft: normalize(15), borderRadius: RFValue(16) },
                    ]}
                />
                <TouchableOpacity onPress={props.onPress}>
                    <Image
                        style={[
                            props.imgStyle,
                            { width: 24, height: 24, justifyContent: 'center', alignItems: 'center' },
                        ]}
                        resizeMode='contain'
                        source={props.source}
                    />
                </TouchableOpacity>
            </View>
        </>
    );
}


export function InputSearch(props) {

    return (
        <>
            <View style={[Styles.HeaderSearchMainView]}>
                <View style={[Styles.HeaderSearchRowView]}>
                    <TouchableOpacity
                        onPress={props.onPress}
                    >
                        <Image
                            style={{
                                width: 28,
                                height: 28,
                                marginLeft: 10,
                                // margin: 20,
                                // marginTop: 30,
                                tintColor: "#FFF",
                            }}
                            source={props.leftImage}
                        />
                    </TouchableOpacity>
                    <Text style={[Styles.BOLD_20, props.TitleStyle, { color: "#FFFFFF", lineHeight: 28, }]}>{props.HeaderTitle}</Text>
                    <View style={{ marginLeft: moderateScale(12), width: '80%' }}>
                        <TextInput placeholder='Search for songs , singers' placeholderTextColor='#FFF' 
                         style={{ color: 'white', ...Styles.REGULAR_18, color: 'white', width: '80%'}} />
                    </View>
                </View>
            </View>
        </>
    );
}