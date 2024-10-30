import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Image, StyleSheet, Animated } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { AuthContext } from '@/context/AuthContext';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import * as gamificationEndpoints from '@/helpers/gamificationEndpoints';
import { Colors } from '@/constants/Colors';
import { CustomButton } from '@/components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';

export default function Badge() {
    const navigation = useNavigation();
    const { currentUser } = useContext(AuthContext);
    const { sectionID, unitID, currentUnit, totalUnits, currentProgress, totalProgress } = useLocalSearchParams();
    const [unitName, setUnitName] = useState('');
    const [badgeUrl, setBadgeUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [showConfetti, setShowConfetti] = useState(false);
    const [scale] = useState(new Animated.Value(1)); // For scaling animation

    const fetchBadge = async (sectionID:string, unitID:string) => {
        try {
            const badge = await gamificationEndpoints.getBadge(sectionID, unitID);
            setUnitName(badge.unitName);
            setBadgeUrl(badge.badgeUrl);
            handleAnimation(); // Trigger scaling animation
        } catch (error) {
            console.error('Error fetching badge', error);
        } finally {
            setLoading(false);
            setShowConfetti(true); // Show confetti when badge is fetched
        }
    };

    useEffect(() => {
        if (sectionID && unitID) {
            fetchBadge(sectionID as string, unitID as string);
        }
    }, []);

    const handleAnimation = () => {
        Animated.spring(scale, {
            toValue: 1.2,
            friction: 3,
            useNativeDriver: true,
        }).start(() => {
            Animated.spring(scale, {
                toValue: 1,
                friction: 3,
                useNativeDriver: true,
            }).start();
        });
    };

    const handlePress = () => {
        router.push({
            pathname: 'Streak',
            params: {
                sectionID,
                unitID,
                currentUnit,
                totalUnits,
                currentProgress: (parseInt(currentProgress as string)).toString(),
                totalProgress,
            },
        });
    };

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <View style={styles.container}>
            {showConfetti && <ConfettiCannon count={100} origin={{ x: -10, y: 0 }} />}
            <View style={styles.insideContainer}>
                <Animated.View style={{ transform: [{ scale }] }}>
                    <Image source={{ uri: badgeUrl }} style={styles.imageStyle} />
                </Animated.View>
                <Text style={styles.badgeText}>You have obtained your {unitName} Badge!</Text>
                <Text style={styles.bottomText}>Visit your profile to see your new badge!</Text>
            </View>
            <CustomButton
                label="Continue"
                backgroundColor="white"
                onPressHandler={handlePress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.background,
        padding: 10,
        flex: 1,
    },
    insideContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    imageStyle: {
        width: 100,
        height: 100,
        marginBottom: 50,
    },
    badgeText: {
        color: '#4143A3',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },
    bottomText: {
        color: '#4143A3',
        fontWeight: 'light',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 10,
    },
});
