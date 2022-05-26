import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    View,
    Picker,
    TextInput,
    Modal
} from 'react-native';
import Images from '../../assets/Images';
import normalize from 'react-native-normalize';
import constants from '../../assets/constants';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';


/*********************FbModel code here*************************** */
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
export function Fbmodel(props) {
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
            <View style={[styles.fbModelContainer, props.fbModelContainer]}>
                <View style={[styles.fbModelSecondContainer, props.fbModelSecondContainer]}>
                   <View style={[styles.fbModelSameContainer,props.fbModelSameContainer]}>
                       <Image
                       style={[{
                           width:normalize(50),
                           height:normalize(50),
                           marginTop:normalize(10)
                       }]}
                       resizeMode='contain'
                    //    source={Images.fb_model_icon}
                       source={props.source}
                       />
                   </View>
                   <View style={[styles.fbModelSameContainer,props.fbModelSameContainer]}>
                       <Text style={[{
                           color:'grey',
                           fontSize:normalize(18),
                           fontWeight:'bold',
                           textAlign:'center'
                       }]}>
                           Allow Swan to access Your {'\n'} facebook friends list?
                           {props.middleText}
                       </Text>
                       </View>
                   <View style={[styles.fbModelSameContainer,props.fbModelSameContainer]}>
                       <TouchableOpacity onPress={props.onPressAllow}>
                       <Text style={[{
                           color:'#000',
                           fontSize:normalize(20),
                           fontWeight:'bold',
                           textAlign:'center'
                        }]}>
                           Allow
                           {props.AllowText}
                       </Text>
                           </TouchableOpacity>
                       </View>
                   <View style={[styles.fbModelSameContainer,props.fbModelSameContainer]}>
                       <TouchableOpacity onPress={props.onPressDeny}>
                       <Text style={[{
                           color:'#000',
                           fontSize:normalize(20),
                           fontWeight:'bold',
                           textAlign:'center'
                        }]}>
                           Deny
                           {props.DenyText}
                       </Text>
                           </TouchableOpacity>
                       </View>

                </View>
                
                
                <TouchableOpacity onPress={props.onPress} style={[{
                    width:normalize(300),
                    height:normalize(60),
                    justifyContent:'center',
                    alignItems:'center',
                    marginTop:normalize(10),
                    borderRadius:normalize(30),
                    backgroundColor:"#000",
                    marginBottom:normalize(15)
                }]}>
                    <Text style={[{
                        color:"#fff",
                        fontWeight:'800',
                        fontSize:normalize(22)
                    }]}>
                        Cancel
                        {props.ButtonText}
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>

);
}
/*********************FbModel code here*************************** */
/*********************camera model code here*************************** */
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
//  export function CameraModel(props) {
//     return (
//         <Modal
//             // transparent={true}
//             transparent={props.transparent}
//             // visible={show}
//             visible={props.visible}
//             // onRequestClose={() => {
//             //     setShow(false)
//             // }}
//             onRequestClose={props.onRequestClose}
//             style={props.model_style}
//         >
//             <View style={[styles.ReportModalMainContainer, props.ReportModalMainContainer]}>
                
//                 <View style={[props.model_btn_view_style, {
//                     // backgroundColor:"red",
//                     marginTop: normalize(10),
//                     marginBottom: normalize(25)
//                 }]}>
//                     <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',marginLeft:normalize(20)}}>
//                     <TouchableOpacity
//                         onPress={props.onPressRetake}
//                         style={[styles.submitButton]}>
//                         <Text style={[styles.Reportmodel_text_style, props.Reportmodel_btn_text_style, { color: '#fff' }]}>
//                             {props.retakeText}
//                         </Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         onPress={props.onPressSubmit}
//                         style={[styles.submitButton]}>
//                               <LinearGradient
//                             style={[styles.submitButton]}
//                             colors={constants.AppColor.LINEAR_GRADIENT_COLOR_BUTTON}
//                             start={{ x: 1, y: 0 }}
//                             end={{ x: 0, y: 1 }}
//                         >
//                         <Text style={[styles.Reportmodel_text_style, props.Reportmodel_btn_text_style, { color: '#fff' }]}>
//                             {props.submitText}
//                         </Text>
//                         </LinearGradient>
//                     </TouchableOpacity>
//                     </View>
                  
//                 </View>
//             </View>
//         </Modal>

// );
// }
/*********************CameraModel code here*************************** */

const styles = StyleSheet.create({
 
    fbModelContainer: {
        // backgroundColor:"red",
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        justifyContent: "flex-end",
        alignItems: 'center',
        // padding: 5,
        height: '100%',
        marginBottom:normalize(15)
    },
    fbModelSecondContainer: {
        backgroundColor: "#fff",
        width: normalize(300),
        borderRadius: normalize(20),
        borderColor: "grey",
        borderWidth: 2,
        height: normalize(230),
        // justifyContent: "center",
        // alignItems: "center"

    },
    ReportModalTopView: {
        backgroundColor:"green",
        justifyContent: 'center',
        alignItems: "center",
        marginTop: normalize(10),
        height: normalize(40)

    },
    fbModelSameContainer:{
        // backgroundColor:"green",
        justifyContent:'center',
        alignItems:"center",
        marginTop:normalize(20)
    },

    // ReportModalMainContainer: {
    //     // backgroundColor:"red",
    //     backgroundColor: 'rgba(52, 52, 52, 0.8)',
    //     justifyContent: "flex-end",
    //     alignItems: 'center',
    //     // padding: 5,
    //     height: '100%',
    //     // marginBottom:normalize(15)
    // },

});