import {StyleSheet, Text, View} from 'react-native';

import {Colors} from '@/constants/Colors';

export const OverviewCard = ({
    text,
    title,
    isCheatsheetObject,
    isError,
    isScenario,
}: {
    text: string | string[];
    title?: string;
    isCheatsheetObject?: boolean;
    isError?: boolean;
    isScenario?: boolean;
}) => {
    return (
        <>
            <View
                style={[
                    styles.BaseCard,
                    isError ? styles.ErrorCard : styles.OverviewCard,
                ]}
            >
                {title && (
                    <Text
                        style={
                            isScenario
                                ? styles.ScenarioTitle
                                : styles.OverviewCardTitle
                        }
                    >
                        {title}
                    </Text>
                )}
                {Array.isArray(text) ? (
                    text.map((item, index) => (
                        <Text
                            key={index}
                            style={[
                                index !== 0 ? {paddingTop: 10} : {},
                                styles.OverviewCardSubtitle,
                                isCheatsheetObject
                                    ? styles.OverviewCardSubtitleArr
                                    : index !== 0
                                    ? {marginTop: 10}
                                    : {},
                                isScenario ? styles.ScenarioCardSubtitle : {},
                            ]}
                        >
                            {item}
                        </Text>
                    ))
                ) : (
                    <Text
                        style={[
                            styles.OverviewCardSubtitle,
                            isCheatsheetObject
                                ? styles.OverviewCardSubtitleArr
                                : {},
                            isError ? styles.ErrorCardSubtitle : {},
                            isScenario ? styles.ScenarioCardSubtitle : {},
                        ]}
                    >
                        {text}
                    </Text>
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    BaseCard: {
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    OverviewCard: {
        backgroundColor: Colors.overviewCard.background,
    },
    ErrorCard: {
        backgroundColor: Colors.default.red,
    },
    OverviewCardTitle: {
        fontSize: Colors.overviewCard.cardTitleFontSize,
        fontWeight: 'bold',
    },
    OverviewCardSubtitle: {
        fontSize: Colors.overviewCard.cardSubtitleFontSize,
        lineHeight: Colors.overviewCard.lineHeight,
    },
    OverviewCardSubtitleArr: {
        marginTop: 10,
        marginLeft: 20,
    },
    ErrorCardSubtitle: {
        color: Colors.light.background,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    ScenarioTitle: {
        fontSize: Colors.overviewCard.cardTitleFontSize,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    ScenarioCardSubtitle: {
        fontSize: Colors.overviewCard.cardSubtitleFontSize,
        lineHeight: Colors.overviewCard.lineHeight,
    },
});
