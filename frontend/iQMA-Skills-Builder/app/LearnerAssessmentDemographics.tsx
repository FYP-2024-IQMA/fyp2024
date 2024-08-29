import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import React, {useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {ChatBubble} from '@/components/ChatBubble';
import {CustomButton} from '@/components/CustomButton';
import {Picker} from '@react-native-picker/picker';
import {router} from 'expo-router';

export default function LearnerAssessmentDemographics() {
    const [selectedRace, setRace] = useState<string>('');
    const [ethnic, setEthnic] = useState<string>('');
    const [selectedJob, setJob] = useState<string>('');
    const [selectedLife, setLife] = useState<string>('');
    const [selectedCareer, setCareer] = useState<string>('');
    const [selectedNeed, setNeed] = useState<string>('');
    const [isContinue, setIsContinue] = useState(true);

    const race: string[] = [
        'Caucasian',
        'African American',
        'Asian',
        'Hispanic/Latino',
        'Other',
    ];
    const job: string[] = [
        'Entry-level',
        'Mid-level',
        'Senior-level',
        'Executive',
    ];
    const life: string[] = [
        'Early career',
        'Mid-career',
        'Late career',
        'Retirement',
    ];
    const career: string[] = ['Starter', 'Builder', 'Accelerator', 'Expert'];
    const need: string[] = ['None', 'Physical', 'Mental', 'Other'];

    const handlePress = async () => {
        if (
            !selectedRace ||
            !ethnic ||
            !selectedJob ||
            !selectedLife ||
            !selectedCareer ||
            !selectedNeed
        ) {
            setIsContinue(false);
        } else {
            setIsContinue(true);
            const race = await AsyncStorage.setItem('race', selectedRace);
            const ethnicGroup = await AsyncStorage.setItem(
                'ethnicGroup',
                ethnic
            );
            const jobCategory = await AsyncStorage.setItem(
                'jobCategory',
                selectedJob
            );
            const lifeStage = await AsyncStorage.setItem(
                'lifeStage',
                selectedLife
            );
            const careerStage = await AsyncStorage.setItem(
                'careerStage',
                selectedCareer
            );
            const specialNeeds = await AsyncStorage.setItem(
                'specialNeeds',
                selectedNeed
            );
            router.push('LearnerAssessmentCognitive');
        }
    };

    return (
        <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            style={{padding: 20, flex: 1, backgroundColor: '#FFFFFF'}}
        >
            <View style={{flexDirection: 'row'}}>
                <Image
                    style={{height: 100, width: 100, marginRight: 15}}
                    source={require('@/assets/images/mascot.png')}
                />
                <View style={{marginTop: 5}}>
                    <ChatBubble isUser={true} position="left">
                        What are your demographics?
                    </ChatBubble>
                </View>
            </View>

            <View style={{marginTop: 20}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[styles.text, {flex: 1}]}>Race</Text>
                    <View
                        style={{
                            flex: 2.5,
                            borderWidth: 1,
                            borderColor:
                                !isContinue && !selectedRace
                                    ? '#ff4c4c'
                                    : '#9CA3AF',
                            borderRadius: 10,
                        }}
                    >
                        <Picker
                            selectedValue={selectedRace}
                            onValueChange={(itemValue: string) =>
                                setRace(itemValue)
                            }
                        >
                            <Picker.Item
                                style={styles.defaultOptionText}
                                label="Select Race"
                                value=""
                                enabled={false}
                            />
                            {race.map((value) => (
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
                        {!selectedRace && !isContinue && (
                            <Text style={[styles.errorText]}>
                                This field is required.
                            </Text>
                        )}
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 12,
                    }}
                >
                    <Text style={[styles.text, {flex: 1}]}>
                        Ethnic{'\n'}Group
                    </Text>
                    <TextInput
                        style={{
                            flex: 2.3,
                            borderWidth: 1,
                            borderColor:
                                !isContinue && !ethnic ? '#ff4c4c' : '#9CA3AF',
                            borderRadius: 10,
                            padding: 10,
                            textAlignVertical: 'top',
                        }}
                        multiline={true}
                        numberOfLines={4}
                        value={ethnic}
                        onChangeText={setEthnic}
                        placeholder="Specify ethnic groups relevant to your region or organization"
                    />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}></View>
                    <View style={{flex: 2.5}}>
                        {!ethnic && !isContinue && (
                            <Text style={[styles.errorText]}>
                                This field is required.
                            </Text>
                        )}
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 12,
                    }}
                >
                    <Text style={[styles.text, {flex: 1}]}>
                        Job{'\n'}Category
                    </Text>
                    <View
                        style={{
                            flex: 2.5,
                            borderWidth: 1,
                            borderColor:
                                !isContinue && !selectedJob
                                    ? '#ff4c4c'
                                    : '#9CA3AF',
                            borderRadius: 10,
                        }}
                    >
                        <Picker
                            selectedValue={selectedJob}
                            onValueChange={(itemValue: string) =>
                                setJob(itemValue)
                            }
                        >
                            <Picker.Item
                                style={styles.defaultOptionText}
                                label="Select Job Category"
                                value=""
                                enabled={false}
                            />
                            {job.map((value) => (
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
                        {!selectedJob && !isContinue && (
                            <Text style={[styles.errorText]}>
                                This field is required.
                            </Text>
                        )}
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 12,
                    }}
                >
                    <Text style={[styles.text, {flex: 1}]}>
                        Life{'\n'}Stage
                    </Text>
                    <View
                        style={{
                            flex: 2.5,
                            borderWidth: 1,
                            borderColor:
                                !isContinue && !selectedLife
                                    ? '#ff4c4c'
                                    : '#9CA3AF',
                            borderRadius: 10,
                        }}
                    >
                        <Picker
                            selectedValue={selectedLife}
                            onValueChange={(itemValue: string) =>
                                setLife(itemValue)
                            }
                        >
                            <Picker.Item
                                style={styles.defaultOptionText}
                                label="Select Life Stage"
                                value=""
                                enabled={false}
                            />
                            {life.map((value) => (
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
                        {!selectedLife && !isContinue && (
                            <Text style={[styles.errorText]}>
                                This field is required.
                            </Text>
                        )}
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 12,
                    }}
                >
                    <Text style={[styles.text, {flex: 1}]}>
                        Career{'\n'}Stage
                    </Text>
                    <View
                        style={{
                            flex: 2.5,
                            borderWidth: 1,
                            borderColor:
                                !isContinue && !selectedCareer
                                    ? '#ff4c4c'
                                    : '#9CA3AF',
                            borderRadius: 10,
                        }}
                    >
                        <Picker
                            selectedValue={selectedCareer}
                            onValueChange={(itemValue: string) =>
                                setCareer(itemValue)
                            }
                        >
                            <Picker.Item
                                style={styles.defaultOptionText}
                                label="Select Career Stage"
                                value=""
                                enabled={false}
                            />
                            {career.map((value) => (
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
                        {!selectedCareer && !isContinue && (
                            <Text style={[styles.errorText]}>
                                This field is required.
                            </Text>
                        )}
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 12,
                    }}
                >
                    <Text style={[styles.text, {flex: 1}]}>
                        Special{'\n'}Needs
                    </Text>
                    <View
                        style={{
                            flex: 2.5,
                            borderWidth: 1,
                            borderColor:
                                !isContinue && !selectedNeed
                                    ? '#ff4c4c'
                                    : '#9CA3AF',
                            borderRadius: 10,
                        }}
                    >
                        <Picker
                            selectedValue={selectedNeed}
                            onValueChange={(itemValue: string) =>
                                setNeed(itemValue)
                            }
                        >
                            <Picker.Item
                                style={styles.defaultOptionText}
                                label="Select Special Needs"
                                value=""
                                enabled={false}
                            />
                            {need.map((value) => (
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
                        {!selectedNeed && !isContinue && (
                            <Text style={[styles.errorText]}>
                                This field is required.
                            </Text>
                        )}
                    </View>
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
        </ScrollView>
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
    errorText: {
        color: '#ff4c4c',
    },
});
