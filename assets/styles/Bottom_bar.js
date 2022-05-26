import React, { useState } from 'react'
import { StyleSheet,  View, Image } from 'react-native';
import Tabbar from "@mindinventory/react-native-tab-bar-interaction";

const activeHome = (isPlay) => {
    return (
        <View style={{ width: 20, height: 20 }}>
            <Image style={{ width: 20, height: 20 }} source={require(`../assets/images/home_bottom.png`)} />
        </View>
    )
}

const activeList = (isPlay) => {
    return (
        <View style={{ width: 20, height: 20 }}>
            <Image style={{ width: 20, height: 20 }} source={require(`../assets/images/music_bottom.png`)} />
        </View>
    )
}

const activeCamera = (isPlay) => {
    return (
        <View style={{ width: 25, height: 25 }}>
            <Image style={{ width: 25, height: 25 }} source={require(`../assets/images/mike_bottom.png`)} />
        </View>
    )
}

const activeNotification = (isPlay) => {
    return (
        <View style={{ width: 20, height: 20 }}>
            <Image style={{ width: 20, height: 20 }} source={require(`../assets/images/profile_bottom.png`)} />
        </View>
    )
}

const activeUser = (isPlay) => {
    return (
        <View style={{ width: 20, height: 20 }}>
            <Image style={{ width: 20, height: 20 }} source={require(`../assets/images/bell.png`)} />
        </View>
    )
}

const tabData = [
    {
        name: 'Home',
        activeIcon: activeHome(true),
        inactiveIcon: (<View style={{ width: 20, height: 20 }}>
            <Image style={{ width: 20, height: 20 }} source={require(`../assets/images/home_bottom.png`)} />
        </View>)

    },
    {
        name: 'Cart',
        activeIcon: null,
        inactiveIcon: (<View style={{ width: 20, height: 20 }}>
            <Image style={{ width: 20, height: 20 }} source={require(`../assets/images/music_bottom.png`)} />
        </View>)
    },
    {
        name: 'Search',
        activeIcon: null,
        inactiveIcon: (<View style={{ width: 25, height: 25 }}>
            <Image style={{ width: 25, height: 25 }} source={require(`../assets/images/mike_bottom.png`)} />
        </View>)
    },

    {
        name: 'Profile',
        activeIcon: null,
        inactiveIcon: (<View style={{ width: 20, height: 20 }}>
            <Image style={{ width: 20, height: 20 }} source={require(`../assets/images/bell.png`)} />
        </View>)
    },
    {
        name: 'Setting',
        activeIcon: null,
        inactiveIcon: (<View style={{ width: 20, height: 20 }}>
            <Image style={{ width: 20, height: 20 }} source={require(`../assets/images/profile_bottom.png`)} />
        </View>)
    },
]


const Bottom_bar = () => {
    const [tabs, setTabs] = useState(tabData)
    const [bgColor, setBgColor] = useState('#FFC0C7')
    const [name, setName] = useState('Name')

    const onTabChange = (item) => {
        let tempTabs = [...tabs]

        setTimeout(() => {
            tempTabs.map((val) => {
                if (item.name === 'Home' && val.name === 'Home') {
                    val.activeIcon = Object.assign({}, activeHome(true))
                    setBgColor('#FFC0C7')
                    setName('Home')
                } else if (item.name === 'Cart' && val.name === 'Cart') {
                    val.activeIcon = Object.assign({}, activeList(true))
                    setBgColor('#FF7128')
                    setName('Cart')
                } else if (item.name === 'Search' && val.name === 'Search') {
                    val.activeIcon = Object.assign({}, activeCamera(true))
                    setBgColor('#0088cc')
                    setName('Search')
                } else if (item.name === 'Setting' && val.name === 'Setting') {
                    val.activeIcon = Object.assign({}, activeNotification(true))
                    setBgColor('#ff6666')
                    setName('Setting')
                } else if (item.name === 'Profile' && val.name === 'Profile') {
                    val.activeIcon = Object.assign({}, activeUser(true))
                    setBgColor('#66ff99')
                    setName('Profile')
                }
                else {
                    val.activeIcon = null
                }
            })

            setTabs(tempTabs)
        }, 500);
    }

    return (
        <Tabbar
            tabs={tabs}
            tabBarBackground={bgColor}
            labelStyle={{ color: '#4d4d4d', fontWeight: '600', fontSize: 11, display: 'none' }}
            onTabChange={(item) => onTabChange(item)}
        />
    ) 
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
})

export default Bottom_bar;