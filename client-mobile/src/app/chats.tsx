import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { app, useUserContext } from "../contexts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChatComponent } from "../components/chat";

export function Chats() {
  const { user, setUser } = useUserContext();

  const [chats, setChats] = useState<any[]>([]);

  const getUser = async () => {
    if (!user) {
      const userJson = await AsyncStorage.getItem("user");
      if (userJson) {
        setUser(JSON.parse(userJson));
      }
    }
  };

  const getData = async () => {
    console.log(user);
    const email = user?.email;
    console.log(email);
    const result = await app
      .get("/message/chats/" + email)
      .then((result) => result.data);
    console.log(result);
    setChats(result);
  };

  useEffect(() => {
    getUser();
    getData();
  }, [user]);

  return (
    <View className="flex-1 bg-white">
      {chats.map((chat) => (
        <ChatComponent {...chat} />
      ))}
    </View>
  );
}
