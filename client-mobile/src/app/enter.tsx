import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { InputComponent } from "../components/input";
import { app, useUserContext } from "../contexts";

export function Enter() {
  const { navigate } = useNavigation();
  const { setUser } = useUserContext();

  const [login, setLogin] = useState<boolean>(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (login) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  const handleLogin = async () => {
    console.log(process.env.EXPO_PUBLIC_API_URL);
    try {
      setEmail(email.trim())
      setPassword(password.trim())
      const { token } = await app
        .post("/user/login", { email, password })
        .then((result) => result.data);
      handleToken(token);
    } catch (error: any) {
      console.log(error);
      Alert.alert("ERRO AO REALIZAR LOGIN", error.response.data.msg);
    }
  };

  const handleRegister = async () => {
    try {
      setName(name.trim())
      setEmail(email.trim())
      setPassword(password.trim())
      const result = await app
        .post("/user/register", { name, email, password })
        .then((result) => result.data);
      handleToken(result);
    } catch (error: any) {
      Alert.alert("ERRO AO REALIZAR SEU REGISTRO", error.response.data.msg);
    }
  };

  const handleToken = async (token: string) => {
    const result = await app
      .get(`/user/decode/${token}`)
      .then((result) => result.data);
    setUser(result);
    await AsyncStorage.setItem("user", JSON.stringify(result));
    navigate("Chats" as never);
  };

  return (
    <View className="flex-1 bg-black justify-center items-center">
      <View className=" w-1/2 justify-center items-center">
        <View className="h-full items-center justify-center ">
          <View className="border rounded-md p-2 border-white">
            <Text className="text-xl mb-1 text-white">
              {login ? "Bem Vindo de Volta" : "Faça seu registro"}
            </Text>
            <View>
              {!login && (
                <>
                  <Text className="text-base text-white">Nome:</Text>
                  <InputComponent
                    onChangeText={setName}
                  />
                </>
              )}
              <>
                <Text className="text-base text-white">Email:</Text>
                <InputComponent
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </>
              <>
                <Text className="text-base text-white">Senha:</Text>
                <InputComponent
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </>
              <View className="flex-row gap-2 mt-1">
                <TouchableOpacity
                  className="w-16 h-8 justify-center items-center bg-transparent bg-red-700 rounded"
                  onPress={handleSubmit}
                >
                  <Text className="text-center text-white text-base">
                    ENTRAR
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="h-8 justify-center items-center border border-white rounded p-1"
                  onPress={() => {
                    setLogin(login ? false : true);
                  }}
                >
                  <Text className="text-base text-white">
                    {!login ? "BEM VINDO DE VOLTA" : "FAÇA SEU REGISTRO"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
