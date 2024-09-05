import {Image, StyleSheet, Text, View} from 'react-native';
import SectionCard from '@/components/SectionCard';
import React, {useState, useLayoutEffect} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import {CustomButton} from '@/components/CustomButton';
import {router} from 'expo-router';
import {useNavigation} from '@react-navigation/native';
import ProgressBar from '@/components/ProgressBar';
import {OverviewCard} from '@/components/OverviewCard';

// where things show up
export default function SectionIntroduction() {
    const navigation = useNavigation();

    const [unitName, setUnitName] = useState<string>(
        '🎉 Get ready to dive into the exciting world of communication!'
    );
    const [unitDescription, setUnitDescription] = useState<string>(
        "📚 Let's decode the mysteries of verbal and non-verbal signals, uncover the secrets of various communication styles, and embark on a journey through behavioral insights concepts to unlock the power of effective communication! 🚀 "
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <ProgressBar progress={0.25} isQuestionnaire={false} />
            ),
        });
    }, [navigation]);

    const handlePress = () => {
        router.push('Lesson');
    };

    return (
        <View style={styles.container}>
            <View>
                <SectionCard
                    title="SECTION 1, UNIT 1"
                    subtitle="Foundations of Communication"
                />
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#4143A3',
                        marginBottom: 20,
                        marginHorizontal: 10,
                    }}
                >
                    Unit 1: Introduction
                </Text>

                <OverviewCard text={unitName}></OverviewCard>
                <OverviewCard text={unitDescription}></OverviewCard>

                <View style={{width: "100%", flexDirection: 'row-reverse'}}>
                    <Image
                        style={{}}
                        source={require('@/assets/images/neutral.png')}
                    ></Image>
                </View>
            </View>

            <View
                style={{
                    alignSelf: 'center',
                    bottom: 20,
                }}
            >
                <CustomButton
                    label="continue"
                    backgroundColor="white"
                    onPressHandler={handlePress}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        flex: 1,
        justifyContent: 'space-between',
    },
});
