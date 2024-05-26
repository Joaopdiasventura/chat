import { UserService } from "./../user/user.service";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from "@nestjs/common";
import { MessageService } from "./message.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { SocketGateway } from "../socket/socket.gateway";
import { Response } from "express";
import { Chat } from "./entities/chat.entity";

@Controller("message")
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
    private readonly socket: SocketGateway,
  ) {}

  @Post()
  async create(
    @Body() createMessageDto: CreateMessageDto,
    @Res() res: Response,
  ) {
    const sender = await this.userService.findUser(createMessageDto.from);
    if (!sender)
      return res
        .status(400)
        .send({ msg: "Você não está caadastrado no sistema" });

    const receiver = await this.userService.findUser(createMessageDto.to);
    if (!receiver)
      return res
        .status(400)
        .send({ msg: "Esse email não está caadastrado no sistema" });

    const result = await this.messageService.create(createMessageDto);

    this.socket.handleMessage(result);
    return res.status(201).send(result);
  }

  @Get("/chats/:email/")
  async getChat(@Param("email") email: string, @Res() res: Response) {
    const result = await this.messageService.findAll(email);
    const chats = [];

    for (const message of result) {
      let other = message.from == email ? message.to : message.from;
      const existChat = chats.some((chat) => chat.email == other);
      if (!existChat) {
        chats.push({ email: other, messages: [message] });
      } else {
        const index = chats.findIndex((chat) => chat.email == other);
        chats[index].messages.push(message);
      }
    }

    for (let i = 0; i < chats.length; i++) {
      const user = await this.userService.findUser(chats[i].email);
      chats[i].name = user ? user.name : chats[i].email;
    }

    console.log(chats);
    return res.status(200).send(chats);
  }
}
