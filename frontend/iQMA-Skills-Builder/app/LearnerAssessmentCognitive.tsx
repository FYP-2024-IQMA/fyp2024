import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {ChatBubble} from '@/components/ChatBubble';
import {CustomButton} from '@/components/CustomButton';
import {Picker} from '@react-native-picker/picker';
import {router} from 'expo-router';

export default function LearnerAssessmentCognitive() {
    const [selectedEducation, setEducation] = useState<string>('');
    const [selectedLanguage, setLanguage] = useState<string>('');
    const [selectedLiteracy, setLiteracy] = useState<string>('');
    const [selectedLearning, setLearning] = useState<string>('');
    const [selectedSkill, setSkill] = useState<string>('');

    const education: string[] = [
        'High school or below',
        'Some college',
        "Bachelor's degree",
        "Master's degree",
        'Doctoral degree',
    ];
    const language: string[] = ['Fluent', 'Proficient', 'Basic', 'None'];
    const literacy: string[] = ['Advanced', 'Intermediate', 'Basic', 'None'];
    const learning: string[] = [
        'Visual',
        'Auditory',
        'Kinesthetic',
        'Reading/Writing',
    ];

    const [isContinue, setIsContinue] = useState(true);

    const handlePress = async () => {
        if (
            !selectedEducation ||
            !selectedLanguage ||
            !selectedLiteracy ||
            !selectedLearning ||
            !selectedSkill
        ) {
            setIsContinue(false);
        } else {
            setIsContinue(true);
            const educationalLevel = await AsyncStorage.setItem(
                'educationalLevel',
                selectedEducation
            );
            const languageAbilities = await AsyncStorage.setItem(
                'languageAbilities',
                selectedLanguage
            );
            const litNumProficiency = await AsyncStorage.setItem(
                'litNumProficiency',
                selectedLiteracy
            );
            const learningPreferences = await AsyncStorage.setItem(
                'learningPreferences',
                selectedLearning
            );
            const priorKnowledge = await AsyncStorage.setItem(
                'priorKnowledge',
                selectedSkill
            );
            router.push('LearnerAssessmentDynamics');
        }
    };

    return (
        <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            style={styles.container}
        >
            <View style={{flexGrow: 1}}>
                <View style={{flexDirection: 'row'}}>
                    <Image
                        style={styles.mascotImage}
                        source={require('@/assets/images/handsinpocket.png')}
                    />
                    <View style={{marginTop: 5}}>
                        <ChatBubble position="left" isUser={true}>
                            What cognitive abilities do you possess?
                        </ChatBubble>
                    </View>
                </View>

                <View style={{marginVertical: 20}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={[styles.text, {flex: 1}]}>
                            Education Level
                        </Text>
                        <View
                            style={[
                                styles.selectOption,
                                !isContinue && !selectedEducation
                                    ? styles.wrongBorder
                                    : styles.correctBorder,
                            ]}
                        >
                            <Picker
                                selectedValue={selectedEducation}
                                onValueChange={(itemValue: string) =>
                                    setEducation(itemValue)
                                }
                            >
                                <Picker.Item
                                    style={styles.defaultOptionText}
                                    label="Select Education Level"
                                    value=""
                                    enabled={false}
                                />
                                {education.map((value) => (
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
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}></View>
                        <View style={{flex: 2.5}}>
                            {!selectedEducation && !isContinue && (
                                <Text style={[styles.errorText]}>
                                    This field is required.
                                </Text>
                            )}
                        </View>
                    </View>

                    <View style={styles.alignOption}>
                        <Text style={[styles.text, {flex: 1}]}>
                            Language Abilities
                        </Text>
                        <View
                            style={[
                                styles.selectOption,
                                !isContinue && !selectedLanguage
                                    ? styles.wrongBorder
                                    : styles.correctBorder,
                            ]}
                        >
                            <Picker
                                selectedValue={selectedLanguage}
                                onValueChange={(itemValue: string) =>
                                    setLanguage(itemValue)
                                }
                            >
                                <Picker.Item
                                    style={styles.defaultOptionText}
                                    label="Select Language Abilities"
                                    value=""
                                    enabled={false}
                                />
                                {language.map((value) => (
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
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}></View>
                        <View style={{flex: 2.5}}>
                            {!selectedLanguage && !isContinue && (
                                <Text style={[styles.errorText]}>
                                    This field is required.
                                </Text>
                            )}
                        </View>
                    </View>

                    <View style={styles.alignOption}>
                        <Text style={[styles.text, {flex: 1}]}>
                            Literacy & Numeracy
                        </Text>
                        <View
                            style={[
                                styles.selectOption,
                                !isContinue && !selectedLiteracy
                                    ? styles.wrongBorder
                                    : styles.correctBorder,
                            ]}
                        >
                            <Picker
                                selectedValue={selectedLiteracy}
                                onValueChange={(itemValue: string) =>
                                    setLiteracy(itemValue)
                                }
                            >
                                <Picker.Item
                                    style={styles.defaultOptionText}
                                    label="Select Literacy & Numeracy Proficiency"
                                    value=""
                                    enabled={false}
                                />
                                {literacy.map((value) => (
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
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}></View>
                        <View style={{flex: 2.5}}>
                            {!selectedLiteracy && !isContinue && (
                                <Text style={[styles.errorText]}>
                                    This field is required.
                                </Text>
                            )}
                        </View>
                    </View>

                    <View style={styles.alignOption}>
                        <Text style={[styles.text, {flex: 1}]}>
                            Learning{'\n'}Preferences
                        </Text>
                        <View
                            style={[
                                styles.selectOption,
                                !isContinue && !selectedLearning
                                    ? styles.wrongBorder
                                    : styles.correctBorder,
                            ]}
                        >
                            <Picker
                                selectedValue={selectedLearning}
                                onValueChange={(itemValue: string) =>
                                    setLearning(itemValue)
                                }
                            >
                                <Picker.Item
                                    style={styles.defaultOptionText}
                                    label="Select Learning Preferences"
                                    value=""
                                    enabled={false}
                                />
                                {learning.map((value) => (
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
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}></View>
                        <View style={{flex: 2.5}}>
                            {!selectedLearning && !isContinue && (
                                <Text style={[styles.errorText]}>
                                    This field is required.
                                </Text>
                            )}
                        </View>
                    </View>

                    <View style={styles.alignOption}>
                        <Text style={[styles.text, {flex: 1}]}>
                            Prior Knowledge & Skills
                        </Text>
                        <View
                            style={[
                                styles.selectOption,
                                !isContinue && !selectedSkill
                                    ? styles.wrongBorder
                                    : styles.correctBorder,
                            ]}
                        >
                            <Picker
                                selectedValue={selectedSkill}
                                onValueChange={(itemValue: string) =>
                                    setSkill(itemValue)
                                }
                            >
                                <Picker.Item
                                    style={styles.defaultOptionText}
                                    label="Select Prior Knowledge & Skills"
                                    value=""
                                    enabled={false}
                                />
                                {literacy.map((value) => (
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
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}></View>
                        <View style={{flex: 2.5}}>
                            {!selectedSkill && !isContinue && (
                                <Text style={[styles.errorText]}>
                                    This field is required.
                                </Text>
                            )}
                        </View>
                    </View>
                </View>
            </View>

            <CustomButton
                label="continue"
                backgroundColor="white"
                onPressHandler={handlePress}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
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
        flex: 2.5,
        borderWidth: 1,
        borderRadius: 10,
    },
    alignOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    correctBorder: {
        borderColor: '#9CA3AF',
    },
    wrongBorder: {
        borderColor: '#ff4c4c',
    },
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
    errorText: {
        color: '#ff4c4c',
    },
});
