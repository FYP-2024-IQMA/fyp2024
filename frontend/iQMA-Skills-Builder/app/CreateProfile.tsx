import {
    Text,
    View,
    Image,
    TextInput,
    Button,
    StyleSheet,
    Pressable,
    ActivityIndicator,
} from "react-native";
import { LoginButton } from "@/components/LoginButton";
import { LogoVisual } from "@/components/LogoVisual";
import { Profile } from "@/components/Profile";
import { CustomButton } from "@/components/CustomButton";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { router } from "expo-router";

export default function CreateProfile() {
    const { currentUser, isLoading } = useContext(AuthContext);

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>(currentUser.email || "");
    const [selectedAge, setAge] = useState<string>("");
    const [selectedGender, setGender] = useState<string>("");
    const [isContinue, setIsContinue] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);

    if (isLoading || !currentUser) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
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

    const age: { [key: string]: string } = {
        "18 - 24 years old": "Generation Z (18-24)",
        "25 - 40 years old": "Millennials (25-40)",
        "40 - 55 years old": "Generation X (40-55)",
        "55 - 75 years old": "Baby Boomers (55-75)",
    };
    const gender: string[] = ["Male", "Female", "Other"];

    const handlePress = async () => {
        console.log(selectedAge + selectedGender);
        console.log("TOKEN" + currentUser.sub);
        console.log(process.env.EXPO_PUBLIC_LOCALHOST_URL);

        const body = {
            userID: currentUser.sub,
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: "learner",
            age: selectedAge,
            gender: selectedGender,
            has_onboarded: "true",
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
                const url = `http://${process.env.EXPO_PUBLIC_LOCALHOST_URL}:3000/accounts/createaccount`;

                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });

                const data = await response.json();

                console.log("Created user account:", data);

                router.replace("/IntroductionMascot");
            } catch (error) {
                console.log("Error creating user account:", error);
            }
        }
    };

    return (
        <View
            style={{
                flex: 1,
                // justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                // backgroundColor: "#ff4500",
                padding: 20,
                gap: 20,
            }}
        >
            {/* <LoginButton></LoginButton> */}
            <Text style={styles.title}>Create your profile</Text>

            <TextInput
                style={{
                    borderWidth: 1,
                    borderColor: "#E5E5E5",
                    backgroundColor: "#F7F7F7",
                    borderRadius: 15,
                    padding: 10,
                    width: "100%",
                }}
                multiline={true}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />

            {!firstName && !isContinue && (
                <View style={{ flexDirection: "row" }}>
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
                    borderColor: "#E5E5E5",
                    backgroundColor: "#F7F7F7",
                    borderRadius: 15,
                    padding: 10,
                    width: "100%",
                }}
                multiline={true}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />

            {!lastName && !isContinue && (
                <View style={{ flexDirection: "row" }}>
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
                    borderColor: "#E5E5E5",
                    backgroundColor: "#F7F7F7",
                    borderRadius: 15,
                    padding: 10,
                    width: "100%",
                }}
                multiline={true}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            {!email && !isContinue && (
                <View style={{ flexDirection: "row" }}>
                    <View></View>
                    <View>
                        <Text style={[styles.errorText]}>
                            This field is required.
                        </Text>
                    </View>
                </View>
            )}

            {email && !isValidEmail && (
                <View style={{ flexDirection: "row" }}>
                    <View></View>
                    <View>
                        <Text style={[styles.errorText]}>
                            Email is invalid.
                        </Text>
                    </View>
                </View>
            )}

            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                    style={{
                        flex: 2.5,
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: "#E5E5E5",
                        backgroundColor: "#F7F7F7",
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
                                style={{ fontSize: 14 }}
                                key={key}
                                label={key}
                                value={age[key]}
                            />
                        ))}
                    </Picker>
                </View>
            </View>

            {!selectedAge && !isContinue && (
                <View style={{ flexDirection: "row" }}>
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
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        flex: 2.5,
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: "#E5E5E5",
                        backgroundColor: "#F7F7F7",
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
                                style={{ fontSize: 14 }}
                                key={value}
                                label={value}
                                value={value}
                            />
                        ))}
                    </Picker>
                </View>
            </View>

            {!selectedGender && !isContinue && (
                <View style={{ flexDirection: "row" }}>
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
                    By signing in to IQMA, you agree to our{" "}
                    <Text style={{ fontWeight: "bold" }}>Terms</Text> and{" "}
                    <Text style={{ fontWeight: "bold" }}>Privacy Policy</Text>.
                </Text>

                <Text style={styles.termsAndConditionTwo}>
                    This site is protected by reCAPTCHA Enterprise and the
                    Google{" "}
                    <Text style={{ fontWeight: "bold" }}>Privacy Policy</Text>{" "}
                    and{" "}
                    <Text style={{ fontWeight: "bold" }}>Terms of Service</Text>{" "}
                    apply.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 30,
    },
    button: {
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#7654F2",
        height: 40,
        width: "100%",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "bold",
    },
    defaultOptionText: {
        color: "#5C5776",
        fontSize: 14,
    },
    errorText: {
        color: "#ff4c4c",
    },
    termsAndConditionView: {
        padding: 10,
    },
    termsAndCondition: {
        textAlign: "center",
        color: "#AFAFAF",
    },
    termsAndConditionTwo: {
        textAlign: "center",
        color: "#AFAFAF",
        marginTop: 20,
    },
});
