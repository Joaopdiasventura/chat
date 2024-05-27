import React from "react";
import { UserProvider } from "../contexts";
import * as Font from "expo-font";
import { Ionicons as icons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { Screens } from "./screens";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      ...icons.font,
    });
    setFontsLoaded(true);
  };

  React.useEffect(() => {
    loadFonts();
  }, []);
  return (
    <UserProvider>
      <Screens />
    </UserProvider>
  );
}
