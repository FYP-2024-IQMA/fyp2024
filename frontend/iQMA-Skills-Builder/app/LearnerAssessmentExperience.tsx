import React, {useState} from 'react';
import {router} from 'expo-router';
import {Image, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {ChatBubble} from '@/components/ChatBubble';
import {CustomButton} from '@/components/CustomButton';

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

    const handlePress = () => {
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
            router.push('LearnerAssessmentComplete');
        }
    };

    console.log(
        selectedAttitude,
        selectedMotivation,
        selectedBarriers,
        selectedPersonality,
        selectedReasons
    );

    return (
        <View style={{padding: 20, flex: 1, backgroundColor: '#FFFFFF'}}>
            <View style={{flexDirection: 'row'}}>
                <Image
                    style={{height: 100, width: 100, marginRight: 15}}
                    source={require('@/assets/images/mascot.png')}
                />
                <View style={{marginTop: 5}}>
                    <ChatBubble position="left">
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
                        style={{
                            flex: 2.3,
                            borderWidth: 1,
                            borderColor:
                                !isContinue && !selectedAttitude
                                    ? '#ff4c4c'
                                    : '#9CA3AF',
                            borderRadius: 10,
                        }}
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
                        style={{
                            flex: 2.3,
                            borderWidth: 1,
                            borderColor:
                                !isContinue && !selectedMotivation
                                    ? '#ff4c4c'
                                    : '#9CA3AF',
                            borderRadius: 10,
                        }}
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
                                onPress={() => toggleBarrierCheckbox(barrier)}
                                style={styles.checkboxContainer}
                            >
                                <View
                                    style={[
                                        styles.checkbox,
                                        selectedBarriers.includes(barrier) &&
                                            styles.checkedCheckbox,
                                        {
                                            borderColor:
                                                !isContinue &&
                                                !selectedBarriers.length
                                                    ? '#ff4c4c'
                                                    : '#9CA3AF',
                                        },
                                    ]}
                                >
                                    {selectedBarriers.includes(barrier) && (
                                        <Text style={styles.checkmark}>✓</Text>
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
                    <Text style={[styles.text, {flex: 1}]}>Personality</Text>
                    <View
                        style={{
                            flex: 2.3,
                            borderWidth: 1,
                            borderColor:
                                !isContinue && !selectedPersonality
                                    ? '#ff4c4c'
                                    : '#9CA3AF',
                            borderRadius: 10,
                        }}
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

            <View style={{marginTop: 20}}>
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
                                        {
                                            borderColor:
                                                !isContinue &&
                                                !selectedReasons.length
                                                    ? '#ff4c4c'
                                                    : '#9CA3AF',
                                        },
                                    ]}
                                >
                                    {selectedReasons.includes(reason) && (
                                        <Text style={styles.checkmark}>✓</Text>
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

            <View
                style={{
                    alignSelf: 'center',
                    marginTop: 10,
                }}
            >
                <CustomButton
                    label="continue"
                    backgroundColor="white"
                    onPressHandler={handlePress}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#7654F2',
        lineHeight: 20,
    },
    defaultOptionText: {
        color: '#5C5776',
        fontSize: 14,
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
        backgroundColor: '#7654F2',
        textAlign: 'center',
    },
    checkmark: {
        color: 'white',
    },
    errorText: {
        color: '#ff4c4c',
    },
});
