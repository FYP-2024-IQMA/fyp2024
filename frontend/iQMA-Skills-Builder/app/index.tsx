import {Image, Text, View} from 'react-native';

import {LoginButton} from '@/components/LoginButton';
import {LogoVisual} from '@/components/LogoVisual';
import {Profile} from '@/components/Profile';

// where things show upp
export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#C3B1FF',
            }}
        >
            <LogoVisual></LogoVisual>
            <LoginButton></LoginButton>
            <Profile></Profile>
        </View>
    );
}
