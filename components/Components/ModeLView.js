import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    View,
    Picker,
    TextInput,
    Modal,
    Dimensions,
    Platform
} from 'react-native';
import Images from '../../assets/Images';
import normalize from 'react-native-normalize';
import constants from '../../assets/constants';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import Contants from '../../constants/Contants';
import Styles from '../../constants/Styles';
/************************************************ */
/**
 * 
 * @param props <ModelVie 
 * transparent={} 
 * visible={}
 * onRequestClose={}
 * model_style={}
 * modelonPress={}
 * ModalMainContainer={}
 * ModalSecContainer={}
 * ModalTopView={}
 * lableTopOnePress={}
 * model_text_style={}
 * lableTopOne={}
 * lableBottomTwo={}
 * lableBottomThree={}
 * lableBottomOne={}
 * lableBottomOnePress={}
 * ModalBottomView={}
 * lableBottomThreePress={}
 * model_btn_view_style={}
 * modle_btn_touh_style={}
 *  onPress={}
 *  buttonText={}
 * model_btn_text_style={}
 * />
 * 
 */

export function StarModel(props) {
    return (
        <Modal
            transparent={props.transparent}
            visible={props.visible}
            onRequestClose={props.onRequestClose}
            style={props.model_style}
        >
            <TouchableOpacity onPress={props.closeModelPress}>
                <View style={[props.StarModalMainContainer, {
                    backgroundColor: 'rgba(52, 52, 52, 0.8)',
                    justifyContent: "center",
                    alignItems: 'center',
                    height: '100%',
                }]}>
                    <View style={[props.StarModalSecContainer, {
                        backgroundColor: "#fff",
                        width: normalize(330),
                        borderRadius: normalize(20),
                        borderColor: "grey",
                        height: normalize(170),
                        alignItems: "center",
                        justifyContent: "space-evenly"

                    }]}>
                        <View style={[{
                            // backgroundColor:"red",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            height: 70,
                            width: RFValue(320, Contants.DesignCanvas.HEIGHT)
                        }]}>
                            <TouchableOpacity onPress={props.starOnPress}>
                                <View style={[styles.sameViewStyel]}>
                                    <Image
                                        style={[styles.iconeStyle]}
                                        resizeMode='contain'
                                        source={Images.comment_star_icon}
                                    />
                                    <Text style={[styles.textStyle]}>Amazing</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={props.fireOnPress}>
                                <View style={[styles.sameViewStyel]}>
                                    <Image
                                        style={[styles.iconeStyle]}
                                        resizeMode='contain'
                                        source={Images.on_fire_icon}
                                    />
                                    <Text style={[styles.textStyle]}>On Fire</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={props.goodLuckOnPress}>
                                <View style={[styles.sameViewStyel]}>
                                    <Image
                                        style={[styles.iconeStyle]}
                                        resizeMode='contain'
                                        source={Images.good_luck_icon}
                                    />
                                    <Text style={[styles.textStyle]}>Good Luck</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[{
                            // backgroundColor:"red",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            height: 70,
                            width: RFValue(320, Contants.DesignCanvas.HEIGHT)
                        }]}>
                            <TouchableOpacity onPress={props.goldenBuzzOnPress}>
                                <View style={[styles.sameViewStyel]}>
                                    <Image
                                        style={[styles.iconeStyle]}
                                        resizeMode='contain'
                                        source={Images.Golden_Buzz_icon}
                                    />
                                    <Text style={[styles.textStyle]}>Golden Buzz</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={props.notBadOnPress}>
                                <View style={[styles.sameViewStyel]}>
                                    <Image
                                        style={[styles.iconeStyle]}
                                        resizeMode='contain'
                                        source={Images.Not_bad_icon}
                                    />
                                    <Text style={[styles.textStyle]}>Not Bad</Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                    </View>

                </View>
            </TouchableOpacity>
        </Modal>

    );
}

/************************************************ */

/**
 * 
 * @param props <ModelVie 
 * transparent={} 
 * visible={}
 * onRequestClose={}
 * model_style={}
 * modelonPress={}
 * ModalMainContainer={}
 * ModalSecContainer={}
 * ModalTopView={}
 * lableTopOnePress={}
 * model_text_style={}
 * lableTopOne={}
 * lableBottomTwo={}
 * lableBottomThree={}
 * lableBottomOne={}
 * lableBottomOnePress={}
 * ModalBottomView={}
 * lableBottomThreePress={}
 * model_btn_view_style={}
 * modle_btn_touh_style={}
 *  onPress={}
 *  buttonText={}
 * model_btn_text_style={}
 * />
 * 
 */

export function ModelView(props) {
    return (
        <Modal
            // transparent={true}
            transparent={props.transparent}
            // visible={show}
            visible={props.visible}
            // onRequestClose={() => {
            //     setShow(false)
            // }}
            onRequestClose={props.onRequestClose}
            style={props.model_style}
        >
            {/* <TouchableOpacity onPress={props.modelonPress}> */}
            <View style={[styles.ModalMainContainer, props.ModalMainContainer]}>
                <View style={[styles.ModalSecContainer, props.ModalSecContainer]}>
                    <View style={[styles.ModalTopView, props.ModalTopView]}>
                        <TouchableOpacity onPress={props.lableTopOnePress}>
                            <Text style={[styles.model_text_style, props.model_text_style]}>
                                {props.lableTopOne}
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <View style={[styles.ModalTopView, props.ModalBottomView]}>
                        <TouchableOpacity onPress={props.lableBottomOnePress}>
                            <Text style={[styles.model_text_style, props.model_text_style]}>
                                {props.lableBottomOne}
                            </Text>
                        </TouchableOpacity>
                        <Text style={[styles.model_text_style, props.model_text_style]}>
                            {' '} {props.lableBottomTwo} {' '}
                        </Text>
                        <TouchableOpacity onPress={props.lableBottomThreePress}>
                            <Text style={[styles.model_text_style, props.model_text_style]}>
                                {props.lableBottomThree}
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={[props.model_btn_view_style, {
                    // backgroundColor:"red",
                    marginTop: normalize(10),
                    marginBottom: normalize(25)
                }]}>
                    <TouchableOpacity
                        onPress={props.onPress}
                        style={[styles.modle_btn_touh_style, props.modle_btn_touh_style]}>
                        <Text style={[styles.model_text_style, props.model_btn_text_style, { color: '#fff' }]}>
                            {props.buttonText}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* </TouchableOpacity> */}
        </Modal>


    );
}



