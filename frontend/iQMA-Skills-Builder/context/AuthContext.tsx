import { User, useAuth0 } from "react-native-auth0";
import { createContext, useEffect, useState } from "react";

import { router } from 'expo-router';

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { authorize, clearSession, user, error, getCredentials } = useAuth0();
    const [currentUser, setCurrentUser] = useState<User | null>(null); // Store current User object
    const [token, setToken] = useState<string | null>(null); // Store Access Token of current User

    useEffect(() => {
        watchUserSession();
    }, [user]);

    // Watch for changes in User Session
    const watchUserSession = () => {
        if (user) {
            setCurrentUser(user);
            fetchToken();
            console.log(user);
            router.replace("/Home"); 
        }
    };

    // Retrieve Access Token if user is Logged In
    const fetchToken = async () => {
        try {
            const credentials = await getCredentials();
            if (credentials) {
                setToken(credentials.accessToken);
                console.log("Access Token:", credentials.accessToken);
            }
        } catch (e) {
            console.log("Error fetching token:", e);
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
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <AuthContext.Provider value={{ logIn, logOut, currentUser, token }}>
            {children}
        </AuthContext.Provider>
    );
};
