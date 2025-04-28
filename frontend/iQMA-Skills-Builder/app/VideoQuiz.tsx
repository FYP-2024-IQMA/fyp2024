// import * as lessonEndpoints from '@/helpers/lessonEndpoints';
// import * as quizEndpoints from '@/helpers/quizEndpoints';
// import * as resultEndpoints from '@/helpers/resultEndpoints';
// import * as unitEndpoints from '@/helpers/unitEndpoints';
// import * as gamificationEndpoints from '@/helpers/gamificationEndpoints';

// import {
//     Image,
//     ScrollView,
//     StyleSheet,
//     Text,
//     View,
//     TouchableOpacity,
// } from 'react-native';
// import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
// import {router, useLocalSearchParams} from 'expo-router';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {AuthContext} from '@/context/AuthContext';
// import {Colors} from '@/constants/Colors';
// import {LoadingIndicator} from '@/components/LoadingIndicator';
// import ProgressBar from '@/components/ProgressBar';
// import {Question} from '@/constants/Quiz';
// import {QuizCard} from '@/components/QuizCard';
// import SectionCard from '@/components/SectionCard';
// import {formatSection} from '@/helpers/formatSectionID';
// import {formatUnit} from '@/helpers/formatUnitID';
// import {useNavigation} from '@react-navigation/native';
// import {useTimer} from '@/helpers/useTimer';
// import {Ionicons} from '@expo/vector-icons';
// import {useUpdateUserScreenProgress} from '@/hooks/useUpdateUserScreenProgress';


// export default function VideoQuiz() {
//     const navigation = useNavigation();
//     const {currentUser, isLoading} = useContext(AuthContext);
//     const {sectionID, unitID, lessonID, stoneIndex, screenIndex, totalScreens, inProgress} =
//         useLocalSearchParams();

//     useUpdateUserScreenProgress({
//                 stoneIndex: Number(stoneIndex),
//                 screenIndex: Number(screenIndex),
//                 screenPathname: 'VideoQuiz',
//                 inProgress: inProgress === 'true',
//             });

//     const [currentQnsIdx, setCurrentQnsIdx] = useState(0);
//     const [sectionNumber, setSectionNumber] = useState<string>('');
//     const [unitNumber, setUnitNumber] = useState<string>('');
//     const [unitName, setUnitName] = useState<string>('');
//     const [questions, setQuestions] = useState<Question[]>([]);
//     const [lessonName, setLessonName] = useState<string>('');
//     const [loading, setIsLoading] = useState<boolean>(true);
//     const [nextLessonID, setnextLessonID] = useState<string>('');
//     const {startTimer, stopTimer} = useTimer(
//         sectionID as string,
//         'Video Quiz',
//         unitID as string,
//         lessonID as string
//     );
//     const [totalPoints, setTotalPoints] = useState<number>(0);
//     // const [currentPoints, setCurrentPoints] = useState<number>(0);

//     // const lessonName = "Lesson 1a: Understanding Verbal and Non-verbal Signals";
//     // const sectionID = "SEC0001";
//     // const unitID = "UNIT0001";
//     // const lessonID = "1a";

//     useEffect(() => {
//         startTimer();
//         if (sectionID && unitID && lessonID) {
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

//                     // let nxtLessonIdx = parseInt(currentLessonIdx as string) + 1;

//                     // if (nxtLessonIdx === parseInt(totalLesson as string)) {
//                     //     setnextLessonID('LastLesson');
//                     // } else {
//                     //     setnextLessonID(getAllLessons[nxtLessonIdx].lessonID);
//                     // }

//                     const response = await quizEndpoints.getQuizzes(
//                         sectionID as string,
//                         unitID as string,
//                         lessonID as string
//                     );

//                     setLessonName(lessonDetails.lessonName);
//                     setUnitName(unitDetails.unitName);
//                     setQuestions(response);
//                     setSectionNumber(formatSection(sectionID as string));
//                     setUnitNumber(formatUnit(unitID as string));
//                 } catch (error) {
//                     console.error('Error fetching quiz data:', error);
//                 } finally {
//                     setIsLoading(false);
//                 }
//             })();
//         }
//     }, [sectionID, unitID, lessonID, nextLessonID]);

//     useLayoutEffect(() => {
//         // const progress =
//         //     parseInt(currentProgress as string) /
//         //     parseInt(totalProgress as string);

