import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { app, useUserContext } from "../contexts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChatComponent } from "../components/chat";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

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
        navigate("Enter" as never);
      }
    }
  };

  const getData = async () => {
    console.log(user);
    if (user) {
      const { email } = user;
      const result = await app
        .get("/chat/firsts/" + email)
        .then((result) => result.data);
      setChats(result);
      console.log(result);
    }
  };

  const newChat = () => {
    navigate("AddChat" as never);
  };

  useEffect(() => {
    getUser();
    getData();
  }, []);

  return (
    <View className="flex-1 bg-white p-3">
      <TouchableOpacity
        onPress={newChat}
        className="flex flex-row justify-between items-center border rounded-md p-1.5"
      >
        <View className="">
          <Text className="font-black color-red-600">Adicionar Conversa</Text>
        </View>
        <View className="bg-red-600 rounded-full">
          <Ionicons name="add" color="white" size={25} />
        </View>
      </TouchableOpacity>
      {chats.map((chat) => (
        <ChatComponent {...chat} />
      ))}
    </View>
  );
}
