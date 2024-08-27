import {Text, View} from 'react-native';

import {LoginButton} from '@/components/LoginButton';
import {LogoutButton} from '@/components/LogoutButton';
import {Profile} from '@/components/Profile';

// where things show up
export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text>Hello IQMA</Text>
            <LoginButton></LoginButton>
            <LogoutButton></LogoutButton>
            <Profile></Profile>
        </View>
    );
}
