import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import {useState, useContext, useEffect} from 'react';
import {AuthContext} from '@/context/AuthContext';
import {LoadingIndicator} from '@/components/LoadingIndicator';
import * as gamificationEndpoints from '@/helpers/gamificationEndpoints';
import * as sectionEndpoints from '@/helpers/sectionEndpoints';
import {Colors} from '@/constants/Colors';
import { formatSection } from '@/helpers/formatSectionID';
import SectionProfile from '@/components/SectionProfile';
import { globalStyles } from '@/constants/styles';

export default function Courses() {
    const {currentUser} = useContext(AuthContext);
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const mock = [
        {
            "sectionID": "SEC0001",
            "sectionName": "Communication",
            "sectionDuration": 136
        },
        {
            "sectionID": "SEC0002",
            "sectionName": "Section 2 Name",
            "sectionDuration": 156
        },
        {
            "sectionID": "SEC0003",
            "sectionName": "Section 3 Name",
            "sectionDuration": 115
        }
    ]

    const fetchCourses = async () => {
        try {
            const sectionDetails =
                await sectionEndpoints.getAllSectionDetails();

            setCourses(sectionDetails);

            console.log(sectionDetails);
        } catch (error) {
            console.error('Error fetching all courses', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <ScrollView style={globalStyles.container}>
            <View style={styles.container}>
                        <View style={styles.sectionContainer}>
                        {courses.length > 0 ? (
                            courses
                                .map((course, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            flex: 1,
                                        }}
                                    >
                                        <SectionProfile
                                            sectionID={course.sectionID}
                                            sectionName={
                                                course.sectionName
                                            }
                                            sectionDuration={
                                                course.sectionDuration
                                            }
                                    />
                                    </View>
                                ))
                        ) : (
                            <Text>No courses available</Text>
                        )}
                        </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // padding: 20,
        paddingHorizontal: 20,
    },
    sectionContainer: {
        marginVertical: 20,
        gap: 10
    },
    sectionHeading: {
        color: Colors.light.color,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: "center"
    },
    badgeOuterContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
        // backgroundColor: 'red',
    },
    badgeImage: {
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    badgeContainer: {
        width: '30%',
        marginBottom: 20,
        alignItems: 'center',
    },
    unlockedBadgeText: {
        marginTop: 10,
        textAlign: 'center',
        // color: Colors.light.text,
        color: Colors.default.purple500,
        fontWeight: 'bold',
    },
    lockedBadgeText: {
        marginTop: 10,
        textAlign: 'center',
        color: Colors.light.text,
        fontWeight: 'bold',
    },
});