//***********************************************************************************/
/**
 * 
 * @param props <ModelVie 
 * transparent={} 
 * visible={}
 * onRequestClose={}
 * model_style={}
 * modelonPress={}
 * ModalMainContainer={}
 * ModalSecContainer={}
 * ModalTopView={}
 * lableTopOnePress={}
 * model_text_style={}
 * lableTopOne={}
 * lableBottomTwo={}
 * lableBottomThree={}
 * lableBottomOne={}
 * lableBottomOnePress={}
 * ModalBottomView={}
 * lableBottomThreePress={}
 * model_btn_view_style={}
 * modle_btn_touh_style={}
 *  onPress={}
 *  buttonText={}
 * model_btn_text_style={}
 * />
 * 
 */


export function ReportModelView(props) {
    return (
        <Modal
            // transparent={true}
            transparent={props.transparent}
            // visible={show}
            visible={props.visible}
            // onRequestClose={() => {
            //     setShow(false)
            // }}
            onRequestClose={props.onRequestClose}
            style={props.model_style}
        >
            {/* <TouchableOpacity onPress={props.modelonPress}> */}
            <View style={[styles.ReportModalMainContainer, props.ReportModalMainContainer]}>
                <View style={[styles.ReportModalSecContainer, props.ReportModalSecContainer]}>
                    <View style={[styles.ReportModalTopView, props.ReportModalTopView]}>
                        <TouchableOpacity onPress={props.topLablePress}>
                            <Text style={[styles.Reportmodel_text_style, props.Reportmodel_text_style]}>
                                Report Abuse
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.ReportModalTopView, props.ReportModalTopView]}>
                        <Text style={[props.Reportmodel_middle_text_style, Styles.REGULAR_14, {
                            color: 'grey',
                            lineHeight: 21,
                            textAlign: 'center',
                        }]}>
                            Are you sure you would like to report this recording an inappropriate?
                            {/* {props.middleLable} */}
                        </Text>
                    </View>
                    <View style={[styles.ReportModalTopView, props.ReportModalTopView]}>
                        <TouchableOpacity onPress={props.bottomLablePress}>
                            <Text style={[Styles.MEDIUM_15, props.Reportmodel_text_style, { color: '#272D37', lineHeight: 22 }]}>
                                Report
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={[props.model_btn_view_style, {
                    // backgroundColor:"red",
                    marginTop: normalize(10),
                    marginBottom: normalize(25)
                }]}>
                    <TouchableOpacity
                        onPress={props.onPress}
                        style={[styles.modle_btn_touh_style, props.modle_btn_touh_style]}>
                        <Text style={[props.Reportmodel_btn_text_style, Styles.MEDIUM_15, { lineHeight: 22, color: '#fff', }]}>
                            {props.buttonText}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* </TouchableOpacity> */}
        </Modal>

    );
}
//**********************************************************************************/

/**
 * 
 * @param props <ProfileModel 
 * transparent={} 
 * visible={}
 * onRequestClose={}
 * model_style={}
 * modelonPress={}
 * profilemodelonPress={}
 * profilemodelContainer={}
 * profilemodelSecContainer={}
 * profileImageView={}
 * profileImage={}
 * profileTopTextView={}
 * profileTopText={}
 * propfileBoxView={}
 * propfileBoxRowView={}
 * sourceTouchOne={}
 * TouchOneText={}
 * TouchImageView={}
 * TouchImage={}
 * TouchTextView={}
 *  TouchText={}
 * TouchOneText={}
 * TouchOneOneText={}
 *  buttonText={}
 * model_btn_text_style={}
 * />
 * 
 */

