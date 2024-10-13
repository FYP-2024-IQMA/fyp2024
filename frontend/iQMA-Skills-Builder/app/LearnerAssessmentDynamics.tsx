import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {ChatBubble} from '@/components/ChatBubble';
import {Colors} from '@/constants/Colors';
import {CustomButton} from '@/components/CustomButton';
import {Picker} from '@react-native-picker/picker';
import {router} from 'expo-router';

export default function LearnerAssessmentDynamics() {
    const [selectedPeers, setPeers] = useState<string>('');
    const [selectedTendency, setTendency] = useState<string>('');
    const [selectedSocial, setSocial] = useState<string>('');
    const [selectedComputer, setComputer] = useState<string>('');

    const peers: string[] = [
        'Collaborative',
        'Competitive',
        'Supportive',
        'Independent',
    ];
    const tendency: string[] = [
        'Competitive',
        'Cooperative',
        'Both',
        'Neither',
    ];
    const social: string[] = ['Urban', 'Suburban', 'Rural'];
    const computer: string[] = ['Advanced', 'Intermediate', 'Basic', 'None'];

    const [isContinue, setIsContinue] = useState(true);

    const handlePress = async () => {
        if (
            !selectedPeers ||
            !selectedTendency ||
            !selectedSocial ||
            !selectedComputer
        ) {
            setIsContinue(false);
        } else {
            setIsContinue(true);
            const relationshipToPeers = await AsyncStorage.setItem(
                'relationshipToPeers',
                selectedPeers
            );
            const tendency = await AsyncStorage.setItem(
                'tendency',
                selectedTendency
            );
            const socialBackground = await AsyncStorage.setItem(
                'socialBackground',
                selectedSocial
            );
            const compLiteracy = await AsyncStorage.setItem(
                'compLiteracy',
                selectedComputer
            );
            router.push('LearnerAssessmentExperience');
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
                            How would you describe your social dynamics?
                        </ChatBubble>
                    </View>
                </View>

                <View style={{marginVertical: 20}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={[styles.text, {flex: 1}]}>
                            Relationship {'\n'}To Peers
                        </Text>
                        <View
                            style={[
                                styles.selectOption,
                                !isContinue && !selectedPeers
                                    ? styles.wrongBorder
                                    : styles.correctBorder,
                            ]}
                        >
                            <Picker
                                selectedValue={selectedPeers}
                                onValueChange={(itemValue: string) =>
                                    setPeers(itemValue)
                                }
                            >
                                <Picker.Item
                                    style={styles.defaultOptionText}
                                    label="Select Relationship to Peers"
                                    value=""
                                    enabled={false}
                                />
                                {peers.map((value) => (
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
                            {!selectedPeers && !isContinue && (
                                <Text style={[styles.errorText]}>
                                    This field is required.
                                </Text>
                            )}
                        </View>
                    </View>

                    <View style={styles.alignOption}>
                        <Text style={[styles.text, {flex: 1}]}>
                            Compete or {'\n'}Cooperate
                        </Text>
                        <View
                            style={[
                                styles.selectOption,
                                !isContinue && !selectedTendency
                                    ? styles.wrongBorder
                                    : styles.correctBorder,
                            ]}
                        >
                            <Picker
                                selectedValue={selectedTendency}
                                onValueChange={(itemValue: string) =>
                                    setTendency(itemValue)
                                }
                            >
                                <Picker.Item
                                    style={styles.defaultOptionText}
                                    label="Select Tendency to Compete or Cooperate"
                                    value=""
                                    enabled={false}
                                />
                                {tendency.map((value) => (
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
                            {!selectedTendency && !isContinue && (
                                <Text style={[styles.errorText]}>
                                    This field is required.
                                </Text>
                            )}
                        </View>
                    </View>

                    <View style={styles.alignOption}>
                        <Text style={[styles.text, {flex: 1}]}>
                            Social {'\n'}Background
                        </Text>
                        <View
                            style={[
                                styles.selectOption,
                                !isContinue && !selectedSocial
                                    ? styles.wrongBorder
                                    : styles.correctBorder,
                            ]}
                        >
                            <Picker
                                selectedValue={selectedSocial}
                                onValueChange={(itemValue: string) =>
                                    setSocial(itemValue)
                                }
                            >
                                <Picker.Item
                                    style={styles.defaultOptionText}
                                    label="Select Social Background"
                                    value=""
                                    enabled={false}
                                />
                                {social.map((value) => (
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
                            {!selectedSocial && !isContinue && (
                                <Text style={[styles.errorText]}>
                                    This field is required.
                                </Text>
                            )}
                        </View>
                    </View>

                    <View style={styles.alignOption}>
                        <Text style={[styles.text, {flex: 1}]}>
                            Computer {'\n'}Literacy
                        </Text>
                        <View
                            style={[
                                styles.selectOption,
                                !isContinue && !selectedComputer
                                    ? styles.wrongBorder
                                    : styles.correctBorder,
                            ]}
                        >
                            <Picker
                                selectedValue={selectedComputer}
                                onValueChange={(itemValue: string) =>
                                    setComputer(itemValue)
                                }
                            >
                                <Picker.Item
                                    style={styles.defaultOptionText}
                                    label="Select Computer Literacy"
                                    value=""
                                    enabled={false}
                                />
                                {computer.map((value) => (
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
                            {!selectedComputer && !isContinue && (
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
        lineHeight: 20,
    },
    defaultOptionText: {
        color: Colors.default.optionText,
        fontSize: 14,
    },
    errorText: {
        color: Colors.border.wrongColor,
    },
});
