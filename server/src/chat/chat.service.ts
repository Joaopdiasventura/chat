import { Data } from "./entities/data.entity";
import { Injectable } from "@nestjs/common";
import { AddUserDto } from "./dto/addUser.dto";
import { PrismaService } from "src/database/prisma.service";
import { Chat } from "./entities/chat.entity";
import { Message } from "src/message/entities/message.entity";

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async create(): Promise<Chat> {
    return await this.prisma.chat.create({});
  }

  async addUser(addUserDto: AddUserDto): Promise<string | void> {
    try {
      const existUser = await this.prisma.user.findUnique({
        where: { email: addUserDto.user },
      });

      if (!existUser) return "Esse usuário não está cadastrado no sistema";

      const existChat = await this.prisma.chat.findUnique({
        where: { id: addUserDto.chat },
      });

      if (!existChat) return "Essa conversa não existe";

      await this.prisma.chatUser.create({ data: { ...addUserDto } });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string): Promise<Chat | void> {
    return (await this.prisma.chat.findUnique({ where: { id } })) || null;
  }

  async getFirst(email: string) {
    const chats = await this.prisma.chatUser.findMany({
      where: { user: email },
    });
    const data: Data[] = [];
    for (const { chat } of chats) {
      const message = await this.prisma.message.findFirst({
        where: { chat },
        orderBy: { sendAt: "desc" },
      });
      const user = await this.prisma.user.findUnique({ where: { email } });
      data.push({ name: user.name, email: user.email, messages: [message] });
    }
    data.sort((a, b) => {
      return b.messages[0].sendAt.getTime() - a.messages[0].sendAt.getTime();
    });
    return data;
  }

  async getAll(email: string) {
    const chats = await this.prisma.chatUser.findMany({
      where: { user: email },
    });
    const data: Data[] = [];
    for (const { chat } of chats) {
      const messages = await this.prisma.message.findMany({
        where: { chat },
      });
      const user = await this.prisma.user.findUnique({ where: { email } });
      data.push({ name: user.name, email: user.email, messages });
    }

    data.sort((a, b) => {
      return b.messages[0].sendAt.getTime() - a.messages[0].sendAt.getTime();
    });
    return data;
  }
}
