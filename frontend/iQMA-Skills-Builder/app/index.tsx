import {ActivityIndicator, Image, Text, View} from 'react-native';

import {AuthContext} from '@/context/AuthContext';
import {LoginButton} from '@/components/LoginButton';
import {LogoVisual} from '@/components/LogoVisual';
import {LogoutButton} from '@/components/LogoutButton';
import {Profile} from '@/components/Profile';
import {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoadingIndicator} from '@/components/LoadingIndicator';

// where things show upp
export default function Index() {
    const {currentUser, isLoading} = useContext(AuthContext);
    const [checkUID, setCheckUID] = useState<string>('');
    const [isStorageLoading, setIsStorageLoading] = useState(true);

    useEffect(() => {
        const fetchUserID = async () => {
            try {
                const userID = await AsyncStorage.getItem('userID');
                setCheckUID(userID ?? '');
            } catch (error) {
                console.error('Error fetching userID from AsyncStorage', error);
            } finally {
                setIsStorageLoading(false);
            }
        };

        fetchUserID();
    }, []);

    if (isStorageLoading || isLoading || currentUser) {
        return (
            <>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF',
                    }}
                ></View>
            </>
        );
        // return <LoadingIndicator></LoadingIndicator>;
    }

    return (
        <>
            {checkUID ? (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF',
                    }}
                ></View>
            ) : (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#C3B1FF',
                    }}
                >
                    <LogoVisual />
                    <LoginButton />
                </View>
            )}
        </>
    );

    // return (
    // <View
    //     style={{
    //         flex: 1,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         backgroundColor: '#C3B1FF',
    //     }}
    // >
    //     <LogoVisual></LogoVisual>
    //     <LoginButton></LoginButton>
    //     {/* For Testing & Debugging */}
    //     {/* <Profile></Profile>  */}
    // </View>
    //     <>
    //         {checkUID ? (
    //             <View
    //                 style={{
    //                     flex: 1,
    //                     justifyContent: 'center',
    //                     alignItems: 'center',
    //                     backgroundColor: '#C3B1FF',
    //                 }}
    //             >
    //                 <Text>LOADING...</Text>
    //                 {/* <LoginButton></LoginButton> */}
    //             </View>
    //         ) : (
    //             <View
    //                 style={{
    //                     flex: 1,
    //                     justifyContent: 'center',
    //                     alignItems: 'center',
    //                     backgroundColor: '#C3B1FF',
    //                 }}
    //             >
    //                 <LogoVisual></LogoVisual>
    //                 <LoginButton></LoginButton>
    //             </View>
    //         )}
    //     </>
    // );
}
