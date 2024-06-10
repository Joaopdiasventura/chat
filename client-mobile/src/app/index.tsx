import React from "react";
import { ChatProvider, UserProvider } from "../contexts";
import { Screens } from "./screens";

export default function App() {
  return (
    <UserProvider>
      <ChatProvider>
        <Screens />
      </ChatProvider>
    </UserProvider>
  );
}
