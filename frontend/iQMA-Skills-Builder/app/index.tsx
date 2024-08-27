import { ActivityIndicator, Image, Text, View } from "react-native";

import { AuthContext } from "@/context/AuthContext";
import { LoginButton } from "@/components/LoginButton";
import { LogoVisual } from "@/components/LogoVisual";
import { LogoutButton } from "@/components/LogoutButton";
import { Profile } from "@/components/Profile";
import { useContext } from "react";

// where things show upp
export default function Index() {
  const { currentUser, isLoading } = useContext(AuthContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#C3B1FF",
      }}
    >
      <LogoVisual></LogoVisual>
      <LoginButton></LoginButton>

      {/* For Testing & Debugging */}
      <Profile></Profile>
    </View>
  );
}
