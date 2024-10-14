import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useState, useContext, useEffect} from 'react';
import { AuthContext } from '@/context/AuthContext';
import * as accountEndpoints from '@/helpers/accountEndpoints';
import { LoadingIndicator } from '@/components/LoadingIndicator';

export default function EditProfile() {
  const {currentUser, isLoading} = useContext(AuthContext);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  
  const handleSave = async () => {
      try {
          
          const userDetails = {
                "userID": `${currentUser.sub}`,
                "firstName": `${firstName}`,
                "lastName": `${lastName}`
          }
          
          await accountEndpoints.editUserDetails(userDetails);
          Alert.alert('Success', 'Profile updated successfully.');
      } catch (error) {
          console.error('Failed to update profile:', error);
          Alert.alert('Error', 'Failed to update profile. Please try again.');
      }
    };
    
    useEffect(() => {
        (async () => {
            try {
                const userDetails = await accountEndpoints.getUserDetails(
                    currentUser.sub
                );
                console.log('userDetails:', userDetails);
                setFirstName(userDetails.firstName);
                setLastName(userDetails.lastName);

            } catch (error) {
                console.error('Error fetching user details:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

  if (isLoading || loading) {
      return (
          <LoadingIndicator />
      );
  }

  return (
      <View style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.headerTitle}>Edit Profile</Text>
          </View>
          <View style={styles.form}>
              <Text style={styles.label}>FIRST NAME</Text>
              <TextInput
                  style={styles.input}
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
              />
              <Text style={styles.label}>LAST NAME</Text>
              <TextInput
                  style={styles.input}
                  value={lastName}
                  onChangeText={(text) => setLastName(text)}
              />
              <TouchableOpacity style={styles.button} onPress={handleSave}>
                  <Text style={styles.buttonText}>SAVE</Text>
              </TouchableOpacity>
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#ffffff',
  },
  header: {
      backgroundColor: '#c1a5ff',
      paddingVertical: 15,
      justifyContent: 'center',
      alignItems: 'center',
  },
  headerTitle: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: 'bold',
  },
  form: {
      padding: 20,
  },
  label: {
      color: '#6a51b2',
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 5,
  },
  input: {
      height: 40,
      borderWidth: 1,
      borderColor: '#d4d4d4',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
  },
  button: {
      backgroundColor: '#ffffff',
      borderRadius: 10,
      borderColor: '#6a51b2',
      borderWidth: 1,
      paddingVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
  },
  buttonText: {
      color: '#6a51b2',
      fontSize: 16,
      fontWeight: 'bold',
  },
});
