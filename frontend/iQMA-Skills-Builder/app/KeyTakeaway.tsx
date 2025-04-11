// import * as lessonEndpoints from '@/helpers/lessonEndpoints';
// import * as unitEndpoints from '@/helpers/unitEndpoints';

// import {
//     Image,
//     ScrollView,
//     StyleSheet,
//     Text,
//     View,
//     Dimensions,
//     TouchableOpacity,
// } from 'react-native';
// import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
// import {router, useLocalSearchParams, useRouter} from 'expo-router';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {AuthContext} from '@/context/AuthContext';
// import {Colors} from '@/constants/Colors';
// import {CustomButton} from '@/components/CustomButton';
// import {LoadingIndicator} from '@/components/LoadingIndicator';
// import {OverviewCard} from '@/components/OverviewCard';
// import ProgressBar from '@/components/ProgressBar';
// import SectionCard from '@/components/SectionCard';
// import axios from 'axios';
// import {formatSection} from '@/helpers/formatSectionID';
// import {formatUnit} from '@/helpers/formatUnitID';
// import {useNavigation} from '@react-navigation/native';
// import {useTimer} from '@/helpers/useTimer';
// import {Ionicons} from '@expo/vector-icons';
// import {AudioPlayer} from '@/components/AudioPlayer';
// import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
// import * as userStoneProgressEndpoints from '@/helpers/userStoneProgressEndpoints';
// import * as gamificationEndpoints from '@/helpers/gamificationEndpoints';

// export default function KeyTakeaway() {
//     const navigation = useNavigation();
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const {currentUser} = useContext(AuthContext);
//     const [shouldShowStreak, setShouldShowStreak] = useState<boolean>();

//     useLayoutEffect(() => {
//         // const progress =
//         //     parseInt(currentProgress as string) /
//         //     parseInt(totalProgress as string);

//         const progress =
//             (Number(screenIndex) + 1 || 1) / (Number(totalScreens) || 1);

//         navigation.setOptions({
//             headerTitleAlign: 'center',
//             headerTitle: () => (
//                 <ProgressBar progress={progress} isQuestionnaire={false} />
//             ),
//             headerRight: () => (
//                 <TouchableOpacity
//                     onPress={() => {
//                         router.replace('Home');
//                     }}
//                 >
//                     <Ionicons name="home" size={24} color="black" />
//                 </TouchableOpacity>
//             ),
//         });
//     }, [navigation]);

//     const handlePress = async () => {
//         // let nextLessonIdx = parseInt(currentLessonIdx as string) + 1;
//         // let pathName = 'Lesson';

//         // // If it is the last lesson, go to Assessment Intro for Unit Assessment (AssessmentIntroduction.tsx)
//         // if (nextLessonIdx === parseInt(totalLesson as string)) {
//         //     // lessonIdx can be anything because will reset in Home
//         //     nextLessonIdx = 0;
//         //     pathName = 'AssessmentIntroduction';
//         // }

//         // console.log('nextLessonIdx:', nextLessonIdx);
//         // console.log('nextLessonID:', nextLessonID);

//         const userStoneProgress = {
//             userID: currentUser.sub,
//             last_completed_stone_index: parseInt(stoneIndex as string),
//             current_stone_index: parseInt(stoneIndex as string) + 1,
//             current_screen_index: 0,
//             current_screen_pathname: null,
//         };

//         const updateUserStoneProgress =
//             await userStoneProgressEndpoints.updateUserStoneProgress(
//                 userStoneProgress
//             );

//         console.log(
//             'User stone progress updated successfully: ',
//             updateUserStoneProgress
//         );

//         // router.push({
//         //     // pathname: pathName,
//         //     // pathname: '/Home',
//         //     pathname: 'Streak',
//         //     params: {
//         //         sectionID,
//         //         unitID,
//         //         lessonID,
//         //         stoneIndex,
//         //         screenIndex:  (Number(screenIndex) + 1).toString(), // increment by 1 screen
//         //         totalScreens,
//         //     },
//         // });

