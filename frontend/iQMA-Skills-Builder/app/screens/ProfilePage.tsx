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
import React, {useCallback, useEffect, useRef, useState} from 'react';

import {AuthContext} from '@/context/AuthContext';
import {LoadingIndicator} from '@/components/LoadingIndicator';
import SectionCard from '@/components/SectionCard';
import SectionProfile from '@/components/SectionProfile';
import ProfileCard from '@/components/ProfileCard';
import {router, useFocusEffect} from 'expo-router';
import {useContext} from 'react';
import { Achievements } from '@/components/Achievement';
import CertificationsList from '@/components/Certification';

const ProfilePage: React.FC = () => {

    const {currentUser, isLoading} = useContext(AuthContext);
    const [allSectionDetails, setAllSectionDetails] = useState<any[]>([]);
    const [userDetails, setUserDetails] = useState<any>();
    const [badges, setBadges] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProfileData = async () => {
        
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
    }

    useEffect(() => {
        setLoading(true);
        fetchProfileData();
    }, [])

    // Fetch data when navigating back
    useFocusEffect(
        useCallback(() => {
            fetchProfileData();
        }, [])
    );


    if (isLoading || !userDetails) {
        return <LoadingIndicator />;
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.container}>
                <ProfileCard userDetails={userDetails}/>

                <Achievements achievements={badges}/>
                <CertificationsList/>
                
                {allSectionDetails.length > 0 ? (
                    allSectionDetails.map((sectionDetail, index) => (
                        <View key={index}>
                            <SectionProfile
                                sectionID={sectionDetail.sectionID}
                                sectionName={sectionDetail.sectionName}
                                sectionDuration={sectionDetail.sectionDuration}
                            />
                        </View>
                    ))
                ) : (
                    <Text>No sections available</Text>
                )}

            </View>
        </ScrollView>
    );

};

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        backgroundColor: '#fff', // Ensure background color is white
    },
    container: {
    
        backgroundColor: '#fff', // Container also white
    },
});

export default ProfilePage;
