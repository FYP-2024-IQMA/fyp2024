import {Button} from 'react-native';
import {AuthContext} from '@/context/AuthContext';
import {useContext} from 'react';

export const LoginButton = () => {
    const {logIn, currentUser} = useContext(AuthContext);

    return (
        <>
            {currentUser ? (
                // if currentUser exists, disable Log in button
                <Button onPress={logIn} title="Log in" disabled />
            ) : (
                <Button onPress={logIn} title="Log in" />
            )}
        </>
    );
};
