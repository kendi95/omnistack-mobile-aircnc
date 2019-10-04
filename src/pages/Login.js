import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, AsyncStorage, Platform, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../servicies/api';
import logo from '../assets/logo.png';

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
        AsyncStorage.getItem("user").then(user => {
            if (user) {
                navigation.navigate('List');
            }
        })
    }, []);

    async function handleSubmit() {
        const response = await api.post("/sessions", {
            email
        })

        const { _id } = response.data;

        await AsyncStorage.setItem("user", _id);
        await AsyncStorage.setItem("techs", techs);

        navigation.navigate("List");
    }

    return (
        <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios' || 'android'} style={styles.container}>
            <Image source={logo}></Image>

            <View style={styles.form}>
                <Text style={styles.label}>Seu Email *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu Email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail} />

                <Text style={styles.label}>Tecnologia *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tecnologias de interesse"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs} />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Encontrar spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        alignItems: 'flex-start'
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});