import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Message } from "src/message/entities/message.entity";

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  private users: Map<string, string> = new Map();

  @SubscribeMessage("message")
  async handleMessage(@MessageBody() payload: Message) {
    const recipientSocketId = this.getUserSocketId(payload.to);
    if (recipientSocketId) {
      this.server
        .to(recipientSocketId)
        .emit("message", JSON.stringify(payload));
    } else {
      console.log(`User with email ${payload.to} is not connected.`);
    }
  }

  @SubscribeMessage("enter")
  handleEnter(client: Socket, payload: { email: string }): string {
    const { email } = payload;
    this.users.set(client.id, email);
    this.server.emit(
      "userEntered",
      JSON.stringify({ msg: "Usuário entrou com sucesso" }),
    );
    return `User with email ${email} has logged in.`;
  }

  private getUserSocketId(email: string): string | undefined {
    for (const [socketId, userEmail] of this.users.entries()) {
      if (userEmail === email) {
        return socketId;
      }
    }
    return undefined;
  }
}
