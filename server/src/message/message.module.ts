import { Module } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageController } from "./message.controller";
import { SocketGateway } from "../socket/socket.gateway";
import { PrismaService } from "src/database/prisma.service";
import { UserService } from "src/user/user.service";
import { ChatService } from "src/chat/chat.service";

@Module({
  controllers: [MessageController],
  providers: [
    MessageService,
    UserService,
    ChatService,
    PrismaService,
    SocketGateway,
  ],
})
export class MessageModule {}
