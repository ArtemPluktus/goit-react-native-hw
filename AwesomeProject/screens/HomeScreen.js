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
import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, storage } from '../config.js';
import { logIn, logOut } from "../redux/authSlice.js";
import { useDispatch } from "react-redux";
import { collection, getDocs, doc, query, where, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from "firebase/storage";
import { TypingAnimation } from 'react-native-typing-animation';


export const HomeScreen = () => {

    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");

    const [posts, setPosts] = useState([]);

    const isFocused = useIsFocused();

    // useEffect(() => {
    // onAuthStateChanged(auth, async (user) => {
    //     setName(user.displayName);
    //     setPhoto(user.photoURL);
    //     const q = query(collection(db, 'usersPosts'), where("displayName", "==", user.displayName));
    //     const querySnapshot = await getDocs(q);
    //     const newPosts = querySnapshot.docs.map((doc) => {
    //         const data = doc.data();
    //         return {
    //             photo: data.photoURL,
    //             description: data.description,
    //             id: data.id,
    //         };
    //     });

    //     setPosts(newPosts);
    // });

    // }, []);

    useEffect(() => {
        if (isFocused) {
            fetchData();
        }
    }, [isFocused]);



    async function fetchData() {
        onAuthStateChanged(auth, async (user) => {
            setName(user.displayName);
            setPhoto(user.photoURL);
            const q = query(collection(db, 'usersPosts'), where("displayName", "==", user.displayName));
            const querySnapshot = await getDocs(q);
            const newPosts = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    photo: data.photoURL,
                    description: data.description,
                    id: data.id,
                };
            });

            setPosts(newPosts);
        });
    }


    const navigation = useNavigation();



    const [fontsLoaded] = useFonts({
        "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
        "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    };



    const onLogOut = async () => {
        try {
            await auth().signOut();
        } catch (error) {
            console.log(error);
        }
        dispatch(logOut());
        navigation.navigate("Login");
    };

    onDelete = async (id) => {
        await deleteDoc(doc(db, "usersPosts", id));
        const deleteRef = ref(storage, id);

        deleteObject(deleteRef);

        fetchData();
    };

    return (
        <View style={styles.homepage}>
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
                    {posts.map((post, index) => {
                        return (
                            <View key={index} style={styles.contentPost}>
                                <Image source={{ uri: post.photo }} style={styles.contentImg} />
                                <View style={styles.description}>
                                    <Text style={styles.contentText}>{post.description}</Text>
                                    <TouchableOpacity onPress={() => onDelete(post.id)}>
                                        <Image source={require('../assets/img/delete.png')} style={styles.delete} />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        );
                    })}
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.post} onPress={() => {
                navigation.navigate("Post");
            }}>
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
        width: 70,
        paddingVertical: 15,
        paddingHorizontal: 35,
        backgroundColor: "#FF6C00",
        borderRadius: 20,
        position: 'absolute',
        bottom: 20,
        left: '50%',
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
        marginBottom: 150,
    },
    contentPost: {
        display: 'flex',
        flexDirection: "column",
        gap: 16,
    },
    contentImg: {
        width: '100%',
        height: 240,
        borderRadius: 8,
    },
    description: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    delete: {
        width: 40,
        height: 40,
    },
    contentText: {
        fontSize: 20,
        fontFamily: "Roboto-Medium",
        marginLeft: 5,
        width: '85%',
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