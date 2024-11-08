import React, {useEffect, useState, useContext} from 'react';
import {Image, View, Text, ActivityIndicator, StyleSheet, ScrollView} from 'react-native';
import {getStreak} from '@/helpers/gamificationEndpoints'; // Adjust the import path as necessary
import {AuthContext} from '@/context/AuthContext';
import {CustomButton} from '@/components/CustomButton';
import {MaterialCommunityIcons} from '@expo/vector-icons'; // Importing icons from expo
import {LoadingIndicator} from '@/components/LoadingIndicator';
import StreakImage from '@/assets/images/Streak.png';
import {useNavigation} from '@react-navigation/native';
import {router, useLocalSearchParams} from 'expo-router';
import {formatUnit} from '@/helpers/formatUnitID';
import {globalStyles} from '@/constants/styles';
import {ScreenStackHeaderBackButtonImage} from 'react-native-screens';
import {experimentalSetDeliveryMetricsExportedToBigQueryEnabled} from '@react-native-firebase/messaging';
import { Colors } from '@/constants/Colors';

const StreakComponent: React.FC = () => {
    const [streakData, setStreakData] = useState<{
        streakDays: number;
        lastCompletionDate: string;
        daysOfWeek: string[];
        tickMarks: boolean[];
    } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
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
    const [data, setData] = useState();
    const [userStreak, setUserStreak] = useState<number>(0);

    useEffect(() => {
        const fetchStreakData = async () => {
            if (currentUser?.sub) {
                try {
                    const data = await getStreak(currentUser.sub);
                    //  Call the getStreak function
                    console.log(data);

                    // const data = {
                    //     lastUnitCompletionDate: '2024-09-19T12:02:35.000Z',
                    //     points: 4185,
                    //     streaks: 1,
                    //     userID: '1',
                    // };

                    const lastCompletionDate = data.lastUnitCompletionDate;

                    console.log('Day:', new Date(lastCompletionDate).getDay());

                    setData(data);
                    setUserStreak(data.streaks);

                    // Calculate days from last completion date to today
                    const daysDiff =
                        calculateDaysDifference(lastCompletionDate);
                    console.log(daysDiff);
                    const {daysOfWeek, tickMarks} = getDaysOfWeek(
                        lastCompletionDate,
                        daysDiff
                    );

                    setStreakData({
                        streakDays: data.streaks,
                        lastCompletionDate,
                        daysOfWeek,
                        tickMarks,
                    }); // Set the fetched data to state
                } catch (err) {
                    console.error(err); // Log the error for debugging
                    setError('Failed to load streak data'); // Handle any errors
                } finally {
                    setLoading(false); // Set loading to false once the data is fetched
                }
            } else {
                setError('User not logged in'); // Handle case where currentUser.sub is undefined
                setLoading(false);
            }
        };

        fetchStreakData(); // Invoke the async function
    }, []); // Include currentUser.sub in the dependency array

    console.log('DATA: ', data);
    console.log('USERSTREAK ', userStreak);

    console.log('tickmark:', streakData?.tickMarks);
    const calculateDaysDifference = (dateString: string) => {
        const lastDate = new Date(dateString);
        const today = new Date();
        const diffTime = today.getTime() - lastDate.getTime(); // Difference in milliseconds
        const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24)); // Convert milliseconds to days
        return diffDays;
    };

    const getDaysOfWeek = (
        lastUnitCompletionDateString: string,
        streak: number
    ) => {
        const lastUnitCompletionDate = new Date(lastUnitCompletionDateString);
        const today = new Date();
        const currentDay = today.getDay();

        // Calculate the first completion date based on the streak
        const firstCompletionDate = new Date(today); // Start with today

        firstCompletionDate.setDate(today.getDate() - streak) + 1; // Subtract streak to get the first completion date

        // Log firstCompletionDate
        console.log(
            'First Completion Date:',
            firstCompletionDate.toLocaleDateString()
        );

        // Calculate Monday of the current week
        const mondayOfCurrentWeek = new Date(today);
        mondayOfCurrentWeek.setDate(
            today.getDate() - (currentDay === 0 ? 6 : currentDay - 1)
        );

        // Calculate Sunday of the current week
        const sundayOfCurrentWeek = new Date(mondayOfCurrentWeek);
        sundayOfCurrentWeek.setDate(mondayOfCurrentWeek.getDate() + 6);

        const days: string[] = [];
        const ticks: boolean[] = [];

        let streakCount = streakData?.streakDays ?? 0;
        console.log('testing');
        console.log('here', streakCount);

        // Loop through each day from Monday to Sunday of the current week
        for (
            let d = new Date(mondayOfCurrentWeek);
            d <= sundayOfCurrentWeek;
            d.setDate(d.getDate() + 1)
        ) {
            days.push(d.toLocaleDateString('en-US', {weekday: 'short'}));

            // Determine if the day falls within the completion streak

            if ((d >= firstCompletionDate && d <= today) || streakCount > 0) {
                ticks.push(true); // Mark as completed
                streakCount--;
            } else {
                ticks.push(false); // Not completed
            }
        }

        return {daysOfWeek: days, tickMarks: ticks};
    };

    const ticksArray: boolean[] = [];

    if (userStreak > new Date().getDay()) {
        for (let i = 1; i <= new Date().getDay(); i++) {
            ticksArray.push(true);
        }
    } else {

        ticksArray.fill(false);

        const streakcounter = new Date().getDay() - userStreak + 1;

        // tues 2
        // thurs 4
        for (let i = streakcounter; i <= new Date().getDay(); i++) {
            ticksArray[i-1] = true;
        }
    }

    const handlePress = async () => {
        if (
            parseInt(formatUnit(unitID as string)) ===
            parseInt(totalUnits as string)
        ) {
            // if last unit, go back to Assessment Intro for Final Assessment (AssessmentIntroduction.tsx)
            router.push({
                pathname: 'AssessmentIntroduction',
                params: {
                    sectionID,
                    unitID,
                    currentUnit,
                    totalUnits,
                    isFinal: 'true',
                    currentProgress: (
                        parseInt(currentProgress as string) + 1
                    ).toString(),
                    totalProgress,
                },
            });
        } else {
            // after self-reflection navigate back to home for next unit
            router.replace('Home');
        }
    };

    if (loading) {
        return <LoadingIndicator />;
    }

    if (error) {
        return <Text style={styles.error}>{error}</Text>;
    }

    return (
        <ScrollView contentContainerStyle={{
            flexGrow: 1,
            padding: 20,
            backgroundColor: Colors.light.background
        }}>
            <View style={styles.insideContainer}>
                <Image
                    source={StreakImage} // Ensure correct path
                    style={styles.image} // Ensure the Image has styles with width and height
                />
                <View style={styles.daysContainer}>
                    {/* {streakData?.daysOfWeek.map((day, index) => (
                        <View key={index} style={styles.dayContainer}>
                            {streakData.tickMarks[index] ? (
                                <MaterialCommunityIcons
                                    name="check-circle"
                                    size={24}
                                    color="#FE9D0D"
                                />
                            ) : (
                                <MaterialCommunityIcons
                                    name="check-circle-outline"
                                    size={24}
                                    color="#E0E0E0"
                                />
                            )}
                            <Text style={styles.dayText}>{day}</Text>
                        </View>
                    ))} */}
                    {streakData?.daysOfWeek.map((day, index) => (
                        <View key={index} style={styles.dayContainer}>
                            {ticksArray[index] ? (
                                <MaterialCommunityIcons
                                    name="check-circle"
                                    size={24}
                                    color="#FE9D0D"
                                />
                            ) : (
                                <MaterialCommunityIcons
                                    name="check-circle-outline"
                                    size={24}
                                    color="#E0E0E0"
                                />
                            )}
                            <Text style={styles.dayText}>{day}</Text>
                        </View>
                    ))}
                </View>
                <Text style={styles.streakTitle}>
                    {streakData?.streakDays} Day Streak!
                </Text>
                <Text style={styles.message}>
                    Keep it up! Your streak will reset if you don't practice
                    tomorrow. Watch out!
                </Text>
            </View>
            <CustomButton
                label="Continue"
                backgroundColor="white"
                onPressHandler={handlePress}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        marginRight: 25,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    insideContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    time: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    streakTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4143A3',
        marginLeft: 10,
    },
    message: {
        fontSize: 12,
        textAlign: 'center',
        marginVertical: 10,
        color: '#4143A3',
        fontWeight: 'light',
    },
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    dayContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    dayText: {
        fontSize: 14,
        color: '#4143A3',
    },
    error: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default StreakComponent;
