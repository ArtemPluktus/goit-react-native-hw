import React, { useState, useEffect } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config.js';
import { logOut } from "../redux/authSlice.js";
import { useDispatch } from "react-redux";

export const HomeScreen = () => {

    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setName(user.displayName);
            setPhoto(user.photoURL);
        });
    }, []);

    const navigation = useNavigation();



    const [fontsLoaded] = useFonts({
        "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
        "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    };



    const onLogOut = () => {
        dispatch(logOut());
        navigation.navigate("Login");
    };

    return (
        <View>
            <View style={styles.header}>
                <View style={styles.account}>
                    <Image source={{ uri: photo }} style={styles.avatar} />
                    <Text style={styles.name}>{name}</Text>
                </View>
                <TouchableOpacity style={styles.logout} onPress={onLogOut}>
                    <Image source={require("../assets/img/LogOut.png")} />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.content}>
                    <View style={styles.contentPost}>
                        <View style={styles.contentImg} />
                        <Text style={styles.contentText}>Опис</Text>
                        <View style={styles.location}>
                            <Image source={require("../assets/img/map.png")} style={styles.locationImg} />
                            <Text style={styles.locatinText}>Місцезнаходження</Text>
                        </View>

                    </View>
                    <View style={styles.contentPost}>
                        <View style={styles.contentImg} />
                        <Text style={styles.contentText}>Опис</Text>
                        <View style={styles.location}>
                            <Image source={require("../assets/img/map.png")} style={styles.locationImg} />
                            <Text style={styles.locatinText}>Місцезнаходження</Text>
                        </View>

                    </View>
                    <View style={styles.contentPost}>
                        <View style={styles.contentImg} />
                        <Text style={styles.contentText}>Опис</Text>
                        <View style={styles.location}>
                            <Image source={require("../assets/img/map.png")} style={styles.locationImg} />
                            <Text style={styles.locatinText}>Місцезнаходження</Text>
                        </View>

                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.post} onPress={() => navigation.navigate("Post")}>
                <Image source={require('../assets/img/post.png')} style={styles.postImg} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        position: 'fixed',
        marginTop: 30,
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
    avatar: {
        width: 50,
        height: 50,
    },
    post: {
        width: 70, // Змініть це значення на бажаний розмір кнопки
        paddingVertical: 15,
        paddingHorizontal: 35,
        backgroundColor: "#FF6C00",
        borderRadius: 20,
        position: 'absolute',
        bottom: 20, // Змініть це значення, щоб розташувати кнопку на бажаній позиції
        left: '50%', // Змініть це значення на '50%', щоб розташувати кнопку по центру горизонтально
        marginLeft: -35,
        marginBottom: 100,
    },
    postImg: {
        left: -7.5,
        width: 15,
        height: 15,
    },
    content: {
        paddingHorizontal: 16,
        paddingVertical: 32,
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        marginBottom: 140,
    },
    contentPost: {
        display: 'flex',
        flexDirection: "column",
        gap: 16,
    },
    contentImg: {
        width: '100%',
        height: 240,
        backgroundColor: 'green',
        borderRadius: 8,
    },
    contentText: {
        fontSize: 20,
        fontFamily: "Roboto-Medium"
    },
    location: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
    },
    locationImg: {
        width: 24,
        height: 24,
    },
    locatinText: {
        fontSize: 16,
        fontFamily: "Roboto-Medium"
    }
})