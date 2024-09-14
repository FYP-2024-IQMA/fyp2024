import {ActivityIndicator, View} from 'react-native';

export const LoadingIndicator = () => {
    return (
        <>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                }}
            >
                <ActivityIndicator size="large" color="#8A2BE2" />
            </View>
        </>
    );
};