//         const progress = ((Number(screenIndex) + 1) || 1) / (Number(totalScreens) || 1);


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

//     const handleNextQuestion = async () => {
//         const newIdx = currentQnsIdx + 1;
//         if (newIdx < questions.length) {
//             await AsyncStorage.setItem('currentQnsIdx', newIdx.toString());
//             setCurrentQnsIdx(newIdx);
//         } else {
//             try {
//                 const ifCompleted = await resultEndpoints.checkIfCompletedQuiz(
//                     currentUser.sub,
//                     questions[currentQnsIdx].quizID
//                 );

//                 if (!ifCompleted) {
//                     await resultEndpoints.createResult(
//                         currentUser.sub,
//                         questions[currentQnsIdx].quizID
//                     );

//                     let points = await AsyncStorage.getItem('totalPoints');
//                     const numPoints = parseInt(points as string);

//                     await gamificationEndpoints.updatePoints(
//                         currentUser.sub,
//                         numPoints
//                     );
//                 }

//                 // let pathName = 'KeyTakeaway';
//                 // let currLessonID = lessonID;
//                 // let currLessonIdx = parseInt(currentLessonIdx as string);

//                 // console.log('nextLessonID:', nextLessonID);

//                 // // if nextlessonID have "." then route back to Lesson page
//                 // if (nextLessonID.includes('.')) {
//                 //     pathName = 'Lesson';
//                 //     currLessonID = nextLessonID;
//                 //     currLessonIdx += 1;
//                 // }
                

//                 router.push({
//                     pathname: 'KeyTakeaway',
//                     params: {
//                         sectionID,
//                         unitID,
//                         lessonID,
//                         stoneIndex,
//                         screenIndex: (Number(screenIndex) + 1).toString(), // increment by 1 screen
//                         totalScreens,
//                         inProgress
                        
//                     },
//                 });
//                 stopTimer();
//             } catch (e) {
//                 console.error('Error in Video Quiz', e);
//             }
//         }
//     };

//     // const handleTotalPoints = async (points: number) => {
//     //     setTotalPoints(points);
//     //     console.log('total points in video quiz is ', points);
//     // };

//     return (
//         <ScrollView
//             contentContainerStyle={{flexGrow: 1}}
//             style={styles.container}
//         >
//             {loading ? (
//                 <LoadingIndicator />
//             ) : (
//                 <>
//                     <SectionCard
//                         title={`SECTION ${sectionNumber}, UNIT ${unitNumber}`}
//                         subtitle={unitName}
//                     />
//                     <View style={{marginHorizontal: 10}}>
//                         <Text
//                             style={{
//                                 fontSize: 14,
//                                 fontWeight: 'bold',
//                                 color: Colors.header.color,
//                             }}
//                         >
//                             {lessonName}
//                         </Text>
//                         <Text
//                             style={{
//                                 fontSize: 14,
//                                 color: Colors.header.color,
//                                 marginBottom: 10,
//                             }}
//                         >
//                             Choose the most appropriate option for each
//                             question.
//                         </Text>

//                         <View style={{alignItems: 'center'}}>
//                             <Image
//                                 style={{marginBottom: 10}}
//                                 source={require('@/assets/images/deepinthought.png')}
//                             />
//                         </View>
//                         {questions.length > 0 && questions[currentQnsIdx] && (
//                             <QuizCard
//                                 sectionID={sectionID as string}
//                                 questionData={questions[currentQnsIdx]}
//                                 onNextQuestion={handleNextQuestion}
//                                 // onTotalPoints={handleTotalPoints}
//                             />
//                         )}
//                     </View>
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
// });

import * as lessonEndpoints from '@/helpers/lessonEndpoints';
import * as quizEndpoints from '@/helpers/quizEndpoints';
import * as resultEndpoints from '@/helpers/resultEndpoints';
import * as unitEndpoints from '@/helpers/unitEndpoints';
import * as gamificationEndpoints from '@/helpers/gamificationEndpoints';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '@/context/AuthContext';
import { Colors } from '@/constants/Colors';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import ProgressBar from '@/components/ProgressBar';
import { Question } from '@/constants/Quiz';
import { QuizCard } from '@/components/QuizCard';
import SectionCard from '@/components/SectionCard';
import { formatSection } from '@/helpers/formatSectionID';
import { formatUnit } from '@/helpers/formatUnitID';
import { useNavigation } from '@react-navigation/native';
import { useTimer } from '@/helpers/useTimer';
import { Ionicons } from '@expo/vector-icons';
import { useUpdateUserScreenProgress } from '@/hooks/useUpdateUserScreenProgress';

