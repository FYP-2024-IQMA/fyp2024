// import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper function to package the feedback data
export const packageFeedback = async (
  eventType: string,
  message: string,
  selectedRating: number | null,
  userID: string,
) => {
  try {
    // Retrieve the userID from AsyncStorage
    // const userID = await AsyncStorage.getItem('userID');
    // if (!userID) {
    //   throw new Error('User ID not found');
    // }

    // Package the feedback data into an object
    const feedbackData = {
      userID,                // User ID from AsyncStorage
      timestamp: new Date().toISOString(), // Current datetime in ISO format
      eventType,        // Option selected from the dropdown
      rating: selectedRating !== null ? selectedRating : 'No rating', // Emoji rating, fallback if no rating
      message: message !== null ? message : "No message",            // User's input message
      status: "open" // Status of the feedback
    };

    // Return the packaged feedback data
    console.log('Feedback data:', feedbackData);
    return feedbackData;
  } catch (error) {
    console.error('Error packaging feedback:', error);
    return null;
  }
};

// endpoint to push user feedback to queue
export const sendFeedback = async (feedbackData: any) => {
  try {
    const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/feedback/sendFeedback`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    });
    console.log('Status: ', response.status);
    return response.status;

  } catch (error) {
    console.error('Error while sending feedback:', error);
  }
}