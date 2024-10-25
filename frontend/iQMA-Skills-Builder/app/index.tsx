import {View} from 'react-native';
import {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '@/context/AuthContext';
import {Colors} from '@/constants/Colors';
import {LoginButton} from '@/components/LoginButton';
import {LogoVisual} from '@/components/LogoVisual';

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

    console.log("isStorageLoading: ", isStorageLoading);
    console.log("isLoading: ", isLoading);
    console.log("currentUser: ", currentUser);
    console.log("checkUID: ", checkUID);

    if (isStorageLoading || isLoading || currentUser || checkUID) {
        return (
            <>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: Colors.light.background,
                    }}
                ></View>
            </>
        );
    }

    return (
        <>
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
        </>
    );
}
