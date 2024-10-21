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
import {useDrawerStatus} from '@react-navigation/drawer';
import EditProfile from './EditProfile';

const Tab = createBottomTabNavigator();

// for bottom tabs
const AppTabs: React.FC = () => {
    const colorScheme = useColorScheme();
    const tabBarOptions = {
        activeTintColor: Colors.light.background,
        inactiveTintColor: '#BBBBBB',
        style: {
            backgroundColor: Colors.default.purple500,
        },
    };

    return (
        // screen options expects an object or a function that returns an object
        <Tab.Navigator
            screenOptions={({route}) => ({
                headerTitleAlign: 'center',
                headerStyle: {backgroundColor: Colors.default.purple100},
                tabBarActiveTintColor: tabBarOptions.activeTintColor,
                tabBarInactiveTintColor: tabBarOptions.inactiveTintColor,
                tabBarStyle: tabBarOptions.style,
            })}
        >
            <Tab.Screen
                name="screens/Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="screens/Chatbot"
                component={ChatbotDrawer}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons
                            name="chatbox-ellipses-outline"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="screens/ProfilePage"
                component={ProfilePage}
                options={{
                    title: 'Profile',
                    tabBarIcon: ({color, size}) => (
                        <MaterialIcons
                            name="manage-accounts"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

// place to put ur headers, footers, and other layout components
export default function RootLayout() {
    const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 1000);
    // }, []);
    // if (loading) {
    //     return (
    //         <View
    //             style={{
    //                 flex: 1,
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //             }}
    //         >
    //             <ActivityIndicator size="large" color="#8A2BE2" />
    //         </View>
    //     );
    // }

    return (
        <Auth0Provider domain={config.domain} clientId={config.clientId}>
            <AuthProvider>
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
                    <Stack.Screen
                        name="LearnerAssessmentDemographics"
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
                        name="LearnerAssessmentCognitive"
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
                        name="LearnerAssessmentDynamics"
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
                        name="LearnerAssessmentExperience"
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
                            headerTitle: "Edit Profile",
                            headerStyle: {
                                backgroundColor: Colors.default.purple100,
                            },
                            headerTintColor: Colors.light.background
                        }}
                    />
                    <Stack.Screen
                        name="Achievements"
                        options={{
                            headerTitle: "Achievements",
                            headerStyle: {
                                backgroundColor: Colors.default.purple100,
                            },
                            headerTintColor: Colors.light.background
                        }}
                    />
                    <Stack.Screen
                        name="Courses"
                        options={{
                            headerTitle: "All Courses",
                            headerStyle: {
                                backgroundColor: Colors.default.purple100,
                            },
                            headerTintColor: Colors.light.background
                        }}
                    />
                </Stack>
            </AuthProvider>
        </Auth0Provider>
    );
}
