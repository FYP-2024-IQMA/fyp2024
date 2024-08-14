import React from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import { Stack } from "expo-router";
import { useAuth0, Auth0Provider } from "react-native-auth0";
import config from "../config/auth0-configuration";
import { AuthProvider } from "@/context/AuthContext";

import 'react-native-gesture-handler';

import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Auth0Provider, useAuth0 } from "react-native-auth0";
import { useEffect, useState } from "react";

import { AuthProvider } from "@/context/AuthContext";
import ChatbotDrawer from "../components/ChatbotDrawer";
import HomeScreen from "./screens/Home";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ProfilePage from "./screens/ProfilePage";
import config from "../config/auth0-configuration";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import useColorScheme from "@/hooks/useColorScheme";
import { useDrawerStatus } from '@react-navigation/drawer';

const Tab = createBottomTabNavigator();

// for bottom tabs
const AppTabs: React.FC = () => {
    const colorScheme = useColorScheme();
    const tabBarOptions = {
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#BBBBBB',
        style: {
            backgroundColor: '#7654F2',
        },
    }

    return (
    // screen options expects an object or a function that returns an object
    <Tab.Navigator
    screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
      headerStyle: { backgroundColor: '#B199FF' },  
      tabBarActiveTintColor: tabBarOptions.activeTintColor,
      tabBarInactiveTintColor: tabBarOptions.inactiveTintColor,
      tabBarStyle: tabBarOptions.style,
    })}>
      <Tab.Screen name="screens/Home" component={HomeScreen} options={{ title: 'Home Page', tabBarIcon: ({ color, size }) => (
        <Ionicons name="home" color={color} size={size} />
      )}}/>
      <Tab.Screen name="screens/Chatbot" component={ChatbotDrawer}  options={{ headerShown:false,  tabBarIcon: ({ color, size }) => (
        <Ionicons name="chatbox-ellipses-outline" color={color} size={size} />
      )}}/>
      <Tab.Screen name="screens/ProfilePage" component={ProfilePage} options={{ title: 'Profile', tabBarIcon: ({ color, size }) => (
        <MaterialIcons name="manage-accounts" size={size} color={color} />
      )}}/>
    </Tab.Navigator>
  );
}

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
                    <Stack.Screen name="index" />
                    <Stack.Screen 
                        name="LearnerAssessmentDemographics" 
                        options={{ headerTitle: () => <Header imageName="progress-bar-1" /> }}
                    />
                    <Stack.Screen
                        name='LearnerAssessmentCognitive'
                        options={{ headerTitle: () => <Header imageName="progress-bar-2" /> }}
                    />
                </Stack>
            </AuthProvider>
        </Auth0Provider>
    );
}

const images: { [key: string]: ImageSourcePropType } = {
    'progress-bar-1': require('@/assets/images/progress-bar-1.png'),
    'progress-bar-2': require('@/assets/images/progress-bar-2.png')
};

const Header = ({ imageName } : { imageName: string }) => (
    <View>
        <Image source={images[imageName]}/>
    </View>
);
