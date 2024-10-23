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

import { packageFeedback, sendFeedback } from '@/helpers/feedbackEndpoints';

// Define types for the component
type FeedbackComponentProps = {
    userID: string;
};

// onpress function
const handleFeedbackSubmit = async (
    userID: string,
    eventType: string,
    selectedRating: number | null,
    userFeedback: string
  ) => {
    try {
      // Step 1: Call the packageFeedback function to package the data
      const feedbackData = await packageFeedback(userID, eventType, selectedRating, userFeedback);
  
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


const FeedbackComponent: React.FC<FeedbackComponentProps> = ({ userID }) => {
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
                                    <Text>{index + 1}</Text>
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
                        {/* Submit Button */}
                        <TouchableOpacity
                            style={styles.closeButton}
                        onPress={async () => {await handleFeedbackSubmit(userID, selectedOption, selectedRating, userFeedback); setVisible(false);}}>
                            <Text style={styles.closeButtonText}>Submit</Text>
                        </TouchableOpacity>

                        {/* Close Form Button */}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
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
    closeButton: {
        backgroundColor: '#C3B1FF',
        borderRadius: 5,
        marginTop: 10,
        padding: 10,
    },
    closeButtonText: {
        color: '#7654F2',
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
        paddingVertical: 5,
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
        fontSize: 18,
        marginBottom: 10,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    textInput: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        color: Colors.light.text,
        height: 100,
        marginVertical: 20,
        marginRight: 10,
        paddingHorizontal: 10,
        paddingLeft: 20,
        width: 300,
    },
});

export default FeedbackComponent;
