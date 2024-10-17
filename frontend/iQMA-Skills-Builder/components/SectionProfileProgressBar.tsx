import {Colors} from '@/constants/Colors';
import {Text, View} from 'react-native';
import * as Progress from 'react-native-progress';

interface ProgressBarProps {
    progress: number;
}

export const SectionProfileProgressBar: React.FC<ProgressBarProps> = ({
    progress,
}) => {
    return (
        <View>
            <Progress.Bar
                progress={progress}
                width={null}
                color={Colors.default.purple500}
                unfilledColor={Colors.light.unFilled}
                borderWidth={0}
            />
        </View>
    );
};
