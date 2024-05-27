import React from "react";
import { TextInput, TextInputProps } from "react-native";

export function EnterInput(props: TextInputProps) {
  return <TextInput className="border rounded p-1" {...props} />;
}
