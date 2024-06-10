import React from "react";
import { View, Text } from "react-native";
import { useChatContext } from "../contexts";
import { useNavigation } from "@react-navigation/native";

interface chatProps {
  name: string;
  email: string;
  messages: any[];
}

export function ChatComponent(props: chatProps) {
  const { email, name, messages } = props;

  const { navigate } = useNavigation();
  const { setChat } = useChatContext();

  const dateString = messages[messages.length - 1].sendAt;

  const date = new Date(dateString);

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
    setChat(messages[0].chat);
    navigate("Chat" as never);
  };

  return (
    <View
      className="border my-1.5 p-1.5 rounded-md"
      key={email}
      onTouchStart={SetChat}
    >
      <View className="flex-row gap-1.5 mb-1">
        <Text className="font-black color-red-600">{name}</Text>
        <Text className="color-zinc-600">{email}</Text>
      </View>
      <View className="flex-row justify-between w-full px-1">
        <Text>{messages[0].content}</Text>
        <Text>{formatedDate}</Text>
      </View>
    </View>
  );
}
