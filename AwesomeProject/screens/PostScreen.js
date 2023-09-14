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

export const PostScreen = () => {
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
                <Image source={require("../assets/img/back.png")} style={styles.back} onProgress={() => navigation.navigate("Home")} />
                <Text style={styles.title}>Створити публікацію</Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 80,
        padding: 10,
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        position: 'fixed'
    },
    title: {
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