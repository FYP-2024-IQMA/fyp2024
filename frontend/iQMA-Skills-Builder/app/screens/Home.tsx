// app/Home.tsx

import {StyleSheet, Text, View} from 'react-native';

import React from 'react';

const HomeScreen: React.FC = () => (
    <View style={styles.container}>
        <Text>Home Screen</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
