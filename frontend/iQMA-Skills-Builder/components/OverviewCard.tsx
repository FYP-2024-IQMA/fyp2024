import { Text, View } from "react-native";

export const OverviewCard = ({text}: {text: string}) => {

    return (
        <>
        <View style={{
                backgroundColor: '#EAF1FF',
                borderRadius: 5,
                padding: 10,
                marginBottom: 20
            }}>
                <Text style={{
                    color: '#4143A3',
                    fontSize: 12
                }}>{text}</Text>
            </View></>
    );

}