export function ProfileModel(props) {
    return (
        <Modal
            // transparent={true}
            transparent={props.transparent}
            // visible={show}
            visible={props.visible}
            // onRequestClose={() => {
            //     setShow(false)
            // }}
            onRequestClose={props.onRequestClose}
            style={props.model_style}
        >
            {/* <TouchableOpacity onPress={props.profilemodelonPress}> */}
            <View style={[styles.profilemodelContainer, props.profilemodelContainer]}>
                <View style={[styles.profilemodelSecContainer, props.profilemodelSecContainer]}>
                    <ScrollView>
                        
                        <View style={[props.profileImageView, {
                            // backgroundColor:'red',
                            // width:normalize(200),
                            marginTop: normalize(25),
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: normalize(100),
                            marginHorizontal: normalize(20)

                        }]}>
                            <Image
                                style={[props.profileImage, {
                                    width: normalize(90),
                                    height: normalize(90),
                                    borderRadius: normalize(20)
                                }]}
                                resizeMode="contain"
                                source={props.source}
                            />
                            
                        </View>
                        <View style={[props.profileTopTextView, {
                            marginTop: normalize(15),
                            alignItems: 'center',
                            marginHorizontal: normalize(20)

                        }]}>
                            <Text style={[props.profileToptext, Styles.BOLD_20, {
                                lineHeight: 27,
                                color: '#000',
                            }]}>
                                {props.profileTopText}
                            </Text>
                        </View>
                        <View style={[props.profileBoxView, {
                            // backgroundColor:'yellow',
                            marginTop: normalize(15),
                            // alignItems:'center',
                            marginHorizontal: normalize(20)

                        }]}>
                            <View style={[props.propfileBoxRowView, {
                                //   backgroundColor:"red",
                                flexDirection: "row",
                                justifyContent: 'space-between',
                                height: normalize(100)
                            }]}>
                                <TouchableOpacity onPress={props.onPressTouchOne} style={[props.TouchOneStyle, {
                                    //   backgroundColor:"#F5F5F7",
                                    width: normalize(160),
                                    height: normalize(100),
                                    borderRadius: normalize(15),
                                }]}>
                                    <View style={[props.TouchImageView, {
                                        //   backgroundColor:"red",
                                        //   justifyContent:"flex-end"
                                        alignItems: "flex-end",
                                        paddingRight: normalize(10),
                                        marginTop: normalize(10)
                                    }]}>
                                        <Image style={[props.TouchImage, {
                                            width: normalize(25),
                                            height: normalize(25)
                                        }]}
                                            resizeMode="contain"
                                            source={props.sourceTouchOne}
                                        />
                                    </View>
                                    <View style={[props.TouchTextView, {
                                        //   backgroundColor:'red',
                                        marginTop: normalize(10),
                                        marginLeft: normalize(15),
                                        width: normalize(100),
                                    }]}>
                                        <Text style={[props.TouchText, Styles.MEDIUM_15, {
                                            lineHeight: 21,
                                            color: '#272D37',
                                            textAlign: 'left'
                                        }]}>
                                            {props.TouchOneText} {'\n'} {props.TouchOneOneText}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={props.onPressTouchTwo} style={[props.TouchTwoStyle, {
                                    //   backgroundColor:"#F5F5F7",
                                    width: normalize(160),
                                    height: normalize(100),
                                    borderRadius: normalize(15),
                                }]}>
                                    <View style={[props.TouchImageView, {
                                        //   backgroundColor:"red",
                                        //   justifyContent:"flex-end"
                                        alignItems: "flex-end",
                                        paddingRight: normalize(10),
                                        marginTop: normalize(10)
                                    }]}>
                                        <Image style={[props.TouchImage, {
                                            width: normalize(25),
                                            height: normalize(25)
                                        }]}
                                            resizeMode="contain"
                                            source={props.sourceTouchTwo}
                                        />
                                    </View>
                                    <View style={[props.TouchTextView, {
                                        //   backgroundColor:'red',
                                        marginTop: normalize(10),
                                        marginLeft: normalize(15),
                                        width: normalize(100),
                                    }]}>
                                        <Text style={[props.TouchText, Styles.MEDIUM_15, {
                                            lineHeight: 21,
                                            color: '#272D37',
                                            textAlign: 'left'
                                        }]}>
                                            {props.TouchTwoText} {'\n'} {props.TouchTwoTwoText}
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                            {/* //************************************ */}
                            <View style={[props.propfileBoxRowView, {
                                //   backgroundColor:"red",
                                flexDirection: "row",
                                justifyContent: 'space-between',
                                height: normalize(100),
                                marginTop: normalize(10)
                            }]}>
                                <TouchableOpacity onPress={props.onPressTouchThree} style={[props.TouchThreeStyle, {
                                    //   backgroundColor:"#F5F5F7",
                                    width: normalize(160),
                                    height: normalize(100),
                                    borderRadius: normalize(15),
                                }]}>
                                    <View style={[props.TouchImageView, {
                                        //   backgroundColor:"red",
                                        //   justifyContent:"flex-end"
                                        alignItems: "flex-end",
                                        paddingRight: normalize(10),
                                        marginTop: normalize(10)
                                    }]}>
                                        <Image style={[props.TouchImage, {
                                            width: normalize(25),
                                            height: normalize(25)
                                        }]}
                                            resizeMode="contain"
                                            source={props.sourceTouchThree}
                                        />
                                    </View>
                                    <View style={[props.TouchTextView, {
                                        //   backgroundColor:'red',
                                        marginTop: normalize(10),
                                        marginLeft: normalize(15),
                                        width: normalize(100),
                                    }]}>
                                        <Text style={[props.TouchText, Styles.MEDIUM_15, {
                                            lineHeight: 21,
                                            color: '#272D37',
                                            textAlign: 'left'
                                        }]}>
                                            {props.TouchThreeText} {'\n'} {props.TouchThreeThreeText}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={props.onPressTouchFour}
                                    style={[props.TouchFourStyle, {
                                        //   backgroundColor:"#F5F5F7",
                                        width: normalize(160),
                                        height: normalize(100),
                                        borderRadius: normalize(15),
                                    }]}>
                                    <View style={[props.TouchImageView, {
                                        //   backgroundColor:"red",
                                        //   justifyContent:"flex-end"
                                        alignItems: "flex-end",
                                        paddingRight: normalize(10),
                                        marginTop: normalize(10)
                                    }]}>
                                        <Image style={[props.TouchImage, {
                                            width: normalize(25),
                                            height: normalize(25)
                                        }]}
                                            resizeMode="contain"
                                            source={props.sourceTouchFour}
                                        />
                                    </View>
                                    <View style={[props.TouchTextView, {
                                        //   backgroundColor:'red',
                                        marginTop: normalize(10),
                                        marginLeft: normalize(15),
                                        width: normalize(100),
                                    }]}>
                                        <Text style={[props.TouchText, Styles.MEDIUM_15, {
                                            lineHeight: 21,
                                            color: '#272D37',
                                            textAlign: 'left'
                                        }]}>
                                            {props.TouchFourText} {'\n'} {props.TouchFourFourText}
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                            {/* //************************************ */}
                        </View>
                        <View style={[props.profileInputBoxView, {
                            // backgroundColor:'yellow',
                            marginTop: normalize(15),
                            // alignItems:'center',
                            marginHorizontal: normalize(20)

                        }]}>
                            <TextInput
                                style={[props.ProfileInputBox, Styles.REGULAR_15, {
                                    lineHeight: 21,
                                    color: "#272D37",
                                    backgroundColor: '#F5F5F7',
                                    height: normalize(50),
                                    borderRadius: normalize(15),
                                    paddingLeft: normalize(10)
                                }]}
                                placeholder={props.placeholder}
                                editable={props.editable}
                                placeholderTextColor={props.placeholderTextColor}
                                secureTextEntry={props.secureTextEntry}
                                value={props.value}
                                keyboardType={props.keyboardType}
                                onChangeText={props.onChangeOfText}
                            />
                        </View>
                        <View style={[props.profileInputBoxView, {
                            // backgroundColor:'yellow',
                            marginTop: normalize(15),
                            // alignItems:'center',
                            marginHorizontal: normalize(20)

                        }]}>
                            <TouchableOpacity
                                onPress={props.onPress}
                                style={[styles.profileButton, props.profileButton]}>
                                <Text style={[styles.profileButtonText, props.profileButtonText,]}>
                                    {props.profilebuttonText}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[props.profileInputBoxView, {
                            // backgroundColor:'yellow',
                            marginTop: normalize(15),
                            // alignItems:'center',
                            marginHorizontal: normalize(20)

                        }]}>
                            <TouchableOpacity
                                onPress={props.onCancel}
                                style={[styles.profileButton, styles.cancelButton, props.profileButton]}>
                                <Text style={[styles.profileButtonText, props.profileButtonText,styles.cancelButtonText]}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>

            </View>
            {/* </TouchableOpacity> */}
        </Modal>

    );
}


