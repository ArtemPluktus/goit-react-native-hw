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
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { register } from "../redux/authSlice.js";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../config.js';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const RegistrationScreen = () => {

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showPassText, setShowPassText] = useState("Показати");
  const [loginFocused, setLoginFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [permission, setPermission] = useState(null);
  const [photoURL, setPhotoURL] = useState("");

  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const onImagePick = async () => {
    const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setPermission(status.status === "granted");

    if (status.status !== "granted") {
      Alert.alert("Помилка", "Дозвіл на доступ до медіатеки не надано.");
      return;
    };

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    setPhotoURL(result.assets[0].uri);
  };

  const onDeletePhoto = () => {
    setPhotoURL("");
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    setEmailValid(validateEmail(text));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onRegister = async () => {
    if (!displayName && !email && !password) {
      return Alert.alert("Помилка", "Заповніть форму цілком");
    };

    if (!isEmailValid) {
      return Alert.alert("Помилка", "Введіть коректну адресу електронної пошти");
    };

    if(password.length < 6){
      return Alert.alert("Помилка", "Пароль меє містити від 6ти символів");
    };

    console.log(`Photo: ${photoURL}; Login: "${displayName}"; Email: "${email}"; Password "${password}"`);

    // createUserWithEmailAndPassword(auth, email, password).then( async (response) => { 

    //     const uid = response.user.uid;

    //     const userObj = {
    //       uid: uid,
    //       displayName: displayName,
    //       photoURL: photoURL.substring(photoURL.lastIndexOf('/') + 1),
    //       email: email,
    //       posts: [],
    //     };
      
    //     dispatch(register({ displayName: displayName, photoURL: photoURL.substring(photoURL.lastIndexOf('/') + 1), email: email, uid: uid, posts: [] }));

    //     setDoc(doc(db, "users", uid), userObj);
    //   }).catch(console.log);
    try{
      const res = await createUserWithEmailAndPassword(auth, email, password);
  
      const storageRef = ref(storage, displayName);
  
      await uploadBytesResumable(storageRef, photoURL).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
              posts: [],
            });
            dispatch(register({ displayName: displayName, photoURL: downloadURL, email: email, uid: res.user.uid, posts: [] }));
          });
        }
      );      
    } catch(error){
      console.log(error);
    };
    

    navigation.navigate("Home");


    setDisplayName("");
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
            {photoURL ? (
              <TouchableOpacity onPress={() => onDeletePhoto()}>
                <Image source={{ uri: photoURL }} style={styles.photo} />

                <Image
                  source={require("../assets/img/cross.png")}
                  style={styles.photoCross}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.photo}
                onPress={() => onImagePick()}
              >
                <Image
                  source={require("../assets/img/plus.png")}
                  style={styles.photoPlus}
                />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.text}>Реєстрація</Text>

          <View>
            <KeyboardAvoidingView
              style={styles.form}
              behavior={Platform.OS !== "ios" ? "padding" : "height"}
            >
              <TextInput
                type="text"
                placeholder="Логін"
                required
                style={[
                  styles.formItem,
                  loginFocused ? styles.formItemFocused : null,
                ]}
                value={displayName}
                onChangeText={setDisplayName}
                onFocus={() => setLoginFocused(true)}
                onBlur={() => setLoginFocused(false)}
              />
              <TextInput
                type="email"
                placeholder="Адреса електронної пошти"
                required
                style={[
                  styles.formItem,
                  emailFocused ? styles.formItemFocused : null,
                ]}
                value={email} 
                onChangeText={handleEmailChange}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
              <TextInput
                type="password"
                placeholder="Пароль"
                required
                style={[
                  styles.formItem,
                  passwordFocused ? styles.formItemFocused : null,
                ]}
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
          <TouchableOpacity
            style={styles.nav}
            onPress={() => navigation.navigate("Login")}
          >
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
  photoCross: {
    width: 35,
    height: 35,
    position: "absolute",
    bottom: -50,
    right: '31%'
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
    backgroundColor: "#fff",
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
    top: "55%",
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
