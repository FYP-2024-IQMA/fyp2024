import React, { useState } from 'react';
import { router } from 'expo-router';
import { Image, View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ChatBubble } from '@/components/ChatBubble';
import { CustomButton } from "@/components/CustomButton";

export default function LearnerAssessmentCognitive() {
    const [selectedEducation, setEducation] = useState<string>('');
    const [selectedLanguage, setLanguage] = useState<string>('');
    const [selectedLiteracy, setLiteracy] = useState<string>('');
    const [selectedLearning, setLearning] = useState<string>('');
    const [selectedSkill, setSkill] = useState<string>('');

    const education: string[] = ['High school or below', 'College', "Bachelor's degree", "Master's degree", 'Doctoral degree'];
    const language: string[] = ['Fluent', 'Proficient', 'Basic', 'None'];
    const literacy: string[] = ['Advanced', 'Intermediate', 'Basic', 'None'];
    const learning: string[] = ['Visual', 'Auditory', 'Kinesthetic', 'Reading/Writing'];

    console.log([selectedEducation, selectedLanguage, selectedLiteracy, selectedLearning, selectedSkill]);

    const handlePress = () => {
        router.push("LearnerAssessmentDynamics")
    };

    return (
        <View style={{ padding: 20, backgroundColor: "#FFFFFF" }}>
            <View style={{ flexDirection: 'row' }}>
                <Image style={{ height: 100, width: 100, marginRight: 15 }} source={require('@/assets/images/mascot.png')} />
                <View style={{ marginTop: 5 }}>
                    <ChatBubble position='left'>What cognitive abilities do you possess?</ChatBubble>
                </View>
            </View>

            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.text, { flex: 1 }]}>Education Level</Text>
                    <View style={{ flex: 2.5, borderWidth: 1, borderColor: '#9CA3AF', borderRadius: 10 }}>
                        <Picker
                            selectedValue={selectedEducation}
                            onValueChange={(itemValue: string) => setEducation(itemValue)}
                        >
                            <Picker.Item style={styles.defaultOptionText} label="Select Education Level" value="" enabled={false} />
                            {education.map((value) => (
                                <Picker.Item style={{fontSize: 14}} key={value} label={value} value={value} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                    <Text style={[styles.text, { flex: 1 }]}>Language Abilities</Text>
                    <View style={{ flex: 2.5, borderWidth: 1, borderColor: '#9CA3AF', borderRadius: 10 }}>
                        <Picker
                            selectedValue={selectedLanguage}
                            onValueChange={(itemValue: string) => setLanguage(itemValue)}
                        >
                            <Picker.Item style={styles.defaultOptionText} label="Select Language Abilities" value="" enabled={false} />
                            {language.map((value) => (
                                <Picker.Item style={{fontSize: 14}} key={value} label={value} value={value} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                    <Text style={[styles.text, { flex: 1 }]}>Literacy & Numeracy</Text>
                    <View style={{ flex: 2.5, borderWidth: 1, borderColor: '#9CA3AF', borderRadius: 10 }}>
                        <Picker
                            selectedValue={selectedLiteracy}
                            onValueChange={(itemValue: string) => setLiteracy(itemValue)}
                        >
                            <Picker.Item style={styles.defaultOptionText} label="Select Literacy & Numeracy Proficiency" value="" enabled={false} />
                            {literacy.map((value) => (
                                <Picker.Item style={{fontSize: 14}} key={value} label={value} value={value} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                    <Text style={[styles.text, { flex: 1 }]}>Learning{'\n'}Preferences</Text>
                    <View style={{ flex: 2.5, borderWidth: 1, borderColor: '#9CA3AF', borderRadius: 10 }}>
                        <Picker
                            selectedValue={selectedLearning}
                            onValueChange={(itemValue: string) => setLearning(itemValue)}
                        >
                            <Picker.Item style={styles.defaultOptionText} label="Select Learning Preferences" value="" enabled={false} />
                            {learning.map((value) => (
                                <Picker.Item style={{fontSize: 14}} key={value} label={value} value={value} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                    <Text style={[styles.text, { flex: 1 }]}>Prior Knowledge & Skills</Text>
                    <View style={{ flex: 2.5, borderWidth: 1, borderColor: '#9CA3AF', borderRadius: 10 }}>
                        <Picker
                            selectedValue={selectedSkill}
                            onValueChange={(itemValue: string) => setSkill(itemValue)}
                        >
                            <Picker.Item style={styles.defaultOptionText} label="Select Prior Knowledge & Skills" value="" enabled={false} />
                            {literacy.map((value) => (
                                <Picker.Item style={{fontSize: 14}} key={value} label={value} value={value} />
                            ))}
                        </Picker>
                    </View>
                </View>
            </View>

            <View style={{
                alignSelf: 'center',
                marginTop: 250
            }}>
                <CustomButton label="continue" backgroundColor="white" onPressHandler={handlePress}/>
            </View>
        </View>
    )
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
        fontSize: 14
    }
});