import { config } from "dotenv";
config();
import { Controller, Get, Post, Body, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { UserService } from "./user.service";
import { verify, sign } from "jsonwebtoken";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { LoginUserDto } from "./dto/login-user.dto";
import { SocketGateway } from "src/socket/socket.gateway";
import { Socket } from "socket.io";

@Controller("user")
export class UserController {
  constructor(
    private readonly service: UserService,
    private readonly socketGateway: SocketGateway,
  ) {}

  @Post("register")
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const existUser = await this.service.findUser(createUserDto.email);

    if (existUser)
      return res
        .status(400)
        .send({ msg: "Já existe um usuário cadastrado com esse email" });

    createUserDto.password = this.hashPassword(createUserDto.password);
    const result = await this.service.create(createUserDto);

    const clientSocket = this.socketGateway.getClientById(result.email);
    if (clientSocket) {
      this.socketGateway.handleClientConnection(clientSocket, result.email);
    }

    return res.status(201).send({ token: this.encode(result.email) });
  }

  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const result = await this.service.findUser(loginUserDto.email);

    if (!result)
      return res
        .status(400)
        .send({ msg: "Não existe nenhum usuário com esse email" });

    if (!this.checkPassword(loginUserDto.password, result.password))
      return res.status(400).send({ msg: "Senha incorreta" });

    const clientSocket = this.socketGateway.getClientById(result.email);
    if (clientSocket) {
      this.socketGateway.handleClientConnection(clientSocket, result.email);
    }

    return res.status(200).send({ token: this.encode(result.email) });
  }

  @Get("/email/:email")
  async findUser(@Param("email") email: string, @Res() res: Response) {
    const result = await this.service.findUser(email);
    return result
      ? res.status(200).send(result)
      : res
          .status(400)
          .send({ msg: "Não existe nenhum usuário com esse nome" });
  }

  @Get("/search/:email")
  async searchUser(@Param("email") email: string, @Res() res: Response) {
    return res.status(200).send(await this.service.searchUser(email));
  }

  @Get("/decode/:jwt")
  async decode(@Param("jwt") token: string, @Res() res: Response) {
    const secretKey = process.env.SECRET_KEY;
    try {
      const email = verify(token, secretKey);
      const user = await this.service.findUser(email as string);
      return res.status(200).send(user);
    } catch (error) {
      return res.status(400).send({ message: "Token inválido" });
    }
  }

  encode(email: string) {
    const secretKey = process.env.SECRET_KEY;
    return sign(email, secretKey);
  }

  hashPassword(password: string) {
    const hash = process.env.HASH;
    return bcrypt.hashSync(password, parseInt(hash));
  }

  checkPassword(password: string, password_: string) {
    return bcrypt.compareSync(password, password_);
  }
}
