// app/Profile.tsx

import * as lessonEndpoints from '@/helpers/lessonEndpoints';
import * as resultEndpoints from '@/helpers/resultEndpoints';
import * as sectionEndpoints from '@/helpers/sectionEndpoints';
import * as unitEndpoints from '@/helpers/unitEndpoints';
import * as accountEndpoints from '@/helpers/accountEndpoints';
import * as gamificationEndpoints from '@/helpers/gamificationEndpoints';

import {
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {AuthContext} from '@/context/AuthContext';
import {LoadingIndicator} from '@/components/LoadingIndicator';
import SectionCard from '@/components/SectionCard';
import {router} from 'expo-router';
import {useContext} from 'react';

const ProfilePage: React.FC = () => {

    const {currentUser, isLoading} = useContext(AuthContext);
    const [allSectionDetails, setAllSectionDetails] = useState<any[]>([]);
    const [userDetails, setUserDetails] = useState<any>();
    const [badges, setBadges] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const sectionDetails = await sectionEndpoints.getAllSectionDetails();
                const userDetails = await accountEndpoints.getUserDetails(currentUser.sub);
                const badges = await gamificationEndpoints.getBadges(currentUser.sub);

                console.log('sectionDetails:', sectionDetails);
                console.log('userDetails:', userDetails);
                console.log('badges:', badges);

                setAllSectionDetails(sectionDetails);
                setUserDetails(userDetails);
                setBadges(badges);
            } catch (error) {
                console.error('Error fetching Section details:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, [])

    if (isLoading) {
        return <LoadingIndicator />;
    }

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
                <Text>Profile Screen</Text>
            </View>
        </ScrollView>
    );

};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
});

export default ProfilePage;
