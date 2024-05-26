import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "src/database/prisma.service";
import { SocketGateway } from "src/socket/socket.gateway";

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, SocketGateway],
})
export class UserModule {}
