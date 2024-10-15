/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
    light: {
        text: '#11181C',
        background: '#FFFFFF',
        borderColor: '#CCC',
        color: '#4143A3',
        tint: tintColorLight,
        tabIconSelected: tintColorLight,
    },
    overviewCard: {
        background: '#EAF1FF',
        cardTitleFontSize: 14,
        cardSubtitleFontSize: 13,
        lineHeight: 20,
    },
    header: {
        background: '#FFFFFF',
        color: '#4143A3',
        fontSize: 14,
    },
    text: {
        fontSize: 13,
        lineHeight: 20,
    },
    learnerAssessment: {
        lineHeight: 20,
    },
    lessonName: {
        fontSize: 14,
    },
    profile: {
        inputColor: '#F7F7F7',
    },
    chatbot: {
        inputColor: '#D1D5DB',
    },
    border: {
        correctColor: '#9CA3AF',
        wrongColor: '#ff4c4c',
    },
    default: {
        purple500: '#7654F2',
        purple100: '#B199FF',
        optionText: '#5C5776',
        optionFontSize: 14,
        red: '#E66A63',
        green: '#8CE5CB',
    },
    dark: {
        tint: tintColorDark,
        tabIconSelected: tintColorDark,
    },
};
