import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { app, useChatContext, useUserContext } from "../contexts";
import { Message } from "../components/message";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export function AddChat() {
  const { navigate } = useNavigation();
  const { setChat } = useChatContext();
  const { user } = useUserContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [receiver, setReceiver] = useState<string>("");

  const sendMessage = async () => {
    if (message.length > 0) {
      const body = {
        content: message,
        chat: "6664bb605ef3e53c185eb42b",
        user: user?.email,
        user_: receiver,
      };
      try {
        const result = await app
          .post("/message", body)
          .then((result) => result.data);
        setMessages([...messages, result]);
        setMessage("");
        setChat(result.chat);
        navigate("Chat" as never);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View className="flex-1 w-screen h-screen bg-black px-3 m-0 py-0 flex flex-col justify-between items-center">
      <View className="flex flex-row justify-between items-center border p-1.5 rounded-lg mb-4 w-full">
        <TextInput
          onChangeText={(text) => setReceiver(text)}
          value={receiver}
          placeholder="Digite o destinatário"
        />
      </View>
      <View className="flex flex-row justify-between items-center border p-1.5 rounded-lg w-full">
        <TextInput
          onChangeText={(text) => setMessage(text)}
          value={message}
          placeholder="Digite o destinatário"
        />
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="play" color="red" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
