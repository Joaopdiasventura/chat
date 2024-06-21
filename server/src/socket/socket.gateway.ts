import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private users: Map<string, string> = new Map();

  @SubscribeMessage("handleMessage")
  async handleMessage(@MessageBody() payload: any) {
    const recipientSocketId = this.getUserSocketId(payload.to);
    if (recipientSocketId) {
      this.server
        .to(recipientSocketId)
        .emit("message", JSON.stringify(payload));
    } else {
      console.log(`Usuário com o email: ${payload.to} não está conectado`);
    }
  }

  private getUserSocketId(email: string): string | undefined {
    for (const [socketId, userEmail] of this.users.entries()) {
      if (userEmail === email) {
        return socketId;
      }
    }
    return undefined;
  }

  @SubscribeMessage("enter")
  handleEnter(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { email: string },
  ): string {
    const { email } = payload;
    this.users.set(client.id, email);
    this.server.emit(
      "userEntered",
      JSON.stringify({ msg: "Usuário entrou com sucesso" }),
    );
    return `Usuário com o email: ${email}, entrou`;
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.users.delete(client.id);
  }

  handleClientConnection(client: Socket, email: string) {
    const payload = { email };
    this.handleEnter(client, payload);
  }

  getClientById(clientId: string): Socket | undefined {
    return this.server.sockets.sockets.get(clientId);
  }
}
