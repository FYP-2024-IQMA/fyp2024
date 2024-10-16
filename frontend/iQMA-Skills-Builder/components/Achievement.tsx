import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

export const Achievements = () => {
  const [expanded, setExpanded] = useState(false);

  const achievements = [
    { id: '1', source: require('../assets/images/badge1.png') },
    { id: '1', source: require('../assets/images/badge2.png') },
    { id: '1', source: require('../assets/images/badge1.png') },
   
  ];

  const visibleAchievements = expanded ? achievements : achievements.slice(0, 3);

  const handleViewMore = () => {
    setExpanded(!expanded);
  };

  return (
    <View style ={styles.topContainer}>
    <Text style={styles.header}>Achievements</Text>
    <View style={styles.container}>
      
      <View style={styles.achievementContainer}>
        <FlatList
          data={visibleAchievements}
          keyExtractor={(item) => item.id}
          horizontal
          style={styles.flatlist}
          renderItem={({ item }) => (
            <View style={styles.achievementItem}>
              <Image source={item.source} style={styles.achievementImage} />
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContainer} // Apply styling to the content container
        />
      </View>
      
      {/* Separate View for View More button */}
      {/* <TouchableOpacity onPress={handleViewMore}>
        <Text style={styles.viewMore}>
          {expanded ? 'View Less' : `View ${achievements.length - 3} more`}
        </Text>
      </TouchableOpacity> */}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
    topContainer:{
        padding:16,
        flex:1,
    },
  container: {
    
    borderWidth: 2,
    borderColor: '#9CA3AF',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom:10,
    flex: 1,
  },
  flatlist:{
    flex:1,
    

  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#18113C',
  },
  achievementContainer: {
    
     borderBottomWidth: 2,         // Add border bottom width
  borderBottomColor: '#9CA3AF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex:1,
    paddingLeft:10,
     // Added padding for better spacing
  },
  achievementItem: {
    flex:1,
    width:80,
    height:80,
   
    borderRightWidth:2,
    borderRightColor: '#9CA3AF',
    overflow: 'hidden',
    backgroundColor: '#fff',
    
  },
  achievementImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  separator: {
    width: 10,
  },
  viewMore: {
    color: '#333399',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom:20,
    marginLeft:10,
     // Center the text
  },
  listContainer: {
    justifyContent: 'space-between', // Ensure space between items
  },
});

export default Achievements;
