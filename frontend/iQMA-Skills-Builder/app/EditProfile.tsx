import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
} from 'react-native';
import {useState, useContext, useEffect} from 'react';
import {AuthContext} from '@/context/AuthContext';
import * as accountEndpoints from '@/helpers/accountEndpoints';
import {LoadingIndicator} from '@/components/LoadingIndicator';
import {router} from 'expo-router';
import {globalStyles} from '@/constants/styles';

export default function EditProfile() {
    const {currentUser, isLoading} = useContext(AuthContext);
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [firstNameError, setFirstNameError] = useState<string>(
        'First Name cannot be empty!'
    );
    const [lastNameError, setLastNameError] = useState<string>(
        'Last Name cannot be empty!'
    );

    const handleSave = async () => {
        // setFirstNameError(false);
        // setLastNameError(false);

        // let hasError = false;

        // if (firstName == '') {
        //     setFirstNameError(true);
        //     hasError = true;
        // }

        // if (lastName == '') {
        //     setLastNameError(true);
        //     hasError = true;
        // }

        if (lastName == '') {
            return;
        }

        if (firstName == '') {
            return;
        }

        try {
            const userDetails = {
                userID: `${currentUser.sub}`,
                firstName: `${firstName}`,
                lastName: `${lastName}`,
            };

            await accountEndpoints.editUserDetails(userDetails);
            Alert.alert('Success', 'Profile updated successfully.');
        } catch (error) {
            Alert.alert('Error', 'Failed to update profile. Please try again.');
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const userDetails = await accountEndpoints.getUserDetails(
                    currentUser.sub
                );
                console.log('userDetails:', userDetails);
                setFirstName(userDetails.firstName);
                setLastName(userDetails.lastName);
                setEmail(userDetails.email);
            } catch (error) {
                console.error('Error fetching user details:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <ScrollView style={globalStyles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>FIRST NAME</Text>
                <TextInput
                    style={[
                        styles.input,
                        firstName == ''
                            ? {borderColor: 'red', borderWidth: 1, marginBottom: 0}
                            : null,
                    ]}
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                />
                {firstName == '' ? <Text style={styles.errorLabel}>{firstNameError}</Text> : null}
                <Text style={styles.label}>LAST NAME</Text>
                <TextInput
                    style={[
                        styles.input,
                        lastName == ''
                            ? {borderColor: 'red', borderWidth: 1, marginBottom: 0}
                            : null,
                    ]}
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                />
                {lastName == '' ? <Text style={styles.errorLabel}>{lastNameError}</Text> : null}
                <Text style={styles.label}>EMAIL</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    editable={false}
                />
                <View style={{marginTop: 20}}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSave}
                    >
                        <Text style={styles.buttonText}>SAVE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    form: {
        padding: 20,
    },
    label: {
        color: '#7654F2',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#d4d4d4',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderColor: '#9C81FF',
        borderWidth: 2,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    buttonText: {
        color: '#7654F2',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorLabel: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10
    }
});
