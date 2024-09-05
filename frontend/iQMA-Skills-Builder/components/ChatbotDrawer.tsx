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
import {useEffect, useContext, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {AuthContext} from '@/context/AuthContext';

type SectionData = {
    sectionID: string;
    sectionName: string;
};

const sectionData: SectionData[] = [
    {
        sectionID: 'SEC0001',
        sectionName: 'Section 1: Communication',
    },
    {
        sectionID: 'SEC0002',
        sectionName: 'Section 2: Decision Making',
    },
    {
        sectionID: 'SEC0003',
        sectionName: 'Section 3: Developing People',
    },
];

export type ChatDrawerParamList = {
    [K in (typeof sectionData)[number]['sectionName']]: {sectionID: string};
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
                            routes: [{name: sectionData[0].sectionName}],
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
    const {currentUser, isLoading} = useContext(AuthContext);
    // const [sectionID, setSectionID] = useState<string | null>(null); // Initialize with null
    const [Id, setId] = useState<number | null>(null); // Initialize with null
    const [isFetching, setIsFetching] = useState<boolean>(true); // Add a loading state

    useEffect(() => {
        const fetchSectionID = async () => {
            try {
                const url = `http://${process.env.EXPO_PUBLIC_LOCALHOST_URL}:3000/result/getuserprogress/${currentUser?.uid}`;
                const response = await fetch(url);
                let Id = await response.json();
                if (Id < 2) {
                    Id = 1;
                }
                const newSectionID = `SEC${Id.toString().padStart(4, '0')}`; // if Id = 1 then sectionID = SEC0001, Id = 16 then sectionID = SEC0016
                // await AsyncStorage.setItem("sectionID", newSectionID);
                setId(Id);
                // setSectionID(newSectionID);
            } catch (error) {
                console.error(
                    // "Failed to save sectionID to AsyncStorage",
                    'Failed to retrieve Id',
                    error
                );
            } finally {
                setIsFetching(false); // Set loading state to false after fetch
            }
        };

        fetchSectionID();
    }, [currentUser]);

    // Render a loading state until sectionID is set
    if (isFetching || !Id) {
        return <Text>Loading...</Text>; // Or a spinner
    }

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
            {sectionData
                // Filter the sections chat to show based on the sectionID (for future purposes if past section chat history is needed)
                .filter((section) => {
                    // Extract the numeric part of the sectionID
                    const sectionNumber = parseInt(
                        section.sectionID.replace('SEC', '')
                    );
                    return sectionNumber === Id!; // (Currently, only need ID =) (For future: Render only sections with ID less than or equal to `Id`)
                })
                .map((section) => (
                    <Drawer.Screen
                        key={section.sectionID}
                        name={section.sectionName}
                        component={ChatbotScreen}
                        initialParams={{
                            sectionID: section.sectionID,
                        }}
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
                                    label={section.sectionName}
                                    color={color}
                                />
                            ),
                        }}
                    />
                ))}

            {/* <Drawer.Screen
                key={sectionID}
                name={section!.sectionName}
                component={ChatbotScreen}
                initialParams={{
                    sectionID: sectionID,
                }}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons
                            name="chatbox-ellipses-sharp"
                            size={20}
                            color={color}
                        />
                    ),
                    drawerLabel: ({ color }) => (
                        <CustomLabel
                            label={section!.sectionName}
                            color={color}
                        />
                    ),
                }}
            /> */}
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
