import React from "react";
import { Text, View } from "react-native";

export interface Message {
  chat: String;
  content: String;
  id: string;
  sendAt: Date | string;
  user: string;
  User?: string;
}

export function MessageComponent(props: Message) {
  const { user, User } = props;
  const date = new Date(props.sendAt);

  props.sendAt =
    ("0" + date.getDate()).slice(-2) +
    "/" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    date.getFullYear().toString().slice(-2) +
    " " +
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2);

  if (user == User) {
    return <UserMssage {...props} key={props.id} />;
  } else {
    return <FriendMessage {...props} />;
  }
}

function UserMssage(props: Message) {
  return (
    <View className="bg-red-600 my-1 p-1 rounded" key={props.id}>
      <Text className="text-white">{props.content}</Text>
      <Text className="text-white">{`${props.sendAt}`}</Text>
    </View>
  );
}

function FriendMessage(props: Message) {
  return (
    <View className="bg-white my-1 p-1 border rounded" key={props.id}>
      <Text className="text-red-600">{props.content}</Text>
      <Text className="text-red-600">{`${props.sendAt}`}</Text>
    </View>
  );
}
