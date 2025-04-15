import {StyleSheet, Text, View} from 'react-native';
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
    createDrawerNavigator,
} from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Colors} from '@/constants/Colors';
import ChatbotScreen from '@/app/screens/Chatbot';
import CustomLabel from './CustomLabel';
import {Alert} from 'react-native';

const sectionData = [
    {
        sectionID: 'SEC0001',
        sectionName: 'Section 1: Communication', // hardcoded for now
    },
];

const Drawer = createDrawerNavigator();

const clearAllChats = async () => {
    // clearing logic in the future
};

const deleteAlert = async () => {
    Alert.alert(
        'Delete All Chats',
        'Are you sure you want to delete all chats?',
        [
            {text: 'Cancel', style: 'cancel'},
            {text: 'OK', onPress: async () => await clearAllChats()},
        ]
    );
};

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
            </View>
        </DrawerContentScrollView>
    );
};

const ChatbotDrawer = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerActiveTintColor: Colors.light.background,
                drawerInactiveTintColor: '#000000',
                drawerActiveBackgroundColor: '#C3B1FF',
                drawerLabelStyle: styles.labelItem,
                headerTintColor: Colors.default.purple500,
                headerStyle: {
                    backgroundColor: Colors.light.background,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 44},
                    shadowOpacity: 0.4,
                    shadowRadius: 6,
                    elevation: 5,
                },
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
            {sectionData.map((section) => (
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
        color: Colors.header.color,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ChatbotDrawer;
