import {Animated, StyleSheet, Text} from 'react-native';
import React, {useEffect, useRef} from 'react';

export const LogoVisual = () => {
    const scaleValue = useRef(new Animated.Value(0.8)).current; // Initial scale set to 0.5 (half the size)

    useEffect(() => {
        Animated.timing(scaleValue, {
            toValue: 1, // Scale to full size
            duration: 2000, // Animation duration (in milliseconds)
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View
            style={[styles.container, {transform: [{scale: scaleValue}]}]}
        >
            <Animated.Image
                source={require('../assets/images/logo_removebg.png')}
                style={[styles.logo]} // Apply scale transform
            />
            {/* <Text style={{color: "black", fontWeight: "bold", marginTop: 10, fontSize: 20}}>iQMA Skills Builder</Text> */}
            <Text style={styles.text}>Leadership Skills For A New Self</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
    logo: {
        width: 160,
        height: 160,
        resizeMode: 'contain',
    },
    text: {
        fontSize: 15,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
        marginTop: 10
    },
});
