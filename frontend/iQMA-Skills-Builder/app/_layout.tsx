// import './gesture-handler';

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
                    <Stack>
                        <Stack.Screen name="index" options={{ headerShown: false }} />
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    </Stack>
            </AuthProvider>
        </Auth0Provider>

    );
}


