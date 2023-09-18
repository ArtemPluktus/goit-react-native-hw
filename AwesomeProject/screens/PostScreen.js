import React, { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

export const PostScreen = () => {
    const navigation = useNavigation();

    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [permission, setPermission] = useState(null);
    const [photo, setPhoto] = useState("");

    const [fontsLoaded] = useFonts({
        "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
        "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    };

    const onImagePick = async () => {
        const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setPermission(status.status === 'granted');
    
        if(permission == false){
            return;
        }
    
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });
    
        setPhoto(result.assets[0].uri);
      };
    
      const onDeletePhoto = () => {
        setPhoto("");
      };

    const onPost = () => {
        console.log(`Photo: ${photo}, Description: ${description}, Location: ${location}`);
        setDescription("");
        setLocation("");
        navigation.navigate("Home");
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <Image source={require("../assets/img/back.png")} />
                    </TouchableOpacity>

                    <Text style={styles.title}>Створити публікацію</Text>
                </View>
                <View>
                    <KeyboardAvoidingView style={styles.form} behavior={Platform.OS !== "ios" ? "padding" : "height"} >
                        <View style={styles.postPhoto}>
                        {photo ? (
                <Image style={styles.photoPlace} source={{uri: photo}} />
              ) : (
                <TouchableOpacity
                  style={styles.photoPlace}
                  onPress={() => onImagePick()}
                >
                  <Image
                    source={require("../assets/img/postPhoto.png")}
                    style={styles.photoImg}
                  />
                </TouchableOpacity>
              )}
                            <TouchableOpacity style={styles.delete}>
                                <Text style={styles.deleteText}>Видалити фото</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput type="text"
                            placeholder="Опис"
                            required style={styles.textInput}
                            value={description}
                            onChangeText={setDescription} />
                        <TextInput type="text"
                            placeholder="Місцевість"
                            required style={styles.textInput}
                            value={location}
                            onChangeText={setLocation} />
                        <TouchableOpacity style={styles.formBtn} onPress={onPost}>
                            <Text style={styles.formBtnText}>Опублікувати</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 80,
        padding: 10,
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        marginTop: 30,
    },
    title: {
        fontSize: 16,
        fontFamily: "Roboto-Medium",
    },
    form: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
    },
    postPhoto: {
        width: '100%',
        display: 'flex',
        flexDirection: "column",
        gap: 8,
        marginBottom: 16,
    },
    photoPlace: {
        height: 240,
        backgroundColor: "#E8E8E8",
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    deleteText: {
        fontSize: 16,
        fontFamily: "Roboto-Regular",
    },
    textInput: {
        width: "100%",
        fontFamily: "Roboto-Regular",
        color: "#000",
        fontSize: 16,
        padding: 16,
        borderBottomWidth: 2,
        borderBottomColor: "#E8E8E8",
    },
    formBtn: {
        width: "100%",
        paddingVertical: 16,
        paddingHorizontal: 120,
        backgroundColor: "#FF6C00",
        borderRadius: 100,
        marginTop: 16,
    },
    formBtnText: {
        fontSize: 16,
        fontFamily: "Roboto-Regular",
        color: "#fff",
        textAlign: "center",
    },
});
