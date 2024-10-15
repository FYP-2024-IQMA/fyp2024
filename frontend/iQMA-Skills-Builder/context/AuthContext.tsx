import {User, useAuth0} from 'react-native-auth0';
import {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from 'expo-router';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const {authorize, clearSession, user, error, getCredentials} = useAuth0();
    const [currentUser, setCurrentUser] = useState<User | null>(null); // Store current User object
    const [token, setToken] = useState<string | null>(null); // Store Access Token of current User
    const [isLoading, setIsLoading] = useState(true);

    const requestUserPermission = async () => {
        try {
            const permission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
            );
            if (permission === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Notification permission granted");
            }
            else {
                console.log("Notification permission denied");
            }
        } catch (e) {
            console.error(e);
        }
    }

    const getToken = async () => {
        const token = await messaging().getToken();
        console.log("Token = ", token);
    }

    useEffect(() => {
        requestUserPermission();
        getToken();
    })

    useEffect(() => {
        watchUserSession();
        // checkFirstLogin();
    }, [user]);

    // Watch for changes in User Session
    const watchUserSession = async () => {
        if (user) {
            setCurrentUser(user);
            await fetchToken();
            console.log(user);
            // router.push("CreateProfile");
            // router.push("IntroductionMascot");
            // router.replace("/Home");
            await checkFirstLogin();
            if (user.sub) {
                await AsyncStorage.setItem('userID', user.sub);
            }
        } else {
            setIsLoading(false);
        }
        setIsLoading(false);
    };

    // Retrieve Access Token if user is Logged In
    const fetchToken = async () => {
        try {
            const credentials = await getCredentials();
            if (credentials) {
                console.log(credentials);
                console.log(credentials.idToken);
                setToken(credentials.idToken);

                const response = await fetch(
                    `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/accounts/setToken`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${credentials.idToken}`, // Include the token in the Authorization header
                        },
                    }
                );

                console.log(response.status);
                const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/accounts/getallaccounts`;
            }
        } catch (e) {
            console.log('Error fetching token:', e);
        }
    };

    // Log In
    const logIn = async () => {
        try {
            await authorize();
        } catch (e) {
            console.log(e);
        }
    };

    // Log Out
    const logOut = async () => {
        try {
            await clearSession();
            setCurrentUser(null);
            setToken(null);
            await AsyncStorage.clear();
            router.replace('/'); // For redirect if page is not Index
        } catch (e) {
            console.log(e);
        }
    };

    // Check First Time Login
    const checkFirstLogin = async () => {
        try {
            const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/accounts/getaccountbyid/${user?.sub}`;

            const response = await fetch(url);

            const data = await response.json();

            console.log(data);
            console.log(response.status);

            if (
                response.status === 406 &&
                // data.error === 'Failed to retrieve account'
                data.details === 'The result contains 0 rows'
            ) {
                console.log('First Time:', data);

                router.replace('CreateProfile');
            } else if (response.status === 200) {
                console.log('Not first time:', data);
                if (data.hasOnboarded) {
                    router.replace('Home');
                    // router.replace('UnitIntroduction');
                    // router.replace('VideoQuiz');
                    // router.replace('Lesson');
                    // router.replace("SectionIntroduction");
                    // router.replace('CheatSheet');
                    // router.replace('SelfReflection');
                    // router.replace('Assessment');
                    // router.replace('AssessmentIntroduction');
                    // router.replace('KeyTakeaway');
                } else {
                    router.replace('IntroductionMascot');
                }
            }
            setIsLoading(false);
        } catch (error) {
            console.log('Error:', error);
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{logIn, logOut, currentUser, token, isLoading}}
        >
            {children}
        </AuthContext.Provider>
    );
};
