import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, {useState} from 'react';

import {Colors} from '@/constants/Colors';
import {Picker} from '@react-native-picker/picker';

import {packageFeedback, sendFeedback} from '@/helpers/feedbackEndpoints';

// Define types for the component
type FeedbackComponentProps = {
    userID: string;
};

// onpress function
const handleFeedbackSubmit = async (
    eventType: string,
    userFeedback: string,
    selectedRating: number | null,
    userID: string
) => {
    try {
        // Step 1: Call the packageFeedback function to package the data
        const feedbackData = await packageFeedback(
            eventType,
            userFeedback,
            selectedRating,
            userID
        );

        // Step 2: Send the packaged feedback using the sendFeedback function
        const status = await sendFeedback(feedbackData);

        // Step 3: Check response status
        if (status === 200) {
            console.log('Feedback sent successfully!');
        } else {
            console.log('Failed to send feedback.');
        }
    } catch (error) {
        console.error('Error while submitting feedback:', error);
    }
};

const FeedbackComponent: React.FC<FeedbackComponentProps> = ({userID}) => {
    const [visible, setVisible] = useState<boolean>(false); // To toggle form visibility
    const [selectedOption, setSelectedOption] = useState<string>(''); // Dropdown state
    const [selectedRating, setSelectedRating] = useState<number | null>(null); // Rating state
    const [message, setMessage] = useState<string>(''); // Message based on dropdown
    const [userFeedback, setUserFeedback] = useState<string>(''); // Feedback state

    // Messages corresponding to dropdown options
    const customMessages: {[key: string]: string} = {
        feedback:
            "We're here to listen! Are your feedback about gamification techniques or the course content?",
        bug: "We're here to help! Are you reporting a bug related to the system functionality or a display issue?",
        suggestion:
            'We love hearing new ideas! Is your suggestion about improving the course or adding new features?',
    };

    const onDropdownChange = (itemValue: string) => {
        setSelectedOption(itemValue);
        setMessage(customMessages[itemValue] || ''); // Set custom message based on dropdown selection
    };

    const handleSubmit = async () => {
        await handleFeedbackSubmit(
            selectedOption,
            userFeedback,
            selectedRating,
            userID
        );
        setVisible(false);
        // clear everything
        setSelectedOption('');
        setSelectedRating(null);
        setMessage('');
    };

    const ratingFaces = ['😭', '😐', '😊', '😀'];

    return (
        <View style={styles.container}>
            {/* Floating Button */}
            <TouchableOpacity
                style={styles.bubble}
                onPress={() => setVisible(true)}
            >
                <Text style={styles.bubbleText}>🗳️</Text>
            </TouchableOpacity>

            {/* Modal for Form */}
            <Modal visible={visible} transparent={true} animationType="slide">
                <View style={styles.modalBackground}>
                    <View style={styles.formContainer}>
                        <Text style={styles.formTitle}>User Feedback Form</Text>

                        {/* Dropdown Field */}
                        <View style={styles.dropdownContainer}>
                            <Picker
                                selectedValue={selectedOption}
                                style={styles.dropdown}
                                onValueChange={(itemValue: string) =>
                                    onDropdownChange(itemValue)
                                }
                            >
                                <Picker.Item label="Select Type" value="" />
                                <Picker.Item
                                    label="Feedback"
                                    value="feedback"
                                />
                                <Picker.Item label="Bug Report" value="bug" />
                                <Picker.Item
                                    label="Suggestion"
                                    value="suggestion"
                                />
                            </Picker>
                        </View>

                        {/* Rating Field with Faces */}
                        <View style={styles.ratingContainer}>
                            {/* Render the rating faces */}
                            {ratingFaces.map((emoji, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setSelectedRating(index)} // Set selected rating
                                    style={[
                                        styles.faceContainer,
                                        selectedRating !== null &&
                                        selectedRating !== index
                                            ? styles.grayscale
                                            : {},
                                    ]}
                                >
                                    <Text style={styles.face}>{emoji}</Text>
                                    <Text style={styles.ratingNumber}>
                                        {index + 1}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Custom Message */}
                        {selectedOption ? (
                            <Text style={styles.customMessage}>{message}</Text>
                        ) : null}

                        {/* Text Input Field */}
                        <TextInput
                            style={styles.textInput}
                            placeholder="We value your inputs! Please share your feedback here."
                            multiline
                            onChangeText={(text) => setUserFeedback(text)}
                        />
                        <View style={styles.buttons}>
                            {/* Close Form Button */}
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setVisible(false)}
                            >
                                <Text style={styles.closeButtonText}>
                                    Close
                                </Text>
                            </TouchableOpacity>

                            {/* Submit Button */}
                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.closeButtonText}>
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    bubble: {
        alignItems: 'center',
        backgroundColor: Colors.default.purple100,
        borderRadius: 30,
        bottom: 20,
        width: 60,
        height: 60,
        justifyContent: 'center',
        left: 20,
        position: 'absolute',
        zIndex: 1000,
    },
    bubbleText: {
        color: Colors.chatbot.inputColor,
        fontSize: 30,
    },
    buttons: {
        flexDirection: 'row',
        gap: 20,
    },
    closeButton: {
        alignItems: 'center',
        backgroundColor: Colors.chatbot.inputColor,
        borderRadius: 5,
        marginTop: 10,
        padding: 10,
        height: 40,
        width: 100,
    },
    closeButtonText: {
        color: Colors.light.text,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    customMessage: {
        color: Colors.light.text,
        fontSize: 16,
        marginRight: 10,
        paddingLeft: 20,
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    dropdown: {
        color: Colors.light.text,
        height: 50,
        width: 200,
    },
    dropdownContainer: {
        borderWidth: 1, // Border width
        borderColor: Colors.default.purple500, // Custom border color
        borderRadius: 5, // Rounded corners
        overflow: 'hidden', // Ensures content doesn't overflow the border
        marginBottom: 10, // Space below the dropdown
    },
    grayscale: {
        // Apply grayscale filter
        opacity: 0.3, // Make the unselected emojis look like they are black and white
    },
    face: {
        fontSize: 30,
        marginHorizontal: 10,
    },
    faceContainer: {
        padding: 10, // Optional padding around the emoji
    },
    formContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        margin: 20,
    },
    formTitle: {
        color: Colors.default.purple500,
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    ratingNumber: {
        textAlign: 'center',
    },
    submitButton: {
        alignItems: 'center',
        backgroundColor: Colors.default.purple100,
        borderRadius: 5,
        marginTop: 10,
        padding: 10,
        height: 40,
        width: 100,
    },
    textInput: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        color: Colors.light.text,
        height: '25%',
        padding: 15,
        width: '90%',
        textAlignVertical: 'top',
        marginBottom: 20,
    },
});

export default FeedbackComponent;
