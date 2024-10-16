import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

interface CertificateProps {
  title: String,
  section: String,
  issuedDate: String
}

const certifications = [
  { id: 1, title: 'Certified Speaker', section: 'Communication', issuedDate: 'May 2024' },
  { id: 2, title: 'Certified Trainer', section: 'Leadership', issuedDate: 'June 2024' },
  // Add more certifications here as needed
];

const Certification: React.FC<CertificateProps> = ({ title, section, issuedDate }) => (
  <View style={styles.card}>
     <View style={styles.titleContainer}>
     
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.issuedDate}>Issued {issuedDate}</Text>
    </View>
    <Text style={styles.section}>Section: {section}</Text>
   
  </View>
);

export const CertificationsList = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
         <Text style={styles.header}>Certification</Text>
      <Certification
        title={certifications[0].title} 
        section={certifications[0].section} 
        issuedDate={certifications[0].issuedDate} 
      />

    

      {expanded && (
        <FlatList
          data={certifications.slice(1)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Certification
              title={item.title} 
              section={item.section} 
              issuedDate={item.issuedDate} 
            />
          )}
        />
      )}
        <TouchableOpacity onPress={handleToggle}>
        <Text style={styles.viewMore}>{expanded ? 'View less' : 'View all'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#18113C',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth:1,
    elevation:5,
    padding: 15,
    marginBottom: 10,
  },
  titleContainer :{
    flexDirection:'row',
    alignItems:'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  section: {
    fontSize: 14,
    color: '#18113C',
  },
  issuedDate: {
    marginLeft:100,
    fontSize: 12,
    color: '#777',
  },
  viewMore: {
    color: '#007bff',
    fontSize: 16,
    textAlign: 'right',
    marginTop: 5,
  },
});

export default CertificationsList;
