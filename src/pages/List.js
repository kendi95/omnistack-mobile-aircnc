import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Image, AsyncStorage, StyleSheet, ScrollView, Alert } from 'react-native';

import socketClient from 'socket.io-client';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List() {

    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem("user").then(user_id => {
            const socket = socketClient('http://192.168.0.106:3030', {
                query: { user_id }
            });

            socket.on('booking_response', booking => {
                Alert.alert(
                    "Aviso de solicitação de reserva",
                    `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'Aprovado' : 'Rejeitado'}`,
                    [
                        {
                            text: 'OK'
                        }
                    ]
                );
            })
        });

    }, []);

    useEffect(() => {
        AsyncStorage.getItem("techs").then(storage => {
            const techsArray = storage.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        })
    }, []);

    return (
        <SafeAreaView style={styles}>
            <Image source={logo} style={styles.logo}></Image>

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1

    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 48,
    }
});