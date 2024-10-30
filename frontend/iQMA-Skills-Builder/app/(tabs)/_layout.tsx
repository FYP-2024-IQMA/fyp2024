import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Auth0Provider, useAuth0} from 'react-native-auth0';
import {SplashScreen, Stack} from 'expo-router';
import {useEffect, useState} from 'react';

import {AuthProvider} from '@/context/AuthContext';
import ChatbotDrawer from '@/components/ChatbotDrawer';
import {Colors} from '@/constants/Colors';
import HomeScreen from '../screens/Home';
import {Ionicons} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import ProfilePage from '../screens/ProfilePage';
import SettingPage from '../screens/Settings';
import LeaderboardPage from '../screens/Leaderboard';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import useColorScheme from '@/hooks/useColorScheme';
import {useDrawerStatus} from '@react-navigation/drawer';

const Tab = createBottomTabNavigator();

// for bottom tabs
export default function AppTabs() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                headerTitleAlign: 'center',
                headerStyle: {backgroundColor: Colors.default.purple100},
                tabBarActiveTintColor: Colors.light.background,
                tabBarInactiveTintColor: '#BBBBBB',
                tabBarStyle: {
                    backgroundColor: Colors.default.purple500,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 80,
                },
                tabBarContentContainerStyle: {
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                tabBarShowLabel: false,
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Chatbot"
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
                name="Leaderboard"
                component={LeaderboardPage}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialIcons name="leaderboard" size={size} color={color} />
                    ),
                    headerTintColor: '#fff',
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfilePage}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                    headerTintColor: '#fff',
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingPage}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="settings" size={size} color={color} />
                    ),
                    headerTintColor: '#fff',
                }}
            />
        </Tab.Navigator>
    );
}
