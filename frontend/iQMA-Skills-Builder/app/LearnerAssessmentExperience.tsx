import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {ChatBubble} from '@/components/ChatBubble';
import {Colors} from '@/constants/Colors';
import {CustomButton} from '@/components/CustomButton';
import {Picker} from '@react-native-picker/picker';
import {router} from 'expo-router';

export default function LearnerAssessmentExperience() {
    const [selectedAttitude, setAttitude] = useState<string>('');
    const [selectedMotivation, setMotivation] = useState<string>('');
    const [selectedBarriers, setBarriers] = useState<string[]>([]);
    const [selectedPersonality, setPersonality] = useState<string>('');
    const [selectedReasons, setReasons] = useState<string[]>([]);

    const attitude: string[] = ['Positive', 'Neutral', 'Negative'];
    const motivation: string[] = ['High', 'Medium', 'Low'];
    const barriers: string[] = [
        'Time',
        'Resources',
        'Accessibility',
        'Interest',
    ];
    const personality: string[] = ['Extroverted', 'Introverted', 'Ambivert'];
    const reasons: string[] = [
        'Career advancement',
        'Skill development',
        'Personal interest',
        'Requirement',
    ];

    const [isContinue, setIsContinue] = useState(true);

    const toggleBarrierCheckbox = (barrier: string) => {
        if (selectedBarriers.includes(barrier)) {
            setBarriers(selectedBarriers.filter((item) => item !== barrier));
        } else {
            setBarriers([...selectedBarriers, barrier]);
        }
    };

    const toggleReasonCheckbox = (reason: string) => {
        if (selectedReasons.includes(reason)) {
            setReasons(selectedReasons.filter((item) => item !== reason));
        } else {
            setReasons([...selectedReasons, reason]);
        }
    };

    const handlePress = async () => {
        if (
            !selectedAttitude ||
            !selectedMotivation ||
            !selectedBarriers ||
            !selectedPersonality ||
            !selectedReasons
        ) {
            setIsContinue(false);
        } else {
            setIsContinue(true);
            const attitude = await AsyncStorage.setItem(
                'attitude',
                selectedAttitude
            );
            const motivationalLevel = await AsyncStorage.setItem(
                'motivationalLevel',
                selectedMotivation
            );
            const barriers = await AsyncStorage.setItem(
                'barriers',
                JSON.stringify(selectedBarriers)
            );
            const personality = await AsyncStorage.setItem(
                'personality',
                selectedPersonality
            );
            const reasons = await AsyncStorage.setItem(
                'reasons',
                JSON.stringify(selectedReasons)
            );
            router.push('LearnerAssessmentComplete');
        }
    };

    return (
        <View style={styles.container}>
            <View style={{flexGrow: 1}}>
                <View style={{flexDirection: 'row'}}>
                    <Image
                        style={styles.mascotImage}
                        source={require('@/assets/images/handsinpocket.png')}
                    />
                    <View style={{marginTop: 5}}>
                        <ChatBubble position="left" isUser={true}>
                            What are some factors that affect your learning
                            experience?
                        </ChatBubble>
                    </View>
                </View>

                <View style={{marginTop: 20}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={[styles.text, {flex: 1}]}>
                            Learning {'\n'}Attitude
                        </Text>
                        <View
                            style={[
                                styles.selectOption,
                                !isContinue && !selectedAttitude
                                    ? styles.wrongBorder
                                    : styles.correctBorder,
                            ]}
                        >
                            <Picker
                                selectedValue={selectedAttitude}
                                onValueChange={(itemValue: string) =>
                                    setAttitude(itemValue)
                                }
                            >
                                <Picker.Item
                                    style={styles.defaultOptionText}
                                    label="Select Attitude Towards Learning"
                                    value=""
                                    enabled={false}
                                />
                                {attitude.map((value) => (
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
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}></View>
                    <View style={{flex: 2.3}}>
                        {!selectedAttitude && !isContinue && (
                            <Text style={[styles.errorText]}>
                                This field is required.
                            </Text>
                        )}
                    </View>
                </View>

                <View style={{marginTop: 20}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={[styles.text, {flex: 1}]}>
                            Motivational {'\n'}Level
                        </Text>
                        <View
                            style={[
                                styles.selectOption,
                                !isContinue && !selectedMotivation
                                    ? styles.wrongBorder
                                    : styles.correctBorder,
                            ]}
                        >
                            <Picker
                                selectedValue={selectedMotivation}
                                onValueChange={(itemValue: string) =>
                                    setMotivation(itemValue)
                                }
                            >
                                <Picker.Item
                                    style={styles.defaultOptionText}
                                    label="Select Motivational Level"
                                    value=""
                                    enabled={false}
                                />
                                {motivation.map((value) => (
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
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}></View>
                    <View style={{flex: 2.3}}>
                        {!selectedMotivation && !isContinue && (
                            <Text style={[styles.errorText]}>
                                This field is required.
                            </Text>
                        )}
                    </View>
                </View>

                <View style={{marginTop: 20}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.text, {flex: 1, marginTop: 5}]}>
                            Learning {'\n'}Barriers
                        </Text>
                        <View style={{flex: 2.3}}>
                            {barriers.map((barrier) => (
                                <TouchableOpacity
                                    key={barrier}
                                    onPress={() =>
                                        toggleBarrierCheckbox(barrier)
                                    }
                                    style={styles.checkboxContainer}
                                >
                                    <View
                                        style={[
                                            styles.checkbox,
                                            selectedBarriers.includes(
                                                barrier
                                            ) && styles.checkedCheckbox,
                                            !isContinue &&
                                            !selectedBarriers.length
                                                ? styles.wrongBorder
                                                : styles.correctBorder,
                                        ]}
                                    >
                                        {selectedBarriers.includes(barrier) && (
                                            <Text style={styles.checkmark}>
                                                ✓
                                            </Text>
                                        )}
                                    </View>
                                    <Text style={styles.defaultOptionText}>
                                        {barrier}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}></View>
                    <View style={{flex: 2.3}}>
                        {!isContinue && !selectedBarriers.length && (
                            <Text style={[styles.errorText]}>
                                This field is required.
                            </Text>
                        )}
                    </View>
                </View>

                <View style={{marginTop: 20}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={[styles.text, {flex: 1}]}>
                            Personality
                        </Text>
                        <View
                            style={[
                                styles.selectOption,
                                !isContinue && !selectedPersonality
                                    ? styles.wrongBorder
                                    : styles.correctBorder,
                            ]}
                        >
                            <Picker
                                selectedValue={selectedPersonality}
                                onValueChange={(itemValue: string) =>
                                    setPersonality(itemValue)
                                }
                            >
                                <Picker.Item
                                    style={styles.defaultOptionText}
                                    label="Select Personality"
                                    value=""
                                    enabled={false}
                                />
                                {personality.map((value) => (
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
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}></View>
                    <View style={{flex: 2.3}}>
                        {!selectedPersonality && !isContinue && (
                            <Text style={[styles.errorText]}>
                                This field is required.
                            </Text>
                        )}
                    </View>
                </View>

                <View style={{marginVertical: 20}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.text, {flex: 1, marginTop: 5}]}>
                            Reasons For {'\n'}Attending Course
                        </Text>
                        <View style={{flex: 2.3}}>
                            {reasons.map((reason) => (
                                <TouchableOpacity
                                    key={reason}
                                    onPress={() => toggleReasonCheckbox(reason)}
                                    style={styles.checkboxContainer}
                                >
                                    <View
                                        style={[
                                            styles.checkbox,
                                            selectedReasons.includes(reason) &&
                                                styles.checkedCheckbox,
                                            !isContinue &&
                                            !selectedReasons.length
                                                ? styles.wrongBorder
                                                : styles.correctBorder,
                                        ]}
                                    >
                                        {selectedReasons.includes(reason) && (
                                            <Text style={styles.checkmark}>
                                                ✓
                                            </Text>
                                        )}
                                    </View>
                                    <Text style={styles.defaultOptionText}>
                                        {reason}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}></View>
                    <View style={{flex: 2.3}}>
                        {!isContinue && !selectedReasons.length && (
                            <Text style={[styles.errorText]}>
                                This field is required.
                            </Text>
                        )}
                    </View>
                </View>
            </View>

            <CustomButton
                label="continue"
                backgroundColor="white"
                onPressHandler={handlePress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.background,
        padding: 20,
        flex: 1,
    },
    mascotImage: {
        height: 150,
        width: 50,
        marginRight: 40,
        marginLeft: 20,
    },
    selectOption: {
        flex: 2.3,
        borderWidth: 1,
        borderRadius: 10,
    },
    alignOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    correctBorder: {
        borderColor: Colors.border.correctColor,
    },
    wrongBorder: {
        borderColor: Colors.border.wrongColor,
    },
    textInputStyle: {
        flex: 2.3,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        textAlignVertical: 'top',
    },
    text: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: Colors.default.purple500,
        lineHeight: Colors.learnerAssessment.lineHeight,
    },
    defaultOptionText: {
        color: Colors.default.optionText,
        fontSize: Colors.default.optionFontSize,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checkedCheckbox: {
        backgroundColor: Colors.default.purple500,
        textAlign: 'center',
    },
    checkmark: {
        color: 'white',
    },
    errorText: {
        color: Colors.border.wrongColor,
    },
});
