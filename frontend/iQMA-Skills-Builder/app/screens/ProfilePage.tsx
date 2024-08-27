// app/Profile.tsx

import {StyleSheet, Text, View} from 'react-native';

import React from 'react';

const ProfilePage: React.FC = () => (
    <View style={styles.container}>
        <Text>Profile Screen</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProfilePage;
