import { User } from "src/user/entities/user.entity";

export class Message {
  id: string;
  content: string;
  user: string;
  chat: string;
  sendAt: Date;
  User?: User;
}
