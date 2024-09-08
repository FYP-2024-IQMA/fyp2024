import {StyleSheet, Text, View} from 'react-native';

export const OverviewCard = ({
    text,
    title,
    isCheatsheetObject,
    isError,
}: {
    text: string | string[];
    title?: string;
    isCheatsheetObject?: boolean;
    isError?: boolean;
}) => {
    return (
        <>
            <View
                style={[
                    styles.BaseCard,
                    isError ? styles.ErrorCard : styles.OverviewCard,
                ]}
            >
                {title && <Text style={styles.OverviewCardTitle}>{title}</Text>}
                {Array.isArray(text) ? (
                    text.map((item, index) => (
                        <Text
                            key={index}
                            style={[
                                styles.OverviewCardSubtitle,
                                isCheatsheetObject
                                    ? styles.OverviewCardSubtitleArr
                                    : index !== 0
                                      ? {marginTop: 10}
                                      : {},
                            ]}
                        >
                            {item}
                        </Text>
                    ))
                ) : (
                    <Text
                        style={[
                            styles.OverviewCardSubtitle,
                            isCheatsheetObject ? styles.OverviewCardSubtitleArr : {},
                            isError ? styles.ErrorCardSubtitle : {},
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
        backgroundColor: '#EAF1FF',
    },
    ErrorCard: {
        backgroundColor: '#E66A63',
    },
    OverviewCardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    OverviewCardSubtitle: {
        fontSize: 12,
    },
    OverviewCardSubtitleArr: {
        marginTop: 10,
        marginLeft: 20,
    },
    ErrorCardSubtitle: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
