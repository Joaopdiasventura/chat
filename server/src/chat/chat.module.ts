import { ChatController } from './chat.controller';
import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { PrismaService } from "src/database/prisma.service";

@Module({
  controllers: [ChatController],
  providers: [ChatService, PrismaService],
})
export class ChatModule {}
