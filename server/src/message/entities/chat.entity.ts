import { Message } from "src/message/entities/message.entity";
export class Chat {
  email: string;
  name?: string;
  messages: Message[];
}
