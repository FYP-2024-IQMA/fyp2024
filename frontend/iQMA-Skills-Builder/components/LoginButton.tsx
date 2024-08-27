import {
    Button,
    Dimensions,
    Pressable,
    StyleSheet,
    View,
    Text,
} from 'react-native';
import {AuthContext} from '@/context/AuthContext';
import {useContext} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const screenWidth = Dimensions.get('window').width;
export const LoginButton = () => {
    const {logIn, currentUser} = useContext(AuthContext);

    return (
        <>
            {currentUser ? (
                // if currentUser exists, disable Log in button
                <Button onPress={logIn} title="Get Started" disabled />
            ) : (
                <Pressable onPress={logIn} style={[styles.button]}>
                    <View>
                        <Text style={{color: 'white'}}>Get Started</Text>
                    </View>
                </Pressable>
            )}
        </>
    );
};
const styles = StyleSheet.create({
    button: {
        width: screenWidth * 0.8,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7654F2',
        height: 40,
    },
});
