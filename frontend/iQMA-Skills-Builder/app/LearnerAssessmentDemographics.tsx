import React, { useState } from 'react';
import { router } from 'expo-router';
import { Image, View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ChatBubble } from '@/components/ChatBubble';
import { CustomButton } from "@/components/CustomButton";

export default function LearnerAssessmentDemographics() {
    const [selectedAge, setAge] = useState<string>('');
    const [selectedGender, setGender] = useState<string>('');
    const [selectedRace, setRace] = useState<string>('');
    const [ethnic, setEthnic] = useState<string>('');
    const [selectedJob, setJob] = useState<string>('');
    const [selectedLife, setLife] = useState<string>('');
    const [selectedCareer, setCareer] = useState<string>('');
    const [selectedNeed, setNeed] = useState<string>('');

    const age: { [key: string]: string } = {
        '18 - 24 years old': 'GenZ',
        '25 - 40 years old': 'Millennials',
        '40 - 55 years old': 'GenX',
        '55 - 75 years old': 'BabyBoomers'
    };
    const gender: string[] = ['Male', 'Female', 'Other'];
    const race: string[] = ['Caucasian', 'African American', 'Asian', 'Hispanic/Latino', 'Other'];
    const job: string[] = ['Entry-level', 'Mid-level', 'Senior-level', 'Executive'];
    const life: string[] = ['Early career', 'Mid-career', 'Late career', 'Retirement'];
    const career: string[] = ['Starter', 'Builder', 'Accelerator', 'Expert'];
    const need: string[] = ['None', 'Physical', 'Mental', 'Other'];

    console.log([selectedAge, selectedGender, selectedRace, ethnic, selectedJob, selectedLife, selectedCareer]);

    const handlePress = () => {
        router.push("LearnerAssessmentCognitive")
    };

    return (
        <View style={{ padding: 20, flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
                <Image style={{ height: 100, width: 100, marginRight: 15 }} source={require('@/assets/images/mascot.png')} />
                <View style={{ marginTop: 5 }}>
                    <ChatBubble position='left'>What are your demographics?</ChatBubble>
                </View>
            </View>

            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.text, { flex: 1 }]}>Age</Text>
                    <View style={{ flex: 3, borderWidth: 1, borderColor: '#9CA3AF', borderRadius: 10 }}>
                        <Picker
                            selectedValue={selectedAge}
                            onValueChange={(itemValue: string) => setAge(itemValue)}
                        >
                            <Picker.Item style={styles.defaultOptionText} label="Select Age" value="" enabled={false} />
                            {Object.keys(age).map((key) => (
                                <Picker.Item key={key} label={key} value={age[key]} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                    <Text style={[styles.text, { flex: 1 }]}>Gender</Text>
                    <View style={{ flex: 3, borderWidth: 1, borderColor: '#9CA3AF', borderRadius: 10 }}>
                        <Picker
                            selectedValue={selectedGender}
                            onValueChange={(itemValue: string) => setGender(itemValue)}
                        >
                            <Picker.Item style={styles.defaultOptionText} label="Select Gender" value="" enabled={false} />
                            {gender.map((value) => (
                                <Picker.Item key={value} label={value} value={value} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                    <Text style={[styles.text, { flex: 1 }]}>Race</Text>
                    <View style={{ flex: 3, borderWidth: 1, borderColor: '#9CA3AF', borderRadius: 10 }}>
                        <Picker
                            selectedValue={selectedRace}
                            onValueChange={(itemValue: string) => setRace(itemValue)}
                        >
                            <Picker.Item style={styles.defaultOptionText} label="Select Race" value="" enabled={false} />
                            {race.map((value) => (
                                <Picker.Item key={value} label={value} value={value} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                    <Text style={[styles.text, { flex: 1 }]}>Ethnic Group</Text>
                    <TextInput
                        style={{ 
                            flex: 3, 
                            borderWidth: 1,
                            borderColor: '#9CA3AF',
                            borderRadius: 10,
                            padding: 10,
                            textAlignVertical: 'top' 
                        }}
                        multiline={true}
                        numberOfLines={4}
                        value={ethnic}
                        onChangeText={setEthnic}
                        placeholder="Specify ethnic groups relevant to your region or organization"
                    />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                    <Text style={[styles.text, { flex: 1 }]}>Job Category</Text>
                    <View style={{ flex: 3, borderWidth: 1, borderColor: '#9CA3AF', borderRadius: 10 }}>
                        <Picker
                            selectedValue={selectedJob}
                            onValueChange={(itemValue: string) => setJob(itemValue)}
                        >
                            <Picker.Item style={styles.defaultOptionText} label="Select Job Category" value="" enabled={false} />
                            {job.map((value) => (
                                <Picker.Item key={value} label={value} value={value} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                    <Text style={[styles.text, { flex: 1 }]}>Life Stage</Text>
                    <View style={{ flex: 3, borderWidth: 1, borderColor: '#9CA3AF', borderRadius: 10 }}>
                        <Picker
                            selectedValue={selectedLife}
                            onValueChange={(itemValue: string) => setLife(itemValue)}
                        >
                            <Picker.Item style={styles.defaultOptionText} label="Select Life Stage" value="" enabled={false} />
                            {life.map((value) => (
                                <Picker.Item key={value} label={value} value={value} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                    <Text style={[styles.text, { flex: 1 }]}>Career Stage</Text>
                    <View style={{ flex: 3, borderWidth: 1, borderColor: '#9CA3AF', borderRadius: 10 }}>
                        <Picker
                            selectedValue={selectedCareer}
                            onValueChange={(itemValue: string) => setCareer(itemValue)}
                        >
                            <Picker.Item style={styles.defaultOptionText} label="Select Career Stage" value="" enabled={false} />
                            {career.map((value) => (
                                <Picker.Item key={value} label={value} value={value} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                    <Text style={[styles.text, { flex: 1 }]}>Special Needs</Text>
                    <View style={{ flex: 3, borderWidth: 1, borderColor: '#9CA3AF', borderRadius: 10 }}>
                        <Picker
                            selectedValue={selectedNeed}
                            onValueChange={(itemValue: string) => setNeed(itemValue)}
                        >
                            <Picker.Item style={styles.defaultOptionText} label="Select Special Needs" value="" enabled={false} />
                            {need.map((value) => (
                                <Picker.Item key={value} label={value} value={value} />
                            ))}
                        </Picker>
                    </View>
                </View>
            </View>

            <View style={{
                alignSelf: 'center',
                marginTop: 18
            }}>
                <CustomButton label="continue" backgroundColor="white" onPressHandler={handlePress}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#7654F2',
    },
    defaultOptionText: {
        color: '#5C5776'
    }
});