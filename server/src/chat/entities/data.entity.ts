import { Message } from "../../message/entities/message.entity";
export class Data {
  email: string;
  name?: string;
  messages: Message[];
}
