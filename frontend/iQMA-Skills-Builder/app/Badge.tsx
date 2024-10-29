import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import {useState, useContext, useEffect} from 'react';
import {AuthContext} from '@/context/AuthContext';
import {LoadingIndicator} from '@/components/LoadingIndicator';
import * as gamificationEndpoints from '@/helpers/gamificationEndpoints';
import {Colors} from '@/constants/Colors';
import {globalStyles} from '@/constants/styles';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';
import {CustomButton} from '@/components/CustomButton';

export default function Badge() {
    const navigation = useNavigation();
    const {currentUser} = useContext(AuthContext);
    const {
        sectionID,
        unitID,
        currentUnit,
        totalUnits,
        currentProgress,
        totalProgress,
    } = useLocalSearchParams();
    const [unitName, setUnitName] = useState<string>('');
    const [badgeUrl, setbadgeUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    // const sectionID = "SEC0001";
    // const unitID = "UNIT0001";

    const fetchBadge = async (sectionID: string, unitID: string) => {
        try {            
            const badge = await gamificationEndpoints.getBadge(
                sectionID, unitID
            );

            setUnitName(badge.unitName);
            setbadgeUrl(badge.badgeUrl);

            console.log(badge);
        } catch (error) {
            console.error('Error fetching badge', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (sectionID && unitID) {
            fetchBadge(sectionID as string, unitID as string);
        }
    }, []);

    const handlePress = async () => {
        router.push({
            pathname: 'Streak',
            params: {
                sectionID,
                unitID,
                currentUnit,
                totalUnits,
                currentProgress: (
                    parseInt(currentProgress as string)
                ).toString(),
                totalProgress,
            },
        });
    };

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.insideContainer}>
                <Text>Badges</Text>
                <Image
                    source={{uri: badgeUrl}}
                    style={{width: 100, height: 100}}
                />
                <Text>{unitName}</Text>
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
        padding: 20,
        flex: 1,
    },
    insideContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
