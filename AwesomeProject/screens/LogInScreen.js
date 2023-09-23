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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config.js';
import { logIn } from "../redux/authSlice.js";

export const LogInScreen = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [isEmailValid, setEmailValid] = useState(true);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [showPassText, setShowPassText] = useState("Показати");
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const [fontsLoaded] = useFonts({
        "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
        "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    };

    const handleEmailChange = (text) => {
        setEmail(text);
        setEmailValid(validateEmail(text));
      };
    
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const onLogIn = () => {
        if (!email ?? !password) {
            return Alert.alert("Помилка", "Заповніть форму цілком");
        };
        
        if (!isEmailValid) {
            return Alert.alert("Помилка", "Введіть коректну адресу електронної пошти");
        };

        console.log(`Email: "${email}"; Password "${password}"`);

        signInWithEmailAndPassword(auth, email, password).then(() => navigation.navigate("Home")).catch(() => {Alert.alert("Помилка", "Логін чи пароль невірні")});   

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
                <View style={styles.logIn}>
                    <Text style={styles.text}>Увійти</Text>

                    <View>
                        <KeyboardAvoidingView style={styles.form} behavior={Platform.OS !== "ios" ? "padding" : "height"}>
                            <TextInput
                                type="email"
                                placeholder="Адреса електронної пошти"
                                required
                                style={[styles.formItem, emailFocused ? styles.formItemFocused : null]}
                                value={email}
                                onChangeText={handleEmailChange}
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
                            <TouchableOpacity style={styles.formBtn} onPress={onLogIn}>
                                <Text style={styles.formBtnText}>Увійти</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </View>
                    <TouchableOpacity style={styles.nav} onPress={() => navigation.navigate("Registration")}>
                        <Text style={styles.navText}>Немає акаунту? Зареєструватися</Text>
                    </TouchableOpacity>


                </View>
            </View>
        </TouchableWithoutFeedback >
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
    logIn: {
        backgroundColor: "#fff",
        width: "100%",
        height: "60%",
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
        marginTop: 32,
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
    },
    formBtnText: {
        fontSize: 16,
        fontFamily: "Roboto-Regular",
        color: "#fff",
        textAlign: "center",
    },
    showPass: {
        position: "absolute",
        top: "40%",
        right: 16,
    },
    showPassText: {
        fontSize: 16,
        color: "#1B4371",
        fontFamily: "Roboto-Regular",
        fontStyle: "normal",
    },
    nav: {
        marginTop: 36,
    },
    navText: {
        textAlign: "center",
        fontSize: 16,
        color: "#1B4371",
        fontFamily: "Roboto-Regular",
    },
});