//***********************************************************************************/



//**********************************************************************************/

/**
 * 
 * @param props <ProfileModel 
 * transparent={} 
 * visible={}
 * onRequestClose={}
 * model_style={}
 * modelonPress={}
 * profilemodelonPress={}
 * profilemodelContainer={}
 * profilemodelSecContainer={}
 * profileImageView={}
 * profileImage={}
 * profileTopTextView={}
 * profileTopText={}
 * propfileBoxView={}
 * propfileBoxRowView={}
 * sourceTouchOne={}
 * TouchOneText={}
 * TouchImageView={}
 * TouchImage={}
 * TouchTextView={}
 *  TouchText={}
 * TouchOneText={}
 * TouchOneOneText={}
 *  buttonText={}
 * model_btn_text_style={}
 * />
 * 
 */

export function ChallangeModel(props) {
    return (
        <Modal
            // transparent={true}
            transparent={props.transparent}
            // visible={show}
            visible={props.visible}
            // onRequestClose={() => {
            //     setShow(false)
            // }}
            onRequestClose={props.onRequestClose}
            style={props.model_style}
        >
            {/* <TouchableOpacity onPress={props.profilemodelonPress}> */}
            <View style={[styles.profilemodelContainer, props.profilemodelContainer]}>
                <View style={[styles.challangemodelSecContainer, props.challangemodelSecContainer]}>
                    <ScrollView>
                        <View style={[props.challangeImageView, {
                            // backgroundColor:'red',
                            // width:normalize(200),
                            marginTop: normalize(25),
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: normalize(100),
                            marginHorizontal: normalize(20)

                        }]}>
                            <Image
                                style={[props.profileImage, {
                                    width: normalize(90),
                                    height: normalize(90),
                                    borderRadius: normalize(20)
                                }]}
                                resizeMode="contain"
                                source={props.source}
                            />
                        </View>
                        <View style={[props.ChallangeTopTextView, {
                            marginTop: normalize(15),
                            alignItems: 'center',
                            marginHorizontal: normalize(20)

                        }]}>
                            <Text style={[props.ChallangeTopText, Styles.BOLD_20, {
                                lineHeight: 27,
                                color: '#000',
                            }]}>
                                {props.ChallangeTopText}
                            </Text>
                            <Text style={[props.ChallangeTopText, Styles.BOLD_20, {
                                color: '#000',
                                lineHeight: 27,
                            }]}>
                                {props.ChallangeTwoText}
                            </Text>
                        </View>

                        <View style={[props.challangeButtonView, {
                            // backgroundColor:'yellow',
                            marginTop: normalize(20),
                            alignItems: 'center',
                            marginHorizontal: normalize(20)

                        }]}>
                            <TouchableOpacity
                                onPress={props.onPress}
                                style={[styles.challangeButton, props.ChallangeButton]}>
                                <Text style={[styles.profileButtonText, props.challangeButtonText, Styles.MEDIUM_15, {
                                    lineHeight: 22
                                }]}>
                                    {props.challangebuttonText}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>

            </View>
            {/* </TouchableOpacity> */}
        </Modal>

    );
}


//***********************************************************************************/


