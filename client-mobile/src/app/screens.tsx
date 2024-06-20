import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Chat } from "./chat";
import { Chats } from "./chats";
import { Enter } from "./enter";
import { AddChat } from "./addChat";

const Tab = createBottomTabNavigator();

export function Screens() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Ionicons
              name={
                route.name == "Chats"
                  ? focused
                    ? "chatbubbles"
                    : "chatbubbles-outline"
                  : route.name == "Enter" && focused
                  ? "log-in"
                  : "log-in-outline"
              }
              size={size}
              color={color}
            />
          );
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#000",
          paddingBottom: 5,
          height: 35,
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
          borderColor: "#000",
          marginTop: 15
        },
      })}
    >
      <Tab.Screen name="Chats" component={Chats} />
      <Tab.Screen name="Enter" component={Enter} />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="AddChat"
        component={AddChat}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
}
