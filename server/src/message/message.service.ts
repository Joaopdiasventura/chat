import { Injectable } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMessageDto: CreateMessageDto) {
    return await this.prisma.message.create({ data: { ...createMessageDto } });
  }

  async findAll(email: string) {
    return await this.prisma.message.findMany({
      where: {
        OR: [
          { from: email },
          { to: email },
        ],
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }
}