//         console.log('shouldShowStreak:', shouldShowStreak);
//         if (shouldShowStreak) {
//             router.push({
//                 pathname: 'Streak',
//                 params: {
//                     sectionID,
//                     unitID,
//                     lessonID,
//                     stoneIndex,
//                     screenIndex: (Number(screenIndex) + 1).toString(), // increment by 1 screen
//                     totalScreens,
//                 },
//             });
//         } else {
//             router.replace('Home');
//         }

//         stopTimer();
//     };

//     // const sectionID = 'SEC0001';
//     // const unitID = 'UNIT0002';
//     // const lessonID = '2a';
//     // const currentLessonIdx = '0';
//     // const totalLesson = '3';
//     // const currentUnit = '3';
//     // const totalUnits = '3';
//     const {sectionID, unitID, lessonID, stoneIndex, screenIndex, totalScreens} =
//         useLocalSearchParams();
//     const [sectionNumber, setSectionNumber] = useState<string>('');
//     const [unitNumber, setUnitNumber] = useState<string>('');
//     const [unitName, setUnitName] = useState<string>('');
//     const [lessonName, setLessonName] = useState<string>('');
//     const [keyTakeaway, setKeyTakeaway] = useState<string[]>([]);
//     const [lessonKeyTakeawayAudio, setLessonKeyTakeawayAudio] =
//         useState<string>('');
//     const [nextLessonID, setnextLessonID] = useState<string>('');
//     const {startTimer, stopTimer} = useTimer(
//         sectionID as string,
//         'Key Takeaway',
//         unitID as string,
//         lessonID as string
//     );
//     const [isScroll, setIsScroll] = useState<boolean>(false);
//     const screenHeight = Dimensions.get('window').height;

//     useEffect(() => {
//         startTimer();
//         if (
//             sectionID &&
//             unitID &&
//             lessonID
//             // currentLessonIdx &&
//             // totalLesson
//         ) {
//             (async () => {
//                 try {
//                     const unitDetails = await unitEndpoints.getUnitDetails(
//                         sectionID as string,
//                         unitID as string
//                     );

//                     const lessonDetails =
//                         await lessonEndpoints.getLessonDetails(
//                             sectionID as string,
//                             unitID as string,
//                             lessonID as string
//                         );

//                     const getAllLessons = await lessonEndpoints.getAllLesson(
//                         sectionID as string,
//                         unitID as string
//                     );

//                     const getShouldShowStreak = await gamificationEndpoints.getShouldShowStreak(
//                         currentUser.sub);

//                     // let nxtLessonIdx = parseInt(currentLessonIdx as string) + 1;

//                     // if (nxtLessonIdx === parseInt(totalLesson as string)) {
//                     //     nxtLessonIdx = 0;
//                     // }

//                     if (lessonID.includes('.')) {
//                         lessonDetails.lessonName =
//                             lessonDetails.lessonName.replace(/\.\d+/, '');
//                     }

//                     // setnextLessonID(getAllLessons[nxtLessonIdx].lessonID);
//                     setLessonName(lessonDetails.lessonName);
//                     setUnitName(unitDetails.unitName);
//                     setKeyTakeaway(lessonDetails.lessonKeyTakeaway);
//                     setSectionNumber(formatSection(sectionID as string));
//                     setUnitNumber(formatUnit(unitID as string));
//                     setLessonKeyTakeawayAudio(
//                         lessonDetails.lessonKeyTakeawayAudio
//                     );
//                     setShouldShowStreak(getShouldShowStreak)
//                 } catch (error) {
//                     console.error('Error fetching in Key Takeaway:', error);
//                 } finally {
//                     setIsLoading(false);
//                 }
//             })();
//         }
//     }, [sectionID, unitID]);

//     return (
//         <ScrollView
//             // contentContainerStyle={{flexGrow: 1}}
//             // style={styles.container}
//             // onContentSizeChange={(width, height) => {
//             //     setIsScroll(height + 100 > screenHeight);
//             // }}
//             contentContainerStyle={{
//                 flexGrow: 1,
//                 padding: 20,
//                 backgroundColor: Colors.light.background,
//             }}
//         >
//             {isLoading ? (
//                 <LoadingIndicator />
//             ) : (
//                 <>
//                     <View style={{flexGrow: 1}}>
//                         <SectionCard
//                             title={`SECTION ${sectionNumber}, UNIT ${unitNumber}`}
//                             subtitle={unitName}
//                         />
//                         <Text style={styles.screenTitle}>{lessonName}</Text>

