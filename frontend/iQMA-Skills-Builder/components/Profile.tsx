import {Text} from 'react-native';
import {AuthContext} from '@/context/AuthContext';
import {useContext} from 'react';

export const Profile = () => {
    const {currentUser} = useContext(AuthContext);

    return (
        <>
            {currentUser && (
                <>
                    <Text>Email: {currentUser.email}</Text>
                </>
            )}
        </>
    );
};
