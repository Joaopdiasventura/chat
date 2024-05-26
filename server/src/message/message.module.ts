import { Module } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageController } from "./message.controller";
import { SocketGateway } from "../socket/socket.gateway";
import { PrismaService } from "src/database/prisma.service";
import { UserService } from "src/user/user.service";

@Module({
  controllers: [MessageController],
  providers: [MessageService, UserService, PrismaService, SocketGateway],
})
export class MessageModule {}