//                         <AudioPlayer audioUri={lessonKeyTakeawayAudio} />

//                         <Text style={styles.takeawayHeader}>Key Takeaways</Text>
//                         {keyTakeaway && keyTakeaway.length > 0 ? (
//                             keyTakeaway.map(
//                                 (takeaway: string, index: number) => (
//                                     <View key={index}>
//                                         <Text style={styles.takeawayText}>
//                                             {index + 1}. {takeaway}
//                                         </Text>
//                                     </View>
//                                 )
//                             )
//                         ) : (
//                             <OverviewCard
//                                 isError={true}
//                                 text="Key Takeaways are not available. Please check with your administrator."
//                             />
//                         )}

//                         <View
//                             style={{
//                                 width: '100%',
//                                 flexDirection: 'row-reverse',
//                                 marginBottom: 20,
//                             }}
//                         >
//                             <Image
//                                 style={{height: 110}}
//                                 source={require('@/assets/images/happycloseeye.png')}
//                             ></Image>
//                         </View>
//                     </View>
//                     <CustomButton
//                         label="continue"
//                         backgroundColor="white"
//                         isScroll={isScroll}
//                         onPressHandler={handlePress}
//                     />
//                 </>
//             )}
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: Colors.light.background,
//         padding: 20,
//         flex: 1,
//     },
//     screenTitle: {
//         fontSize: Colors.lessonName.fontSize,
//         fontWeight: 'bold',
//         color: Colors.header.color,
//         marginBottom: 20,
//         marginHorizontal: 10,
//     },
//     takeawayHeader: {
//         marginBottom: 10,
//         marginTop: 20,
//         marginLeft: 15,
//         color: Colors.header.color,
//         fontWeight: 'bold',
//         fontSize: Colors.header.fontSize,
//     },
//     takeawayText: {
//         marginLeft: 15,
//         fontSize: Colors.text.fontSize,
//         lineHeight: 22,
//         color: Colors.header.color,
//         marginBottom: 25,
//     },
//     buttonContainer: {
//         alignItems: 'center',
//         justifyContent: 'flex-end',
//         paddingBottom: 20,
//     },
// });

import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

import * as unitEndpoints from '@/helpers/unitEndpoints';
import * as lessonEndpoints from '@/helpers/lessonEndpoints';
import * as gamificationEndpoints from '@/helpers/gamificationEndpoints';
import * as userStoneProgressEndpoints from '@/helpers/userStoneProgressEndpoints';

import { AuthContext } from '@/context/AuthContext';
import { useTimer } from '@/helpers/useTimer';
import { formatSection } from '@/helpers/formatSectionID';
import { formatUnit } from '@/helpers/formatUnitID';

import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

import ProgressBar from '@/components/ProgressBar';
import SectionCard from '@/components/SectionCard';
import { AudioPlayer } from '@/components/AudioPlayer';
import { OverviewCard } from '@/components/OverviewCard';
import { CustomButton } from '@/components/CustomButton';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import {useUpdateUserScreenProgress} from '@/hooks/useUpdateUserScreenProgress';


