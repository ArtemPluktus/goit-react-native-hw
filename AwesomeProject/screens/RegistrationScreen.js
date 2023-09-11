import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";

export const RegistrationScreen = () => {
    const [fontsLoaded] = useFonts({
        "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
        "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Image source={require("../assets/img/bg.jpg")} style={styles.image} />
            <View style={styles.register}>
                <View>
                    <TouchableOpacity style={styles.photo}>
                        <Image source={require('../assets/img/plus.png')} style={styles.photoPlus} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>Реєстрація</Text>

                <View style={styles.form}>
                    <TextInput placeholder="Логін" style={styles.formItem} />
                    <TextInput
                        placeholder="Адреса електронної пошти"
                        style={styles.formItem}
                    />
                    <TextInput placeholder="Пароль" style={styles.formItem} />
                    <TouchableOpacity style={styles.showPass}>
                        <Text style={styles.showPassText}>Показати</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.formBtn}>
                        <Text style={styles.formBtnText}>Зареєстуватися</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.nav}>
                    <Text style={styles.navText}>Вже є акаунт? Увійти</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    image: {
        flex: 1,
        justifyContent: "center",
        resizeMode: "cover",
        width: "100%",
        height: "100%",
        position: "absolute",
    },
    register: {
        backgroundColor: "#fff",
        width: "100%",
        height: "69%",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignSelf: "center",
        position: "absolute",
        bottom: 0,
    },
    photo: {
        width: 120,
        height: 120,
        backgroundColor: '#F6F6F6',
        borderRadius: 16,
        position: 'absolute',
        top: -60,
        right: 135,
    },
    photoPlus: {
        width: 25,
        height: 25,
        position: 'absolute',
        bottom: 14,
        left: 107
    },
    text: {
        fontFamily: "Roboto-Medium",
        fontSize: 30,
        textAlign: "center",
        marginTop: 92,
    },
    form: {
        marginTop: 32,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        marginHorizontal: 16,
    },
    formItem: {
        width: "100%",
        fontFamily: "Roboto-Regular",
        color: "#000",
        fontSize: 16,
        backgroundColor: "#F6F6F6",
        padding: 16,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderRadius: 5,
    },
    formBtn: {
        width: "100%",
        paddingVertical: 16,
        paddingHorizontal: 111.5,
        backgroundColor: '#FF6C00',
        borderRadius: 100,
        marginTop: 27,
        textAlign: 'center'
    },
    formBtnText: {
        fontSize: 16,
        fontFamily: "Roboto-Regular",
        color: "#fff",
    },
    showPass: {
        position: 'absolute',
        top: 176,
        right: 16,
    },
    showPassText: {
        fontSize: 16,
        color: '#1B4371',
        fontFamily: "Roboto-Regular",
        fontStyle: 'normal'
    },
    nav: {
        marginTop: 16
    },
    navText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#1B4371',
        fontFamily: "Roboto-Regular",
    }
});
