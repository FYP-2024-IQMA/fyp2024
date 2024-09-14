import {ActivityIndicator, Image, Text, View} from 'react-native';

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
                <Image
                    style={{width: 100, height: 100, marginBottom: 10}}
                    source={require('@/assets/images/iqma_logo.png')}
                />
                <ActivityIndicator size="large" color="#8A2BE2" />
            </View>
        </>
    );
};
