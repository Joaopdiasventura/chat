import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { UserService } from "src/user/user.service";
import { AddUserDto } from "./dto/addUser.dto";
import { Response } from "express";

@Controller("chat")
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async addUserInChat(@Body() addUserDto: AddUserDto, @Res() res: Response) {
    const user = await this.userService.findUser(addUserDto.user);
    if (!user)
      return res
        .status(400)
        .send({ message: "Esse usuário não está cadastrado no sistema" });

    const chat = await this.chatService.findChat(addUserDto.chat);
    if (!chat)
      return res.status(400).send({ message: "Essa conversa não existe" });

    await this.chatService.addUser(addUserDto);
  }

  @Get("/all/:user")
  async getAll(@Param("user") user: string) {
    return await this.chatService.getAll(user);
  }
  @Get("/firsts/:user")
  async getFirsts(@Param("user") user: string) {
    return await this.chatService.getFirst(user);
  }
}
