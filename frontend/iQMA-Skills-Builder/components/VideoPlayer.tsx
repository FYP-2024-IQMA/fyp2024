import YoutubePlayer from 'react-native-youtube-iframe';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

interface VideoPlayerProps {
    videoUrl: string;
    playing?: boolean;
    onStateChange?: (state: any) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, playing, onStateChange }) => {
    const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
    // const { height: screenHeight } = Dimensions.get('window'); // get device height
    const [videoHeight, setVideoHeight] = useState(screenHeight * 0.3); // Default initial height
    const [isLoading, setIsLoading] = useState(true); // Loading state

    // const onVideoReadyForDisplay = (vidData: any) => {
    //     const {width, height} = vidData.naturalSize;
    //     if (width && height) {
    //         const aspectRatio = height / width;
    //         // console.log('aspectRatio:', aspectRatio);
    //         const calculatedHeight = screenWidth * aspectRatio * 0.9; // Calculate height based on aspect ratio
    //         setVideoHeight(calculatedHeight); // Update state with dynamic height
    //     }
    // };

    const videoRef = useRef(null);
    const [status, setStatus] = useState({});

    if (videoUrl.includes('.mp4')) {
        return (
            <Video
                ref={videoRef}
                source={{uri: videoUrl}}
                isMuted={false}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN} // choose ResizeMode.STRETCH or ResizeMode.COVER
                shouldPlay={playing}
                // isLooping
                style={[styles.video, {height: videoHeight}]}
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                // onReadyForDisplay={onVideoReadyForDisplay}
            />
        );
    }

    return (
        <YoutubePlayer
            height={videoHeight}
            play={playing}
            onChangeState={onStateChange}
            videoId={videoUrl} // YouTube video ID
        />
    );
};

const styles = StyleSheet.create({
    video: {
        backgroundColor: 'black',
    },
});

export default VideoPlayer;

