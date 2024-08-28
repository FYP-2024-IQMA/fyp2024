// components/SectionCard.tsx

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import React from 'react';

interface SectionCardProps {
    title: string;
    subtitle: string;
}

const SectionCard: React.FC<SectionCardProps> = ({title, subtitle}) => {
    return (
        <View style={styles.sectionCard}>
            <View>
                <Text style={styles.sectionCardTitle}>{title}</Text>
                <Text style={styles.sectionCardSubtitle}>{subtitle}</Text>
            </View>
            <TouchableOpacity style={styles.sectionButton}>
                <Ionicons
                    name="document-text-outline"
                    size={20}
                    color="white"
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionCard: {
        backgroundColor: '#B199FF',
        padding: 25,
        borderRadius: 15,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionCardTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    sectionCardSubtitle: {
        color: 'white',
        fontSize: 14,
    },
    sectionButton: {
        backgroundColor: '#7654F2',
        padding: 10,
        borderRadius: 10,
        borderColor: '#5E43C2',
        borderWidth: 2,
    },
});

export default SectionCard;
