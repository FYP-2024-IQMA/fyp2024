import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

interface CertificateProps {
    title: String;
    section: String;
    issuedDate: String;
}

const certifications = [
    {
        id: 1,
        title: 'Certified Speaker',
        section: 'Communication',
        issuedDate: 'May 2024',
    },
    {
        id: 2,
        title: 'Certified Trainer',
        section: 'Leadership',
        issuedDate: 'June 2024',
    },
    // Add more certifications here as needed
];

// const certifications = [

// ];

const Certification: React.FC<CertificateProps> = ({
    title,
    section,
    issuedDate,
}) => (
    <View style={styles.card}>
        <View style={styles.titleContainer}>
            <View>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View>
                <Text style={styles.issuedDate}>
                    Issued {issuedDate}
                </Text>
            </View>
        </View>
        <View>
            <Text style={styles.section}>Section: {section}</Text>
        </View>
    </View>
);

export const CertificationsList = () => {
    // const [expanded, setExpanded] = useState(false);

    // const handleToggle = () => {
    //     setExpanded(!expanded);
    // };

    return (
        <View style={styles.container}>
            <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}
            >
                <Text style={styles.header}>Certifications</Text>
                <Text
                    style={{
                        textDecorationLine: 'underline',
                        textDecorationColor: '#5C5776',
                        fontWeight: "bold"
                    }}
                >
                    View all
                </Text>
            </View>

            <View style={{marginTop: 10, flexDirection: 'column'}}>
                {certifications.length > 0 ? (
                    <Certification
                        title={certifications[0].title}
                        section={certifications[0].section}
                        issuedDate={certifications[0].issuedDate}
                    />
                ) : (
                    <Text>You haven't obtained any certifications yet.</Text>
                )}
            </View>
            {/* {expanded && (
                <FlatList
                    data={certifications.slice(1)}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <Certification
                            title={item.title}
                            section={item.section}
                            issuedDate={item.issuedDate}
                        />
                    )}
                />
            )} */}
            {/* <TouchableOpacity onPress={handleToggle}>
                <Text style={styles.viewMore}>
                    {expanded ? 'View less' : 'View all'}
                </Text>
            </TouchableOpacity> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#18113C',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        elevation: 2,
        padding: 15,
        gap: 5,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#18113C',
        fontWeight: 'bold',
    },
    section: {
        fontSize: 12,
    },
    issuedDate: {
        fontSize: 12,
        color: '#5C5776',
    },
    viewMore: {
        color: '#007bff',
        fontSize: 16,
        textAlign: 'right',
        marginTop: 5,
    },
});

export default CertificationsList;
