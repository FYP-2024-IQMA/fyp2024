import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

import * as sectionEndpoints from '@/helpers/sectionEndpoints';

import { Colors } from '@/constants/Colors';
import { CustomButton } from '@/components/CustomButton';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { OverviewCard } from '@/components/OverviewCard';
import ProgressBar from '@/components/ProgressBar';
import SectionCard from '@/components/SectionCard';
import VideoPlayer from '@/components/VideoPlayer';

import { formatSection } from '@/helpers/formatSectionID';
import { useTimer } from '@/helpers/useTimer';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUpdateUserScreenProgress } from '@/hooks/useUpdateUserScreenProgress';

export default function SectionIntroduction() {
  const navigation = useNavigation();
  const { sectionID, unitID, lessonID, stoneIndex, screenIndex, totalScreens, inProgress } = useLocalSearchParams();

  useUpdateUserScreenProgress({
    stoneIndex: Number(stoneIndex),
    screenIndex: Number(screenIndex),
    screenPathname: 'SectionIntroduction',
    inProgress: inProgress === 'true',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [sectionNumber, setSectionNumber] = useState('');
  const [sectionName, setSectionName] = useState('');
  const [videoId, setVideoId] = useState('');
  const [playing, setPlaying] = useState(true);

  const { startTimer, stopTimer } = useTimer(
    sectionID as string,
    'Introduction'
  );

  useLayoutEffect(() => {
    const progress = ((Number(screenIndex) + 1) || 1) / (Number(totalScreens) || 1);

    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: () => (
        <ProgressBar progress={progress} isQuestionnaire={false} />
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => router.replace('Home')}>
          <Ionicons name="home" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, screenIndex, totalScreens]);

  useFocusEffect(
    useCallback(() => {
      setPlaying(true);
      return () => setPlaying(false);
    }, [])
  );

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        startTimer();

        if (sectionID) {
          const sectionDetails = await sectionEndpoints.getSectionDetails(sectionID as string);
          setVideoId(sectionDetails.introductionURL);
          setSectionName(sectionDetails.sectionName);
          setSectionNumber(formatSection(sectionID as string));
          await AsyncStorage.setItem('section', sectionDetails.sectionName);
        }
      } catch (error) {
        console.error('Error fetching Section details:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [sectionID]);

  const handlePress = async () => {
    try {
      setPlaying(false);
      router.push({
        pathname: 'UnitIntroduction',
        params: {
          sectionID,
          unitID,
          lessonID,
          stoneIndex,
          screenIndex: (Number(screenIndex) + 1).toString(),
          totalScreens,
          inProgress
        },
      });
    } finally {
      stopTimer();
    }
  };

  const onStateChange = (state: string) => {
    if (state === 'ended' || state === 'paused') setPlaying(false);
    if (state === 'playing') setPlaying(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <View style={styles.insideContainer}>
            <SectionCard
              title={`SECTION ${sectionNumber}`}
              subtitle={sectionName}
            />
            <Text style={styles.screenTitle}>
              Section {sectionNumber}: Introduction
            </Text>
            {videoId ? (
              <VideoPlayer
                videoUrl={videoId}
                playing={playing}
                onStateChange={onStateChange}
              />
            ) : (
              <OverviewCard
                isError
                text="Video is not available. Please check with your administrator."
              />
            )}
          </View>
          <CustomButton
            label="Continue"
            backgroundColor="white"
            onPressHandler={handlePress}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  insideContainer: {
    flexGrow: 1,
  },
  screenTitle: {
    fontSize: Colors.lessonName.fontSize,
    fontWeight: 'bold',
    color: Colors.header.color,
    marginBottom: 20,
    marginHorizontal: 10,
  },
});
