import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
        "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
        "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    const onLogOut = () => {
        navigation.navigate("Login");
    }

    return (
        <View>
            <View style={styles.header}>
                <View style={styles.account}>
                    <Image source={require("../assets/favicon.png")} style={styles.avatar} />
                    <Text style={styles.name}>Name</Text>
                </View>
                <TouchableOpacity style={styles.logout} onPress={onLogOut}>
                    <Image source={require("../assets/img/LogOut.png")} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.post} onPress={() => navigation.navigate("Post")}>
                <Image source={require('../assets/img/post.png')} style={styles.postImg} />
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        position: 'fixed'
    },
    account: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 13,
    },
    name: {
        fontSize: 16,
        fontFamily: "Roboto-Medium",
    },
    post: {
        width: '0%',
        paddingVertical: 15,
        paddingHorizontal: 35,
        backgroundColor: "#FF6C00",
        borderRadius: 20,
        position: 'absolute',
        top: "1000%",
        left: '41%',
    },
    postImg: {
        left: -7.5,
        width: 15,
        height: 15,
    }
})