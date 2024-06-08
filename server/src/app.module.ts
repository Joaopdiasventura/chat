import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { MessageModule } from "./message/message.module";
import { ChatModule } from "./chat/chat.module";

@Module({
  imports: [UserModule, MessageModule, ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
