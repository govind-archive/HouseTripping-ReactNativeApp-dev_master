import React, { userState } from 'react';
import { filter } from 'lodash';
import { StyleSheet, FlatList, Text, View, Image, SafeAreaView, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, G } from 'react-native-svg';

class SelectCategory extends React.Component {
    demo = [
        {
            "name": "A",
            "code": "+34",
            "id": "1",
            "img": "af.png"
        },
        {
            "name": "An",
            "code": "+34",
            "id": "6",
            "img": "af.png"
        },
        {
            "name": "Ans",
            "code": "+34",
            "id": "5",
            "img": "af.png"
        }
        , {
            "name": "Ans",
            "code": "+34",
            "id": "3",
            "img": "af.png"
        }
        , {
            "name": "Ansh",
            "code": "+34",
            "id": "2",
            "img": "af.png"
        }
        , {
            "name": "Ansh",
            "code": "+34",
            "id": "21",
            "img": "af.png"
        }
        , {
            "name": "Ansh",
            "code": "+34",
            "id": "22",
            "img": "af.png"
        }
        , {
            "name": "Ansh",
            "code": "+34",
            "id": "23",
            "img": "af.png"
        }
        , {
            "name": "Ansh",
            "code": "+34",
            "id": "24",
            "img": "af.png"
        }
    ];

    contains = (name, query) => {
        const name_ = name.name;
        const code_ = name.code;
        if (name_.includes(query) || code_.includes(query)) {
            return true
        }
        return false
    }

    handleSearch = (text) => {
        const formattedQuery = text.toLowerCase()
        const data = filter(this.demo, user => {
            return this.contains(user, formattedQuery)
        })
        console.log(data);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient
                    colors={['#CE72F6', '#9C71FE', '#7572FF']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    style={{ marginTop: -20, height: "120%" }}
                >

                    <StatusBar
                        animated={true}
                        translucent
                        backgroundColor="transparent"
                        barStyle={"light-content"} />

                    <View style={{ height: "10%" }}>
                        <LinearGradient
                            colors={['#CE72F6', '#9C71FE', '#7572FF']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={{ flexDirection: 'row', height: "100%" }}
                        >
                            <TouchableOpacity style={{ marginTop: "5%" }}>
                                <Image style={{ width: 20, height: 20, margin: 20, marginLeft: 30, tintColor: '#FFF' }} source={require('../assets/images/back.png')} />
                            </TouchableOpacity>

                            <Text style={{ color: '#FFF', fontSize: 20, marginTop: "9.3%", justifyContent: 'center', textAlign: 'center', flex: 1, marginRight: 80, fontWeight:'bold' }}>
                                Song Categories
                            </Text>
                        </LinearGradient>
                    </View>

                    <View style={{  borderTopRightRadius: 40, borderTopLeftRadius: 40, position: "absolute", height: "80%", marginTop: "20%", overflow: 'hidden' }}>
                        <LinearGradient
                            colors={['#F7EFFA', '#FEFAF9']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={{ borderTopRightRadius: 40, borderTopLeftRadius: 40 }}
                        >
                            <FlatList
                                data={this.demo}
                                contentContainerStyle={{ justifyContent: 'center', margin: 10, marginTop: 40, marginBottom: 30, paddingBottom: 70 }}
                                numColumns={2}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={[styles.input, { justifyContent: 'space-between', flexDirection: 'column' }]}>
                                        <View style={styles.background_style}>

                                            <Image style={{ width: '100%', height: '100%', position: 'absolute', borderRadius: 25 }} source={require('../assets/images/song_thumb.png')} />
                                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>

                                                <Svg style={{
                                                    marginRight: 13,
                                                    marginTop: 13
                                                }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                                    <G id="Group_52143" data-name="Group 52143" transform="translate(-144 -115)">
                                                        <Path id="Path_25201" data-name="Path 25201" d="M9,0A9,9,0,1,1,0,9,9,9,0,0,1,9,0Z" transform="translate(144 115)" fill="#fff" />
                                                        <Path id="Path_24172" data-name="Path 24172" d="M4921.821,1474.518l3.592,3.124,5.87-5.958" transform="translate(-4773.551 -1350.544)" fill="none" stroke="#4b38d3" stroke-width="1.5" />
                                                    </G>
                                                </Svg>
                                            </View>
                                        </View>
                                        <Text style={{ alignSelf: 'center', fontSize: 15, color: '#272D37', margin: 10 }}>{item.name}</Text>
                                    </TouchableOpacity>

                                )}
                            />
                        </LinearGradient>
                    </View>

                    <TouchableOpacity style={styles.signup}>
                        <LinearGradient
                            style={{ borderRadius: 15 }}
                            colors={['#CE72F6', '#9C71FE', '#7572FF']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 1 }}
                        >
                            <Text style={[styles.center, { color: '#fff' }]}>Complete Setup</Text>
                        </LinearGradient>
                    </TouchableOpacity>


                </LinearGradient>

            </SafeAreaView >
        );
    }
}


const styles = StyleSheet.create({
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    container: {
        height: "100%",
        width: '100%',
        backgroundColor: '#F7EFFA'
    },
    input: {
        flexDirection: "row",
        justifyContent: 'center',
        alignContent: "center",
        textAlign: 'center',
        width: '40%',
        height: 170,
        marginLeft: 20,
        marginRight: 20
    },
    background_style: {
        flex: 1,
        height: '100%',
        width: '100%'
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
        margin: 15,
        fontSize: 15,
        justifyContent: 'center'
    }
});

export default SelectCategory;