export default function VideoQuiz() {
  const navigation = useNavigation();
  const { currentUser } = useContext(AuthContext);
  const { sectionID, unitID, lessonID, stoneIndex, screenIndex, totalScreens, inProgress } = useLocalSearchParams();

  useUpdateUserScreenProgress({
    stoneIndex: Number(stoneIndex),
    screenIndex: Number(screenIndex),
    screenPathname: 'VideoQuiz',
    inProgress: inProgress === 'true',
  });

  const { startTimer, stopTimer } = useTimer(
    sectionID as string,
    'Video Quiz',
    unitID as string,
    lessonID as string
  );

  const [currentQnsIdx, setCurrentQnsIdx] = useState(0);
  const [sectionNumber, setSectionNumber] = useState('');
  const [unitNumber, setUnitNumber] = useState('');
  const [unitName, setUnitName] = useState('');
  const [lessonName, setLessonName] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        startTimer();

        const [unitDetails, lessonDetails, quizzes] = await Promise.all([
          unitEndpoints.getUnitDetails(sectionID as string, unitID as string),
          lessonEndpoints.getLessonDetails(sectionID as string, unitID as string, lessonID as string),
          quizEndpoints.getQuizzes(sectionID as string, unitID as string, lessonID as string),
        ]);

        setUnitName(unitDetails.unitName);
        setLessonName(lessonDetails.lessonName);
        setQuestions(quizzes);
        setSectionNumber(formatSection(sectionID as string));
        setUnitNumber(formatUnit(unitID as string));
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (sectionID && unitID && lessonID) {
      fetchQuizData();
    }
  }, [sectionID, unitID, lessonID]);

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
  }, [navigation]);

  const handleNextQuestion = async () => {
    const newIdx = currentQnsIdx + 1;

    if (newIdx < questions.length) {
      setCurrentQnsIdx(newIdx);
      await AsyncStorage.setItem('currentQnsIdx', newIdx.toString());
    } else {
      try {
        const currentQuizID = questions[currentQnsIdx]?.quizID;
        const alreadyCompleted = await resultEndpoints.checkIfCompletedQuiz(currentUser.sub, currentQuizID);

        if (!alreadyCompleted) {
          await resultEndpoints.createResult(currentUser.sub, currentQuizID);

          const points = await AsyncStorage.getItem('totalPoints');
          const numPoints = parseInt(points || '0', 10);

          if (!isNaN(numPoints)) {
            await gamificationEndpoints.updatePoints(currentUser.sub, numPoints);
          }
        }

        stopTimer();

        router.push({
          pathname: 'KeyTakeaway',
          params: {
            sectionID,
            unitID,
            lessonID,
            stoneIndex,
            screenIndex: (Number(screenIndex) + 1).toString(),
            totalScreens,
            inProgress,
          },
        });
      } catch (error) {
        console.error('Error moving to KeyTakeaway:', error);
      }
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
      <SectionCard title={`SECTION ${sectionNumber}, UNIT ${unitNumber}`} subtitle={unitName} />

      <View style={{ marginHorizontal: 10 }}>
        <Text style={styles.lessonTitle}>{lessonName}</Text>
        <Text style={styles.instructionText}>
          Choose the most appropriate option for each question.
        </Text>

        <View style={styles.imageWrapper}>
          <Image source={require('@/assets/images/deepinthought.png')} style={styles.image} />
        </View>

        {questions.length > 0 && questions[currentQnsIdx] && (
          <QuizCard
            key={questions[currentQnsIdx].questionNo} // <-- ensures rerender
            sectionID={sectionID as string}
            questionData={questions[currentQnsIdx]}
            onNextQuestion={handleNextQuestion}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    padding: 20,
    flex: 1,
  },
  lessonTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.header.color,
  },
  instructionText: {
    fontSize: 14,
    color: Colors.header.color,
    marginBottom: 10,
  },
  imageWrapper: {
    alignItems: 'center',
  },
  image: {
    marginBottom: 10,
  },
});
