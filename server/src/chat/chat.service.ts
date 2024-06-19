import { Injectable } from "@nestjs/common";
import { AddUserDto } from "./dto/addUser.dto";
import { PrismaService } from "src/database/prisma.service";
import { Chat } from "./entities/chat.entity";

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async create(): Promise<Chat> {
    return await this.prisma.chat.create({});
  }

  async addUser(addUserDto: AddUserDto) {
    try {
      await this.prisma.chatUser.create({ data: { ...addUserDto } });
    } catch (error) {
      return error;
    }
  }

  async findChat(id: string): Promise<Chat | void> {
    return (await this.prisma.chat.findUnique({ where: { id } })) || null;
  }

  async getFirst(email: string) {
    return await this.prisma.message.findMany({
      where: {
        Chat: {
          chatUsers: {
            some: {
              user: email,
            },
          },
        },
      },
      orderBy: {
        sendAt: "desc",
      },
      select: {
        content: true,
        sendAt: true,
        chat: true,
        User: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      distinct: ["chat"],
    });
  }

  async getAll(email: string) {
    return await this.prisma.message.findMany({
      where: {
        Chat: {
          chatUsers: {
            some: {
              user: email,
            },
          },
        },
      },
      orderBy: {
        sendAt: "desc",
      },
      select: {
        content: true,
        sendAt: true,
        chat: true,
        User: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }
}
