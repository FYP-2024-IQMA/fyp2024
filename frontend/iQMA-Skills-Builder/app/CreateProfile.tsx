import {
    ActivityIndicator,
    Button,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import {AuthContext} from '@/context/AuthContext';
import {Colors} from '@/constants/Colors';
import {CustomButton} from '@/components/CustomButton';
import {LoginButton} from '@/components/LoginButton';
import {LogoVisual} from '@/components/LogoVisual';
import {Picker} from '@react-native-picker/picker';
import {Profile} from '@/components/Profile';
import {router} from 'expo-router';
import {useContext} from 'react';
import {useState} from 'react';

export default function CreateProfile() {
    const {currentUser, isLoading} = useContext(AuthContext);

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>(currentUser.email || '');
    const [selectedAge, setAge] = useState<string>('');
    const [selectedGender, setGender] = useState<string>('');
    const [isContinue, setIsContinue] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);

    if (isLoading || !currentUser) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator size="large" color="#8A2BE2" />
            </View>
        );
    }

    const validateEmail = (email: string) => {
        // Regular expression for validating email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailRegex.test(email));
    };

    const age: {[key: string]: string} = {
        '18 - 24 years old': 'Generation Z (18-24)',
        '25 - 40 years old': 'Millennials (25-40)',
        '40 - 55 years old': 'Generation X (40-55)',
        '55 - 75 years old': 'Baby Boomers (55-75)',
    };
    const gender: string[] = ['Male', 'Female', 'Other'];

    const handlePress = async () => {
        console.log(selectedAge + selectedGender);

        const body = {
            userID: currentUser.sub,
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: 'learner',
            age: selectedAge,
            gender: selectedGender,
            has_onboarded: 'true',
            profilePic: currentUser.picture ? currentUser.picture : null,
        };

        if (
            !firstName ||
            !lastName ||
            !email ||
            !selectedAge ||
            !selectedGender ||
            !isValidEmail
        ) {
            validateEmail(email);
            setIsContinue(false);
        } else {
            setIsContinue(true);
            try {
                const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/accounts/createaccount`;

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(body),
                });

                const data = await response.json();

                console.log('Created user account:', data);

                router.replace('/IntroductionMascot');
            } catch (error) {
                console.log('Error creating user account:', error);
            }
        }
    };

    return (
        <ScrollView
            contentContainerStyle={{
                // flex: 1,
                // justifyContent: "center",
                alignItems: 'center',
                backgroundColor: Colors.light.background,
                // backgroundColor: "#ff4500",
                padding: 20,
                gap: 20,
                flexGrow: 1
            }}
        >
            {/* <LoginButton></LoginButton> */}
            <Text style={styles.title}>Create your profile</Text>

            <TextInput
                style={{
                    borderWidth: 1,
                    // borderColor: '#E5E5E5',
                    borderColor:
                        !isContinue && !firstName
                            ? Colors.border.wrongColor
                            : '#E5E5E5',
                    backgroundColor: Colors.profile.inputColor,
                    borderRadius: 10,
                    padding: 10,
                    width: '100%',
                }}
                multiline={true}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />

            {!firstName && !isContinue && (
                <View style={{flexDirection: 'row'}}>
                    <View></View>
                    <View>
                        <Text style={[styles.errorText]}>
                            This field is required.
                        </Text>
                    </View>
                </View>
            )}

            <TextInput
                style={{
                    borderWidth: 1,
                    // borderColor: '#E5E5E5',
                    borderColor:
                        !isContinue && !lastName
                            ? Colors.border.wrongColor
                            : '#E5E5E5',
                    backgroundColor: Colors.profile.inputColor,
                    borderRadius: 10,
                    padding: 10,
                    width: '100%',
                }}
                multiline={true}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />

            {!lastName && !isContinue && (
                <View style={{flexDirection: 'row'}}>
                    <View></View>
                    <View>
                        <Text style={[styles.errorText]}>
                            This field is required.
                        </Text>
                    </View>
                </View>
            )}

            <TextInput
                style={{
                    borderWidth: 1,
                    // borderColor: '#E5E5E5',
                    borderColor:
                        !isContinue && !email
                            ? Colors.border.wrongColor
                            : '#E5E5E5',
                    backgroundColor: Colors.profile.inputColor,
                    borderRadius: 10,
                    padding: 10,
                    width: '100%',
                }}
                multiline={true}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            {!email && !isContinue && (
                <View style={{flexDirection: 'row'}}>
                    <View></View>
                    <View>
                        <Text style={[styles.errorText]}>
                            This field is required.
                        </Text>
                    </View>
                </View>
            )}

            {email && !isValidEmail && (
                <View style={{flexDirection: 'row'}}>
                    <View></View>
                    <View>
                        <Text style={[styles.errorText]}>
                            Email is invalid.
                        </Text>
                    </View>
                </View>
            )}

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                    style={{
                        flex: 2.5,
                        borderWidth: 1,
                        borderRadius: 10,
                        // borderColor: '#E5E5E5',
                        borderColor:
                            !isContinue && !selectedAge
                                ? Colors.border.wrongColor
                                : '#E5E5E5',
                        backgroundColor: Colors.profile.inputColor,
                    }}
                >
                    <Picker
                        selectedValue={selectedAge}
                        onValueChange={(itemValue: string) => setAge(itemValue)}
                    >
                        <Picker.Item
                            style={styles.defaultOptionText}
                            label="Age"
                            value=""
                            enabled={false}
                        />
                        {Object.keys(age).map((key) => (
                            <Picker.Item
                                style={{fontSize: 14}}
                                key={key}
                                label={key}
                                value={age[key]}
                            />
                        ))}
                    </Picker>
                </View>
            </View>

            {!selectedAge && !isContinue && (
                <View style={{flexDirection: 'row'}}>
                    <View></View>
                    <View>
                        <Text style={[styles.errorText]}>
                            This field is required.
                        </Text>
                    </View>
                </View>
            )}

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        flex: 2.5,
                        borderWidth: 1,
                        borderRadius: 10,
                        // borderColor: '#E5E5E5',
                        borderColor:
                            !isContinue && !selectedGender
                                ? Colors.border.wrongColor
                                : '#E5E5E5',
                        backgroundColor: Colors.profile.inputColor,
                    }}
                >
                    <Picker
                        selectedValue={selectedGender}
                        onValueChange={(itemValue: string) =>
                            setGender(itemValue)
                        }
                    >
                        <Picker.Item
                            style={styles.defaultOptionText}
                            label="Select Gender"
                            value=""
                            enabled={false}
                        />
                        {gender.map((value) => (
                            <Picker.Item
                                style={{fontSize: 14}}
                                key={value}
                                label={value}
                                value={value}
                            />
                        ))}
                    </Picker>
                </View>
            </View>

            {!selectedGender && !isContinue && (
                <View style={{flexDirection: 'row'}}>
                    <View></View>
                    <View>
                        <Text style={[styles.errorText]}>
                            This field is required.
                        </Text>
                    </View>
                </View>
            )}

            <Pressable style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
            </Pressable>

            <View style={styles.termsAndConditionView}>
                <Text style={styles.termsAndCondition}>
                    By signing in to IQMA, you agree to our{' '}
                    <Text style={{fontWeight: 'bold'}}>Terms</Text> and{' '}
                    <Text style={{fontWeight: 'bold'}}>Privacy Policy</Text>.
                </Text>

                <Text style={styles.termsAndConditionTwo}>
                    This site is protected by reCAPTCHA Enterprise and the
                    Google{' '}
                    <Text style={{fontWeight: 'bold'}}>Privacy Policy</Text> and{' '}
                    <Text style={{fontWeight: 'bold'}}>Terms of Service</Text>{' '}
                    apply.
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 30,
    },
    button: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.default.purple500,
        // height: 40,
        width: '100%',
        padding: 10
    },
    buttonText: {
        color: Colors.light.background,
        fontSize: 12,
        fontWeight: 'bold',
    },
    defaultOptionText: {
        color: Colors.default.optionText,
        fontSize: Colors.default.optionFontSize,
    },
    errorText: {
        color: Colors.border.wrongColor,
    },
    termsAndConditionView: {
        padding: 10,
    },
    termsAndCondition: {
        textAlign: 'center',
        color: '#AFAFAF',
    },
    termsAndConditionTwo: {
        textAlign: 'center',
        color: '#AFAFAF',
        marginTop: 20,
    },
});