export function ModelMenuView(props) {
    return (
        <Modal
            // transparent={true}
            transparent={props.transparent}
            // visible={show}
            visible={props.visible}
            // onRequestClose={() => {
            //     setShow(false)
            // }}
            onRequestClose={props.onRequestClose}
            style={props.model_style}
        >
            {/* <TouchableOpacity onPress={props.modelonPress}> */}
            <View style={[styles.ModalMainContainer, props.ModalMainContainer]}>
                <View style={[styles.ModalOpenMenuContainer, props.ModalOpenMenuContainer]}>

                    <View style={[styles.ModalMenuTopView, props.ModalBottomView]}>
                        <TouchableOpacity onPress={props.lableBottomOnePress}>
                            <Text style={[styles.model_menu_text_style, props.model_text_style]}>
                                {props.lableBottomOne}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={props.lableBottomTwoPress}>
                            <Text style={[styles.model_menu_text_style, props.model_text_style]}>
                                {' '} {props.lableBottomTwo} {' '}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={props.lableBottomThreePress}>
                            <Text style={[styles.model_menu_text_style, props.model_text_style]}>
                                {props.lableBottomThree}
                            </Text>
                        </TouchableOpacity>
                        <View style={[styles.ModalMenuTopView, props.ModalBottomView]}>

                            <TouchableOpacity onPress={props.lableBottomFourPress}>
                                <Text style={[styles.model_menu_text_style, props.model_text_style]}>
                                    {props.lableBottomFour}
                                </Text>
                            </TouchableOpacity>


                            <View style={[styles.ModalMenuTopView, props.ModalTopView]}>
                                <TouchableOpacity onPress={props.lableBottomFourPress}>
                                    <Text style={[styles.model_menu_text_style, props.model_text_style]}>
                                        {props.lableTopOne}
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </View>
                <View style={[props.model_btn_view_style, {
                    // backgroundColor:"red",
                    marginTop: normalize(10),
                    marginBottom: normalize(25)
                }]}>
                    <TouchableOpacity
                        onPress={props.onPress}
                        style={[styles.modle_btn_touh_style, props.modle_btn_touh_style]}>
                        <Text style={[styles.model_text_style, props.model_btn_text_style, { color: '#fff' }]}>
                            {props.buttonText}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* </TouchableOpacity> */}
        </Modal>


    );
}

//************************************ProfileCameraModel code end***********************************************/


