import React from "react";
import { View, Text } from "react-native";

interface chatProps {
  name: string;
  email: string;
  messages: any[];
}

export function ChatComponent(props: chatProps) {
  const { email, name, messages } = props;

  var dataString = messages[messages.length - 1].sendAt;

  var data = new Date(dataString);

  var dataFormatada =
    ("0" + data.getDate()).slice(-2) +
    "/" +
    ("0" + (data.getMonth() + 1)).slice(-2) +
    "/" +
    data.getFullYear().toString().slice(-2) +
    " " +
    ("0" + data.getHours()).slice(-2) +
    ":" +
    ("0" + data.getMinutes()).slice(-2);

  return (
    <View className="border p-1.5">
      <View className="flex-row gap-1.5 mb-1">
        <Text className="font-bold">{name}</Text>
        <Text className="color-zinc-600">{email}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text>{messages[messages.length - 1].content}</Text>
        <Text>{dataFormatada}</Text>
      </View>
    </View>
  );
}
