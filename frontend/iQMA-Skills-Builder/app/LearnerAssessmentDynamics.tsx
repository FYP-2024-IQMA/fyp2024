import React, { useState } from 'react';
import { router } from 'expo-router';
import { Image, View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ChatBubble } from '@/components/ChatBubble';
import { CustomButton } from "@/components/CustomButton";

export default function LearnerAssessmentDynamics() {
    const [selectedPeers, setPeers] = useState<string>('');
    const [selectedTendency, setTendency] = useState<string>('');
    const [selectedSocial, setSocial] = useState<string>('');
    const [selectedComputer, setComputer] = useState<string>('');

    const peers: string[] = ['Collaborative', 'Competitive', 'Supportive', 'Independent'];
    const tendency: string[] = ['Competitive', 'Cooperative', 'Both', 'Neither'];
    const social: string[] = ['Urban', 'Suburban', 'Rural'];
    const computer: string[] = ['Advanced', 'Intermediate', 'Basic', 'None'];

    const [isContinue, setIsContinue] = useState(true);

    console.log(selectedPeers, selectedTendency, selectedSocial, selectedComputer);

    const handlePress = () => {
        if (!selectedPeers || !selectedTendency || !selectedSocial || !selectedComputer) {
            setIsContinue(false);
        }
        else {
            setIsContinue(true);
            router.push("LearnerAssessmentExperience");
        }
    };

    return (
        <View style={{ padding: 20, flex: 1, backgroundColor: "#FFFFFF" }}>
            <View style={{ flexDirection: 'row' }}>
                <Image style={{ height: 100, width: 100, marginRight: 15 }} source={require('@/assets/images/mascot.png')} />
                <View style={{ marginTop: 5 }}>
                    <ChatBubble position='left'>How would you describe your social dynamics?</ChatBubble>
                </View>
            </View>

            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.text, { flex: 1 }]}>Relationship {'\n'}To Peers</Text>
                    <View style={{ flex: 2.5, borderWidth: 1, borderColor: !isContinue && !selectedPeers ? '#ff4c4c' : '#9CA3AF', borderRadius: 10 }}>
                        <Picker
                            selectedValue={selectedPeers}
                            onValueChange={(itemValue: string) => setPeers(itemValue)}
                        >
                            <Picker.Item style={styles.defaultOptionText} label="Select Relationship to Peers" value="" enabled={false} />
                            {peers.map((value) => (
                                <Picker.Item style={{fontSize: 14}} key={value} label={value} value={value} />
                            ))}
                        </Picker>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 2.5 }}>
                        {!selectedPeers && !isContinue && <Text style={[styles.errorText]}>This field is required.</Text>}
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                    <Text style={[styles.text, { flex: 1 }]}>Compete or {'\n'}Cooperate</Text>
                    <View style={{ flex: 2.5, borderWidth: 1, borderColor: !isContinue && !selectedTendency ? '#ff4c4c' : '#9CA3AF', borderRadius: 10 }}>
                        <Picker
                            selectedValue={selectedTendency}
                            onValueChange={(itemValue: string) => setTendency(itemValue)}
                        >
                            <Picker.Item style={styles.defaultOptionText} label="Select Tendency to Compete or Cooperate" value="" enabled={false} />
                            {tendency.map((value) => (
                                <Picker.Item style={{fontSize: 14}} key={value} label={value} value={value} />
                            ))}
                        </Picker>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 2.5 }}>
                        {!selectedTendency && !isContinue && <Text style={[styles.errorText]}>This field is required.</Text>}
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                    <Text style={[styles.text, { flex: 1 }]}>Social {'\n'}Background</Text>
                    <View style={{ flex: 2.5, borderWidth: 1, borderColor: !isContinue && !selectedSocial ? '#ff4c4c': '#9CA3AF', borderRadius: 10 }}>
                        <Picker
                            selectedValue={selectedSocial}
                            onValueChange={(itemValue: string) => setSocial(itemValue)}
                        >
                            <Picker.Item style={styles.defaultOptionText} label="Select Social Background" value="" enabled={false} />
                            {social.map((value) => (
                                <Picker.Item style={{fontSize: 14}} key={value} label={value} value={value} />
                            ))}
                        </Picker>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 2.5 }}>
                        {!selectedSocial && !isContinue && <Text style={[styles.errorText]}>This field is required.</Text>}
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                    <Text style={[styles.text, { flex: 1 }]}>Computer {'\n'}Literacy</Text>
                    <View style={{ flex: 2.5, borderWidth: 1, borderColor: !isContinue && !selectedComputer ? '#ff4c4c' : '#9CA3AF', borderRadius: 10 }}>
                        <Picker
                            selectedValue={selectedComputer}
                            onValueChange={(itemValue: string) => setComputer(itemValue)}
                        >
                            <Picker.Item style={styles.defaultOptionText} label="Select Computer Literacy" value="" enabled={false} />
                            {computer.map((value) => (
                                <Picker.Item style={{fontSize: 14}} key={value} label={value} value={value} />
                            ))}
                        </Picker>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 2.5 }}>
                        {!selectedComputer && !isContinue && <Text style={[styles.errorText]}>This field is required.</Text>}
                    </View>
                </View>
            </View>

            <View style={{
                alignSelf: 'center',
                marginTop: 10
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
    },
    errorText: {
        color: '#ff4c4c'
    }
});