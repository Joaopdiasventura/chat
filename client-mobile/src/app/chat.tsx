import React, { useEffect, useState, useRef } from "react";
import { View, TextInput, ScrollView } from "react-native";
import { app, useChatContext, useUserContext } from "../contexts";
import { Message, MessageComponent } from "../components/message";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export function Chat() {
  const { chat } = useChatContext();
  const { user } = useUserContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const scrollViewRef = useRef<ScrollView>(null); // Criando a ref para o ScrollView

  const getData = async () => {
    const result = await app
      .get("/message/" + chat)
      .then((result) => result.data);
    setMessages(result);
  };

  const sendMessage = async () => {
    if (message.length > 0) {
      const body = { content: message, chat: chat, user: user?.email };
      try {
        const result = await app
          .post("/message", body)
          .then((result) => result.data);
        setMessages([...messages, result]);
        setMessage("");
        scrollViewRef.current?.scrollToEnd();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View className="flex-1 h-screen bg-white px-3 m-0 py-0">
      <ScrollView className="flex h-90 overflow-auto" ref={scrollViewRef}>
        {messages.map((message) => (
          <MessageComponent
            key={message.id}
            {...message}
            User={`${user?.email}`}
          />
        ))}
      </ScrollView>
      <View className="flex flex-row justify-between items-center border p-1.5 rounded-lg">
        <TextInput
          onChangeText={(text) => setMessage(text)}
          value={message}
          placeholder="Digite sua mensagem..."
        />
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="play" color="red" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
