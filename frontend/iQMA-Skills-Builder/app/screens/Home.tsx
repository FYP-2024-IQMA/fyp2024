// screens/HomeScreen.tsx

import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import ProgressPath from '@/components/ProgressPath';
import SectionCard from '@/components/SectionCard';
import TopStats from '@/components/TopStats';

interface SectionDividerProps {
    label: string;
}

const HomeScreen: React.FC = () => {
    const SectionDivider: React.FC<SectionDividerProps> = ({label}) => (
        <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>{label}</Text>
            <View style={styles.dividerLine} />
        </View>
    );

    const icons = [
        {name: 'Trophy', color: '#FFFFFF', size: 40, status: 'completed'},
        {name: 'staro', color: '#FFFFFF', size: 40, status: 'in-progress'},
        {name: 'key', color: '#FFFFFF', size: 40, status: 'not-started'},
        {name: 'book', color: '#FFFFFF', size: 40, status: 'not-started'},
        // { name: 'lock', color: '#FFFFFF', size: 40 },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Top Stats */}
            <TopStats />

            {/* Section 1 */}
            <SectionCard
                title="SECTION 1, UNIT 1"
                subtitle="Foundations of Communication"
            />

            <View>
                <ProgressPath icons={icons} />
            </View>
            {/* Divider */}
            <SectionDivider label="Written Communication Proficiency" />

            {/* Section 2 */}
            <SectionCard
                title="SECTION 1, UNIT 2"
                subtitle="Written Communication Proficiency"
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    lineSeparator: {
        height: 1,
        backgroundColor: '#CCC',
        marginVertical: 10,
    },
    sectionLabel: {
        textAlign: 'center',
        color: '#666',
        marginBottom: 20,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    dividerText: {
        marginHorizontal: 10,
        fontWeight: 'bold',
        color: '#AAAAAA',
    },
});

export default HomeScreen;
