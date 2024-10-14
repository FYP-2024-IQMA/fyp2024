import YoutubePlayer from 'react-native-youtube-iframe';
// import Video, { VideoRef } from 'react-native-video';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

interface VideoPlayerProps {
    videoUrl: string;
    playing?: boolean;
    onStateChange?: (state: any) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, playing, onStateChange }) => {

    const { height: screenHeight } = Dimensions.get('window'); // get device height
    const test = '2VpG0WS4uCo';

    const videoRef = useRef(null);
    const [status, setStatus] = useState({});

    if (videoUrl.includes('.mp4')) {
        return (
            //<View style={styles.container}>
            <Video
                ref={videoRef}
                source={{uri: videoUrl}}
                isMuted={false}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN} // choose ResizeMode.STRETCH or ResizeMode.COVER
                shouldPlay={playing}
                // isLooping
                style={[styles.video, { height: screenHeight * 0.76 }]}
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
            //</View>
        );
    }

    return (
        <YoutubePlayer
            height={300}
            play={playing}
            onChangeState={onStateChange}
            videoId={videoUrl} // YouTube video ID
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: '45%', // Adjust as needed for your app's design
        // flexGrow: 1
    },
    // video: {
    //     backgroundColor: 'black', // Optional: set a background color
    //     alignSelf: 'auto', // 'auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline'
    //     flex: 1,
    //     // width: 300, // Set the desired width
    //     // height: 200, // Set the desired height
    // },
    video: {
        backgroundColor: 'black',
        // flex: 1,
        // alignSelf: 'stretch',
        width: '100%',
        // height: '83%',
    },
});

export default VideoPlayer;

