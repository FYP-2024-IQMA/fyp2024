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

export default function Motivation() {
    const [isContinue, setIsContinue] = useState(true);
    const [isScroll, setIsScroll] = useState<boolean>(false);

    // const [motivation, setMotivation] = useState<string>('');
    const [selectedMotivations, setMotivations] = useState<string[]>([]);
    const [learningMotivation, setLearningMotivation] = useState<string>('');

    const screenHeight = Dimensions.get('window').height;

    const toggleMotivationCheckbox = (motivation: string) => {
        if (selectedMotivations.includes(motivation)) {
            setMotivations(
                selectedMotivations.filter((item) => item !== motivation)
            );
        } else {
            setMotivations([...selectedMotivations, motivation]);
        }
    };

    const motivation_type: string[] = [
        'Career growth',
        'Skill development',
        'Personal interest',
        'Other',
    ];

    const learningMotivation_type: string[] = [
        'High',
        'Medium',
        'Low',
        'Other',
    ];

    const handlePress = async () => {
        if (selectedMotivations.length === 0 || !learningMotivation) {
            setIsContinue(false);
        } else {
            setIsContinue(true);
            await AsyncStorage.setItem(
                'motivations',
                JSON.stringify(selectedMotivations)
            );
            await AsyncStorage.setItem(
                'learningMotivation',
                learningMotivation
            );
            router.push('/signup_form/FormComplete');
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
                            Tell me about your motivation
                        </ChatBubble>
                    </View>
                </View>

                <View style={{marginVertical: 20, gap: 20}}>
                    <View>

                        <View>
                            <View>
                                <Text
                                    style={[
                                        styles.text,
                                        {flex: 1, marginTop: 5},
                                    ]}
                                >
                                    Why are you here?
                                </Text>
                                <View style={styles.alignCheckBox}>
                                    {motivation_type.map((motivation) => (
                                        <TouchableOpacity
                                            key={motivation}
                                            onPress={() =>
                                                toggleMotivationCheckbox(
                                                    motivation
                                                )
                                            }
                                            style={styles.checkboxContainer}
                                        >
                                            <View
                                                style={[
                                                    styles.checkbox,
                                                    selectedMotivations.includes(
                                                        motivation
                                                    ) && styles.checkedCheckbox,
                                                    !isContinue &&
                                                    !selectedMotivations.length
                                                        ? styles.wrongBorder
                                                        : styles.correctBorder,
                                                ]}
                                            >
                                                {selectedMotivations.includes(
                                                    motivation
                                                ) && (
                                                    <Text
                                                        style={styles.checkmark}
                                                    >
                                                        ✓
                                                    </Text>
                                                )}
                                            </View>
                                            <Text
                                                style={styles.defaultOptionText}
                                            >
                                                {motivation}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </View>

                        {selectedMotivations.length === 0 && !isContinue && (
                            <View>
                                <Text style={[styles.errorText]}>
                                    This field is required.
                                </Text>
                            </View>
                        )}
                    </View>

                    <View>
                        <Text style={[styles.text, {flex: 1}]}>
                            How motivated are you to learn?
                        </Text>
                        <View>
                            <View
                                style={[
                                    styles.selectOption,
                                    !isContinue && !learningMotivation
                                        ? styles.wrongBorder
                                        : styles.correctBorder,
                                ]}
                            >
                                <Picker
                                    selectedValue={learningMotivation}
                                    onValueChange={(itemValue: string) =>
                                        setLearningMotivation(itemValue)
                                    }
                                >
                                    <Picker.Item
                                        style={styles.defaultOptionText}
                                        label="Select Learning Motivation"
                                        value=""
                                        enabled={false}
                                    />
                                    {learningMotivation_type.map((value) => (
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
                                {!learningMotivation && !isContinue && (
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
    alignCheckBox: {
        flex: 1.5,
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
