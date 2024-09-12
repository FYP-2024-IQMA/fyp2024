import {User, useAuth0} from 'react-native-auth0';
import {createContext, useEffect, useState} from 'react';
import {router} from 'expo-router';
import {ActivityIndicator, View} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const {authorize, clearSession, user, error, getCredentials} = useAuth0();
    const [currentUser, setCurrentUser] = useState<User | null>(null); // Store current User object
    const [token, setToken] = useState<string | null>(null); // Store Access Token of current User
    const [isLoading, setIsLoading] = useState(true);

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
            await AsyncStorage.removeItem('userID'); 
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
                response.status === 500 &&
                data.error === 'Failed to retrieve account'
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
