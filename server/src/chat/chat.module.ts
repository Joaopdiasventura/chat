import { ChatController } from "./chat.controller";
import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { PrismaService } from "src/database/prisma.service";
import { UserService } from "src/user/user.service";

@Module({
  controllers: [ChatController],
  providers: [ChatService, UserService, PrismaService],
})
export class ChatModule {}
