import { StyleSheet, Text, View } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import CircularProgress from "./CircularProgress";
import React from 'react';

interface ProgressItemProps {
  iconName: any;
  iconColor?: string;
  iconSize?: number;
  position?: 'left' | 'right';
}

const ProgressItem: React.FC<ProgressItemProps> = ({ iconName, iconColor = 'black', iconSize = 24, position = 'left' }) => (
  <>
    <View style={position === 'left' ? styles.leftContainer : styles.rightContainer}>

  
  <View style={styles.progressItem}>
    <AntDesign name={iconName} color={iconColor} size={iconSize} />
  </View>
    <View style={styles.darkerProgressItem}>
    <AntDesign name={iconName} color={iconColor} size={iconSize} />
    </View>
    </View>
  
  </>
);

interface ProgressPathProps {
  icons: { name: string; color?: string; size?: number }[];
}

const ProgressPath: React.FC<ProgressPathProps> = ({ icons }) => {
  return (
    <View style={styles.progressContainer}>
      {icons.map((icon, index) => (
        <ProgressItem
          key={index}
          iconName={icon.name}
          iconColor={icon.color}
          iconSize={icon.size}
          position={index % 2 === 0 ? 'left' : 'right'}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 15,
  },
  progressItem: {
    marginBottom: 10,
    backgroundColor: '#AE8BF1',
    borderRadius: 30,
    padding: 15,
    alignItems: 'center',
    width: 75,
    shadowColor: '#5E43C2',
  },
  darkerProgressItem: {
    backgroundColor: '#B199FF',
    borderRadius: 30,
    padding: 15,
    alignItems: 'center',
    width: 75,
    top: -90,
  },
  leftContainer: {  
    alignItems: 'flex-start',
    marginLeft: 60,  
  },
  rightContainer: {  
    alignItems: 'flex-end',
    marginRight: 60,
  },
});

export default ProgressPath;