//************************************all new model code here start***********************************************/
//************************************ProfileCameraModel code start***********************************************/
export function ProfileCameraModelView(props) {
    return (
        <Modal
            // transparent={true}
            transparent={props.transparent}
            // visible={show}
            visible={props.visible}
            // onRequestClose={() => {
            //     setShow(false)
            // }}
            onRequestClose={props.onRequestClose}
            style={props.model_style}
        >
            {/* <TouchableOpacity onPress={props.modelonPress}> */}
            <View style={[{
                ...Platform.select({
                    ios: {
                        // backgroundColor:"red",
                        backgroundColor: 'rgba(52, 52, 52, 0.8)',
                        justifyContent: "flex-end",
                        alignItems: 'center',
                        height: '100%',
                    },
                    android: {
                        backgroundColor: 'rgba(52, 52, 52, 0.8)',
                        justifyContent: "flex-end",
                        alignItems: 'center',
                        height: Dimensions.get('screen').height * 0.9265,
                    }
                })

            }]}>
                <View style={[props.ModalSecContainer, {
                    backgroundColor: "#fff",
                    width: Dimensions.get('window').width - 25,
                    borderRadius: RFValue(25, Contants.DesignCanvas.HEIGHT),
                    borderColor: "#F5F5F7",
                    borderWidth: 2,
                    height: RFValue(91, Contants.DesignCanvas.HEIGHT),
                    justifyContent: "center",
                    alignItems: "center"
                }]}>
                    <View style={[props.ModalTopView, {
                        //   backgroundColor:"green",
                        justifyContent: 'center',
                        alignItems: "center",
                        // paddingTop: 15,
                        // height: normalize(30),
                        width: RFValue(320, Contants.DesignCanvas.HEIGHT),
                    }]}>
                        <TouchableOpacity onPress={props.titleOne}>
                            <Text style={[Styles.MEDIUM_15, props.model_text_style, { color: "#272D37" }]}>
                                {props.FirstTitle}
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <View style={[props.ModalBottomView, {
                        //   backgroundColor:"red",
                        justifyContent: 'center',
                        alignItems: "center",
                        // paddingTop: 15,
                        // height: normalize(30),
                        marginTop: RFValue(16, Contants.DesignCanvas.HEIGHT),
                        width: RFValue(320, Contants.DesignCanvas.HEIGHT),
                    }]}>
                        <TouchableOpacity onPress={props.titleTwo}>
                            <Text style={[Styles.MEDIUM_15, props.model_text_style, { color: "#272D37" }]}>
                                {props.SecondTitle}
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={[props.model_btn_view_style, {
                    // backgroundColor:"green",
                    // width: RFValue(324, Contants.DesignCanvas.HEIGHT),
                    marginTop: normalize(10),
                    marginBottom: normalize(25)
                }]}>
                    <TouchableOpacity
                        onPress={props.onPress}
                        style={[props.modle_btn_touh_style, {
                            backgroundColor: "#000",
                            width: Dimensions.get('window').width - 25,
                            height: RFValue(50, Contants.DesignCanvas.HEIGHT),
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: RFValue(25, Contants.DesignCanvas.HEIGHT),
                        }]}>
                        <Text style={[Styles.MEDIUM_15, props.model_btn_text_style, { color: '#fff' }]}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>


    );
}
//************************************ProfileCameraModel code end***********************************************/
//************************************ProfileCameraModel code start***********************************************/
export function ProfilePostsListMenuModel(props) {
    return (
        <Modal
            // transparent={true}
            transparent={props.transparent}
            // visible={show}
            visible={props.visible}
            // onRequestClose={() => {
            //     setShow(false)
            // }}
            onRequestClose={props.onRequestClose}
            style={props.model_style}
        >
            {/* <TouchableOpacity onPress={props.modelonPress}> */}
            <View style={[{
                ...Platform.select({
                    ios: {
                        // backgroundColor:"red",
                        backgroundColor: 'rgba(52, 52, 52, 0.8)',
                        justifyContent: "flex-end",
                        alignItems: 'center',
                        height: '100%',
                    },
                    android: {
                        backgroundColor: 'rgba(52, 52, 52, 0.8)',
                        justifyContent: "flex-end",
                        alignItems: 'center',
                        height: Dimensions.get('screen').height * 0.9265,
                    }
                })

            }]}>
                <View style={[props.ModalSecContainer, {
                    backgroundColor: "#fff",
                    width: Dimensions.get('window').width - 25,
                    borderRadius: RFValue(25, Contants.DesignCanvas.HEIGHT),
                    borderColor: "#F5F5F7",
                    borderWidth: 2,
                    height: RFValue(130, Contants.DesignCanvas.HEIGHT),
                    // justifyContent: "center",
                    alignItems: "center"
                }]}>
                    <View style={[props.ModalTopView, {
                        //   backgroundColor:"green",
                        justifyContent: 'center',
                        alignItems: "center",
                        // paddingTop: 15,
                        // height: normalize(30),
                        marginTop: RFValue(20, Contants.DesignCanvas.HEIGHT),
                        width: RFValue(320, Contants.DesignCanvas.HEIGHT),
                    }]}>
                        <TouchableOpacity onPress={props.Copylink}>
                            <Text style={[Styles.MEDIUM_15, props.model_text_style, { color: "#272D37" }]}>
                                Copy link
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <View style={[props.ModalBottomView, {
                        //   backgroundColor:"red",
                        justifyContent: 'center',
                        alignItems: "center",
                        // paddingTop: 15,
                        // height: normalize(30),
                        marginTop: RFValue(20, Contants.DesignCanvas.HEIGHT),
                        width: RFValue(320, Contants.DesignCanvas.HEIGHT),
                    }]}>
                        <TouchableOpacity onPress={props.Share}>
                            <Text style={[Styles.MEDIUM_15, props.model_text_style, { color: "#272D37" }]}>
                                Share
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <View style={[props.ModalBottomView, {
                        //   backgroundColor:"red",
                        justifyContent: 'center',
                        alignItems: "center",
                        // paddingTop: 15,
                        // height: normalize(30),
                        marginTop: RFValue(20, Contants.DesignCanvas.HEIGHT),
                        width: RFValue(320, Contants.DesignCanvas.HEIGHT),
                    }]}>
                        <TouchableOpacity onPress={props.Remove}>
                            <Text style={[Styles.MEDIUM_15, props.model_text_style, { color: "#272D37" }]}>
                                Remove
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={[props.model_btn_view_style, {
                    // backgroundColor:"green",
                    // width: RFValue(324, Contants.DesignCanvas.HEIGHT),
                    marginTop: normalize(10),
                    marginBottom: normalize(25)
                }]}>
                    <TouchableOpacity
                        onPress={props.onPress}
                        style={[props.modle_btn_touh_style, {
                            backgroundColor: "#000",
                            width: Dimensions.get('window').width - 25,
                            height: RFValue(50, Contants.DesignCanvas.HEIGHT),
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: RFValue(25, Contants.DesignCanvas.HEIGHT),
                        }]}>
                        <Text style={[Styles.MEDIUM_15, props.model_btn_text_style, { color: '#fff' }]}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>


    );
}
//************************************ProfileCameraModel code end***********************************************/
//************************************ProfileCameraModel code start***********************************************/

