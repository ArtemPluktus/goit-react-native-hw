import React, { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from '@react-navigation/native';

export const RegistrationScreen = () => {

    const navigation = useNavigation();

    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [showPassText, setShowPassText] = useState("Показати");
    const [loginFocused, setLoginFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const [fontsLoaded] = useFonts({
        "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
        "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    const onRegister = () => {
        if (!login ?? !email ?? !password) {
            return Alert.alert("Заповніть форму цілком");
        }

        console.log(`Login: "${login}"; Email: "${email}"; Password "${password}"`);
        navigation.navigate("Home");
        setLogin("");
        setEmail("");
        setPassword("");
        setShowPassword(true);
        setShowPassText("Показати");
    };

    const showPass = () => {
        setShowPassword(!showPassword);
        setShowPassText(!showPassword ? "Показати" : "Скрити");
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Image source={require("../assets/img/bg.jpg")} style={styles.image} />
                <View style={styles.register}>
                    <View>
                        <TouchableOpacity style={styles.photo}>
                            <Image
                                source={require("../assets/img/plus.png")}
                                style={styles.photoPlus}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.text}>Реєстрація</Text>

                    <View>
                        <KeyboardAvoidingView
                            style={styles.form}
                            behavior={Platform.OS == "ios" ? "padding" : "height"}
                        >
                            <TextInput
                                type="text"
                                placeholder="Логін"
                                required
                                style={[styles.formItem, loginFocused ? styles.formItemFocused : null]}
                                value={login}
                                onChangeText={setLogin}
                                onFocus={() => setLoginFocused(true)}
                                onBlur={() => setLoginFocused(false)}
                            />
                            <TextInput
                                type="email"
                                placeholder="Адреса електронної пошти"
                                required
                                style={[styles.formItem, emailFocused ? styles.formItemFocused : null]}
                                value={email}
                                onChangeText={setEmail}
                                onFocus={() => setEmailFocused(true)}
                                onBlur={() => setEmailFocused(false)}
                            />
                            <TextInput
                                type="password"
                                placeholder="Пароль"
                                required
                                style={[styles.formItem, passwordFocused ? styles.formItemFocused : null]}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={showPassword}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                            />
                            <TouchableOpacity style={styles.showPass} onPress={showPass}>
                                <Text style={styles.showPassText}>{showPassText}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.formBtn} onPress={onRegister}>
                                <Text style={styles.formBtnText}>Зареєстуватися</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </View>
                    <TouchableOpacity style={styles.nav} onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.navText}>Вже є акаунт? Увійти</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
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
        height: "75%",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignSelf: "center",
        position: "absolute",
        bottom: 0,
    },
    photo: {
        width: 120,
        height: 120,
        backgroundColor: "#F6F6F6",
        borderRadius: 16,
        position: "absolute",
        top: -60,
        right: 135,
    },
    photoPlus: {
        width: 25,
        height: 25,
        position: "absolute",
        bottom: 14,
        left: 107,
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
    formItemFocused: {
        backgroundColor: '#fff',
        borderColor: "#FF6C00",
    },
    formBtn: {
        width: "100%",
        paddingVertical: 16,
        paddingHorizontal: 111.5,
        backgroundColor: "#FF6C00",
        borderRadius: 100,
        marginTop: 27,
        textAlign: "center",
    },
    formBtnText: {
        fontSize: 16,
        fontFamily: "Roboto-Regular",
        color: "#fff",
    },
    showPass: {
        position: "absolute",
        top: 176,
        right: 16,
    },
    showPassText: {
        fontSize: 16,
        color: "#1B4371",
        fontFamily: "Roboto-Regular",
        fontStyle: "normal",
    },
    nav: {
        marginTop: 16,
    },
    navText: {
        textAlign: "center",
        fontSize: 16,
        color: "#1B4371",
        fontFamily: "Roboto-Regular",
    },
});
