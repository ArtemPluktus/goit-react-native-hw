import React, { useState, useEffect } from "react";
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
import { collection, getDocs, doc, query, where, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, storage } from '../config.js';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { TypingAnimation } from 'react-native-typing-animation';

export const PostScreen = () => {
    const navigation = useNavigation();

    const [description, setDescription] = useState("");
    const [permission, setPermission] = useState(null);
    const [photoURL, setPhotoURL] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [postPhoto, setPostPhoto] = useState("");
    const [uid, setUid] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            setDisplayName(user.displayName);
            setPhotoURL(user.photoURL);
            setUid(user.uid);
            setEmail(user.email);
            await getData(user.displayName);
        });

    }, []);

    async function getData(name) {
        const q = query(collection(db, 'users'), where("displayName", "==", name));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc => {
            const data = doc.data();
            console.log(data);
        }));
    };



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

        if (permission == false) {
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        setPostPhoto(result.assets[0].uri);
    };

    const onDeletePhoto = () => {
        setPostPhoto("");
    };

    const onPost = async () => {
        console.log(`Photo: ${postPhoto}, Description: ${description}`);

        setLoading(true);
        try {
            const response = await fetch(postPhoto);

            const blob = await response.blob();

            const date = new Date();

            const storageRef = ref(storage, `${displayName} ${date}`);

            const uploadTask = uploadBytesResumable(storageRef, blob);

            uploadTask.on("state_changed", (snapshot) => {
                const proress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Progress", proress);
            }, (error) => {
                console.log(error);
            },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await setDoc(doc(db, "usersPosts", `${displayName} ${date}`), {
                            displayName,
                            photoURL: downloadURL,
                            description,
                            id: `${displayName} ${date}`,
                        });
                        await navigation.navigate("Home");

                        await setLoading(false);
                    });
                }
            );
        } catch (error) {
            console.log(error);
        };



        setPostPhoto("");
        setDescription("");
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
            /> : <View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.back}>
                        <Image source={require("../assets/img/back.png")} />
                    </TouchableOpacity>

                    <Text style={styles.title}>Create a publication</Text>
                </View>
                <View>
                    <KeyboardAvoidingView style={styles.form} behavior={Platform.OS === "ios" ? "padding" : "height"} >
                        <View style={styles.postPhoto}>
                            {postPhoto ? (
                                <Image style={styles.photoPlace} source={{ uri: postPhoto }} />
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
                            <TouchableOpacity style={styles.delete} onPress={onDeletePhoto}>
                                <Text style={styles.deleteText}>Delete photo</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput type="text"
                            placeholder="Description"
                            multiline
                            required style={styles.textInput}
                            value={description}
                            onChangeText={setDescription} />
                        <TouchableOpacity style={styles.formBtn} onPress={onPost}>
                            <Text style={styles.formBtnText}>Publish</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
            </View>}

        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    loader: {
        marginTop: "95%",
        marginLeft: 'auto',
        marginRight: "57%",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        gap: 95,
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        marginTop: 30,
    },
    back: {
        marginLeft: '-30%'
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
