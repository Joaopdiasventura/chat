import { Injectable } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";
import { PrismaService } from "src/database/prisma.service";
import { Message } from "./entities/message.entity";

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const { user_, ...dto } = createMessageDto;
    return await this.prisma.message.create({ data: { ...dto } });
  }
  async getAll(chat: string): Promise<Message[]> {
    return await this.prisma.message.findMany({
      where: {
        chat,
      },
      include: {
        User: true,
      },
    });
  }
}
