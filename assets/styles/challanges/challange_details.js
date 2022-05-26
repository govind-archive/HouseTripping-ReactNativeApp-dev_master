
import { StyleSheet, Platform } from 'react-native';
import Styles from '../../../constants/Styles';


export const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: '100%',
        backgroundColor: '#F7EFFA',
        ...Platform.select({
            ios: {
                marginTop: -20
            },
            android: {
            },
            default: {
            }
        })
    },
    customHeader: {
        ...Platform.select({
            ios: {
                height: "11%",
                marginTop: 10
            },
            android: {
                height: "11%",
                marginTop: 20
            },
            default: {
                height: "11%"
            }
        })
    },
    input: {
        backgroundColor: "#FFF",
        padding: 5,
        marginBottom: 10,
        borderRadius: 15,
        textAlign: "center",
        fontSize: 20,
        height: 50,
        color: "#272D37",
        width: 75
    },
    cardDesigin: {
        width: "50%",
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: "#6263F0",
        alignContent: "center",
        textAlign: "center",
        justifyContent: "center",
        padding: 30
    },
    heading: {
        color: '#272D37',
        fontSize: 28,
        fontWeight: 'bold',
        marginRight: "20%"
        // fontFamily: 'sp_bold',
    },
    para: {
        color: '#686E76',
        marginTop: 10,
        fontSize: 15,
        marginRight: "20%"
        // fontFamily: 'sp_regular',
    },
    loginButton: {
        flex: 1,
        borderRadius: 15,
        flexDirection: 'row',
        backgroundColor: '#272D37',
        marginTop: 10,
        marginLeft: 30,
        marginRight: 10,
        alignItems: "center",
        alignSelf: 'stretch',
        borderColor: '#6263F0',
    },
    heading_top: {
        color: '#272D37',
        fontSize: 20,
        marginTop: 15,
        marginLeft: -70,
        justifyContent: 'center',
        textAlign: 'center',
        flex: 1,
        fontWeight: 'bold'
    },
    second_heading_top: {
        color: '#272D37',
        fontSize: 16,
        marginTop: 10,
        fontWeight: 'bold',
        textAlign: "center"
    },
    leftSide: {
        color: "#272D37",
        fontSize: 15,
        fontWeight: '500',
        flex: 1
    },
    rightSide: {
        color: "#686E76"
    },
    cardDesignRight: {
        width: "50%",
        borderRadius: 20,
        marginLeft: 10,
        backgroundColor: "#6263F0",
        alignContent: "center",
        textAlign: "center",
        justifyContent: "center",
        padding: 30
    },
    lineBreak: {
        marginTop: 10,
        marginBottom: 10,
        height: 1,
        backgroundColor: "#272D37"
    },
    signup: {
        borderRadius: 10,
        // marginLeft: 30,
        marginTop: 5,
        // marginRight: 30,
        marginHorizontal:15,
        justifyContent: 'space-between',
        alignSelf: 'stretch',
    },
    accept: {
        ...Platform.select({
            ios:{
                marginBottom: 15,
            },
            android:{}
        }),
        borderRadius: 10,
        marginLeft: 30,
        marginTop: 5,
        marginRight: 30,
        // marginBottom: 10,
        justifyContent: 'space-between',
        alignSelf: 'stretch',
    },
    center: {
        alignSelf: 'center',
        margin: 15,
        fontSize: 18,
        justifyContent: 'center'
    },
    acceptCenter: {
       
        alignSelf: 'center',
        margin: 15,
        justifyContent: 'center'
    }
});