//************************************ProfileCameraModel code start***********************************************/
export function ProfileMenuModel(props) {
    return (
        <Modal
            // transparent={true}
            transparent={props.transparent}
            // visible={show}
            visible={props.visible}
            // onRequestClose={() => {
            //     setShow(false)
            // }}
            onRequestClose={props.onRequestClose}
            style={[props.model_style,]}
        >
            {/* <TouchableOpacity onPress={props.modelonPress}> */}
            <View style={[props.ModalMainContainer, {
                ...Platform.select({
                    ios: {
                        backgroundColor: 'rgba(52, 52, 52, 0.8)',
                        justifyContent: "flex-end",
                        alignItems: 'center',
                        height: '100%',
                    },
                    android: {
                        backgroundColor: 'rgba(52, 52, 52, 0.8)',
                        justifyContent: "flex-end",
                        alignItems: 'center',
                        height: Dimensions.get("window").height + 20,
                    },
                })

            }]}>
                <View style={[props.ModalOpenMenuContainer, {
                    backgroundColor: "white",
                    width: Dimensions.get('window').width - 25,
                    borderRadius: normalize(20),
                    borderColor: "#F5F5F7",
                    borderWidth: 2,
                    height: RFValue(210, Contants.DesignCanvas.HEIGHT),
                    alignItems: "center"

                }]}>
                    <View style={[props.ModalTopView, {
                        justifyContent: 'center',
                        alignItems: "center",
                        marginTop: RFValue(19, Contants.DesignCanvas.HEIGHT),
                        width: RFValue(320, Contants.DesignCanvas.HEIGHT),
                    }]}>
                        <TouchableOpacity onPress={props.Settings}>
                            <Text style={[Styles.MEDIUM_15, props.model_text_style, { color: "#272D37" }]}>
                                Settings
                            </Text>
                        </TouchableOpacity>

                    </View>
                    {/* <View style={[props.ModalTopView, {
                        justifyContent: 'center',
                        alignItems: "center",
                        marginTop: RFValue(19, Contants.DesignCanvas.HEIGHT),
                        width: RFValue(320, Contants.DesignCanvas.HEIGHT),
                    }]}>
                        <TouchableOpacity onPress={props.Subscription}>
                            <Text style={[Styles.MEDIUM_15, props.model_text_style, { color: "#272D37" }]}>
                                Subscription Plans
                            </Text>
                        </TouchableOpacity>

                    </View> */}
                    <View style={[props.ModalTopView, {
                        justifyContent: 'center',
                        alignItems: "center",
                        marginTop: RFValue(19, Contants.DesignCanvas.HEIGHT),
                        width: RFValue(320, Contants.DesignCanvas.HEIGHT),
                    }]}>
                        <TouchableOpacity onPress={props.AboutApp}>
                            <Text style={[Styles.MEDIUM_15, props.model_text_style, { color: "#272D37" }]}>
                                About App
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <View style={[props.ModalTopView, {
                        justifyContent: 'center',
                        alignItems: "center",
                        marginTop: RFValue(19, Contants.DesignCanvas.HEIGHT),
                        width: RFValue(320, Contants.DesignCanvas.HEIGHT),
                    }]}>
                        <TouchableOpacity onPress={props.Help}>
                            <Text style={[Styles.MEDIUM_15, props.model_text_style, { color: "#272D37" }]}>
                                Help
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <View style={[props.ModalTopView, {
                        justifyContent: 'center',
                        alignItems: "center",
                        marginTop: RFValue(19, Contants.DesignCanvas.HEIGHT),
                        width: RFValue(320, Contants.DesignCanvas.HEIGHT),
                    }]}>
                        <TouchableOpacity onPress={props.logout}>
                            <Text style={[Styles.MEDIUM_15, props.model_text_style, { color: "#272D37" }]}>
                                Logout
                            </Text>
                        </TouchableOpacity>

                    </View>


                </View>
                <View style={[props.model_btn_view_style, {
                    ...Platform.select({
                        ios: {
                            // backgroundColor:"red",
                            marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT),
                            marginBottom: RFValue(20, Contants.DesignCanvas.HEIGHT),
                        },
                        android: {
                            marginTop: RFValue(10, Contants.DesignCanvas.HEIGHT),
                            marginBottom: RFValue(10, Contants.DesignCanvas.HEIGHT),
                        }
                    })

                }]}>
                    <TouchableOpacity
                        onPress={props.onPress}
                        style={[props.modle_btn_touh_style, {
                            backgroundColor: "#000",
                            width: Dimensions.get('window').width - 25,
                            height: RFValue(50, Contants.DesignCanvas.HEIGHT),
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: normalize(30)
                        }]}>
                        <Text style={[Styles.MEDIUM_15, props.model_btn_text_style, { color: '#fff' }]}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>


    );
}

//************************************ProfileCameraModel code end***********************************************/



//************************************ProfileCameraModel code start***********************************************/
export function UserProfileModelView(props) {
    return (
        <Modal
            // transparent={true}
            transparent={props.transparent}
            // visible={show}
            visible={props.visible}
            // onRequestClose={() => {
            //     setShow(false)
            // }}
            onRequestClose={props.onRequestClose}
            style={props.model_style}
        >
            {/* <TouchableOpacity onPress={props.modelonPress}> */}
            <View style={[{
                ...Platform.select({
                    ios: {
                        // backgroundColor:"red",
                        backgroundColor: 'rgba(52, 52, 52, 0.8)',
                        justifyContent: "flex-end",
                        alignItems: 'center',
                        height: '100%',
                    },
                    android: {
                        backgroundColor: 'rgba(52, 52, 52, 0.8)',
                        justifyContent: "flex-end",
                        alignItems: 'center',
                        height: Dimensions.get('screen').height * 0.9265,
                    }
                })

            }]}>
                <View style={[props.ModalSecContainer, {
                    backgroundColor: "#fff",
                    width: Dimensions.get('window').width - 25,
                    borderRadius: RFValue(25, Contants.DesignCanvas.HEIGHT),
                    borderColor: "#F5F5F7",
                    borderWidth: 2,
                    height: RFValue(120, Contants.DesignCanvas.HEIGHT),
                    justifyContent: "center",
                    alignItems: "center"
                }]}>
                    <View style={[props.ModalTopView, {
                        //   backgroundColor:"green",
                        justifyContent: 'center',
                        alignItems: "center",
                        // paddingTop: 15,
                        // height: normalize(30),
                        width: RFValue(320, Contants.DesignCanvas.HEIGHT),
                    }]}>
                        <TouchableOpacity onPress={props.titleOne}>
                            <Text style={[Styles.REGULAR_13, props.model_text_style, { color: "#686E76", lineHeight: 21, textAlign: 'center' }]}>
                                {props.FirstTitle} {'\n'} {props.FirstTitleNextLine}
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <View style={[props.ModalBottomView, {
                        //   backgroundColor:"red",
                        justifyContent: 'center',
                        alignItems: "center",
                        // paddingTop: 15,
                        // height: normalize(30),
                        marginTop: RFValue(16, Contants.DesignCanvas.HEIGHT),
                        width: RFValue(320, Contants.DesignCanvas.HEIGHT),
                    }]}>
                        <TouchableOpacity onPress={props.titleTwo}>
                            <Text style={[Styles.MEDIUM_15, props.model_text_style, { color: "#272D37" }]}>
                                {props.SecondTitle}
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={[props.model_btn_view_style, {
                    // backgroundColor:"green",
                    // width: RFValue(324, Contants.DesignCanvas.HEIGHT),
                    marginTop: normalize(10),
                    marginBottom: normalize(25)
                }]}>
                    <TouchableOpacity
                        onPress={props.onPress}
                        style={[props.modle_btn_touh_style, {
                            backgroundColor: "#000",
                            width: Dimensions.get('window').width - 25,
                            height: RFValue(50, Contants.DesignCanvas.HEIGHT),
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: RFValue(25, Contants.DesignCanvas.HEIGHT),
                        }]}>
                        <Text style={[Styles.MEDIUM_15, props.model_btn_text_style, { color: '#fff' }]}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>


    );
}
//************************************ProfileCameraModel code end***********************************************/




