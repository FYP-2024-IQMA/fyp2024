import {Button} from 'react-native';
import {AuthContext} from '@/context/AuthContext';
import {useContext} from 'react';

export const LogoutButton = () => {
    const {logOut, currentUser} = useContext(AuthContext);

    return (
        <>
            {currentUser ? (
                <Button onPress={logOut} title="Log out" />
            ) : (
                // if currentUser does not exist, disable Log Out button
                <Button onPress={logOut} title="Log out" disabled />
            )}
        </>
    );
};
