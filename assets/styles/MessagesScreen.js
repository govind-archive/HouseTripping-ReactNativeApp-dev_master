
import { StyleSheet, Platform, Dimensions } from 'react-native';
import Styles from '../../constants/Styles';

export const styles = StyleSheet.create({
    customHeader: {
        ...Platform.select({
            ios: {
            },
            android: {
                marginTop: 20
            },
            default: {
            }
        })
    },
    roundedButtons: {
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 20,
        paddingRight: 20,
        borderColor: "#272D37",
        borderRadius: 50,
        borderWidth: 1,
        height: 35
    },
    imgBackground: {
        width: '100%',
        height: '100%',
    },
    toggleButtons: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        flex: 1
    },
    container: {
        height: "100%",
        width: '100%',
        backgroundColor: '#4B38D3'
    },
    heading: {
        color: '#272D37',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
        // fontFamily: 'sp_bold',
    },
    heading_following: {
        fontSize: 16,
        marginBottom: 20,
        color: '#272D37',

    },
    secondHeading: {
        marginTop: 10,
        color: '#272D37',
        fontSize: 15,
    },
    input: {
        backgroundColor: "#FFF",
        paddingLeft: 15,
        borderRadius: 15,
        textAlign: "center",
        justifyContent: "center",
        marginTop: 10,
        height: 50
    },
    background_style: {
        flex: 1,
        height: '100%',
        width: '100%',
        marginBottom: 10,
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center"
    },
    signup: {
        borderRadius: 10,
        marginLeft: 30,
        marginTop: 10,
        marginRight: 30,
        bottom: '-66%',
        height: 50,
        justifyContent: 'space-between',
        alignSelf: 'stretch',
    },
    center: {
        alignSelf: 'center',
        marginLeft: 15,
        marginRight: 15,
        alignContent: "center",
        textAlign: "center",
        alignItems: "center",
        fontSize: 14,
        justifyContent: 'center'
    },
    profile_view: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
        flexDirection: 'column',
        width: 90,
        height: 90,
        alignItems: "center",
        marginRight: 20
    },
    profile_image: {
        borderWidth: 3,
        borderColor: '#4B38D3',
        width: "100%",
        height: "100%",
        borderRadius: 25
    },
    linerGradient_background: {
        borderRadius: 25,
        width: "100%",
        height: "100%",
        padding: 2
    },
    lower_view: {
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        overflow: 'hidden',
        marginTop: -5
    },
    heading_top: {
        color: '#FFF',
        fontSize: 20,
        marginTop: 15,
        marginLeft: "7%",
        justifyContent: 'center',
        textAlign: 'center',
        flex: 1,
        marginRight: "15%",
        ...Styles.BOLD_20
        // fontWeight: 'bold'
    },
    profile_name: {
        fontSize: 18,
        fontWeight: '700',
        alignItems: "center",
        color: '#fff'
    },
    profile_username: {
        fontSize: 14,
        alignItems: "center",
        marginTop: 5,
        color: '#C4C3E7'
    },
    zero_common: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 5,
        marginTop: 5,
        fontWeight: 'bold'
    },
    follow_common: {
        color: '#fff',
        fontSize: 14,
        marginRight: 30
    },
    border_middle:
    {
        backgroundColor: '#B3B6BA',
        opacity: 0.3,
        width: "100%",
        height: 1,
        marginTop: 10,
        marginBottom: 20,
        alignSelf: "center"
    },
    // innerListView:
    // {
    //     ...Platform.select({
    //         ios: {
    //             borderTopRightRadius: 40,
    //             borderTopLeftRadius: 40,
    //             height: "90%",
    //             padding: 20
    //         },
    //         android: {
    //             borderTopRightRadius: 40,
    //             borderTopLeftRadius: 40,
    //             height: "88%",
    //             padding: 20
    //         },
    //         default: {
    //             borderTopRightRadius: 40,
    //             borderTopLeftRadius: 40,
    //             height: "90%",
    //             padding: 20
    //         }
    //     })

    // },
    innerListView:
    {
        ...Platform.select({
            ios: {
                borderTopRightRadius: 40,
                borderTopLeftRadius: 40,
                height: Dimensions.get('window').height*0.8753,
                padding: 20
            },
            android: {
                borderTopRightRadius: 40,
                borderTopLeftRadius: 40,
                // height: "88%",
                // padding: 20,
                height: Dimensions.get('window').height*0.9353,
                paddingLeft:20,
                paddingRight:20
            },
            default: {
                borderTopRightRadius: 40,
                borderTopLeftRadius: 40,
                height: "90%",
                padding: 20
            }
        })

    }

});