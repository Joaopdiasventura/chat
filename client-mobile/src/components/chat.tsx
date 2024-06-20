import React from "react";
import { View, Text } from "react-native";
import { useChatContext } from "../contexts";
import { useNavigation } from "@react-navigation/native";

interface chatProps {
  content: string;
  sendAt: Date;
  chat: string;
  User: { name: string; email: string };
}

export function ChatComponent(props: chatProps) {
  const { navigate } = useNavigation();
  const { chat, setChat } = useChatContext();

  const date = new Date(props.sendAt);

  const formatedDate =
    ("0" + date.getDate()).slice(-2) +
    "/" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    date.getFullYear().toString().slice(-2) +
    " " +
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2);

  const SetChat = () => {
    setChat(props.chat);
    console.log(chat);

    navigate("Chat" as never);
  };

  return (
    <View
      className="border my-1.5 p-1.5 rounded-md border-white"
      key={`${props.sendAt}-${props.User.email}`}
      onTouchStart={SetChat}
    >
      <View className="flex-row gap-1.5 mb-1">
        <Text className="font-black text-red-600">{props.User.name}</Text>
        <Text className="text-zinc-400">{props.User.email}</Text>
      </View>
      <View className="flex-row justify-between w-full px-1">
        <Text className="text-white">{props.content}</Text>
        <Text className="text-white">{formatedDate}</Text>
      </View>
    </View>
  );
}
