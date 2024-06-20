import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import axios from "axios";

export interface User {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const app = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const user = useContext(UserContext);
  if (!user) {
    throw new Error("useRequestContext must be used within a RequestProvider");
  }
  return user;
};

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

interface ChatContextType {
  chat: string | null;
  setChat: Dispatch<SetStateAction<string | null>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const chat = useContext(ChatContext);
  if (!chat) {
    throw new Error("chatContext must be used within a RequestProvider");
  }
  return chat;
};

export const ChatProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [chat, setChat] = useState<string | null>(null);

  return (
    <ChatContext.Provider value={{ chat, setChat }}>
      {children}
    </ChatContext.Provider>
  );
};
