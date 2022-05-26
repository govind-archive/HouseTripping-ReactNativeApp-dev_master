import React, { useState } from 'react';
import { filter } from 'lodash';
import { StyleSheet, FlatList, Text, View, Image, SafeAreaView, TouchableOpacity, TextInput, StatusBar, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import apiDetails from '../api/AllApis';

function Mobile_code({ navigation }) {

    const [data, setData] = useState([]);
    const [dataTempApi, setDataTempApi] = useState([]);
    const [apiCheck, setApiCheck] = useState(0);

    let contains = (name, query) => {
        const name_ = name.country_name;
        const code_ = name.phone_code;
        // console.log(query);
        // console.log(name_.includes(query));
        if (name_.toLowerCase().includes(query) || code_.includes(query)) {
            return true
        }
        return false
    }

    let handleSearch = (text) => {
        const formattedQuery = text.toLowerCase()
        const datas = filter(dataTempApi, user => {
            return contains(user, formattedQuery)
        })
        setData(datas)
        // console.log(datas);
    }

    const apiCall = () => {
        const a = new apiDetails();
        a.api
            .get(a.mobileCodes)
            .then(response => {
                if (response.status == "200") {
                    let data_temp = [];
                    for (var i in response.data.data) {
                        response.data.data[i]["phone_code"] = response.data.data[i]["Phone Code"];
                        data_temp.push(response.data.data[i]);
                    }
                    setApiCheck(1);
                    setData(data_temp);
                    setDataTempApi(data_temp);
                } else {
                    console.log(response);
                    alert('Oops something went wrong');
                }
            })
    }
    if (apiCheck == 0) {
        apiCall();
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                translucent
                backgroundColor="transparent"
                barStyle={"light-content"} />

            <View style={styles.customHeader}>
                <LinearGradient
                    colors={['#CE72F6', '#9C71FE', '#7572FF']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{ flexDirection: 'row', height: "100%" }}
                >
                    <TouchableOpacity style={{ marginTop: "5%" }} onPress={() => {
                        navigation.navigate({
                            name: 'SignUp_mobile',
                            merge: true,
                        })
                    }}>
                        <Image style={{ width: 20, height: 20, margin: 20, marginLeft: 30, tintColor: '#FFF' }} source={require('../assets/images/back.png')} />
                    </TouchableOpacity>

                    <TextInput
                        style={{ color: '#FFF', fontSize: 18, marginTop: "5%" }}
                        placeholderTextColor="#FFF"
                        onChangeText={handleSearch}
                        placeholder="Search..."
                    />
                </LinearGradient>
            </View>

            <FlatList
                data={data}
                extraData={data}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[styles.input, { justifyContent: 'space-between' }]} onPress={() => {
                        navigation.navigate({
                            name: 'SignUp_mobile',
                            params: { post: item },
                            merge: true,
                        })
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={{ width: 40, height: 40, marginRight: 15 }} source={require('../assets/images/spain.png')} />
                            <Text style={{ alignSelf: 'center', fontSize: 15, color: '#272D37' }}>{item.country_name}</Text>
                        </View>
                        <Text style={{ alignSelf: 'center', fontSize: 15, color: '#272D37' }}>+{item.phone_code}</Text>
                    </TouchableOpacity>
                )}

                keyExtractor={(item, index) => index.toString()}
            />

        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: '100%',
        backgroundColor: '#F7EFFA',
    },
    input: {
        flexDirection: "row",
        backgroundColor: "#FFF",
        justifyContent: 'center',
        alignContent: "center",
        textAlign: 'center',
        padding: 15,
        marginTop: 10,
        borderRadius: 15,
        marginLeft: 30,
        marginRight: 30,
        // shadowColor: '#C2C2C2',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.5,
        // shadowRadius: 2,
        // elevation: 1,
    },
    customHeader: { 

        ...Platform.select({
            ios: {
                height: "11%"
            },
            android: {
                height: "11%",
                marginTop: 0
            },
            default: {
                height: "11%"
            }
        })
    }
});

export default Mobile_code;