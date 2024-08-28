import {Alert, StyleSheet, Text, View} from 'react-native';
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
    createDrawerNavigator,
} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatbotScreen from '../app/screens/Chatbot';
import CustomLabel from './CustomLabel';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

// defines the drawer routes and params
type ChatDrawerParamList = {
    'Section 1: Communication': {chatId: string};
    'Section 2: Decision Making': {chatId: string};
    'Section 3: Developing People': {chatId: string};
    ChatD: {chatId: string};
};

// to know about the route
const Drawer = createDrawerNavigator<ChatDrawerParamList>();

// function to clear all chat history
const clearAllChats = async () => {
    await AsyncStorage.clear();
    console.log('All chats cleared');
};

// function for delete alert message
const deleteAlert = async () => {
    Alert.alert(
        'Delete All Chats',
        'Are you sure you want to delete all chats?',
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Delete all chats cancelled.'),
                style: 'cancel',
            },
            {text: 'OK', onPress: async () => await clearAllChats()},
        ]
    );
};

// to ensure receives correct props for rendering drawer content
const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerHeader}>
                <Text style={styles.drawerHeaderText}>Chat History</Text>
            </View>
            <DrawerItemList {...props} />
            <View style={styles.bottomDrawerSection}>
                <DrawerItem
                    label="Clear All Chats"
                    onPress={async () => {
                        deleteAlert();

                        props.navigation.reset({
                            index: 0,
                            routes: [{name: 'Section 1: Communication'}],
                        });
                    }}
                    style={styles.closeDrawer}
                />
                {/* <DrawerItem
                    label="Clear Chats"
                    onPress={props.onClearChats}
                    style={styles.clearChats}
                /> */}
            </View>
        </DrawerContentScrollView>
    );
};

const handleClearChats = async () => {
    // Implement clear chats functionality here
    // await AsyncStorage.clear();
    // Then refresh the drawer or navigate to a specific screen
};

// to open left tab for chat bot
const ChatbotDrawer: React.FC<any> = ({navigation}) => {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerActiveTintColor: '#ffffff',
                drawerInactiveTintColor: '#000000',
                drawerActiveBackgroundColor: '#C3B1FF',
                drawerLabelStyle: styles.labelItem,
                headerTintColor: '#ffffff',
                headerStyle: {backgroundColor: '#B199FF'},
                headerTitleAlign: 'center',
                headerTitleStyle: {fontSize: 18, fontWeight: 'bold'},
                drawerItemStyle: {
                    paddingLeft: 0,
                    marginTop: 10,
                    borderRadius: 10,
                },
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            {/* need to set initial params or it will be undefined */}
            {/* drawer screen needs to be in navigation level */}
            <Drawer.Screen
                name="Section 1: Communication"
                component={ChatbotScreen}
                initialParams={{chatId: 'Section 1: Communication'}}
                options={{
                    drawerIcon: ({color, size}) => (
                        <Ionicons
                            name="chatbox-ellipses-sharp"
                            size={20}
                            color={color}
                        />
                    ),
                    drawerLabel: ({color}) => (
                        <CustomLabel
                            label="Section 1: Communication"
                            color={color}
                        />
                    ),
                }}
            />

            <Drawer.Screen
                name="Section 2: Decision Making"
                component={ChatbotScreen}
                initialParams={{chatId: 'Section 2: Decision Making'}}
                options={{
                    drawerIcon: ({color, size}) => (
                        <Ionicons
                            name="chatbox-ellipses-sharp"
                            size={20}
                            color={color}
                        />
                    ),
                    drawerLabel: ({color}) => (
                        <CustomLabel
                            label="Section 2: Decision Making"
                            color={color}
                        />
                    ), // Use custom label component
                }}
            />

            <Drawer.Screen
                name="Section 3: Developing People"
                component={ChatbotScreen}
                initialParams={{chatId: 'Section 3: Developing People'}}
                options={{
                    drawerIcon: ({color, size}) => (
                        <Ionicons
                            name="chatbox-ellipses-sharp"
                            size={20}
                            color={color}
                        />
                    ),
                    drawerLabel: ({color}) => (
                        <CustomLabel
                            label="Section 3: Developing People"
                            color={color}
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    labelItem: {
        padding: 50,
        width: '100%',
        textAlign: 'left',
    },
    closeDrawer: {
        // backgroundColor: '#8A2BE2',
        // borderWidth: 1,
        justifyContent: 'center',
    },
    bottomDrawerSection: {
        marginTop: 200,
    },
    drawerHeader: {
        padding: 16,
        borderBottomWidth: 0.2,
        left: 10,
        width: '90%',
    },
    drawerHeaderText: {
        color: '#4143A3',
        fontSize: 18,
        fontWeight: 'bold',
    },
    clearChats: {
        borderWidth: 1,
        justifyContent: 'center',
        marginTop: 10,
    },
});

export default ChatbotDrawer;
