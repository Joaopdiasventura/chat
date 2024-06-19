import { ChatService } from "./../chat/chat.service";
import { UserService } from "./../user/user.service";
import { Controller, Get, Post, Body, Param, Res } from "@nestjs/common";
import { MessageService } from "./message.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { SocketGateway } from "../socket/socket.gateway";
import { Response } from "express";
import { Message } from "./entities/message.entity";

@Controller("message")
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
    private readonly chatService: ChatService,
    private readonly socket: SocketGateway,
  ) {}

  @Post()
  async create(
    @Body() createMessageDto: CreateMessageDto,
    @Res() res: Response,
  ) {
    const user = await this.userService.findUser(createMessageDto.user);

    if (!user)
      return res
        .status(400)
        .send({ msg: "Esse usuário não está cadastrado no sistema" });

    const chat = await this.chatService.findChat(createMessageDto.chat);

    if (!chat) {
      const newChat = await this.chatService.create();

      createMessageDto.chat = newChat.id;

      const firstUser = await this.chatService.addUser({
        chat: newChat.id,
        user: createMessageDto.user,
      });

      if (firstUser) return res.status(400).send({ msg: firstUser });

      const secondUser = await this.chatService.addUser({
        chat: newChat.id,
        user: createMessageDto.user_,
      });

      if (secondUser) return res.status(400).send({ msg: secondUser });
    }
    const result = await this.messageService.create(createMessageDto);

    this.socket.handleMessage(result, createMessageDto.user_);
    return res.status(201).send(result);
  }

  @Get(":chat")
  async getAll(@Param("chat") chat: string): Promise<Message[]> {
    return this.messageService.getAll(chat);
  }
}
