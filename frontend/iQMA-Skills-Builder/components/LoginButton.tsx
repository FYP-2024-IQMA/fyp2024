import {
    Button,
    Dimensions,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {AuthContext} from '@/context/AuthContext';
import {Colors} from '@/constants/Colors';
import {useContext} from 'react';

const screenWidth = Dimensions.get('window').width;
export const LoginButton = () => {
    const {logIn, currentUser} = useContext(AuthContext);

    return (
        <>
            {/* {currentUser ? (
                // if currentUser exists, disable Log in button
                <Button onPress={logIn} title="Get Started" disabled />
            ) : (
                <Pressable onPress={logIn} style={[styles.button]}>
                    <View>
                        <Text style={{color: 'white'}}>Get Started</Text>
                    </View>
                </Pressable>
            )} */}
            <Pressable onPress={logIn} style={[styles.button]}>
                <View>
                    <Text style={{color: 'white'}}>Get Started</Text>
                </View>
            </Pressable>
        </>
    );
};
const styles = StyleSheet.create({
    button: {
        width: screenWidth * 0.8,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.default.purple500,
        height: 40,
    },
});
