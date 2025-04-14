import 'react-native-gesture-handler';

import * as Progress from 'react-native-progress';

import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import {Auth0Provider, useAuth0} from 'react-native-auth0';
import {useEffect, useState} from 'react';

import {AuthProvider} from '@/context/AuthContext';
import ChatbotDrawer from '../components/ChatbotDrawer';
import {Colors} from '@/constants/Colors';
import HomeScreen from './screens/Home';
import {Ionicons} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import ProfilePage from './screens/ProfilePage';
import ProgressBar from '@/components/ProgressBar';
import {Stack, useNavigation} from 'expo-router';
import config from '../config/auth0-configuration';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import useColorScheme from '@/hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';

import {LogBox} from 'react-native';

// Disable red screen errors
ErrorUtils.setGlobalHandler((error: any, isFatal?: boolean) => {
    console.log('Suppressed error:', error.message);
});
// Disable yellow warnings
LogBox.ignoreAllLogs(true);

// place to put ur headers, footers, and other layout components
export default function RootLayout() {
    const [loading, setLoading] = useState(true);

    return (
        <Auth0Provider domain={config.domain!} clientId={config.clientId!}>
            <AuthProvider>
                <StatusBar style="dark"></StatusBar>
                <Stack
                    screenOptions={{
                        headerTitle: '',
                        headerTitleAlign: 'center',
                    }}
                >
                    {/* <Stack.Screen name="index" /> */}

                    <Stack.Screen
                        name="index"
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="CreateProfile"
                        options={{
                            headerShown: false,
                        }}
                    />

                    {/* Sign up form */}
                    <Stack.Screen
                        name="signup_form/AboutYou"
                        options={{
                            headerTitle: () => (
                                <ProgressBar
                                    progress={0.25}
                                    isQuestionnaire={true}
                                />
                            ),
                        }}
                    />

                    <Stack.Screen
                        name="signup_form/LearningStyleAndSkills"
                        options={{
                            headerTitle: () => (
                                <ProgressBar
                                    progress={0.5}
                                    isQuestionnaire={true}
                                />
                            ),
                        }}
                    />

                    <Stack.Screen
                        name="signup_form/SocialAndTechHabits"
                        options={{
                            headerTitle: () => (
                                <ProgressBar
                                    progress={0.75}
                                    isQuestionnaire={true}
                                />
                            ),
                        }}
                    />

                    <Stack.Screen
                        name="signup_form/Motivation"
                        options={{
                            headerTitle: () => (
                                <ProgressBar
                                    progress={1}
                                    isQuestionnaire={true}
                                />
                            ),
                        }}
                    />

                    {/* Legacy Sign up form */}
                    <Stack.Screen
                        name="legacy_signup_form/LearnerAssessmentDemographics"
                        options={{
                            headerTitle: () => (
                                <ProgressBar
                                    progress={0.25}
                                    isQuestionnaire={true}
                                />
                            ),
                        }}
                    />
                    <Stack.Screen
                        name="legacy_signup_form/LearnerAssessmentCognitive"
                        options={{
                            headerTitle: () => (
                                <ProgressBar
                                    progress={0.5}
                                    isQuestionnaire={true}
                                />
                            ),
                        }}
                    />
                    <Stack.Screen
                        name="legacy_signup_form/LearnerAssessmentDynamics"
                        options={{
                            headerTitle: () => (
                                <ProgressBar
                                    progress={0.75}
                                    isQuestionnaire={true}
                                />
                            ),
                        }}
                    />
                    <Stack.Screen
                        name="legacy_signup_form/LearnerAssessmentExperience"
                        options={{
                            headerTitle: () => (
                                <ProgressBar
                                    progress={1}
                                    isQuestionnaire={true}
                                />
                            ),
                        }}
                    />
                    <Stack.Screen
                        name="(tabs)"
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="EditProfile"
                        options={{
                            headerTitle: 'Edit Profile',
                            headerStyle: {
                                backgroundColor: Colors.default.purple100,
                            },
                            headerTintColor: Colors.light.background,
                        }}
                    />
                    <Stack.Screen
                        name="Achievements"
                        options={{
                            headerTitle: 'Achievements',
                            headerStyle: {
                                backgroundColor: Colors.default.purple100,
                            },
                            headerTintColor: Colors.light.background,
                        }}
                    />
                    <Stack.Screen
                        name="Courses"
                        options={{
                            headerTitle: 'All Courses',
                            headerStyle: {
                                backgroundColor: Colors.default.purple100,
                            },
                            headerTintColor: Colors.light.background,
                        }}
                    />
                </Stack>
            </AuthProvider>
        </Auth0Provider>
    );
}
