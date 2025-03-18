import {LoginButton} from '@/components/LoginButton';
import {LogoVisual} from '@/components/LogoVisual';
import { useState } from 'react';
import {View} from 'react-native';

export default function Login() {

    return (
        <>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#C3B1FF',
                    padding: 20,
                }}
            >
                <LogoVisual />
                <LoginButton />
            </View>
        </>
    );
}
