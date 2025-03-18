import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Dimensions,
} from 'react-native';
import React, {useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {ChatBubble} from '@/components/ChatBubble';
import {Colors} from '@/constants/Colors';
import {CustomButton} from '@/components/CustomButton';
import {Picker} from '@react-native-picker/picker';
import {router} from 'expo-router';

export default function AboutYou() {
    const [isContinue, setIsContinue] = useState(true);
    const [isScroll, setIsScroll] = useState<boolean>(false);

    const [ageGroup, setAgeGroup] = useState<string>('');
    const [jobLevel, setJobLevel] = useState<string>('');
    const [careerStage, setCareerStage] = useState<string>('');

    const screenHeight = Dimensions.get('window').height;

    const ageGroup_type: string[] = [
        'Baby Boomers (60-75+)',
        'Generation X (45-59)',
        'Millennials (30-44)',
        'Generation Z (18-29)',
        'Other',
    ];

    const jobLevel_type: string[] = [
        'Entry-level',
        'Mid-level',
        'Senior-level',
        'Executive',
        'Other',
    ];

    const careerStage_type: string[] = [
        'Starter',
        'Builder',
        'Accelerator',
        'Expert',
        'Other',
    ];

    const handlePress = async () => {
        if (!ageGroup || !jobLevel || !careerStage) {
            setIsContinue(false);
        } else {
            setIsContinue(true);
            await AsyncStorage.setItem('ageGroup', ageGroup);
            await AsyncStorage.setItem('jobLevel', jobLevel);
            await AsyncStorage.setItem('careerStage', careerStage);
            router.push('/signup_form/LearningStyleAndSkills');
        }
    };

    return (
        <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            style={styles.container}
            onContentSizeChange={(width, height) => {
                setIsScroll(height * 1.1 > screenHeight);
            }}
        >
            <View style={styles.insideContainer}>
                <View style={{flexDirection: 'row'}}>
                    <Image
                        style={styles.mascotImage}
                        source={require('@/assets/images/handsinpocket.png')}
                    />
                    <View style={{marginTop: 5}}>
                        <ChatBubble position="left" isUser={true}>
                            First off, tell me a little about yourself!
                        </ChatBubble>
                    </View>
                </View>
                <View style={{marginVertical: 20, gap: 20}}>
                    <View>
                        <Text style={[styles.text, {flex: 1}]}>Age Group</Text>
                        <View
                            style={{flexDirection: 'row', alignItems: 'center'}}
                        >
                            <View
                                style={[
                                    styles.selectOption,
                                    !isContinue && !ageGroup
                                        ? styles.wrongBorder
                                        : styles.correctBorder,
                                ]}
                            >
                                <Picker
                                    selectedValue={ageGroup}
                                    onValueChange={(itemValue: string) =>
                                        setAgeGroup(itemValue)
                                    }
                                >
                                    <Picker.Item
                                        style={styles.defaultOptionText}
                                        label="Select Age Group"
                                        value=""
                                        enabled={false}
                                    />
                                    {ageGroup_type.map((value) => (
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

                        <View
                            style={{flexDirection: 'row', alignItems: 'center'}}
                        >
                            <View>
                                {!ageGroup && !isContinue && (
                                    <Text style={[styles.errorText]}>
                                        This field is required.
                                    </Text>
                                )}
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={[styles.text, {flex: 1}]}>Job Level</Text>
                        <View>
                            <View
                                style={[
                                    styles.selectOption,
                                    !isContinue && !jobLevel
                                        ? styles.wrongBorder
                                        : styles.correctBorder,
                                ]}
                            >
                                <Picker
                                    selectedValue={jobLevel}
                                    onValueChange={(itemValue: string) =>
                                        setJobLevel(itemValue)
                                    }
                                >
                                    <Picker.Item
                                        style={styles.defaultOptionText}
                                        label="Select Job Level"
                                        value=""
                                        enabled={false}
                                    />
                                    {jobLevel_type.map((value) => (
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
                            <View>
                                {!jobLevel && !isContinue && (
                                    <Text style={[styles.errorText]}>
                                        This field is required.
                                    </Text>
                                )}
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={[styles.text, {flex: 1}]}>
                            Career Stage
                        </Text>
                        <View>
                            <View
                                style={[
                                    styles.selectOption,
                                    !isContinue && !careerStage
                                        ? styles.wrongBorder
                                        : styles.correctBorder,
                                ]}
                            >
                                <Picker
                                    selectedValue={careerStage}
                                    onValueChange={(itemValue: string) =>
                                        setCareerStage(itemValue)
                                    }
                                >
                                    <Picker.Item
                                        style={styles.defaultOptionText}
                                        label="Select Career Stage"
                                        value=""
                                        enabled={false}
                                    />
                                    {careerStage_type.map((value) => (
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
                            <View>
                                {!careerStage && !isContinue && (
                                    <Text style={[styles.errorText]}>
                                        This field is required.
                                    </Text>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <CustomButton
                label="continue"
                backgroundColor="white"
                isScroll={isScroll}
                onPressHandler={handlePress}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.background,
        padding: 20,
        flex: 1,
    },
    insideContainer: {
        flexGrow: 1,
        // margin: 20
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
        marginBottom: 10,
    },
    defaultOptionText: {
        color: Colors.default.optionText,
        fontSize: 14,
    },
    errorText: {
        color: Colors.border.wrongColor,
        marginTop: 10,
    },
});
