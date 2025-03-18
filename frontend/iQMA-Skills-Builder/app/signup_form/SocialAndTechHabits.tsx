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

export default function SocialAndTechHabits() {
    const [isContinue, setIsContinue] = useState(true);
    const [isScroll, setIsScroll] = useState<boolean>(false);

    const [workStyle, setWorkStyle] = useState<string>('');
    const [computerSkills, setComputerSkills] = useState<string>('');

    const screenHeight = Dimensions.get('window').height;

    const workStyle_type: string[] = [
        'Collaborative', 'Competitive', 'Independent', 'Other'
    ];

    const computerSkills_type: string[] = [
        'Advanced', 'Intermediate', 'Basic', 'Other'
    ];

    const handlePress = async () => {
        if (!workStyle || !computerSkills) {
            setIsContinue(false);
        } else {
            setIsContinue(true);
            await AsyncStorage.setItem('workStyle', workStyle);
            await AsyncStorage.setItem(
                'computerSkills',
                computerSkills
            );
            router.push('/signup_form/Motivation');
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
                            Tell me about your social & tech habits
                        </ChatBubble>
                    </View>
                </View>
                <View style={{marginVertical: 20, gap: 20}}>
                    <View>
                        <Text style={[styles.text, {flex: 1}]}>
                            How do you work with others?
                        </Text>
                        <View
                            style={{flexDirection: 'row', alignItems: 'center'}}
                        >
                            <View
                                style={[
                                    styles.selectOption,
                                    !isContinue && !workStyle
                                        ? styles.wrongBorder
                                        : styles.correctBorder,
                                ]}
                            >
                                <Picker
                                    selectedValue={workStyle}
                                    onValueChange={(itemValue: string) =>
                                        setWorkStyle(itemValue)
                                    }
                                >
                                    <Picker.Item
                                        style={styles.defaultOptionText}
                                        label="Select Work Style"
                                        value=""
                                        enabled={false}
                                    />
                                    {workStyle_type.map((value) => (
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
                                {!workStyle && !isContinue && (
                                    <Text style={[styles.errorText]}>
                                        This field is required.
                                    </Text>
                                )}
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={[styles.text, {flex: 1}]}>
                            Computer Skills
                        </Text>
                        <View>
                            <View
                                style={[
                                    styles.selectOption,
                                    !isContinue && !computerSkills
                                        ? styles.wrongBorder
                                        : styles.correctBorder,
                                ]}
                            >
                                <Picker
                                    selectedValue={computerSkills}
                                    onValueChange={(itemValue: string) =>
                                        setComputerSkills(itemValue)
                                    }
                                >
                                    <Picker.Item
                                        style={styles.defaultOptionText}
                                        label="Select Computer Skills"
                                        value=""
                                        enabled={false}
                                    />
                                    {computerSkills_type.map((value) => (
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
                                {!computerSkills && !isContinue && (
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
