import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {ChatBubble} from '@/components/ChatBubble';
import {Colors} from '@/constants/Colors';
import {CustomButton} from '@/components/CustomButton';
import {Picker} from '@react-native-picker/picker';
import {router} from 'expo-router';

export default function LearningStyleAndSkills() {
    const [isContinue, setIsContinue] = useState(true);
    const [isScroll, setIsScroll] = useState<boolean>(false);

    const [educationLevel, setEducationLevel] = useState<string>('');
    const [selectedPreferredLearningStyles, setPreferredLearningStyles] =
        useState<string[]>([]);
    const [currentSkillLevelInLeadership, setCurrentSkillLevelInLeadership] =
        useState<string>('');

    const screenHeight = Dimensions.get('window').height;

    const educationLevel_type: string[] = [
        'High school',
        'Bachelor’s',
        'Master’s',
        'Doctorate',
        'Other',
    ];

    const learningStyles_type: string[] = [
        'Watching videos or visuals',
        'Listening to audio or podcasts',
        'Hands-on practice',
        'Reading or writing',
        'Other',
    ];

    const currentSkillLevelInLeadership_type: string[] = [
        'Beginner',
        'Intermediate',
        'Advanced',
        'Other',
    ];

    const toggleLearningStyleCheckbox = (learningStyle: string) => {
        if (selectedPreferredLearningStyles.includes(learningStyle)) {
            setPreferredLearningStyles(
                selectedPreferredLearningStyles.filter(
                    (item) => item !== learningStyle
                )
            );
        } else {
            setPreferredLearningStyles([
                ...selectedPreferredLearningStyles,
                learningStyle,
            ]);
        }
    };

    const handlePress = async () => {
        if (
            !educationLevel ||
            selectedPreferredLearningStyles.length === 0 ||
            !currentSkillLevelInLeadership
        ) {
            setIsContinue(false);
        } else {
            setIsContinue(true);
            await AsyncStorage.setItem('educationLevel', educationLevel);
            await AsyncStorage.setItem(
                'preferredLearningStyles',
                JSON.stringify(selectedPreferredLearningStyles)
            );
            await AsyncStorage.setItem(
                'currentSkillLevelInLeadership',
                currentSkillLevelInLeadership
            );
            router.push('/signup_form/SocialAndTechHabits');
        }
    };

    return (
        <ScrollView
            contentContainerStyle={{flexGrow: 1, padding: 20}}
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
                            What's your learning style and skills?
                        </ChatBubble>
                    </View>
                </View>

                <View style={{marginVertical: 20, gap: 20}}>
                    <View>
                        <Text style={[styles.text, {flex: 1}]}>
                            Education Level
                        </Text>
                        <View
                            style={{flexDirection: 'row', alignItems: 'center'}}
                        >
                            <View
                                style={[
                                    styles.selectOption,
                                    !isContinue && !educationLevel
                                        ? styles.wrongBorder
                                        : styles.correctBorder,
                                ]}
                            >
                                <Picker
                                    selectedValue={educationLevel}
                                    onValueChange={(itemValue: string) =>
                                        setEducationLevel(itemValue)
                                    }
                                >
                                    <Picker.Item
                                        style={styles.defaultOptionText}
                                        label="Select Education Level"
                                        value=""
                                        enabled={false}
                                    />
                                    {educationLevel_type.map((value) => (
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

                        <View>
                            {!educationLevel && !isContinue && (
                                <Text style={[styles.errorText]}>
                                    This field is required.
                                </Text>
                            )}
                        </View>
                    </View>

                    <View>
                        <View>
                            <Text style={[styles.text, {flex: 1}]}>
                                Preferred Learning Style
                            </Text>
                        </View>

                        <View style={[styles.alignCheckBox]}>
                            {learningStyles_type.map((learningStyle) => (
                                <TouchableOpacity
                                    key={learningStyle}
                                    onPress={() =>
                                        toggleLearningStyleCheckbox(
                                            learningStyle
                                        )
                                    }
                                    style={[styles.checkboxContainer]}
                                >
                                    <View
                                        style={[
                                            styles.checkbox,
                                            selectedPreferredLearningStyles.includes(
                                                learningStyle
                                            ) && styles.checkedCheckbox,
                                            !isContinue &&
                                            !selectedPreferredLearningStyles.length
                                                ? styles.wrongBorder
                                                : styles.correctBorder,
                                        ]}
                                    >
                                        {selectedPreferredLearningStyles.includes(
                                            learningStyle
                                        ) && (
                                            <Text style={styles.checkmark}>
                                                ✓
                                            </Text>
                                        )}
                                    </View>
                                    <Text style={styles.defaultOptionText}>
                                        {learningStyle}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {selectedPreferredLearningStyles.length === 0 &&
                            !isContinue && (
                                <View>
                                    <Text style={[styles.errorText]}>
                                        This field is required.
                                    </Text>
                                </View>
                            )}
                    </View>

                    <View>
                        <Text style={[styles.text, {flex: 1}]}>
                            Current Skill Level in Leadership
                        </Text>
                        <View>
                            <View
                                style={[
                                    styles.selectOption,
                                    !isContinue &&
                                    !currentSkillLevelInLeadership
                                        ? styles.wrongBorder
                                        : styles.correctBorder,
                                ]}
                            >
                                <Picker
                                    selectedValue={
                                        currentSkillLevelInLeadership
                                    }
                                    onValueChange={(itemValue: string) =>
                                        setCurrentSkillLevelInLeadership(
                                            itemValue
                                        )
                                    }
                                >
                                    <Picker.Item
                                        style={styles.defaultOptionText}
                                        label="Select Career Stage"
                                        value=""
                                        enabled={false}
                                    />
                                    {currentSkillLevelInLeadership_type.map(
                                        (value) => (
                                            <Picker.Item
                                                style={{fontSize: 14}}
                                                key={value}
                                                label={value}
                                                value={value}
                                            />
                                        )
                                    )}
                                </Picker>
                            </View>
                        </View>

                        {!currentSkillLevelInLeadership && !isContinue && (
                            <View>
                                <Text style={[styles.errorText]}>
                                    This field is required.
                                </Text>
                            </View>
                        )}
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
    alignCheckBox: {
        flexDirection: 'column',
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
});
