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
      headerStyle: { backgroundColor: '#B199FF'},  
      tabBarActiveTintColor: tabBarOptions.activeTintColor,
      tabBarInactiveTintColor: tabBarOptions.inactiveTintColor,
      tabBarStyle: {
        ...tabBarOptions.style,
        justifyContent: 'center', 
        alignItems: 'center',    
        paddingHorizontal: 80,  
    },
    tabBarContentContainerStyle: {
      alignItems: 'center',
      justifyContent: 'center',
    },
      tabBarShowLabel: false,
    })}>
      <Tab.Screen name="screens/Home" component={HomeScreen} options={{ title: 'Home Page', tabBarIcon: ({ color, size }) => (
        <Ionicons name="home" color={color} size={size} />
      )}}/>
      <Tab.Screen name="screens/Chatbot" component={ChatbotDrawer}  options={{ headerShown:false,  tabBarIcon: ({ color, size }) => (
        <Ionicons name="chatbox-ellipses-outline" color={color} size={size} />
      ), 
      }}/>
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
                {/* <NavigationContainer> */}
                    {/* <Stack>
                        <Stack.Screen name="index" />
                    </Stack> */}
                    <AppTabs />
                {/* </NavigationContainer> */}
            </AuthProvider>
        </Auth0Provider>
    );
}


