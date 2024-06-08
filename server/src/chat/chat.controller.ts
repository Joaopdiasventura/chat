import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ChatService } from "./chat.service";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get("/all/:user")
  async getAll(@Param("user") user: string) {
    return await this.chatService.getAll(user);
  }
  @Get("/firsts/:user")
  async getFirsts(@Param("user") user: string) {
    return await this.chatService.getFirst(user);
  }
}
