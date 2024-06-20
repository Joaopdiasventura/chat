import React from "react";
import { ChatProvider, UserProvider } from "../contexts";
import { Screens } from "./screens";
import { StatusBar, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 bg-black">
      <UserProvider>
        <StatusBar hidden={true} />
        <ChatProvider>
          <Screens />
        </ChatProvider>
      </UserProvider>
    </View>
  );
}
