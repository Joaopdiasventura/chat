import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { app, useUserContext } from "../contexts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChatComponent } from "../components/chat";
import { useNavigation } from "@react-navigation/native";

export function Chats() {
  const { navigate } = useNavigation();
  const { user, setUser } = useUserContext();

  const [chats, setChats] = useState<any[]>([]);

  const getUser = async () => {
    if (!user) {
      const userJson = await AsyncStorage.getItem("user");
      if (userJson) {
        setUser(JSON.parse(userJson));
      } else {
        navigate("Chats" as never);
      }
    }
  };

  const getData = async () => {
    const email = user?.email;
    const result = await app
      .get("/chat/firsts/" + email)
      .then((result) => result.data);
    console.log(result);
    setChats(result);
    console.log(chats[0].messages[0].chat);
  };

  useEffect(() => {
    getUser();
    getData();
  }, []);

  return (
    <View className="flex-1 bg-white p-3">
      {chats.map((chat) => (
        <ChatComponent {...chat} />
      ))}
    </View>
  );
}
