import React from "react";
import { Text, View } from "react-native";

export interface Message {
  chat: String;
  content: String;
  id: string;
  sendAt: Date;
  user: string;
  User?: string;
}

const formatDate = (sendAt: Date) => {
  const date = new Date(sendAt);
  return (
    ("0" + date.getDate()).slice(-2) +
    "/" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    date.getFullYear().toString().slice(-2) +
    " " +
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2)
  );
};

export function MessageComponent(props: Message) {
  const { user, User } = props;

  if (user == User) {
    return <UserMssage {...props} />;
  } else {
    return <FriendMessage {...props} />;
  }
}

function UserMssage(props: Message) {
  return (
    <View className="bg-red-600 my-1 p-1 border border-white rounded-tl-lg rounded-br-lg rounded-bl-lg">
      <Text className="text-white">{props.content}</Text>
      <Text className="text-white text-right">{formatDate(props.sendAt)}</Text>
    </View>
  );
}

function FriendMessage(props: Message) {
  return (
    <View className="bg-white my-1 p-1 border border-red-700 rounded-tr-lg rounded-br-lg rounded-bl-lg">
      <Text className="text-red-600">{props.content}</Text>
      <Text className="text-red-600">{formatDate(props.sendAt)}</Text>
    </View>
  );
}
