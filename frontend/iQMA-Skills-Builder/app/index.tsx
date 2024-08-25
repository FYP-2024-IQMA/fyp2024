import { Text, View, Image, ActivityIndicator } from "react-native";
import { LoginButton } from "@/components/LoginButton";
import { LogoVisual } from "@/components/LogoVisual";
import { Profile } from "@/components/Profile";
import { LogoutButton } from "@/components/LogoutButton";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

// where things show up
export default function Index() {

    const { currentUser, isLoading } = useContext(AuthContext);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: '#C3B1FF'
            }}
        >
          <LogoVisual></LogoVisual>
            <LoginButton></LoginButton>
            
            {/* For Testing & Debugging */}
            <Profile></Profile> 
        </View>
    );
}