export default function KeyTakeaway() {
  const navigation = useNavigation();
  const { currentUser } = useContext(AuthContext);

  const {
    sectionID,
    unitID,
    lessonID,
    stoneIndex,
    screenIndex,
    totalScreens,
    inProgress
  } = useLocalSearchParams();

  useUpdateUserScreenProgress({
              stoneIndex: Number(stoneIndex),
              screenIndex: Number(screenIndex),
              screenPathname: 'KeyTakeaway',
              inProgress: inProgress === 'true',
          });
  

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shouldShowStreak, setShouldShowStreak] = useState<boolean>(false);
  const [sectionNumber, setSectionNumber] = useState<string>('');
  const [unitNumber, setUnitNumber] = useState<string>('');
  const [unitName, setUnitName] = useState<string>('');
  const [lessonName, setLessonName] = useState<string>('');
  const [keyTakeaway, setKeyTakeaway] = useState<string[]>([]);
  const [lessonKeyTakeawayAudio, setLessonKeyTakeawayAudio] = useState<string>('');
  const [isScroll, setIsScroll] = useState<boolean>(false);

  const screenHeight = Dimensions.get('window').height;
  const { startTimer, stopTimer } = useTimer(
    sectionID as string,
    'Key Takeaway',
    unitID as string,
    lessonID as string
  );

  useLayoutEffect(() => {
    const progress = (Number(screenIndex) + 1 || 1) / (Number(totalScreens) || 1);

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
  }, [navigation]);

  const handlePress = async () => {
    try {
      const userStoneProgress = {
        userID: currentUser.sub,
        last_completed_stone_index: parseInt(stoneIndex as string),
        current_stone_index: parseInt(stoneIndex as string) + 1,
        current_screen_index: 0,
        current_screen_pathname: null,
      };

      await userStoneProgressEndpoints.updateUserStoneProgress(userStoneProgress);
      console.log('User stone progress updated successfully.');

      if (shouldShowStreak) {
        router.push({
          pathname: 'Streak',
          params: {
            sectionID,
            unitID,
            lessonID,
            stoneIndex,
            screenIndex: (Number(screenIndex) + 1).toString(),
            totalScreens,
          },
        });
      } else {
        router.replace('Home');
      }
    } catch (error) {
      console.error('Error updating stone progress:', error);
      router.replace('Home');
    } finally {
      stopTimer();
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        startTimer();

        if (sectionID && unitID && lessonID) {
          const [
            unitDetails,
            lessonDetails,
            getAllLessons,
            shouldShowStreakResult,
          ] = await Promise.all([
            unitEndpoints.getUnitDetails(sectionID as string, unitID as string),
            lessonEndpoints.getLessonDetails(sectionID as string, unitID as string, lessonID as string),
            lessonEndpoints.getAllLesson(sectionID as string, unitID as string),
            gamificationEndpoints.getShouldShowStreak(currentUser.sub),
          ]);

          let lessonTitle = lessonDetails.lessonName;
          if (lessonID.includes('.')) {
            lessonTitle = lessonTitle.replace(/\.\d+/, '');
          }

          setUnitName(unitDetails.unitName);
          setLessonName(lessonTitle);
          setKeyTakeaway(lessonDetails.lessonKeyTakeaway);
          setLessonKeyTakeawayAudio(lessonDetails.lessonKeyTakeawayAudio);
          setSectionNumber(formatSection(sectionID as string));
          setUnitNumber(formatUnit(unitID as string));
          setShouldShowStreak(shouldShowStreakResult);
        }
      } catch (error) {
        console.error('Error fetching Key Takeaway details:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [sectionID, unitID]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <View style={{ flexGrow: 1 }}>
            <SectionCard
              title={`SECTION ${sectionNumber}, UNIT ${unitNumber}`}
              subtitle={unitName}
            />
            <Text style={styles.screenTitle}>{lessonName}</Text>

            <AudioPlayer audioUri={lessonKeyTakeawayAudio} />

            <Text style={styles.takeawayHeader}>Key Takeaways</Text>

            {keyTakeaway && keyTakeaway.length > 0 ? (
              keyTakeaway.map((takeaway, index) => (
                <View key={index}>
                  <Text style={styles.takeawayText}>
                    {index + 1}. {takeaway}
                  </Text>
                </View>
              ))
            ) : (
              <OverviewCard
                isError={true}
                text="Key Takeaways are not available. Please check with your administrator."
              />
            )}

            <View style={styles.happyImageContainer}>
              <Image
                style={{ height: 110 }}
                source={require('@/assets/images/happycloseeye.png')}
              />
            </View>
          </View>

          <CustomButton
            label="continue"
            backgroundColor="white"
            isScroll={isScroll}
            onPressHandler={handlePress}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  screenTitle: {
    fontSize: Colors.lessonName.fontSize,
    fontWeight: 'bold',
    color: Colors.header.color,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  takeawayHeader: {
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 15,
    color: Colors.header.color,
    fontWeight: 'bold',
    fontSize: Colors.header.fontSize,
  },
  takeawayText: {
    marginLeft: 15,
    fontSize: Colors.text.fontSize,
    lineHeight: 22,
    color: Colors.header.color,
    marginBottom: 25,
  },
  happyImageContainer: {
    width: '100%',
    flexDirection: 'row-reverse',
    marginBottom: 20,
  },
});
