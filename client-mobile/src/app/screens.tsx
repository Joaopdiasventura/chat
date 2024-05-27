import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Chat } from "./chat";
import { Chats } from "./chats";
import { Enter } from "./enter";

const Tab = createBottomTabNavigator();

export function Screens() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Chats") {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          } else if (route.name === "Chat") {
            iconName = focused
              ? "chatbubble-ellipses"
              : "chatbubble-ellipses-outline";
          } else if (route.name === "Enter") {
            iconName = focused ? "log-in" : "log-in-outline";
          }

          return <Ionicons name={`${iconName}`} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#fff",
          paddingBottom: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen name="Chats" component={Chats} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Enter" component={Enter} />
    </Tab.Navigator>
  );
}