//************************************all new model code here end***********************************************/

const styles = StyleSheet.create({
    sameViewStyel: {
        // backgroundColor:"green",
        alignItems: "center",
        justifyContent: "center",
        height: 70,
        width: RFValue(100, Contants.DesignCanvas.HEIGHT),
        marginHorizontal: 3
    },
    iconeStyle: {
        width: 50,
        height: 50,
    },
    textStyle: {
        ...Styles.MEDIUM_12,
        lineHeight: 22,
        color: '#272D37',
    },
    ModalMainContainer: {
        // backgroundColor:"red",
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        justifyContent: "flex-end",
        alignItems: 'center',
        // padding: 5,
        height: '100%',
        // marginBottom:normalize(15)
    },
    profilemodelContainer: {
        // backgroundColor:"red",
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        justifyContent: "flex-end",
        // alignItems: 'center',
        // padding: 5,
        height: '100%',
        // marginBottom:normalize(15)
    },
    ModalSecContainer: {
        backgroundColor: "#fff",
        // width: RFValue(340, Contants.DesignCanvas.HEIGHT),
        width: Dimensions.get('window').width - 20,
        borderRadius: RFValue(32, Contants.DesignCanvas.HEIGHT),
        // borderColor: "#F5F5F7",
        // borderWidth: 2,
        height: RFValue(91, Contants.DesignCanvas.HEIGHT),
        justifyContent: "center",
        alignItems: "center",
        // width:300

    },
    ModalOpenMenuContainer: {
        backgroundColor: "white",
        width: normalize(300),
        borderRadius: normalize(20),
        borderColor: "grey",
        borderWidth: 2,
        height: normalize(150),
        justifyContent: "center",
        alignItems: "center"

    },
    profilemodelSecContainer: {
        backgroundColor: "#fff",
        // width: normalize(300),
        borderTopLeftRadius: normalize(25),
        borderTopRightRadius: normalize(25),
        borderColor: "#fff",
        borderWidth: 2,
        height: '70%',
        // justifyContent: "center",
        // alignItems: "center"

    },
    challangemodelSecContainer: {
        backgroundColor: "#fff",
        // width: normalize(300),
        borderTopLeftRadius: normalize(25),
        borderTopRightRadius: normalize(25),
        borderColor: "#fff",
        borderWidth: 2,
        height: '40%',
        // justifyContent: "center",
        // alignItems: "center"

    },
    ModalTopView: {
        //  backgroundColor:"green",
        justifyContent: 'center',
        alignItems: "center",
        // paddingTop: 15,
        height: normalize(30)

    },
    ModalMenuTopView: {
        // backgroundColor:"yellow",
        justifyContent: 'center',
        alignItems: "center",
        // paddingTop: 15,
        // height: normalize(50)
    },

    ModalImgStyle: {
        width: 40,
        height: 40,
        marginLeft: 45
    },

    model_text_style: {
        ...Styles.MEDIUM_15,
        lineHeight: 22,
        color: '#000',

    },
    model_menu_text_style: {
        color: '#000',
        fontSize: normalize(20)
    },
    profileButtonText: {
        ...Styles.MEDIUM_16,
        lineHeight: 22,
        color: '#fff',

    },
    cancelButtonText:{
        color:"#000"
    },
    modle_btn_touh_style: {
        backgroundColor: "#000",
        width: Dimensions.get('window').width - 20,
        height: normalize(60),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: normalize(30)
    },
    profileButton: {
        backgroundColor: "#000",
        // width: normalize(320),
        height: normalize(50),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: normalize(15)
    },
    cancelButton:{ 
        backgroundColor: "#fff",
        borderColor : "#000",
        color:"#000",
        borderWidth:1,
        marginBottom:10,
    },
    challangeButton: {
        backgroundColor: "#000",
        width: normalize(150),
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: normalize(20)
    },
    ReportModalMainContainer: {
        // backgroundColor:"red",
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        justifyContent: "flex-end",
        alignItems: 'center',
        // padding: 5,
        height: '100%',
        // marginBottom:normalize(15)
    },
    ReportModalSecContainer: {
        backgroundColor: "#fff",
        width: Dimensions.get('window').width - 20,
        borderRadius: normalize(20),
        borderColor: "grey",
        borderWidth: 2,
        height: normalize(150),
        // justifyContent: "center",
        // alignItems: "center"

    },
    ReportModalTopView: {
        // backgroundColor:"green",
        justifyContent: 'center',
        alignItems: "center",
        marginTop: normalize(10),
        height: normalize(40)

    },

    ReportModalImgStyle: {
        width: 40,
        height: 40,
        marginLeft: 45
    },
    Reportmodel_text_style: {
        ...Styles.BOLD_16,
        lineHeight: 22,
        color: '#000',

    },
    Reportmodle_btn_touh_style: {
        backgroundColor: "#000",
        width: normalize(320),
        height: normalize(60),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: normalize(30)
    },

});

