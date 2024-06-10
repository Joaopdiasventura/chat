import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { app, useChatContext, useUserContext } from "../contexts";
import { Message, MessageComponent } from "../components/message";

export function Chat() {
  const { chat } = useChatContext();
  const { user } = useUserContext();
  const [messages, setMessages] = useState<Message[]>([]);

  const getData = async () => {
    const result = await app
      .get("/message/" + chat)
      .then((result) => result.data);
    setMessages(result);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View className="flex-1 bg-white p-3">
      <View className="flex">
        {messages &&
          messages.map((message) => (
            <MessageComponent {...message} User={`${user?.email}`} />
          ))}
      </View>
    </View>
  );
}
