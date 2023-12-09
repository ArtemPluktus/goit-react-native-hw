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
import { useDispatch } from "react-redux";
import { TypingAnimation } from 'react-native-typing-animation';

export const LogInScreen = () => {

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [isEmailValid, setEmailValid] = useState(true);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [showPassText, setShowPassText] = useState("Show");
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [loading, setLoading] = useState(false);

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
            return Alert.alert("Error", "Fill out the form completely");
        };

        if (!isEmailValid) {
            return Alert.alert("Error", "Please enter a valid email address");
        };

        console.log(`Email: "${email}"; Password "${password}"`);

        setLoading(true);

        signInWithEmailAndPassword(auth, email, password).then((response) => {
            console.log(response.user);
            dispatch(logIn({ displayName: response.user.displayName, photoURL: response.user.photoURL, email: response.user.email, uid: response.user.uid }));
            navigation.navigate("Home");
            setLoading(false);
        }).catch(() => { Alert.alert("Error", "Login or password is incorrect"); navigation.navigate("Login"); setLoading(false); });

        setEmail("");
        setPassword("");
        setShowPassword(true);
        setShowPassText("Show");
    };

    const showPass = () => {
        setShowPassword(!showPassword);
        setShowPassText(!showPassword ? "Show" : "Hide");
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {loading ? <TypingAnimation
                dotColor="black"
                dotMargin={70}
                dotAmplitude={10}
                dotSpeed={0.15}
                dotRadius={20}
                dotX={12}
                dotY={6}
                style={styles.loader}
            /> : <View style={styles.container}>
                <Image source={require("../assets/img/bg.jpg")} style={styles.image} />
                <View style={styles.logIn}>
                    <Text style={styles.textLogIN}>Log In</Text>

                    <View>
                        <KeyboardAvoidingView style={styles.form} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                            <TextInput
                                type="email"
                                placeholder="E-Mail"
                                required
                                style={[styles.formItem, emailFocused ? styles.formItemFocused : null]}
                                value={email}
                                onChangeText={handleEmailChange}
                                onFocus={() => setEmailFocused(true)}
                                onBlur={() => setEmailFocused(false)}
                            />
                            <TextInput
                                type="password"
                                placeholder="Password"
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
                                <Text style={styles.formBtnText}>Log In</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </View>
                    <TouchableOpacity style={styles.nav} onPress={() => navigation.navigate("Registration")}>
                        <Text style={styles.navText}>Don't have an account? Sign up</Text>
                    </TouchableOpacity>


                </View>
            </View>}

        </TouchableWithoutFeedback >
    );
};

const styles = StyleSheet.create({
    loader: {
        marginTop: "95%",
        marginLeft: 'auto',
        marginRight: "57%",
    },
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
    textLogIN: {
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
