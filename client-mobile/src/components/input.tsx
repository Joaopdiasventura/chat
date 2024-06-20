import React from "react";
import { TextInput, TextInputProps } from "react-native";

export function InputComponent(props: TextInputProps) {
  return (
    <TextInput
      className="border rounded py-1 px-1.5 border-white text-white placeholder:text-slate-400"
      {...props}
    />
  );
}
