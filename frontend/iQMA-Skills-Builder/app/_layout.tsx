import 'react-native-gesture-handler';

import * as Progress from 'react-native-progress';

import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Auth0Provider, useAuth0 } from "react-native-auth0";
import { useContext, useEffect, useState } from "react";

import { AuthContext, AuthProvider } from "@/context/AuthContext";
import ChatbotDrawer from "../components/ChatbotDrawer";
import HomeScreen from "./screens/Home";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ProfilePage from "./screens/ProfilePage";
import React from 'react';
import SettingPage from "./screens/Settings";
import { Stack } from "expo-router";
import config from "../config/auth0-configuration";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import useColorScheme from "@/hooks/useColorScheme";
import { useDrawerStatus } from '@react-navigation/drawer';

// place to put ur headers, footers, and other layout components
export default function RootLayout() {

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    },[]);
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#8A2BE2" />
            </View>
          );
    }

    return (
        <Auth0Provider domain={config.domain} clientId={config.clientId}>
            <AuthProvider>
                <Stack screenOptions={{
                    headerTitle: '',
                    headerTitleAlign: 'center'
                }}>
                    {/* <Stack.Screen name="index" /> */}
                    <Stack.Screen 
                        name="CreateProfile"
                        options={{
                            headerShown: false,
                          }}
                    />
                    <Stack.Screen 
                        name="LearnerAssessmentDemographics" 
                        options={{ headerTitle: () => <Header progress={0.25} /> }}
                    />
                    <Stack.Screen
                        name='LearnerAssessmentCognitive'
                        options={{ headerTitle: () => <Header progress={0.5} /> }}
                    />
                    <Stack.Screen
                        name='LearnerAssessmentDynamics'
                        options={{ headerTitle: () => <Header progress={0.75} /> }}
                    />
                    <Stack.Screen
                        name='LearnerAssessmentExperience'
                        options={{ headerTitle: () => <Header progress={1} /> }}
                    />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </AuthProvider>
        </Auth0Provider>

    );
}

const Header = ({ progress } : { progress: number }) => (
    <View>
        <Progress.Bar
            progress={progress}
            width={300}
            color={'#7654F2'}
        />
    </View>
);

