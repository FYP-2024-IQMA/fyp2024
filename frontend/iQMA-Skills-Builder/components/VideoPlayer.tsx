import YoutubePlayer from 'react-native-youtube-iframe';
// import Video, { VideoRef } from 'react-native-video';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

interface VideoPlayerProps {
    videoUrl: string;
    playing?: boolean;
    onStateChange?: (state: any) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, playing, onStateChange }) => {
    
    const videoRef = useRef(null);
    const [status, setStatus] = useState({});

    if (videoUrl.includes('youtube')) {
        return (
            <YoutubePlayer
                height={300}
                play={playing}
                onChangeState={onStateChange}
                videoId={videoUrl} // YouTube video ID
            />
        );
    }

    return (
        <View style={styles.container}>
            <Video
                ref={videoRef}
                source={{uri: videoUrl}}
                isMuted={false}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN} // choose ResizeMode.STRETCH or ResizeMode.COVER
                shouldPlay={playing}
                // isLooping
                style={styles.video}
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        flex: 1,
        alignSelf: 'stretch',
    }

    // fullScreen: {
    //     position: 'relative',
    // },
    // backgroundVideo: {
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     bottom: 0,
    //     right: 0,
    // },
    // // });
    // videoContainer: {
    //     width: '100%',
    //     height: 250, // Adjust as needed for your app's design
    //     backgroundColor: 'black',
    //     position: 'relative',
    // },
    // backgroundVideo: {
    //     width: '100%',
    //     height: '100%',
    // },
});

export default VideoPlayer;

